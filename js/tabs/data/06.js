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
    },
    {
      t: "Mongoose و Drizzle و seed",
      l: 3,
      n: "populate و N+1 في Mongoose، وبديل Prisma الأقرب لـ SQL، وإزاي تملا القاعدة بداتا شبه الحقيقية",
      items: [
        {
          cmd: "populate",
          title: "Mongoose: populate بدل JOIN، و N+1 بشكل تاني",
          desc: R`MongoDB مفيهاش JOIN زي SQL. في Mongoose بتخزن الـ ObjectId بتاع المستند المرتبط ([[user: { type: ObjectId, ref: "User" }]])، و [[populate("user")]] بيجيبه.

الـ populate مش JOIN في القاعدة: هو استعلام تاني. Mongoose بيجيب الأوردرات، ويجمع الـ user ids كلها، ويعمل [[User.find({ _id: { $in: ids } })]] واحد، ويحط كل يوزر مكانه. يعني ٢ استعلام، زي include في Prisma.

والـ N+1 بيرجع لو عملت populate أو findById جوه loop. وأساسيات Mongoose (الاتصال، والـ schema، و lean) في درس mongoose في تاب «Backend بـ Node»، وأوامر الشيل والباك أب في تاب «MongoDB».`,
          example: R`const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  items: [{ name: String, qty: Number, unitPrice: Number }],
  status: { type: String, enum: ["pending", "paid", "cancelled"], default: "pending" },
}, { timestamps: true });
const Order = mongoose.model("Order", orderSchema);

mongoose.set("debug", true);

const orders = await Order.find({ status: "paid" })
  .sort({ createdAt: -1 })
  .limit(20)
  .populate("user", "email name")
  .lean();

for (const o of await Order.find().limit(20)) {
  const user = await User.findById(o.user);
}

const stats = await Order.aggregate([
  { $match: { status: "paid" } },
  { $lookup: { from: "users", localField: "user", foreignField: "_id", as: "user" } },
  { $unwind: "$user" },
  { $group: { _id: "$user.email", orders: { $sum: 1 } } },
]);`,
          try: R`شغّل Mongo في Docker (تاب «MongoDB»)، واعمل ١٠ يوزرز و ١٠٠ أوردر، و [[mongoose.set("debug", true)]] شغال. شغّل الـ find بالـ populate وعدّ الأوامر اللي اتطبعت، وبعدين الـ loop اللي فيه findById. وجرّب populate على حقل مش عليه [[ref]].`,
          sol: R`الـ find بالـ populate هيطبع أمرين: [[orders.find({ status: 'paid' }, ...)]] و [[users.find({ _id: { '$in': [ ... ] } }, { projection: { email: 1, name: 1 } })]]. مهما كان عدد الأوردرات، ٢ بس. والـ user في النتيجة بقى object فيه email و name (والـ _id).

الـ loop هيطبع أمر واحد للأوردرات وبعده ٢٠ مرة [[users.findOne({ _id: ... })]]، يعني ٢١. ده N+1 بالظبط زي درس N+1 في Prisma.

والـ populate على حقل من غير ref: هيطلع [[MissingSchemaError]] أو الحقل هيفضل ObjectId زي ما هو، حسب الحالة. لازم الـ schema يقول الحقل بيشاور على أنهي model، أو تكتب [[populate({ path: "user", model: "User" })]].

(ملاحظة: الأمثلة دي متجرّبتش على MongoDB حقيقي وقت كتابة الدرس. الأسماء بالظبط في سطور الـ debug ممكن تختلف شوية بين نسخ Mongoose، المهم عدد الأوامر.)`,
          solCode: R`mongoose.set("debug", true);

console.log("--- populate");
await Order.find({ status: "paid" }).limit(20).populate("user", "email name").lean();

console.log("--- loop (N+1)");
for (const o of await Order.find().limit(20)) {
  await User.findById(o.user);
}`,
          flag: "script",
          deep: {
            why: "مشاريع Node كتير (خصوصًا القديمة ولوحات الإدارة) على Mongo و Mongoose، ونفس أسئلة الأداء بتتسأل: «ليه الصفحة دي بطيئة؟». لو فاهم إن populate استعلام تاني مش JOIN، هتعرف تصمم الداتا صح وتلاقي الـ N+1.",
            how: R`[[populate]] بيجمع كل قيم الحقل من النتيجة، ويعمل find واحد بـ [[$in]]، ويبدّل الـ ids بالمستندات. التاني argument ([["email name"]]) projection: الحقول اللي عايزها بس، زي select في Prisma. و [[populate({ path: "items.product" })]] للحقول جوه arrays، والـ populate المتداخل بيزوّد استعلام لكل مستوى.

[[lean()]] بيرجّع objects عادية من غير دوال Mongoose، أسرع وأخف لو هتقرا بس.

[[$lookup]] في aggregation هو اللي أقرب لـ JOIN: بيتعمل جوه القاعدة في رحلة واحدة. مفيد للتقارير اللي فيها group و sum على داتا مرتبطة.

في Mongo التصميم بيبدأ من سؤال: الداتا دي بتتقري مع بعض؟ البنود جوه الأوردر (embedded) لأنها دايمًا بتتقري معاه ومبتتعدّلش لوحدها. واليوزر reference لأنه مستقل وليه أوردرات كتير. ومن غير كده بتلاقي نفسك بتعمل populate في كل حتة، وده علامة إن الداتا relational وكان Postgres أنسب.

و index على الحقل اللي بتدوّر بيه ([[index: true]] على user) زي index على FK في SQL.`,
            when: "populate لما محتاج بيانات مستند مرتبط في الرد (اسم اليوزر مع الأوردر). $lookup للتقارير. والـ embedding لداتا بتتقري دايمًا مع الأب ومش بتكبر من غير حد.",
            mistakes: R`findById أو populate جوه loop. populate من غير projection فتجيب اليوزر كامل ومعاه الـ hash. populate متداخل ٣ مستويات على كل request. embedding لحاجة بتكبر من غير حد (كل تعليقات البوست جوه البوست، والمستند ليه حد أقصى ١٦ ميجا). وتنسى index على حقل الـ ref.`
          },
          lines: [
            "schema الأوردر:",
            "reference ليوزر (ObjectId و ref)، وعليه index.",
            "البنود embedded جوه الأوردر.",
            "الحالة بقيم محددة.",
            "و createdAt و updatedAt لوحدهم.",
            "الـ model.",
            "اطبع كل أمر Mongoose بيبعته.",
            "الأوردرات المدفوعة:",
            "الأحدث الأول،",
            "٢٠،",
            "وهات اليوزر بتاع كل واحد (email و name بس) باستعلام تاني واحد بـ $in،",
            "كـ objects عادية.",
            "غلط: لكل أوردر،",
            "استعلام لليوزر بتاعه (N+1).",
            "قفلة.",
            "تقرير بـ aggregation:",
            "المدفوع،",
            "JOIN جوه القاعدة على users،",
            "فكّ الـ array لـ object،",
            "وعدد الأوردرات لكل إيميل.",
            "قفلة."
          ]
        },
        {
          cmd: "Drizzle",
          title: "schema بـ TypeScript و drizzle-kit، و Prisma ولا Drizzle",
          desc: R`Drizzle ORM بديل لـ Prisma، وأقرب لـ SQL: الـ schema ملف TypeScript عادي ([[pgTable]])، والاستعلامات شبه SQL بالظبط ([[db.select().from(users).where(eq(users.email, x))]])، ومفيش generate: الـ types بتطلع من الـ schema على طول.

[[drizzle-kit generate]] بيقارن الـ schema بآخر migration ويكتب ملف SQL جديد، و [[drizzle-kit migrate]] بيطبّقه. زي migrate dev و deploy في Prisma بس خطوتين منفصلين.

Prisma ولا Drizzle؟ Prisma: API عالي المستوى (include و nested writes)، وأسهل للمبتدئ، وليه أدوات (Studio و migrate). Drizzle: لو بتفكر بـ SQL وعايز تتحكم في الاستعلام بالظبط، وأخف (مفيش خطوة generate)، ومناسب للـ serverless والـ edge. معرفة Prisma و SQL بتنقل لـ Drizzle بسرعة.`,
          example: R`// src/schema.ts
import { pgTable, uuid, text, bigint, numeric, timestamp, index } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  email: text().notNull().unique(),
  name: text().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const orders = pgTable("orders", {
  id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "restrict" }),
  status: text().notNull().default("pending"),
  total: numeric({ precision: 10, scale: 2 }).notNull().default("0"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
}, (t) => [index("orders_user_created_idx").on(t.userId, t.createdAt.desc())]);

// src/report.ts
const db = drizzle(process.env.DATABASE_URL!);
const top = await db
  .select({ email: users.email, spent: sql<string>$__btsum($__{orders.total})$__bt })
  .from(users)
  .innerJoin(orders, eq(orders.userId, users.id))
  .where(and(eq(orders.status, "paid"), gte(orders.createdAt, sql$__btnow() - interval '90 days'$__bt)))
  .groupBy(users.id)
  .orderBy(desc(sql$__btsum($__{orders.total})$__bt))
  .limit(3);`,
          try: R`اعمل مشروع فيه [[drizzle-orm]] و [[pg]] و [[drizzle-kit]]، وملف [[drizzle.config.ts]] فيه [[dialect: "postgresql"]] ومكان الـ schema و [[out: "./drizzle"]] ورابط القاعدة. شغّل [[npx drizzle-kit generate --name init]] واقرا الـ SQL، وبعدين [[npx drizzle-kit migrate]]. واطبع [[db.select().from(users).where(eq(users.email, "x")).toSQL()]].`,
          sol: R`[[generate]] هيكتب [[drizzle/0000_init.sql]] وفيه [[CREATE TABLE "orders"]] بـ [[GENERATED ALWAYS AS IDENTITY]]، و [[CREATE TABLE "users"]] بـ [[DEFAULT gen_random_uuid()]] و [[CONSTRAINT "users_email_unique" UNIQUE("email")]]، والـ FK بـ [[ON DELETE restrict]]، و [[CREATE INDEX "orders_user_created_idx" ON "orders" USING btree ("user_id","created_at" DESC NULLS LAST)]]. وبين الأوامر [[--> statement-breakpoint]]، ده فاصل Drizzle بيستخدمه وهو بيطبّق. و [[migrate]] هيطبع [[migrations applied successfully!]].

و [[toSQL()]] هيطبع [[{ sql: 'select "id", "email", "name", "created_at" from "users" where "users"."email" = $1', params: [ 'x' ] }]]. شايف: نفس الـ SQL اللي كنت هتكتبه، والقيمة parameter.

ولاحظ إن [[numeric]] بيرجع string في Drizzle (زي pg)، مش Decimal زي Prisma. فالفلوس بتفضل string لحد ما تقرر تعمل بيها إيه.

لو generate قال مفيش تغييرات، اتأكد إن مسار [[schema]] في الـ config صح. ولو migrate فشل في الاتصال، الـ config مش بيقرا .env لوحده، فمحتاج [[import "dotenv/config"]] زي Prisma.`,
          solCode: R`// drizzle.config.ts
import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/schema.ts",
  out: "./drizzle",
  dbCredentials: { url: process.env.DATABASE_URL! },
});

// في الترمنال:
// npx drizzle-kit generate --name init
// npx drizzle-kit migrate

// src/check.ts
import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";
import { users } from "./schema";

const db = drizzle(process.env.DATABASE_URL!);
console.log(db.select().from(users).where(eq(users.email, "x")).toSQL());`,
          flag: "script",
          deep: {
            why: "Drizzle انتشر جدًا في مشاريع Next.js والـ serverless، وهتقابله في مشاريع وفي انترفيوهات. ومقارنته بـ Prisma بتوضحلك الـ trade-offs في أي ORM: API مريح ولا تحكم في الـ SQL، وأدوات جاهزة ولا خفة.",
            how: R`الـ schema هو TypeScript حقيقي، فالـ types بتطلع منه على طول: [[typeof users.$inferSelect]] نوع الصف. مفيش كود متولّد ولا خطوة generate للـ client.

الـ query builder بيتبني SQL واحد: الـ select والـ join والـ where بالظبط زي ما كتبتهم، وده بيخلي الأداء متوقع. و [[sql$__bt...$__bt]] template للأجزاء اللي مش موجودة في الـ API، وبرضه بيبعت القيم parameters (زي $queryRaw).

وفيه كمان relational queries API ([[db.query.users.findMany({ with: { orders: true } })]]) شبه include في Prisma، بس محتاج تعرّف الـ relations. والـ API ده بيتغير في Drizzle 1.0 (كان beta وقت كتابة الدرس)، فارجع للـ docs بتاعة النسخة اللي عندك.

[[drizzle-kit generate]] بيحفظ snapshot للـ schema جنب كل migration، وبيقارن بيه. لو فيه rename بيسألك (rename ولا drop و create). [[drizzle-kit push]] بيطبّق الـ schema على القاعدة مباشرة من غير ملفات migrations، مفيد للتجربة بس مش للإنتاج. و [[drizzle-kit studio]] واجهة زي Prisma Studio.

الـ numeric بيرجع string، و [[bigint({ mode: "number" })]] بيرجّعه number (خد بالك من الأرقام الأكبر من 2^53)، و [[mode: "bigint"]] بيرجّعه BigInt.`,
            when: "Drizzle: فريق مرتاح مع SQL، وتطبيقات serverless أو edge، ولما عايز الاستعلام متوقع ومفيش خطوة build. Prisma: فريق فيه ناس جديدة على SQL، و CRUD كتير بعلاقات متداخلة، ولما Studio و nested writes هيوفروا وقت. والاتنين فيهم مخرج لـ SQL خام.",
            mistakes: R`[[drizzle-kit push]] على الإنتاج. تعدّل ملف migration اتطبق. تنسى [[import "dotenv/config"]] في الـ config. [[mode: "number"]] على IDs ممكن تعدّي 2^53. وتفتكر إن Drizzle بيمنع N+1 لوحده؛ الـ loop بـ await هو هو في أي ORM.`
          },
          lines: [
            "الدوال اللي بتعرّف أعمدة Postgres.",
            "جدول users:",
            "uuid بيتولّد من القاعدة (gen_random_uuid).",
            "نص إجباري و unique.",
            "نص إجباري.",
            "timestamptz بعمود اسمه created_at في القاعدة.",
            "قفلة.",
            "جدول orders:",
            "bigint identity، وبيرجع JavaScript number.",
            "FK على users، ومسح يوزر عنده أوردرات مرفوض.",
            "نص وافتراضيًا pending.",
            "numeric(10,2) (بيرجع string).",
            "timestamptz.",
            "index مركّب (user_id, created_at DESC) في آخر argument.",
            "الـ client برابط القاعدة (بيستخدم pg من تحت).",
            "أكتر ٣ عملاء صرفوا في آخر ٩٠ يوم:",
            "الإيميل ومجموع الصرف (sql template للـ sum)،",
            "من users،",
            "JOIN مع orders،",
            "المدفوع في آخر ٩٠ يوم،",
            "مجمّع باليوزر،",
            "الأكتر الأول،",
            "٣ بس."
          ]
        },
        {
          cmd: "seed بـ faker",
          title: "املا القاعدة بآلاف الصفوف شبه الحقيقية، بالعربي",
          desc: R`دروس كتير بتقولك «جرّب على مليون صف» أو «قيس قبل وبعد الـ index». عشان كده محتاج seed: سكربت بيملا القاعدة بداتا شكلها حقيقي، بكميات كبيرة، وتقدر تعيده في أي وقت.

[[@faker-js/faker]] بيولّد أسماء وإيميلات وأسعار وتواريخ، وفيه locale عربي: [[fakerAR]] بيطلّع أسماء زي «نوف بن عبد السلام». و [[faker.seed(42)]] بيخلي نفس الداتا تطلع كل مرة، فالتجارب تبقى قابلة للتكرار.

والأهم في السرعة: متعملش INSERT لكل صف. ابعت الصفوف دفعات ([[createMany]] في Prisma، أو [[insert().values([...])]] في Drizzle، ألف صف في المرة). ولو محتاج ملايين: [[generate_series]] في SQL أو [[\copy]] من ملف أسرع من أي ORM.`,
          example: R`import { fakerAR as faker } from "@faker-js/faker";

faker.seed(42);

const fakeUsers = Array.from({ length: 1000 }, (_, i) => ({
  email: $__btuser$__{i}@example.com$__bt,
  name: faker.person.fullName(),
  createdAt: faker.date.past({ years: 1 }),
}));
const inserted = await db.insert(users).values(fakeUsers).returning({ id: users.id });

const fakeOrders = inserted.flatMap(({ id }) =>
  Array.from({ length: faker.number.int({ min: 0, max: 5 }) }, () => ({
    userId: id,
    status: faker.helpers.weightedArrayElement([
      { value: "paid", weight: 7 }, { value: "pending", weight: 2 }, { value: "cancelled", weight: 1 },
    ]),
    total: faker.commerce.price({ min: 50, max: 3000 }),
    createdAt: faker.date.recent({ days: 180 }),
  })),
);
for (let i = 0; i < fakeOrders.length; i += 1000) {
  await db.insert(orders).values(fakeOrders.slice(i, i + 1000));
}`,
          try: R`شغّل السكربت ده (مع schema الـ Drizzle من الدرس اللي فات، أو حوّله لـ [[prisma.user.createMany]])، واطبع أول ٣ أسماء وعدد الأوردرات. شغّله مرتين بعد ما تفضّي الجداول: الأسماء اتغيرت؟ وبعدين شيل [[faker.seed(42)]] وشغّل تاني. وقيس الوقت لو خليت الـ loop يعمل insert لكل أوردر لوحده.`,
          sol: R`مع [[faker.seed(42)]] هتطلع نفس الأسماء ونفس عدد الأوردرات في كل مرة (عندي كانت [[نوف بن عبد السلام]] و [[دكتور فاطمه بوهاها]] و [[بتول النفير]]، وحوالي ٢٤٠٠ أوردر، والأرقام عندك ممكن تختلف لو نسخة faker مختلفة). من غير seed كل تشغيلة بداتا مختلفة. ده مفيد للتجربة، بس وحش في test بيعتمد على رقم معين.

والإيميلات من [[user$__{i}]] مش من faker عشان عمود الإيميل unique، و faker ممكن يكرر مع آلاف الصفوف. و [[fakerAR]] أصلًا بيطلّع إيميلات بحروف عربي أحيانًا أو مش مفهومة، فالـ index أضمن.

الـ insert لكل صف لوحده هياخد وقت أكتر بمراحل: كل صف round trip. ألف صف في كل insert بيقسم الوقت على ألف تقريبًا. ومتكبّرش الدفعة أوي: Postgres ليه حد ٦٥٥٣٥ parameter في الأمر الواحد، فلو كل صف ٥ أعمدة يبقى أقصى حاجة حوالي ١٣ ألف صف في الدفعة.`,
          solCode: R`import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { fakerAR as faker } from "@faker-js/faker";
import { users, orders } from "./schema";

const db = drizzle(process.env.DATABASE_URL!);
await db.delete(orders);
await db.delete(users);
faker.seed(42);

const fakeUsers = Array.from({ length: 1000 }, (_, i) => ({
  email: $__btuser$__{i}@example.com$__bt,
  name: faker.person.fullName(),
  createdAt: faker.date.past({ years: 1 }),
}));
console.time("seed");
const inserted = await db.insert(users).values(fakeUsers).returning({ id: users.id });
const fakeOrders = inserted.flatMap(({ id }) =>
  Array.from({ length: faker.number.int({ min: 0, max: 5 }) }, () => ({
    userId: id,
    status: "paid",
    total: faker.commerce.price({ min: 50, max: 3000 }),
    createdAt: faker.date.recent({ days: 180 }),
  })),
);
for (let i = 0; i < fakeOrders.length; i += 1000) {
  await db.insert(orders).values(fakeOrders.slice(i, i + 1000));
}
console.timeEnd("seed");
console.log(fakeUsers.slice(0, 3).map((u) => u.name), fakeOrders.length);
process.exit(0);`,
          flag: "script",
          deep: {
            why: "مشاكل الأداء (N+1، و index ناقص، و OFFSET) مش بتبان على ١٠ صفوف. والواجهة بتبان مختلفة خالص مع أسماء عربي طويلة ونصوص حقيقية. والـ seed بيخلّي أي حد في الفريق يقوم بقاعدة فيها داتا في دقيقة، بدل ما كل واحد يضيف بإيده.",
            how: R`faker مولّد عشوائي بـ seed: نفس الـ seed ونفس ترتيب المناداة يطلّعوا نفس القيم. لو غيّرت ترتيب الأسطر، القيم هتتغير.

[[fakerAR]] instance جاهز بالـ locale العربي (أسماء وعناوين)، والحاجات اللي مش موجودة بالعربي بترجع للإنجليزي. و [[faker.helpers.weightedArrayElement]] بيختار بنسب (٧٠٪ مدفوع)، فالتوزيع يبقى شبه الحقيقة مش متساوي.

الداتا الواقعية مش بس أسماء: التوزيع مهم. أغلب اليوزرز عندهم أوردرات قليلة وشوية عندهم كتير، والتواريخ متوزعة على شهور. ده اللي بيطلّع مشاكل الـ indexes وخطط الاستعلام الحقيقية.

السرعة: batch insert بيبعت صفوف كتير في أمر واحد. [[createMany]] في Prisma بيعمل كده، و [[skipDuplicates: true]] بيتجاهل التكرار. ولملايين الصفوف، [[INSERT ... SELECT ... FROM generate_series(1, 1000000)]] جوه القاعدة (درس B-tree index) أسرع بكتير، لأن الداتا مش بتعدّي على الشبكة أصلًا.

وفي Prisma: [[migrations.seed]] في [[prisma.config.ts]] (زي [[seed: "tsx prisma/seed.ts"]]) و [[npx prisma db seed]] بيشغّله. ومن Prisma 7 مبيشتغلش لوحده بعد migrate dev أو reset، لازم تشغّله انت.`,
            when: "أول ما تعمل الـ schema: seed صغير للتطوير. قبل ما تقيس أداء: seed كبير. في الـ tests: داتا محددة بـ seed ثابت. وعمره ما يشتغل على الإنتاج.",
            mistakes: R`insert لكل صف في loop. faker للإيميلات في عمود unique فيقع بعد آلاف الصفوف. من غير seed ثابت فالـ test يعدّي مرة ويفشل مرة. سكربت seed بيمسح الجداول وبيقرا DATABASE_URL فحد يشغّله بالغلط على الإنتاج (حط check إن الرابط localhost). ودفعة أكبر من حد الـ parameters.`
          },
          lines: [
            "faker بالـ locale العربي.",
            "ثبّت الـ seed: نفس الداتا كل مرة.",
            "١٠٠٠ يوزر:",
            "إيميل فريد من الرقم (مش من faker عشان الـ unique)،",
            "اسم عربي،",
            "وتاريخ تسجيل في آخر سنة.",
            "قفلة.",
            "insert واحد بكل اليوزرز، ورجّع الـ ids.",
            "لكل يوزر من ٠ لـ ٥ أوردرات:",
            "عدد عشوائي.",
            "صاحب الأوردر،",
            "حالة بنسب:",
            "٧٠٪ مدفوع، و٢٠٪ pending، و١٠٪ ملغي.",
            "قفلة.",
            "سعر بين ٥٠ و ٣٠٠٠ (بيرجع string مناسب لـ numeric)،",
            "وتاريخ في آخر ٦ شهور.",
            "قفلة.",
            "قفلة الـ flatMap: array واحد فيه كل الأوردرات.",
            "دفعات ألف ألف:",
            "insert واحد لكل ألف أوردر.",
            "قفلة."
          ]
        }
      ]
    },
    {
      t: "أسئلة انترفيو قواعد البيانات",
      l: 3,
      n: "الأسئلة اللي بتتسأل في أي انترفيو backend، والإجابة بمثال من المتجر بدل التعريف المحفوظ",
      items: [
        {
          cmd: "SQL ولا NoSQL",
          title: "امتى Postgres وامتى MongoDB، وإزاي تجاوب من غير «حسب الحالة» وبس",
          desc: R`السؤال مش «أنهي أحسن». السؤال «شكل الداتا إيه، وهتتقري إزاي، وإيه اللي لازم يفضل مظبوط؟».

SQL (Postgres و MySQL): جداول بـ schema صارم، وعلاقات بـ FKs و JOINs، و transactions و constraints بتحمي الداتا. مناسب لأي حاجة فيها فلوس، أو علاقات كتير، أو تقارير بتجمّع من كذا جدول.

NoSQL (MongoDB، و Redis، و DynamoDB): أنواع مختلفة، مش حاجة واحدة. Mongo مستندات مرنة بتتقري كوحدة واحدة. Redis key-value في الذاكرة للـ cache والـ sessions. DynamoDB و Cassandra لحجم ضخم بأنماط قراية معروفة مسبقًا.

الإجابة القوية: الافتراضي Postgres (وفيه jsonb للأجزاء المرنة)، ونختار حاجة تانية لما يبقى فيه سبب محدد تقدر تقوله.`,
          example: R`SELECT name, price, attrs FROM products WHERE is_active;
SELECT name FROM products WHERE attrs @> '{"color": "black"}';
SELECT u.email, sum(o.total) FROM users u JOIN orders o ON o.user_id = u.id GROUP BY u.email;`,
          try: R`لكل حالة من دول قول هتختار إيه وليه في جملتين: (١) محفظة فلوس للمدرسين فيها سحب وإيداع. (٢) لوج أحداث من تطبيق موبايل، ملايين في اليوم وكل حدث شكله مختلف. (٣) cache لنتيجة API بتتطلب كتير. (٤) كتالوج منتجات كل فئة ليها مواصفات مختلفة.`,
          sol: R`(١) Postgres: فلوس يعني transactions و constraints ([[CHECK (balance >= 0)]]) و [[SELECT FOR UPDATE]] أو atomic UPDATE. ولو قلت Mongo لازم تبرر الـ transactions (محتاجة replica set) وإن الـ schema مش هيحمي الرصيد.

(٢) ممكن الاتنين: Postgres بجدول فيه عمود jsonb و partitioning بالتاريخ بيستحمل كويس، و Mongo أو ClickHouse لو الحجم ضخم والتحليل هو الأساس. الإجابة الأقوى تسأل: هنعمل إيه بيها؟ تقارير تجميع؟ يبقى محتاجين حاجة معمولة للتحليل.

(٣) Redis، بـ TTL. مش قاعدة أساسية: لو ضاع، بيتحسب تاني.

(٤) Postgres بجدول products بأعمدة ثابتة (الاسم والسعر والمخزون) و [[attrs jsonb]] للمواصفات، و GIN index عليه (درس jsonb). ده بيدّيك مرونة Mongo في جزء واحد بس، والباقي محمي.

الغلطة في الانترفيو: «NoSQL أسرع و scalable أكتر». ده مش صحيح بشكل عام. السرعة بتيجي من الـ indexes وشكل الاستعلام.`,
          flag: "script",
          deep: {
            why: "السؤال ده في أغلب انترفيوهات الـ backend، وبيكشف لو انت بتختار أدوات بالموضة ولا بالمتطلبات. والإجابة الكويسة بتبين إنك عارف trade-offs حقيقية.",
            how: R`الفروق اللي تتقال: الـ schema (صارم ولا مرن، مع إن Mongoose بيرجّع schema في التطبيق). والعلاقات (JOIN في القاعدة ولا embedding و populate). والـ consistency (ACID من زمان في SQL، و Mongo بقت فيها transactions بس مكلفة ومش الأسلوب الأساسي). والـ scaling (Postgres بيكبر رأسيًا وبـ read replicas كويس جدًا لأغلب الشركات، و Mongo معمولة للـ sharding من الأول).

وفي الحقيقة الاتنين قربوا من بعض: Postgres فيه jsonb، و Mongo فيها transactions و $lookup.`,
            when: "أول قرار في أي مشروع، وفي أي سؤال system design.",
            mistakes: R`«Mongo عشان مفيش schema» (فيه schema، بس في الكود ومحدش بيحميه). «SQL مش بيعمل scale». تختار حاجتين من الأول من غير سبب. وتنسى إن الفريق بيعرف إيه جزء من القرار.`
          },
          lines: [
            "جدول products من أول التاب: أعمدة ثابتة للحاجات المهمة، و attrs jsonb للمواصفات المرنة.",
            "بحث جوه الـ jsonb (زي Mongo)، ومعاه GIN index يبقى سريع.",
            "و JOIN و GROUP BY في استعلام واحد، ودي الحاجة اللي Mongo بتصعّبها."
          ],
          solCode: R`CREATE TABLE teacher_wallets (
  teacher_id bigint PRIMARY KEY,
  balance_cents bigint NOT NULL DEFAULT 0 CHECK (balance_cents >= 0)
);
UPDATE teacher_wallets SET balance_cents = balance_cents - 5000
WHERE teacher_id = 1 AND balance_cents >= 5000;`
        },
        {
          cmd: "ACID",
          title: "ACID بمثال: تحويل فلوس من محفظة لمحفظة",
          desc: R`ACID أربع ضمانات للـ transaction:

Atomicity: كله أو ولا حاجة. الخصم من محفظة والإضافة للتانية يا حصلوا الاتنين يا ولا واحد.

Consistency: الداتا بتنتقل من حالة صحيحة لحالة صحيحة. الـ constraints (زي [[CHECK (balance >= 0)]]) عمرها ما تتكسر حتى في النص.

Isolation: transactions شغالة في نفس الوقت متشوفش تعديلات بعض الناقصة. وقد إيه بالظبط بيتحدد بالـ isolation level (الدرس الجاي).

Durability: بعد COMMIT الداتا مش هتضيع حتى لو الكهربا قطعت. Postgres بيكتبها في الـ WAL على الديسك قبل ما يقولك تم.`,
          example: R`CREATE TABLE wallets (id bigint PRIMARY KEY, balance numeric(10,2) NOT NULL CHECK (balance >= 0));
INSERT INTO wallets VALUES (1, 100), (2, 0);
BEGIN;
UPDATE wallets SET balance = balance - 150 WHERE id = 1;
UPDATE wallets SET balance = balance + 150 WHERE id = 2;
COMMIT;
SELECT * FROM wallets ORDER BY id;`,
          try: R`شغّل المثال: أول UPDATE هيفشل. بعد الـ error جرّب تكمّل التاني وتعمل COMMIT. إيه اللي حصل للمحفظتين؟ وبعدين كرر بمبلغ ٥٠ وشوف.`,
          sol: R`بـ ١٥٠: أول UPDATE هيفشل بـ [[violates check constraint "wallets_balance_check"]]. بعدها أي أمر في نفس الـ transaction هيطلع [[current transaction is aborted, commands ignored until end of transaction block]]، و COMMIT هيتحول ROLLBACK (psql هيكتب [[ROLLBACK]]). المحفظتين هيفضلوا ١٠٠ و ٠. ده الـ Atomicity والـ Consistency مع بعض: مفيش ١٥٠ اتضافوا لحد من غير ما يتخصموا من حد.

بـ ٥٠: الاتنين هيتنفذوا و COMMIT: ٥٠ و ٥٠.

في الانترفيو قول المثال ده بالظبط، وضيف إن الـ durability في Postgres جاية من الـ WAL (بيتكتب قبل الـ COMMIT يرجع)، و [[synchronous_commit = off]] بيتنازل عن جزء منها عشان السرعة.`,
          solCode: R`BEGIN;
UPDATE wallets SET balance = balance - 150 WHERE id = 1;
UPDATE wallets SET balance = balance + 150 WHERE id = 2;
COMMIT;
SELECT * FROM wallets ORDER BY id;

BEGIN;
UPDATE wallets SET balance = balance - 50 WHERE id = 1;
UPDATE wallets SET balance = balance + 50 WHERE id = 2;
COMMIT;
SELECT * FROM wallets ORDER BY id;`,
          flag: "script",
          deep: {
            why: "أكتر سؤال قواعد بيانات بيتسأل. والتعريف المحفوظ للأربع حروف مش كفاية؛ اللي بيفرق إنك تدّي مثال وتوضح كل حرف بيحمي من إيه.",
            how: R`Atomicity في Postgres جاية من MVCC: كل صف ليه نسخ، والتعديلات بتبقى مش ظاهرة لحد الـ COMMIT، والـ ROLLBACK بيسيبها ميتة (والـ VACUUM بينضفها). Consistency جاية من الـ constraints والـ FKs والـ triggers. Isolation من الـ snapshots والأقفال. Durability من الـ WAL و fsync.

وخلي بالك: الـ C في ACID غير الـ C في CAP theorem. هنا معناها «القواعد متتكسرش»، هناك معناها «كل النسخ شايفة نفس القيمة».`,
            when: "أي عملية بتعدّل أكتر من صف ولازم تبقى مع بعض: تحويل، وأوردر، وحجز. التفاصيل العملية في درس transaction ودرس $transaction في تاب «Backend بـ Node».",
            mistakes: R`تحفظ التعريفات من غير مثال. تخلط C بتاعة ACID مع CAP. تقول إن Mongo «مش ACID» (بقت فيها transactions متعددة المستندات، بشروط). وفي الكود: تعمل الخطوتين من غير transaction وتفتكر إن القاعدة هتحميك لوحدها.`
          },
          lines: [
            "محافظ، والرصيد مينفعش يبقى سالب.",
            "محفظة فيها ١٠٠ ومحفظة فاضية.",
            "ابدأ transaction.",
            "اخصم ١٥٠: هيفشل (الرصيد هيبقى سالب).",
            "أضيف للتانية: متجاهل، الـ transaction بقت aborted.",
            "COMMIT هنا بيبقى ROLLBACK.",
            "المحفظتين زي ما كانوا."
          ]
        },
        {
          cmd: "isolation anomalies",
          title: "dirty read و lost update و phantom و write skew: كل واحدة بمثال",
          desc: R`لما two transactions شغالين في نفس الوقت، ممكن يحصل مشاكل (anomalies)، والـ isolation level بيحدد أنهي منها ممكن:

dirty read: تقرا تعديل لسه متعملوش COMMIT. مستحيل في Postgres خالص.

non-repeatable read: تقرا نفس الصف مرتين في transaction واحدة فتلاقي قيمتين، لأن حد عمل COMMIT في النص. بيحصل في [[READ COMMITTED]] (الافتراضي)، ومش بيحصل في [[REPEATABLE READ]].

phantom: نفس الـ WHERE يرجّع صفوف زيادة في المرة التانية. في Postgres الـ REPEATABLE READ بيمنعه.

lost update: الاتنين قروا المخزون ١٠، والاتنين كتبوا ٩، فبيعتين بقوا واحدة. بيحصل في READ COMMITTED لو قريت في الكود وكتبت. REPEATABLE READ بيرفض التاني بـ error.

write skew: كل واحد قرا حاجة وكتب في صف مختلف، فالقاعدة (زي «لازم دكتور واحد مناوب على الأقل») اتكسرت. [[SERIALIZABLE]] بس اللي بيمنعه.`,
          example: R`// session A و B في نفس الوقت، READ COMMITTED
await a.query("BEGIN"); await b.query("BEGIN");
const sa = (await a.query("SELECT stock FROM products WHERE name = 'Hoodie'")).rows[0].stock;
const sb = (await b.query("SELECT stock FROM products WHERE name = 'Hoodie'")).rows[0].stock;
await a.query("UPDATE products SET stock = $1 WHERE name = 'Hoodie'", [sa - 1]);
const pending = b.query("UPDATE products SET stock = $1 WHERE name = 'Hoodie'", [sb - 1]);
await a.query("COMMIT");
await pending;
await b.query("COMMIT");`,
          try: R`شغّل السيناريو بمكتبة pg وعميلين ([[new pg.Client]] مرتين)، والمخزون ١٠. المخزون النهائي كام؟ وبعدين غيّر BEGIN في الاتنين لـ [[BEGIN ISOLATION LEVEL REPEATABLE READ]] وشوف B حصله إيه.`,
          sol: R`في READ COMMITTED: المخزون النهائي [[9]] مع إن قطعتين اتباعوا. ده lost update. الـ UPDATE بتاع B استنى A يخلص (قفل على الصف)، وبعدين كتب 9 اللي كان حسبها من قراية قديمة.

في REPEATABLE READ: الـ UPDATE بتاع B هيفشل بـ [[could not serialize access due to concurrent update]] (code [[40001]])، والمخزون 9 بعد بيعة واحدة بس. التطبيق لازم يعمل retry للـ transaction كلها.

والحل الأبسط من غير تغيير الـ level: متقراش في الكود وتكتب. [[UPDATE products SET stock = stock - 1 WHERE ... AND stock >= 1]] (درس atomic UPDATE)، أو [[SELECT ... FOR UPDATE]].`,
          solCode: R`import pg from "pg";
const url = process.env.DATABASE_URL;
const a = new pg.Client(url), b = new pg.Client(url);
await a.connect(); await b.connect();

for (const level of ["READ COMMITTED", "REPEATABLE READ"]) {
  await a.query("UPDATE products SET stock = 10 WHERE name = 'Hoodie'");
  await a.query($__btBEGIN ISOLATION LEVEL $__{level}$__bt); await b.query($__btBEGIN ISOLATION LEVEL $__{level}$__bt);
  const sa = (await a.query("SELECT stock FROM products WHERE name = 'Hoodie'")).rows[0].stock;
  const sb = (await b.query("SELECT stock FROM products WHERE name = 'Hoodie'")).rows[0].stock;
  await a.query("UPDATE products SET stock = $1 WHERE name = 'Hoodie'", [sa - 1]);
  const pending = b.query("UPDATE products SET stock = $1 WHERE name = 'Hoodie'", [sb - 1])
    .then(() => "ok", (e) => "ERR " + e.code);
  await a.query("COMMIT");
  const res = await pending;
  await b.query(res === "ok" ? "COMMIT" : "ROLLBACK");
  const { rows } = await a.query("SELECT stock FROM products WHERE name = 'Hoodie'");
  console.log(level, res, rows[0].stock);
}
await a.end(); await b.end();`,
          flag: "script",
          deep: {
            why: "السؤال «إيه الـ isolation levels؟» بيتسأل كتير، والإجابة اللي بتفرق هي إنك تربط كل level بالمشكلة اللي بيمنعها، بمثال حقيقي زي المخزون، وتقول الحل العملي.",
            how: R`Postgres بيطبّق الـ levels بـ snapshots (MVCC): READ COMMITTED بياخد snapshot جديد لكل أمر، و REPEATABLE READ snapshot واحد للـ transaction كلها، و SERIALIZABLE نفس الـ snapshot ومعاه تتبع للاعتماديات (SSI) ويلغي transaction لو النتيجة مش ممكن تطلع من تنفيذ ورا بعض.

الأعلى = مشاكل أقل بس errors أكتر ([[40001]]) لازم الكود يعيد عليها. التفاصيل في درس isolation levels في المستوى التاني.

optimistic ولا pessimistic locking؟ pessimistic: اقفل الأول ([[FOR UPDATE]]) لما التضارب متوقع كتير (آخر قطعة في flash sale). optimistic: عمود [[version]] و [[UPDATE ... SET version = version + 1 WHERE id = $1 AND version = $2]]، ولو 0 صفوف اتعدّلت يبقى حد سبقك، اعرض رسالة أو أعد المحاولة. مناسب لتعديلات الفورمز اللي التضارب فيها نادر.`,
            when: "أي read-modify-write: مخزون، ورصيد، وكوبونات، وحجز مواعيد.",
            mistakes: R`تقول إن READ COMMITTED بيمنع lost update. ترفع كل حاجة لـ SERIALIZABLE من غير retry. تفتكر إن الـ transaction لوحدها (BEGIN و COMMIT) بتمنع التضارب. وتنسى إن Postgres مفيهوش dirty read حتى لو طلبت READ UNCOMMITTED.`
          },
          lines: [
            "افتح transaction في الاتنين.",
            "A قرا المخزون (١٠).",
            "B قرا نفس المخزون (١٠).",
            "A كتب ٩.",
            "B بيحاول يكتب ٩: بيستنى قفل A.",
            "A عمل COMMIT.",
            "B كمّل وكتب ٩ فوق ٩ (في READ COMMITTED).",
            "B عمل COMMIT: بيعتين والمخزون نقص واحد."
          ]
        },
        {
          cmd: "index trade-offs",
          title: "ليه متعملش index على كل عمود",
          desc: R`الـ index بيسرّع القراية، بس ليه تمن:

كل INSERT و UPDATE و DELETE لازم يعدّل كل index على الجدول. جدول عليه ١٠ indexes الكتابة فيه أبطأ بكتير.

مساحة على الديسك وفي الذاكرة (الـ index اللي ميدخلش الـ RAM بيبقى أبطأ).

والـ planner ممكن ميستخدموش أصلًا: لو الشرط بيرجّع جزء كبير من الجدول ([[status = 'paid']] و ٩٠٪ مدفوع)، الـ Seq Scan أسرع.

القاعدة: index للأعمدة اللي في WHERE و JOIN و ORDER BY لاستعلامات بتتشغّل كتير، والـ FKs، وبعد كده قيس بـ EXPLAIN وامسح اللي مش مستخدم.`,
          example: R`SELECT relname, indexrelname, idx_scan, pg_size_pretty(pg_relation_size(indexrelid)) AS size
FROM pg_stat_user_indexes
ORDER BY idx_scan, pg_relation_size(indexrelid) DESC;
CREATE INDEX orders_pending_idx ON orders (created_at) WHERE status = 'pending';
CREATE INDEX CONCURRENTLY orders_user_idx ON orders (user_id);`,
          try: R`شغّل أول استعلام على قاعدة الـ lab بعد الدروس اللي فاتت: فيه indexes عندها [[idx_scan = 0]]؟ وبعدين اعمل ١٠٠ ألف INSERT في orders مرة بالـ indexes اللي عليها ومرة بعد ما تمسح الـ indexes الزيادة، وقارن الوقت بـ [[\timing]].`,
          sol: R`هتلاقي indexes [[idx_scan]] بتاعها صفر أو قليل جدًا، غالبًا اللي عملتها للتجربة (زي [[orders_created_at_idx]] لو مبقتش بتفلتر بيه). الـ primary keys والـ unique ممكن يبقوا صفر برضه بس دول متمسحهمش: وظيفتهم منع التكرار مش السرعة.

الـ INSERT هيبقى أسرع بعد ما تمسح الـ indexes الزيادة، والفرق بيكبر مع عدد الـ indexes وحجمها. لو الجدول مكانش عليه indexes زيادة أصلًا (أوامر DROP طلّعت NOTICE إن الـ index مش موجود)، الوقتين هيبقوا قريبين، وده منطقي. ده بالظبط السبب إن الـ bulk imports الكبيرة أحيانًا بتمسح الـ indexes وتعملها تاني بعد الـ import.

في الانترفيو: «الـ index بيسرّع القراية ويبطّأ الكتابة وياخد مساحة، وبعمله على اللي بقيس إنه محتاجه».`,
          solCode: R`\timing on
INSERT INTO orders (user_id, status, total)
SELECT (SELECT id FROM users LIMIT 1), 'paid', 100 FROM generate_series(1, 100000);
DROP INDEX IF EXISTS orders_created_at_idx;
DROP INDEX IF EXISTS orders_created_id_idx;
INSERT INTO orders (user_id, status, total)
SELECT (SELECT id FROM users LIMIT 1), 'paid', 100 FROM generate_series(1, 100000);`,
          flag: "script",
          deep: {
            why: "«ليه منعملش index على كل حاجة؟» سؤال كلاسيكي، والإجابة بتبين إنك فاهم الـ index بيتخزن ويتحدث إزاي، مش بس إنه «بيسرّع».",
            how: R`الـ B-tree شجرة مترتبة، وكل تعديل في الجدول بيضيف entry فيها أو يعدّلها، وأحيانًا يقسم صفحة. في Postgres كمان أي UPDATE بيعمل نسخة جديدة من الصف، فبيحتاج entry جديدة في كل index (إلا لو HOT update: العمود المتعدل مش في أي index والصفحة فيها مكان).

أنواع تقلل التكلفة: partial index ([[WHERE status = 'pending']]) أصغر بكتير ومفيد لو بتسأل عن جزء صغير. covering index ([[INCLUDE (total)]]) بيخلي القراية من الـ index بس (Index Only Scan). و [[CREATE INDEX CONCURRENTLY]] على الإنتاج عشان متقفلش الكتابة.

وترتيب الأعمدة في الـ composite index بيفرق (درس composite index)، و GIN للـ jsonb والبحث، و BRIN لجداول ضخمة مترتبة بالوقت.`,
            when: "بعد ما تشوف استعلام بطيء في EXPLAIN أو pg_stat_statements، مش قبل. والـ FKs من الأول.",
            mistakes: R`index على عمود boolean لوحده. index مكرر (عندك [[(user_id, created_at)]] وعامل [[(user_id)]] كمان، الأول بيغطي التاني). CREATE INDEX من غير CONCURRENTLY على جدول كبير في الإنتاج. وتمسح unique index لأن idx_scan صفر.`
          },
          lines: [
            "كل index: اسم الجدول والـ index، واتستخدم كام مرة، وحجمه،",
            "من إحصائيات Postgres،",
            "الأقل استخدامًا والأكبر الأول (مرشحين للمسح).",
            "partial index: على الأوردرات الـ pending بس، فصغير.",
            "على الإنتاج: اعمله من غير ما تقفل الكتابة."
          ]
        },
        {
          cmd: "replication و sharding",
          title: "القاعدة مبقتش مستحملة: read replicas ولا sharding",
          desc: R`replication: نسخ من القاعدة كلها على سيرفرات تانية. الـ primary بيستقبل الكتابة، والـ replicas بتاخد التغييرات منه (streaming من الـ WAL) وبتخدم القراية. بيحل: قراية كتير، و high availability (لو الـ primary وقع، replica تبقى primary).

sharding: تقسيم الداتا نفسها على كذا سيرفر، كل واحد عنده جزء (مثلًا حسب tenant_id). بيحل: كتابة أكتر من اللي سيرفر واحد يستحمله، أو داتا أكبر من سيرفر. وتمنه كبير: JOIN و transactions بين shards صعبة، وتغيير الـ shard key شبه مستحيل.

الترتيب الطبيعي: indexes واستعلامات أحسن، وبعدين سيرفر أكبر، وبعدين connection pooling و cache، وبعدين read replicas، و sharding في الآخر خالص.`,
          example: R`SELECT client_addr, state, sync_state, replay_lag FROM pg_stat_replication;
SELECT pg_is_in_recovery();
SELECT now() - pg_last_xact_replay_timestamp() AS replica_lag;`,
          try: R`يوزر عمل تعديل على بروفايله، وبعدين الصفحة اتعملها refresh وظهر الاسم القديم. التطبيق بيكتب على الـ primary ويقرا من replica. اشرح ليه، واقترح حلين.`,
          sol: R`ده replication lag: الـ replica بتستلم التغييرات asynchronous، فممكن تكون ورا الـ primary بملّي ثواني أو ثواني. القراية اللي جات بعد الكتابة على طول راحت replica لسه موصلهاش التعديل.

الحلول: (١) read-your-writes: القراية اللي بعد كتابة من نفس اليوزر (لفترة قصيرة، أو لنفس الـ session) تروح للـ primary. (٢) القراية المهمة (البروفايل، والرصيد، وحالة الدفع) دايمًا من الـ primary، والـ replicas للتقارير والقوايم والبحث. (٣) synchronous replication بتحل ده بس بتبطّأ كل كتابة.

وقول في الانترفيو إن [[pg_stat_replication]] على الـ primary و [[pg_last_xact_replay_timestamp()]] على الـ replica بيقيسوا الـ lag.`,
          solCode: R`-- على الـ replica: هي ورا بقد إيه؟
SELECT now() - pg_last_xact_replay_timestamp() AS replica_lag;

// في الكود: القراية بعد كتابة من الـ primary
const user = await primary.user.update({ where: { id }, data: { name } });
const profile = await primary.user.findUnique({ where: { id } });
const feed = await replica.post.findMany({ take: 20 });`,
          flag: "script",
          deep: {
            why: "أي سؤال system design بيوصل لـ «والقاعدة لما الترافيك يزيد؟». والإجابة الناضجة إنك متقفزش لـ sharding، وتعرف مشاكل كل حل (lag، و cross-shard queries).",
            how: R`الـ streaming replication في Postgres: الـ replica بتقرا الـ WAL من الـ primary وتطبّقه، فهي نسخة طبق الأصل وللقراية بس. الـ logical replication بتنقل تغييرات جداول معينة (مفيد للنقل بين نسخ أو لأنظمة تانية). Supabase و RDS و Neon بيدّوك read replicas بزرار.

الـ sharding في Postgres مش built-in: Citus extension، أو تقسيم في التطبيق (كل tenant في قاعدة). والـ partitioning (جدول واحد مقسوم بالتاريخ جوه نفس السيرفر) حاجة تانية خالص، بتسهّل مسح الداتا القديمة وبتسرّع استعلامات الفترات.`,
            when: "replicas لما القراية هي الضغط والـ primary CPU عالي. sharding لما الكتابة أو الحجم فعلًا أكبر من أكبر سيرفر معقول، وده نادر في أغلب الشركات.",
            mistakes: R`sharding من أول يوم. قراية من replica بعد الكتابة على طول. تفتكر إن الـ replica باك أب (مسح بالغلط بيتنسخ للـ replica في ثانية؛ الباك أب في تاب «PostgreSQL»). و shard key بيعمل hot spot (كل الترافيك على shard واحد).`
          },
          lines: [
            "على الـ primary: الـ replicas المتصلة وحالتها والتأخير.",
            "true يعني السيرفر ده replica.",
            "على الـ replica: آخر تعديل اتطبق من قد إيه."
          ]
        },
        {
          cmd: "الاستعلام بطيء",
          title: "الصفحة بطيئة وبيقولوا «القاعدة»: هتعمل إيه خطوة بخطوة",
          desc: R`الإجابة المرتبة أهم من أي أداة:

١. اتأكد إنها القاعدة: الـ query log أو APM بيوريك وقت كل استعلام. ممكن المشكلة N+1 (استعلامات سريعة كتير) مش استعلام بطيء.

٢. لاقي الاستعلام: [[pg_stat_statements]] مترتب بـ [[total_exec_time]] (الأكتر تكلفة إجمالًا، مش الأبطأ مرة واحدة).

٣. [[EXPLAIN (ANALYZE, BUFFERS)]]: دوّر على Seq Scan على جدول كبير، و [[Rows Removed by Filter]] كبير، و Sort على داتا كتير، وفرق كبير بين rows المتوقع والحقيقي.

٤. صلّح: index مناسب، أو اكتب الاستعلام تاني (keyset بدل OFFSET، و EXISTS، وأعمدة أقل)، أو [[ANALYZE]] لو الإحصائيات قديمة.

٥. قيس تاني، وراقب.`,
          example: R`SELECT query, calls, round(total_exec_time) AS total_ms, round(mean_exec_time, 1) AS mean_ms
FROM pg_stat_statements
ORDER BY total_exec_time DESC
LIMIT 10;
EXPLAIN (ANALYZE, BUFFERS)
SELECT id, total FROM orders
WHERE user_id = (SELECT id FROM users WHERE email = 'you@example.com')
ORDER BY created_at DESC LIMIT 20;
CREATE INDEX IF NOT EXISTS orders_user_created_idx ON orders (user_id, created_at DESC);`,
          try: R`على جدول orders بعد ما تضيف ٢٠٠ ألف صف (درس B-tree index) امسح أي index على user_id (عندك [[orders_user_created_idx]] من درس composite index)، وشغّل الـ EXPLAIN اللي في المثال واكتب أهم ٣ سطور فيه. وبعدين اعمل الـ index وشغّله تاني وقارن Execution Time والـ Buffers.`,
          sol: R`قبل الـ index هتلاقي [[Seq Scan on orders]] (أو Parallel Seq Scan) ومعاها [[Filter: (user_id = $0)]]، وفوقها [[Sort]] بـ [[Sort Key: orders.created_at DESC]]: قرا الجدول كله ورتّب عشان ٢٠ صف. و Buffers بالآلاف (عندي حوالي ١٩٠٠ صفحة لـ ٢٠٠ ألف صف)، و Execution Time عشرات الملّي ثواني حسب الجهاز وحسب عدد أوردرات اليوزر ده.

بعد الـ index: [[Index Scan using orders_user_created_idx on orders]] و [[Index Cond: (user_id = $0)]] ومفيش Sort (الـ index مترتب)، و Buffers بقت أرقام صغيرة (٦ تقريبًا)، والوقت أقل من ملّي ثانية. عندي كان ٢٩ ملّي ثانية قبل و ٠٫٠٦ بعد.

في الانترفيو اشرح الـ Buffers: عدد الصفحات (8KB) اللي اتقرت، ودي أثبت من الوقت اللي بيتأثر بالـ cache. ولو [[pg_stat_statements]] مش متفعّل: محتاج [[shared_preload_libraries]] و [[CREATE EXTENSION pg_stat_statements]] (درس الاستعلامات البطيئة في تاب «PostgreSQL»).`,
          solCode: R`DROP INDEX IF EXISTS orders_user_created_idx;
DROP INDEX IF EXISTS orders_user_id_idx;

EXPLAIN (ANALYZE, BUFFERS)
SELECT id, total FROM orders
WHERE user_id = (SELECT id FROM users WHERE email = 'you@example.com')
ORDER BY created_at DESC LIMIT 20;

CREATE INDEX orders_user_created_idx ON orders (user_id, created_at DESC);
ANALYZE orders;

EXPLAIN (ANALYZE, BUFFERS)
SELECT id, total FROM orders
WHERE user_id = (SELECT id FROM users WHERE email = 'you@example.com')
ORDER BY created_at DESC LIMIT 20;`,
          flag: "script",
          deep: {
            why: "«إزاي تتعامل مع استعلام بطيء؟» سؤال شبه أكيد، والانترفيور عايز يشوف طريقة تفكير: قياس الأول، وبعدين سبب، وبعدين تصليح، وبعدين قياس تاني. مش «هعمل index» على طول.",
            how: R`الـ EXPLAIN بيتقري من جوه لبرّه: أعمق node بتشتغل الأول. [[actual time]] بالملّي ثانية لكل loop، و [[loops]] عدد المرات (في Nested Loop اضرب). لو [[rows]] المتوقع بعيد جدًا عن الحقيقي، الإحصائيات قديمة أو الشرط معقد، و ANALYZE بيساعد.

أسباب شائعة غير الـ index: دالة على العمود في WHERE ([[lower(email)]]، أو date_trunc)، ونوع مختلف ([[WHERE id = '5']] على bigint ده تمام بس uuid مقارن بـ text لأ)، و OFFSET كبير، و [[SELECT *]] بيجيب jsonb تقيل، و [[LIKE '%x%']] من غير trigram، وأقفال (استعلام مستني lock مش بطيء، شوف [[pg_stat_activity]] و [[wait_event]]).

وبرّه الاستعلام: connection pool مليان (الطلبات مستنية اتصال)، و N+1، والـ network لسيرفر بعيد.`,
            when: "أي شكوى بطء، وكمان بشكل دوري: بص على أعلى ١٠ في pg_stat_statements كل فترة قبل ما حد يشتكي.",
            mistakes: R`تعمل index من غير EXPLAIN. تقيس مرة واحدة (أول مرة الـ cache بارد). EXPLAIN ANALYZE على UPDATE أو DELETE على الإنتاج: ده بينفّذ فعلًا (لفه في BEGIN و ROLLBACK). تبص على أبطأ استعلام مرة واحدة وتسيب استعلام ٥ ملّي ثانية بيتنادي مليون مرة. وتنسى إن الإجابة ممكن تكون cache أو تغيير في الـ API مش في SQL.`
          },
          lines: [
            "كل استعلام: نصه، واتنادى كام مرة، والوقت الإجمالي والمتوسط،",
            "من الإحصائيات (extension pg_stat_statements)،",
            "الأكتر تكلفة إجمالًا الأول،",
            "أول ١٠.",
            "اشرح الاستعلام ونفّذه فعلًا، ومعاه الصفحات اللي اتقرت:",
            "آخر ٢٠ أوردر،",
            "ليوزر معين،",
            "بالأحدث.",
            "الـ index اللي بيخدمه (الفلتر والترتيب)."
          ]
        }
      ]
    }
]);
