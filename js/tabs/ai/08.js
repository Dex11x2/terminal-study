// تكملة تاب ai: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/ai/01.js (شرح حقول الدرس في أوله)
MORE("ai", [
    {
      t: "agents بجد",
      l: 2,
      n: "لوب الأدوات بإيدك بحد للخطوات والفلوس، و toolRunner بأدوات MCP، وإمتى workflow ثابت أحسن من agent، و eval بيقيس الـ agent نفسه",
      items: [
        {
          cmd: "agent loop",
          title: "agent بكذا أداة، بحد للخطوات وحد للفلوس",
          desc: R`الـ agent = موديل في لوب: يطلب أداة، كودك ينفّذها ويرجّع النتيجة، يطلب تاني، لحد ما يرد رد نهائي. الفرق عن درس [[tool calling]]: هنا كذا أداة والموديل هو اللي بيقرر الترتيب وعدد الخطوات، فلازم انت تحط الحدود: أقصى عدد خطوات، وأقصى فلوس، وتتعامل مع كل [[stop_reason]] مش [[tool_use]] و [[end_turn]] بس.
وكل خطوة بتبعت التاريخ كله تاني، فالتكلفة بتكبر مع كل خطوة. عشان كده الحد بالفلوس أهم من الحد بالعدد.`,
          example: R`import Anthropic from "@anthropic-ai/sdk";
const client = new Anthropic();
const MODEL = "claude-opus-5-5";
const PRICE = { in: 4 / 1e6, out: 20 / 1e6 };
const MAX_STEPS = 6;
const MAX_USD = 0.05;
const TOOLS = {
  get_free_slots: {
    description: "المواعيد الفاضية لملعب في يوم معين (date بشكل YYYY-MM-DD).",
    input_schema: { type: "object", properties: { date: { type: "string" }, field: { type: "string" } }, required: ["date", "field"], additionalProperties: false },
    run: ({ date, field }) => ({ date, field, free: ["18:00", "21:00"] }),
  },
  search_policy: {
    description: "بيدوّر في سياسات الملعب (الإلغاء، الدفع، المواعيد) ويرجّع الفقرة المناسبة.",
    input_schema: { type: "object", properties: { query: { type: "string" } }, required: ["query"], additionalProperties: false },
    run: ({ query }) => ({ query, text: "الإلغاء مجاني قبل الميعاد بـ ٢٤ ساعة." }),
  },
};
const tools = Object.entries(TOOLS).map(([name, t]) => ({ name, description: t.description, input_schema: t.input_schema, strict: true }));
const messages = [{ role: "user", content: process.argv[2] ?? "فيه ميعاد فاضي في ملعب ١ يوم 2026-10-02؟ ولو لغيت هدفع حاجة؟" }];
let usd = 0;
for (let step = 1; ; step++) {
  if (step > MAX_STEPS) { console.log("وقفت: عدّى", MAX_STEPS, "خطوات"); break; }
  const res = await client.messages.create({ model: MODEL, max_tokens: 4096, tools, messages });
  usd += res.usage.input_tokens * PRICE.in + res.usage.output_tokens * PRICE.out;
  console.error($__bt#$__{step} $__{res.stop_reason} in=$__{res.usage.input_tokens} out=$__{res.usage.output_tokens} total=$$__{usd.toFixed(4)}$__bt);
  messages.push({ role: "assistant", content: res.content });
  if (res.stop_reason === "end_turn") { console.log(res.content.filter((b) => b.type === "text").map((b) => b.text).join("")); break; }
  if (res.stop_reason !== "tool_use") { console.log("وقف بسبب:", res.stop_reason); break; }
  if (usd > MAX_USD) { console.log("وقفت: الميزانية خلصت", usd.toFixed(4)); break; }
  const results = [];
  for (const block of res.content.filter((b) => b.type === "tool_use")) {
    const tool = TOOLS[block.name];
    let out;
    try { out = tool ? await tool.run(block.input) : { error: "أداة مش معروفة: " + block.name }; }
    catch (e) { out = { error: e.message }; }
    console.error("   ", block.name, JSON.stringify(block.input), "->", JSON.stringify(out));
    results.push({ type: "tool_result", tool_use_id: block.id, content: JSON.stringify(out), is_error: !tool || "error" in out });
  }
  messages.push({ role: "user", content: results });
}`,
          try: R`شغّله بسؤال عادي، وبعدين نزّل [[MAX_USD]] لـ [[0.01]] وشغّله بسؤال بيخلي الموديل يلف كتير. وبعدين خلي [[run]] بتاعة [[search_policy]] ترمي [[throw new Error("الخدمة واقعة")]] وشوف الـ trace: الأداة فشلت، والـ agent كمل ولا وقع؟ وفي الآخر اكتب على ورقة: لو ١٠٠٠ مستخدم سألوا نفس السؤال، الفاتورة كام؟`,
          flag: "script",
          deep: {
            why: "agent من غير حدود ممكن يلف ٤٠ خطوة على سؤال واحد (أداة بترجّع خطأ والموديل يعيد، أو بيدوّر على حاجة مش موجودة)، وكل خطوة أغلى من اللي قبلها. أول فاتورة غريبة بتيجي من هنا. والحدود كمان بتحمي من prompt injection بيحاول يخلي الـ agent يعمل حاجات كتير.",
            how: R`كل دورة: (١) تبعت [[messages]] كلها و [[tools]]. (٢) تحسب تكلفة الرد من [[usage]]: [[input_tokens]] في سعر الـ input و [[output_tokens]] (فيها التفكير) في سعر الـ output. (٣) تضيف الرد كله للتاريخ. (٤) تشوف [[stop_reason]]: [[end_turn]] خلص؛ [[tool_use]] عايز أدوات؛ أي حاجة تانية ([[max_tokens]] اتقطع، [[refusal]] رفض، [[pause_turn]] أداة سيرفر طوّلت ولازم تبعت تاني تكمّل) تتعامل معاها صراحة بدل ما تعتبرها نجاح. (٥) تنفّذ **كل** الـ [[tool_use]] اللي في الرد، وترجّع نتايجهم في رسالة user **واحدة**، كل واحدة بـ [[tool_use_id]] بتاعها، والفاشلة بـ [[is_error: true]] ورسالة واضحة (الموديل غالبًا بيصلّح ويكمّل).

ليه التكلفة بتكبر: الـ API مبيفتكرش، فكل دورة بتبعت السؤال والردود ونتايج الأدوات اللي قبلها. في التجربة الـ [[input_tokens]] كانت 193 ثم 321 ثم 452. agent بـ ٢٠ خطوة ونتايج أدوات كبيرة ممكن يبعت مئات الآلاف من الـ tokens. الحلول: نتايج أدوات صغيرة (رجّع الحقول المهمة بس)، و prompt caching للجزء الثابت (درس [[prompt caching]])، وحد بالفلوس.

الأسعار هنا بتاعة [[claude-opus-5-5]]: ٤ دولار لكل مليون token input و ٢٠ للـ output (من صفحة الأسعار وقت الكتابة؛ راجعها). وفيه حاجات الكود ده مش بيحسبها: الكاش بيخلي الـ input المتكرر أرخص بكتير، فالرقم هنا حد أعلى.

الـ trace ([[console.error]] لكل خطوة وكل أداة) مش رفاهية: لما الـ agent يعمل حاجة غريبة، ده الطريق الوحيد تعرف ليه. في الإنتاج بيتحفظ في لوج (من غير بيانات شخصية، درس [[لوج من غير PII]]) ومعاه id للطلب.

وفي الـ API فيه مساعدات لنفس الفكرة: [[task_budget]] (beta) بيدّي الموديل نفسه ميزانية tokens يرتّب شغله عليها، و tool runner في الـ SDK بيعمل اللوب ده لوحده (الدرس الجاي). بس اللوب اليدوي ده هو اللي بيفهّمك هما بيعملوا إيه.`,
            when: "لما المهمة محتاجة كذا خطوة والموديل لازم يقرر الخطوة الجاية حسب نتيجة اللي قبلها (يدوّر، يقرا، يقرر يدوّر تاني). ولو الخطوات معروفة من الأول، اكتبها workflow ثابت (درس [[agent ولا workflow؟]]).",
            mistakes: R`لوب [[while (true)]] من غير حد. وتعتبر أي [[stop_reason]] غير [[tool_use]] نجاح، فرد اتقطع عند [[max_tokens]] يتعرض للمستخدم كأنه كامل. وترجّع نتيجة كل أداة في رسالة لوحدها (لازم كلهم في رسالة واحدة بعد الرد). وأداة بترمي exception فاللوب كله يقع بدل ما ترجع [[is_error]]. وتحسب التكلفة بـ [[output_tokens]] بس وتنسى إن الـ input هو اللي بيكبر.`
          },
          teach: R`## لوب الـ agent بحدود

الكود بيدّي الموديل أداتين ([[get_free_slots]] و [[search_policy]])، ويسيبه يطلب اللي محتاجه خطوة خطوة. كل خطوة بتتحسب تكلفتها، واللوب بيقف عند أول حاجة من دول: الموديل خلص، أو رد بحاجة غير طلب أداة، أو عدد الخطوات عدّى ٦، أو الفلوس عدّت ٥ سنت.

> اتشغّل على ويندوز بـ Node 24.22 و [[@anthropic-ai/sdk]] 1.3.0، والـ SDK متوجّه لـ mock محلي بـ [[ANTHROPIC_BASE_URL=http://127.0.0.1:4010]] و [[ANTHROPIC_API_KEY]] وهمي. الـ mock بيرد بنفس شكل Messages API (blocks و [[stop_reason]] و [[usage]])، وبيرفض [[tool_result]] من غير [[tool_use]] قبله زي الحقيقي، وبيقرر يطلب الأدوات بالترتيب. **قرارات الموديل والأرقام من الـ mock**؛ اللوب والحدود والحسابات حقيقية. وعشان نجرّب الحدود، الـ mock بيفضل يطلب نفس الأداة لو الرسالة فيها [[#loop]].

---

## ١. الإعدادات

~~~text
const MODEL = "claude-opus-5-5";
const PRICE = { in: 4 / 1e6, out: 20 / 1e6 };
const MAX_STEPS = 6;
const MAX_USD = 0.05;
~~~

- [[4 / 1e6]]: [[1e6]] = مليون. السعر ٤ دولار لكل مليون token input، يعني ٠.٠٠٠٠٠٤ للـ token. والـ output ٢٠ دولار للمليون.
- [[MAX_STEPS]]: أقصى عدد طلبات للموديل. [[MAX_USD]]: أقصى فلوس للسؤال الواحد.

---

## ٢. الأدوات: [[const TOOLS = { ... }]]

كل أداة في مكان واحد: الوصف، والـ schema، والدالة اللي بتنفّذ ([[run]]). كده لما تضيف أداة بتضيفها في سطر واحد.

### [[const tools = Object.entries(TOOLS).map(([name, t]) => ({ name, description, input_schema, strict: true }));]]

- [[Object.entries(TOOLS)]]: بيحوّل الـ object لقايمة أزواج [[[اسم, قيمة]]].
- [[([name, t]) =>]]: (destructuring) كل زوج بيتفك لـ [[name]] و [[t]].
- بنبني الشكل اللي الـ API عايزه **من غير** [[run]] (الدالة متتبعتش للموديل). و [[strict: true]]: المدخلات لازم تطابق الـ schema (شوف درس [[tool calling]]).

---

## ٣. [[for (let step = 1; ; step++) {]]

لوب من غير شرط في النص ([[; ;]]): الخروج بـ [[break]] من جوه بس، في ٤ أماكن. وأولهم:

### [[if (step > MAX_STEPS) { ... break; }]]

قبل ما تبعت الطلب السابع، اقف.

### [[const res = await client.messages.create({ model: MODEL, max_tokens: 4096, tools, messages });]]

كل دورة بتبعت التاريخ **كله**.

### [[usd += res.usage.input_tokens * PRICE.in + res.usage.output_tokens * PRICE.out;]]

تكلفة الرد ده بتتجمع على اللي قبله. أول خطوة في التجربة: [[in=193 out=108]]:

~~~text الحساب
193 × 0.000004 = 0.000772
108 × 0.000020 = 0.002160
المجموع       = 0.002932  →  $0.0029
~~~

الـ output أغلى ٥ مرات من الـ input، والتفكير بيتحسب output.

### [[console.error($__bt#$__{step} ...$__bt);]]

سطر trace على stderr لكل خطوة: رقمها، و [[stop_reason]]، والـ tokens، والإجمالي. [[$$__{usd.toFixed(4)}]]: أول [[$]] حرف عادي (علامة الدولار)، وبعده [[$__{...}]] قيمة. و [[toFixed(4)]]: ٤ أرقام بعد العلامة.

### [[messages.push({ role: "assistant", content: res.content });]]

الرد كله (بالـ thinking والـ tool_use) يتضاف للتاريخ. من غيره الطلب الجاي هيرجع 400.

---

## ٤. الـ ٣ مخارج التانية

| الشرط | ليه |
|---|---|
| [[res.stop_reason === "end_turn"]] | الموديل خلص: اطبع النص واخرج |
| [[res.stop_reason !== "tool_use"]] | أي حاجة تانية ([[max_tokens]]، [[refusal]]، [[pause_turn]]) مش نجاح: اطبع السبب واخرج (أو تعامل معاها) |
| [[usd > MAX_USD]] | الفلوس خلصت: متنفّذش الأدوات اللي اتطلبت واخرج |

الترتيب مقصود: بنحسب التكلفة **قبل** ما نقرر ننفّذ الأدوات.

---

## ٥. تنفيذ الأدوات

~~~text
const results = [];
for (const block of res.content.filter((b) => b.type === "tool_use")) {
  const tool = TOOLS[block.name];
  let out;
  try { out = tool ? await tool.run(block.input) : { error: "أداة مش معروفة: " + block.name }; }
  catch (e) { out = { error: e.message }; }
  console.error("   ", block.name, JSON.stringify(block.input), "->", JSON.stringify(out));
  results.push({ type: "tool_result", tool_use_id: block.id, content: JSON.stringify(out), is_error: !tool || "error" in out });
}
messages.push({ role: "user", content: results });
~~~

- [[.filter((b) => b.type === "tool_use")]]: كل طلبات الأدوات في الرد (ممكن أكتر من واحدة).
- [[TOOLS[block.name]]]: الأداة بالاسم. لو الموديل طلب اسم مش موجود، [[tool]] بتبقى [[undefined]] ونرجّعله خطأ بدل ما الكود يقع.
- [[try { ... } catch (e) { ... }]]: لو الأداة رمت exception (الداتابيز واقعة مثلًا) بتتحول نتيجة فيها [[error]]، واللوب يكمّل.
- [[is_error: !tool || "error" in out]]: [[true]] لو الأداة مش موجودة أو النتيجة فيها [[error]]. [[in]] بيسأل «الـ object فيه المفتاح ده؟».
- كل النتايج في رسالة user **واحدة** بعد اللوب.

---

## ٦. التجربة

~~~text الناتج (سؤال عادي)
#1 tool_use in=193 out=108 total=$0.0029
    get_free_slots {"date":"2026-10-02","field":"ملعب ١"} -> {"date":"2026-10-02","field":"ملعب ١","free":["18:00","21:00"]}
#2 tool_use in=321 out=103 total=$0.0063
    search_policy {"query":"الإلغاء"} -> {"query":"الإلغاء","text":"الإلغاء مجاني قبل الميعاد بـ ٢٤ ساعة."}
#3 end_turn in=452 out=125 total=$0.0106
تمام. اللي لقيته: {"date":"2026-10-02","field":"ملعب ١","free":["18:00","21:00"]} | {"query":"الإلغاء","text":"الإلغاء مجاني قبل الميعاد بـ ٢٤ ساعة."}
~~~

بص على [[in=]]: 193 ثم 321 ثم 452. كل خطوة بتبعت اللي قبلها كله، فالـ input بيكبر مع كل خطوة.

~~~text الناتج: node agent.mjs "جرّب #loop"
#1 tool_use in=171 out=108 total=$0.0028
...
#6 tool_use in=814 out=108 total=$0.0248
    get_free_slots {"date":"2026-10-02","field":"ملعب ١"} -> {...}
وقفت: عدّى 6 خطوات
~~~

~~~text الناتج: نفس السؤال و MAX_USD = 0.01
#1 tool_use in=171 out=108 total=$0.0028
#2 tool_use in=300 out=108 total=$0.0062
#3 tool_use in=428 out=108 total=$0.0101
وقفت: الميزانية خلصت 0.0101
~~~

حد الفلوس وقف قبل حد الخطوات. وفي الخطوة التالتة الأداة **متنفّذتش** لأن الشرط قبل التنفيذ.

---

## الخلاصة

| الحد | بيحمي من |
|---|---|
| [[MAX_STEPS]] | لوب ملوش آخر |
| [[MAX_USD]] | خطوات قليلة بس كل واحدة غالية (التاريخ بيكبر) |
| فحص كل [[stop_reason]] | رد مقطوع أو رفض يتعرض كأنه إجابة |
| [[try/catch]] و [[is_error]] | أداة واقعة توقّع الـ agent كله |
| الـ trace | «الـ agent عمل كده ليه؟» |`,
          lines: [
            "الـ SDK.",
            "الـ client (المفتاح من البيئة).",
            "الموديل.",
            "السعر لكل token: ٤ و ٢٠ دولار لكل مليون.",
            "أقصى عدد خطوات.",
            "أقصى فلوس للسؤال الواحد.",
            "كل الأدوات في مكان واحد.",
            "أداة المواعيد:",
            "وصفها.",
            "مدخلاتها: date و field إجباريين ومفيش غيرهم.",
            "الدالة اللي بتنفّذ (هنا رد ثابت).",
            "قفلة الأداة.",
            "أداة السياسات:",
            "وصفها.",
            "مدخلاتها: query.",
            "الدالة اللي بتنفّذ.",
            "قفلة الأداة.",
            "قفلة TOOLS.",
            "ابني قايمة الأدوات للـ API من غير run، و strict.",
            "السؤال من الترمنال أو سؤال افتراضي.",
            "إجمالي الفلوس.",
            "لوب بيخرج بـ break بس.",
            "حد الخطوات.",
            "ابعت التاريخ كله.",
            "زوّد تكلفة الرد ده.",
            "سطر trace على stderr.",
            "ضيف الرد كله للتاريخ.",
            "خلص: اطبع النص واخرج.",
            "أي سبب تاني غير طلب أداة: اطبعه واخرج.",
            "الميزانية خلصت: اخرج قبل ما تنفّذ.",
            "نتايج الأدوات.",
            "لف على كل طلبات الأدوات في الرد.",
            "هات الأداة بالاسم.",
            "متغير للنتيجة.",
            "نفّذها، أو خطأ لو الاسم مش معروف.",
            "لو رمت exception حوّله نتيجة فيها error.",
            "trace لكل أداة.",
            "النتيجة مربوطة بالطلب، و [[is_error]] لو فشلت.",
            "قفلة لوب الأدوات.",
            "كل النتايج في رسالة user واحدة.",
            "قفلة اللوب."
          ],
          sol: R`بـ [[MAX_USD = 0.01]] وسؤال بيلف: اللوب بيقف بعد ٣ خطوات بـ [[وقفت: الميزانية خلصت 0.0101]] (الأرقام من الـ mock)، قبل حد الخطوات.

لما [[search_policy]] ترمي [[Error("الخدمة واقعة")]]: الـ [[catch]] بيحوّلها [[{"error":"الخدمة واقعة"}]]، والـ trace بيطبع [[search_policy {...} -> {"error":"الخدمة واقعة"}]]، و [[is_error]] بيبقى [[true]]، واللوب بيكمّل. الموديل الحقيقي غالبًا هيقول للمستخدم إنه مش قادر يجيب السياسة دلوقتي؛ الـ mock بيرد بالنتايج زي ما هي.

الحساب: السؤال العادي كلّف حوالي [[$0.0106]] في الـ mock. × ١٠٠٠ = حوالي ١٠ دولار. والموديل الحقيقي بيكتب ويفكر أكتر من الـ mock، فالرقم الحقيقي غالبًا أعلى، وده بالظبط ليه بتقيس [[usage]] من طلبات حقيقية قبل ما تحدد [[MAX_USD]].`
        },
        {
          cmd: "toolRunner و MCP",
          title: "الـ SDK يلف اللوب، والأدوات من MCP server",
          desc: R`[[client.beta.messages.toolRunner()]] في الـ SDK بتاع Anthropic بيعمل لوب الـ agent لوحده: يبعت، ولو الموديل طلب أداة يشغّل الـ [[run]] بتاعها، ويرجّع النتيجة، ويعيد. و [[mcpTools()]] بيحوّل أدوات أي MCP server لأدوات الـ runner يفهمها، فالـ agent بتاعك يستخدم نفس السيرفر اللي Claude Code بيستخدمه.
بس الحدود لسه شغلتك: [[max_iterations]] بيوقّف اللوب، ولما يوقفه **مش** بيرمي error، فلازم تبص على [[stop_reason]] بتاع آخر رد.`,
          example: R`import Anthropic from "@anthropic-ai/sdk";
import { mcpTools } from "@anthropic-ai/sdk/helpers/beta/mcp";
import { Client } from "@modelcontextprotocol/client";
import { StdioClientTransport } from "@modelcontextprotocol/client/stdio";
const mcp = new Client({ name: "fields-agent", version: "1.0.0" });
await mcp.connect(new StdioClientTransport({ command: "node", args: ["server.mjs"] }));
const { tools } = await mcp.listTools();
const anthropic = new Anthropic();
const runner = anthropic.beta.messages.toolRunner({
  model: "claude-opus-5-5",
  max_tokens: 4096,
  max_iterations: 5,
  tools: mcpTools(tools, mcp),
  messages: [{ role: "user", content: process.argv[2] ?? "فيه ميعاد فاضي في ملعب ١ يوم 2026-10-02؟" }],
});
for await (const msg of runner) {
  console.error(msg.stop_reason, msg.content.map((b) => b.type).join(","), msg.usage.input_tokens, msg.usage.output_tokens);
}
const final = await runner.done();
if (final.stop_reason !== "end_turn") console.log("مخلصش:", final.stop_reason);
else console.log(final.content.filter((b) => b.type === "text").map((b) => b.text).join(""));
await mcp.close();`,
          try: R`حط الكود جنب [[server.mjs]] بتاع درس [[MCP server بـ TypeScript]] وسطّب [[@anthropic-ai/sdk]] و [[@modelcontextprotocol/client]]. وبعدين نزّل [[max_iterations]] لـ [[1]] وشوف إيه اللي بيتطبع، وضيف أداة تانية في السيرفر ([[get_price]]) من غير ما تغيّر سطر في الـ agent.`,
          flag: "script",
          deep: {
            why: "اللوب اليدوي (الدرس اللي فات) بتكتبه مرة عشان تفهم. في الشغل الحقيقي الـ runner بيوفّر عليك كود متكرر وأخطاء صغيرة (نسيت [[tool_use_id]]، أو رجّعت النتايج في رسايل منفصلة). و MCP بيخلي الأدوات نفسها مكتوبة مرة وبتتستخدم من Claude Code ومن الـ agent بتاعك.",
            how: R`[[mcp.listTools()]] بيرجّع الأدوات بالـ [[inputSchema]] بتاعها. [[mcpTools(tools, mcp)]] بيلف كل واحدة في أداة ليها [[name]] و [[description]] و [[input_schema]] (اللي بيتبعتوا للموديل) و [[run]] (بتنادي [[mcp.callTool]]). لو السيرفر رجّع [[isError]]، الـ [[run]] بيرمي [[ToolError]]، والـ runner بيحوّله [[tool_result]] فيه [[is_error: true]] (جربناها بتاريخ غلط).

الـ runner object تقدر تلف عليه بـ [[for await]]: كل لفة رد واحد من الموديل (بعده الـ runner بينفّذ الأدوات لوحده). ده مكانك للـ trace وللتكلفة. [[runner.done()]] بيرجّع آخر رد. ولو عايز توقف قبل أداة خطيرة، الـ runner فيه [[setMessagesParams]] و [[pushMessages]] و [[deferToolCall]] تتحكم بيهم بين اللفات، أو تخلي [[run]] نفسها تطلب تأكيد.

[[max_iterations: 5]]: أقصى ٥ طلبات للموديل. لما يخلصوا والموديل لسه بيطلب أدوات، الـ runner بيقف ويرجّع آخر رد عادي، و [[stop_reason]] بتاعه [[tool_use]]. من غير السطر اللي بيفحصه، كنت هتطبع «هشوف get_free_slots.» للمستخدم كأنها إجابة.

ملاحظة عن النسخة 1.3 من الـ SDK: الـ runner افتراضيًا بيستخدم «thread» على السيرفر (beta [[message-threads-2026-08-12]]): أول طلب بيطلب من الـ API يحفظ المحادثة، والطلبات اللي بعده بتبعت الرسايل الجديدة بس ومعاها id الرد اللي قبلها. في التجربة الـ body نزل من 738 لـ 372 byte. ده بيقلل اللي بيتبعت على الشبكة، بس الموديل لسه بيقرا التاريخ كله، فالـ [[input_tokens]] لسه بتكبر. ولو عايز تبعت التاريخ كامل كل مرة (زي اللوب اليدوي) فيه [[thread: false]].

والـ runner beta، يعني الـ API بتاعه ممكن يتغير. ثبّت نسخة الـ SDK في [[package.json]].`,
            when: "أغلب الـ agents اللي أدواتها بتاعتك: الـ runner أقل كود. واللوب اليدوي لما تحتاج تحكم كامل (ميزانية بالفلوس بتوقف قبل التنفيذ، أو transport غريب، أو مش عايز تعتمد على beta). و [[mcpTools]] لما الأدوات أصلًا موجودة كـ MCP server أو هتستخدمها من أكتر من مكان.",
            mistakes: R`تفتكر إن [[max_iterations]] بيرمي error لما يخلص. وتنسى [[mcp.close()]] فالـ process بتاع السيرفر يفضل شغال والسكربت ميخلصش. وتدّي الـ agent كل أدوات السيرفر وهو محتاج واحدة (فلتر [[tools]] قبل [[mcpTools]]). وتستخدم سيرفر MCP مش بتاعك في agent بيشتغل لوحده من غير موافقة بني آدم على الأدوات اللي بتكتب.`
          },
          teach: R`## agent في ٢٢ سطر، والأدوات جاية من MCP

الكود بيشغّل [[server.mjs]] (MCP server بتاع المواعيد) ويتصل بيه، وياخد أدواته ويديها للموديل عن طريق الـ tool runner بتاع الـ SDK. الـ runner بيلف لوحده: الموديل يطلب أداة، الـ runner ينادي السيرفر، يرجّع النتيجة، لحد ما الموديل يخلص أو الـ ٥ لفات يخلصوا.

> اتشغّل على ويندوز بـ Node 24.22 و [[@anthropic-ai/sdk]] 1.3.0 و [[@modelcontextprotocol/client]] 2.4.0، والـ SDK متوجّه لـ mock محلي ([[ANTHROPIC_BASE_URL]]) بيرد بشكل Messages API ويدعم الـ threads (حسب الـ types في الـ SDK). السيرفر MCP حقيقي. قرارات الموديل ونصه والأرقام من الـ mock.

---

## ١. الـ imports

| السطر | ليه |
|---|---|
| [[import Anthropic from "@anthropic-ai/sdk";]] | الـ client |
| [[import { mcpTools } from "@anthropic-ai/sdk/helpers/beta/mcp";]] | بيحوّل أدوات MCP لأدوات الـ runner |
| [[import { Client } from "@modelcontextprotocol/client";]] | MCP client |
| [[import { StdioClientTransport } from "@modelcontextprotocol/client/stdio";]] | يشغّل السيرفر ويكلّمه على stdio |

---

## ٢. الاتصال بالسيرفر

~~~text
const mcp = new Client({ name: "fields-agent", version: "1.0.0" });
await mcp.connect(new StdioClientTransport({ command: "node", args: ["server.mjs"] }));
const { tools } = await mcp.listTools();
~~~

نفس اللي عملناه في درس الـ client: شغّل السيرفر كـ process، وهات أدواته. و [[{ tools }]] بتطلّع الخانة [[tools]] من الرد.

[[mcpTools(tools, mcp)]] بيرجّع لكل أداة object فيه:

~~~text الناتج: Object.keys(mcpTools(tools, mcp)[0])
[ 'name', 'input_schema', 'description', 'run', 'parse' ] get_free_slots function
~~~

[[run]] بتنادي [[mcp.callTool]]. جربناها بإيدنا بتاريخ ٣٠ فبراير:

~~~text الناتج
THROWN: ToolError: Input validation error: Invalid arguments for tool get_free_slots: date: Invalid ISO date
~~~

يعني [[isError]] من السيرفر بيبقى [[ToolError]]، والـ runner بيبعته للموديل كـ [[tool_result]] بـ [[is_error: true]] (الـ mock سجّل [[is_error=true]] لما جربنا).

---

## ٣. [[const runner = anthropic.beta.messages.toolRunner({ ... });]]

| الخانة | معناها |
|---|---|
| [[model]] و [[max_tokens]] و [[messages]] | زي [[messages.create]] بالظبط |
| [[max_iterations: 5]] | أقصى ٥ طلبات للموديل |
| [[tools: mcpTools(tools, mcp)]] | أدوات فيها [[run]]، فالـ runner يعرف ينفّذها لوحده |

[[beta]] في الاسم: الميزة لسه بتتغير، فثبّت نسخة الـ SDK.

---

## ٤. [[for await (const msg of runner) { ... }]]

[[for await]] بيلف على حاجة بتطلع قيمها واحدة واحدة مع الوقت. هنا كل [[msg]] رد من الموديل، وبعد كل رد فيه [[tool_use]] الـ runner بينفّذ الأدوات قبل اللفة الجاية. السطر جوه trace: سبب الوقوف، وأنواع الـ blocks، والـ tokens.

~~~text الناتج (stderr)
fields MCP server ready on stdio
tool_use thinking,text,tool_use 183 108
end_turn thinking,text 313 112
~~~

لفتين: الأولى طلب أداة، والتانية الإجابة.

---

## ٥. [[const final = await runner.done();]] والفحص

~~~text
if (final.stop_reason !== "end_turn") console.log("مخلصش:", final.stop_reason);
else console.log(final.content.filter((b) => b.type === "text").map((b) => b.text).join(""));
~~~

~~~text الناتج (stdout)
تمام. اللي لقيته: [{"type":"text","text":"{\"date\":\"2026-10-02\",\"field\":\"ملعب ١\",\"free\":[\"18:00\",\"21:00\"]}"}]
~~~

(الـ mock بيرجّع نتيجة الأداة زي ما هي؛ الموديل الحقيقي بيكتب جملة زي «فيه ميعادين: ٦ و ٩ بالليل».)

وبالسؤال اللي بيخلي الـ mock يلف ([[#loop]]):

~~~text الناتج
tool_use thinking,text,tool_use 168 108
tool_use thinking,text,tool_use 299 108
tool_use thinking,text,tool_use 429 108
tool_use thinking,text,tool_use 560 108
tool_use thinking,text,tool_use 690 108
مخلصش: tool_use
~~~

٥ لفات ووقف **من غير أي error**. آخر رد [[stop_reason]] بتاعه [[tool_use]] ونصه «هشوف get_free_slots.». من غير الفحص، ده اللي كان هيوصل للمستخدم.

---

## ٦. الـ threads (حاجة جديدة في 1.3)

الـ mock سجّل الطلبات:

~~~text الناتج (لوج الـ mock)
MOCK POST /v1/messages message-threads-2026-08-12 738B
MOCK POST /v1/messages message-threads-2026-08-12 372B
~~~

الـ runner بيبعت header اسمه [[anthropic-beta: message-threads-2026-08-12]]: أول طلب بيقول للـ API «احفظ المحادثة»، والتاني بيبعت نتيجة الأداة بس ومعاها id الرد اللي قبلها، فالـ body أصغر بالنص. لكن الـ [[input_tokens]] (183 ثم 313) لسه بتكبر، لأن الموديل بيقرا التاريخ كله. [[thread: false]] في الإعدادات بيرجّعه يبعت كله كل مرة.

---

## ٧. [[await mcp.close();]]

بيقفل الاتصال والـ process بتاع السيرفر. من غيره Node هيفضل مستني والسكربت مش هيخلص.

---

## الخلاصة

| | اللوب اليدوي | [[toolRunner]] |
|---|---|---|
| الكود | انت بتكتب الدورة كلها | انت بتكتب الأدوات بس |
| الحد | أي شرط تحبه (فلوس، وقت) | [[max_iterations]]، والباقي في [[for await]] |
| لما الحد يخلص | انت بتقرر | آخر رد بـ [[stop_reason: "tool_use"]] من غير error |
| beta | لأ | أيوه |

- [[mcpTools]] = نفس أدوات Claude Code جوه الـ agent بتاعك.
- افحص [[final.stop_reason]] دايمًا، واقفل الـ MCP client.`,
          lines: [
            "الـ SDK بتاع Anthropic.",
            "الـ helper اللي بيحوّل أدوات MCP لأدوات runner.",
            "MCP client.",
            "الـ transport اللي بيشغّل السيرفر على stdio.",
            "اعمل MCP client باسم.",
            "شغّل server.mjs واتصل بيه.",
            "هات الأدوات اللي عنده.",
            "الـ client بتاع Anthropic.",
            "اعمل الـ runner:",
            "الموديل.",
            "سقف كل رد.",
            "أقصى ٥ طلبات للموديل.",
            "أدوات السيرفر بعد ما اتحولت (كل واحدة فيها run).",
            "السؤال.",
            "قفلة الإعدادات.",
            "لف على الردود واحد واحد (الـ runner بينفّذ الأدوات بينهم).",
            "trace: السبب والـ blocks والـ tokens.",
            "قفلة اللوب.",
            "آخر رد.",
            "لو مخلصش (الحد خلص مثلًا) قول كده.",
            "غير كده اطبع النص.",
            "اقفل السيرفر."
          ],
          sol: R`بـ [[max_iterations: 1]]: لفة واحدة بس [[tool_use thinking,text,tool_use 183 108]]، وبعدها [[مخلصش: tool_use]]. الأداة **ماتنفذتش**، لأن الـ runner وقف قبل ما يبعت النتيجة لطلب تاني. (اتجرّب على الـ mock.)

لما تضيف [[get_price]] في السيرفر: الـ agent بيشوفها لوحده من [[listTools()]] من غير ما تغيّر سطر فيه. ده المكسب الأساسي من MCP. وخد بالك: كل أداة جديدة في السيرفر بقت متاحة للـ agent تلقائيًا، فلو السيرفر مش بتاعك فلتر الأدوات بالاسم قبل [[mcpTools]].

لو السكربت مخلصش وفضل معلّق: نسيت [[await mcp.close()]].`
        },
        {
          cmd: "agent ولا workflow؟",
          title: "إمتى متعملش agent أصلًا",
          desc: R`أغلب المهام اللي بتتعمل «agent» خطواتها معروفة من الأول: صنّف الرسالة، طلّع رقم الحجز، وبعدين الكود يقرر يعمل إيه. ده workflow: الموديل بيعمل خطوة محددة بـ schema، والكود هو اللي بيختار المسار. أرخص وأسرع ونتايجه بتتكرر وسهل تختبره.
الـ agent (الموديل بيختار الخطوة الجاية) يستاهل بس لما الخطوات مش معروفة مسبقًا، والنتيجة تستاهل التكلفة والوقت، والغلط ممكن يتمسك ويترجع.`,
          example: R`import Anthropic from "@anthropic-ai/sdk";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import { z } from "zod";
const client = new Anthropic();
const Ticket = z.object({
  intent: z.enum(["refund", "booking", "question", "other"]),
  booking_id: z.string().nullable().describe("رقم الحجز بشكل B-123 أو null"),
});
async function route(text) {
  const msg = await client.messages.parse({
    model: "claude-opus-5-5",
    max_tokens: 1024,
    output_config: { effort: "low", format: zodOutputFormat(Ticket) },
    system: "صنّف رسالة العميل واستخرج رقم الحجز لو مكتوب. متخمّنش رقم.",
    messages: [{ role: "user", content: text }],
  });
  const t = msg.parsed_output;
  if (t.intent === "refund" && t.booking_id) return { action: "open_refund", booking_id: t.booking_id };
  if (t.intent === "booking") return { action: "send_booking_link" };
  return { action: "human", reason: t.intent };
}
for (const text of ["عايز فلوسي ترجع، الحجز B-2041 اتلغى", "عايز فلوسي ترجع", "عايز احجز السبت", "الملعب فيه دش؟"]) {
  console.log(text, "→", JSON.stringify(await route(text)));
}`,
          try: R`خد ميزة بتفكر تعملها agent واكتب خطواتها على ورقة. لو قدرت تكتبها كلها كـ «لو كذا اعمل كذا»، اكتبها workflow زي المثال. وبعدين قارن: كام طلب للموديل في الـ workflow، وكام في الـ agent (من درس [[agent loop]]) لنفس الرسالة؟`,
          flag: "script",
          deep: {
            why: "الـ agent بيدفع تمن في كل حاجة: طلبات أكتر (كل خطوة طلب، والتاريخ بيكبر)، ووقت أطول، ونتايج مش بتتكرر (نفس الرسالة ممكن تمشي في طريقين)، واختبار أصعب، ومساحة أكبر للـ prompt injection لأن الموديل هو اللي بيختار الأفعال. لو المهمة مش محتاجة ده، انت بتدفع على الفاضي.",
            how: R`سلّم الأنماط من الأبسط:

(١) **طلب واحد**: تصنيف، أو تلخيص، أو استخراج. ده أغلب الشغل.
(٢) **workflow**: كذا طلب أو طلب + كود بترتيب ثابت انت كاتبه. أشكاله: سلسلة (استخرج ثم اكتب)، وتوجيه (صنّف ثم كل نوع ليه مسار، زي المثال)، وتوازي (كذا طلب مع بعض والكود يجمع)، ومراجعة (موديل يكتب وموديل أو كود يتحقق).
(٣) **agent**: الموديل في لوب بأدوات وبيقرر الخطوة الجاية. ده لما الخطوات بتعتمد على نتايج مش معروفة: «صلّح الـ test الفاشل ده في الـ repo» (لازم يقرا ويجرب ويعيد)، أو «دوّر في المصادر دي لحد ما تلاقي إجابة».

٤ أسئلة قبل الـ agent: هل المهمة صعب تتوصف خطواتها مسبقًا؟ هل قيمتها تستاهل تكلفة ووقت أكتر؟ هل الموديل كويس فعلًا في النوع ده (جرّب)؟ هل الغلط بيتمسك ويترجع (اختبارات، review، undo)؟ لو أي إجابة «لأ»، خليك في workflow.

في المثال الموديل بيعمل حاجة واحدة بيعرفها كويس (يفهم كلام العميل) وبيرجّع JSON مضمون شكله ([[messages.parse]] و [[zodOutputFormat]]، درس [[structured output]]). والقرار المهم (افتح طلب استرداد؟) في [[if]] انت كاتبها: مستحيل يفتح استرداد من غير رقم حجز، ومستحيل رسالة فيها «تجاهل التعليمات» تخليه يعمل فعل مش في القايمة. و [[effort: "low"]] لأن التصنيف مش محتاج تفكير طويل.`,
            when: "ابدأ دايمًا بطلب واحد أو workflow. اعمل agent لما تلاقي نفسك بتكتب if كتير جدًا لحالات مش قادر تتوقعها، والمهمة مفتوحة (بحث، تصليح كود، تحليل) والغلط مش خطير أو بيتراجع.",
            mistakes: R`«agent» لكل حاجة عشان الكلمة مشهورة. و agent بيقرر يعمل استرداد أو يبعت إيميل لوحده بدل ما الكود هو اللي يقرر. ووصف workflow جوه prompt طويل («الأول اعمل كذا، بعدين كذا») بدل ما تكتبه كود. وتقارن agent بـ workflow على ٣ أمثلة بس؛ قارن على eval (درس [[evals]]).`
          },
          teach: R`## الموديل يفهم، والكود يقرر

الكود بيبعت كل رسالة عميل للموديل **مرة واحدة**، ويطلب منه JSON بشكل ثابت: نوع الطلب ورقم الحجز. وبعدين ٣ سطور [[if]] بيقرروا الفعل. مفيش لوب، ومفيش أدوات، والموديل ميقدرش يختار فعل مش في القايمة.

> اتشغّل على ويندوز بـ Node 24.22 و [[@anthropic-ai/sdk]] 1.3.0 و [[zod]] 4.6، على نفس الـ mock المحلي. الـ SDK بعت [[output_config.format]] من نوع [[json_schema]] (زي الحقيقي)، والـ mock رجّع JSON مطابق للـ schema بقواعد بسيطة. **التصنيف من الـ mock**؛ الـ schema والـ parse والتوجيه حقيقيين.

---

## ١. [[const Ticket = z.object({ ... });]]

| الحقل | النوع | ليه |
|---|---|---|
| [[intent]] | [[z.enum([...])]] | واحدة من ٤ قيم بس، فالـ [[if]] تحت مستحيل تقابل قيمة غريبة |
| [[booking_id]] | [[z.string().nullable()]] | نص أو [[null]]. و [[.describe(...)]] بيتبعت للموديل كوصف للحقل |

[[null]] مسموح عشان الموديل ميضطرش يخترع رقم لو مش مكتوب (والـ system بيقول «متخمّنش»).

---

## ٢. [[client.messages.parse({ ... })]]

زي [[create]]، بس بيبعت الـ schema ويرجّع [[parsed_output]] جاهز ومتحقق منه:

- [[output_config: { effort: "low", format: zodOutputFormat(Ticket) }]]: [[format]] = «الرد لازم JSON بالشكل ده» (الـ API بيجبر الموديل). و [[effort: "low"]] = تفكير قليل، لأن التصنيف مهمة بسيطة (أسرع وأرخص).
- [[system]]: المهمة في جملة.

---

## ٣. القرار في الكود

~~~text
const t = msg.parsed_output;
if (t.intent === "refund" && t.booking_id) return { action: "open_refund", booking_id: t.booking_id };
if (t.intent === "booking") return { action: "send_booking_link" };
return { action: "human", reason: t.intent };
~~~

- استرداد **ومعاه** رقم حجز: افتح طلب استرداد (والكود اللي بيفتحه هيتأكد إن الحجز ده بتاع المستخدم ده، درس [[أدوات بأقل صلاحية]]).
- حجز: ابعت لينك صفحة الحجز.
- أي حاجة تانية، **ومنها استرداد من غير رقم**: لبني آدم.

---

## ٤. التجربة

~~~text الناتج
عايز فلوسي ترجع، الحجز B-2041 اتلغى → {"action":"open_refund","booking_id":"B-2041"}
عايز فلوسي ترجع → {"action":"human","reason":"refund"}
عايز احجز السبت → {"action":"send_booking_link"}
الملعب فيه دش؟ → {"action":"human","reason":"question"}
~~~

٤ رسايل = ٤ طلبات بالظبط. نفس الرسالة الأولى في agent (درس [[agent loop]]) كانت هتبقى ٢-٣ طلبات على الأقل، وكل واحد التاريخ فيه أطول، والموديل ممكن يقرر يعمل استرداد من غير ما يتأكد من حاجة.

---

## ٥. الأنماط من الأبسط للأعقد

| النمط | الموديل بيعمل | مين بيختار الخطوة الجاية | مثال |
|---|---|---|---|
| طلب واحد | خطوة واحدة | مفيش | لخّص، صنّف، استخرج |
| workflow: سلسلة | كذا خطوة ورا بعض | الكود | استخرج البيانات ثم اكتب الإيميل |
| workflow: توجيه | يصنّف | الكود ([[if]]) | المثال ده |
| workflow: توازي | كذا طلب مع بعض | الكود يجمّع | ٣ مراجعات لنفس الكود والكود ياخد الأغلبية |
| workflow: مراجعة | يكتب، وحاجة تانية تتحقق | الكود | يكتب SQL، والكود يشغّله على داتا تجريبية |
| agent | يختار أداة ورا أداة | **الموديل** | صلّح الـ test الفاشل في الـ repo |

---

## ٦. قبل ما تعمل agent

| السؤال | لو الإجابة «لأ» |
|---|---|
| الخطوات صعب تتكتب مسبقًا؟ | اكتبها workflow |
| القيمة تستاهل وقت وفلوس أكتر؟ | طلب واحد أو workflow |
| الموديل كويس فعلًا في ده؟ (جرّب على eval) | متبنيش عليه لسه |
| الغلط بيتمسك ويترجع؟ (اختبارات، review، undo) | موافقة بني آدم على كل خطوة، أو workflow |

---

## الخلاصة

- ابدأ بأبسط حاجة: طلب واحد، ثم workflow، ثم agent.
- الموديل يعمل اللي بيعرفه (يفهم ويستخرج بـ schema)، والكود يقرر الأفعال.
- الـ agent لما الخطوات مش معروفة، والقيمة عالية، والغلط بيترجع.`,
          lines: [
            "الـ SDK.",
            "الـ helper اللي بيحوّل Zod لـ format الـ API.",
            "Zod.",
            "الـ client.",
            "شكل الرد المطلوب:",
            "نوع الطلب: واحد من ٤ بس.",
            "رقم الحجز أو null، ومعاه وصف للموديل.",
            "قفلة الـ schema.",
            "دالة بتاخد رسالة وترجّع فعل.",
            "طلب واحد بيرجّع رد متحقق منه:",
            "الموديل.",
            "السقف.",
            "تفكير قليل، والرد لازم بشكل Ticket.",
            "المهمة.",
            "رسالة العميل.",
            "قفلة الطلب.",
            "الـ object الجاهز.",
            "استرداد ومعاه رقم: افتح طلب استرداد.",
            "حجز: ابعت لينك الحجز.",
            "غير كده: لبني آدم.",
            "قفلة الدالة.",
            "جرّب ٤ رسايل.",
            "اطبع الرسالة والفعل.",
            "قفلة اللوب."
          ],
          sol: R`مثال: «الرد على أسئلة العملاء عن الحجوزات». الخطوات: صنّف (حجز، إلغاء، سؤال)، لو إلغاء هات الحجز من الداتابيز بالـ id اللي في الـ session، احسب الرسوم بالكود، اكتب الرد بالموديل. كلها معروفة، فدي workflow: ٢ طلب للموديل (تصنيف وكتابة) والباقي كود.

في التجربة: الـ workflow عمل **طلب واحد** لكل رسالة (٤ رسايل = ٤ طلبات). الـ agent في درس [[agent loop]] عمل **٣ طلبات** لسؤال واحد، والـ [[input_tokens]] كانت 193 ثم 321 ثم 452 (من الـ mock). يعني الـ agent هنا أغلى بأكتر من ٣ مرات وأبطأ، من غير ما يضيف حاجة الكود مكانش هيعملها.

مثال يستاهل agent: «الـ CI وقع، اعرف ليه وصلّحه». مش عارف هتقرا أنهي ملف، ولا محتاج كام محاولة، والغلط بيتمسك بالاختبارات وبيترجع بـ git.`
        },
        {
          cmd: "eval للـ agent",
          title: "تقيس الـ agent بالأدوات اللي ناداها، مش بالإجابة بس",
          desc: R`الـ agent ممكن يوصل للإجابة الصح بطريق غلط: ينادي أدوات ملهاش لازمة، أو يلف ١٠ خطوات بدل ٢، أو يقف بسبب الحد. فالـ eval بتاعه بيسجّل الرحلة (الأدوات بالترتيب، وعدد الخطوات، والتكلفة، وسبب الوقوف) ويتحقق منها: الأداة الفلانية لازم تتنده، والفلانية ممنوعة، والخطوات تحت حد معين.
ونفس فكرة درس [[evals]]: حالات ثابتة، وسكربت بيطلّع نتيجة، و exit code مش صفر لو حاجة باظت، فيشتغل في CI قبل أي تغيير في البرومبت أو الموديل أو الأدوات.`,
          example: R`import { runAgent } from "./agent-lib.mjs";
const cases = [
  { q: "فيه ميعاد فاضي في ملعب ١ يوم 2026-10-02؟", must: ["get_free_slots"], never: ["search_policy"], maxSteps: 3 },
  { q: "لو لغيت قبل الميعاد بيوم هدفع حاجة؟", must: ["search_policy"], never: [], maxSteps: 3 },
  { q: "#loop احجزلي أي حاجة", must: [], never: [], maxSteps: 3 },
];
let failed = 0;
for (const c of cases) {
  const r = await runAgent(c.q, { maxSteps: 6, maxUsd: 0.05 });
  const problems = [];
  for (const t of c.must) if (!r.calls.includes(t)) problems.push("ما ناداش " + t);
  for (const t of c.never) if (r.calls.includes(t)) problems.push("نادى " + t + " من غير لزوم");
  if (r.steps > c.maxSteps) problems.push(r.steps + " خطوات والحد " + c.maxSteps);
  if (r.stop !== "end_turn") problems.push("وقف بسبب " + r.stop);
  if (problems.length) failed++;
  console.log(problems.length ? "✗" : "✓", c.q.slice(0, 28).padEnd(28), "|", r.calls.join(",") || "-", "|", r.steps, "خطوات", "$" + r.usd.toFixed(4), problems.length ? "| " + problems.join("، ") : "");
}
console.log(cases.length - failed, "من", cases.length, "عدّوا");
process.exit(failed ? 1 : 0);`,
          try: R`حوّل لوب درس [[agent loop]] لدالة [[runAgent(question, { maxSteps, maxUsd })]] في [[agent-lib.mjs]] بترجّع [[{ stop, steps, usd, calls, text }]] (الحل فيه نسخة). وبعدين ضيف حالتين: سؤال ملوش علاقة بالملاعب (المفروض ميناديش أي أداة)، وسؤال بيحتاج الأداتين. وضيف شرط على التكلفة: [[usd > 0.02]] يبقى مشكلة.`,
          flag: "script",
          deep: {
            why: "تغيير صغير في وصف أداة، أو موديل أرخص، أو أداة جديدة، ممكن يخلي الـ agent ينادي أدوات زيادة (فلوس ووقت)، أو يبطّل ينادي أداة لازمة (فيألّف الإجابة)، أو يلف لحد الحد. الإجابة النهائية ممكن تفضل «شكلها كويس» والمشكلة مستخبية في الرحلة.",
            how: R`الدالة لازم ترجّع الرحلة مش النص بس: [[calls]] (أسماء الأدوات بالترتيب)، و [[steps]]، و [[usd]]، و [[stop]] (سبب الوقوف: [[end_turn]] أو [[max_steps]] أو [[budget]] أو غيره). ده نفس الـ trace اللي في اللوب، بس متجمّع في object.

لكل حالة توقعات بسيطة تتحقق بالكود: [[must]] أدوات لازم تتنده، و [[never]] أدوات ممنوعة، و [[maxSteps]]. وتقدر تضيف: ترتيب معين (اتأكد من الحجز **قبل** الإلغاء)، أو مدخلات الأداة (التاريخ اللي اتبعت هو اللي في السؤال)، أو حد تكلفة. وللإجابة النهائية نفسها: نفس طرق درس [[evals]] (مطابقة، أو قواعد، أو موديل بيحكم بمعايير مكتوبة).

الـ agent مش بيرجع نفس الرحلة كل مرة. فالحالات المهمة شغّلها كذا مرة (٣ أو ٥) وشوف النسبة، مش مرة واحدة. والأدوات في الـ eval تبقى نسخ وهمية أو على داتا اختبار، عشان الـ eval ميحجزش ملاعب بجد.

[[process.exit(failed ? 1 : 0)]]: exit code 1 لو أي حالة فشلت، فـ CI يوقف الـ merge. وخلي الـ eval ده يشتغل على كل تغيير في البرومبت أو الأدوات أو الموديل، مش بس الكود.`,
            when: "من أول ما الـ agent يبقى ليه أكتر من أداة. وكل bug في سلوكه (نادى أداة غلط، لف كتير) يتحول حالة جديدة قبل ما تصلّحه، عشان ميرجعش.",
            mistakes: R`تقيس الإجابة النهائية بس. وتشغّل كل حالة مرة واحدة وتعتبر النتيجة ثابتة. و eval بيكلّم أدوات حقيقية (يحجز، يبعت إيميلات). وتخلي [[maxSteps]] في الحالة نفس حد اللوب، فمش هتعرف إن الـ agent بقى بيلف أكتر لحد ما يوصل للحد.`
          },
          teach: R`## الرحلة، مش الإجابة بس

السكربت بيشغّل الـ agent (نفس لوب درس [[agent loop]] بس جوه دالة) على ٣ أسئلة، ولكل سؤال بيتأكد: الأدوات اللي **لازم** تتنده اتندهت، والممنوعة متندهتش، والخطوات تحت الحد، والـ agent خلص لوحده. وفي الآخر بيطلع بـ exit code 1 لو أي حالة فشلت.

> اتشغّل على ويندوز بـ Node 24.22 و [[@anthropic-ai/sdk]] 1.3.0 على نفس الـ mock. الـ mock **مش ذكي**: بينادي كل الأدوات المتاحة بالترتيب مهما كان السؤال. ده مفيد هنا، لأنه بيمثّل agent بيصرف على أدوات ملهاش لازمة، والـ eval لازم يمسكه.

---

## ١. [[import { runAgent } from "./agent-lib.mjs";]]

[[agent-lib.mjs]] فيه نفس الأدوات واللوب، بس بدل ما يطبع، بيرجّع:

| الخانة | معناها |
|---|---|
| [[calls]] | أسماء الأدوات اللي اتندهت بالترتيب |
| [[steps]] | عدد الطلبات للموديل |
| [[usd]] | التكلفة |
| [[stop]] | ليه وقف: [[end_turn]]، أو [[max_steps]]، أو [[budget]]، أو أي [[stop_reason]] تاني |

---

## ٢. [[const cases = [ ... ];]]

كل حالة: السؤال ([[q]])، والأدوات اللي لازم ([[must]])، والممنوعة ([[never]])، وأقصى خطوات ([[maxSteps]]).

- الأولى: سؤال عن ميعاد. لازم [[get_free_slots]]، و [[search_policy]] ملهاش لازمة.
- التانية: سؤال عن الإلغاء. لازم [[search_policy]].
- التالتة: [[#loop]] بيخلي الـ mock يلف، عشان نشوف الـ eval بيمسك الحد.

لاحظ إن [[maxSteps: 3]] في الحالة أقل من حد اللوب ([[maxSteps: 6]] في [[runAgent]]). ليه؟ الحد في اللوب حماية، والحد في الحالة **توقع**. لو كانوا نفس الرقم، مش هتعرف إن الـ agent بقى بيلف أكتر من الطبيعي غير لما يخبط في الحماية.

---

## ٣. الفحص

~~~text
for (const t of c.must) if (!r.calls.includes(t)) problems.push("ما ناداش " + t);
for (const t of c.never) if (r.calls.includes(t)) problems.push("نادى " + t + " من غير لزوم");
if (r.steps > c.maxSteps) problems.push(r.steps + " خطوات والحد " + c.maxSteps);
if (r.stop !== "end_turn") problems.push("وقف بسبب " + r.stop);
~~~

- [[.includes(t)]]: القايمة فيها الاسم ده؟
- كل مشكلة بتتضاف لـ [[problems]] بجملة مفهومة، بدل ما تقف عند أول واحدة.

### سطر الطباعة

- [[c.q.slice(0, 28).padEnd(28)]]: أول ٢٨ حرف من السؤال، ويكمّل بمسافات لحد ٢٨ عشان الأعمدة تتظبط.
- [[r.calls.join(",") || "-"]]: الأدوات بفاصلة، ولو مفيش اطبع [[-]].

---

## ٤. [[process.exit(failed ? 1 : 0);]]

١ لو فيه حالة فشلت. في CI (GitHub Actions مثلًا) الخطوة دي هتبقى حمرا وتوقف الـ merge.

---

## ٥. التجربة

~~~text الناتج
✗ فيه ميعاد فاضي في ملعب ١ يوم | get_free_slots,search_policy | 3 خطوات $0.0105 | نادى search_policy من غير لزوم
✓ لو لغيت قبل الميعاد بيوم هدف | get_free_slots,search_policy | 3 خطوات $0.0105
✗ #loop احجزلي أي حاجة         | get_free_slots,get_free_slots,get_free_slots,get_free_slots,get_free_slots,get_free_slots | 6 خطوات $0.0249 | 6 خطوات والحد 3، وقف بسبب max_steps
1 من 3 عدّوا
~~~

و [[echo $?]] بعده طلّع [[1]].

نقرا:

- **الحالة الأولى**: الإجابة كانت هتطلع صح (المواعيد موجودة)، بس الـ agent نادى أداة زيادة. ده بالظبط اللي مش هتشوفه لو بتقيس الإجابة بس، وده اللي بيضاعف الفاتورة.
- **الحالة التانية**: عدّت. نادى [[get_free_slots]] كمان، بس مش ممنوعة فيها. لو عايز تمنعها حطها في [[never]].
- **الحالة التالتة**: ٦ خطوات ووقف بالحماية، والـ eval طلّع المشكلتين.

---

## الخلاصة

| بتقيس | ليه |
|---|---|
| الأدوات اللي لازم | الـ agent مبيألّفش بدل ما يسأل الداتا |
| الأدوات الممنوعة | مبيصرفش على حاجات ملهاش لازمة، ومبيلمسش حاجة خطيرة |
| عدد الخطوات وسبب الوقوف | مبيلفش، وخلص لوحده |
| التكلفة | التغيير ما ضاعفش الفاتورة |

- الدالة ترجّع الرحلة (trace) مش النص بس.
- شغّل الحالات المهمة كذا مرة، والأدوات في الـ eval وهمية.
- exit code مش صفر = CI يوقف التغيير.`,
          lines: [
            "الـ agent كدالة بترجّع الرحلة.",
            "الحالات:",
            "سؤال ميعاد: لازم أداة المواعيد، وممنوع أداة السياسات، و٣ خطوات بالكتير.",
            "سؤال إلغاء: لازم أداة السياسات.",
            "حالة بتخلي الـ mock يلف.",
            "قفلة الحالات.",
            "عداد الحالات الفاشلة.",
            "لف على الحالات.",
            "شغّل الـ agent بالحدود بتاعته.",
            "مشاكل الحالة دي.",
            "أداة لازمة متندهتش؟",
            "أداة ممنوعة اتندهت؟",
            "خطوات أكتر من المتوقع؟",
            "وقف لأي سبب غير إنه خلص؟",
            "لو فيه مشاكل زوّد العداد.",
            "سطر لكل حالة: ✓ أو ✗، والسؤال، والأدوات، والخطوات، والتكلفة، والمشاكل.",
            "قفلة اللوب.",
            "كام حالة عدّت.",
            "exit code 1 لو أي حالة فشلت."
          ],
          sol: R`الحالتين الجداد: [[{ q: "الأهلي كسب امبارح؟", must: [], never: ["get_free_slots", "search_policy"], maxSteps: 2 }]] و [[{ q: "فيه ميعاد بكرة ولو لغيت هدفع؟", must: ["get_free_slots", "search_policy"], never: [], maxSteps: 3 }]]، وشرط التكلفة قبل [[if (problems.length) failed++;]]: [[if (r.usd > 0.02) problems.push("غالي: $" + r.usd.toFixed(4));]]

الناتج على الـ mock:

[[✗ الأهلي كسب امبارح؟ | get_free_slots,search_policy | 3 خطوات $0.0104 | نادى get_free_slots من غير لزوم، نادى search_policy من غير لزوم، 3 خطوات والحد 2]]
[[✓ فيه ميعاد بكرة ولو لغيت هدفع | get_free_slots,search_policy | 3 خطوات $0.0104]]
[[✗ #loop احجزلي أي حاجة | ... | 6 خطوات $0.0249 | 6 خطوات والحد 3، وقف بسبب max_steps، غالي: $0.0249]]
[[2 من 5 عدّوا]]

الـ mock بينادي كل الأدوات حتى لسؤال عن الكورة، والـ eval مسكه. الموديل الحقيقي المفروض يرد من غير أدوات (خطوة واحدة)، ولو نادى أداة، ده bug في الوصف أو البرومبت.

المهم: الرقم ([[2 من 5]]) يتسجّل قبل وبعد أي تغيير، زي الـ baseline في درس [[evals]].`,
          solCode: R`import Anthropic from "@anthropic-ai/sdk";
const client = new Anthropic();
const MODEL = "claude-opus-5-5";
const PRICE = { in: 4 / 1e6, out: 20 / 1e6 };
const TOOLS = {
  get_free_slots: {
    description: "المواعيد الفاضية لملعب في يوم معين (date بشكل YYYY-MM-DD).",
    input_schema: { type: "object", properties: { date: { type: "string" }, field: { type: "string" } }, required: ["date", "field"], additionalProperties: false },
    run: ({ date, field }) => ({ date, field, free: ["18:00", "21:00"] }),
  },
  search_policy: {
    description: "بيدوّر في سياسات الملعب (الإلغاء، الدفع، المواعيد) ويرجّع الفقرة المناسبة.",
    input_schema: { type: "object", properties: { query: { type: "string" } }, required: ["query"], additionalProperties: false },
    run: ({ query }) => ({ query, text: "الإلغاء مجاني قبل الميعاد بـ ٢٤ ساعة." }),
  },
};
const tools = Object.entries(TOOLS).map(([name, t]) => ({ name, description: t.description, input_schema: t.input_schema, strict: true }));
export async function runAgent(question, { maxSteps = 6, maxUsd = 0.05 } = {}) {
  const messages = [{ role: "user", content: question }];
  const calls = [];
  let usd = 0;
  for (let step = 1; ; step++) {
    if (step > maxSteps) return { stop: "max_steps", steps: step - 1, usd, calls };
    const res = await client.messages.create({ model: MODEL, max_tokens: 4096, tools, messages });
    usd += res.usage.input_tokens * PRICE.in + res.usage.output_tokens * PRICE.out;
    messages.push({ role: "assistant", content: res.content });
    if (res.stop_reason !== "tool_use") return { stop: res.stop_reason, steps: step, usd, calls, text: res.content.filter((b) => b.type === "text").map((b) => b.text).join("") };
    if (usd > maxUsd) return { stop: "budget", steps: step, usd, calls };
    const results = [];
    for (const block of res.content.filter((b) => b.type === "tool_use")) {
      calls.push(block.name);
      const tool = TOOLS[block.name];
      let out;
      try { out = tool ? await tool.run(block.input) : { error: "أداة مش معروفة: " + block.name }; }
      catch (e) { out = { error: e.message }; }
      results.push({ type: "tool_result", tool_use_id: block.id, content: JSON.stringify(out), is_error: !tool || "error" in out });
    }
    messages.push({ role: "user", content: results });
  }
}`
        },
      ]
    }
]);
