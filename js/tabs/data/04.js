// تكملة تاب data: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/data/01.js (شرح حقول الدرس في أوله)
MORE("data", [
    {
      t: "views و triggers و functions",
      l: 2,
      n: "استعلام متسمّي بتستخدمه كأنه جدول، وكود بيشتغل جوه القاعدة لوحده مع كل تعديل، ودوال بتناديها من SQL أو من Supabase",
      items: [
        {
          cmd: "VIEW و MATERIALIZED VIEW",
          title: "استعلام بتكرره كتير: خليه جدول وهمي أو نسخة محفوظة",
          desc: R`[[CREATE VIEW]] بيدّي اسم لاستعلام. بعد كده [[SELECT * FROM order_summaries]] كأنه جدول، بس مفيش داتا متخزنة: كل مرة Postgres بيشغّل الاستعلام الأصلي. فالنتيجة دايمًا محدّثة، والسرعة هي سرعة الاستعلام الأصلي.

[[CREATE MATERIALIZED VIEW]] بيشغّل الاستعلام مرة ويخزّن النتيجة على الديسك زي جدول. القراية منه سريعة جدًا، بس النتيجة بتفضل قديمة لحد ما تعمل [[REFRESH MATERIALIZED VIEW]]. و [[CONCURRENTLY]] بيحدّثه من غير ما يقفل القراية، بشرط يكون عليه unique index.

القاعدة: VIEW لتبسيط استعلام بيتكرر. MATERIALIZED لتقرير تقيل بيتقري كتير ومش لازم يبقى لحظي (لوحة أرقام بتتحدث كل ساعة).`,
          example: R`CREATE VIEW order_summaries AS
SELECT o.id, u.email, o.status, o.total, o.created_at,
       count(oi.product_id) AS lines
FROM orders o
JOIN users u ON u.id = o.user_id
LEFT JOIN order_items oi ON oi.order_id = o.id
GROUP BY o.id, u.email;
SELECT * FROM order_summaries WHERE status = 'paid' ORDER BY created_at DESC;
CREATE MATERIALIZED VIEW monthly_revenue AS
SELECT date_trunc('month', created_at) AS month, sum(total) AS revenue, count(*) AS orders
FROM orders WHERE status IN ('paid', 'shipped')
GROUP BY 1;
CREATE UNIQUE INDEX monthly_revenue_month_uq ON monthly_revenue (month);
SELECT * FROM monthly_revenue ORDER BY month;
REFRESH MATERIALIZED VIEW CONCURRENTLY monthly_revenue;`,
          try: R`بعد ما تعمل الاتنين: ضيف أوردر مدفوع جديد، واعمل SELECT من الـ view ومن الـ materialized view من غير refresh. مين شاف الأوردر ومين لأ؟ اعمل REFRESH واتأكد. وبعدين اعمل materialized view تاني من غير unique index وجرّب [[REFRESH ... CONCURRENTLY]] عليه.`,
          sol: R`الـ view هيشوف الأوردر الجديد على طول، لأنه بيشغّل الاستعلام كل مرة. الـ materialized view هيفضل بالأرقام القديمة (نفس revenue ونفس عدد orders للشهر ده) لحد ما تعمل [[REFRESH MATERIALIZED VIEW CONCURRENTLY monthly_revenue]]، وبعدها الشهر الحالي هيزيد بقيمة الأوردر والعدد يزيد ١.

والـ materialized view اللي من غير unique index: الـ refresh العادي هيشتغل، بس CONCURRENTLY هيفشل بـ [[cannot refresh materialized view "public.mv2" concurrently]] ومعاه hint إنك تعمل unique index على عمود أو أكتر من غير WHERE. السبب إن CONCURRENTLY بيحسب النتيجة الجديدة جنب القديمة ويقارنهم صف بصف، ومحتاج مفتاح يعرف بيه الصف.`,
          solCode: R`INSERT INTO orders (user_id, status, total)
SELECT id, 'paid', 999 FROM users LIMIT 1;

SELECT count(*) FROM order_summaries;
SELECT * FROM monthly_revenue ORDER BY month DESC LIMIT 1;
REFRESH MATERIALIZED VIEW CONCURRENTLY monthly_revenue;
SELECT * FROM monthly_revenue ORDER BY month DESC LIMIT 1;

CREATE MATERIALIZED VIEW mv2 AS SELECT status, count(*) FROM orders GROUP BY status;
REFRESH MATERIALIZED VIEW CONCURRENTLY mv2;`,
          flag: "script",
          deep: {
            why: "نفس الـ JOIN بتاع «الأوردر وإيميل صاحبه وعدد بنوده» بيتكتب في ١٠ أماكن، ولما تغيّر فيه حاجة لازم تلف عليهم كلهم. والـ view بيخليه في مكان واحد. وتقارير الأدمن اللي بتجمّع ملايين الصفوف ممكن تاخد ثواني. لو ٥٠ واحد فاتحين اللوحة، القاعدة هتحسب نفس الرقم ٥٠ مرة، والـ materialized view بيحسبه مرة كل ساعة.",
            how: R`الـ view مجرد استعلام متخزن. Postgres بيدمجه في الاستعلام بتاعك، فـ [[WHERE status = 'paid']] بتتطبق جوه وبتستخدم الـ indexes عادي. الـ view البسيط (جدول واحد من غير GROUP BY) ينفع تعمل عليه INSERT و UPDATE كمان.

[[CREATE OR REPLACE VIEW]] بيسمح تضيف أعمدة في الآخر بس. لو عايز تشيل أو تغيّر نوع عمود: [[DROP VIEW]] وتعمله تاني. ولو فيه view تاني معتمد عليه، الـ DROP هيرفض إلا بـ CASCADE.

الـ materialized view جدول حقيقي: ليه مساحة، وتقدر تعمل عليه indexes. [[REFRESH]] العادي بيعيد حسابه وبيقفل القراية لحد ما يخلص. [[REFRESH ... CONCURRENTLY]] بيحسب نسخة جديدة ويقارنها بالقديمة ويطبّق الفرق، فالقراية شغالة طول الوقت، بس أبطأ ومحتاج [[UNIQUE INDEX]].

الـ refresh مش بيحصل لوحده. بتجدوله: [[pg_cron]] جوه القاعدة (موجود في Supabase)، أو cron job على السيرفر، أو من الكود بعد عملية معينة.

وفي Supabase: الـ view العادي بيشتغل بصلاحيات اللي عمله (غالبًا postgres) فبيعدّي RLS. من Postgres 15 اكتب [[CREATE VIEW ... WITH (security_invoker = true)]] عشان يطبّق RLS على اللي بيقرا. والـ materialized view مبيطبّقش RLS خالص، فمتعرضوش في الـ API لو فيه داتا خاصة.`,
            when: "VIEW: استعلام بيتكرر، أو عايز تدّي حد (أو أداة BI) شكل مبسّط من الداتا من غير ما يشوف الجداول. MATERIALIZED: dashboards وتقارير تقيلة، أو ليدربورد بتتحدث كل كام دقيقة، والتأخير فيها مقبول.",
            mistakes: R`تفتكر إن الـ view بيسرّع. هو بيبسّط بس، والسرعة هي سرعة الاستعلام الأصلي. materialized view ومحدش عامل له refresh، فالأرقام واقفة من أسبوع. CONCURRENTLY من غير unique index. [[SELECT *]] جوه الـ view: الأعمدة بتتحدد وقت الإنشاء، فالعمود الجديد في الجدول مش هيظهر. وفي Supabase: view عادي بيكشف صفوف محمية بـ RLS لأي حد معاه الـ publishable key.`
          },
          lines: [
            "اعمل view اسمه order_summaries على الاستعلام ده:",
            "الأوردر وإيميل صاحبه وحالته وقيمته ووقته،",
            "وعدد بنوده.",
            "من الأوردرات،",
            "مع اليوزرز،",
            "والبنود (LEFT عشان الأوردر الفاضي يطلع بصفر).",
            "صف لكل أوردر.",
            "استخدمه كأنه جدول، وبشروط عادي.",
            "materialized view: النتيجة هتتحسب دلوقتي وتتخزن.",
            "الإيراد وعدد الأوردرات لكل شهر،",
            "من المدفوع والمشحون،",
            "مجمّع بالشهر.",
            "unique index على الشهر: شرط الـ refresh من غير قفل.",
            "قراية سريعة من النسخة المحفوظة.",
            "حدّث النسخة المحفوظة من غير ما تقفل القراية."
          ]
        },
        {
          cmd: "CREATE TRIGGER",
          title: "updated_at يتحدث لوحده، وكل تعديل يتسجل في audit log",
          desc: R`الـ trigger دالة بتشتغل أوتوماتيك جوه القاعدة لما يحصل INSERT أو UPDATE أو DELETE على جدول. مش مهم مين عمل التعديل: الـ API، ولا سكربت، ولا أدمن من psql. الـ trigger هيشتغل.

أشهر استخدامين:

[[updated_at]] يتحدث مع كل UPDATE من غير ما تفتكر تبعته من الكود. ده trigger من نوع [[BEFORE]]: بيعدّل الصف ([[NEW]]) قبل ما يتكتب.

audit log: كل تعديل على الأوردرات يتسجل في جدول (مين، وإمتى، وكان إيه وبقى إيه). ده trigger من نوع [[AFTER]]: بيتفرج على الصف القديم ([[OLD]]) والجديد ([[NEW]]) ويكتب في جدول تاني.`,
          example: R`ALTER TABLE products ADD COLUMN updated_at timestamptz NOT NULL DEFAULT now();
CREATE FUNCTION set_updated_at() RETURNS trigger
LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at := now();
  RETURN NEW;
END;
$$;
CREATE TRIGGER products_updated_at
BEFORE UPDATE ON products
FOR EACH ROW EXECUTE FUNCTION set_updated_at();
UPDATE products SET price = 260 WHERE name = 'T-shirt' RETURNING name, price, updated_at;
CREATE TABLE audit_log (
  id         bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  table_name text NOT NULL,
  op         text NOT NULL,
  row_id     text,
  old_data   jsonb,
  new_data   jsonb,
  changed_by text NOT NULL DEFAULT current_user,
  changed_at timestamptz NOT NULL DEFAULT now()
);
CREATE FUNCTION audit_row() RETURNS trigger
LANGUAGE plpgsql AS $$
BEGIN
  INSERT INTO audit_log (table_name, op, row_id, old_data, new_data)
  VALUES (TG_TABLE_NAME, TG_OP, COALESCE(NEW.id, OLD.id)::text,
          CASE WHEN TG_OP <> 'INSERT' THEN to_jsonb(OLD) END,
          CASE WHEN TG_OP <> 'DELETE' THEN to_jsonb(NEW) END);
  RETURN NULL;
END;
$$;
CREATE TRIGGER orders_audit
AFTER INSERT OR UPDATE OR DELETE ON orders
FOR EACH ROW EXECUTE FUNCTION audit_row();`,
          try: R`غيّر حالة أوردر لـ shipped، وامسح أوردر تاني، وبعدين اعرض من audit_log: العملية، ورقم الصف، والحالة القديمة والجديدة (من جوه الـ jsonb). وبعدين ركّب نفس trigger الـ updated_at على جدول orders (ضيف العمود الأول)، وجرّب UPDATE تبعت فيه [[updated_at = '2020-01-01']] بإيدك: القيمة اللي اتخزنت كام؟`,
          sol: R`في audit_log هتلاقي صفين: [[UPDATE]] فيه old_status [[paid]] (أو اللي كانت) و new_status [[shipped]]، و [[DELETE]] فيه old_data كامل و new_data [[NULL]]. الاستعلام: [[old_data->>'status']] و [[new_data->>'status']]. و [[changed_by]] هيبقى اسم يوزر القاعدة ([[postgres]] في الـ lab)، مش اليوزر بتاع التطبيق. عشان تسجّل يوزر التطبيق لازم تبعته، زي [[SET LOCAL app.user_id = '...']] جوه الـ transaction وتقراه في الـ trigger بـ [[current_setting('app.user_id', true)]].

وتجربة updated_at: القيمة المتخزنة هتبقى وقت دلوقتي مش 2020، لأن الـ BEFORE trigger بيكتب فوق أي قيمة بعتها في NEW قبل ما الصف يتحفظ. ده المقصود: محدش يقدر يزوّر وقت التعديل.

لو الـ trigger مش شغال، اتأكد إنه [[FOR EACH ROW]] مش STATEMENT (الـ STATEMENT مفيهوش NEW)، وإنه BEFORE مش AFTER (تعديل NEW في AFTER ملوش تأثير).`,
          solCode: R`UPDATE orders SET status = 'shipped' WHERE id = (SELECT min(id) FROM orders);
DELETE FROM orders WHERE id = (SELECT max(id) FROM orders);

SELECT op, row_id,
       old_data->>'status' AS old_status,
       new_data->>'status' AS new_status,
       changed_by, changed_at
FROM audit_log ORDER BY id;

ALTER TABLE orders ADD COLUMN updated_at timestamptz NOT NULL DEFAULT now();
CREATE TRIGGER orders_updated_at
BEFORE UPDATE ON orders
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

UPDATE orders SET status = 'paid', updated_at = '2020-01-01' WHERE id = (SELECT min(id) FROM orders) RETURNING updated_at;`,
          flag: "script",
          deep: {
            why: "لو updated_at معتمد على إن كل مطوّر يفتكر يبعته، هيتنسي في endpoint من العشرين، والـ sync والـ cache اللي معتمدين عليه هيبوظوا. والـ audit log من الكود بيفوّت أي تعديل حصل من برّه الكود: سكربت، أو migration، أو أدمن صلّح حاجة بإيده من psql، وده بالظبط التعديل اللي هتحتاج تعرفه لما فلوس تختفي.",
            how: R`الـ trigger ليه جزئين: function بترجّع نوع [[trigger]] (ده الكود)، و [[CREATE TRIGGER]] (ده بيقول إمتى تشتغل). نفس الـ function ينفع تتركّب على جداول كتير.

جوه الـ function عندك متغيرات جاهزة: [[NEW]] الصف الجديد (INSERT و UPDATE)، و [[OLD]] الصف القديم (UPDATE و DELETE)، و [[TG_OP]] اسم العملية، و [[TG_TABLE_NAME]] اسم الجدول.

[[BEFORE]] بيشتغل قبل الكتابة وتقدر تعدّل NEW. لو رجّعت NEW الصف بيتكتب، ولو رجّعت NULL العملية بتتلغي للصف ده من غير error. [[AFTER]] بيشتغل بعد الكتابة، والقيمة اللي بيرجّعها ملهاش لازمة (عشان كده [[RETURN NULL]])، وبيستخدم للتسجيل أو لتحديث جداول تانية.

[[FOR EACH ROW]] مرة لكل صف. [[FOR EACH STATEMENT]] مرة لكل أمر حتى لو عدّل مليون صف. و [[WHEN (OLD.status IS DISTINCT FROM NEW.status)]] في CREATE TRIGGER بيشغّله بس لو الحالة اتغيرت فعلًا.

الـ trigger جزء من نفس الـ transaction. لو فشل، التعديل الأصلي كله بيترجع. وده حلو (مفيش تعديل من غير audit)، بس كمان معناه إن trigger بطيء بيبطّأ كل INSERT.

[[to_jsonb(OLD)]] بيحوّل الصف كله لـ jsonb، فنفس الـ audit function تشتغل على أي جدول من غير ما تكتب أسماء الأعمدة.

وفي Prisma: [[@updatedAt]] في الـ schema بيحدّث القيمة من الـ client، مش من القاعدة. يعني UPDATE من psql أو من سكربت مش هيحدّثه. الـ trigger بيغطي كل الطرق.`,
            when: "updated_at، والـ audit logs، والـ counters اللي لازم تفضل مظبوطة، وفي Supabase: إنشاء صف في profiles لما يوزر يسجّل (trigger على auth.users، درس one-to-one). أما منطق البيزنس الكبير (إيميلات، ودفع، ومناداة APIs) مكانه الكود مش trigger.",
            mistakes: R`منطق كتير مستخبي في triggers، فمحدش فاهم ليه القيمة اتغيرت. trigger بيعدّل نفس الجدول اللي عليه فيعمل loop. AFTER وبتعدّل NEW وتستغرب مفيش حاجة حصلت. [[FOR EACH ROW]] على جدول بيتعمله bulk insert بملايين الصفوف فيبقى بطيء جدًا. [[DROP FUNCTION]] بيفشل لأن فيه trigger معتمد عليها. وفي الانترفيو: «إيه عيوب الـ triggers؟» منطق مستخبي، وصعب في الـ testing والـ debugging، وبيأثر على سرعة الكتابة.`
          },
          lines: [
            "ضيف عمود updated_at للمنتجات.",
            "function بترجّع trigger،",
            "مكتوبة بـ plpgsql. الـ $$ بتبدأ الكود.",
            "البداية.",
            "حط الوقت الحالي في الصف الجديد.",
            "رجّع الصف المعدّل عشان يتكتب.",
            "النهاية.",
            "قفلة الكود.",
            "trigger اسمه products_updated_at:",
            "قبل أي UPDATE على المنتجات،",
            "لكل صف، شغّل الدالة دي.",
            "جرّب: updated_at اتغير لوحده.",
            "جدول الـ audit:",
            "رقم،",
            "اسم الجدول،",
            "العملية (INSERT و UPDATE و DELETE)،",
            "رقم الصف،",
            "الصف قبل التعديل،",
            "والصف بعده،",
            "مين عمل التعديل (يوزر القاعدة)،",
            "وإمتى.",
            "قفلة.",
            "function الـ audit،",
            "بـ plpgsql.",
            "البداية.",
            "سجّل صف:",
            "اسم الجدول والعملية ورقم الصف (من NEW، ولو DELETE من OLD)،",
            "القديم لو مش INSERT،",
            "والجديد لو مش DELETE.",
            "AFTER trigger: القيمة اللي بترجع ملهاش لازمة.",
            "النهاية.",
            "قفلة الكود.",
            "trigger على الأوردرات:",
            "بعد أي إضافة أو تعديل أو مسح،",
            "لكل صف."
          ]
        },
        {
          cmd: "CREATE FUNCTION",
          title: "منطق جوه القاعدة: دالة SQL أو plpgsql وتناديها من أي مكان",
          desc: R`الـ function في Postgres بتاخد parameters وترجّع قيمة أو جدول، وتناديها من أي استعلام: [[SELECT user_spent(id) FROM users]].

فيه لغتين هتستخدمهم: [[LANGUAGE sql]] لاستعلام واحد (أبسط وPostgres يقدر يحسّنه)، و [[LANGUAGE plpgsql]] لما محتاج متغيرات و IF و RAISE.

الاستخدام الأهم في الشغل: عملية لازم تحصل كلها مع بعض (خصم مخزون وإنشاء أوردر وبنده). الـ function كلها بتشتغل في transaction واحدة، فلو حاجة فشلت كله بيترجع. وفي Supabase دي الطريقة اللي الـ frontend بينفّذ بيها عملية زي دي: [[supabase.rpc('place_order', {...})]] (درس rpc في المستوى التالت).`,
          example: R`CREATE FUNCTION user_spent(p_user_id uuid) RETURNS numeric
LANGUAGE sql STABLE AS $$
  SELECT COALESCE(sum(total), 0) FROM orders
  WHERE user_id = p_user_id AND status IN ('paid', 'shipped');
$$;
SELECT email, user_spent(id) FROM users ORDER BY 2 DESC;
CREATE FUNCTION place_order(p_user_id uuid, p_product_id bigint, p_qty int)
RETURNS bigint LANGUAGE plpgsql AS $$
DECLARE
  v_price numeric;
  v_order_id bigint;
BEGIN
  UPDATE products SET stock = stock - p_qty
  WHERE id = p_product_id AND stock >= p_qty
  RETURNING price INTO v_price;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'OUT_OF_STOCK';
  END IF;
  INSERT INTO orders (user_id, total) VALUES (p_user_id, v_price * p_qty)
  RETURNING id INTO v_order_id;
  INSERT INTO order_items (order_id, product_id, quantity, unit_price)
  VALUES (v_order_id, p_product_id, p_qty, v_price);
  RETURN v_order_id;
END;
$$;
SELECT place_order((SELECT id FROM users LIMIT 1), 2, 3);`,
          try: R`نادي [[place_order]] على منتج مخزونه صفر (Cap بعد درس UPDATE مثلًا)، وبعدين اتأكد إن عدد الأوردرات متغيّرش. وبعدين اكتب function بـ [[LANGUAGE sql]] اسمها [[top_products(p_limit int)]] ترجّع جدول ([[RETURNS TABLE (name text, sold bigint)]]) بأكتر المنتجات مبيعًا، وناديها بـ [[SELECT * FROM top_products(3)]]. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: اعمل [[top_products(p_limit int)]] بـ [[LANGUAGE sql]] و [[RETURNS TABLE (name text, sold bigint)]] (مجموع الكميات من order_items)، وآخر سطر [[SELECT * FROM top_products(3);]].`,
          sol: R`على منتج خلصان هتاخد [[ERROR: OUT_OF_STOCK]] ومعاها [[CONTEXT: PL/pgSQL function place_order(uuid,bigint,integer) line 10 at RAISE]]. و [[SELECT count(*) FROM orders]] هيطلع نفس الرقم قبل وبعد: الـ UPDATE مغيّرش ولا صف أصلًا ([[NOT FOUND]])، والـ exception وقّفت الدالة قبل الـ INSERT. ولو الغلطة حصلت بعد الـ INSERT (زي product_id مش موجود في order_items)، كل اللي حصل جوه الدالة كان هيترجع برضه، لأن الـ function جزء من transaction الأمر اللي ناداها.

و [[top_products(3)]] هترجع ٣ صفوف بعمودين، زي أي جدول: تقدر تعمل عليها WHERE و JOIN. لو نسيت [[RETURNS TABLE]] وكتبت [[RETURNS bigint]] هترجع أول قيمة بس. وخلي بالك أسماء الأعمدة في [[RETURNS TABLE]] بتبقى متغيرات جوه الدالة، فلو في plpgsql عندك عمود في جدول اسمه name هتاخد [[column reference "name" is ambiguous]]. في LANGUAGE sql مفيش المشكلة دي.`,
          solCode: R`SELECT count(*) FROM orders;
SELECT place_order((SELECT id FROM users LIMIT 1), (SELECT id FROM products WHERE stock = 0 LIMIT 1), 1);
SELECT count(*) FROM orders;

CREATE FUNCTION top_products(p_limit int)
RETURNS TABLE (name text, sold bigint)
LANGUAGE sql STABLE AS $$
  SELECT p.name, sum(oi.quantity)
  FROM order_items oi JOIN products p ON p.id = oi.product_id
  GROUP BY p.name
  ORDER BY 2 DESC
  LIMIT p_limit;
$$;

SELECT * FROM top_products(3);`,
          flag: "script",
          deep: {
            why: "لما نفس المنطق (حساب رصيد، أو إنشاء أوردر) بيتكتب في الـ API وفي سكربت وفي لوحة الأدمن، كل نسخة بتختلف شوية. الـ function بتحطه في مكان واحد جنب الداتا، وبتشتغل في رحلة واحدة للقاعدة بدل ٤ queries رايحة جاية. وفي Supabase، لو الـ frontend بيكلّم القاعدة مباشرة، ده الطريق الوحيد لعملية فيها كذا خطوة لازم تتم مع بعض.",
            how: R`[[$$ ... $$]] مجرد علامات تنصيص للكود، عشان متحتاجش تهرّب كل [[']] جواه.

الـ parameters باسم زي [[p_user_id]]: الـ prefix بيمنع التضارب مع أسماء الأعمدة. في plpgsql لو الـ parameter اسمه [[user_id]] والجدول فيه عمود [[user_id]]، Postgres مش هيعرف تقصد مين.

[[STABLE]] معناها «مش بتعدّل حاجة، ونفس المدخلات في نفس الاستعلام بترجّع نفس النتيجة»، و [[IMMUTABLE]] «نفس المدخلات بترجّع نفس النتيجة دايمًا» (شرط عشان تستخدمها في index أو generated column)، و [[VOLATILE]] الافتراضي لأي حاجة بتعدّل. التصنيف الصح بيخلي Postgres يحسّن.

في plpgsql: [[DECLARE]] للمتغيرات، و [[SELECT ... INTO v]] أو [[RETURNING ... INTO v]] يحط نتيجة في متغير، و [[FOUND]] بيقولك آخر أمر أثّر في صفوف ولا لأ، و [[RAISE EXCEPTION]] بيوقف كل حاجة ويرجّع error.

الـ function مش بتعمل COMMIT لوحدها: هي جوه الـ transaction بتاع الأمر اللي ناداها. عشان كده أي exception بيرجّع كل اللي عملته. ولو محتاج COMMIT في النص (batch كبير) ده [[PROCEDURE]] مش function.

[[RETURNS TABLE (...)]] أو [[RETURNS SETOF orders]] بيرجّع صفوف، فتستخدمها في FROM. و [[CREATE OR REPLACE FUNCTION]] بيعدّلها، بس لو غيّرت نوع الـ return لازم DROP الأول.

والأمان: الافتراضي [[SECURITY INVOKER]]، يعني بتشتغل بصلاحيات اللي بيناديها. [[SECURITY DEFINER]] بتشتغل بصلاحيات اللي عملها، ودي خطيرة لو مش واخد بالك (بتعدّي RLS). التفاصيل في درس rpc.`,
            when: "عمليات من كذا خطوة لازم تتم مع بعض (خصوصًا في Supabase)، وحسابات بتتكرر في استعلامات كتير، ودوال الـ triggers، ودوال IMMUTABLE للـ indexes (زي التطبيع في درس البحث بالعربي). أما منطق فيه مناداة APIs برّه أو إيميلات، مكانه الكود.",
            mistakes: R`parameter بنفس اسم عمود في plpgsql. [[SECURITY DEFINER]] من غير [[SET search_path]] ومن غير ما تتأكد مين بيناديها. تعليم دالة بتقرا من جدول IMMUTABLE عشان تحطها في index، فالـ index يبقى غلط لما الجدول يتغير. منطق كتير جدًا جوه القاعدة ومفيش tests ولا version control، فخليها في ملفات migrations زي أي حاجة تانية. و [[RAISE EXCEPTION]] برسالة فيها داتا حساسة بتوصل للـ client.`
          },
          lines: [
            "دالة بتاخد id يوزر وترجّع رقم،",
            "SQL عادي، و STABLE: بتقرا بس.",
            "مجموع مدفوعاته (أو صفر)،",
            "للأوردرات المدفوعة والمشحونة بتاعته.",
            "قفلة الكود.",
            "استخدمها في SELECT زي أي دالة.",
            "دالة بتعمل أوردر: يوزر ومنتج وكمية،",
            "بترجّع رقم الأوردر، ومكتوبة بـ plpgsql.",
            "المتغيرات:",
            "سعر المنتج،",
            "ورقم الأوردر الجديد.",
            "البداية.",
            "اخصم المخزون،",
            "بشرط يكون كفاية (atomic UPDATE)،",
            "وحط السعر في المتغير.",
            "لو مفيش صف اتعدّل (المنتج خلصان أو مش موجود):",
            "وقّف وارمي error، وكل حاجة ترجع.",
            "نهاية الـ IF.",
            "اعمل الأوردر بالإجمالي،",
            "وخد رقمه.",
            "ضيف البند،",
            "بنفس السعر اللي اتخصم بيه.",
            "رجّع رقم الأوردر.",
            "النهاية.",
            "قفلة الكود.",
            "ناديها: أول يوزر، ومنتج رقم ٢، و٣ قطع."
          ],
          check: {
            lang: "sql",
            setup: R`CREATE TABLE products (
  id int PRIMARY KEY,
  name text NOT NULL,
  price numeric(10,2) NOT NULL,
  stock int NOT NULL,
  is_active boolean NOT NULL
);
INSERT INTO products VALUES
  (1, 'T-shirt', 250.00, 10, true),
  (2, 'Mug', 120.00, 0, true),
  (3, 'Hoodie', 650.00, 3, true),
  (4, 'Cap', 180.00, 0, false),
  (5, 'Sticker', 0.00, 0, true),
  (6, 'Old Poster', 0.00, 0, false),
  (7, 'Pen', 15.00, 100, true),
  (8, 'Pin', 15.00, 40, true);
CREATE TABLE users (
  id int PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL UNIQUE,
  phone text,
  created_at timestamptz NOT NULL
);
INSERT INTO users VALUES
  (1, 'Sara Ahmed', 'sara@example.com', '01012345678', '2026-01-05 10:00+00'),
  (2, 'Ali Hassan', 'ali@shop.eg', NULL, '2026-02-10 09:00+00'),
  (3, 'Mona', 'mona@example.com', '0100', '2026-03-01 12:00+00'),
  (4, 'Omar Khaled', 'omar@gmail.com', NULL, '2026-09-20 08:00+00');
CREATE TABLE orders (
  id int PRIMARY KEY,
  user_id int REFERENCES users (id),
  status text NOT NULL,
  total numeric(10,2) NOT NULL,
  created_at timestamptz NOT NULL
);
INSERT INTO orders VALUES
  (1, 1, 'paid', 450.00, '2026-07-03 10:00+00'),
  (2, 1, 'paid', 900.00, '2026-08-15 18:30+00'),
  (3, 2, 'pending', 120.00, '2026-08-20 09:00+00'),
  (4, 1, 'cancelled', 300.00, '2026-08-31 22:30+00'),
  (5, 3, 'paid', 250.00, '2026-09-01 11:00+00'),
  (6, 2, 'paid', 1200.00, '2026-09-05 14:00+00'),
  (7, 3, 'pending', 80.00, '2026-09-10 10:00+00'),
  (8, 1, 'paid', 60.00, '2026-09-12 16:45+00');
CREATE TABLE order_items (
  order_id int REFERENCES orders (id),
  product_id int REFERENCES products (id),
  quantity int NOT NULL,
  unit_price numeric(10,2) NOT NULL,
  PRIMARY KEY (order_id, product_id)
);
INSERT INTO order_items VALUES
  (1, 1, 1, 250.00), (1, 7, 2, 15.00), (1, 2, 1, 120.00),
  (2, 3, 1, 650.00), (2, 1, 1, 250.00),
  (3, 2, 1, 120.00),
  (5, 1, 1, 250.00),
  (6, 3, 1, 650.00), (6, 2, 2, 120.00), (6, 4, 1, 180.00),
  (8, 7, 4, 15.00);`,
            starter: R`CREATE FUNCTION top_products(p_limit int) RETURNS bigint
LANGUAGE sql STABLE AS $$
  SELECT sum(quantity) FROM order_items;
$$;
SELECT * FROM top_products(3);`,
            expect: [["Pen",6], ["Mug",4], ["T-shirt",3]],
            solution: R`CREATE FUNCTION top_products(p_limit int)
RETURNS TABLE (name text, sold bigint)
LANGUAGE sql STABLE AS $$
  SELECT p.name, sum(oi.quantity)::bigint AS sold
  FROM order_items oi
  JOIN products p ON p.id = oi.product_id
  GROUP BY p.name
  ORDER BY sold DESC, p.name
  LIMIT p_limit;
$$;
SELECT * FROM top_products(3);`
          }
        },
        {
          cmd: "generated columns",
          title: "عمود بيتحسب لوحده من أعمدة تانية",
          desc: R`[[GENERATED ALWAYS AS (تعبير) STORED]] بيعمل عمود قيمته بتتحسب من أعمدة تانية في نفس الصف، وبتتخزن وتتحدث لوحدها مع كل INSERT و UPDATE. محدش يقدر يكتب فيه بإيده.

مثال: [[line_total]] في order_items = الكمية × السعر. بدل ما تحسبه في كل استعلام أو تثق إن الكود بعته صح، القاعدة بتحسبه. وتقدر تعمل عليه index زي أي عمود.

الشرط: التعبير يعتمد على أعمدة نفس الصف بس، وبدوال IMMUTABLE. مينفعش [[now()]] ولا subquery ولا جدول تاني.`,
          example: R`ALTER TABLE order_items
  ADD COLUMN line_total numeric(12,2) GENERATED ALWAYS AS (quantity * unit_price) STORED;
SELECT order_id, quantity, unit_price, line_total FROM order_items ORDER BY order_id LIMIT 3;
UPDATE order_items SET quantity = 3 WHERE order_id = 1 AND product_id = 2 RETURNING line_total;
UPDATE order_items SET line_total = 1;
ALTER TABLE users ADD COLUMN email_domain text GENERATED ALWAYS AS (split_part(email, '@', 2)) STORED;
CREATE INDEX users_email_domain_idx ON users (email_domain);`,
          try: R`ضيف لجدول users عمود [[email_normalized]] generated من [[lower(trim(email))]] واعمل عليه unique index. جرّب تضيف يوزر إيميله [['  YOU@example.com']]. وبعدين جرّب تعمل عمود generated من [[now() - created_at]] وشوف الـ error.`,
          sol: R`اليوزر الجديد هيترفض بـ [[duplicate key value violates unique constraint "users_email_normalized_uq"]]، لأن العمود المحسوب بقى [[you@example.com]]، وده موجود قبل كده. يعني القاعدة نفسها بقت تمنع التكرار مهما الكود بعت الإيميل بأي شكل. وده بديل للـ expression index [[ON users (lower(email))]] اللي في درس constraints، والفرق إن القيمة المتطبّعة بقت عمود تقدر تعمل عليه SELECT و WHERE مباشرة.

والعمود من [[now() - created_at]] هيفشل بـ [[generation expression is not immutable]]، لأن [[now()]] قيمتها بتتغير، والعمود المخزن مش هيتحدث لوحده كل ثانية. أي حاجة معتمدة على الوقت الحالي احسبها في SELECT أو اعملها view.`,
          solCode: R`ALTER TABLE users
  ADD COLUMN email_normalized text GENERATED ALWAYS AS (lower(trim(email))) STORED;
CREATE UNIQUE INDEX users_email_normalized_uq ON users (email_normalized);

INSERT INTO users (email, name) VALUES ('  YOU@example.com', 'Copy');

ALTER TABLE users ADD COLUMN age interval GENERATED ALWAYS AS (now() - created_at) STORED;`,
          flag: "script",
          deep: {
            why: "القيم المحسوبة لما تتخزن من الكود بتختلف عن الحقيقة مع الوقت: حد عدّل الكمية من لوحة الأدمن ونسي يعدّل line_total. والحساب في كل SELECT بيتكرر ومبيتعملوش index. الـ generated column بيجمع الاتنين: القيمة دايمًا صح، ومتخزنة فتتفلتر وتترتب وتتعمل عليها index.",
            how: R`[[STORED]] معناها القيمة بتتحسب وقت الكتابة وتتخزن على الديسك. Postgres 18 ضاف كمان [[VIRTUAL]] (بتتحسب وقت القراية ومبتاخدش مساحة) وخلاه الافتراضي. بس الـ lab على Postgres 17 فاكتب STORED، وده اللي بتحتاجه لو هتعمل index.

الإضافة على جدول موجود ([[ALTER TABLE ... ADD COLUMN ... STORED]]) بتعيد كتابة الجدول كله عشان تحسب القيمة لكل صف القديم، وده بياخد قفل. على جدول كبير في الإنتاج خد بالك (درس تغييرات آمنة في الإنتاج في تاب «PostgreSQL»).

مينفعش تكتب فيه: [[UPDATE ... SET line_total = 1]] بيطلع [[column "line_total" can only be updated to DEFAULT]]. وفي INSERT متبعتوش خالص.

الاستخدامات الشائعة: مجموع من أعمدة، أو نسخة متطبّعة من نص (lowercase، أو من غير تشكيل)، أو [[tsvector]] للبحث (الدرس الجاي)، أو استخراج قيمة من jsonb عشان تعمل عليها index عادي.

في Prisma: العمود ده بيتعرف في الـ schema عادي، بس لازم تعدّل الـ migration بإيدك وتكتب الـ GENERATED، لأن Prisma مبيعرفش يولّده. ومتبعتوش في create، أو استخدم [[@default(dbgenerated())]] عشان Prisma ميطلبوش منك.`,
            when: "قيمة بتتحسب من نفس الصف وبتتقري أو بتتفلتر كتير: إجماليات، ونصوص متطبّعة للبحث والـ unique، و tsvector، ومفاتيح من jsonb.",
            mistakes: R`تحاول تستخدم [[now()]] أو جدول تاني. تبعت قيمة للعمود في INSERT من الكود (Prisma أو غيره) فيطلع error. تضيفه على جدول فيه ملايين الصفوف في وقت الذروة. تعمل generated column لحاجة بتتحسب مرة واحدة ومش بتتفلتر بيها، فتخزن حاجة ملهاش لازمة.`
          },
          lines: [
            "ضيف لـ order_items عمود:",
            "line_total = الكمية × السعر، بيتحسب ويتخزن لوحده.",
            "القيمة موجودة من غير ما حد يحسبها.",
            "غيّر الكمية: line_total اتحدث لوحده.",
            "error: العمود ده محدش يكتب فيه.",
            "عمود دومين الإيميل محسوب من الإيميل،",
            "وعليه index عشان الفلترة بالدومين تبقى سريعة."
          ]
        }
      ]
    },
    {
      t: "البحث: full-text و pg_trgm والعربي",
      l: 2,
      n: "خانة البحث اللي في كل موقع: بحث بالكلمات مترتب بالأهمية، وبحث بيستحمل الأخطاء الإملائية، وتطبيع العربي عشان «أحمد» تلاقي «احمد»",
      items: [
        {
          cmd: "full-text search",
          title: "بحث بالكلمات مترتب بالأهمية بدل ILIKE",
          desc: R`[[ILIKE '%docker run%']] بيدوّر على النص ده بالحرف، فـ «running docker» مش هتطلع، ومع جدول كبير بيقرا كل الصفوف. الـ full-text search بيفهم الكلمات: بيقطّع النص لكلمات، ويرجّع كل كلمة لأصلها (running و runs بيبقوا run)، ويشيل الكلمات اللي ملهاش معنى (the و a)، وبيرتب النتايج بالأهمية.

الأجزاء: [[tsvector]] النص بعد التقطيع (بيتخزن في عمود generated وعليه GIN index)، و [[tsquery]] كلام البحث، و [[@@]] بيقول «مطابق ولا لأ»، و [[ts_rank]] بيدّي درجة للترتيب.

و [[websearch_to_tsquery]] بياخد اللي اليوزر كتبه في خانة البحث زي ما هو، وبيفهم [["عبارة بالظبط"]] و [[-كلمة]] للاستبعاد و [[or]]، ومبيرميش error أبدًا مهما اليوزر كتب.`,
          example: R`CREATE TABLE articles (
  id     bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title  text NOT NULL,
  body   text NOT NULL,
  search tsvector GENERATED ALWAYS AS (
    setweight(to_tsvector('english', title), 'A') || setweight(to_tsvector('english', body), 'B')
  ) STORED
);
CREATE INDEX articles_search_idx ON articles USING gin (search);
INSERT INTO articles (title, body) VALUES
  ('Running Postgres in Docker', 'How to run a database container with volumes and backups'),
  ('Indexes explained', 'Why queries get slow and how a B-tree index helps when running reports'),
  ('Docker volumes', 'Keep your data when the container is removed');
SELECT id, title, ts_rank(search, q) AS rank
FROM articles, websearch_to_tsquery('english', 'docker run') q
WHERE search @@ q
ORDER BY rank DESC;
SELECT to_tsvector('english', 'Running containers ran quickly');
SELECT websearch_to_tsquery('english', '"docker volumes" -backup or index');
SELECT ts_headline('english', body, websearch_to_tsquery('english', 'slow reports')) FROM articles WHERE id = 2;`,
          try: R`دوّر على [[running]] وعلى [[containers]]، وقارن النتيجة بـ [[ILIKE '%running%']]. وبعدين جرّب [[to_tsquery('english', 'docker run')]] (من غير websearch) وشوف بيحصل إيه، وجرّب [[websearch_to_tsquery('english', 'docker -backups')]].`,
          sol: R`[[running]] هترجع المقالتين الأولى والتانية، لأن البحث بقى [['run']] بعد الـ stemming، والأولى فيها Running و run، والتانية فيها running. أما [[ILIKE '%running%']] هترجع نفس الاتنين هنا بالصدفة، بس لو دوّرت بـ [[run]] الـ ILIKE هيجيب أي كلمة فيها run (زي runtime) و full-text مش هيجيبها. و [[containers]] هترجع الأولى والتالتة (container).

[[to_tsquery('english', 'docker run')]] هيطلع [[syntax error in tsquery: "docker run"]]، لأن to_tsquery محتاجة operators صريحة زي [['docker & run']]. عشان كده متحطش اللي اليوزر كتبه في to_tsquery أبدًا، استخدم websearch_to_tsquery أو plainto_tsquery.

و [[docker -backups]] هترجع المقالة التالتة بس (Docker volumes)، لأن الأولى فيها backups فاتشالت.

خد بالك من الحاجة الغريبة: [[ran]] مش بتبقى run، لأن الـ stemmer بيقطع نهايات الكلام بس، مبيعرفش الأفعال الشاذة.`,
          solCode: R`SELECT title FROM articles WHERE search @@ websearch_to_tsquery('english', 'running');
SELECT title FROM articles WHERE title ILIKE '%running%' OR body ILIKE '%running%';
SELECT title FROM articles WHERE search @@ websearch_to_tsquery('english', 'containers');
SELECT to_tsquery('english', 'docker run');
SELECT title FROM articles WHERE search @@ websearch_to_tsquery('english', 'docker -backups');`,
          flag: "script",
          deep: {
            why: "خانة البحث موجودة في كل منتج تقريبًا: منتجات، ومقالات، وتذاكر دعم. ILIKE مع % في الأول مبيستخدمش B-tree index، ومبيفهمش صيغ الكلمة، ومبيرتبش. والحل مش لازم يبقى Elasticsearch من أول يوم: Postgres فيه بحث كويس كفاية لأغلب المشاريع.",
            how: R`[[to_tsvector('english', text)]] بيقطّع ويعمل stemming ويشيل الـ stop words، وبيحفظ مكان كل كلمة: [['contain':2 'quick':4 'ran':3 'run':1]]. أول argument هو الـ configuration (اللغة)، ولازم يبقى نفسه في التخزين والبحث.

[[setweight(..., 'A')]] بيدّي كلمات العنوان وزن أعلى من كلمات الـ body، فـ ts_rank بيطلّع المقالة اللي الكلمة في عنوانها الأول. الأوزان A و B و C و D.

العمود [[GENERATED ... STORED]] بيحسب الـ tsvector مرة وقت الكتابة بدل كل بحث، و [[GIN]] index بيعمل «inverted index»: لكل كلمة، قايمة الصفوف اللي فيها. فالبحث بيروح للكلمة على طول. ومن غير العمود ده ممكن تعمل expression index على [[to_tsvector('english', title || ' ' || body)]]، بس لازم تكتب نفس التعبير بالظبط في كل WHERE.

[[websearch_to_tsquery]] للي اليوزر بيكتبه. [[plainto_tsquery]] بيعمل AND بين كل الكلمات. [[to_tsquery]] للي انت بتكتبه في الكود بـ operators: [[&]] و [[|]] و [[!]] و [[<->]] (ورا بعض) و [[:*]] (prefix: [['dock:*']] للـ autocomplete).

[[ts_rank]] بيحسب على الصفوف اللي طابقت بس، فهو مش بيستخدم index. عشان كده الفلترة بـ [[@@]] الأول (بالـ index) وبعدين الترتيب. و [[ts_headline]] بيطلّع جزء من النص والكلمات المطابقة جوه [[<b>]] للعرض (خد بالك: HTML، اعمله escape أو sanitize قبل ما تحطه في الصفحة).

الحدود: مفيش تسامح مع الأخطاء الإملائية (ده pg_trgm، الدرس الجاي)، والعربي محتاج شغل زيادة (نفس الدرس). ولو محتاج facets وتصحيح إملائي وsynonyms وملايين المستندات، ساعتها فكّر في Meilisearch أو Typesense أو Elasticsearch.`,
            when: "بحث في نصوص طويلة (مقالات، وأوصاف منتجات، وتذاكر)، ولما محتاج ترتيب بالأهمية. للأسماء القصيرة والأكواد والبحث اللي لازم يستحمل أخطاء إملائية، pg_trgm أنسب، وكتير من المشاريع بتستخدم الاتنين مع بعض.",
            mistakes: R`to_tsquery على كلام اليوزر فأي علامة غريبة تطلّع error 500. لغة مختلفة في التخزين والبحث ([['english']] هنا و [['simple']] هناك) فمفيش حاجة تطابق. تحسب to_tsvector جوه WHERE من غير index فكل بحث يقرا الجدول كله. الترتيب بـ ts_rank على مليون صف طابقوا. [[ts_headline]] بيطلع HTML وبتحطه في الصفحة من غير escape.`
          },
          lines: [
            "جدول المقالات:",
            "رقم،",
            "عنوان،",
            "ومحتوى،",
            "وعمود البحث: tsvector بيتحسب لوحده،",
            "كلمات العنوان بوزن A وكلمات المحتوى بوزن B.",
            "وبيتخزن.",
            "قفلة.",
            "GIN index على عمود البحث.",
            "تلات مقالات:",
            "واحدة عن Docker و Postgres،",
            "وواحدة عن الـ indexes،",
            "وواحدة عن الـ volumes.",
            "المقالات ودرجة كل واحدة،",
            "والبحث جاي من كلام اليوزر زي ما هو،",
            "اللي طابقت بس (بالـ index)،",
            "والأهم الأول.",
            "شوف التقطيع: running بقت run، و ran فضلت ran، و quickly بقت quick.",
            "شوف بيفهم إيه: عبارة ورا بعض، واستبعاد، و or.",
            "جزء من النص والكلمات المطابقة معلّمة بـ <b>."
          ]
        },
        {
          cmd: "البحث بالعربي",
          title: "«أحمد» تلاقي «احمد»، و«محمد مصطفا» تلاقي «مُحَمَّد مصطفى»",
          desc: R`العربي فيه مشاكل الإنجليزي مفيهوش: نفس الاسم بيتكتب بـ «أحمد» و «احمد»، و «فاطمة» و «فاطمه»، و «مصطفى» و «مصطفي»، وممكن يكون فيه تشكيل أو تطويل (الـــقاهرة). لو قارنت النص زي ما هو، اليوزر اللي كتب «احمد» مش هيلاقي «أحمد».

الحل على خطوتين: تطبيع (normalization) للنص المتخزن ولكلام البحث بنفس الدالة: الهمزات كلها ا، والتاء المربوطة ه، والألف المقصورة ي، ومن غير تشكيل ولا تطويل. وبعدين للأخطاء الإملائية: extension [[pg_trgm]] بيقارن النصوص بالتشابه (similarity) بدل التطابق.

الدالة لازم تكون [[IMMUTABLE]] عشان تتحط في عمود generated وعليه index.`,
          example: R`CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE FUNCTION ar_normalize(t text) RETURNS text
LANGUAGE sql IMMUTABLE PARALLEL SAFE AS $$
  SELECT translate(regexp_replace(lower(t), '[ً-ْـ]', '', 'g'), 'أإآٱةى', 'ااااهي');
$$;
SELECT ar_normalize('مُحَمَّد أحمد إبراهيم مدرسة مصطفى الـــقاهرة');
CREATE TABLE teachers (
  id        bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name      text NOT NULL,
  name_norm text GENERATED ALWAYS AS (ar_normalize(name)) STORED
);
CREATE INDEX teachers_name_trgm ON teachers USING gin (name_norm gin_trgm_ops);
INSERT INTO teachers (name) VALUES ('أحمد إبراهيم'), ('مُحَمَّد مصطفى'), ('فاطمة الزهراء'), ('أسامة عبد الله');
SELECT name FROM teachers WHERE name_norm LIKE '%' || ar_normalize('فاطمه') || '%';
SELECT name, similarity(name_norm, ar_normalize('محمد مصطفا')) AS score
FROM teachers
WHERE name_norm % ar_normalize('محمد مصطفا')
ORDER BY score DESC;
SELECT name FROM teachers WHERE name LIKE '%احمد%';`,
          try: R`دوّر بـ [[اسامه]] (من غير همزة وبهاء) مرة بـ LIKE على name_norm ومرة بـ [[word_similarity]] و [[<%]]. وبعدين دوّر بغلطة إملائية زي [[ابراهم]] وشوف مين من الطريقتين لقاه. وآخر حاجة: اعمل 5000 مدرس بأسماء متولّدة ([[generate_series]])، وقارن [[EXPLAIN ANALYZE]] للبحث بـ LIKE على name_norm قبل وبعد الـ index.`,
          sol: R`[[اسامه]] بعد التطبيع بقت [[اسامه]]، و [[أسامة عبد الله]] اتخزنت [[اسامه عبد الله]]، فالـ LIKE هيلاقيها. و [[word_similarity(ar_normalize('اسامه'), name_norm)]] هيطلع [[1]] لأن الكلمة موجودة بالكامل جوه الاسم.

[[ابراهم]] (ناقصها ي): الـ LIKE مش هيلاقي حاجة لأن النص مش موجود بالحرف. أما [[ar_normalize('ابراهم') <% name_norm]] هيلاقي [[أحمد إبراهيم]] لأن أغلب الـ trigrams مشتركة. ده الفرق: التطبيع بيحل اختلاف الكتابة، و pg_trgm بيحل الأخطاء.

في EXPLAIN ANALYZE قبل الـ index هتلاقي [[Seq Scan on teachers]] ومعاها [[Rows Removed by Filter]] بالآلاف، وبعده [[Bitmap Index Scan on teachers_name_trgm]]. وخد بالك: pg_trgm محتاج ٣ حروف على الأقل في البحث عشان يستخدم الـ index بكفاءة، فالبحث بحرفين بيقرا كتير.`,
          solCode: R`SELECT name FROM teachers WHERE name_norm LIKE '%' || ar_normalize('اسامه') || '%';
SELECT name, word_similarity(ar_normalize('اسامه'), name_norm) AS score
FROM teachers WHERE ar_normalize('اسامه') <% name_norm;

SELECT name FROM teachers WHERE name_norm LIKE '%' || ar_normalize('ابراهم') || '%';
SELECT name FROM teachers WHERE ar_normalize('ابراهم') <% name_norm;

DROP INDEX teachers_name_trgm;
INSERT INTO teachers (name) SELECT 'مدرس رقم ' || g FROM generate_series(1, 5000) g;
ANALYZE teachers;
EXPLAIN ANALYZE SELECT name FROM teachers WHERE name_norm LIKE '%فاطمه%';
CREATE INDEX teachers_name_trgm ON teachers USING gin (name_norm gin_trgm_ops);
EXPLAIN ANALYZE SELECT name FROM teachers WHERE name_norm LIKE '%فاطمه%';`,
          flag: "script",
          deep: {
            why: "في منصة تعليمية، أو متجر، أو نظام موظفين مصري، أغلب البحث بأسماء عربي. اليوزر بيكتب بسرعة من الموبايل من غير همزات، أو بيغلط حرف. لو البحث مش بيستحمل ده، اليوزر هيقول «الاسم مش موجود» وهو موجود، وده بيبان للعميل كأنه bug.",
            how: R`التطبيع: [[regexp_replace(..., '[ً-ْـ]', '', 'g')]] بيشيل التشكيل (الفتحة والضمة والكسرة والتنوين والشدة والسكون، من U+064B لـ U+0652) والتطويل (U+0640). و [[translate(نص, 'أإآٱةى', 'ااااهي')]] بيبدّل كل حرف من الأولى باللي قصاده في التانية بالترتيب، فعدد الحروف لازم يبقى متساوي والترتيب مظبوط. [[lower]] عشان لو فيه إنجليزي في الاسم.

القاعدة الذهبية: نفس الدالة على المتخزن وعلى كلام البحث. لو طبّعت واحد بس، مفيش حاجة هتطابق.

ليه ة تبقى ه مش العكس؟ الاتنين شغالين طالما ثابت. المهم إن «فاطمة» و «فاطمه» يبقوا نفس النص بعد التطبيع.

[[pg_trgm]] بيقطّع النص لـ trigrams (كل ٣ حروف ورا بعض)، و [[similarity(a, b)]] = نسبة الـ trigrams المشتركة من ٠ لـ ١. [[a % b]] معناها «التشابه أكبر من [[pg_trgm.similarity_threshold]]» (الافتراضي 0.3). و [[word_similarity(كلمة, نص)]] مع [[<%]] بيدوّر على الكلمة جوه نص أطول، وده الأنسب لما اليوزر يكتب جزء من الاسم.

الـ index [[gin (col gin_trgm_ops)]] بيخدم [[%]] و [[<%]] و [[LIKE '%x%']] و [[ILIKE]] كمان. يعني نفس الـ index بيحل مشكلة «LIKE بـ % في الأول مبيستخدمش index» من درس LIKE و ILIKE.

والـ full-text بالعربي: Postgres فيه configuration [[arabic]] بيعمل stemming ([[to_tsvector('arabic', 'المدرسون')]] بتطلع [['مدرس']])، بس مبيطبّعش الهمزات والتاء المربوطة. فلو محتاجه: [[to_tsvector('arabic', ar_normalize(body))]] في العمود الـ generated، ونفس الحاجة في البحث.

و Supabase فيه pg_trgm و unaccent جاهزين، فعّلهم من Database ← Extensions.`,
            when: "أي بحث بأسماء عربي (مدرسين، وطلاب، وعملاء، ومنتجات)، وأي بحث لازم يستحمل أخطاء إملائية أو autocomplete. للنصوص الطويلة: full-text على النص المتطبّع، ومعاه pg_trgm للأسماء.",
            mistakes: R`تطبّع المتخزن وتنسى تطبّع كلام البحث (أو العكس). [[translate]] بعدد حروف مختلف أو ترتيب غلط، فالتاء المربوطة تبقى ي (حصلت وانا بكتب الدرس ده). الدالة من غير IMMUTABLE فالعمود الـ generated يرفض. threshold عالي فمفيش نتايج، أو واطي فكل حاجة تطلع. بحث بحرف أو حرفين على trigram index. و ILIKE على name الأصلي وتفتكر إنه هيلاقي «احمد» جوه «أحمد».`
          },
          lines: [
            "فعّل extension الـ trigrams.",
            "دالة التطبيع: نص داخل ونص خارج،",
            "IMMUTABLE: نفس المدخل يرجّع نفس المخرج دايمًا (شرط الـ index).",
            "شيل التشكيل والتطويل، وبعدين بدّل الهمزات بـ ا، و ة بـ ه، و ى بـ ي.",
            "قفلة.",
            "جرّب: محمد احمد ابراهيم مدرسه مصطفي القاهره.",
            "جدول المدرسين:",
            "رقم،",
            "الاسم زي ما اتكتب (للعرض)،",
            "والاسم المتطبّع، بيتحسب لوحده.",
            "قفلة.",
            "trigram index على الاسم المتطبّع.",
            "٤ مدرسين بهمزات وتشكيل وتاء مربوطة.",
            "«فاطمه» بالهاء لقت «فاطمة» بالتاء، لأن الاتنين اتطبّعوا.",
            "بحث بغلطة إملائية: درجة التشابه،",
            "من المدرسين،",
            "اللي تشابههم فوق الحد (0.3 افتراضيًا)،",
            "الأقرب الأول.",
            "من غير تطبيع: مفيش نتيجة، لأن المتخزن «أحمد» بهمزة."
          ]
        }
      ]
    }
]);
