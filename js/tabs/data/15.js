// تكملة تاب data: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/data/01.js (شرح حقول الدرس في أوله)
MORE("data", [
    {
      t: "Supabase من الكود",
      l: 3,
      n: "الـ frontend بيكلّم Postgres مباشرة بـ supabase-js، والحماية كلها في RLS: أنهي key يروح فين، و policies لكل عملية، ودوال بـ rpc، وملفات و realtime",
      items: [
        {
          cmd: "supabase-js",
          title: "اقرا واكتب من الـ frontend، وأنهي key يروح فين",
          desc: R`Supabase بيدّيك Postgres ومعاه API جاهز (PostgREST) على كل جدول في [[public]]. من الكود بتستخدم [[@supabase/supabase-js]]: [[supabase.from("orders").select(...)]] بيتحول لطلب HTTP، والـ API بيحوله SQL.

المفاتيح: [[publishable key]] (بيبدأ بـ [[sb_publishable_]]، وده بديل الـ [[anon]] key القديم) مكانه الـ frontend، ومفيش مشكلة إن أي حد يشوفه. هو بس بيقول «الطلب ده من تطبيقك»، والصلاحيات بتتحدد بالـ RLS وباليوزر اللي عامل login. أما [[secret key]] (بيبدأ بـ [[sb_secret_]]، بديل [[service_role]]) بيعدّي RLS خالص، ومكانه السيرفر بس: backend، أو Edge Function، أو سكربت. الاتنين القدام (anon و service_role) لسه شغالين في المشاريع القديمة لحد ما تقفلهم.

و [[select]] بيجيب العلاقات بالـ FK: [[select("id, total, order_items(quantity, products(name))")]] بيرجّع الأوردر وجواه بنوده وجوا كل بند المنتج، في طلب واحد.`,
          example: R`import { createClient } from "@supabase/supabase-js";

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY);

const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
if (authError) throw authError;

const { data: orders, error } = await supabase
  .from("orders")
  .select("id, total, status, created_at, order_items(quantity, products(name))")
  .eq("status", "paid")
  .order("created_at", { ascending: false })
  .limit(20);
if (error) throw error;

const { data: note, error: insertError } = await supabase
  .from("notes")
  .insert({ body: "hello" })
  .select()
  .single();

// على السيرفر بس:
const admin = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SECRET_KEY, {
  auth: { persistSession: false },
});`,
          try: R`في مشروع Supabase (أو [[supabase start]] محليًا، درس Supabase CLI في تاب «PostgreSQL»)، اعمل جدول [[notes]] من غير RLS، واقرا منه بالـ publishable key من غير login. وبعدين فعّل RLS من غير policies واقرا تاني. وآخر حاجة اقرا بالـ secret key من سكربت Node. قارن التلات نتايج، وبص على [[error]] في كل مرة.`,
          sol: R`من غير RLS: هترجع كل الصفوف لأي حد معاه الـ publishable key، حتى من غير login. يعني أي حد فتح DevTools وخد الـ key من الـ JS بتاع موقعك يقدر يقرا الجدول كله (وممكن يكتب ويمسح كمان لو الجدول ليه صلاحيات كتابة). ده أشهر ثغرة في مشاريع Supabase.

بعد RLS من غير policies: [[data]] هيرجع [[[]]] و [[error]] هيبقى [[null]]. مش error. الـ RLS بيفلتر الصفوف بهدوء، فالواجهة هتعرض «مفيش داتا» ومحدش هيعرف ليه. لو عملت insert هتاخد error فيه [[new row violates row-level security policy]].

وبالـ secret key: كل الصفوف هترجع رغم الـ RLS، لأن الـ secret key بيعدّي RLS. عشان كده مكانه السيرفر بس، والـ secret keys الجديدة بترفض لو اتبعتت من متصفح (401).

ولو الجدول مش ظاهر للـ API خالص (error فيه إن الـ relation مش موجودة أو permission denied)، ده غالبًا بسبب الـ grants: Supabase بيغيّر الافتراضي عشان الجداول الجديدة متبقاش مكشوفة للـ API لوحدها، فممكن تحتاج [[grant select on public.notes to anon, authenticated]]. تأكد من إعدادات مشروعك.`,
          solCode: R`create table public.notes (
  id bigint generated always as identity primary key,
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  body text not null
);
insert into public.notes (user_id, body) select id, 'secret note' from auth.users limit 1;

// من المتصفح أو Node بالـ publishable key:
const { data, error } = await supabase.from("notes").select("*");
console.log(data, error);

alter table public.notes enable row level security;

// بالـ secret key من السيرفر:
const { data: all } = await admin.from("notes").select("*");
console.log(all.length);`,
          flag: "script",
          deep: {
            why: "Supabase بيشيل عنك كتابة backend لـ CRUD: الـ auth والـ API والملفات والـ realtime جاهزين. بس ده معناه إن الـ frontend بيكلّم القاعدة تقريبًا مباشرة، فكل الأمان اللي كان في الـ backend (مين يشوف إيه) لازم يبقى في القاعدة نفسها. لو فهمت أنهي key بيعمل إيه، هتتجنب أغلب الكوارث.",
            how: R`كل طلب من supabase-js بيروح لـ [[https://xxx.supabase.co/rest/v1/orders?select=...]] ومعاه الـ key، ولو اليوزر عامل login معاه JWT بتاعه. الـ API بيحوّل الطلب SQL وبيشغّله بـ role حسب الـ JWT: [[anon]] لو مفيش login، و [[authenticated]] لو فيه. والـ RLS بتطبّق بـ [[auth.uid()]] اللي جاي من الـ JWT. أما الـ secret key بيشغّل الطلب بـ role [[service_role]] اللي عنده [[BYPASSRLS]].

كل دالة بترجّع [[{ data, error }]] ومش بترمي exception. لازم تتحقق من [[error]] كل مرة، وإلا الفشل هيعدّي كأن مفيش داتا.

الفلاتر: [[eq]] و [[neq]] و [[gt]] و [[gte]] و [[lt]] و [[like]] و [[ilike]] و [[in]] و [[is]] و [[or("status.eq.paid,total.gt.500")]]. و [[range(0, 19)]] للـ pagination بالـ offset. و [[single()]] بيرجّع object بدل array ويرمي error لو مش صف واحد بالظبط، و [[maybeSingle()]] بيسمح بصفر.

العلاقات في select بتمشي على الـ FKs. و [[products!inner(name)]] بيخليها INNER JOIN (الأوردر اللي ملوش منتج مطابق بيختفي)، فتقدر تفلتر بعمود في جدول مرتبط.

والـ types: [[supabase gen types typescript]] بيولّد types من القاعدة، وبتدّيها لـ [[createClient<Database>]] فالـ select والـ insert يبقوا typed.

الـ insert والـ update مش بيرجّعوا الصفوف غير لو كتبت [[.select()]] بعدهم. وخلي بالك: الـ select بعد الـ insert محتاج policy للـ SELECT كمان، وإلا الـ insert هينجح والـ select يرجع فاضي أو error.`,
            when: "تطبيقات من غير backend خاص (أو backend صغير)، وتطبيقات موبايل، ولوحات أدمن داخلية، والـ MVPs. ولو المنطق معقد (دفع، وحسابات، وصلاحيات متشابكة) خلي الـ frontend ينادي Edge Function أو backend بتاعك، واللي بيستخدم الـ secret key.",
            mistakes: R`الـ secret key أو service_role في الـ frontend أو في متغير بيبدأ بـ [[NEXT_PUBLIC_]] أو [[VITE_]]: كده أي حد عنده صلاحيات أدمن على القاعدة. جدول في public من غير RLS. تتجاهل [[error]]. [[single()]] على استعلام ممكن يرجع صفر فيطلع error. تعتمد على فلتر في الـ frontend ([[eq("user_id", myId)]]) كأنه أمان، وده سهل أي حد يشيله من الطلب. الأمان هو RLS بس.`
          },
          teach: R`## الفكرة: كل سطر في supabase-js بيتحوّل طلب HTTP

[[supabase-js]] مش بيكلّم Postgres مباشرة. هو مكتبة بتبني **رابط** و **headers** وتبعتهم لسيرفر Supabase، وهناك فيه API اسمه PostgREST بيحوّل الرابط ده SQL، ويشغّله بصلاحيات اليوزر، ويرجّع النتيجة JSON. فعشان تفهم المثال، هنشوف كل سطر بيتحوّل لإيه بالظبط.

**إزاي جرّبناه:** مفيش مشروع Supabase حقيقي هنا، فشغّلنا [[@supabase/supabase-js]] (نسخة 2.117) في Node بـ [[tsx]]، وأدّيناه [[fetch]] مزيف (الـ option [[global.fetch]]) بيطبع كل طلب قبل ما يتبعت ويرجّع رد شكله زي رد Supabase. يعني **الطلبات** اللي تحت حقيقية من المكتبة نفسها، أما **الردود** فإحنا اللي كتبناها على شكل الردود في الـ docs.

---

## ١. السطر الأول: [[import { createClient } ...]]

~~~js
import { createClient } from "@supabase/supabase-js";
~~~

[[import { X } from "pkg"]] معناها «هات الدالة اللي اسمها X من المكتبة دي» (الأقواس [[{ }]] هنا بتختار اسم واحد من حاجات كتير المكتبة بتصدّرها). و [[createClient]] هي الدالة اللي بتعمل «العميل»: object فيه كل اللي هتستخدمه بعد كده ([[from]] و [[auth]] و [[rpc]] و [[storage]]).

---

## ٢. الـ client: [[createClient(URL, KEY)]]

~~~js
const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY);
~~~

بياخد حاجتين:

| الـ argument | هو إيه | شكله |
|---|---|---|
| الأول | رابط المشروع | [[https://abcd.supabase.co]] |
| التاني | الـ publishable key | بيبدأ بـ [[sb_publishable_]] |

و [[import.meta.env]] ده بتاع Vite: بيحط مكانه قيم من ملف [[.env]] وقت الـ build. و Vite بيكشف للمتصفح بس المتغيرات اللي بتبدأ بـ [[VITE_]]، فأي حاجة اسمها كده **هتبقى جوه الـ JavaScript اللي أي حد يقدر يقراه**. وده عادي للـ publishable key، لأنه مش سر: هو بس بيقول «الطلب ده جاي لمشروعي».

وبعد كده كل طلب بيطلع ومعاه الـ key في header اسمه [[apikey]]. ده من الطلبات اللي اتطبعت:

~~~text الطلب قبل الـ login
GET https://abcd.supabase.co/rest/v1/orders?...
  apikey: sb_publishable_xxx | authorization: Bearer sb_publishable_xxx
~~~

---

## ٣. الـ login: [[signInWithPassword]]

~~~js
const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
if (authError) throw authError;
~~~

حتة حتة:

- [[supabase.auth]]: الجزء المسؤول عن اليوزرز (اسمه Supabase Auth).
- [[signInWithPassword({ email, password })]]: login بإيميل وباسورد. و [[{ email, password }]] اختصار لـ [[{ email: email, password: password }]]: لو اسم المتغير زي اسم المفتاح، تكتبه مرة واحدة.
- [[await]]: الطلب بيروح للنت وبيرجع بعد شوية، و [[await]] بتستنى الرد قبل ما تكمّل السطر اللي بعده.
- [[const { error: authError } = ...]]: الدالة بترجّع object فيه [[data]] و [[error]]. الأقواس دي اسمها destructuring: «طلّع منه [[error]]»، و [[: authError]] معناها «وسمّيه authError»، عشان هنحتاج اسم [[error]] تاني تحت.

الطلب اللي اتبعت فعلًا:

~~~text الطلب
POST https://abcd.supabase.co/auth/v1/token?grant_type=password
  body: {"email":"sara@example.com","password":"wrong","gotrue_meta_security":{}}
~~~

ولما خلّينا الرد «باسورد غلط» (status [[400]]):

~~~text الناتج
authError: AuthApiError 400 Invalid login credentials
~~~

**المهم هنا:** الدالة **مرمتش** exception. رجّعت [[error]] وكمّلت عادي. عشان كده السطر [[if (authError) throw authError;]]: لو فيه error ارميه بنفسك ووقّف. من غيره الكود هيكمّل كأن اليوزر عامل login.

ولما الـ login نجح، الرد فيه [[access_token]] (ده الـ JWT بتاع اليوزر)، والمكتبة بتحفظه وتبعته بداله في كل طلب بعد كده:

~~~text الطلب بعد الـ login
GET https://abcd.supabase.co/rest/v1/orders?... | authorization: Bearer eyJhbGciOi.USER_JWT
~~~

ده اللي بيخلّي الـ RLS في القاعدة تعرف مين اللي بيسأل: الـ API بيقرا الـ JWT ويشغّل الاستعلام بدور [[authenticated]]، و [[auth.uid()]] بترجّع id اليوزر ده (الدرس الجاي).

---

## ٤. القراية: سلسلة [[from().select().eq()...]]

~~~js
const { data: orders, error } = await supabase
  .from("orders")
  .select("id, total, status, created_at, order_items(quantity, products(name))")
  .eq("status", "paid")
  .order("created_at", { ascending: false })
  .limit(20);
if (error) throw error;
~~~

كل نقطة في أول السطر بتكمّل على اللي قبلها (اسمها method chaining): كل دالة بترجّع نفس الـ object بعد ما تضيف عليه شرط، ومفيش حاجة بتتبعت لحد الـ [[await]]. والطلب اللي طلع:

~~~text الطلب
GET https://abcd.supabase.co/rest/v1/orders?select=id,total,status,created_at,order_items(quantity,products(name))&status=eq.paid&order=created_at.desc&limit=20
~~~

قارن كل دالة بالحتة بتاعتها في الرابط:

| في الكود | في الرابط | الـ SQL اللي بيطلع |
|---|---|---|
| [[.from("orders")]] | [[/rest/v1/orders]] | [[FROM orders]] |
| [[.select("id, total, ...")]] | [[select=id,total,...]] | الأعمدة |
| [[order_items(quantity, products(name))]] | جوه الـ select | JOIN على الـ FKs |
| [[.eq("status", "paid")]] | [[status=eq.paid]] | [[WHERE status = 'paid']] |
| [[.order("created_at", { ascending: false })]] | [[order=created_at.desc]] | [[ORDER BY created_at DESC]] |
| [[.limit(20)]] | [[limit=20]] | [[LIMIT 20]] |

[[eq]] من equal (يساوي). و [[ascending: false]] يعني مش تصاعدي، يعني الأحدث الأول.

### الحتة اللي جوه الأقواس: العلاقات

[[order_items(quantity, products(name))]] معناها: «من جدول [[order_items]] اللي ليه FK على [[orders]] هات [[quantity]]، ومن جدول [[products]] اللي [[order_items]] ليه FK عليه هات [[name]]». PostgREST بيعرف الربط لوحده من الـ foreign keys، فمش محتاج تكتب شرط JOIN. والنتيجة بتيجي متداخلة كده (الرد ده كتبناه بإيدنا على الشكل اللي الـ docs بتوصفه):

~~~text شكل data
[
  {
    "id": 7,
    "total": 450,
    "status": "paid",
    "created_at": "2026-10-01T10:00:00+00:00",
    "order_items": [
      { "quantity": 2, "products": { "name": "Hoodie" } }
    ]
  }
]
~~~

[[order_items]] جه array (الأوردر ليه بنود كتير)، و [[products]] جه object (البند ليه منتج واحد).

### [[{ data: orders, error }]]

نفس الـ destructuring: خد [[data]] وسمّيها [[orders]]، وخد [[error]] زي ما هو. ولو الـ RLS مخبية كل الصفوف، [[data]] هتيجي [[[]]] و [[error]] هتيجي [[null]]. يعني «مفيش داتا» مش error، وده بيلخبط ناس كتير.

---

## ٥. الكتابة: [[insert().select().single()]]

~~~js
const { data: note, error: insertError } = await supabase
  .from("notes")
  .insert({ body: "hello" })
  .select()
  .single();
~~~

الطلب اللي طلع:

~~~text الطلب
POST https://abcd.supabase.co/rest/v1/notes?select=*
  prefer: return=representation | accept: application/vnd.pgrst.object+json
  body: {"body":"hello"}
~~~

| الحتة | بتعمل إيه | بتبان فين في الطلب |
|---|---|---|
| [[.insert({ body: "hello" })]] | صف جديد، [[user_id]] مش مبعوت لأن الـ default في القاعدة [[auth.uid()]] | [[POST]] والـ body |
| [[.select()]] | رجّعلي الصف اللي اتعمل (من غيرها الـ insert مبيرجّعش داتا) | [[select=*]] و [[prefer: return=representation]] |
| [[.single()]] | رجّعه object مش array، ولازم يبقى صف واحد بالظبط | [[accept: application/vnd.pgrst.object+json]] |

ولما خلّينا الرد زي رد Supabase لما الـ RLS ترفض (status [[403]]):

~~~text الناتج
error: {
  code: '42501',
  details: null,
  hint: null,
  message: 'new row violates row-level security policy for table "notes"'
},
data: null,
status: 403
~~~

[[42501]] كود Postgres لـ «مفيش صلاحية» (insufficient privilege). والـ message دي هي نفس رسالة Postgres بالحرف، لأن الـ API بيعدّيها زي ما هي.

---

## ٦. الـ client بتاع السيرفر: الـ secret key

~~~js
const admin = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SECRET_KEY, {
  auth: { persistSession: false },
});
~~~

- [[process.env]] متغيرات البيئة في Node (env = environment). القيمة جاية من السيرفر نفسه مش من كود بيتبعت للمتصفح، فمحدش يشوفها.
- [[SUPABASE_SECRET_KEY]] بيبدأ بـ [[sb_secret_]]. Supabase بيشغّل طلباته بدور [[service_role]] اللي عنده [[BYPASSRLS]]، يعني الـ RLS مش بتتطبق عليه خالص.
- التالت argument options. [[auth: { persistSession: false }]]: متحفظش session (في المتصفح كانت هتتحفظ في localStorage). السكربت ده مش يوزر بيعمل login، فملوش session أصلًا.

والطلب بيطلع بالـ key ده:

~~~text الطلب
GET https://abcd.supabase.co/rest/v1/orders?select=id | authorization: Bearer sb_secret_yyy
~~~

---

## مين يروح فين

| | publishable ([[sb_publishable_]]) | secret ([[sb_secret_]]) |
|---|---|---|
| مكانه | الـ frontend، عادي يبان | السيرفر بس (backend، Edge Function، سكربت) |
| الدور في القاعدة | [[anon]]، أو [[authenticated]] بعد الـ login | [[service_role]] |
| الـ RLS | بتتطبق | بيعدّيها |
| لو اتسرّب | مفيش مشكلة لو الـ RLS صح | أي حد بقى أدمن على القاعدة |
| الاسم القديم | [[anon]] key | [[service_role]] key |

---

## الخلاصة

- كل دالة في supabase-js بتبني طلب HTTP، والـ API بيحوّله SQL بدور اليوزر.
- [[{ data, error }]] دايمًا، ومفيش exceptions: اتحقق من [[error]] بإيدك.
- [[data]] فاضية مع [[error = null]] غالبًا معناها RLS خبّت الصفوف، مش إن الطلب فشل.
- [[.select()]] بعد [[insert]] عشان يرجّع الصف، و [[.single()]] عشان يرجّعه object.
- الـ publishable للواجهة، والـ secret للسيرفر بس، ومش في متغير بيبدأ بـ [[VITE_]] أو [[NEXT_PUBLIC_]].`,
          lines: [
            "المكتبة.",
            "client برابط المشروع والـ publishable key (عادي يبقوا في كود الواجهة).",
            "login بإيميل وباسورد: من هنا ورايح الطلبات معاها JWT اليوزر.",
            "الدوال مش بترمي error، فاتحقق بنفسك.",
            "اقرا الأوردرات:",
            "من جدول orders،",
            "الأعمدة دي، وجواها البنود، وجوا كل بند اسم المنتج (بالـ FKs)،",
            "المدفوعة بس،",
            "الأحدث الأول،",
            "٢٠ بس. والـ RLS هتفلتر لأوردرات اليوزر ده لوحدها لو الـ policy كده.",
            "اتحقق من الـ error.",
            "ضيف note:",
            "في جدول notes،",
            "الـ body بس، والـ user_id بياخد auth.uid() كـ default في القاعدة،",
            "ورجّع الصف اللي اتعمل (محتاج policy للـ SELECT كمان)،",
            "كـ object مش array.",
            "client بالـ secret key: بيعدّي RLS، ومكانه السيرفر بس ومن env مش في الكود،",
            "ومن غير حفظ session، لأنه مش يوزر.",
            "قفلة."
          ]
        },
        {
          cmd: "policies و auth.uid()",
          title: "policy لكل عملية: مين يقرا ومين يكتب ومين يعدّل",
          desc: R`درس Row Level Security في تاب «PostgreSQL» شرح الفكرة وعمل policy واحدة [[FOR ALL]]. في مشروع حقيقي غالبًا كل عملية ليها قاعدة مختلفة: الكل يقرا الـ notes العامة، وصاحب الـ note بس يقرا الخاصة بتاعته، وأي حد عامل login يضيف note باسمه هو بس، وصاحبها بس يعدّل ويمسح.

عشان كده بتعمل policy لكل عملية ([[FOR SELECT]] و [[FOR INSERT]] و [[FOR UPDATE]] و [[FOR DELETE]]) ولكل role ([[TO anon, authenticated]]).

[[USING]] بيحدد الصفوف الموجودة اللي تقدر تشوفها أو تعدّلها أو تمسحها. [[WITH CHECK]] بيحدد شكل الصف الجديد المسموح بيه بعد INSERT أو UPDATE. و [[auth.uid()]] هو id اليوزر من الـ JWT، و NULL لو مش عامل login.`,
          example: R`CREATE TABLE notes (
  id        bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id   uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users (id) ON DELETE CASCADE,
  body      text NOT NULL,
  is_public boolean NOT NULL DEFAULT false
);
CREATE INDEX notes_user_id_idx ON notes (user_id);
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "read public or own" ON notes FOR SELECT TO anon, authenticated
  USING (is_public OR user_id = (select auth.uid()));
CREATE POLICY "insert as self" ON notes FOR INSERT TO authenticated
  WITH CHECK (user_id = (select auth.uid()));
CREATE POLICY "update own" ON notes FOR UPDATE TO authenticated
  USING (user_id = (select auth.uid())) WITH CHECK (user_id = (select auth.uid()));
CREATE POLICY "delete own" ON notes FOR DELETE TO authenticated
  USING (user_id = (select auth.uid()));
BEGIN;
SET LOCAL ROLE authenticated;
SELECT set_config('request.jwt.claims', '{"sub": "11111111-1111-1111-1111-111111111111", "role": "authenticated"}', true);
SELECT body FROM notes;
UPDATE notes SET body = 'hacked' WHERE user_id <> (select auth.uid());
ROLLBACK;`,
          try: R`في SQL Editor بتاع Supabase (أو [[supabase start]])، اعمل يوزرين من لوحة Auth، وضيف لكل واحد note خاصة وواحد منهم note عامة. استخدم الـ BEGIN و [[SET LOCAL ROLE]] اللي في المثال بالـ id بتاع اليوزر الأول، وجرّب: SELECT، و UPDATE على note اليوزر التاني، و INSERT بـ user_id اليوزر التاني، و UPDATE يغيّر user_id بتاع note بتاعته لليوزر التاني. وبعدين جرّب SELECT كـ [[anon]] من غير claims.`,
          sol: R`كيوزر أول: الـ SELECT هيرجّع الـ notes بتاعته (الخاصة والعامة) والـ notes العامة بتاعة غيره، ومش هيرجّع الخاصة بتاعة اليوزر التاني.

الـ UPDATE على note غيره هيرجّع [[UPDATE 0]] من غير error: الـ USING خبّى الصف، فالأمر ملقاش حاجة يعدّلها. نفس الحاجة للـ DELETE.

الـ INSERT بـ user_id حد تاني: [[new row violates row-level security policy for table "notes"]]، لأن الـ WITH CHECK رفض.

تغيير user_id بتاع note بتاعته لحد تاني: نفس الـ error. الـ USING سمح له يوصل للصف (هو بتاعه)، بس الـ WITH CHECK رفض الشكل الجديد. من غير WITH CHECK في policy الـ UPDATE، كان هيقدر «يرمي» notes على حساب حد تاني.

وكـ anon من غير claims: [[auth.uid()]] بيرجّع NULL، فالشرط بيبقى [[is_public OR NULL]]، فيرجع العام بس.

ولو كل حاجة رجعت، اتأكد إنك مش شغال كـ postgres: الـ superuser وصاحب الجدول بيعدّوا RLS، عشان كده الـ SET LOCAL ROLE مهم في الاختبار.`,
          solCode: R`BEGIN;
SET LOCAL ROLE authenticated;
SELECT set_config('request.jwt.claims', '{"sub": "<id اليوزر الأول>", "role": "authenticated"}', true);
SELECT body, is_public FROM notes;
UPDATE notes SET body = 'hacked' WHERE user_id = '<id اليوزر التاني>';
INSERT INTO notes (user_id, body) VALUES ('<id اليوزر التاني>', 'fake');
ROLLBACK;

BEGIN;
SET LOCAL ROLE authenticated;
SELECT set_config('request.jwt.claims', '{"sub": "<id اليوزر الأول>", "role": "authenticated"}', true);
UPDATE notes SET user_id = '<id اليوزر التاني>' WHERE user_id = (select auth.uid());
ROLLBACK;

BEGIN;
SET LOCAL ROLE anon;
SELECT body FROM notes;
ROLLBACK;`,
          flag: "script",
          deep: {
            why: "الـ RLS هو الـ backend بتاعك في Supabase. policy واحدة FOR ALL سهلة بس غالبًا غلط: يا إما بتقفل حاجة المفروض تبقى عامة، يا بتفتح كتابة لحد المفروض يقرا بس. ولما كل عملية ليها policy، القواعد بتبان زي متطلبات البيزنس بالظبط، وسهل تراجعها.",
            how: R`الـ policies بتتجمع بـ OR: لو فيه اتنين FOR SELECT، الصف بيظهر لو أي واحدة سمحت (دي الـ PERMISSIVE، الافتراضي). وفيه [[AS RESTRICTIVE]] بتتجمع بـ AND، مفيدة لشرط لازم يتحقق دايمًا (زي «الحساب مش موقوف»).

[[FOR SELECT]] بتاخد USING بس. [[FOR INSERT]] بتاخد WITH CHECK بس. [[FOR UPDATE]] بتاخد الاتنين. [[FOR DELETE]] بتاخد USING بس. وفي UPDATE و DELETE، Postgres محتاج يقرا الصف الأول، فالـ SELECT policy بتأثر عليهم كمان.

[[(select auth.uid())]] بين قوسين بـ select: Postgres بيحسبها مرة واحدة للاستعلام كله (initPlan) بدل مرة لكل صف. على جدول فيه مليون صف الفرق كبير. ونفس الحاجة لـ [[auth.jwt()]].

[[auth.uid()]] في Supabase دالة بتقرا [[request.jwt.claims]] من إعدادات الـ session، والـ API بيحطها من الـ JWT مع كل طلب. عشان كده الاختبار في SQL بيبقى بـ [[set_config('request.jwt.claims', ...)]] و [[SET LOCAL ROLE authenticated]] جوه transaction.

الأداء: كل شرط في policy بيتضاف على كل استعلام. index على [[user_id]] ضروري. والـ policies اللي فيها subquery على جدول تاني ([[EXISTS (SELECT 1 FROM members WHERE ...)]]) لازم يكون عليها index، أو تحطها في دالة [[security definer]] بتتعمل مرة.

[[DEFAULT auth.uid()]] على user_id بيخلي الـ frontend ميبعتش user_id خالص. والـ WITH CHECK بيضمن إنه لو بعته، يكون هو.`,
            when: "كل جدول في public في مشروع Supabase، من أول migration. ابدأ بـ «مقفول» (ENABLE RLS)، وافتح كل عملية لوحدها باللي محتاجه. وحط الـ policies في ملفات migrations مش من اللوحة بإيدك، عشان تبقى في git وتتراجع.",
            mistakes: R`UPDATE policy من غير WITH CHECK. [[TO public]] أو من غير TO فتنطبق على anon كمان من غير ما تقصد. [[auth.uid()]] من غير select حواليها فالاستعلام يبطأ على جداول كبيرة. تختبر من SQL Editor كـ postgres فكل حاجة تعدّي. من غير index على user_id. شرط بيعتمد على [[user_metadata]] في الـ JWT: ده اليوزر يقدر يعدّله بنفسه، فمتستخدموش للصلاحيات. استخدم [[app_metadata]] أو جدول أدوار.`
          },
          teach: R`## الفكرة: ٤ قواعد، واحدة لكل عملية

المثال بيعمل جدول [[notes]]، ويقفله بـ RLS، ويفتح كل عملية (قراية، إضافة، تعديل، مسح) بقاعدة لوحدها. وفي الآخر بيختبر القواعد دي من SQL كأنه يوزر جاي من الـ API.

**إزاي جرّبناه:** على [[postgres:18]] في Docker، مش على Supabase. فعملنا بإيدنا الحاجات اللي Supabase بيعملها لوحده: الأدوار [[anon]] و [[authenticated]] و [[service_role]]، وجدول [[auth.users]] فيه يوزرين (سارة [[1111...]] وعمر [[2222...]])، ودالة [[auth.uid()]] بنفس تعريف Supabase (بتقرا الـ [[sub]] من إعداد اسمه [[request.jwt.claims]]). والـ notes: سارة عندها note خاصة، وعمر عنده واحدة خاصة وواحدة عامة.

---

## ١. الجدول

~~~sql
CREATE TABLE notes (
  id        bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id   uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users (id) ON DELETE CASCADE,
  body      text NOT NULL,
  is_public boolean NOT NULL DEFAULT false
);
~~~

| العمود | الحتة | معناها |
|---|---|---|
| [[id]] | [[GENERATED ALWAYS AS IDENTITY]] | رقم بيزيد لوحده، ومحدش يقدر يبعته بإيده |
| [[user_id]] | [[uuid]] | نفس نوع الـ id في [[auth.users]] |
| | [[DEFAULT auth.uid()]] | لو الـ insert مبعتش user_id، خد id اليوزر اللي عامل الطلب |
| | [[REFERENCES auth.users (id)]] | FK: لازم يكون يوزر موجود |
| | [[ON DELETE CASCADE]] | لو اليوزر اتمسح، notes بتاعته تتمسح معاه |
| [[is_public]] | [[DEFAULT false]] | الـ note خاصة إلا لو قلت غير كده |

~~~sql
CREATE INDEX notes_user_id_idx ON notes (user_id);
~~~

كل policy تحت فيها [[user_id = ...]]، يعني الشرط ده هيتضاف على **كل** استعلام على الجدول. فالـ index عليه مش رفاهية.

---

## ٢. اقفل الجدول: [[ENABLE ROW LEVEL SECURITY]]

~~~sql
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;
~~~

من اللحظة دي، أي دور مش صاحب الجدول ومش superuser **مش هيشوف ولا صف** لحد ما policy تسمح. ده الوضع الآمن: مقفول، وبتفتح بالواحدة.

---

## ٣. الـ policies حتة حتة

كل policy ليها نفس الهيكل:

~~~text هيكل CREATE POLICY
CREATE POLICY "الاسم" ON الجدول  FOR العملية  TO مين  USING (...)  WITH CHECK (...)
~~~

- [[FOR]]: العملية: [[SELECT]] أو [[INSERT]] أو [[UPDATE]] أو [[DELETE]] (أو [[ALL]]).
- [[TO]]: الأدوار اللي القاعدة دي ليهم. لو مكتبتهاش يبقى [[PUBLIC]]، يعني الكل.
- [[USING]]: شرط على الصفوف **الموجودة**: تشوف أنهي، وتعدّل أنهي، وتمسح أنهي.
- [[WITH CHECK]]: شرط على الصف **الجديد** بعد INSERT أو UPDATE.

### القراية

~~~sql
CREATE POLICY "read public or own" ON notes FOR SELECT TO anon, authenticated
  USING (is_public OR user_id = (select auth.uid()));
~~~

الصف يبان لو عام، **أو** بتاعي. و [[TO anon, authenticated]] يعني حتى اللي مش عامل login يقرا (بس هيشوف العام بس، تحت هنشوف ليه).

### ليه [[(select auth.uid())]] مش [[auth.uid()]] بس؟

لو كتبتها من غير [[select]]، Postgres ممكن يناديها مرة لكل صف. بالقوسين والـ [[select]] بتبقى subquery مستقلة، فبيحسبها **مرة واحدة** للاستعلام كله. شوف خطة التنفيذ:

~~~sql
EXPLAIN (COSTS OFF) SELECT body FROM notes WHERE is_public OR user_id = (select auth.uid());
~~~

~~~text الناتج
 Seq Scan on notes
   Filter: (is_public OR (user_id = (InitPlan 1).col1))
   InitPlan 1
     ->  Result
~~~

[[InitPlan 1]] يعني «احسب ده الأول مرة واحدة»، والفلتر بيقارن بالنتيجة الجاهزة [[(InitPlan 1).col1]]. ([[Seq Scan]] هنا عادي لأن الجدول فيه ٣ صفوف بس.)

### الإضافة

~~~sql
CREATE POLICY "insert as self" ON notes FOR INSERT TO authenticated
  WITH CHECK (user_id = (select auth.uid()));
~~~

[[TO authenticated]] بس: الـ anon ميضيفش. و [[WITH CHECK]] بيقول: الصف الجديد لازم [[user_id]] بتاعه يبقى أنا. الـ INSERT ملهوش USING لأنه مفيش صف قديم.

### التعديل

~~~sql
CREATE POLICY "update own" ON notes FOR UPDATE TO authenticated
  USING (user_id = (select auth.uid())) WITH CHECK (user_id = (select auth.uid()));
~~~

الاتنين هنا: [[USING]] «تعدّل صفوفك بس»، و [[WITH CHECK]] «وبعد التعديل الصف لازم يفضل بتاعك». من غير التانية، تقدر تعدّل note بتاعتك وتحوّل [[user_id]] لحد تاني.

### المسح

~~~sql
CREATE POLICY "delete own" ON notes FOR DELETE TO authenticated
  USING (user_id = (select auth.uid()));
~~~

الـ DELETE ملهوش صف جديد، فـ USING بس.

| العملية | USING | WITH CHECK |
|---|---|---|
| SELECT | أيوه | لأ |
| INSERT | لأ | أيوه |
| UPDATE | أيوه | أيوه |
| DELETE | أيوه | لأ |

---

## ٤. الاختبار: نتظاهر إننا يوزر جاي من الـ API

لو شغّلت SELECT كده على طول وانت [[postgres]]، هتشوف كل حاجة، لأن الـ superuser وصاحب الجدول بيعدّوا الـ RLS:

~~~text الناتج كـ postgres
     body
--------------
 sara private
 omar private
 omar public
(3 rows)
~~~

عشان كده بنعمل اللي الـ API بيعمله مع كل طلب:

~~~sql
BEGIN;
SET LOCAL ROLE authenticated;
SELECT set_config('request.jwt.claims', '{"sub": "11111111-1111-1111-1111-111111111111", "role": "authenticated"}', true);
~~~

- [[BEGIN]]: افتح transaction، عشان كل اللي جاي يتلغي في الآخر.
- [[SET LOCAL ROLE authenticated]]: اشتغل بدور [[authenticated]]. و [[LOCAL]] يعني لحد آخر الـ transaction بس.
- [[set_config(الاسم, القيمة, true)]]: حط قيمة في إعداد اسمه [[request.jwt.claims]]. القيمة JSON زي اللي جوه الـ JWT، و [[sub]] (من subject) هو id اليوزر. و [[true]] التالتة معناها «للـ transaction دي بس» زي [[LOCAL]].

وناتج [[set_config]] هو القيمة نفسها:

~~~text الناتج
 {"sub": "11111111-1111-1111-1111-111111111111", "role": "authenticated"}
~~~

من هنا [[auth.uid()]] بترجّع [[11111111-...]]، يعني احنا سارة.

### SELECT كسارة

~~~sql
SELECT body FROM notes;
~~~

~~~text الناتج
     body
--------------
 sara private
 omar public
(2 rows)
~~~

بتاعتها، والعامة بتاعة عمر. الخاصة بتاعة عمر اختفت، **من غير error**.

### UPDATE على صفوف غيرها

~~~sql
UPDATE notes SET body = 'hacked' WHERE user_id <> (select auth.uid());
ROLLBACK;
~~~

[[<>]] يعني «لا يساوي». الأمر بيحاول يعدّل كل notes الناس التانية:

~~~text الناتج
UPDATE 0
ROLLBACK
~~~

[[UPDATE 0]]: صفر صفوف اتعدّلت، ومفيش error. الـ USING خلّى صفوف عمر مش موجودة بالنسبة لها أصلًا. و [[ROLLBACK]] بيلغي الـ transaction ويرجّع الدور الطبيعي.

### باقي التجارب (من الـ sol، اتشغّلت على نفس القاعدة)

| التجربة كسارة | الناتج | مين منع |
|---|---|---|
| [[INSERT]] بـ [[user_id]] عمر | [[ERROR: new row violates row-level security policy for table "notes"]] | WITH CHECK بتاع INSERT |
| [[INSERT INTO notes (body) VALUES (...) RETURNING ...]] من غير user_id | اتعمل و [[user_id]] = [[1111...]] | الـ DEFAULT خد [[auth.uid()]] |
| [[UPDATE]] يحوّل note بتاعتها لعمر | نفس الـ ERROR | WITH CHECK بتاع UPDATE |
| [[DELETE]] note عمر الخاصة | [[DELETE 0]] | USING بتاع DELETE |

### كـ anon

~~~sql
BEGIN;
SET LOCAL ROLE anon;
SELECT auth.uid();
SELECT body FROM notes;
~~~

~~~text الناتج
 uid
-----

(1 row)

    body
-------------
 omar public
(1 row)
~~~

مفيش claims، فـ [[auth.uid()]] رجعت فاضية (NULL). والشرط بقى [[is_public OR user_id = NULL]]، والمقارنة بـ NULL عمرها ما تبقى true، فالعام بس هو اللي ظهر. ولو الـ anon حاول INSERT: نفس رسالة الـ RLS، لأن مفيش INSERT policy ليه أصلًا.

---

## الخلاصة

- [[ENABLE ROW LEVEL SECURITY]] الأول، وبعدين policy لكل عملية ولكل دور ([[TO]]).
- [[USING]] للصفوف الموجودة، و [[WITH CHECK]] للصف الجديد، و UPDATE محتاج الاتنين.
- الرفض في SELECT و UPDATE و DELETE **صامت** (صفوف أقل أو [[UPDATE 0]])، وفي INSERT أو تغيير الصاحب **error**.
- [[(select auth.uid())]] بتتحسب مرة واحدة، و index على [[user_id]].
- اختبر بـ [[SET LOCAL ROLE]] و [[set_config('request.jwt.claims', ...)]] جوه [[BEGIN]]/[[ROLLBACK]]، مش كـ postgres.`,
          lines: [
            "جدول notes:",
            "رقم،",
            "صاحبها: افتراضيًا اليوزر اللي عامل الطلب، ومسح اليوزر يمسح notes بتاعته،",
            "النص،",
            "وعامة ولا خاصة.",
            "قفلة.",
            "index على user_id: كل policy هتفلتر بيه.",
            "اقفل الجدول: مفيش صف لحد لحد ما تضيف policy.",
            "القراية: للـ anon والـ authenticated،",
            "العامة، أو بتاعتي أنا.",
            "الإضافة: للي عامل login بس،",
            "والصف الجديد لازم يكون باسمي.",
            "التعديل: الصفوف اللي أوصلها بتاعتي،",
            "والشكل الجديد لازم يفضل بتاعي (ممنوع تحوّلها لحد تاني).",
            "المسح: للي عامل login،",
            "بتاعتي بس.",
            "اختبار من SQL: transaction،",
            "اشتغل بدور authenticated (زي ما الـ API بيعمل)،",
            "وحط الـ JWT claims: auth.uid() هترجّع الـ sub ده.",
            "هيرجّع العام وبتاعي بس.",
            "هيرجّع UPDATE 0: صفوف غيري مستخبية.",
            "ارجع من غير ما تحفظ أي حاجة."
          ]
        },
        {
          cmd: "rpc",
          title: "نادي دالة Postgres من الـ frontend: security invoker ولا definer",
          desc: R`لما عملية محتاجة كذا خطوة لازم تحصل مع بعض (خصم مخزون وإنشاء أوردر)، أو حساب على داتا كتير (إجمالي، ترتيب)، مينفعش تعملها بكذا طلب من الـ frontend. بتكتبها function في Postgres (درس CREATE FUNCTION في المستوى التاني) وتناديها: [[supabase.rpc("place_order", { p_product_id: 5, p_qty: 2 })]].

أسماء الـ parameters في الـ object لازم تبقى نفس أسماء الـ parameters في الدالة. والنتيجة في [[data]]: قيمة، أو array لو الدالة بترجّع جدول.

الأمان: الافتراضي [[SECURITY INVOKER]]، يعني الدالة بتشتغل بصلاحيات اليوزر اللي ناداها، والـ RLS بتتطبق جواها. [[SECURITY DEFINER]] بتشتغل بصلاحيات صاحبها (غالبًا postgres) وبتعدّي RLS، فلازم تتحقق جواها بنفسك مين بينادي، وتقفلها بـ [[REVOKE EXECUTE]] عن اللي مش المفروض يناديها.`,
          example: R`CREATE FUNCTION public.my_notes_count() RETURNS bigint
LANGUAGE sql STABLE SECURITY INVOKER SET search_path = '' AS $$
  SELECT count(*) FROM public.notes WHERE user_id = (select auth.uid());
$$;
CREATE FUNCTION public.all_notes_count() RETURNS bigint
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = '' AS $$
  SELECT count(*) FROM public.notes;
$$;
REVOKE EXECUTE ON FUNCTION public.all_notes_count() FROM PUBLIC, anon, authenticated;
BEGIN;
SET LOCAL ROLE authenticated;
SELECT set_config('request.jwt.claims', '{"sub": "22222222-2222-2222-2222-222222222222"}', true);
SELECT public.my_notes_count();
SELECT public.all_notes_count();
ROLLBACK;`,
          try: R`اعمل الدالتين في مشروعك. من supabase-js وانت عامل login، نادي [[rpc("my_notes_count")]] و [[rpc("all_notes_count")]]. وبعدين من سكربت على السيرفر بالـ secret key نادي التانية. وبعدين شيل سطر الـ REVOKE (اعمل الدالة من جديد) ونادي [[all_notes_count]] من المتصفح تاني.`,
          sol: R`[[my_notes_count]] هترجّع عدد الـ notes بتاعتك بس، لأنها INVOKER والـ RLS شغالة، والشرط كمان جواها بـ auth.uid().

[[all_notes_count]] من المتصفح هترجّع error: [[permission denied for function all_notes_count]] (في supabase-js هتلاقيها في [[error.message]] و [[error.code]] = [[42501]]). ومن السيرفر بالـ secret key هترجّع العدد الكلي لكل اليوزرز، لأن service_role عنده صلاحيات والدالة DEFINER.

من غير الـ REVOKE: أي يوزر (وحتى anon) يقدر يناديها ويعرف عدد كل الـ notes في النظام. هنا العدد بس، بس تخيّل دالة DEFINER بترجّع صفوف أو بتعدّل: ده يبقى bypass كامل للـ RLS من الـ frontend. عشان كده أي دالة DEFINER في public يا إما جواها check على [[auth.uid()]]، يا إما مقفولة بـ REVOKE. وخد بالك إن Postgres بيدّي [[EXECUTE]] لـ [[PUBLIC]] افتراضيًا على أي دالة جديدة، و Supabase كمان بيدّي anon و authenticated، فلازم الـ REVOKE يشيل الاتنين.`,
          solCode: R`// في الواجهة، واليوزر عامل login
const mine = await supabase.rpc("my_notes_count");
console.log(mine.data, mine.error);
const all = await supabase.rpc("all_notes_count");
console.log(all.data, all.error?.code, all.error?.message);

// على السيرفر بالـ secret key
const adminAll = await admin.rpc("all_notes_count");
console.log(adminAll.data);`,
          flag: "script",
          deep: {
            why: "من غير backend، الـ rpc هو الطريقة الوحيدة تعمل عملية ذرية (atomic) من الـ frontend: عشر طلبات insert و update ورا بعض من المتصفح ممكن نصهم ينجح ونصهم يفشل، أو اليوزر يقفل الصفحة في النص. والدالة بتشتغل في transaction واحدة جوه القاعدة.",
            how: R`[[supabase.rpc(name, args)]] بيبعت POST لـ [[/rest/v1/rpc/name]] والـ args JSON، والـ API بيطابق أسماء المفاتيح بأسماء الـ parameters. لو الاسم غلط هتاخد error إن الدالة مش موجودة بالتوقيع ده. ولو الدالة بترجّع جدول تقدر تكمّل عليها فلاتر: [[rpc("search_notes", { q }).select("id, body").limit(10)]].

[[SET search_path = '']] مهم جدًا مع DEFINER: من غيره، حد يقدر يعمل object بنفس الاسم في schema تانية ويخلي دالتك تستخدمه بصلاحيات postgres. عشان كده كل الأسماء جوه الدالة بتتكتب كاملة ([[public.notes]]). و Security Advisor في لوحة Supabase بينبّهك لأي دالة من غير search_path.

إمتى DEFINER؟ لما الدالة محتاجة تقرا جدول اليوزر مش مسموح له يقراه مباشرة، زي «هل أنا عضو في الفريق ده؟» على جدول members، أو trigger على [[auth.users]] بيعمل profile. وفي الحالة دي الدالة بترجّع أقل حاجة ممكنة (boolean مثلًا)، ومش بتاخد id يوزر كـ parameter (خدها من [[auth.uid()]]، وإلا أي حد هيبعت id غيره).

الأخطاء: [[RAISE EXCEPTION 'OUT_OF_STOCK']] بترجع في [[error.message]]، فتقدر تتعامل معاها في الواجهة. ومتحطش فيها داتا حساسة.

والـ Edge Functions بديل لما المنطق محتاج API برّه (دفع أو إيميل) أو مكتبات JavaScript. الـ rpc للمنطق اللي كله داتا.`,
            when: "عمليات من كذا خطوة (أوردر، تحويل رصيد، حجز)، وبحث أو تقارير فيها SQL معقد (full-text، و pg_trgm، و window functions)، وأي حاجة محتاجة تبقى atomic أو أسرع من كذا رحلة للسيرفر.",
            mistakes: R`DEFINER من غير search_path ومن غير REVOKE. دالة DEFINER بتاخد [[p_user_id]] من الـ client وتثق فيه. أسماء parameters مختلفة بين الدالة والـ object. تتجاهل [[error]]. تعمل الدالة من اللوحة ومحدش عارف إنها موجودة؛ حطها في migration. ودالة بترجّع [[SETOF notes]] وهي DEFINER، فبترجّع كل الـ notes لأي حد.`
          },
          teach: R`## الفكرة: دالة في القاعدة، والـ frontend يناديها بالاسم

المثال بيعمل دالتين بيعدّوا notes: واحدة بتشتغل **بصلاحيات اللي بينادي** ([[SECURITY INVOKER]])، وواحدة **بصلاحيات صاحبها** ([[SECURITY DEFINER]]). وبعدين بيقفل التانية ويختبر الاتنين كيوزر عادي.

**إزاي جرّبناه:** نفس قاعدة الدرس اللي فات على [[postgres:18]] في Docker (الأدوار و [[auth.uid()]] متعملين بإيدنا زي Supabase، وجدول notes بالـ policies بتاعته وفيه ٣ صفوف: لسارة واحدة، ولعمر اتنين). وكمان نفس صلاحيات Supabase الافتراضية: أي دالة جديدة في [[public]] بتاخد [[EXECUTE]] لـ [[anon]] و [[authenticated]] و [[service_role]]. وجزء supabase-js اتشغّل بـ fetch مزيف بيطبع الطلب.

---

## ١. الدالة الأولى: INVOKER

~~~sql
CREATE FUNCTION public.my_notes_count() RETURNS bigint
LANGUAGE sql STABLE SECURITY INVOKER SET search_path = '' AS $$
  SELECT count(*) FROM public.notes WHERE user_id = (select auth.uid());
$$;
~~~

حتة حتة:

| الحتة | معناها |
|---|---|
| [[public.my_notes_count()]] | اسم الدالة في schema [[public]] (الـ API بيكشف الـ schema دي)، ومن غير parameters |
| [[RETURNS bigint]] | بترجّع رقم واحد. [[count(*)]] نوعه [[bigint]] |
| [[LANGUAGE sql]] | جسمها SQL عادي (مش plpgsql)، آخر SELECT هو النتيجة |
| [[STABLE]] | مش بتعدّل حاجة، ونفس المدخلات في نفس الاستعلام بتدّي نفس النتيجة. الـ API بيشغّل الدوال الـ STABLE في transaction للقراية بس |
| [[SECURITY INVOKER]] | بصلاحيات اللي بينادي، فالـ RLS بتتطبق جواها. ده الافتراضي لو مكتبتهوش |
| [[SET search_path = '']] | جوه الدالة مفيش schema افتراضية، فلازم كل اسم يتكتب كامل ([[public.notes]]) |
| [[AS $$ ... $$]] | [[$$]] علامة بداية ونهاية لجسم الدالة، بدل الـ quotes، عشان تقدر تكتب [[']] جواه عادي |

---

## ٢. الدالة التانية: DEFINER

~~~sql
CREATE FUNCTION public.all_notes_count() RETURNS bigint
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = '' AS $$
  SELECT count(*) FROM public.notes;
$$;
~~~

الفرق كلمة واحدة: [[SECURITY DEFINER]]. الدالة بتشتغل بصلاحيات **صاحبها**، واللي عملها هنا [[postgres]] (وده صاحب الجدول كمان)، فالـ RLS مش بتتطبق جواها والعد بيشمل الكل.

وهنا [[search_path = '']] بقى ضروري: الدالة دي بتشتغل كـ postgres، فلو بتدوّر على الأسماء في schemas تانية، حد ممكن يعمل جدول أو دالة بنفس الاسم في schema هو بيتحكم فيها ويخليها تتنفذ بصلاحيات postgres.

### مين يقدر ينادي الدالة دلوقتي؟

~~~sql
SELECT proname, proacl FROM pg_proc WHERE proname LIKE '%notes_count';
~~~

[[pg_proc]] جدول النظام اللي فيه كل الدوال، و [[proacl]] صلاحياتها (acl = Access Control List).

~~~text الناتج
     proname     |                       proacl
-----------------+----------------------------------------------------------------
 my_notes_count  | {=X/postgres,postgres=X/postgres,anon=X/postgres,authenticated=X/postgres,service_role=X/postgres}
 all_notes_count | {=X/postgres,postgres=X/postgres,anon=X/postgres,authenticated=X/postgres,service_role=X/postgres}
~~~

اقرا كل حتة كده: [[مين=صلاحيات/مين اداها]]. و [[X]] يعني EXECUTE. و [[=X/postgres]] اللي مفيش قبل الـ [[=]] اسم ده [[PUBLIC]]، يعني **أي دور**. يعني الدالة اللي بتعدّي الـ RLS، أي حد يقدر يناديها.

---

## ٣. اقفلها: [[REVOKE EXECUTE]]

~~~sql
REVOKE EXECUTE ON FUNCTION public.all_notes_count() FROM PUBLIC, anon, authenticated;
~~~

اسحب صلاحية التنفيذ من التلاتة. لازم الاتنين: [[PUBLIC]] (الافتراضي بتاع Postgres) و [[anon, authenticated]] (اللي Supabase اداهم). لو شلت واحد بس، التاني لسه بيفتحها.

~~~text proacl بعد الـ REVOKE
 all_notes_count | {postgres=X/postgres,service_role=X/postgres}
~~~

فضل [[postgres]] و [[service_role]] (اللي بيستخدمه الـ secret key) بس.

---

## ٤. الاختبار كيوزر

~~~sql
BEGIN;
SET LOCAL ROLE authenticated;
SELECT set_config('request.jwt.claims', '{"sub": "22222222-2222-2222-2222-222222222222"}', true);
SELECT public.my_notes_count();
SELECT public.all_notes_count();
ROLLBACK;
~~~

نفس طريقة الدرس اللي فات: دور [[authenticated]]، و [[sub]] هو id عمر.

~~~text الناتج
 my_notes_count
----------------
              2
(1 row)

ERROR:  permission denied for function all_notes_count
ROLLBACK
~~~

- [[my_notes_count]] رجّعت [[2]]: notes عمر بس.
- [[all_notes_count]] اترفضت قبل ما تتنفذ، لأن [[authenticated]] ملوش EXECUTE.

ونفس الدالة بدور [[service_role]]:

~~~text الناتج
 all_notes_count
-----------------
               3
~~~

[[3]]: كل الـ notes لكل اليوزرز.

### ولو نسيت الـ REVOKE؟

رجّعنا الصلاحية لـ [[anon]] وجرّبنا بدوره (من غير login خالص):

~~~text الناتج كـ anon
 all_notes_count
-----------------
               3

 count
-------
     1
~~~

نفس الدور: [[SELECT count(*) FROM notes]] مباشرة رجّع [[1]] (العامة بس، الـ RLS شغالة)، بس الدالة رجّعت [[3]]. يعني الدالة DEFINER فتحت باب حوالين الـ RLS.

---

## ٥. من الـ frontend: [[supabase.rpc]]

~~~js
const mine = await supabase.rpc("my_notes_count");
console.log(mine.data, mine.error);
const all = await supabase.rpc("all_notes_count");
console.log(all.data, all.error?.code, all.error?.message);
~~~

الطلبات اللي supabase-js بعتها فعلًا:

~~~text الطلبات
POST https://abcd.supabase.co/rest/v1/rpc/my_notes_count
  body: {}
POST https://abcd.supabase.co/rest/v1/rpc/place_order
  body: {"p_product_id":5,"p_qty":2}
~~~

[[rpc("اسم", { ... })]] بيبقى [[POST]] على [[/rest/v1/rpc/اسم]]، والـ object بيتبعت JSON، والـ API بيطابق كل مفتاح باسم parameter في الدالة. فلو الدالة [[place_order(p_product_id bigint, p_qty int)]]، المفاتيح لازم [[p_product_id]] و [[p_qty]] بالحرف.

والردود (إحنا اللي كتبناها على شكل رد Supabase، وفيها نفس رسالة Postgres اللي فوق):

~~~text الناتج
2 null
null 42501 permission denied for function all_notes_count
~~~

و [[?.]] في [[all.error?.code]] اسمها optional chaining: «لو [[error]] موجود هات [[code]]، ولو [[null]] رجّع [[undefined]] من غير ما تقع».

---

## الخلاصة

| | INVOKER (الافتراضي) | DEFINER |
|---|---|---|
| بصلاحيات مين | اللي بينادي | صاحب الدالة |
| الـ RLS جواها | بتتطبق | بتتعدّي |
| محتاجة إيه | ولا حاجة زيادة | [[search_path = '']]، و [[REVOKE]] أو check على [[auth.uid()]] جواها |

- Postgres بيدّي EXECUTE لـ [[PUBLIC]] على أي دالة جديدة، و Supabase بيدّي [[anon]] و [[authenticated]]، فالـ REVOKE لازم يشيل التلاتة.
- [[rpc]] = [[POST /rest/v1/rpc/الاسم]]، وأسماء المفاتيح = أسماء الـ parameters.
- الـ error بيرجع في [[error]] زي أي طلب، و [[42501]] = مفيش صلاحية.`,
          lines: [
            "دالة بتعدّ notes اليوزر اللي بينادي،",
            "INVOKER (بصلاحياته والـ RLS شغالة)، و search_path فاضي عشان الأمان.",
            "العد بـ auth.uid()، والأسماء كاملة بالـ schema.",
            "قفلة.",
            "دالة بتعدّ كل الـ notes في النظام،",
            "DEFINER: بتشتغل بصلاحيات postgres وبتعدّي RLS.",
            "العد من غير أي شرط.",
            "قفلة.",
            "اقفلها: محدش من الـ frontend يقدر يناديها (السيرفر بالـ secret key بس).",
            "اختبار:",
            "كيوزر عامل login،",
            "بالـ id ده.",
            "بترجّع notes بتاعته بس.",
            "error: permission denied.",
            "ارجع."
          ]
        },
        {
          cmd: "Storage و Realtime",
          title: "ارفع صورة البروفايل في فولدر اليوزر، واسمع الأوردرات الجديدة لحظة بلحظة",
          desc: R`Storage: ملفات في buckets. الـ bucket ممكن يبقى public (أي حد معاه الرابط يشوف الملف) أو private (بتطلب رابط مؤقت [[createSignedUrl]]). والصلاحيات بـ RLS برضه، بس على جدول [[storage.objects]]: كل ملف صف، واسم الملف (المسار) في عمود [[name]]. النمط المشهور: كل يوزر يرفع في فولدر اسمه الـ id بتاعه، والـ policy بتقارن أول جزء من المسار بـ [[auth.uid()]].

Realtime: [[postgres_changes]] بيبعتلك كل INSERT أو UPDATE أو DELETE على جدول لحظة ما يحصل، عن طريق websocket. الجدول لازم يتضاف لـ publication اسمها [[supabase_realtime]]، والـ RLS بتتطبق: كل يوزر بيوصله بس التغييرات على الصفوف اللي يقدر يقراها.`,
          example: R`const path = $__bt$__{user.id}/avatar.png$__bt;
const { error: upError } = await supabase.storage
  .from("avatars")
  .upload(path, file, { upsert: true, contentType: file.type });
const { data: signed } = await supabase.storage.from("avatars").createSignedUrl(path, 60 * 60);

const channel = supabase
  .channel("my-orders")
  .on("postgres_changes", { event: "INSERT", schema: "public", table: "orders" }, (payload) => {
    console.log("new order", payload.new);
  })
  .subscribe();

await supabase.removeChannel(channel);`,
          try: R`اعمل bucket private اسمه [[avatars]]، وضيف policies على storage.objects للـ INSERT والـ SELECT والـ UPDATE بشرط [[(storage.foldername(name))[1] = (select auth.uid())::text]]. ارفع صورة في فولدرك، وبعدين جرّب ترفع في [[other-user-id/avatar.png]]. وبعدين فعّل realtime على جدول orders ([[alter publication supabase_realtime add table orders]])، وافتح الصفحة في تابين بيوزرين مختلفين، وضيف أوردر ليوزر منهم.`,
          sol: R`الرفع في فولدرك هينجح. الرفع في فولدر حد تاني هيرجّع error فيه [[new row violates row-level security policy]] (بـ status 403). ولو الرفع العادي نفسه فشل بنفس الرسالة رغم إن INSERT policy صح، غالبًا ناقصك SELECT policy: الـ Storage API بيعمل INSERT ومعاه RETURNING، فمحتاج يقدر يقرا الصف اللي اتعمل. و [[upsert: true]] (استبدال الصورة) محتاج UPDATE policy كمان.

الـ signed URL هيشتغل ساعة وبعدين يرجّع error. الرابط العادي ([[getPublicUrl]]) مش هيشتغل لأن الـ bucket private.

وفي realtime: التاب بتاع صاحب الأوردر هيطبع [[new order]] ومعاه الصف، والتاب التاني مش هيوصله حاجة، لو الـ RLS على orders بتسمح لكل يوزر يقرا أوردراته بس. لو ولا تاب وصله حاجة: الجدول مش في الـ publication، أو الـ subscribe فشل (بص على الـ status في callback الـ subscribe). ولو الاتنين وصلهم: الـ RLS مش متفعلة أو فيها policy فاتحة.`,
          solCode: R`create policy "avatar read own" on storage.objects for select to authenticated
  using (bucket_id = 'avatars' and (storage.foldername(name))[1] = (select auth.uid())::text);
create policy "avatar upload own" on storage.objects for insert to authenticated
  with check (bucket_id = 'avatars' and (storage.foldername(name))[1] = (select auth.uid())::text);
create policy "avatar replace own" on storage.objects for update to authenticated
  using (bucket_id = 'avatars' and (storage.foldername(name))[1] = (select auth.uid())::text);

alter publication supabase_realtime add table public.orders;

// في الواجهة
const bad = await supabase.storage.from("avatars").upload("someone-else/avatar.png", file);
console.log(bad.error?.message);`,
          flag: "script",
          deep: {
            why: "كل تطبيق تقريبًا فيه صور بروفايل أو مرفقات، وكتير فيهم «تحديث لحظي» (أوردر جديد في لوحة المطعم، رسالة جديدة). Supabase بيدّيك الاتنين من غير سيرفر ملفات ولا websocket server، بس نفس قاعدة الأمان: كله RLS، وأي policy ناقصة يا إما بتقفل الخدمة يا بتفتحها للكل.",
            how: R`Storage: الملفات نفسها في object storage (زي S3)، والـ metadata صف في [[storage.objects]] (bucket_id و name و owner). كل عملية من الـ client بتتحول عملية على الجدول ده، فالـ RLS بتحكم: upload = INSERT، و download و list = SELECT، و upsert = SELECT و UPDATE، و remove = DELETE.

[[storage.foldername(name)]] بتقسم المسار لـ array فولدرات، و [[(...)[1]]] أول فولدر (Postgres arrays بتبدأ من 1). والمقارنة بـ [[auth.uid()::text]] لأن الـ uid نوعه uuid والمسار نص.

الـ public bucket: القراية مش محتاجة policy ولا login، أي حد عنده الرابط. مناسب للصور العامة (صور منتجات). الـ private: [[createSignedUrl(path, ثواني)]] رابط مؤقت. ومتحطش حاجة حساسة (بطايق، وعقود) في public أبدًا. الـ URL ممكن يتخمن أو يتسرّب.

Realtime postgres_changes: Postgres بيكتب التغييرات في الـ WAL، وسيرفر Realtime بيقراها من publication [[supabase_realtime]]، ولكل subscriber بيتأكد من RLS قبل ما يبعت. و [[filter: "user_id=eq." + id]] بيقلل اللي بيتبعت. للـ DELETE، الـ payload فيه الـ primary key بس، إلا لو عملت [[REPLICA IDENTITY FULL]] على الجدول.

الحدود: postgres_changes بيشيّك RLS لكل subscriber على كل تغيير، فمع آلاف المشتركين بيبقى تقيل. Supabase بينصح بـ [[Broadcast]] (رسايل بتبعتها انت، أو من trigger في القاعدة) للحاجات الكبيرة زي الشات، و [[Presence]] لـ «مين أونلاين».

والـ realtime مش بديل للداتا: لو الـ websocket اتقطع، اللي حصل وقتها ضاع. لما يرجع اعمل fetch للحالة الحالية.`,
            when: "Storage: صور بروفايل، ومرفقات، وملفات بتترفع من اليوزر. Realtime: لوحات بتتحدث لوحدها (أوردرات، تذاكر دعم)، وإشعارات جوه التطبيق، وحاجات تعاونية بسيطة.",
            mistakes: R`bucket public لملفات خاصة. policy للـ INSERT بس فالرفع يفشل (ناقص SELECT) أو الاستبدال يفشل (ناقص UPDATE). مسار الملف من غير فولدر اليوزر، فمفيش طريقة تكتب policy. تنسى تضيف الجدول للـ publication. تنسى [[removeChannel]] لما الـ component يتشال، فالـ subscriptions تتراكم. وتعتمد على realtime لوحده من غير fetch بعد إعادة الاتصال.`
          },
          teach: R`## الفكرة: الملفات صفوف في جدول، والتغييرات بتوصلك لوحدها

المثال فيه جزئين: **Storage** بيرفع صورة في فولدر باسم اليوزر ويطلع لها رابط مؤقت، و **Realtime** بيشترك في أي أوردر جديد. والاتنين محكومين بنفس حاجة الدروس اللي فاتت: الـ RLS.

**إزاي جرّبناه:** الطلبات اللي supabase-js بيبعتها اتطبعت فعلًا بـ fetch مزيف (المكتبة حقيقية والردود إحنا اللي كتبناها). والـ policies اتشغّلت على [[postgres:18]] في Docker على جدول [[storage.objects]] مبسّط عملناه بإيدنا، ومعاه دالة [[storage.foldername]] بنفس تعريف Supabase. أما الـ Realtime نفسه (الـ websocket) فمحتاج سيرفر Realtime بتاع Supabase، فاللي عنه هنا من الـ docs، ما عدا الـ publication اللي جربناها في Postgres.

---

## ١. المسار: [[$__bt$__{user.id}/avatar.png$__bt]]

~~~js
const path = $__bt$__{user.id}/avatar.png$__bt;
~~~

ده template string في JavaScript: النص بين علامتين backtick، و [[$__{...}]] جواه بيتحط مكانها قيمة. فلو [[user.id]] هو [[1111...]]، المسار [[1111.../avatar.png]].

ليه الـ id أول جزء؟ عشان الـ policy تقدر تقول «أول فولدر في المسار لازم يبقى أنا». من غير كده مفيش طريقة تعرف الملف ده بتاع مين.

---

## ٢. الرفع: [[storage.from().upload()]]

~~~js
const { error: upError } = await supabase.storage
  .from("avatars")
  .upload(path, file, { upsert: true, contentType: file.type });
~~~

| الحتة | معناها |
|---|---|
| [[supabase.storage]] | جزء الملفات |
| [[.from("avatars")]] | الـ bucket (زي فولدر رئيسي ليه إعدادات: public ولا private، وحجم أقصى، وأنواع مسموحة) |
| [[path]] | المسار جوه الـ bucket |
| [[file]] | الملف نفسه، غالبًا من [[<input type="file">]] |
| [[upsert: true]] | لو فيه ملف بنفس المسار استبدله (من update + insert). من غيرها الرفع التاني يفشل لأن الملف موجود |
| [[contentType: file.type]] | نوع الملف ([[image/png]]) عشان المتصفح يعرضه صح لما يتفتح |

الطلب اللي طلع:

~~~text الطلب
POST https://abcd.supabase.co/storage/v1/object/avatars/u1/avatar.png | x-upsert: true
~~~

[[upsert: true]] بقت header اسمه [[x-upsert]]. والرد اتحوّل لـ:

~~~text الناتج
upload: { path: 'u1/avatar.png', id: 'x', fullPath: 'avatars/u1/avatar.png' } null
~~~

### الرفع ده في القاعدة بقى INSERT

كل ملف بيترفع بيبقى صف في [[storage.objects]]، والاسم (المسار) في عمود [[name]]. فالصلاحيات policies عادية على الجدول ده. أول حاجة الدالة اللي بتقسم المسار:

~~~sql
SELECT storage.foldername('11111111-1111-1111-1111-111111111111/avatar.png') AS f,
       (storage.foldername('11111111-1111-1111-1111-111111111111/avatar.png'))[1] AS first,
       storage.foldername('a/b/c.png') AS deep, storage.foldername('avatar.png') AS root;
~~~

~~~text الناتج
                   f                    |                first                 | deep  | root
----------------------------------------+--------------------------------------+-------+------
 {11111111-1111-1111-1111-111111111111} | 11111111-1111-1111-1111-111111111111 | {a,b} | {}
~~~

[[foldername]] بترجّع array الفولدرات من غير اسم الملف. و [[[1]]] أول عنصر، لأن الـ arrays في Postgres بتبدأ من 1 مش 0. وملف من غير فولدر بيرجّع [[{}]] فاضي، فـ [[[1]]] بتبقى NULL وأي policy هترفضه.

### policy الرفع لوحدها مش كفاية

عملنا policy الـ INSERT بس من الـ solCode:

~~~sql
create policy "avatar upload own" on storage.objects for insert to authenticated
  with check (bucket_id = 'avatars' and (storage.foldername(name))[1] = (select auth.uid())::text);
~~~

[[::text]] تحويل نوع: [[auth.uid()]] نوعها [[uuid]]، والمسار نص، فلازم نحوّل عشان نقارن. وكسارة جرّبنا INSERT عادي، وبعده INSERT ومعاه [[RETURNING]] (يعني «رجّعلي الصف اللي اتعمل»):

~~~text الناتج
INSERT 0 1
ERROR:  new row violates row-level security policy for table "objects"
~~~

العادي نجح، واللي فيه RETURNING اترفض بنفس رسالة الـ RLS. لأن RETURNING معناها قراية، والقراية محتاجة SELECT policy. والـ Storage API بيعمل INSERT بـ RETURNING، فالرفع بيفشل. بعد ما ضفنا policy الـ SELECT:

~~~text الناتج
 11111111-1111-1111-1111-111111111111/avatar.png
(1 row)

INSERT 0 1
ERROR:  new row violates row-level security policy for table "objects"
~~~

في فولدرها نجح، وفي فولدر عمر ([[2222.../avatar.png]]) اترفض. و [[upsert]] بيحتاج كمان UPDATE policy عشان الاستبدال.

---

## ٣. رابط مؤقت: [[createSignedUrl]]

~~~js
const { data: signed } = await supabase.storage.from("avatars").createSignedUrl(path, 60 * 60);
~~~

[[60 * 60]] = 3600 ثانية = ساعة. الطلب:

~~~text الطلب
POST https://abcd.supabase.co/storage/v1/object/sign/avatars/u1/avatar.png
  body: {"expiresIn":3600}
~~~

والناتج رابط فيه [[token]] بيخلص بعد ساعة:

~~~text الناتج
signed: {
  signedUrl: 'https://abcd.supabase.co/storage/v1/object/sign/avatars/u1/avatar.png?token=eyJ...'
}
~~~

وقارنه بـ [[getPublicUrl]] اللي بيرجّع [[.../storage/v1/object/public/avatars/u1/avatar.png]] من غير token ومن غير ما يكلّم السيرفر أصلًا. ده بيشتغل بس لو الـ bucket public.

---

## ٤. Realtime: اشترك في الأوردرات الجديدة

~~~js
const channel = supabase
  .channel("my-orders")
  .on("postgres_changes", { event: "INSERT", schema: "public", table: "orders" }, (payload) => {
    console.log("new order", payload.new);
  })
  .subscribe();
~~~

(الجزء ده من الـ docs.)

| الحتة | معناها |
|---|---|
| [[.channel("my-orders")]] | قناة على websocket واحد. الاسم أي حاجة بتختارها |
| [[.on("postgres_changes", ...)]] | اسمع تغييرات في جداول Postgres |
| [[event: "INSERT"]] | الإضافات بس. وفيه [["UPDATE"]] و [["DELETE"]] و [["*"]] للكل |
| [[schema]] و [[table]] | أنهي جدول. وممكن تزود [[filter: "user_id=eq.<id>"]] |
| [[(payload) => { ... }]] | arrow function بتتنادي مع كل تغيير، و [[payload.new]] الصف الجديد |
| [[.subscribe()]] | ابدأ فعلًا. ممكن تدّيها callback بياخد الحالة ([[SUBSCRIBED]] أو [[CHANNEL_ERROR]] أو [[TIMED_OUT]]) |

### الجدول لازم يبقى في الـ publication

سيرفر Realtime بيقرا التغييرات من publication اسمها [[supabase_realtime]]. عملناها في Postgres وضفنا الجدول:

~~~sql
alter publication supabase_realtime add table public.orders;
SELECT * FROM pg_publication_tables;
~~~

~~~text الناتج
      pubname      | schemaname | tablename |      attnames      | rowfilter
-------------------+------------+-----------+--------------------+-----------
 supabase_realtime | public     | orders    | {id,user_id,total} |
~~~

(Postgres طلّع كمان [[WARNING: "wal_level" is insufficient to publish logical changes]] وقت ما عملنا الـ publication، لأن الـ container العادي [[wal_level = replica]]. في Supabase الإعداد ده [[logical]] جاهز.)

### إلغاء الاشتراك

~~~js
await supabase.removeChannel(channel);
~~~

لما الصفحة أو الـ component يتقفل. من غيره كل مرة الـ component يتعمل من جديد بيفتح اشتراك زيادة، والرسايل بتوصل مرتين وتلاتة.

---

## الخلاصة

| عملية الـ Storage | في القاعدة | الـ policy اللي محتاجها |
|---|---|---|
| [[upload]] | INSERT ... RETURNING | INSERT و SELECT |
| [[upload]] بـ [[upsert: true]] | INSERT أو UPDATE | INSERT و SELECT و UPDATE |
| [[download]] و [[list]] و [[createSignedUrl]] | SELECT | SELECT |
| [[remove]] | DELETE | DELETE |

- المسار يبدأ بـ id اليوزر، والـ policy تقارن [[(storage.foldername(name))[1]]] بـ [[auth.uid()::text]].
- private bucket + [[createSignedUrl]] للملفات الخاصة، و public للصور العامة بس.
- Realtime: الجدول في [[supabase_realtime]]، والـ RLS بتحدد مين يوصله إيه، و [[removeChannel]] لما تخلص.`,
          lines: [
            "المسار: فولدر باسم id اليوزر، وجواه الصورة.",
            "ارفع:",
            "في bucket اسمه avatars،",
            "الملف في المسار ده، واستبدله لو موجود (محتاج UPDATE policy).",
            "رابط مؤقت لمدة ساعة (للـ bucket الـ private).",
            "اشترك في التغييرات:",
            "channel باسم،",
            "كل INSERT على جدول orders (والـ RLS بتحدد أنهي صفوف توصلك)،",
            "الصف الجديد في payload.new.",
            "قفلة الـ callback.",
            "ابدأ الاشتراك.",
            "لما تخلص (الـ component اتشال): الغي الاشتراك."
          ]
        }
      ]
    }
]);
