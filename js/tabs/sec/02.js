// تكملة تاب sec: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/sec/01.js (شرح حقول الدرس في أوله)
MORE("sec", [
    {
      t: "البيانات الشخصية",
      l: 2,
      n: "أي موقع فيه تسجيل بيخزن بيانات ناس: تخزن أقل، وتحذف وتصدّر لما يطلبوا، وتشفّر الحساس، ومتسرّبهاش لـ staging ولا اللوج",
      items: [
        {
          cmd: "PII: متخزنهاش أصلًا",
          title: "أأمن داتا هي اللي معندكش",
          desc: R`PII (Personally Identifiable Information) هي أي حاجة تعرّف شخص لوحدها أو مع حاجة تانية: الاسم، والإيميل، والتليفون، والعنوان، والرقم القومي، والـ IP، والموقع، والصور. وفيه نوع أخطر اسمه «بيانات حساسة»: الصحة، والبيانات البيومترية، والدين، والبيانات المالية، وبيانات الأطفال. القوانين بتشدد عليها أكتر.

أول قاعدة قبل أي تشفير: خزّن أقل (data minimization). لكل عمود اسأل: الميزة دي محتاجاه فعلًا؟ لو محتاج تتأكد إن السن فوق 18، خزّن [[birth_year]] أو حتى [[is_adult]] مش تاريخ الميلاد كامل. لو بتدفع أونلاين، الكارت يفضل عند بوابة الدفع (Paymob، Stripe) وانت معاك reference وآخر 4 أرقام بس. و CVV ممنوع يتخزن خالص بعد الدفع، حتى متشفّر (قواعد PCI DSS).

اللي مش عندك مش ممكن يتسرّب، ومش محتاج تشفّره، ولا تحذفه، ولا تصدّره.`,
          example: R`CREATE TABLE customers (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  birth_year smallint,                 -- مش تاريخ الميلاد كامل لو محتاج السن بس
  city text,                           -- مش العنوان بالتفصيل لو مش بتشحن
  payment_customer_id text,            -- الكارت عند بوابة الدفع، وانت معاك reference بس
  card_last4 char(4),                  -- للعرض بس: «Visa تنتهي بـ 4242»
  national_id_enc text,                -- لو لازم قانونًا: متشفّر في التطبيق
  national_id_idx text UNIQUE,         -- HMAC عشان تدوّر بيه من غير ما تفك
  marketing_consent_at timestamptz,    -- الموافقة ليها وقت، مش checkbox متعلّم لوحده
  created_at timestamptz NOT NULL DEFAULT now()
);`,
          try: R`افتح جدول الـ users (أو أي جدول فيه بيانات ناس) في آخر مشروع عملته. لكل عمود اكتب: محتاجه لإيه بالظبط؟ ينفع يتخزن أقل؟ لو اتسرّب يضر قد إيه؟ وبعدين اكتب migration واحد يقلل أخطر عمود عندك (مثلًا [[birth_date]] يبقى [[birth_year]]، أو تشيل عمود كارت أو CVV لو موجود).`,
          flag: "script",
          deep: {
            why: R`كل عمود PII بتخزنه بيزود 4 حاجات: خطر التسريب، وشغل الحذف والتصدير لما اليوزر يطلب، والتزامات قانونية (القانون المصري و GDPR بيطلبوا إنك تجمع اللي محتاجه لغرض محدد بس)، وقيمة الداتا عند اللي هيسرقها. أغلب التسريبات الكبيرة كانت داتا الشركة مكانتش محتاجاها أصلًا.`,
            how: R`اعمل «data map»: جدول صغير فيه كل نوع داتا، ومحتاجينه لإيه، ومتخزن فين (الداتابيز، و S3، واللوج، و Sentry، وخدمة الإيميل، و analytics)، وبيتمسح إمتى، ومين بيوصله. من غيره مش هتعرف تحذف حساب ولا ترد على طلب تصدير.

البدائل الشائعة: السن بدل تاريخ الميلاد، والمدينة بدل العنوان، و token من بوابة الدفع بدل الكارت، وآخر 4 أرقام للعرض. والرقم القومي لو القانون بيلزمك بيه (زي KYC في شغل مالي)، يتشفّر في التطبيق (درس «تشفير عمود حساس» تحت) ومعاه HMAC للبحث.

والموافقة على التسويق ليها عمود بوقت ([[marketing_consent_at]])، عشان تقدر تثبت إمتى وافق، ولما يرجع فيها تبقى NULL.`,
            when: R`وانت بتصمم الـ schema، قبل ما يبقى فيه داتا. تقليل عمود بعد ما فيه ملايين صفوف واللوجات والباك أبات والـ exports كلها فيها نفس الداتا أصعب بكتير.`,
            mistakes: R`«نخزنه يمكن نحتاجه بعدين»: ده بالظبط اللي القوانين بتمنعه، وبيحوّل أي تسريب لكارثة. تخزين CVV أو رقم الكارت كامل «متشفّر»: ممنوع خالص في CVV، والكارت كامل بيدخّلك في PCI DSS كله. وتفتكر إن الـ IP مش PII: في GDPR ممكن يبقى PII.

في الانترفيو لو اتسألت «إزاي بتحمي بيانات المستخدمين؟»: ابدأ بـ minimization قبل التشفير. ده اللي بيبيّن إنك فاهم، مش حافظ أسماء خوارزميات.`
          },
          teach: R`## الفكرة: كل عمود قرار

المثال جدول [[customers]] متصمم بعقلية «خزّن أقل». مفيش فيه سطر صعب في الـ SQL نفسه، الصعب هو **ليه** كل عمود متكتب بالشكل ده. هنمشي عليه عمود عمود، وبعدين نشغّل الـ migration اللي في الحل. كل اللي تحت اتشغّل على PostgreSQL 16 في container ([[docker run postgres:16]]).

---

## ١. السطر الأول: [[CREATE TABLE customers (]]

[[CREATE TABLE]] بيعمل جدول جديد، و [[customers]] اسمه، وبين القوسين الأعمدة، كل عمود في سطر: **الاسم** وبعده **النوع** وبعده **القيود** (constraints). والفاصلة [[,]] في آخر كل سطر بتفصل عمود عن اللي بعده، وآخر عمود من غيرها.

## ٢. [[id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY]]

| الحتة | معناها |
|---|---|
| [[bigint]] | رقم صحيح كبير (8 byte)، بيوصل لـ 9 كوينتليون |
| [[GENERATED ALWAYS AS IDENTITY]] | الداتابيز هي اللي بتدّي الرقم: 1، 2، 3… |
| [[PRIMARY KEY]] | الرقم ده مميز لكل صف ومينفعش يبقى NULL |

و [[ALWAYS]] معناها إنك مش مسموحلك تكتب الرقم بإيدك. جرّبنا:

~~~text الناتج
ERROR:  cannot insert a non-DEFAULT value into column "id"
DETAIL:  Column "id" is an identity column defined as GENERATED ALWAYS.
~~~

## ٣. [[email text UNIQUE NOT NULL]] و [[name text NOT NULL]]

[[text]] نص من غير حد للطول. [[UNIQUE]]: مينفعش إيميلين زي بعض (الإيميل هو اللي اليوزر بيدخل بيه). [[NOT NULL]]: لازم يتكتب. دول PII بس **محتاجينهم فعلًا**: من غير إيميل مفيش login ولا فواتير. يعني الـ minimization مش معناه متخزنش PII خالص، معناه متخزنش اللي **مش محتاجه**.

## ٤. [[birth_year smallint]] بدل تاريخ الميلاد

[[smallint]] رقم صغير (2 byte، لحد 32767)، كفاية لسنة. والـ [[--]] بعده بداية **تعليق** في SQL، الداتابيز بتتجاهل اللي بعدها لآخر السطر.

ليه السنة بس؟ لو الميزة «لازم فوق 18»، السنة كفاية تقريبًا، وتاريخ الميلاد الكامل مع الاسم بيعرّف الشخص أكتر بكتير (وبيستخدم في أسئلة استرجاع الحسابات). ولو عايز السن:

~~~text الناتج
  y   | approx_age
------+------------
 1990 |         36
~~~

ده من [[SELECT extract(year FROM date '1990-05-01'), extract(year FROM now()) - 1990]]: [[extract(year FROM ...)]] بيطلّع السنة من تاريخ.

## ٥. [[city text]]: نفس الفكرة

المدينة كفاية للإحصائيات أو لحساب الشحن التقريبي. العنوان بالتفصيل بيتخزن مع **الطلب** وقت ما تحتاجه بس.

## ٦. الدفع: [[payment_customer_id]] و [[card_last4 char(4)]]

- [[payment_customer_id text]]: الـ id اللي بوابة الدفع (Paymob أو Stripe) بترجعهولك، زي [[cus_...]]. الكارت نفسه متخزن عندهم هم، وهم اللي عليهم PCI DSS (معيار أمان كروت الدفع).
- [[char(4)]]: نص طوله **4 بالظبط**. لو حاولت تحط 5:

~~~text الناتج
ERROR:  value too long for type character(4)
~~~

يعني الداتابيز نفسها بتمنعك تخزن الكارت كامل في العمود ده بالغلط.

## ٧. الرقم القومي: عمودين

- [[national_id_enc text]]: الرقم **متشفّر في التطبيق** قبل ما يوصل للداتابيز ([[enc]] = encrypted). شكله [[v1:...:...:...]] (درس «تشفير عمود حساس» تحت).
- [[national_id_idx text UNIQUE]]: **بصمة** [[HMAC]] للرقم ([[idx]] = index). نفس الرقم بيدّي نفس البصمة دايمًا، فتقدر تدوّر بيها وتمنع التكرار بالـ [[UNIQUE]] من غير ما تفك التشفير.

## ٨. [[marketing_consent_at timestamptz]]

[[timestamptz]] = timestamp with time zone، وقت بالظبط ومعاه المنطقة الزمنية. ليه وقت مش [[boolean]]؟ لأن القانون بيطلب تثبت **إمتى** وافق. لو [[NULL]] يبقى مش موافق، ولو رجع في موافقته ترجّعها [[NULL]].

## ٩. [[created_at timestamptz NOT NULL DEFAULT now()]]

[[DEFAULT now()]]: لو مكتبتش قيمة، الداتابيز تحط الوقت الحالي.

### التشغيل

جدول اتعمل، و [[\d customers]] في psql بيوريك الأعمدة والـ indexes:

~~~text الناتج (مختصر)
 birth_year           | smallint
 card_last4           | character(4)
 national_id_idx      | text
 marketing_consent_at | timestamp with time zone
Indexes:
    "customers_pkey" PRIMARY KEY, btree (id)
    "customers_email_key" UNIQUE CONSTRAINT, btree (email)
    "customers_national_id_idx_key" UNIQUE CONSTRAINT, btree (national_id_idx)
~~~

لاحظ إن كل [[UNIQUE]] عمل index لوحده، وده اللي بيخلي البحث بالإيميل أو بالبصمة سريع.

---

## ١٠. الحل: migration يقلل جدول قديم

الحل بيعمل جدول [[people]] «غلط» فيه [[birth_date]] و [[card_number]] و [[cvv]]، وبعدين يصلّحه:

| السطر | بيعمل إيه |
|---|---|
| [[BEGIN;]] | يبدأ transaction: يا كله يحصل يا ولا حاجة |
| [[ALTER TABLE people ADD COLUMN birth_year smallint;]] | يضيف العمود الجديد (فاضي) |
| [[UPDATE people SET birth_year = extract(year FROM birth_date);]] | يملاه من القديم |
| [[ALTER TABLE ... DROP COLUMN birth_date, DROP COLUMN cvv, DROP COLUMN card_number;]] | يشيل الأعمدة الخطيرة في أمر واحد |
| [[COMMIT;]] | يثبّت |

الترتيب مهم: لازم تنقل الداتا **قبل** ما تمسح العمود. اتشغّل كده:

~~~text الناتج
BEGIN
ALTER TABLE
UPDATE 1
ALTER TABLE
COMMIT
 id |  national_id   | birth_year
----+----------------+------------
  1 | 29005011234567 |       1990
~~~

[[UPDATE 1]] يعني صف واحد اتعدّل. ولاحظ إن [[national_id]] لسه موجود واضح: ده الخطوة الجاية (تشفيره).

---

## الخلاصة

- اسأل لكل عمود: محتاجه لإيه؟ ينفع أقل منه؟
- السنة بدل التاريخ، والمدينة بدل العنوان، و reference من بوابة الدفع بدل الكارت، و CVV ممنوع خالص.
- الحساس اللي لازم يتخزن: متشفّر + بصمة HMAC للبحث.
- الموافقة وقت مش checkbox.
- [[DROP COLUMN]] بيشيل العمود من الجدول بس، مش من الباك أبات القديمة ولا اللوج.`,
          lines: [
            "جدول العملاء.",
            "id رقم بيزيد لوحده.",
            "الإيميل: محتاجينه للدخول والفواتير، فبيتخزن.",
            "الاسم: محتاجينه للفواتير والشحن.",
            "سنة الميلاد بس، كفاية تعرف السن.",
            "المدينة بس، لو مش محتاج عنوان شحن كامل.",
            "reference من بوابة الدفع (زي customer id)، والكارت نفسه عندهم.",
            "آخر 4 أرقام للعرض، ومفيش CVV ولا رقم كامل.",
            "الرقم القومي لو القانون بيلزمك: نص متشفّر من التطبيق، مش الرقم نفسه.",
            "بصمة HMAC للرقم عشان تدوّر بيه وتمنع التكرار من غير ما تفك التشفير.",
            "وقت الموافقة على التسويق، و NULL يعني مش موافق.",
            "وقت إنشاء الحساب.",
            "قفلة."
          ],
          sol: R`مثال لنتيجة المراجعة على جدول users عادي: [[email]] و [[name]] و [[password_hash]] محتاجينهم. [[birth_date]] كان عشان «فوق 18» بس، فيبقى [[birth_year]]. [[address]] بيستخدم في الشحن بس، فيتنقل لجدول الطلب نفسه ويتمسح بعد مدة. [[ip]] على كل صف: مالوش لازمة، يروح جدول login_events بمدة حفظ 90 يوم. و [[card_number]] أو [[cvv]] لو لقيتهم: دي أولوية قصوى، يتمسحوا فورًا ويتنقل الدفع لـ tokens من البوابة.

الـ migration تحت بيعمل ده في transaction واحدة. بعد ما تشغّله، [[SELECT * FROM people]] يوريك [[birth_year]] بـ 1990 ومفيش [[birth_date]] ولا [[card_number]] ولا [[cvv]].

خلي بالك إن DROP COLUMN مش بيمسح الداتا من الباك أبات القديمة ولا من اللوج ولا من أي export اتعمل قبل كده. عشان كده الـ data map مهم: الداتا في أماكن أكتر من الجدول.`,
          solCode: R`CREATE TABLE people (id int PRIMARY KEY, birth_date date, national_id text, card_number text, cvv text);
INSERT INTO people VALUES (1, '1990-05-01', '29005011234567', '4242424242424242', '123');

BEGIN;
ALTER TABLE people ADD COLUMN birth_year smallint;
UPDATE people SET birth_year = extract(year FROM birth_date);
ALTER TABLE people DROP COLUMN birth_date, DROP COLUMN cvv, DROP COLUMN card_number;
COMMIT;

SELECT * FROM people;`
        },
        {
          cmd: "القانون المصري و GDPR",
          title: "إيه اللي القانون عايزه من كودك",
          desc: R`مش محتاج تبقى محامي، بس محتاج تعرف القوانين بتطلب إيه من الكود. وأي تفاصيل قانونية هنا (أرقام، مدد، غرامات) راجعها مع محامي ومع النص الرسمي، لأنها بتتغير وبتتفسر.

في مصر: قانون حماية البيانات الشخصية رقم 151 لسنة 2020. اللائحة التنفيذية اتأخرت سنين، واتصدرت في نوفمبر 2025 (قرار وزير الاتصالات وتكنولوجيا المعلومات رقم 816 لسنة 2025) ومعاها فترة توفيق أوضاع سنة تقريبًا، يعني الالتزام الفعلي بيبدأ حوالي آخر 2026. الجهة المسؤولة «مركز حماية البيانات الشخصية». بيطلب: غرض محدد وموافقة، وموافقة صريحة ومكتوبة للبيانات الحساسة وبيانات الأطفال، وحقوق لصاحب البيانات (يعرف، ويصحح، ويمسح، ويعترض)، وإبلاغ المركز عن أي تسريب خلال 72 ساعة، وشروط لنقل البيانات بره مصر، وتراخيص أو تصاريح من المركز لكتير من الشركات.

GDPR (الاتحاد الأوروبي): بيطبق عليك حتى لو انت في مصر، لو بتقدم خدمة لناس في أوروبا أو بتتابع سلوكهم. أهم حقوقه اللي محتاجة كود: الوصول (Art. 15)، والمسح (Art. 17)، ونقل البيانات بصيغة يقراها جهاز (Art. 20). والرد على الطلب خلال شهر، وإبلاغ الجهة الرقابية عن التسريب خلال 72 ساعة.`,
          example: R`Egypt Law 151/2020   exec. regulations Nov 2025, ~1 year to comply; regulator: PDPC
Purpose & consent    collect for a stated purpose; explicit written consent for sensitive data
Data subject rights  access, correction, erasure, objection: build a way to do each one
Breach               notify the regulator within 72 hours (both laws), then affected users
Transfers abroad     hosting outside Egypt has conditions: check before picking a cloud region
GDPR scope           applies if you offer services to people in the EU, even from Egypt
GDPR in code         access (15), erasure (17), portability (20); answer within one month
Fines                Egypt up to EGP 5M; GDPR up to EUR 20M or 4% of global turnover`,
          try: R`اعمل «data map» لمشروعك في جدول: نوع الداتا، ومحتاجينها لإيه، ومتخزنة فين (بما فيها Sentry وخدمة الإيميل و analytics والباك أب)، والسيرفر في أنهي بلد، وبتتمسح إمتى. وبعدين جاوب: لو يوزر بعتلك النهارده «امسح بياناتي» أو «ابعتلي بياناتي»، هتعمل إيه بالظبط وتاخد قد إيه؟`,
          flag: "script",
          deep: {
            why: R`القوانين دي بتحوّل حاجات «كويس لو عملناها» لالتزامات: لازم يبقى فيه طريقة للحذف والتصدير، ولازم تعرف تبلّغ عن تسريب في 3 أيام، يعني لازم يبقى عندك لوج يقولك إيه اللي اتسرّب ولمين. والشغل مع عملاء أوروبيين أو شركات كبيرة غالبًا بيطلب منك تثبت إنك ملتزم (DPA وأسئلة أمان) قبل ما يمضوا.`,
            how: R`ترجمة القانون لكود:

الغرض والموافقة: عمود وقت الموافقة لكل نوع (تسويق، مشاركة مع طرف تالت)، وسياسة خصوصية بتقول الحقيقة عن اللي بتعمله.

الحقوق: endpoint للتصدير، ومسار حذف حقيقي (الدروس الجاية)، وطريقة لتصحيح البيانات من الإعدادات.

التسريب: لوجات دخول وتغييرات صلاحيات (A09 في «باقي القايمة»)، وخطة مين بيبلّغ مين، ومعاك قايمة بالـ processors (Sentry، و Resend، و S3) عشان تعرف الداتا راحت فين.

النقل للخارج: اختيار region السيرفر قرار قانوني مش تقني بس. أي خدمة SaaS بتبعتلها داتا يوزرز (Sentry، analytics) تعتبر نقل.

الغرامات: القانون المصري بيوصل لـ 5 مليون جنيه وفيه حبس في حالات البيانات الحساسة، و GDPR لـ 20 مليون يورو أو 4% من الإيراد العالمي، أيهما أكبر.`,
            when: R`قبل ما تطلق أي منتج فيه تسجيل، وقبل ما تختار سيرفرات بره مصر أو تضيف خدمة طرف تالت بتشوف داتا اليوزرز، وأول ما تبدأ تبيع لعملاء في أوروبا.`,
            mistakes: R`تنسخ privacy policy من موقع تاني وهي بتوصف حاجات مش بتعملها، أو مش بتذكر حاجات بتعملها. تفتكر إن القانون المصري «لسه مطبقش»: اللائحة صدرت وفترة التوفيق قربت تخلص. تفتكر إن GDPR مالوش علاقة بيك عشان انت في مصر. وتعتمد على كلامنا هنا في قرار قانوني: ده ملخص للمطور، مش استشارة.

في الانترفيو: «إيه اللي GDPR بيأثر بيه على تصميمك؟» جاوب بالحاجات اللي بتتبني: حذف حقيقي بيشمل الملفات والخدمات التانية، وتصدير JSON، ومدد حفظ بـ job، وداتا متشفرة، ولوج من غير PII.`
          },
          teach: R`## الفكرة: كل سطر قانون = حاجة تتبني

المثال مش كود يتشغّل، ده جدول بـ 8 سطور، كل سطر فيه بند من القانون على الشمال وترجمته على اليمين. هنقرا كل سطر ونسأل: **ده محتاج مني أبني إيه؟** والتفاصيل القانونية ملخص للمطور مش استشارة، فالأرقام والمدد راجعها مع النص الرسمي ومع محامي.

---

## ١. [[Egypt Law 151/2020]]

[[151/2020]] يعني القانون رقم 151 لسنة 2020. [[exec. regulations]] = اللائحة التنفيذية، وهي اللي بتقول التفاصيل العملية، واتصدرت نوفمبر 2025، ومعاها حوالي سنة لتوفيق الأوضاع. و [[PDPC]] = Personal Data Protection Center، «مركز حماية البيانات الشخصية»، الجهة اللي بتراقب.

**تبني إيه:** ولا حاجة في السطر ده نفسه، بس هو اللي بيقولك إن الباقي بقى إلزامي.

## ٢. [[Purpose & consent]]

اجمع لغرض محدد ومكتوب، والبيانات الحساسة (صحة، دين، بيانات أطفال…) محتاجة موافقة **صريحة ومكتوبة**.

**تبني إيه:** عمود وقت موافقة لكل غرض (زي [[marketing_consent_at]] في الدرس اللي فات)، وcheckbox مش متعلّم لوحده، وسياسة خصوصية بتقول الحقيقة.

## ٣. [[Data subject rights]]

«صاحب البيانات» هو اليوزر. حقوقه أربعة:

| الحق | بالإنجليزي | اللي بيتبني |
|---|---|---|
| يعرف إيه اللي عندك عنه | access | زرار «نزّل بياناتي» (درس «تصدير الداتا») |
| يصحح | correction | صفحة إعدادات يعدّل فيها |
| يمسح | erasure | زرار «امسح حسابي» (درس «حذف الحساب») |
| يعترض | objection | يوقف استخدام معين (زي التسويق) |

## ٤. [[Breach]]

Breach = تسريب. لازم تبلّغ الجهة الرقابية خلال **72 ساعة** (3 أيام) في القانونين، وبعدين اليوزرز المتأثرين.

**تبني إيه:** 72 ساعة مش كفاية تعرف «إيه اللي اتسرّب ولمين» لو معندكش لوجات دخول وتغييرات صلاحيات. وكمان قايمة بالخدمات اللي بتبعتلها داتا (Sentry وخدمة الإيميل و S3).

## ٥. [[Transfers abroad]]

سيرفر في Frankfurt أو خدمة SaaS أمريكية = الداتا **خرجت بره مصر**، وده ليه شروط. **تبني إيه:** اختيار الـ region قرار تسأل فيه قبل ما تختار، مش بعد.

## ٦. [[GDPR scope]]

GDPR = General Data Protection Regulation، قانون الاتحاد الأوروبي. [[scope]] = نطاق تطبيقه: لو بتقدم خدمة لناس في أوروبا، بيطبق عليك حتى لو شركتك وسيرفرك في مصر.

## ٧. [[GDPR in code]]

الأرقام بين القوسين أرقام المواد (Art. = Article): 15 حق الوصول، و 17 حق المسح، و 20 حق النقل (portability = يخرج بياناته بصيغة يقراها برنامج، يعني JSON أو CSV مش PDF). والرد خلال **شهر**.

## ٨. [[Fines]]

الغرامات: لحد 5 مليون جنيه في القانون المصري (وفيه حبس في حالات)، ولحد 20 مليون يورو أو 4% من الإيراد العالمي، أيهما **أكبر**، في GDPR.

---

## الملخص في جدول واحد

| البند | المدة/الرقم | اللي بيتبني في الكود |
|---|---|---|
| الموافقة | — | أعمدة وقت لكل غرض |
| الوصول والنقل | شهر في GDPR | export JSON |
| المسح | شهر في GDPR | حذف حقيقي + job للملفات |
| التسريب | 72 ساعة | لوجات + قايمة processors |
| النقل للخارج | — | قرار الـ region والخدمات |

## الخلاصة

القانون مش ورقة عند المحامي بس: هو 4 features (موافقة، تصدير، حذف، لوجات) و data map. والـ data map (جدول: الداتا، والغرض، والمكان، ومدة الحفظ) هو أول حاجة تعملها، لأن من غيره مش هتعرف ترد على أي طلب.`,
          lines: [
            R`القانون المصري: اللائحة التنفيذية صدرت نوفمبر 2025، وفيه حوالي سنة توفيق أوضاع، والجهة الرقابية مركز حماية البيانات.`,
            "اجمع لغرض محدد، وموافقة صريحة مكتوبة للبيانات الحساسة.",
            "حقوق صاحب البيانات: يعرف، ويصحح، ويمسح، ويعترض. لازم يبقى فيه طريقة لكل واحدة.",
            "التسريب: بلّغ الجهة الرقابية خلال 72 ساعة في القانونين، وبعدها اليوزرز المتأثرين.",
            "النقل بره مصر ليه شروط، فاسأل قبل ما تختار region السيرفر.",
            "GDPR بيطبق عليك لو بتخدم ناس في أوروبا، حتى لو انت في مصر.",
            "حقوق GDPR اللي محتاجة كود: الوصول والمسح والنقل، والرد خلال شهر.",
            "الغرامات: لحد 5 مليون جنيه في مصر، ولحد 20 مليون يورو أو 4% من الإيراد العالمي في GDPR."
          ],
          sol: R`مثال data map لمشروع متجر صغير: الإيميل والاسم (حساب وفواتير، في Postgres، لحد ما يمسح الحساب)، وعنوان الشحن (للطلب بس، يتمسح من الطلب بعد 90 يوم من التسليم)، والتليفون (للمندوب، نفس المدة)، و IP الدخول (أمان، login_events، 90 يوم بـ job)، والصور (S3، مع الحساب)، والأخطاء (Sentry، فيها user id بس، الاحتفاظ حسب إعداد الخدمة)، والإيميلات (Resend، اسم وإيميل)، والباك أب (30 يوم وبيتمسح لوحده).

الإجابة على «امسح بياناتي»: زرار في الإعدادات بيشغّل transaction الحذف (الدرس الجاي)، و job بيمسح الملفات ويشيل الإيميل من خدمة الإيميل، والباك أب بيخلص في 30 يوم. وعلى «ابعتلي بياناتي»: job بيعمل ملف JSON ويبعت لينك (درس «تصدير الداتا و retention»).

لو إجابتك كانت «هفتح الداتابيز وأمسح بإيدي» أو «مش عارف الداتا دي فين كمان»، ده بالظبط اللي الـ data map بيكشفه.`
        },
        {
          cmd: "حذف الحساب",
          title: "زرار «امسح حسابي»: تمسح إيه، وتسيب إيه",
          desc: R`App Store بيطلب من يونيو 2022 (Guideline 5.1.1(v)) إن أي app فيه إنشاء حساب يبقى فيه حذف حساب من جوه الـ app، سهل تلاقيه، ويمسح الحساب والبيانات فعلًا. «تعطيل» أو «تجميد» الحساب مش كفاية، ومش مسموح تطلب منه يتصل أو يبعت إيميل إلا في مجالات منظّمة زي البنوك والصحة. ولو فيه Sign in with Apple لازم تلغي التوكن بتاعه من Apple كمان. و Google Play بيطلب من 2024 مسار حذف جوه الـ app، ولينك ويب يطلب منه الحذف من غير ما يسطّب الـ app تاني، وتحطه في Data safety form. راجع الإرشادات الحالية للمتجرين قبل ما تسلّم، لأنها بتتحدث.

الحذف الحقيقي مش [[DELETE FROM users]] بس. فيه داتا لازم تفضل (فواتير عشان الضرايب والمحاسبة)، فدي بتتعمل anonymize: تفضل الأرقام وتتشال أي حاجة تعرّف الشخص. والباقي يتمسح: الجلسات والتوكنات واللوجات المرتبطة. والملفات على S3 بتتحط في queue يمسحها worker. وتسجّل الـ id في جدول [[deleted_accounts]] عشان لو رجّعت باك أب قديم تعيد الحذف.`,
          example: R`\set uid 1
BEGIN;
UPDATE orders SET ship_name = NULL, ship_address = NULL WHERE user_id = :uid;
INSERT INTO files_to_delete (key)
  SELECT avatar_key FROM users WHERE id = :uid AND avatar_key IS NOT NULL;
INSERT INTO deleted_accounts (user_id) VALUES (:uid);
DELETE FROM users WHERE id = :uid;
COMMIT;`,
          try: R`اعمل database تجربة فيها: [[users]]، و [[orders]] بـ [[user_id]] عليه [[ON DELETE SET NULL]]، و [[sessions]] و [[login_events]] بـ [[ON DELETE CASCADE]]، و [[files_to_delete]] و [[deleted_accounts]] (أو خد الـ schema من الحل). حط يوزر عنده طلبات وجلسات وصورة، وشغّل المثال بـ [[psql -d test -f delete.sql]]. وبعدين اتأكد بـ queries إن مفيش أي أثر لليوزر غير أرقام الطلبات.`,
          flag: "script",
          deep: {
            why: R`المتاجر بترفض الـ app من غيره، والقوانين (القانون المصري و GDPR Art. 17) بتدّي اليوزر حق المسح. وحذف ناقص أخطر من مفيش حذف: اليوزر فاكر إن بياناته راحت، وهي لسه في S3 وخدمة الإيميل واللوج.`,
            how: R`كل جدول فيه reference لليوزر لازم تقرر فيه: يتمسح معاه ([[ON DELETE CASCADE]] للجلسات والتوكنات والـ events)، ولا يفضل من غير صاحبه ([[ON DELETE SET NULL]] للطلبات والفواتير، مع مسح الاسم والعنوان منها). ده في «تاب SQL و Prisma» في درس [[ON DELETE]].

كله في transaction واحدة (درس [[transaction]] هناك): لو خطوة فشلت مفيش حساب نص ممسوح.

الملفات مش جوه الداتابيز، ومينفعش تمسحها جوه الـ transaction (لو الـ transaction فشلت بعد ما مسحت الصورة، ضاعت). فبتكتب مفاتيحها في [[files_to_delete]] جوه نفس الـ transaction، و worker بياخدها بعد الـ commit ويمسحها ويعيد لو فشل. نفس الطريقة لخدمات بره: شيل الإيميل من قايمة الإيميلات، واحذف الـ customer من Stripe لو مش محتاجه، وامسح اليوزر من analytics.

الباك أب: مبتعدلش ملفات الباك أب. بتحدد مدة حفظ (مثلًا 30 يوم) وبتكتبها في سياسة الخصوصية، والداتا بتختفي لما الباك أب ينتهي. ولو رجّعت باك أب، شغّل الحذف تاني لكل id في [[deleted_accounts]].

وفي الـ app: اطلب تأكيد (باسورد أو OTP) قبل الحذف، ووضّح إيه اللي هيتمسح وإيه اللي هيفضل (الفواتير) وليه.`,
            when: R`من أول نسخة فيها تسجيل، خصوصًا لو هترفع على App Store أو Google Play. ولو فيه grace period (مثلًا 14 يوم يقدر يرجع فيها)، خليها واضحة، وبعدها الحذف يحصل أوتوماتيك بـ job.`,
            mistakes: R`soft delete ([[deleted_at]]) وتسميه حذف: ده تعطيل، والداتا كلها موجودة. الـ soft delete مفيد للطلبات (درس [[DELETE]] في «تاب SQL و Prisma»)، مش لحذف حساب. تمسح الصف وتنسى S3 و Sentry وخدمة الإيميل والـ cache. تمسح الفواتير كمان والمحاسب يحتاجها. تخلي الحذف عن طريق «ابعتلنا إيميل» والـ app يترفض. وتمسح الملفات جوه الـ request قبل الـ commit.

في الانترفيو «إزاي تعمل delete account؟»: قسّم الداتا لـ مسح / anonymize / حفظ قانوني، و transaction، و outbox للملفات والخدمات، والباك أب بمدة حفظ، وجدول deleted_accounts للاسترجاع.`
          },
          teach: R`## الفكرة: ٣ أنواع داتا، ٣ معاملات

المثال سكربت psql بيمسح يوزر واحد. قبل الكود قسّم داتا اليوزر:

| النوع | مثال | بيحصلها إيه |
|---|---|---|
| تتمسح معاه | الجلسات، لوجات الدخول، توكنات reset | [[DELETE]] (أو CASCADE) |
| تفضل من غير صاحبها | الطلبات والفواتير (محاسبة وضرايب) | anonymize: الأرقام تفضل والاسم والعنوان يتشالوا |
| بره الداتابيز | الصورة على S3، الإيميل في خدمة الإيميلات | تتسجل في قايمة و worker يمسحها بعد الـ commit |

كل اللي تحت اتشغّل على PostgreSQL 16 في container، بالـ schema اللي في الحل: يوزر [[mona@example.com]] عنده جلستين وطلب ولوج دخول وصورة [[avatars/1.png]].

---

## ١. [[\set uid 1]]

ده **مش SQL**، ده أمر خاص بـ psql (أي سطر بيبدأ بـ [[\]] أمر لـ psql نفسه). بيعمل متغير اسمه [[uid]] قيمته 1، وبعدين [[:uid]] في أي query بيتبدل بـ 1 قبل ما يتبعت للداتابيز. في التطبيق الحقيقي بدله [[$1]] (parameter) جوه transaction من الكود.

## ٢. [[BEGIN;]] ... [[COMMIT;]]

transaction: كل الأوامر اللي بينهم يا تنجح كلها يا ولا واحدة تتحسب. ليه مهم هنا؟ تخيّل إن الطلبات اتمسحت أسماؤها وبعدين [[DELETE]] فشل: يبقى عندك يوزر موجود وطلباته من غير اسم. مع الـ transaction ده مستحيل.

## ٣. [[UPDATE orders SET ship_name = NULL, ship_address = NULL WHERE user_id = :uid;]]

ده الـ anonymize: الطلب نفسه يفضل (رقمه وإجماليه وتاريخه للمحاسبة)، بس [[ship_name]] و [[ship_address]] يبقوا [[NULL]]. و [[WHERE user_id = :uid]] عشان نلمس طلبات اليوزر ده بس. **لازم ييجي قبل الـ DELETE**: بعد الحذف [[user_id]] هيبقى NULL ومش هتعرف طلبات مين دي.

## ٤. [[INSERT INTO files_to_delete (key) SELECT avatar_key FROM users WHERE ...]]

شكل [[INSERT ... SELECT]]: بدل [[VALUES (...)]]، الصفوف اللي هتتضاف جاية من [[SELECT]]. هنا بنجيب مفتاح صورة اليوزر ونحطه في جدول [[files_to_delete]]. و [[AND avatar_key IS NOT NULL]]: لو ملوش صورة، الـ SELECT يرجّع صفر صفوف ومفيش حاجة تتضاف (بدل صف فيه NULL).

ليه مش نمسح الصورة من S3 على طول؟ لأن S3 بره الـ transaction: لو مسحت الصورة والـ transaction فشلت بعدها، الحساب رجع والصورة ضاعت. فبنكتب «مطلوب مسح الملف ده» **جوه** الـ transaction، و worker يمسحه **بعد** الـ commit. الأسلوب ده اسمه outbox.

## ٥. [[INSERT INTO deleted_accounts (user_id) VALUES (:uid);]]

سجل إن الـ id ده اتمسح. لو بعد شهر رجّعت باك أب قديم، اليوزر هيرجع معاه، فتلف على [[deleted_accounts]] وتعيد الحذف.

## ٦. [[DELETE FROM users WHERE id = :uid;]]

هنا الـ foreign keys بتشتغل لوحدها:

- [[sessions]] و [[login_events]] معمولين [[ON DELETE CASCADE]]: صفوفهم بتتمسح مع اليوزر.
- [[orders.user_id]] معمول [[ON DELETE SET NULL]]: الطلب يفضل و [[user_id]] يبقى NULL.

### التشغيل

[[psql -d test -f delete.sql]] ([[-d]] الداتابيز، [[-f]] الملف):

~~~text الناتج
BEGIN
UPDATE 1
INSERT 0 1
INSERT 0 1
DELETE 1
COMMIT
~~~

[[INSERT 0 1]]: الرقم الأول دايمًا 0 في Postgres الحديث (كان OID زمان)، والتاني عدد الصفوف. وبعدين الـ checks اللي في الحل:

~~~text الناتج
 id | user_id | ship_name | ship_address | total
----+---------+-----------+--------------+--------
  1 |         |           |              | 350.00

 users | sessions | events
-------+----------+--------
     0 |        0 |      0

      key      |           queued_at
---------------+-------------------------------
 avatars/1.png | 2026-10-06 13:42:37.460241+00
~~~

الطلب موجود بـ 350 ومن غير أي حاجة تعرّف صاحبه، والجلستين واللوج اتمسحوا بالـ CASCADE، والصورة مستنية الـ worker.

---

## ٧. لو نسيت [[ON DELETE SET NULL]]

جرّبنا جدول [[orders]] بـ [[REFERENCES users]] عادي من غير ON DELETE:

~~~text الناتج
BEGIN
ERROR:  update or delete on table "users" violates foreign key constraint "orders_user_id_fkey" on table "orders"
DETAIL:  Key (id)=(1) is still referenced from table "orders".
ROLLBACK
 count
-------
     1
~~~

الـ DELETE رفض، والـ [[COMMIT]] بقى [[ROLLBACK]] (رجوع)، واليوزر لسه موجود. وده أحسن من حذف نص. والعكس خطر: [[ON DELETE CASCADE]] على الطلبات كان هيمسح الفواتير.

---

## الخلاصة

| الخطوة | ليه |
|---|---|
| anonymize الطلبات الأول | تفضل للمحاسبة من غير PII |
| [[files_to_delete]] جوه الـ transaction | الملفات تتمسح بعد الـ commit بس |
| [[deleted_accounts]] | تعيد الحذف لو رجّعت باك أب |
| [[DELETE]] + CASCADE / SET NULL | الـ schema بتقرر مصير كل جدول |
| [[BEGIN]]/[[COMMIT]] | مفيش حساب نص ممسوح |

و soft delete ([[deleted_at]]) مش حذف حساب: الداتا كلها لسه موجودة.`,
          lines: [
            R`متغير في psql فيه id اليوزر. في التطبيق ده [[$1]] جوه transaction من الكود.`,
            "ابدأ transaction: يا كله يحصل يا ولا حاجة.",
            "الطلبات تفضل عشان المحاسبة، بس من غير اسم ولا عنوان.",
            "سجّل مفتاح الصورة في قايمة الملفات اللي worker هيمسحها بعد الـ commit...",
            "...لو اليوزر عنده صورة أصلًا.",
            "سجّل إن الحساب ده اتمسح، عشان لو رجّعت باك أب قديم.",
            R`امسح اليوزر: الجلسات والـ events بتتمسح بـ CASCADE، و [[orders.user_id]] بيبقى NULL.`,
            "ثبّت كل التغييرات مرة واحدة."
          ],
          sol: R`بعد التشغيل: الطلبات موجودة بالـ total بتاعها، بس [[user_id]] و [[ship_name]] و [[ship_address]] كلهم NULL. [[sessions]] و [[login_events]] مفيهمش ولا صف لليوزر (الـ CASCADE مسحهم)، و [[files_to_delete]] فيه [[avatars/1.png]]، و [[deleted_accounts]] فيه الـ id.

الغلط الشائع: لو [[orders.user_id]] من غير [[ON DELETE SET NULL]]، الـ DELETE هيفشل بـ foreign key violation والـ transaction كلها ترجع، ودي حاجة كويسة (أحسن من حذف نص). ولو عامل الـ FK بـ CASCADE على الطلبات، هتمسح الفواتير وده غالبًا ضد القانون المحاسبي.

الـ schema والـ checks تحت، شغّلهم في database فاضية، وبعدين شغّل المثال، وبعدين الـ checks.`,
          solCode: R`CREATE TABLE users (id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY, email text UNIQUE NOT NULL, name text NOT NULL, phone text, avatar_key text, created_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE sessions (id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY, user_id bigint NOT NULL REFERENCES users ON DELETE CASCADE);
CREATE TABLE login_events (id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY, user_id bigint REFERENCES users ON DELETE CASCADE, ip inet, created_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE password_resets (id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY, user_id bigint NOT NULL REFERENCES users ON DELETE CASCADE, created_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE orders (id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY, user_id bigint REFERENCES users ON DELETE SET NULL, ship_name text, ship_address text, total numeric(12,2) NOT NULL, created_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE files_to_delete (key text PRIMARY KEY, queued_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE deleted_accounts (user_id bigint PRIMARY KEY, deleted_at timestamptz NOT NULL DEFAULT now());

INSERT INTO users (email, name, avatar_key) VALUES ('mona@example.com', 'Mona Ali', 'avatars/1.png');
INSERT INTO sessions (user_id) VALUES (1), (1);
INSERT INTO login_events (user_id, ip) VALUES (1, '41.33.1.10');
INSERT INTO orders (user_id, ship_name, ship_address, total) VALUES (1, 'Mona Ali', '12 Tahrir St, Cairo', 350);

-- بعد ما تشغّل delete.sql:
SELECT id, user_id, ship_name, ship_address, total FROM orders;
SELECT (SELECT count(*) FROM users WHERE id = 1) AS users,
       (SELECT count(*) FROM sessions WHERE user_id = 1) AS sessions,
       (SELECT count(*) FROM login_events WHERE user_id = 1) AS events;
SELECT * FROM files_to_delete;
SELECT * FROM deleted_accounts;`
        },
        {
          cmd: "تصدير الداتا و retention",
          title: "ابعتله بياناته، وامسح القديم لوحده",
          desc: R`حق الوصول ونقل البيانات (GDPR Art. 15 و 20، وحق العلم في القانون المصري) معناه عمليًا زرار «نزّل بياناتي» بيدّي اليوزر ملف JSON فيه كل حاجة عنه. Postgres يقدر يبني الـ JSON ده في query واحدة بـ [[json_build_object]] و [[json_agg]]. ولو الداتا كبيرة، اعمله job في الخلفية يطلّع الملف ويبعت لينك بيخلص بعد وقت قصير.

والـ retention: كل نوع داتا ليه مدة، وبعدها يتمسح أوتوماتيك. لوجات الدخول 90 يوم، وتوكنات reset الباسورد يوم، والحسابات اللي متفعّلتش أسبوع. ده بيتعمل بـ job مجدول (زي job scheduler في BullMQ، في درس «background jobs» في «تاب بناء مشروع كامل»)، بيمسح على دفعات صغيرة عشان ميقفلش الجدول.`,
          example: R`\set uid 1
SELECT json_build_object(
  'profile', (SELECT row_to_json(u) FROM (SELECT email, name, phone, created_at FROM users WHERE id = :uid) u),
  'orders', (SELECT coalesce(json_agg(o ORDER BY o.created_at), '[]') FROM (SELECT id, total, ship_address, created_at FROM orders WHERE user_id = :uid) o),
  'exported_at', now()
) AS export;
WITH old AS (
  SELECT id FROM login_events
  WHERE created_at < now() - interval '90 days'
  ORDER BY id LIMIT 5000
)
DELETE FROM login_events e USING old WHERE e.id = old.id;`,
          try: R`على نفس الـ database بتاعة درس «حذف الحساب»: حط يوزر وطلبين، وشغّل الـ export بـ [[psql -qAt -f export.sql | python3 -m json.tool]]. بعدين املى [[login_events]] بـ 200 صف بتواريخ قديمة ([[generate_series]])، وشغّل الـ DELETE أكتر من مرة وعدّ الصفوف كل مرة. وآخر حاجة اكتب job في Node بيلف على كذا جدول ويمسح لحد ما يخلص.`,
          flag: "script",
          deep: {
            why: R`التصدير حق قانوني، والرد عليه يدوي كل مرة مش هيكمل. والـ retention بيقلل حجم أي تسريب: داتا اتمسحت من سنة مش ممكن تتسرق النهارده. وكمان بيصغّر الجداول والباك أبات.`,
            how: R`[[row_to_json]] بيحوّل صف لـ object، و [[json_agg]] بيجمّع صفوف في array، و [[coalesce(..., '[]')]] عشان اليوزر اللي ملوش طلبات ياخد array فاضية مش null. صدّر الداتا اللي تخص اليوزر هو بس، مش الـ internal IDs والـ hashes (مفيش [[password_hash]] في الملف).

الـ retention: الـ CTE بياخد أقدم 5000 id بس، والـ DELETE بيمسحهم. الـ job بيكرر لحد ما دفعة ترجع أقل من 5000. الدفعات بتخلي كل transaction قصيرة، فالـ locks والـ WAL ميتقلوش والتطبيق يفضل شغال. محتاج index على [[created_at]] عشان الـ WHERE يبقى سريع.

التصدير الكبير: job بيكتب الملف لـ S3 ويبعت لليوزر لينك موقّع صلاحيته ساعات قليلة، والملف نفسه يتمسح بعد أيام. واطلب إعادة تسجيل دخول قبل التصدير، وحط rate limit عليه.

وللجداول الضخمة جدًا (logs بالملايين يوميًا) الأسرع partitioning بالشهر: بتعمل [[DROP]] للـ partition القديم بدل DELETE.`,
            when: R`التصدير: أول ما يبقى عندك يوزرز حقيقيين. والـ retention: لكل جدول بيكبر مع الوقت وفيه PII (events، و audit logs، و tokens، و notifications)، ومعاه المدة مكتوبة في سياسة الخصوصية.`,
            mistakes: R`[[DELETE ... WHERE created_at < ...]] مرة واحدة على ملايين صفوف: transaction طويلة جدًا، وlocks، و replication lag. تحط الـ retention بـ setInterval جوه سيرفر الـ API فيشتغل مرتين لو عندك instanceتين. التصدير فيه password_hash أو داتا يوزرز تانيين (مثلًا رسايل فيها اسم الطرف التاني بالكامل). ولينك التصدير من غير صلاحية وقت أو من غير auth.`
          },
          teach: R`## الفكرة: query بتبني JSON، و query بتمسح على دفعات

المثال جزئين: الأول [[SELECT]] بيرجّع كل داتا يوزر واحد كـ JSON object واحد (حق الوصول والنقل)، والتاني [[DELETE]] بيمسح لوجات الدخول الأقدم من 90 يوم، 5000 صف في المرة (الـ retention). اتشغّلوا على PostgreSQL 16 في container، على داتابيز درس «حذف الحساب» ومعاها يوزر [[sara@example.com]] (id 2) عندها طلبين، ويوزر [[omar@example.com]] (id 3) من غير طلبات.

---

## الجزء الأول: التصدير، من جوه لبرة

### الخطوة ١: subquery بيختار الأعمدة

~~~text
(SELECT email, name, phone, created_at FROM users WHERE id = :uid) u
~~~

[[SELECT]] عادي جوه قوسين، والـ [[u]] بعد القوس **اسم مستعار** (alias) للنتيجة، عشان نقدر نشاور عليها. لاحظ إن الأعمدة **مختارة بالاسم**: مفيش [[password_hash]] ولا [[avatar_key]]. التصدير فيه اللي يخص اليوزر، مش أسرار السيستم.

### الخطوة ٢: [[row_to_json(u)]]

بياخد الصف ويحوّله JSON object، أسامي الأعمدة بقت keys:

~~~text الناتج (لـ Omar)
{"email":"omar@example.com","name":"Omar"}
~~~

### الخطوة ٣: [[json_agg(o ORDER BY o.created_at)]]

[[json_agg]] (aggregate = تجميع) بياخد **كل الصفوف** ويعملهم JSON array واحد، و [[ORDER BY]] جواه بيرتب العناصر بالتاريخ.

### الخطوة ٤: [[coalesce(..., '[]')]]

لو اليوزر ملوش طلبات، [[json_agg]] على صفر صفوف بيرجّع [[NULL]] مش array فاضية. [[coalesce(a, b)]] بترجّع أول قيمة مش NULL:

~~~text الناتج
 without_coalesce | with_coalesce
------------------+---------------
                  | []
~~~

ليه يفرق؟ الكود اللي هيقرا الملف ([[data.orders.length]]) هيقع على [[null]] ويشتغل على [[[]]].

### الخطوة ٥: [[json_build_object('profile', ..., 'orders', ..., 'exported_at', now())]]

بيبني object من أزواج: key وبعده value. و [[AS export]] اسم العمود في الناتج.

### التشغيل

[[psql -qAt -f export.sql | python3 -m json.tool]]: [[-q]] quiet (من غير رسايل)، و [[-A]] من غير محاذاة الجدول، و [[-t]] من غير عناوين الأعمدة، فالناتج JSON صافي. و [[python3 -m json.tool]] بيرتبه (على ويندوز اسمه [[python]]):

~~~text الناتج (Sara)
{
    "profile": {
        "email": "sara@example.com",
        "name": "Sara Adel",
        "phone": "01012345678",
        "created_at": "2026-10-06T13:42:54.463953+00:00"
    },
    "orders": [
        { "id": 2, "total": 120.0, "ship_address": "5 Nile St, Giza", "created_at": "2026-09-01T00:00:00+00:00" },
        { "id": 3, "total": 80.5, "ship_address": "5 Nile St, Giza", "created_at": "2026-09-20T00:00:00+00:00" }
    ],
    "exported_at": "2026-10-06T13:43:02.630372+00:00"
}
~~~

(الطلبات اتجمعت في سطر للاختصار.) و Omar طلع [[ "orders" : [] ]].

---

## الجزء التاني: الـ retention

### [[WITH old AS (...)]]

[[WITH]] بيعمل CTE (Common Table Expression): نتيجة مؤقتة ليها اسم ([[old]]) تستخدمها في الأمر اللي بعدها. جواها:

| الحتة | معناها |
|---|---|
| [[SELECT id FROM login_events]] | هات الـ ids بس |
| [[WHERE created_at < now() - interval '90 days']] | الأقدم من 90 يوم. [[interval]] نوع «مدة»، و [[now() - interval]] تاريخ |
| [[ORDER BY id LIMIT 5000]] | أقدم 5000 بس |

### [[DELETE FROM login_events e USING old WHERE e.id = old.id;]]

[[USING old]] بيدخّل الـ CTE في الـ DELETE كأنه join، و [[e]] اسم مستعار للجدول. يعني: امسح من [[login_events]] كل صف الـ id بتاعه موجود في [[old]].

### ليه دفعات؟

[[DELETE ... WHERE created_at < ...]] مرة واحدة على ملايين صفوف = transaction طويلة، بتمسك locks وبتكتب WAL كتير. الدفعات بتخلي كل مرة سريعة. جرّبنا على 200 صف بتواريخ من يوم لـ 200 يوم ([[generate_series(1, 200)]] بيولّد الأرقام 1 لـ 200):

~~~text الناتج
 old | total
-----+-------
 111 |   200
DELETE 111
DELETE 0
~~~

ليه 111 مش 110؟ الأيام من 90 لـ 200 = 111 يوم، ويوم 90 اتحسب لأن [[now()]] وقت الـ DELETE بعد وقت الـ INSERT بأجزاء من الثانية. ولما غيّرنا [[LIMIT]] لـ 50:

~~~text الناتج
DELETE 50
DELETE 50
DELETE 11
DELETE 0
~~~

ده بالظبط سلوك الـ job: يكرر لحد ما دفعة ترجع أقل من الـ LIMIT.

---

## الجزء التالت: الـ job في Node (الحل)

| السطر | معناه |
|---|---|
| [[new pg.Pool({ connectionString: process.env.DATABASE_URL })]] | مجموعة اتصالات بالداتابيز من متغير بيئة |
| [[RULES]] | لستة ثابتة: الجدول ومدة الحفظ |
| [[for (const { table, keep } of RULES)]] | لف على كل قاعدة، و [[{ table, keep }]] بيفك الـ object لمتغيرين |
| [[do { ... } while (n === 5000)]] | نفّذ مرة على الأقل، وكرر طول ما الدفعة كاملة |
| [[$1::interval]] | المدة بتتبعت parameter، و [[::interval]] تحويل نوع |
| [[$__{table}]] | اسم الجدول متلزق في النص: آمن هنا بس لأنه من [[RULES]] مش من يوزر |
| [[({ rowCount: n } = await pool.query(...))]] | خد عدد الصفوف الممسوحة في [[n]]. القوسين حوالين السطر لازمين لما تفك object في متغير موجود |

اتشغّل بـ [[DATABASE_URL=postgres://...@127.0.0.1:55432/test node run.mjs]] مرتين:

~~~text الناتج
{"job":"retention","table":"login_events","deleted":111}
{"job":"retention","table":"password_resets","deleted":1}
{"job":"retention","table":"login_events","deleted":0}
{"job":"retention","table":"password_resets","deleted":0}
~~~

التشغيل التاني صفر: الـ job **idempotent**، تشغّله مرتين مفيش ضرر.

## الخلاصة

- التصدير: [[row_to_json]] للصف، و [[json_agg]] للصفوف، و [[coalesce(..., '[]')]] للفاضي، وأعمدة مختارة بالاسم.
- الـ retention: CTE بـ LIMIT + [[DELETE ... USING]]، ويتكرر لحد ما يخلص.
- الـ job يشتغل من scheduler مرة، مش [[setInterval]] في كل instance.`,
          lines: [
            R`id اليوزر (في التطبيق [[$1]]).`,
            "ابني object واحد فيه كل حاجة.",
            "بيانات الحساب: صف واحد يتحول لـ object.",
            R`الطلبات كـ array مرتّبة، و array فاضية لو مفيش.`,
            "وقت التصدير.",
            "قفلة، والناتج عمود اسمه export.",
            "الـ retention: هات دفعة من الصفوف القديمة...",
            "...من جدول لوجات الدخول...",
            "...اللي عدّى عليها 90 يوم...",
            "...أقدم 5000 بس عشان الـ transaction تفضل قصيرة.",
            "قفلة الـ CTE.",
            "امسح الصفوف دي بس. الـ job بيكرر لحد ما يخلص."
          ],
          sol: R`الـ export بيطلع object فيه [[profile]] (الإيميل والاسم والتليفون ووقت التسجيل) و [[orders]] كـ array و [[exported_at]]. ويوزر من غير طلبات بياخد [[orders]] كـ array فاضية مش null، بفضل الـ coalesce.

مع 200 صف من 1 لـ 200 يوم: أول DELETE بيقول [[DELETE 111]] (من يوم 90 لـ 200، لأنهم أقل من 5000، ويوم 90 نفسه بيتحسب لأن [[now()]] وقت الـ DELETE بعد وقت الـ INSERT بشوية)، والتاني [[DELETE 0]]، والباقي 89. لو غيّرت الـ LIMIT لـ 50 هتشوف 50 ثم 50 ثم 11 ثم 0، وده اللي الـ job بيعمله.

الـ job تحت اتجرب على Postgres 16: أول تشغيل بيطبع عدد الممسوح لكل جدول، والتاني بيطبع 0. اسم الجدول متحط في الـ SQL من لستة ثابتة في الكود، مش من مدخل مستخدم، والمدة بتتبعت كـ parameter. شغّله من job scheduler مرة في اليوم (BullMQ أو cron على السيرفر)، مش من جوه كل instance.`,
          solCode: R`// retention.mjs
import pg from "pg";
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

const RULES = [
  { table: "login_events", keep: "90 days" },
  { table: "password_resets", keep: "1 day" },
];

export async function runRetention() {
  for (const { table, keep } of RULES) {
    let total = 0, n;
    do {
      ({ rowCount: n } = await pool.query(
        $__btWITH old AS (SELECT id FROM $__{table} WHERE created_at < now() - $1::interval ORDER BY id LIMIT 5000)
         DELETE FROM $__{table} t USING old WHERE t.id = old.id$__bt, [keep]));
      total += n;
    } while (n === 5000);
    console.log(JSON.stringify({ job: "retention", table, deleted: total }));
  }
}`
        },
        {
          cmd: "تشفير عمود حساس",
          title: "الرقم القومي متشفّر في التطبيق، والمفتاح بره الداتابيز",
          desc: R`تشفير الديسك اللي بتعمله الـ managed databases بيحميك لو حد سرق الهارد بس. أي حد معاه SQL (ثغرة injection، أو dump اتسرّب، أو نسخة staging، أو موظف) بيشوف الداتا واضحة. التشفير في التطبيق (application-level) معناه إن العمود متخزن نص مش مفهوم، والمفتاح عند التطبيق بس، فالـ dump لوحده مالوش قيمة.

استخدم [[aes-256-gcm]] من [[node:crypto]]: بيشفّر وبيتأكد إن محدش عدّل النص (auth tag). و IV عشوائي جديد لكل قيمة. وحط رقم نسخة المفتاح ([[v1:]]) في أول النص عشان تقدر تغيّر المفتاح بعدين.

المشكلة: مش هتعرف تعمل [[WHERE national_id = ...]] على نص متشفّر، لأن نفس الرقم بيطلع مختلف كل مرة. الحل «blind index»: عمود تاني فيه [[HMAC]] للرقم بمفتاح سري تاني، فتدوّر بيه (مطابقة كاملة بس، مش LIKE).

المفتاح: من KMS (AWS KMS، أو Google Cloud KMS، أو Vault) أو secret manager، وأقل حاجة متغير بيئة مش في Git. و [[pgcrypto]] بديل جوه Postgres، بس المفتاح بيتبعت مع كل query للداتابيز، فممكن يظهر في لوجات الاستعلامات، وأي حد معاه SQL والمفتاح يفك.`,
          example: R`import { createCipheriv, createDecipheriv, createHmac, randomBytes } from "node:crypto";
const KEY = Buffer.from(process.env.PII_KEY, "base64");
const INDEX_KEY = Buffer.from(process.env.PII_INDEX_KEY, "base64");

export function encrypt(text) {
  const iv = randomBytes(12);
  const c = createCipheriv("aes-256-gcm", KEY, iv);
  const data = Buffer.concat([c.update(text, "utf8"), c.final()]);
  return ["v1", iv.toString("base64"), c.getAuthTag().toString("base64"), data.toString("base64")].join(":");
}

export function decrypt(stored) {
  const [ver, iv, tag, data] = stored.split(":");
  if (ver !== "v1") throw new Error("unknown key version");
  const d = createDecipheriv("aes-256-gcm", KEY, Buffer.from(iv, "base64"));
  d.setAuthTag(Buffer.from(tag, "base64"));
  return Buffer.concat([d.update(Buffer.from(data, "base64")), d.final()]).toString("utf8");
}

export const blindIndex = (text) => createHmac("sha256", INDEX_KEY).update(text).digest("hex");`,
          try: R`احفظ المثال في [[pii-crypto.mjs]]، واعمل مفتاحين بـ [[openssl rand -base64 32]]، وشغّل سكربت اختبار بـ [[PII_KEY=... PII_INDEX_KEY=... node test.mjs]]: شفّر نفس الرقم مرتين وقارن الناتجين، وفك واحد منهم، وقارن الـ blind index للرقم مرتين. وبعدين غيّر byte واحد في الجزء الأخير من النص المتشفّر وحاول تفكه. وآخر حاجة شغّله من غير [[PII_KEY]] خالص.`,
          flag: "script",
          deep: {
            why: R`في أي تسريب، الفرق بين «اتسرّب عمود متشفّر» و «اتسرّبت 100 ألف رقم قومي» هو الفرق بين حادثة صغيرة وكارثة قانونية. والتشفير في التطبيق بيحمي الـ dumps والباك أبات والـ replicas ونسخ staging، اللي هي أكتر أماكن الداتا بتتسرّب منها.`,
            how: R`GCM بيطلّع 3 حاجات: النص المتشفّر، والـ IV (12 byte عشوائي، مش سر بس لازم ميتكررش مع نفس المفتاح)، والـ auth tag (16 byte). بنخزنهم مع بعض في string واحد. وقت الفك، [[setAuthTag]] بيخلي [[final()]] يرمي error لو أي byte اتغير، فمحدش يقدر يعدّل القيمة من غير المفتاح.

الـ blind index: [[HMAC-SHA256]] بمفتاح منفصل. لو استخدمت [[sha256]] من غير مفتاح، الرقم القومي 14 رقم وجزء كبير منه متوقع (تاريخ الميلاد والمحافظة)، فممكن تجرّب كل الاحتمالات وترجّع الأرقام من الـ hash. الـ HMAC من غير مفتاحه مالوش قيمة.

KMS و envelope encryption: الـ KMS بيحتفظ بـ master key عمره ما بيطلع منه. التطبيق عنده data key متشفّر بالـ master key، وبيطلب من الـ KMS يفكه مرة وقت التشغيل ويحتفظ بيه في الذاكرة. لو حد سرق الكود والـ config من غير صلاحية الـ KMS، مش هيعرف يفك.

تغيير المفتاح: اعمل [[v2]] بمفتاح جديد، والكتابة الجديدة بـ v2، و [[decrypt]] يقرا الاتنين، و job يعيد تشفير القديم تدريجيًا.`,
            when: R`للأعمدة اللي تسريبها يضر بجد: الرقم القومي، وأرقام الحسابات، والبيانات الصحية، وتوكنات الـ OAuth لخدمات تانية. مش لكل عمود: الإيميل غالبًا محتاج تبحث بيه وتبعتله، فتشفيره تكلفته عالية وفايدته أقل.`,
            mistakes: R`IV ثابت أو متكرر مع GCM: بيكسر التشفير بالكامل. المفتاح في نفس الـ repo أو نفس الداتابيز. [[sha256]] من غير مفتاح كـ «تشفير» للرقم القومي. تستخدم [[aes-256-cbc]] من غير MAC فحد يعدّل النص من غير ما تاخد بالك. تنسى إن التشفير بيمنع [[LIKE]] والترتيب والـ indexes العادية. وتطبع القيمة بعد الفك في اللوج.

في الانترفيو «encryption at rest كفاية؟»: لأ، بيحمي من سرقة الديسك بس. application-level encryption بيحمي من الـ dump و SQL injection وأي حد عنده صلاحية قراية بس.`
          },
          teach: R`## الفكرة: 3 دوال في ملف واحد

المثال module اسمه [[pii-crypto.mjs]] بيصدّر 3 دوال: [[encrypt]] بتحوّل الرقم القومي لنص متشفّر، و [[decrypt]] بترجّعه، و [[blindIndex]] بتعمل بصمة ثابتة تدوّر بيها. كل اللي تحت اتشغّل بـ Node 24 على ويندوز (Git Bash و PowerShell).

---

## ١. السطر الأول: الـ import

~~~text
import { createCipheriv, createDecipheriv, createHmac, randomBytes } from "node:crypto";
~~~

[[node:crypto]] مكتبة جوه Node نفسه (الـ [[node:]] قبل الاسم بيقول «من Node مش من npm»)، فمفيش [[npm install]]. وبناخد منها 4 دوال بالاسم بين [[{ }]]:

| الدالة | بتعمل إيه |
|---|---|
| [[randomBytes]] | bytes عشوائية آمنة (للـ IV) |
| [[createCipheriv]] | تجهّز «مشفّر» بخوارزمية ومفتاح و IV |
| [[createDecipheriv]] | نفس الكلام للفك |
| [[createHmac]] | بصمة بمفتاح |

## ٢. المفاتيح

~~~text
const KEY = Buffer.from(process.env.PII_KEY, "base64");
~~~

[[process.env.PII_KEY]] قيمة متغير البيئة. والمفتاح متخزن كـ **base64**: طريقة تكتب bytes عشوائية كحروف عادية تتحط في [[.env]]. [[Buffer.from(..., "base64")]] بيرجّعها bytes. نولّد مفتاح:

~~~bash
openssl rand -base64 32
~~~

~~~text الناتج (مثال، كل مرة مختلف)
m915kkU9znVTgANKRnS5u9nF+Chj9/cteyRF66xo8I8=
~~~

44 حرف، ولما تفكهم ([[base64 -d | wc -c]]) يطلعوا **32 byte** = 256 bit، وده اللي [[aes-256]] محتاجه. و [[INDEX_KEY]] مفتاح **تاني** للبصمة: لو مفتاح واحد اتسرّب، التاني لسه سليم.

---

## ٣. [[encrypt(text)]]: من جوه لبرة

### [[randomBytes(12)]]

الـ IV (Initialization Vector): 12 byte عشوائي **جديد لكل قيمة**. مش سر، بس لازم ميتكررش مع نفس المفتاح. هو اللي بيخلي نفس الرقم يتشفّر بشكل مختلف كل مرة.

### [[createCipheriv("aes-256-gcm", KEY, iv)]]

- [[aes]]: الخوارزمية القياسية للتشفير.
- [[256]]: طول المفتاح بالـ bit.
- [[gcm]] (Galois/Counter Mode): طريقة تشغيل بتشفّر **وكمان** بتطلّع auth tag، بصمة 16 byte بتكشف أي تعديل.

### [[Buffer.concat([c.update(text, "utf8"), c.final()])]]

[[update]] بيشفّر النص (و [[utf8]] بيقول النص مكتوب إزاي)، و [[final]] بيقفل التشفير. و [[Buffer.concat]] بيلزق الناتجين.

### الـ return: 4 حتت في string واحد

~~~text
["v1", iv, tag, data].join(":")
~~~

كل حتة بـ base64، و [[join(":")]] بيحط [[:]] بينهم. الناتج الحقيقي:

~~~text الناتج
v1:YSy10EzZu4rlFL6Y:WlOoyHDrfIUqvnWGVcuxlA==:DQwOgFQqu+7jXjKEKfw=
~~~

| الحتة | الطول | معناها |
|---|---|---|
| [[v1]] | — | نسخة المفتاح، عشان تغيّره بعدين |
| [[YSy10EzZu4rlFL6Y]] | 16 حرف = 12 byte | الـ IV |
| [[WlOo...xlA==]] | 24 حرف = 16 byte | الـ auth tag |
| [[DQwO...Kfw=]] | 20 حرف = 14 byte | الرقم نفسه متشفّر (14 رقم = 14 byte) |

---

## ٤. [[decrypt(stored)]]

1. [[stored.split(":")]] بيقسم الـ string، و [[const [ver, iv, tag, data] =]] بيحط كل حتة في متغير.
2. لو [[ver]] مش [[v1]]: [[throw new Error]] يوقف بدل ما يفك بمفتاح غلط.
3. [[createDecipheriv]] بنفس المفتاح والـ IV.
4. [[d.setAuthTag(...)]]: إديله البصمة اللي اتخزنت.
5. [[d.final()]] بيقارن البصمة بالمحسوبة. لو أي byte اتغير بيرمي error.

## ٥. [[blindIndex]]

[[createHmac("sha256", INDEX_KEY).update(text).digest("hex")]]: HMAC-SHA256 بالمفتاح التاني، والناتج [[hex]] (أرقام وحروف a-f). نفس المدخل = نفس الناتج دايمًا، ورقم مختلف برقم واحد = ناتج مختلف خالص:

~~~text الناتج
55e51050138378db11e9dd90277fa07d9e63f6f55fa14c86a82cbbfc6a484162   ← 29001011234567
f6e0aab7daed03af6cd1e7f3f856a0c1fe3a3f594faf0f8a2cd9621ed5340ad0   ← 29001011234568
~~~

---

## ٦. الاختبار ([[test.mjs]] في الحل)

على Git Bash:

~~~bash
PII_KEY=$(openssl rand -base64 32) PII_INDEX_KEY=$(openssl rand -base64 32) node test.mjs
~~~

و [[VAR=value command]] بيحط المتغير للأمر ده بس. وفي PowerShell: [[$env:PII_KEY = "..."]] وبعدين [[node test.mjs]].

~~~text الناتج
v1:M0W8ht2LMs+0yjHt:uEJpFeI+ktblR4wA3GLVMA==:JSMx9jEhApD26GlbedI=
same ciphertext? false
decrypt: 29001011234567
same index? true
tampered: Unsupported state or unable to authenticate data
~~~

- [[same ciphertext? false]]: نفس الرقم مرتين = نصين مختلفين (IV جديد).
- [[same index? true]]: البصمة ثابتة، فتدوّر بيها.
- [[tampered]]: الاختبار عمل [[data[0] ^= 1]]، يعني قلب bit واحد في أول byte ([[^]] = XOR)، و [[final()]] رفض.

ومن غير [[PII_KEY]]:

~~~text الناتج
TypeError [ERR_INVALID_ARG_TYPE]: The first argument must be of type string or an instance of Buffer, ArrayBuffer, or Array or an Array-like Object. Received undefined
~~~

ومفتاح 16 byte بس ([[openssl rand -base64 16]]): [[RangeError: Invalid key length]]. التطبيق بيقع بدل ما يشتغل غلط، ودي حاجة كويسة.

## الخلاصة

| | |
|---|---|
| الخوارزمية | [[aes-256-gcm]]: تشفير + كشف تعديل |
| IV | 12 byte عشوائي جديد كل مرة، يتخزن مع النص |
| الشكل المخزّن | [[v1:iv:tag:data]] |
| البحث | HMAC بمفتاح تاني في عمود عليه UNIQUE |
| المفاتيح | من KMS أو متغير بيئة، مش في Git ولا الداتابيز |`,
          lines: [
            R`دوال التشفير والـ HMAC والأرقام العشوائية من Node نفسه، مفيش مكتبة.`,
            R`مفتاح التشفير: 32 byte من متغير بيئة (أو من KMS وقت التشغيل). لو مش موجود السكربت بيقع على طول.`,
            R`مفتاح تاني منفصل للـ blind index.`,
            "دالة التشفير.",
            "IV عشوائي جديد لكل قيمة، 12 byte المقاس المعتاد لـ GCM.",
            R`اعمل cipher بـ [[aes-256-gcm]].`,
            "شفّر النص.",
            R`خزّن النسخة والـ IV والـ tag والنص في string واحد مفصول بـ [[:]].`,
            "قفلة.",
            "دالة الفك.",
            "فصّل الأجزاء الأربعة.",
            "لو نسخة مفتاح مش معروفة، وقّف.",
            "اعمل decipher بنفس المفتاح والـ IV.",
            R`حط الـ tag عشان [[final()]] يتأكد إن محدش عدّل حاجة.`,
            R`فك وارجع النص. لو اتعدّل، [[final()]] بيرمي error.`,
            "قفلة.",
            R`blind index: [[HMAC]] بالمفتاح التاني، نفس المدخل بيدّي نفس الناتج دايمًا فتقدر تدوّر بيه.`
          ],
          sol: R`هتشوف حاجة زي [[v1:uuOQ...:6Yje...==:xvWB...]]، و [[same ciphertext? false]] لأن كل مرة IV جديد، و [[decrypt: 29001011234567]]، و [[same index? true]]، و [[tampered: Unsupported state or unable to authenticate data]]: الـ auth tag كشف التعديل.

ومن غير [[PII_KEY]]: السكربت بيقع أول ما يتحمّل بـ TypeError من [[Buffer.from(undefined)]]. ده سلوك كويس: التطبيق ميشتغلش من غير مفتاح بدل ما يخزّن داتا مش متشفّرة. ولو المفتاح مش 32 byte هتاخد [[Invalid key length]].

لو [[same ciphertext]] طلعت true، يبقى الـ IV ثابت، ودي أخطر غلطة في GCM.

في الداتابيز: بتخزّن [[encrypt(id)]] في [[national_id_enc]] و [[blindIndex(id)]] في [[national_id_idx]] (عليه UNIQUE)، وتدوّر بـ [[WHERE national_id_idx = $1]] وتبعت [[blindIndex(input)]].`,
          solCode: R`// test.mjs
import { encrypt, decrypt, blindIndex } from "./pii-crypto.mjs";

const a = encrypt("29001011234567");
const b = encrypt("29001011234567");
console.log(a);
console.log("same ciphertext?", a === b);
console.log("decrypt:", decrypt(a));
console.log("same index?", blindIndex("29001011234567") === blindIndex("29001011234567"));

const parts = a.split(":");
const data = Buffer.from(parts[3], "base64");
data[0] ^= 1;
parts[3] = data.toString("base64");
try {
  decrypt(parts.join(":"));
} catch (e) {
  console.log("tampered:", e.message);
}`
        },
        {
          cmd: "mask قبل staging",
          title: "نسخة الإنتاج لـ staging، من غير بيانات الناس",
          desc: R`«خلينا ناخد نسخة من الإنتاج على staging عشان نجرّب على داتا حقيقية» طلب منطقي، بس staging غالبًا أضعف في الحماية، وعليه ناس أكتر، وأحيانًا بيبعت إيميلات حقيقية. الحل: mask. تاخد نسخة في database مؤقتة، وتغيّر كل PII لقيم مزيفة ثابتة الشكل، وبعدين تعمل dump من النسخة الممسوحة وتحطها على staging.

استخدم [[example.test]] للإيميلات: [[.test]] دومين محجوز مش هيوصل لحد حقيقي، فحتى لو staging بعت إيميل مش هيوصل. وسيب الأعمدة اللي مش PII (الأسعار، والتواريخ، والحالات) زي ما هي، عشان الداتا تفضل واقعية للتجربة. وفيه أدوات بتعمل ده بقواعد زي extension اسمه PostgreSQL Anonymizer، بس الفكرة واحدة.`,
          example: R`BEGIN;
UPDATE users SET
  email = 'user' || id || '@example.test',
  name = 'User ' || id,
  phone = CASE WHEN phone IS NULL THEN NULL ELSE '0100000' || lpad((id % 10000)::text, 4, '0') END,
  avatar_key = NULL;
UPDATE orders SET ship_name = 'Test User', ship_address = 'Test address';
TRUNCATE sessions, login_events;
SELECT count(*) AS leftover FROM users WHERE email NOT LIKE '%@example.test';
COMMIT;`,
          try: R`خد database فيها يوزرز وطلبات (زي بتاعة درس «حذف الحساب»)، واعتبرها الإنتاج. اعمل database مؤقتة وانسخ فيها بـ [[pg_dump | psql]]، وشغّل الـ mask عليها، وبعدين انسخها لـ database تالتة اسمها staging وامسح المؤقتة. في الآخر دوّر في dump الـ staging على أي اسم أو إيميل حقيقي بـ [[grep]].`,
          flag: "script",
          deep: {
            why: R`تسريبات كتير جت من نسخ staging أو dev أو من لابتوب مطوّر عليه dump الإنتاج، مش من الإنتاج نفسه. والقانون مش بيفرّق: داتا الناس اتسرّبت من عندك. وكمان staging بإيميلات حقيقية ممكن يبعت لعملاء حقيقيين إيميلات تجربة.`,
            how: R`ليه database مؤقتة ومش نعمل mask على staging على طول؟ لأن الـ UPDATE في Postgres بيعمل نسخة جديدة من الصف والقديمة بتفضل في الملفات لحد الـ VACUUM، وكمان في الـ WAL. لما تعمل dump من المؤقتة (logical)، الـ dump فيه القيم الجديدة بس، والمؤقتة بتتمسح بالكامل.

القيم المزيفة ثابتة ومبنية على الـ id: نفس اليوزر بياخد نفس الإيميل المزيف كل مرة، فالـ UNIQUE على الإيميل ميتكسرش، والـ bug اللي بتدور عليه في يوزر 1234 يفضل في يوزر 1234.

الـ [[SELECT count(*) AS leftover]] check جوه الـ transaction: لو طلع أكبر من 0 عارف إن فيه حاجة فاتت. و [[ON_ERROR_STOP=1]] في psql بيوقف السكربت عند أول خطأ بدل ما يكمل ويعمل dump نص ممسوح.

الـ TRUNCATE للجداول اللي مالهاش لازمة في staging أصلًا (الجلسات، واللوجات، والتوكنات). والجداول الجديدة: كل migration بيضيف عمود PII لازم يضيف سطره في سكربت الـ mask، فخليه جنب الـ migrations وراجعه في الـ PR.`,
            when: R`قبل أي نسخ من الإنتاج لأي مكان تاني: staging، و dev، و preview branches (خدمات زي Neon و Supabase بتعمل branches من الإنتاج بسهولة)، أو dump لمطوّر عشان يحل bug. ولو ينفع، الأحسن seed data مزيفة من الأول، والـ mask للحالات اللي محتاجة شكل الداتا الحقيقي.`,
            mistakes: R`تعمل mask على staging بعد الـ restore، والقيم القديمة تفضل في الـ WAL والباك أبات بتاعة staging. تنسى أعمدة زي [[notes]] أو [[metadata jsonb]] اللي فيها PII مستخبي، أو جداول زي audit_logs. تستخدم دومين حقيقي زي [[@test.com]] (ده دومين موجود!). وتنزّل dump الإنتاج على لابتوبك عشان تعمل له mask هناك: اعمله على سيرفر جوه نفس الشبكة.`
          },
          teach: R`## الفكرة: انسخ، امسح الأسماء، انسخ تاني

المثال ([[mask.sql]]) بيغيّر كل PII لقيم مزيفة، والحل سكربت bash بيلف حواليه: ينسخ الإنتاج لداتابيز مؤقتة، يعمل mask، ينسخ النتيجة لـ staging، يمسح المؤقتة. اتشغّل كله في container بتاع PostgreSQL 16، و «الإنتاج» داتابيز اسمها [[seclab_prod]] فيها 3 يوزرز (Mona و Sara و Omar) وطلبين.

---

## ١. [[mask.sql]] سطر سطر

### [[BEGIN;]] ... [[COMMIT;]]

يا الـ mask كله يحصل يا ولا حاجة.

### [[UPDATE users SET email = 'user' || id || '@example.test',]]

[[||]] في SQL معناها **لزق نصوص**. فيوزر 2 إيميله يبقى [[user2@example.test]]. ليه مبني على [[id]]؟ لأن [[email]] عليه [[UNIQUE]]. لو حطيت نفس الإيميل للكل:

~~~text الناتج
ERROR:  duplicate key value violates unique constraint "users_email_key"
DETAIL:  Key (email)=(dup@example.test) already exists.
~~~

و [[.test]] دومين محجوز (RFC 2606) عمره ما هيوصل لحد.

### [[name = 'User ' || id,]]

نفس الفكرة: [[User 2]].

### [[phone = CASE WHEN phone IS NULL THEN NULL ELSE ... END,]]

[[CASE WHEN ... THEN ... ELSE ... END]] زي if جوه SQL. اللي ملوش تليفون يفضل NULL (عشان الداتا تفضل بنفس شكلها)، والباقي:

| الحتة | معناها |
|---|---|
| [[id % 10000]] | باقي القسمة على 10000، رقم من 0 لـ 9999 |
| [[::text]] | حوّله نص |
| [[lpad(..., 4, '0')]] | كمّله أصفار من الشمال لـ 4 خانات: [[2]] يبقى [[0002]] |
| [['0100000']] ولزق اللي فات | الناتج [[01000000002]]، 11 رقم زي الموبايل المصري |

### [[avatar_key = NULL;]]

الصور الحقيقية على S3 الإنتاج، و staging مالوش يشاور عليها.

### [[UPDATE orders SET ship_name = 'Test User', ship_address = 'Test address';]]

من غير [[WHERE]]: كل الصفوف. والأسعار والتواريخ متتلمسش، عشان التجربة تفضل واقعية.

### [[TRUNCATE sessions, login_events;]]

[[TRUNCATE]] بيفضّي الجدول كله مرة واحدة (أسرع من DELETE). الجلسات واللوجات مالهاش لازمة في staging.

### [[SELECT count(*) AS leftover FROM users WHERE email NOT LIKE '%@example.test';]]

check: [[LIKE]] بيطابق نمط، و [[%]] معناها «أي حاجة». فبنعدّ الإيميلات اللي **مش** منتهية بـ [[@example.test]]. لازم 0.

التشغيل على النسخة المؤقتة:

~~~text الناتج
BEGIN
UPDATE 3
UPDATE 2
TRUNCATE TABLE
 leftover
----------
        0
(1 row)

COMMIT
~~~

---

## ٢. الـ pipeline (الحل)

| السطر | بيعمل إيه |
|---|---|
| [[set -e]] | لو أي أمر فشل، السكربت يقف |
| [[createdb app_mask_tmp]] | داتابيز مؤقتة فاضية |
| [[pg_dump --no-owner "$PROD_URL" pipe psql -q app_mask_tmp]] | [[pg_dump]] بيطلع الإنتاج كـ SQL، والـ pipe بيدخّله في المؤقتة. [[--no-owner]]: من غير أوامر ملكية تفشل لو اليوزر مختلف |
| [[psql -v ON_ERROR_STOP=1 -q -d app_mask_tmp -f mask.sql]] | شغّل الـ mask، ووقف عند أول خطأ |
| [[pg_dump --no-owner app_mask_tmp pipe psql -q "$STAGING_URL"]] | انسخ النسخة الممسوحة لـ staging |
| [[dropdb app_mask_tmp]] | امسح المؤقتة بكل ملفاتها |
| [[pg_dump "$STAGING_URL" pipe grep -c "Mona" pipe-pipe echo ...]] | عدّ السطور اللي فيها اسم حقيقي |

(في الجدول [[pipe]] مكان علامة [[|]].)

### ليه [[ON_ERROR_STOP=1]]؟

من غيره psql بيطبع الخطأ ويكمل السطر اللي بعده. جرّبنا الإيميل المكرر بيه: خرج بـ [[exit=3]]، فـ [[set -e]] يوقف السكربت قبل ما يعمل dump لنسخة نص ممسوحة.

### ليه [[|| echo]] في الآخر؟

[[grep -c]] بيطبع العدد، بس لما يلاقي **صفر** بيخرج بكود 1 (يعني «ملقيتش»)، و [[set -e]] كان هيعتبره فشل. [[||]] معناها «لو اللي قبلي فشل نفّذ ده». الناتج الحقيقي:

~~~text الناتج
0
no real names left
~~~

وعلى الإنتاج نفسه [[pg_dump seclab_prod pipe grep -c Sara]] طلع [[2]] (في جدول users وجدول orders)، وعلى staging [[0]].

والنتيجة على staging:

~~~text الناتج
 id |       email        |  name  |    phone    | avatar_key
----+--------------------+--------+-------------+------------
  1 | user1@example.test | User 1 |             |
  2 | user2@example.test | User 2 | 01000000002 |
  3 | user3@example.test | User 3 |             |
~~~

---

## ٣. ليه داتابيز مؤقتة؟

الـ [[UPDATE]] في Postgres مش بيكتب فوق الصف، بيعمل نسخة جديدة، والقديمة بتفضل في ملفات الداتابيز لحد [[VACUUM]]، وفي الـ WAL (سجل كل التغييرات). لو عملت restore على staging وبعدين mask، القيم الحقيقية لسه في ملفات staging. أما [[pg_dump]] فبيقرا القيم **الحالية** بس، فالنسخة اللي توصل staging نضيفة، والمؤقتة بتتمسح كلها بـ [[dropdb]].

## الخلاصة

- قيم مزيفة مبنية على الـ id: ثابتة ومش بتكسر UNIQUE.
- دومين [[.test]] للإيميلات.
- mask في داتابيز مؤقتة، و dump منها، مش على staging مباشرة.
- [[ON_ERROR_STOP=1]] و [[set -e]] و check في الآخر.`,
          lines: [
            "كله في transaction: لو حاجة فشلت، مفيش نسخة نص ممسوحة.",
            "غيّر بيانات كل اليوزرز:",
            R`إيميل مزيف ثابت مبني على الـ id، على دومين [[.test]] اللي مش هيوصل لحد.`,
            "اسم مزيف.",
            "تليفون مزيف بنفس الشكل، واللي كان NULL يفضل NULL.",
            "امسح مفتاح الصورة (الصور الحقيقية على S3 الإنتاج مش هتتنسخ أصلًا).",
            "بيانات الشحن في الطلبات، والأسعار والتواريخ زي ما هي.",
            "الجلسات واللوجات مالهاش لازمة في staging: فضّيها.",
            "check: عدد الإيميلات اللي لسه حقيقية، لازم 0.",
            "ثبّت."
          ],
          sol: R`الـ mask بيطبع [[UPDATE]] بعدد الصفوف، و [[TRUNCATE TABLE]]، و [[leftover]] بـ 0. بعدها [[SELECT email, name, phone FROM users]] على staging بيطلع [[user1@example.test]] و [[User 1]] و [[01000000001]].

و [[pg_dump seclab_staging | grep -c "Mona"]] بيطلع 0. لو طلع أكتر، فيه عمود أو جدول نسيته في السكربت (دوّر في النتيجة تلاقيه فين).

الغلط الشائع: تشغّل الـ mask على staging بعد ما تعمل restore عليه مباشرة. النتيجة في الـ SELECT هتبان سليمة، بس القيم القديمة لسه في ملفات الداتابيز والـ WAL لحد ما تتمسح. الـ pipeline تحت بيعمل mask في database مؤقتة وينسخ الناتج بس.`,
          solCode: R`set -e
createdb app_mask_tmp
pg_dump --no-owner "$PROD_URL" | psql -q app_mask_tmp
psql -v ON_ERROR_STOP=1 -q -d app_mask_tmp -f mask.sql
pg_dump --no-owner app_mask_tmp | psql -q "$STAGING_URL"
dropdb app_mask_tmp
pg_dump "$STAGING_URL" | grep -c "Mona" || echo "no real names left"`
        },
        {
          cmd: "PII بره اللوج",
          title: "اللوج و Sentry ميبقوش نسخة تانية من الداتابيز",
          desc: R`اللوج بيتبعت لخدمات بره (Datadog، و Loki، و Sentry)، وبيتحفظ مدة طويلة، ومحدش بيعمله حذف لما اليوزر يمسح حسابه، وناس كتير بتشوفه. فأي إيميل أو تليفون أو توكن اتكتب فيه بقى متسرّب لكل دول، وخارج أي طلب حذف أو تصدير.

القاعدة: سجّل IDs مش بيانات. وحتى الـ id ممكن تبدّله بـ [[HMAC]] ثابت، فتقدر تتبع يوزر واحد في اللوج من غير ما يبقى مربوط بالداتابيز مباشرة. وكطبقة أمان تانية، [[redact]] في pino (شوف درس [[pino]] في «تاب Backend بـ Node») بيخفي الحقول اللي بالأسامي دي لو حد سجّلها بالغلط. وفي Sentry: [[dataCollection: { userInfo: false, cookies: false }]] (SDK 11) وفلتر [[beforeSend]] (درس «Sentry» في «تاب بناء مشروع كامل»).`,
          example: R`import pino from "pino";
import { createHmac } from "node:crypto";

const log = pino({
  redact: {
    paths: ["*.password", "*.token", "*.email", "*.phone", "*.nationalId", "req.headers.authorization", "req.headers.cookie"],
    censor: "[redacted]",
  },
});
const userRef = (id) => createHmac("sha256", process.env.LOG_SALT).update(String(id)).digest("hex").slice(0, 12);

log.info({ user: { id: userRef(42), email: "mona@example.com", phone: "01012345678" } }, "signup");
log.warn({ body: { email: "mona@example.com", password: "hunter2" } }, "login failed");`,
          try: R`[[npm i pino]] واحفظ المثال في [[logs.mjs]] وشغّله بـ [[LOG_SALT=abc node logs.mjs]]. بعدين زوّد سطر: [[log.info({ user: { profile: { email: "deep@example.com" } } }, "nested")]]، وشوف الإيميل ده اتخفى ولا لأ. صلّحها. وبعدين دوّر في كودك بـ grep على [[console.log(req.body]] و [[console.log(user]].`,
          flag: "script",
          deep: {
            why: R`اللوج أكتر مكان PII بيتسرّب منه من غير ما حد ياخد باله، لأن محدش بيعتبره «داتابيز». ولما اليوزر يطلب مسح بياناته، مش هتعرف تمسحها من 6 شهور لوج في 3 خدمات. فالحل الوحيد العملي إنها متدخلش أصلًا.`,
            how: R`[[redact]] في pino (بيستخدم مكتبة fast-redact) بيحوّل كل path لكود سريع بيغيّر القيمة قبل ما السطر يتكتب. [[*.email]] معناها «أي key في المستوى الأول جواه email»، يعني [[user.email]] و [[body.email]]، بس مش [[user.profile.email]]. كل مستوى أعمق محتاج path بتاعه ([[*.*.email]]). عشان كده الـ redact شبكة أمان، مش الحل الأساسي.

[[userRef]]: HMAC بمفتاح ([[LOG_SALT]]) بيدّي نفس الـ 12 حرف لنفس اليوزر دايمًا. تقدر تجمّع كل لوجات يوزر واحد، ولما تحتاج تعرف هو مين فعلًا تحسبه من الـ id في الداتابيز وتقارن. ولو اليوزر اتمسح، الـ ref في اللوج مبقاش بيشاور على حد.

في Sentry SDK 11: [[dataCollection: { userInfo: false, cookies: false }]] بيمنع الـ IP والكوكيز وبيانات اليوزر، ولازم تكتبه بنفسك لأن 11 بيجمعهم افتراضيًا. الخيار القديم [[sendDefaultPii]] (نسخة 10 وقبلها، وكان false افتراضيًا) نسخة 11 بتتجاهله من غير أي تحذير. و [[beforeSend(event)]] بيدّيك الـ event قبل ما يتبعت: امسح [[event.user.email]] و [[event.request.data]] لو فيه form بيانات شخصية، وارجع الـ event. وافتكر إن رسالة الـ error نفسها ممكن يبقى فيها PII لو كتبتها كده: [[new Error("User " + email + " not found")]].`,
            when: R`من أول سطر لوج في المشروع. وراجع أي لوج بيطبع object كامل (req.body، و user، و الـ response) لأن الـ object ده هيكبر بحقول جديدة ومحدش هيفتكر اللوج.`,
            mistakes: R`[[console.log(req.body)]] في login أو signup، فالباسوردات في اللوج. تسجيل الـ query string كامل وفيه [[?token=]] أو [[?email=]]. [[logger.info(user)]] للـ object كله. الاعتماد على redact بس وهو مبيغطيش المستويات الأعمق. و Sentry من غير [[dataCollection]] في نسخة 11 (بيبعت الـ IP والكوكيز افتراضيًا)، أو تفتكر إن [[sendDefaultPii: false]] لسه شغال فيها.

في الانترفيو: «إزاي تتعامل مع PII في اللوج؟» IDs مش بيانات، و pseudonymous refs، و redact كطبقة تانية، ومدة حفظ للوج، وسؤال: اللوج بيتبعت لأنهي خدمة وفي أنهي بلد.`
          },
          teach: R`## الفكرة: logger بيخفي الحقول الحساسة لوحده

المثال بيعمل logger بـ pino متظبط إنه يكتب [[[redacted]]] مكان أي باسورد أو إيميل أو تليفون، ودالة [[userRef]] بتحوّل id اليوزر لكود ثابت مش مربوط بالداتابيز. اتشغّل بـ Node 24 و pino 10 على ويندوز (Git Bash)، واسم الجهاز في الناتج اتغيّر لـ [[ALI-PC]].

---

## ١. الـ imports

[[import pino from "pino";]]: مكتبة لوج سريعة بتكتب كل سطر JSON (محتاجة [[npm i pino]]). و [[createHmac]] من [[node:crypto]] جوه Node.

## ٢. [[const log = pino({ redact: {...} })]]

[[pino(options)]] بيرجّع logger. والـ option المهم [[redact]] (يعني «اشطب»):

### [[paths: [...]]]

لستة **مسارات** للحقول اللي تتشطب. المسار بيتقرا بالنقط:

| المسار | بيطابق |
|---|---|
| [[*.password]] | [[password]] جوه أي object في المستوى الأول: [[body.password]]، [[user.password]] |
| [[*.email]] | [[user.email]] و [[body.email]]، بس **مش** [[user.profile.email]] |
| [[req.headers.authorization]] | الهيدر ده بالظبط (فيه التوكن) |
| [[req.headers.cookie]] | الكوكيز (فيها الـ session) |

الـ [[*]] = «أي key»، ومستوى واحد بس.

### [[censor: "[redacted]"]]

النص اللي بيتكتب مكان القيمة. من غيره الافتراضي [[[Redacted]]].

## ٣. [[userRef]]

~~~text
const userRef = (id) => createHmac("sha256", process.env.LOG_SALT).update(String(id)).digest("hex").slice(0, 12);
~~~

من جوه لبرة:

1. [[String(id)]]: الـ id رقم، و HMAC محتاج نص.
2. [[createHmac("sha256", process.env.LOG_SALT)]]: HMAC بمفتاح من متغير البيئة [[LOG_SALT]].
3. [[.update(...)]] يدخّل النص، و [[.digest("hex")]] يطلّع البصمة 64 حرف hex.
4. [[.slice(0, 12)]]: أول 12 حرف بس، كفاية تفرّق اليوزرز في اللوج.

النتيجة: يوزر 42 = [[7e00ac929d73]] كل مرة طالما [[LOG_SALT]] ثابت. تقدر تجمع لوجاته، ومن غير الـ salt محدش يعرف الـ ref ده بتاع مين.

## ٤. سطور اللوج

[[log.info(object, "message")]]: أول argument الحقول، والتاني الرسالة. و [[log.warn]] نفس الكلام بمستوى أعلى.

### التشغيل

~~~bash
LOG_SALT=abc node logs.mjs
~~~

~~~text الناتج
{"level":30,"time":1791294428868,"pid":35056,"hostname":"ALI-PC","user":{"id":"7e00ac929d73","email":"[redacted]","phone":"[redacted]"},"msg":"signup"}
{"level":40,"time":1791294428869,"pid":35056,"hostname":"ALI-PC","body":{"email":"[redacted]","password":"[redacted]"},"msg":"login failed"}
~~~

| الحقل | معناه |
|---|---|
| [[level]] | 30 = info، و 40 = warn (و 50 = error) |
| [[time]] | الوقت بالـ milliseconds من 1970 |
| [[pid]] | رقم الـ process |
| [[hostname]] | اسم الجهاز |
| [[msg]] | الرسالة |

الإيميل والتليفون والباسورد اتشطبوا، حتى في السطر التاني اللي فيه [[body]] كامل «بالغلط».

---

## ٥. الثغرة: مستوى أعمق

زوّدنا [[log.info({ user: { profile: { email: "deep@example.com" } } }, "nested")]]:

~~~text الناتج
{"level":30,...,"user":{"profile":{"email":"deep@example.com"}},"msg":"nested"}
~~~

الإيميل ظاهر! [[*.email]] بيطابق [[user.email]] بس، و [[user.profile.email]] مستويين.

## ٦. التصليح (الحل)

~~~text
const SENSITIVE = ["password", "token", "email", "phone", "nationalId"];
...SENSITIVE.map((k) => $__bt*.$__{k}$__bt),
...SENSITIVE.map((k) => $__bt*.*.$__{k}$__bt),
~~~

- [[SENSITIVE]]: لستة الأسامي مرة واحدة.
- [[.map((k) => ...)]]: لكل اسم اعمل مسار. والـ backticks مع [[$__{k}]] template string بيحط الاسم جوه النص: [[*.email]] و [[*.*.email]].
- [[...]] (spread): فك اللستة جوه الـ array.

~~~text الناتج
{"level":30,...,"user":{"profile":{"email":"[redacted]"}},"msg":"nested"}
{"level":30,...,"user":{"id":"7e00ac929d73"},"msg":"profile updated"}
~~~

ومن غير [[LOG_SALT]] السكربت بيقع ([[The "key" argument must be of type string ... Received undefined]])، فمش هيطلع ref من غير مفتاح.

> الـ redact شبكة أمان. الحل الأساسي إنك تكتب IDs وحقول محددة في اللوج، مش [[req.body]] أو [[user]] كامل.

## الخلاصة

| | |
|---|---|
| سجّل | ref اليوزر، الـ action، أرقام، أكواد أخطاء |
| متسجلش | [[req.body]]، object اليوزر، query strings فيها توكن |
| شبكة الأمان | [[redact]] بمسارات لكل مستوى |
| Sentry | [[dataCollection]] في SDK 11، و [[beforeSend]] |`,
          lines: [
            "استورد pino.",
            R`و [[createHmac]] عشان نعمل ref ثابت لليوزر.`,
            "اعمل الـ logger.",
            R`[[redact]]: خطوط دفاع للحقول الحساسة.`,
            R`الحقول دي في أي object في المستوى الأول، وهيدرز الـ auth والكوكيز.`,
            R`بدل القيمة اكتب «[redacted]».`,
            "قفلة الـ redact.",
            "قفلة الـ logger.",
            R`ref ثابت لليوزر: HMAC للـ id بمفتاح، أول 12 حرف كفاية للتجميع.`,
            "لوج تسجيل: الـ ref بيظهر، والإيميل والتليفون بيتخفوا.",
            "لوج دخول فاشل: الإيميل والباسورد بيتخفوا حتى لو حد سجّل الـ body كله بالغلط."
          ],
          sol: R`أول سطرين بيطلعوا زي: [[{"user":{"id":"7e00ac929d73","email":"[redacted]","phone":"[redacted]"},"msg":"signup"}]] و [[{"body":{"email":"[redacted]","password":"[redacted]"},"msg":"login failed"}]]. والـ id نفسه (42) مش ظاهر، الـ ref بس، وبيطلع نفس القيمة كل تشغيل طالما [[LOG_SALT]] ثابت.

السطر الـ nested بيطلع الإيميل واضح: [[{"user":{"profile":{"email":"deep@example.com"}}}]]، لأن [[*.email]] بيطابق مستوى واحد بس. التصليح تحت: تولّد الـ paths لمستويين من لستة واحدة. وبعدين بتشوف «[redacted]» في المستوى التاني كمان. الأحسن من كده إنك متسجلش object فيه profile أصلًا.

الـ grep في كودك: كل [[console.log(req.body)]] أو [[log.info(user)]] بيطبع object كامل، غيّره لـ IDs وحقول محددة.`,
          solCode: R`import pino from "pino";
import { createHmac } from "node:crypto";

const SENSITIVE = ["password", "token", "email", "phone", "nationalId"];
const log = pino({
  redact: {
    paths: [
      ...SENSITIVE.map((k) => $__bt*.$__{k}$__bt),
      ...SENSITIVE.map((k) => $__bt*.*.$__{k}$__bt),
      "req.headers.authorization",
      "req.headers.cookie",
    ],
    censor: "[redacted]",
  },
});
const userRef = (id) => createHmac("sha256", process.env.LOG_SALT).update(String(id)).digest("hex").slice(0, 12);

log.info({ user: { profile: { email: "deep@example.com" } } }, "nested");
log.info({ user: { id: userRef(42) } }, "profile updated");`
        }
      ]
    },
    {
      t: "أدوات الفحص",
      l: 3,
      n: "أدوات مشروعة تشغّلها على مشاريعك انت لتكتشف الثغرات قبل غيرك",
      items: [
        {
          cmd: "فحص الـ headers",
          title: "أول وأسرع فحص",
          desc: "الأمر بيطبع headers الحماية الموجودة. لتقرير بدرجة: securityheaders.com. الناقص منهم تضيفه في Nginx بـ [[add_header]] أو بـ helmet في Express. أهمهم HSTS (يجبر HTTPS) و CSP (يحدد السكربتات المسموحة، وده أقوى حماية ضد XSS).",
          example: R`curl -sI https://example.com | grep -iE "strict-transport|content-security|x-frame|x-content-type|referrer-policy|permissions-policy"`,
          try: "افحص موقعك على securityheaders.com واستهدف درجة A.",
          flag: "term",
          deep: {
            why: "أسرع فحص تعمله من غير أي أداة: هل سيرفري بيبعت الـ security headers المهمة؟",
            how: R`الأمر بياخد ثانية ويوريك كل header مهم موجود. اللي مش موجود يبقى ناقص.

أهمهم: [[Strict-Transport-Security]] بيجبر HTTPS. [[Content-Security-Policy]] بيمنع XSS. [[X-Frame-Options: DENY]] بيمنع clickjacking. [[X-Content-Type-Options: nosniff]] بيمنع MIME confusion.

لو عايز درجة شاملة: securityheaders.com. تضيف headers ناقصة في Nginx بـ [[add_header]] في الـ server block.`,
            when: "بعد كل deploy. واجعله جزء من checklist الرفع.",
            mistakes: "CSP بتحتاج تعرف كل مصدر بيحمّل منه. ابدأ بـ [[Content-Security-Policy-Report-Only]]."
          },
          lines: ["الـ headers بس، وفلتر على headers الأمان الستة. اللي ناقص ضيفه في Nginx أو helmet."],
          sol: R`securityheaders.com بيديك درجة من A+ لـ F ولستة بالـ headers الموجودة (أخضر) والناقصة (أحمر). موقع من غير أي إعداد بياخد غالبًا F أو D. عشان توصل A، لازم يبقى موجود: [[Strict-Transport-Security]]، [[Content-Security-Policy]]، [[X-Frame-Options]] (أو [[frame-ancestors]] في الـ CSP)، [[X-Content-Type-Options: nosniff]]، [[Referrer-Policy]]، و [[Permissions-Policy]].

في Express [[helmet()]] بيحط معظمهم مرة واحدة، والناقص غالبًا [[Permissions-Policy]] تضيفه بنفسك. في Nginx بـ [[add_header ... always;]]. خد بالك: الـ CSP اللي helmet بيحطها ممكن تكسر سكريبتات خارجية أو inline، فافتح الـ Console بعد ما تفعّلها. والموقع لازم يكون على الإنترنت عشان الأداة توصله، ومش هتقدر تفحص localhost.`
        },
        {
          cmd: "SSL Labs",
          title: "فحص الـ HTTPS",
          desc: "ssllabs.com/ssltest بيدّي درجة لإعدادات الـ SSL بتاعتك، ويقولك لو بتدعم بروتوكولات قديمة ضعيفة. استهدف A. certbot بيظبط أغلب ده لوحده، بس الفحص بيطمّنك.",
          example: R`# تاريخ انتهاء الشهادة من الترمنال
echo | openssl s_client -connect example.com:443 -servername example.com 2>/dev/null | openssl x509 -noout -dates`,
          try: "افحص موقعك على SSL Labs واعرف درجتك.",
          flag: "term",
          deep: {
            why: "HTTPS مش كل حاجة. إعدادات الـ TLS نفسها ممكن تكون ضعيفة.",
            how: R`SSL Labs بيجرّب كل cipher suites وprotocols وcertificate chain، وبيدّيك درجة من A+ لـ F.

أشهر المشاكل: دعم TLS 1.0 أو 1.1 (قديمين). شهادة منتهية. Cipher suites ضعيفة.

certbot مع Nginx بيحط إعدادات معقولة، بس ممكن تحتاج تظبط [[ssl_protocols]] في Nginx.`,
            when: "بعد تجهيز HTTPS لأول مرة. وكل ٣ شهور تتأكد إن certbot جدّد.",
            mistakes: "تكتفي بـ certbot وتفتكر كل حاجة تمام. إعدادات TLS الافتراضية في Nginx القديمة ممكن ضعيفة."
          },
          lines: ["نفس أمر bash: اتصل HTTPS، خد الشهادة، واطبع تاريخ بدايتها ونهايتها."],
          sol: R`SSL Labs بياخد دقيقة أو اتنين وبيطلع درجة من A+ لـ F. سيرفر متظبط بـ Let's Encrypt و certbot و Nginx حديث بياخد A عادة، وعشان A+ محتاج [[Strict-Transport-Security]] بـ [[max-age]] طويل (6 شهور أو أكتر). التقرير فيه أربع أجزاء: الشهادة، دعم البروتوكولات، تبادل المفاتيح، والـ ciphers.

الأسباب المعتادة لدرجة أقل: TLS 1.0 أو 1.1 لسه مفعّلين (حدّد [[ssl_protocols TLSv1.2 TLSv1.3;]])، سلسلة الشهادة ناقصة (استخدم [[fullchain.pem]] مش [[cert.pem]])، أو ciphers قديمة. لو الدرجة T يبقى الشهادة مش موثوقة (self-signed أو الدومين مش مطابق)، و F يبقى فيه ثغرة معروفة.`
        },
        {
          cmd: "OWASP ZAP",
          title: "سكانر ثغرات مجاني",
          desc: "أشهر سكانر مجاني (بديل Burp Suite المدفوع). الـ Automated Scan بيزحف على موقعك ويجرّب ثغرات شائعة ويطلعلك تقرير. شغّله على مواقعك بس. ابدأ بالـ Passive scan (بيراقب من غير ما يهاجم) قبل الـ Active. متشغّلش Active scan على موقع إنتاج فيه مستخدمين، لأنه بيبعت طلبات كتير وممكن يعمل بيانات وهمية.",
          example: R`docker run -t ghcr.io/zaproxy/zaproxy:stable \
  zap-baseline.py -t https://your-own-site.com`,
          try: "شغّل ZAP baseline على موقع تجربة بتاعك (مش إنتاج) واقرا التقرير.",
          flag: "term",
          deep: {
            why: "بعد ما تأمّن الكود، محتاج تختبر من بره: ZAP بيجرّب هجمات معروفة ويقولك إيه اللي نجح.",
            how: R`ZAP أداة مجانية من OWASP. بتشغّله وتوجّهه لموقعك، وهو بيزحف ويجرّب ثغرات شائعة. بعدين تقرير مع الأولويات.

Passive Scan بيراقب فقط (بدون هجوم)، مناسب على الإنتاج. Active Scan بيبعت طلبات فعلية، لازم على بيئة تجربة بس. الـ Docker command baseline scan بيعمل passive فقط.`,
            when: "قبل كل إطلاق كبير، على بيئة staging. مش على الإنتاج.",
            mistakes: "تشغّله على الإنتاج بـ Active Scan. ممكن يكتب داتا وهمية ويبعت طلبات كتير."
          },
          lines: [
            "شغّل ZAP من Docker (الشرطة المايلة في الآخر: الأمر مكمّل في السطر اللي بعده).",
            "فحص baseline (passive، مش بيهاجم) على موقعك انت."
          ],
          sol: R`الـ baseline بيزحف على الموقع دقيقة تقريبًا ويفحص بشكل passive بس (مش بيهاجم)، وفي الآخر بيطبع سطر لكل قاعدة: [[PASS]]، [[WARN-NEW]]، أو [[FAIL-NEW]]، وملخص زي [[FAIL-NEW: 0 FAIL-INPROG: 0 WARN-NEW: 8 WARN-INPROG: 0 INFO: 0 IGNORE: 0 PASS: 58]]. الـ WARN المعتادة على موقع جديد: CSP مش موجودة، X-Content-Type-Options ناقص، الكوكي من غير SameSite أو HttpOnly، و Server بيفشي النسخة.

لو عايز تقرير تقراه براحتك، ضيف [[-v $(pwd):/zap/wrk -r report.html]] فيتحفظ [[report.html]] عندك. خد بالك: الـ exit code بيبقى 2 لو فيه WARN، وده عادي، مش معناه إن الأداة فشلت. ومتشغّلوش على سيرفر مش بتاعك، ولا الـ full scan على الإنتاج لأنه بيبعت طلبات كتير ممكن تغيّر داتا.`
        },
        {
          cmd: "nmap",
          title: "إيه المفتوح على سيرفرك",
          desc: "بيوريك البورتات المفتوحة زي ما العالم شايفها. المفروض تلاقي 22 و 80 و 443 بس. لو لقيت بورت قاعدة بيانات (5432 أو 27017) مفتوح للعالم، دي مشكلة كبيرة: اقفله في الفايروول وخلّي التطبيق يوصله على 127.0.0.1. على سيرفراتك انت بس.",
          example: R`nmap -sV 203.0.113.10
nmap -p- 203.0.113.10`,
          try: "اعمل scan لسيرفرك، واتأكد إن مفيش بورت قاعدة بيانات مفتوح.",
          flag: "term",
          deep: {
            why: "بعد كل تغيير في الفايروول أو Docker، تتأكد إن مفيش بورت مفتوح بالغلط. شرحناه في bash المستوى ٣.",
            how: R`[[-sV]] بيحاول يعرف البرنامج ونسخته على كل بورت، وده بيوريك الـ attack surface من وجهة نظر المهاجم.

على سيرفراتك انت بس، ومن جهازك مش من السيرفر، عشان تشوف الصورة الحقيقية من بره.`,
            when: "بعد أي تغيير في ufw أو إضافة خدمة جديدة.",
            mistakes: "تشغيله على أي حاجة مش ملكك."
          },
          lines: ["افحص البورتات المشهورة واعرف البرنامج ونسخته على كل واحد.", "افحص كل الـ 65535 بورت."],
          sol: R`على سيرفر متظبط، [[nmap -Pn -p- your-server-ip]] (أو البورتات المشهورة بس من غير [[-p-]]) لازم يطلع [[22/tcp open ssh]] و [[80/tcp open http]] و [[443/tcp open https]] بس، والباقي [[filtered]] (الفايروول بيرمي الطلب) أو [[closed]]. أي [[5432]] أو [[3306]] أو [[6379]] أو [[27017]] حالته [[open]] معناه إن قاعدة البيانات مكشوفة للإنترنت.

شغّله من جهازك مش من السيرفر نفسه: من جوه السيرفر كل حاجة هتبان مفتوحة لأنك بتكلم localhost. ولو قاعدة البيانات في Docker وطالعة open رغم إن ufw مفعّل، ده مش خطأ في ufw، Docker بيعدّي عليه: شوف درس «ss -tlnp بعد compose» في نفس التاب.`
        },
        {
          cmd: "السكانرات في CI",
          title: "افحص مع كل push",
          desc: "تحط الفحص في الـ pipeline فيتشغّل لوحده. [[npm audit]] يفشل الـ build لو فيه ثغرة عالية، [[gitleaks]] يفشّل الـ build لو فيه سر (ولمنعه قبل الـ commit حطه pre-commit hook)، و [[Semgrep]] بيفحص الكود نفسه على أنماط خطيرة. Trivy بيفحص Docker images.",
          example: R`# في GitHub Actions
npm audit --audit-level=high
docker run -v $(pwd):/src semgrep/semgrep semgrep --config auto
trivy image myapp:latest`,
          try: "ضيف [[npm audit --audit-level=high]] كخطوة في GitHub Actions لمشروع عندك.",
          flag: "term",
          deep: {
            why: "الأمان مش بتعمله مرة وتنسى. لما تضيفه في الـ pipeline، كل push بيتفحص أوتوماتيك.",
            how: R`[[npm audit --audit-level=high]] يفشل الـ build لو ثغرة high أو critical. فمحدش يرفع كود بمكتبات خطيرة.

Semgrep بيحلل الكود نفسه ويدوّر على patterns خطيرة. [[--config auto]] بيختار rules حسب اللغة.

Trivy بيفحص Docker images. كل package في الـ image بيقارنها بـ CVE database.`,
            when: "في GitHub Actions. خليهم يشتغلوا على كل PR.",
            mistakes: "تحط السكانرات وتـignore كل الـ warnings. خصص وقت أسبوعي لمراجعة الـ findings."
          },
          lines: [
            "فشّل الـ build لو فيه ثغرة high أو critical.",
            "Semgrep بيفحص الكود نفسه على أنماط خطيرة، والقواعد بتتختار حسب اللغة.",
            "Trivy بيفحص الـ Docker image: كل package في النظام جواها."
          ],
          sol: R`الخطوة: [[- run: npm audit --audit-level=high]] بعد [[npm ci]] في الـ workflow. لو فيه ثغرة high أو critical الأمر بيرجع exit code 1 والـ job يبقى أحمر ❌، ولو الموجود moderate أو low بس بيعدّي ✅ مع إنه بيطبعهم في اللوج.

الغلطة الشائعة إن الـ CI يفضل أحمر بسبب ثغرة في devDependency ملهاش علاقة بالإنتاج، فالفريق يبطّل يبص عليه. الحل: [[npm audit --audit-level=high --omit=dev]] يفحص مكتبات الإنتاج بس. وخليه جزء من الـ PR مش خطوة لوحدها بعد الـ merge، عشان الثغرة توقف الـ PR قبل ما تدخل.`,
          solCode: R`name: security
on: [push, pull_request]
jobs:
  audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7
      - uses: actions/setup-node@v7
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm audit --audit-level=high --omit=dev`
        }
      ]
    },
    {
      t: "أسرار وبورتات على السيرفر",
      l: 3,
      n: "اللي بيتسرّب من غير ما تاخد بالك: build args، و .env في Git، وبورتات Docker، والباك أب",
      items: [
        {
          cmd: "أسرار في build args",
          title: "السر اللي اتبعت وقت البناء بيفضل جوه الـ image",
          desc: "أي قيمة بتبعتها بـ [[--build-arg]] وبيستخدمها [[RUN]] بتتسجل في تاريخ الـ image، وأي حد معاه الـ image يقراها بـ [[docker history]]. متغيرات [[NEXT_PUBLIC_]] و [[VITE_]] عادي، لأنها أصلًا بتتحط في ملفات JavaScript اللي بتروح للمتصفح. أسرار السيرفر مكانها وقت التشغيل بس. ولو محتاج سر وقت البناء (توكن npm خاص)، استخدم [[--secret]].",
          example: R`docker history --no-trunc myapp:latest | grep -iE "key|secret|password|token"
docker image inspect myapp:latest --format '{{json .Config.Env}}'
docker build --build-arg NEXT_PUBLIC_API_URL=https://api.example.com -t myapp .
docker build --secret id=npmrc,src=$HOME/.npmrc -t myapp .
# وجوه الـ Dockerfile:
# RUN --mount=type=secret,id=npmrc,target=/root/.npmrc npm ci`,
          try: "ابني image تجربة فيها [[ARG TOKEN]] و [[RUN echo done]] بعده، بـ [[--build-arg TOKEN=abc123]]، وبعدين [[docker history --no-trunc]]: هتلاقي abc123.",
          deep: {
            why: "الـ image بتتنقل: على registry، أو لجهاز تاني، أو لزميل. لو فيها مفتاح بوابة الدفع أو باسورد قاعدة البيانات، كل اللي يوصلها وصل للمفاتيح. ومحدش بيفكر يفتح تاريخ الـ image غير اللي بيدوّر على كده.",
            how: R`[[ARG]] قيمة وقت البناء. بس أي [[RUN]] بعدها بيتسجل في الـ history ومعاه قيم الـ ARGs اللي كانت متاحة. و [[ENV]] أسوأ: بتفضل في إعدادات الـ image ([[inspect]] بيطلّعها) وفي كل container.

الفرق المهم في Next.js و Vite: [[NEXT_PUBLIC_*]] و [[VITE_*]] لازم تتبعت وقت البناء لأنها بتتكتب جوه ملفات الـ JS، وأي زائر يقدر يشوفها في DevTools. فهي مش أسرار أصلًا (زي anon key بتاع Supabase). إنما [[SERVICE_ROLE_KEY]] أو [[DATABASE_URL]] أو مفتاح الدفع: [[env_file]] في compose أو [[--env-file]] وقت التشغيل، والتطبيق يقراهم من process.env على السيرفر.

[[--secret id=npmrc,src=...]] مع [[RUN --mount=type=secret]] (BuildKit): الملف بيبقى متاح للأمر ده بس وقت البناء، ومبيتسجلش في أي طبقة ولا في الـ history.

وحتى في multi-stage: السر في مرحلة الـ builder مش هيبان في الـ image النهائية، بس بيفضل في كاش البناء على الجهاز اللي بنى.

لو لقيت سر في image اتنشرت: غيّره (امسح الـ image مش كفاية، ممكن حد نزّلها).`,
            when: "مراجعة أي Dockerfile أو سكربت deploy فيه [[--build-arg]]، وقبل ما ترفع image على registry.",
            mistakes: "في مشروع حقيقي سكربت الـ deploy كان بيبعت أسرار السيرفر (مفاتيح بوابة الدفع و service role) كـ [[--build-arg]]، وكمان بيطبع قيمها في اللوج عشان «يتأكد». وفي مشروع تاني [[DATABASE_URL]] كان build ARG فاتحفظ في الـ image بالباسورد. الصح: اطبع أسامي المتغيرات بس ([[docker exec app env | cut -d= -f1]])."
          },
          lines: [
            "دوّر في تاريخ الـ image كامل على أي حاجة شكلها سر.",
            "متغيرات ENV المحفوظة في الـ image.",
            "متغير عام (بيروح للمتصفح أصلًا): عادي كـ build-arg.",
            "سر وقت البناء: يتركّب كملف مؤقت ومبيتسجلش."
          ],
          sol: R`[[docker history --no-trunc test-img]] هيطلع سطر زي [[RUN |1 TOKEN=abc123 /bin/sh -c echo done]]. يعني قيمة الـ ARG اتسجلت في تاريخ الـ image، وأي حد يعمل pull للـ image يقدر يشوفها، حتى لو ما اتكتبتش في أي ملف. ولو ملقيتهاش، يبقى غالبًا مفيش RUN بعد الـ ARG، أو BuildKit بيعرض التاريخ بشكل مختلف، وده مش معناه إنها آمنة.

الحل للأسرار اللي محتاجها وقت البناء (زي توكن npm private): [[RUN --mount=type=secret,id=npm_token]] وتبني بـ [[docker build --secret id=npm_token,env=NPM_TOKEN .]]، فالسر بيبقى متاح للأمر ده بس ومش بيتسجل. والأسرار اللي محتاجها وقت التشغيل مكانها [[environment]] أو [[env_file]] في compose، مش في البناء خالص.`,
          solCode: R`# Dockerfile (تجربة)
FROM alpine
ARG TOKEN
RUN echo done

# بناء وفحص
docker build --build-arg TOKEN=abc123 -t test-img .
docker history --no-trunc test-img | grep abc123`
        },
        {
          cmd: ".env اترفع على Git",
          title: "ملف الأسرار اتعمله commit: تعمل إيه بالترتيب",
          desc: "أول خطوة مش في Git: غيّر كل مفتاح كان في الملف، لأنه خلاص اتسرب. بعدها [[git rm --cached]] يوقف التتبع والملف يفضل عندك، و [[.gitignore]] يمنعه يرجع. والتاريخ القديم لسه فيه الملف، فمسحه من التاريخ خطوة إضافية، مش بديل عن تغيير المفاتيح.",
          example: R`git log --all --oneline -- .env
git show a1b2c3d:.env | cut -d= -f1
git rm --cached .env
echo ".env" >> .gitignore
git add .gitignore && git commit -m "stop tracking .env"
git push`,
          try: "في repo تجربة: اعمل commit لـ .env فيه [[API_KEY=test]]، ونفّذ الخطوات، وبعدين [[git log --all -- .env]]: لسه ظاهر في التاريخ. ده اللي لازم تفهمه.",
          deep: {
            why: "الغلطة الشائعة: تعمل [[git rm --cached]] وتفتكر إن الموضوع اتقفل. الملف لسه في كل commit قديم، ولو الريبو اترفع على GitHub فالبوتات ممكن تكون نسخته في دقايق. المفاتيح هي اللي لازم تتغير.",
            how: R`[[git log --all --oneline -- .env]]: كل commit لمس الملف، في كل الـ branches. أقدم واحد هو إمتى بدأ التسريب.

[[git show a1b2c3d:.env | cut -d= -f1]]: أسامي المتغيرات بس في النسخة دي من غير القيم، دي قايمة المفاتيح اللي لازم تتغير. غيّرها كلها: باسورد قاعدة البيانات، ومفاتيح الـ APIs، و JWT secret (كل اليوزرز هيعملوا login تاني)، ومفاتيح الدفع. وحدّث [[.env]] على السيرفر بالجديد.

[[git rm --cached .env]]: شيله من Git والملف يفضل على جهازك. و [[.gitignore]] عشان [[git add .]] ميرجعوش.

مسح التاريخ (اختياري، وبعد تغيير المفاتيح): [[git filter-repo --path .env --invert-paths]] بيعيد كتابة كل الـ commits من غيره، وبعدين [[git push --force]]. ده بيكسر أي نسخة عند حد تاني، ومش بيوصل للـ forks ولا لنسخ حد نزّلها قبل كده. عشان كده تغيير المفاتيح هو الحل، والمسح نضافة بس.

وبعدين [[gitleaks git .]] (الدرس الأول في التاب) يتأكد إن مفيش حاجة تانية.`,
            when: "أول ما تكتشف إن .env أو أي ملف فيه أسرار اتعمله commit، حتى لو الريبو private.",
            mistakes: "تغيّر مفتاح واحد وتنسى الباقي. و [[.env.example]] فيه القيم الحقيقية لأنه اتنسخ من [[.env]]. وتعمل force push بتاريخ جديد وتسيب المفاتيح القديمة شغالة."
          },
          lines: [
            "كل commit لمس .env في كل الـ branches.",
            "أسامي المتغيرات في نسخة قديمة (من غير القيم): دي اللي هتغيّرها.",
            "شيله من Git وسيبه على جهازك.",
            "امنعه يرجع.",
            "احفظ التغيير.",
            "ارفع."
          ],
          sol: R`بعد الخطوات، [[git ls-files .env]] بيطلع فاضي (الملف مبقاش متتبّع) والملف لسه موجود على جهازك. بس [[git log --all --oneline -- .env]] لسه بيطبع الـ commit القديم، و [[git show <hash>:.env]] لسه بيوريك [[API_KEY=test]]. يعني أي حد عنده clone أو شاف الـ repo على GitHub عنده المفتاح.

عشان كده الخطوة الأولى في الحقيقة مش git خالص: غيّر كل مفتاح كان في الملف عند مقدم الخدمة. مسح التاريخ ([[git filter-repo --path .env --invert-paths]] وبعدين force push) خطوة إضافية بعدها، ومش بتلغي النسخ اللي اتعملها clone ولا الـ forks ولا الكاش عند GitHub. الغلطة الشائعة إنك تفتكر إن [[git rm --cached]] حلّ المشكلة.`,
          solCode: R`mkdir leak-test && cd leak-test && git init
echo "API_KEY=test" > .env
git add .env && git commit -m "oops"
git rm --cached .env
echo ".env" >> .gitignore
git add .gitignore && git commit -m "stop tracking .env"
git log --all --oneline -- .env    # لسه ظاهر
git show HEAD~1:.env               # API_KEY=test`
        },
        {
          cmd: "ss -tlnp بعد compose",
          title: "مين من الـ containers مفتوح للنت فعلًا",
          desc: "Docker بيفتح أي بورت في [[ports:]] على كل العناوين وبيعدّي من ufw. فبعد أي [[compose up]]، شوف مين بيسمع على [[0.0.0.0]]: المفروض 80 و 443 (و 22) بس. أي قاعدة بيانات أو API هناك مكشوفة. الحل [[127.0.0.1:5000:5000]] أو تشيل [[ports]] خالص.",
          example: R`docker compose up -d
sudo ss -tlnp | grep -E "0\.0\.0\.0|\[::\]"
docker compose ps --format "table {{.Service}}\t{{.Ports}}"
nmap -Pn -p 22,80,443,3000,5000,5432,6379,27017 203.0.113.10`,
          try: "على سيرفر التجربة شغّل Redis منشور على [[6379:6379]] و ufw مفعّل، واعمل nmap من جهازك: هتلاقيه open. غيّرها لـ 127.0.0.1:6379:6379 وجرّب تاني.",
          deep: {
            why: "ufw بيديك إحساس إن كل حاجة مقفولة غير اللي فتحته، و Docker بيكسر الإحساس ده بصمت. Redis من غير باسورد أو Mongo مكشوف بيتلاقوا ويتخترقوا في ساعات، لأن فيه بوتات بتعمل scan للنت كله على البورتات دي.",
            how: R`[[ss -tlnp]]: كل بورت TCP بيسمع، ومين البرنامج. مع Docker هتلاقي [[docker-proxy]] على البورتات المنشورة. العنوان [[0.0.0.0]] أو [[::]] يعني كل الشبكات، و [[127.0.0.1]] يعني السيرفر نفسه بس.

[[compose ps]] بالـ Ports بيوريك كل service ومنشورة إزاي: [[0.0.0.0:5432->5432/tcp]] مكشوفة، و [[127.0.0.1:5432->5432/tcp]] محلية.

[[nmap]] من جهازك انت (مش من السيرفر) هو الاختبار الحقيقي: ده اللي الناس شايفاه. [[-Pn]] متعملش ping الأول.

الحل: service محتاجة Nginx يوصلها بس؟ متنشرهاش خالص، Nginx يوصلها بالاسم جوه شبكة compose. محتاج توصلها من السيرفر نفسه (أو SSH tunnel)؟ [[127.0.0.1:5432:5432]].`,
            when: "بعد أول compose up على أي سيرفر، وبعد أي تعديل في ports، وكجزء من preflight (تاب VPS).",
            mistakes: "في مشروع حقيقي الباك إند كان ناشر [[5000:5000]] فالـ API متاح مباشرة من غير Nginx، يعني من غير rate limit ولا HTTPS. وفي مشروع تاني ملف الإنتاج كان فاتح Postgres على 5433 و Redis على 6379 للنت، و Redis من غير باسورد، و ufw شغال فالكل فاكر إنهم مقفولين."
          },
          lines: [
            "شغّل الـ stack.",
            "مين بيسمع على كل العناوين؟",
            "كل service ومنشورة على أنهي عنوان.",
            "من جهازك: البورتات دي مفتوحة للنت فعلًا؟"
          ],
          sol: R`مع [[ports: ["6379:6379"]]]، الـ nmap من جهازك هيطلع [[6379/tcp open redis]] حتى لو [[ufw status]] مش فيه قاعدة لـ 6379. ده لأن Docker بيضيف قواعد iptables خاصة بيه بتتنفذ قبل قواعد ufw. و [[ss -tlnp]] على السيرفر هيوريك [[0.0.0.0:6379]] (docker-proxy).

بعد ما تغيّرها لـ [[127.0.0.1:6379:6379]] و [[docker compose up -d]]، [[ss -tlnp]] يطلع [[127.0.0.1:6379]]، والـ nmap من جهازك يطلع [[closed]] أو [[filtered]]. الأحسن من كده لو الـ API في نفس الـ compose: شيل [[ports]] خالص من Redis وقاعدة البيانات، والـ API يوصلهم باسم الـ service ([[redis:6379]]) على شبكة compose الداخلية. وخلّي في بالك إن Redis من غير باسورد ومفتوح للنت بيتلقط في دقايق.`
        },
        {
          cmd: "openssl enc",
          title: "تشفير الباك أب قبل ما يطلع من السيرفر",
          desc: "الباك أب فيه قاعدة البيانات كلها، فلما يتخزن بره السيرفر (Google Drive، أو S3) لازم يبقى متشفر. [[openssl enc]] بيضغط ويشفّر في pipe واحد، والباسورد جاي من متغير بيئة ([[env:]]) مش من سطر الأوامر. وجرّب الفك قبل ما تحتاجه.",
          example: R`export BACKUP_PASSPHRASE="$(cat /root/.backup-pass)"
tar -czf - app.dump config.tar.gz | openssl enc -aes-256-cbc -pbkdf2 -iter 200000 -salt -pass env:BACKUP_PASSPHRASE -out backup.tar.gz.enc
openssl enc -d -aes-256-cbc -pbkdf2 -iter 200000 -pass env:BACKUP_PASSPHRASE -in backup.tar.gz.enc | tar -tzf -
rclone copy backup.tar.gz.enc remote:backups/ && rclone check backup.tar.gz.enc remote:backups/ --one-way`,
          try: "شفّر أي فولدر، وفكه في فولدر تاني بـ [[tar -xzf -]] بدل [[-tzf]]، وقارن بـ [[diff -r]].",
          deep: {
            why: "باك أب مش متشفر على خدمة تخزين هو نسخة كاملة من بيانات عملائك مستنية أي حد يوصل للحساب ده. والتشفير بيخلي تسريب الملف مش مهم طالما الباسورد في أمان.",
            how: R`[[tar -czf -]]: اضغط الملفات واكتب الناتج على stdout ([[-]]) بدل ملف، فمفيش نسخة مش متشفرة بتتكتب على الديسك.

[[openssl enc -aes-256-cbc]]: تشفير AES بمفتاح ٢٥٦ بت. [[-pbkdf2 -iter 200000]]: المفتاح بيتولّد من الباسورد بعد ٢٠٠ ألف دورة، فتخمين الباسورد بطيء جدًا. من غيرهم openssl بيستخدم طريقة قديمة ضعيفة وبيطلع تحذير. [[-salt]]: ملح عشوائي، فنفس الباسورد بيدّي ناتج مختلف كل مرة.

[[-pass env:BACKUP_PASSPHRASE]]: الباسورد من متغير بيئة. لو كتبته [[-pass pass:xxx]]، أي يوزر على السيرفر يشوفه في [[ps aux]] وقت التشفير. وفيه كمان [[file:/path]].

الفك: نفس الإعدادات بالظبط مع [[-d]]. أي اختلاف في [[-iter]] أو الـ cipher = [[bad decrypt]]. [[tar -tzf -]] بيعرض المحتوى من غير ما يفك، اختبار سريع إن الملف سليم.

[[rclone check --one-way]]: يتأكد إن النسخة اللي اترفعت مطابقة فعلًا.

الباسورد نفسه لازم يتحفظ بره السيرفر (password manager). لو السيرفر مات والباسورد كان عليه بس، الباك أب ملوش لازمة. وبدائل أحدث: [[age]] أو [[gpg -c]]، بيكشفوا لو الملف اتعدّل (CBC لوحده مبيكشفش).`,
            when: "أي باك أب بيطلع من السيرفر. شغّله من cron بعد pg_dump (تاب VPS، باك أب قاعدة البيانات).",
            mistakes: "في مشروع حقيقي السكربت كان بيستخدم [[-pass pass:$PASS]] فالباسورد بيبان في [[ps]]، ومكنش بيتأكد إن الرفع نجح ولا بينبّه لو فشل من cron، ومفيش اختبار فك أبدًا. باك أب عمرك ما جربت ترجّعه مش باك أب."
          },
          lines: [
            "الباسورد في متغير بيئة من ملف root بس.",
            "اضغط وشفّر في pipe واحد، ومفيش نسخة مكشوفة على الديسك.",
            "اختبار: فك واعرض المحتوى من غير ما تفك فعلًا.",
            "ارفع بره السيرفر واتأكد إن النسخة مطابقة."
          ],
          sol: R`التشفير بيطلع ملف [[backup.tar.gz.enc]] مش مقروء. فك التشفير في فولدر تاني بـ [[tar -xzf -]] بدل [[-tzf]] بيطلّع الملفات فعلًا، و [[diff -r]] بين الفولدر الأصلي والجديد المفروض ميطبعش حاجة ويرجع exit code صفر، ده معناه إن الباك أب رجع زي ما هو بالظبط.

لو الباسورد غلط، [[openssl]] بيطبع [[bad decrypt]] والـ tar يطبع [[gzip: stdin: not in gzip format]]. ولو غيّرت [[-iter]] أو شلت [[-pbkdf2]] وقت الفك هيحصل نفس الخطأ، لأن المفتاح بيتحسب من الباسورد والإعدادات دي مع بعض. ودي الحكمة من التجربة: باك أب ماتجربش إنه بيرجع كأنه مش موجود، وباسورد التشفير لازم يكون محفوظ بره السيرفر وإلا هيضيع معاه.`,
          solCode: R`export BACKUP_PASSPHRASE="test-pass-123"
mkdir -p data && echo hello > data/a.txt
tar -czf - data | openssl enc -aes-256-cbc -pbkdf2 -iter 200000 -salt \
  -pass env:BACKUP_PASSPHRASE -out data.tar.gz.enc
mkdir -p restore
openssl enc -d -aes-256-cbc -pbkdf2 -iter 200000 \
  -pass env:BACKUP_PASSPHRASE -in data.tar.gz.enc | tar -xzf - -C restore
diff -r data restore/data && echo "backup OK"`
        }
      ]
    },
    {
      t: "تشيك ليست قبل ما ترفع",
      l: 3,
      n: "راجعها قبل أي مشروع يروح إنتاج",
      items: [
        {
          cmd: "الأساسيات",
          title: "المصادقة والداتا",
          desc: R`التشيك ليست دي لمصادقة المستخدمين وحماية البيانات، وكل بند مش متعمل ثغرة محتملة. الباسوردات تتخزن hashed بـ bcrypt أو argon2، لأنهم بطيئين عن قصد فتخمينها يبقى صعب، مش MD5 ولا SHA256. الـ JWT secret طويل وعشوائي ([[openssl rand -base64 32]]) وفي [[.env]] مش في الكود، لأن اللي يعرفه يقدر يعمل توكن لأي يوزر.

IDOR معناها إن الـ route بيتأكد إنك عامل login بس، مش إن الحاجة دي بتاعتك، فتغيّر رقم في الرابط وتشوف طلب حد تاني. الاستعلامات parameterized (القيم بتتبعت لوحدها مش ملزوقة في نص الـ SQL) عشان SQL injection. والـ validation لازم يتعمل على السيرفر حتى لو الواجهة بتعمله، لأن أي حد يقدر يبعت طلب مباشرة من غير الواجهة. و rate limiting على login بيمنع حد يجرّب آلاف الباسوردات.`,
          example: R`[ ] كل الباسوردات hashed بـ bcrypt/argon2
[ ] JWT secret طويل وعشوائي وفي .env
[ ] كل route محمي بيتأكد من الصلاحية مش بس الدخول (IDOR)
[ ] كل الاستعلامات parameterized أو ORM
[ ] كل مدخلات المستخدم عليها validation على السيرفر
[ ] rate limiting على login و APIs الحساسة`,
          try: "طبّق التشيك ليست دي على آخر مشروع رفعته.",
          flag: "script",
          deep: {
            why: "قبل ما ترفع أي موقع على الإنتاج، فيه حاجات أساسية لازم تتأكد منها. دي الـ checklist اللي لو عملتها بتحمي من أشهر طرق الاختراق.",
            how: R`الباسوردات: bcrypt أو argon2 فقط، مش MD5 أو SHA256. لو بتعمل migration لقاعدة بيانات قديمة، الـ hashing قبل ما أي حاجة تانية.

JWT secret: طويل (٣٢ بايت على الأقل)، عشوائي، ومش في الكود. [[openssl rand -base64 32]] بيولّد واحد. ولو غيّرت الـ secret (مثلًا بعد تسريب)، كل الـ tokens القديمة بتبقى invalid وكل اليوزرز يعملوا login تاني.

كل route محمي: الفرق بين authenticated (logged in) وauthorized (مسموحلك). لو route بيتأكد بس إن في token بس مش بيتأكد من الصلاحيات، ده IDOR.

كل input بيتعمله validation على السيرفر: حتى لو الـ frontend بيعمل validation كمان.

HTTPS على كل environments إلا localhost.`,
            when: "قبل أي deploy للإنتاج. وبعد أي feature جديدة بتضيف authentication أو routes.",
            mistakes: "تعتمد على الـ frontend validation لأي من دول. والـ JWT secret في الكود أو في GitHub."
          },
          sol: R`الإجابة الكويسة إنك تمشي على كل بند بدليل مش بإحساس: الباسوردات بـ [[SELECT left(password,7) FROM users LIMIT 5]] (لازم تبدأ بـ [[$2b$]] أو [[$argon2id$]])، الـ JWT secret بـ [[echo -n "$JWT_SECRET" | wc -c]] (32 حرف عشوائي أو أكتر، مش "secret")، الـ IDOR بتجربة اليوزرين من درس Broken Access Control، الـ SQL بالـ grep من درس SQL Injection، والـ rate limit باللوب من درسه.

النتيجة المعتادة على أول مشروع: بندين أو تلاتة ناقصين، وأشهرهم validation على السيرفر لبعض الـ routes، و IDOR في التعديل أو المسح مع إن القراءة سليمة، ومفيش rate limit على reset password. اكتب اللي لقيته ورتبه بالخطورة وصلّح الأخطر الأول.`
        },
        {
          cmd: "البنية",
          title: "السيرفر والنقل",
          desc: R`حتى لو كودك سليم، السيرفر والطريق بينه وبين الزائر ممكن يكونوا الثغرة. HTTPS بيشفّر الطريق، و HTTP لازم يحوّل له، و certbot مع Nginx بيعمل الاتنين. الـ security headers (بـ helmet في Express أو من Nginx) بتقول للمتصفح يحمي الزائر، زي إنه ميفتحش الموقع غير بـ HTTPS، وموقع securityheaders.com بيديك درجة.

[[.env]] بره Git، وأي سر اتعمله commit قبل كده اعتبره اتسرّب وغيّره. قاعدة البيانات تسمع على [[127.0.0.1]] بس، والفايروول يفتح 22 و 80 و 443 وبس. رسائل الأخطاء في الإنتاج عامة، لأن الـ stack trace بيوري المهاجم مسارات ونسخ مكتباتك. [[npm audit]] بيكشف المكتبات اللي فيها ثغرات معروفة. والباك أب لازم يكون اتجرّب إنه بيرجع فعلًا.`,
          example: R`[ ] HTTPS مفعّل و HTTP بيحوّل له
[ ] security headers (helmet أو Nginx)، درجة A على securityheaders.com
[ ] .env بره Git، ومفيش أسرار في الكود ولا في تاريخ Git
[ ] قاعدة البيانات على 127.0.0.1 مش مكشوفة للنت
[ ] الفايروول: 22 و 80 و 443 بس
[ ] رسائل الأخطاء عامة في الإنتاج (مفيش stack traces للمستخدم)
[ ] npm audit نضيف، والمكتبات محدّثة
[ ] باك أب شغال ومتجرّب إنه بيرجع`,
          try: "اعمل scan بـ nmap لسيرفرك وتأكد من نقطة البورتات.",
          flag: "script",
          deep: {
            why: "الأساسيات في الكود مش كافية. البنية نفسها (HTTPS، والـ headers، والـ secrets) لازم تبقى مظبوطة من الأول.",
            how: R`HTTPS وHTTP redirect: certbot مع Nginx بيعمل الاتنين. أي طلب HTTP بيتحوّل لـ HTTPS أوتوماتيك.

Security headers بـ helmet أو Nginx: [[Strict-Transport-Security]] و[[Content-Security-Policy]] وغيرهم. درجة A على securityheaders.com الهدف.

[[.env]] بره Git وأكيد مفيش أسرار في الكود أو تاريخه. أي secret في GitHub حتى لو في commit قديم يتعامل معاه كمكشوف.

CORS مضبوط: فقط domains مسموح بيها، مش [[*]] مع credentials.

Rate limiting على login وregistration وأي endpoint بياخد وقت.

Database: يوزر بصلاحيات أقل ما ممكن، ومش root أو superuser.`,
            when: "وانت بتجهّز السيرفر لأول مرة، مش بعد الرفع.",
            mistakes: "CORS بـ [[*]] مع cookies. والـ database user بصلاحيات admin من الأصل."
          },
          sol: R`[[nmap]] من جهازك على IP السيرفر: المتوقع [[22]] و [[80]] و [[443]] بس open، وكل بورت قاعدة بيانات (5432، 3306، 6379، 27017) مش ظاهر أو [[filtered]]. وعلى السيرفر [[sudo ss -tlnp]] يأكد: قواعد البيانات على [[127.0.0.1]] أو جوه شبكة Docker بس، مش [[0.0.0.0]].

لو لقيت بورت الـ API زي [[3000]] open، يبقى التطبيق مكشوف مباشرة ومش لازم يعدّي على Nginx: اربطه على [[127.0.0.1:3000]] وسيب Nginx هو اللي على 80 و 443. ولو لقيت بورت قاعدة بيانات open، اقفله فورًا ودوّر في اللوجات على اتصالات غريبة، لأن الـ bots بتلف على البورتات دي طول الوقت.`
        },
        {
          cmd: "المتابعة",
          title: "بعد ما ترفع",
          desc: R`الأمان مش حاجة بتعملها مرة يوم ما ترفع وتنساها: كل يوم بتتكتشف ثغرات جديدة في مكتبات ونظام انت بتستخدمه، والبوتات مش بتبطّل تجرّب. البنود دي هي الصيانة المستمرة.

fail2ban بيحظر الـ IPs اللي بتجرّب تدخل SSH كتير، و [[sudo fail2ban-client status sshd]] بيأكد إنه شغال. unattended-upgrades بيسطّب تحديثات أمان النظام لوحده. اللوجات لازم حد يبص عليها، ولو مرة في الأسبوع، أو تنبيه يوصلك لما حاجة غريبة تزيد فجأة. Dependabot (من إعدادات GitHub) أو [[npm audit]] في CI بيقولولك أول ما مكتبة عندك يطلع فيها ثغرة. وأهم بند: خطة مكتوبة قبل ما تحتاجها، لو حصل اختراق هتغيّر أنهي مفاتيح وباسوردات بالترتيب، وهترجع باك أب إزاي.`,
          example: R`[ ] fail2ban شغال ضد محاولات SSH
[ ] تحديثات الأمان أوتوماتيك (unattended-upgrades)
[ ] لوجات بتتراقب، وتنبيه لو حصل حاجة غريبة
[ ] Dependabot أو npm audit في CI
[ ] خطة لو حصل اختراق: تغيّر المفاتيح إزاي وترجع باك أب إزاي`,
          try: "فعّل Dependabot على أهم repo عندك من إعدادات GitHub.",
          flag: "script",
          deep: {
            why: "الأمان مش حاجة بتعملها مرة واحدة. التهديدات بتتطور، وثغرات جديدة بتتكتشف، ومحتاج تظل متابع.",
            how: R`fail2ban: يحظر أي IP بيجرّب كتير على SSH أو login. اتأكد إنه شغال: [[sudo fail2ban-client status sshd]].

unattended-upgrades: تحديثات الأمان بتيجي لوحدها. اتأكد إنه مفعّل وبيشتغل. [[cat /var/log/unattended-upgrades/unattended-upgrades.log]].

لوجات: بتتراقب وعندك تنبيه لو حصل حاجة غريبة. حتى لو مش automated، بص على لوجات Nginx وتطبيقك مرة في الأسبوع. كتير من الاختراقات بتتكشف بعد فترة لو حد بص على اللوجات.

npm audit وDependabot: بانتظام وفي CI.

Backups: بيتعملوا ومتحفظين بره السيرفر، ومجرّبة الاستعادة منهم. باك أب مش بيتجرّب مش باك أب فعلي.`,
            when: "ضيف فيهم كل أسبوع أو كل ٢ أسبوع وقت ثابت.",
            mistakes: "إنك تعمل كل ده مرة في الأول وتنسى. الأمان maintenance مستمر مش project له نهاية."
          },
          sol: R`في GitHub: Settings ← Advanced Security (أو Code security في بعض الحسابات) ← فعّل Dependabot alerts و Dependabot security updates. خلال دقايق هتلاقي تاب Security ← Dependabot فيه تنبيه لكل مكتبة فيها ثغرة، ومع الـ security updates هيفتح PRs لوحده بالتحديث.

عشان كمان تحديثات عادية بشكل منتظم، ضيف ملف [[.github/dependabot.yml]] زي اللي تحت، فيفتح PRs كل أسبوع. الغلطة الشائعة إنك تفعّله وبعدين تتجاهل الـ PRs لحد ما يبقوا عشرين: خليه weekly، والـ CI عندك يشغّل الاختبارات على كل PR، فتعمل merge للي نجح بسرعة.`,
          solCode: R`# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: npm
    directory: /
    schedule:
      interval: weekly
    open-pull-requests-limit: 5`
        }
      ]
    }
]);
