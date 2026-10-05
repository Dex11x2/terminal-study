// تكملة تاب ai: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/ai/01.js (شرح حقول الدرس في أوله)
MORE("ai", [
    {
      t: "في التطبيق",
      l: 2,
      n: "الرد يوصل للواجهة كلمة كلمة، و JSON مضمون شكله، وأدوات الموديل يطلبها، و RAG على pgvector، وذاكرة المحادثة",
      items: [
        {
          cmd: "streaming",
          title: "الرد يظهر كلمة كلمة بدل ما المستخدم يستنى",
          desc: R`الرد الطويل ممكن ياخد ١٠ ثواني أو أكتر. من غير streaming المستخدم بيبص على شاشة فاضية لحد ما الرد يخلص. مع streaming أول كلمة بتظهر في أقل من ثانية، والباقي بيكمّل قدامه.

السلسلة: الموديل بيبعت للسيرفر بتاعك events وهو بيكتب (SSE)، والسيرفر بيكتب كل حتة نص للمتصفح أول بأول ([[res.write]])، والمتصفح بيقرا الـ body حتة حتة. ولو المستخدم داس «وقّف» أو قفل الصفحة، [[AbortController]] بيقفل الطلب، والسيرفر بيقفل طلب الموديل كمان عشان متدفعش على tokens محدش هيشوفها.`,
          example: R`import express from "express";
import Anthropic from "@anthropic-ai/sdk";
const app = express();
const client = new Anthropic();
app.use(express.json({ limit: "20kb" }));
app.post("/api/chat", async (req, res) => {
  const question = String(req.body.question ?? "").slice(0, 2000);
  const stream = client.messages.stream({
    model: "claude-opus-5-5",
    max_tokens: 4096,
    output_config: { effort: "low" },
    messages: [{ role: "user", content: question }],
  });
  res.on("close", () => { if (!res.writableFinished) stream.abort(); });
  res.type("text/plain; charset=utf-8");
  stream.on("text", (delta) => res.write(delta));
  try {
    const final = await stream.finalMessage();
    console.log("خلص:", final.stop_reason, final.usage.output_tokens);
  } catch (err) {
    if (!stream.aborted) console.error("الموديل فشل:", err.message);
  }
  res.end();
});
app.listen(3000);`,
          try: "شغّل السيرفر، واكتب كود المتصفح اللي بيقرا الرد حتة حتة ويعرضه، وفيه زرار «وقّف» بيعمل [[controller.abort()]]. دوس وقّف في النص وشوف في لوج السيرفر إن «خلص» مطبعتش (الطلب اتقفل من غير ما يكمّل).",
          flag: "script",
          deep: {
            why: "الوقت لحد أول كلمة (time to first token) هو اللي المستخدم بيحس بيه، مش وقت الرد كله. وكمان من غير streaming، الطلبات الطويلة ممكن تعدّي الـ timeout بتاع السيرفر أو الـ proxy اللي في النص.",
            how: R`من المزوّد للسيرفر: [[client.messages.stream]] بيفتح اتصال SSE، والـ SDK بيحوّل الـ events ([[message_start]] وبعدين [[content_block_delta]] كتير وبعدين [[message_stop]]) لأحداث سهلة: [[on('text')]] بيدّيك الحتة الجديدة بس، و [[finalMessage()]] بيستنى الرد كله ويرجّعه كامل بالـ [[usage]] و [[stop_reason]]. في Gemini نفس الفكرة بـ [[stream: true]] في الطلب.

من السيرفر للمتصفح: أبسط طريقة text عادي بـ [[res.write]]، و Node بيبعته chunked. في المتصفح [[fetch]] بيرجّع [[res.body]] كـ ReadableStream، و [[TextDecoderStream]] بيحوّل البايتات لنص من غير ما يكسر حرف عربي متقسم على اتنين chunks. البديل SSE ([[text/event-stream]]) لو محتاج أنواع events (نص، ومصادر، وخطأ)، بس [[EventSource]] بيعمل GET بس، فمع POST بتقرا الـ stream بـ fetch برضه.

الإلغاء: في المتصفح [[AbortController]] تديله لـ fetch في [[signal]]، و [[abort()]] بيقفل الاتصال. السيرفر بيحس بده من [[res.on('close')]] قبل ما الرد يخلص ([[writableFinished]] لسه false)، فيعمل [[stream.abort()]] ويقفل الطلب عند المزوّد. من غير الخطوة دي الموديل بيكمّل يكتب وانت بتدفع.

والـ proxies: Nginx بيعمل buffering للرد افتراضيًا فالـ streaming يوصل مرة واحدة في الآخر. الحل [[proxy_buffering off]] للـ route ده، أو header [[X-Accel-Buffering: no]] من السيرفر.`,
            when: "أي شات أو رد طويل بيتعرض لمستخدم. مش محتاجه لما الرد رايح لكود (تصنيف، JSON) أو شغل في الخلفية؛ هناك [[finalMessage()]] أو طلب عادي أبسط.",
            mistakes: "تعمل [[res.json]] في الآخر بعد ما جمّعت الرد كله، فكأنك معملتش streaming. وتنسى تقفل طلب الموديل لما المستخدم يمشي. وتعمل [[new TextDecoder().decode(chunk)]] من غير [[{stream: true}]] فالحروف العربية تتكسر على حدود الـ chunks. و Nginx قدام السيرفر بيجمّع الرد وانت فاكر الكود هو اللي بايظ."
          },
          lines: [
            "Express 5.",
            "الـ SDK بتاع Anthropic.",
            "التطبيق.",
            "الـ client. المفتاح من [[ANTHROPIC_API_KEY]] على السيرفر بس.",
            "اقرا JSON بحد أقصى للحجم.",
            "الـ endpoint اللي الواجهة هتكلّمه (في الحقيقة ورا auth زي درس backend proxy).",
            "السؤال كنص ومقصوص.",
            "افتح stream مع الموديل.",
            "الموديل.",
            "سقف الرد.",
            "تفكير قليل: أول كلمة تظهر أسرع في الشات.",
            "المحادثة.",
            "قفلة الطلب.",
            "لو الاتصال مع المتصفح اتقفل قبل ما نخلّص (المستخدم لغى أو قفل الصفحة): اقفل طلب الموديل.",
            "الرد نص عادي بـ UTF-8.",
            "كل حتة نص جديدة من الموديل تتكتب للمتصفح على طول.",
            "استنى الرد يخلص.",
            "الرد الكامل: وقف ليه واستهلك كام.",
            "سجّلهم (ده مكان حساب التكلفة).",
            "لو فيه خطأ.",
            "لو احنا اللي لغينا فده مش خطأ. غير كده سجّله.",
            "قفلة.",
            "اقفل الرد للمتصفح.",
            "قفلة الـ route.",
            "شغّل على 3000."
          ],
          sol: R`المفروض تشوف الرد بيظهر حتة حتة. ولما تدوس «وقّف» في النص: [[fetch]] أو [[reader.read()]] بيرمي خطأ اسمه [[AbortError]] (امسكه ومتعرضهوش كخطأ)، والنص اللي وصل لحد اللحظة دي يفضل ظاهر، وفي لوج السيرفر مفيش «خلص» ومفيش «الموديل فشل»، لأن [[stream.aborted]] بقت true.

لو السطر «خلص» ظهر رغم إنك لغيت، يبقى السيرفر مسمعش إن الاتصال اتقفل: اتأكد إنك بتسمع على [[res.on('close')]] مش [[req.on('end')]] (ده بيحصل أول ما الـ body يتقري). ولو الرد كله ظهر مرة واحدة في الآخر، غالبًا فيه proxy بيعمل buffering، أو انت بتستخدم [[res.text()]] بدل ما تقرا الـ stream.`,
          solCode: R`const out = document.querySelector("#answer");
const stopBtn = document.querySelector("#stop");
async function ask(question) {
  const controller = new AbortController();
  stopBtn.onclick = () => controller.abort();
  out.textContent = "";
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
      signal: controller.signal,
    });
    if (!res.ok) throw new Error("HTTP " + res.status);
    const reader = res.body.pipeThrough(new TextDecoderStream()).getReader();
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      out.textContent += value;
    }
  } catch (err) {
    if (err.name !== "AbortError") out.textContent += "\n(حصلت مشكلة، جرّب تاني)";
  }
}`
        },
        {
          cmd: "structured output",
          title: "رد JSON مضمون شكله بـ schema",
          desc: R`لما الرد رايح لكود (تحفظه في داتابيز، أو تاخد قرار بيه)، الحل الأمتن من «اكتب JSON من فضلك»: تبعت schema، والـ API يجبر الموديل يطلّع JSON مطابق ليها (structured output). وتوصف الـ schema بـ Zod، فنفس التعريف بيتبعت للموديل وبيعمل validation للرد وبيدّيك types.

ومع كده: الـ schema بتضمن الشكل، مش الصح. التاريخ ممكن يطلع بالشكل الصح وهو غلط، فالفحص المنطقي بتاعك لسه لازم.`,
          example: R`import Anthropic from "@anthropic-ai/sdk";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import { z } from "zod";
const client = new Anthropic();
const Booking = z.object({
  intent: z.enum(["book", "cancel", "question", "other"]),
  date: z.string().nullable().describe("YYYY-MM-DD أو null لو مش مذكور"),
  time: z.string().nullable().describe("HH:MM بنظام ٢٤ ساعة"),
  people: z.number().int().nullable(),
  confidence: z.enum(["high", "low"]),
});
try {
  const msg = await client.messages.parse({
    model: "claude-opus-5-5",
    max_tokens: 1024,
    output_config: { effort: "low", format: zodOutputFormat(Booking) },
    system: "استخرج طلب العميل. النهارده 2026-10-01. متخمّنش: الحقل اللي مش مذكور يبقى null.",
    messages: [{ role: "user", content: "عايز ألغي حجز بكرة الساعة ٨ بالليل" }],
  });
  const booking = msg.parsed_output;
  console.log(booking.intent, booking.date, booking.time, booking.people);
} catch (err) {
  console.error("مفيش ناتج صالح:", err.message);
}`,
          try: "جرّب ٣ رسايل: «عايز أحجز لـ ١٠ أفراد السبت»، و «الملعب فيه نجيلة صناعي؟»، و «احجزلي» من غير أي تفاصيل. شوف الحقول اللي المفروض تبقى null طلعت null فعلًا ولا الموديل خمّن.",
          flag: "script",
          deep: {
            why: "[[JSON.parse]] على نص حر بيقع أول ما الموديل يحط مقدمة أو علامات markdown حوالين الـ JSON. والـ structured output بيقفل الباب ده من عند المزوّد، والـ validation بيقفله عندك.",
            how: R`[[zodOutputFormat]] بيحوّل الـ Zod schema لـ JSON Schema ويبعتها في [[output_config.format]]. المزوّد بيقيّد التوليد نفسه (constrained decoding)، فالـ tokens اللي تكسر الـ schema مش بتتولّد أصلًا. و [[messages.parse]] بياخد النص ويعدّيه على Zod ويحطه في [[parsed_output]] بنوعه. ولو النص مش JSON صالح أو مش مطابق (زي لما الرد يتقطع عند [[max_tokens]])، بيرمي خطأ. ولو الموديل رفض ومفيش نص أصلًا، [[parsed_output]] بيرجع [[null]] من غير خطأ، فافحص [[stop_reason]] أو القيمة قبل ما تستخدمها (في المثال الـ try بيمسك الحالتين، لأن [[booking.intent]] على null بيرمي TypeError).

في Gemini نفس الفكرة بـ [[response_format]] في Interactions (أو [[responseSchema]] في generateContent)، وتقدر تحوّل Zod لـ JSON Schema بـ [[z.toJSONSchema]] وتعمل [[safeParse]] على الرد بنفسك.

تصميم الـ schema: [[enum]] بدل نص حر لأي حقل ليه قيم محدودة. و [[nullable]] للحقول اللي ممكن متكونش مذكورة، ومعاها تعليمات «متخمّنش»؛ من غيرها الموديل هيملا أي حاجة عشان الحقل إجباري. و [[.describe()]] بيوصل للموديل كوصف للحقل. وحقل زي [[confidence]] بيخلي الكود ياخد قرار: low = اسأل المستخدم يأكد.

وحدود: مش كل خصائص JSON Schema مدعومة في الـ constrained decoding (قيود زي أقل وأكتر قيمة ممكن متتطبقش وقت التوليد)، والـ SDK بيفحصها بعد الرد. والتاريخ النسبي («بكرة») محتاج تقوله النهارده إيه، لأن الموديل ميعرفش.`,
            when: "استخراج بيانات من نص (فورم من رسالة، فاتورة، سيرة ذاتية)، وتصنيف بحقول، وأي خطوة في pipeline الرد بتاعها داخل على كود.",
            mistakes: "حقول كلها إجبارية فالموديل يألّف قيم للي مش مذكور. و [[z.string()]] لحقل ليه ٤ قيم بس بدل enum. وتصدّق التاريخ لأنه «جه بالشكل الصح». وتنسى تقوله تاريخ النهارده فـ «بكرة» يطلع أي يوم."
          },
          lines: [
            "الـ SDK.",
            "helper بيحوّل Zod لـ output format.",
            "Zod (الإصدار ٤).",
            "الـ client.",
            "شكل الرد المطلوب.",
            "النية: قيمة من ٤ بس.",
            "التاريخ أو null، والوصف بيوصل للموديل.",
            "الوقت أو null.",
            "عدد الأفراد رقم صحيح أو null.",
            "الموديل متأكد ولا لأ، عشان الكود يقرر يسأل المستخدم.",
            "قفلة الـ schema.",
            "parse بيرمي لو الرد مش مطابق، فنمسكه.",
            "parse بدل create: بيعمل validation ويرجّع الناتج بنوعه.",
            "الموديل.",
            "سقف الرد.",
            "تفكير قليل، والـ schema في [[format]].",
            "التعليمات: التاريخ المرجعي، وممنوع التخمين.",
            "رسالة العميل.",
            "قفلة الطلب.",
            "الناتج object جاهز، مش نص.",
            "cancel و 2026-10-02 و 20:00 و null.",
            "لو فشل.",
            "خطة بديلة بدل ما البرنامج يقع.",
            "قفلة."
          ],
          sol: R`الناتج المتوقع للرسالة اللي في المثال: [[cancel 2026-10-02 20:00 null]]. «الساعة ٨ بالليل» بقت [[20:00]] لأن الوصف قال ٢٤ ساعة، و «بكرة» بقت ٢ أكتوبر لأننا قلناله النهارده ١ أكتوبر.

للرسايل التلاتة: الأولى [[book]] بتاريخ السبت الجاي و [[people: 10]] و [[time: null]]. التانية [[question]] وكل الباقي null. التالتة [[book]] وكل الحقول null وغالبًا [[confidence: low]]، وده بالظبط اللي يخلي الكود يسأل «إمتى؟».

لو لقيت [[time]] جه بقيمة في رسالة مفيهاش وقت، الموديل خمّن: قوّي جملة «متخمّنش» أو ضيف مثال. ولو التاريخ طلع سنة غلط، غالبًا نسيت سطر «النهارده».`
        },
        {
          cmd: "tool calling",
          title: "الموديل يطلب من كودك يجيب معلومة",
          desc: R`الموديل ميعرفش المواعيد الفاضية النهارده ولا حالة أوردر معين. الحل: تعرّفه على أدوات (tools): اسم، ووصف إمتى يستخدمها، و schema للمدخلات. الموديل ميشغّلش حاجة؛ هو بيرد بطلب «شغّل الأداة دي بالمدخلات دي» ([[tool_use]])، وكودك هو اللي يتحقق من المدخلات ويشغّل ويرجّع النتيجة ([[tool_result]])، والموديل يكمّل بيها.

ده اسمه function calling أو tool use، وهو الأساس لأي agent.`,
          example: R`import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";
const client = new Anthropic();
const SlotsInput = z.object({ date: z.iso.date(), field: z.string().max(40) });
const tools = [{
  name: "get_free_slots",
  description: "بيرجّع المواعيد الفاضية لملعب في يوم معين. استخدمها قبل ما تقول إن فيه ميعاد فاضي.",
  input_schema: { type: "object", properties: { date: { type: "string", format: "date" }, field: { type: "string" } }, required: ["date", "field"], additionalProperties: false },
  strict: true,
}];
async function getFreeSlots({ date, field }) { return { date, field, free: ["18:00", "21:00"] }; }
const messages = [{ role: "user", content: "فيه ميعاد فاضي في ملعب ١ يوم 2026-10-02؟" }];
for (let turn = 0; turn < 5; turn++) {
  const res = await client.messages.create({ model: "claude-opus-5-5", max_tokens: 4096, tools, messages });
  messages.push({ role: "assistant", content: res.content });
  if (res.stop_reason !== "tool_use") {
    console.log(res.content.filter((b) => b.type === "text").map((b) => b.text).join(""));
    break;
  }
  const results = [];
  for (const block of res.content) {
    if (block.type !== "tool_use") continue;
    const input = SlotsInput.safeParse(block.input);
    const out = input.success ? await getFreeSlots(input.data) : { error: input.error.issues[0].message };
    results.push({ type: "tool_result", tool_use_id: block.id, content: JSON.stringify(out), is_error: !input.success });
  }
  messages.push({ role: "user", content: results });
}`,
          try: "ضيف أداة تانية [[get_price]] بتاخد [[field]] وترجّع السعر، واسأل «فيه ميعاد بكرة الساعة ٩ في ملعب ١ وبكام؟». اطبع [[messages]] في الآخر وعدّ كام [[tool_use]] حصل وهل اتطلبوا في نفس الرد ولا ورا بعض.",
          flag: "script",
          deep: {
            why: "من غير أدوات، الموديل هيألّف مواعيد وأسعار بثقة. مع الأدوات، البيانات الحقيقية بتيجي من الداتابيز بتاعتك، والموديل بيعمل اللي بيعرفه: يفهم السؤال ويصيغ الإجابة.",
            how: R`الدورة: (١) تبعت الرسالة ومعاها [[tools]]. (٢) لو الموديل محتاج أداة، الرد فيه block نوعه [[tool_use]] فيه [[id]] و [[name]] و [[input]]، و [[stop_reason]] بيبقى [[tool_use]]. (٣) تضيف رد الموديل كله للتاريخ كـ assistant (من غير ما تشيل حاجة منه)، وتشغّل الأداة، وتبعت رسالة user فيها [[tool_result]] لكل [[tool_use_id]]. (٤) تعيد لحد ما [[stop_reason]] يبقى حاجة تانية.

الموديل ممكن يطلب كذا أداة في نفس الرد (parallel)، فتشغّلهم وترجّع كل النتايج في رسالة user واحدة. ولو أداة فشلت أو المدخلات غلط، رجّع [[tool_result]] بـ [[is_error: true]] ورسالة واضحة، والموديل غالبًا يصلّح ويعيد. متشيلش الطلب وخلاص.

[[strict: true]] بيخلي المزوّد يضمن إن [[input]] مطابق للـ schema (لازم [[additionalProperties: false]] و [[required]]). ومع كده [[safeParse]] بـ Zod عندك لسه لازم: الـ schema بتاعة الموديل ممكن تكون أوسع من قواعد البيزنس ([[max(40)]] هنا)، والمدخلات جاية من موديل ممكن يكون اتلعب بيه (المستوى التالت).

حد أقصى للدورات ([[turn < 5]]) عشان لو الموديل فضل يطلب أدوات في لوب متدفعش للأبد. والـ SDK فيه tool runner ([[client.beta.messages.toolRunner]] مع [[betaZodTool]]) بيعمل اللوب ده لوحده وبيعمل validation بـ Zod، بس لازم تفهم اللوب اليدوي الأول. وفي الموديلات الجديدة إجبار الموديل على أداة معينة ([[tool_choice]] من نوع [[tool]] أو [[any]]) بقى بيرجّع 400؛ وجّهه من الوصف والتعليمات.`,
            when: "أي معلومة بتتغير (مواعيد، أسعار، حالة أوردر، الطقس)، أو أي فعل (احجز، ابعت إيميل). ولو كل اللي عايزه JSON من نص، structured output أبسط من أداة.",
            mistakes: "تضيف [[tool_result]] بس وتنسى تضيف رد الموديل اللي فيه [[tool_use]] قبله، فالـ API يرجّع 400. وتشغّل [[block.input]] على الداتابيز من غير validation. ووصف أداة غامض («بيجيب داتا») فالموديل ميعرفش إمتى يستخدمها. ولوب من غير حد أقصى."
          },
          lines: [
            "الـ SDK.",
            "Zod للتحقق من المدخلات قبل ما نشغّل أي حاجة.",
            "الـ client.",
            "قواعد المدخلات عندنا: تاريخ ISO حقيقي، واسم ملعب مش أطول من ٤٠ حرف.",
            "قايمة الأدوات اللي الموديل يقدر يطلبها.",
            "الاسم.",
            "الوصف: بيعمل إيه، وإمتى يستخدمها. ده اللي الموديل بيقرر بيه.",
            "الـ schema اللي بتتبعت للموديل.",
            "ضمان إن المدخلات هتيجي مطابقة للـ schema.",
            "قفلة الأدوات.",
            "الأداة الحقيقية (هنا ثابتة، في الحقيقة query على الداتابيز).",
            "سؤال المستخدم.",
            "لوب بحد أقصى ٥ دورات.",
            "ابعت التاريخ كله والأدوات.",
            "ضيف رد الموديل كله للتاريخ، باللي فيه من tool_use.",
            "لو الموديل مش طالب أداة، يبقى ده الرد النهائي.",
            "اطبع النص.",
            "اخرج.",
            "قفلة.",
            "هنجمّع نتايج كل الأدوات المطلوبة.",
            "لف على الـ blocks.",
            "اللي مش tool_use سيبه.",
            "اتحقق من المدخلات بقواعدنا.",
            "لو سليمة شغّل الأداة، لو لأ رجّع السبب.",
            "النتيجة مربوطة بالـ id بتاع الطلب، ومعلّمة كخطأ لو المدخلات غلط.",
            "قفلة اللف.",
            "كل النتايج في رسالة user واحدة، واللوب يكمّل.",
            "قفلة اللوب."
          ],
          sol: R`للمثال زي ما هو: أول رد فيه [[tool_use]] لـ [[get_free_slots]] بـ [[{ date: "2026-10-02", field: "ملعب ١" }]]، والتاني نص زي «أيوه، فيه ميعاد الساعة ٦ والساعة ٩». يعني [[messages]] في الآخر فيها ٤ رسايل: سؤالك، وطلب الأداة، والنتيجة، والرد.

بعد ما تضيف [[get_price]]: غالبًا الموديل هيطلب الأداتين في نفس الرد (block اتنين [[tool_use]])، واللوب بيشغّلهم الاتنين ويرجّع النتيجتين في رسالة واحدة. لو شفت الـ API بيرجّع 400 بيقول إن فيه [[tool_use]] من غير [[tool_result]]، يبقى رجّعت نتيجة واحدة بس أو نسيت تضيف رد الموديل للتاريخ.

جرّب كمان تخلي [[getFreeSlots]] ترمي خطأ وترجّعه بـ [[is_error: true]]: الموديل المفروض يقول للمستخدم إنه مقدرش يجيب المواعيد، مش يألّف مواعيد.`
        },
        {
          cmd: "embeddings",
          title: "إزاي الكود يعرف إن جملتين معناهم قريب؟",
          desc: R`الـ embedding بيحوّل نص لـ vector: قايمة أرقام (٧٦٨ رقم مثلًا). النصوص اللي معناها قريب بتطلع vectors قريبة من بعض، حتى لو مفيش ولا كلمة مشتركة: «لو كنسلت الحجز هدفع حاجة؟» قريبة من «الإلغاء مجاني قبل الميعاد بـ ٢٤ ساعة».

والقرب بيتحسب بـ cosine similarity: قريبة من 1 = نفس المعنى تقريبًا، وكل ما تقل كل ما المعنى يبعد. ده أساس البحث بالمعنى (semantic search) و RAG.`,
          example: R`import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({});
async function embed(texts, taskType) {
  const res = await ai.models.embedContent({
    model: "gemini-embedding-001",
    contents: texts,
    config: { taskType, outputDimensionality: 768 },
  });
  return res.embeddings.map((e) => e.values);
}
function cosine(a, b) {
  let dot = 0, na = 0, nb = 0;
  for (let i = 0; i < a.length; i++) { dot += a[i] * b[i]; na += a[i] ** 2; nb += b[i] ** 2; }
  return dot / Math.sqrt(na * nb);
}
const docs = ["الإلغاء مجاني قبل الميعاد بـ ٢٤ ساعة", "بنقبل فودافون كاش والكارت", "الملاعب فاتحة لحد ٢ بالليل"];
const docVecs = await embed(docs, "RETRIEVAL_DOCUMENT");
const [q] = await embed(["لو كنسلت الحجز هدفع حاجة؟"], "RETRIEVAL_QUERY");
docs.map((d, i) => ({ score: cosine(q, docVecs[i]), d })).sort((a, b) => b.score - a.score).forEach((r) => console.log(r.score.toFixed(3), r.d));`,
          try: "ضيف جملة ملهاش علاقة خالص («الأهلي كسب امبارح») وجملة بالإنجليزي معناها الإلغاء («Cancellation is free 24h before»)، وشوف ترتيبهم. وبعدين شيل [[taskType]] وقارن الأرقام.",
          flag: "script",
          deep: {
            why: "البحث بالكلمات ([[LIKE]] أو full-text) بيفشل لما المستخدم يستخدم كلمات مختلفة عن اللي في المستند: «كنسلت» مش «الإلغاء». الـ embeddings بتقارن المعنى، وده اللي محتاجه عشان تلاقي الفقرة الصح من صفحات المساعدة.",
            how: R`موديل الـ embeddings غير موديل الشات: بيطلّع أرقام بس، ورخيص جدًا مقارنة بالتوليد. [[gemini-embedding-001]] بيطلّع لحد ٣٠٧٢ رقم، وتقدر تقلّل بـ [[outputDimensionality]] (٧٦٨ و ١٥٣٦ و ٣٠٧٢ الموصى بيهم): أرقام أقل = تخزين وبحث أرخص مع خسارة جودة صغيرة. وجوجل عنده كمان [[gemini-embedding-2]] بيعمل embeddings للصور والنص مع بعض. Anthropic معندهاش موديل embeddings، فحتى لو بتستخدم Claude للرد بتستخدم مزوّد تاني هنا.

[[taskType]]: المستندات بتتحسب بـ [[RETRIEVAL_DOCUMENT]]، والسؤال بـ [[RETRIEVAL_QUERY]]. الموديل بيظبط الـ vector حسب الدور ده، والنتيجة أحسن من إنك تستخدم نفس النوع للاتنين.

قواعد مهمة: (١) كل الـ vectors اللي بتقارنها لازم من نفس الموديل وبنفس عدد الأبعاد. لو غيّرت الموديل، لازم تعيد حساب كل المستندات. (٢) الـ cosine بيقارن الاتجاه بس، فمش فارق الطول. لو هتستخدم dot product بدل cosine لازم الـ vectors تبقى normalized، والدوكيومنتيشن بتقول normalize لو قللت الأبعاد عن ٣٠٧٢. (٣) الأرقام نفسها ملهاش معنى مطلق: ٠.٧ ممكن تبقى «قريب» في موديل و «بعيد» في موديل تاني. العتبة بتتحدد بالتجربة على بياناتك.

والـ embeddings بتتحسب مرة واحدة للمستند وتتخزن (الدرس الجاي: pgvector)، وللسؤال مع كل بحث.`,
            when: "بحث بالمعنى، و RAG، واقتراح أسئلة شبه بعض (FAQ)، وإزالة التكرار، وتجميع رسايل حسب الموضوع، واختيار أمثلة few-shot ديناميكية.",
            mistakes: "تقارن vectors من موديلين مختلفين. وتحسب embedding للمستندات كل طلب بدل ما تخزنها. وتعتمد على عتبة جبتها من مقال بدل ما تجرّب على داتاك. وتفتكر إن الـ embedding بيفهم أرقام ونفي كويس: «مجاني» و «مش مجاني» ممكن يطلعوا قريبين جدًا."
          },
          lines: [
            "الـ SDK بتاع Gemini (نفس اللي في المستوى الأول).",
            "الـ client.",
            "دالة بتحوّل قايمة نصوص لقايمة vectors.",
            "طلب embeddings (تحت [[ai.models]] مش interactions).",
            "موديل الـ embeddings.",
            "النصوص.",
            "نوع الاستخدام، و ٧٦٨ رقم لكل نص.",
            "قفلة الطلب.",
            "من كل embedding خد الأرقام.",
            "قفلة.",
            "cosine similarity: الضرب النقطي مقسوم على حاصل ضرب الأطوال.",
            "مجاميع.",
            "لف على الأرقام: dot product ومربعات كل vector.",
            "النتيجة: من -1 لـ 1.",
            "قفلة.",
            "المستندات (في الحقيقة فقرات من صفحات المساعدة).",
            "embeddings المستندات، بنوع document.",
            "embedding السؤال، بنوع query.",
            "رتّب المستندات حسب قربها من السؤال واطبعهم."
          ],
          sol: R`المتوقع إن جملة الإلغاء تطلع الأولى بفرق واضح، رغم إن السؤال مفيهوش كلمة «الإلغاء». الأرقام نفسها هتختلف (مثلًا ٠.٧ للأولى و ٠.٥ للباقي)، والمهم الترتيب والفرق، مش القيمة.

الجملة الإنجليزي غالبًا هتطلع قريبة جدًا من جملة الإلغاء العربي، لأن الموديل multilingual. وجملة الكورة هتطلع الأخيرة. ولما تشيل [[taskType]] الترتيب غالبًا مش هيتغير في مثال صغير كده، بس الفرق بين الأولى والباقي ممكن يقل.

لو كل الأرقام طلعت قريبة جدًا من بعض (٠.٩٨ و ٠.٩٧)، اتأكد إنك مش بتحسب embedding لنفس النص مرتين أو بتقارن السؤال بنفسه.`
        },
        {
          cmd: "chunking",
          title: "تقطّع المستند لحتت قبل ما تعمله embedding",
          desc: R`مستند طويل كـ vector واحد بيبقى «متوسط» كل المواضيع اللي فيه، فمش بيقرب من أي سؤال محدد. وموديلات الـ embeddings ليها حد للدخول (٢٠٤٨ token في [[gemini-embedding-001]]). عشان كده بتقطّع المستند لحتت (chunks) كل واحدة فيها فكرة، وكل حتة ليها embedding لوحدها.

الحتة الكويسة: كاملة المعنى لوحدها، ومش صغيرة لدرجة إنها تفقد السياق، ومعاها بيانات مصدرها (عنوان المستند والرابط) عشان تقدر تستشهد بيها بعدين.`,
          example: R`function chunk(doc, { max = 700, overlap = 1 } = {}) {
  const paras = doc.text.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
  const out = [];
  let cur = [], fresh = 0;
  for (const p of paras) {
    if (fresh && [...cur, p].join("\n\n").length > max) {
      out.push(cur.join("\n\n"));
      cur = cur.slice(-overlap);
      fresh = 0;
    }
    cur.push(p);
    fresh++;
  }
  if (fresh) out.push(cur.join("\n\n"));
  return out.map((content, i) => ({ source: doc.url, title: doc.title, index: i, content: $__bt# $__{doc.title}\n\n$__{content}$__bt }));
}
const doc = { title: "سياسة الإلغاء", url: "/help/cancel", text: "الإلغاء مجاني قبل الميعاد بـ ٢٤ ساعة.\n\nبعد كده بيتخصم ٥٠٪ من السعر.\n\nلو الملعب اتقفل بسبب المطر الفلوس بترجع كاملة.\n\nالاسترداد بياخد من ٣ لـ ٥ أيام شغل." };
for (const c of chunk(doc, { max: 90 })) console.log(c.index, JSON.stringify(c.content));`,
          try: R`ضيف فقرة واحدة طويلة جدًا (أطول من [[max]]) وشوف بيحصل إيه: هتطلع حتة أكبر من الحد. عدّل الدالة تقسم الفقرة الطويلة على الجمل ([[/(?<=[.!؟?])\s+/]]) لو عدّت الحد.`,
          flag: "script",
          deep: {
            why: "جودة RAG كلها بتتحدد هنا. لو الإجابة متقسمة بين حتتين والبحث جاب واحدة بس، الموديل هيجاوب نص إجابة أو يألّف الباقي. ولو الحتة كبيرة جدًا، البحث بيجيب ٣ حتت مليانة كلام ملوش علاقة وبتدفع tokens عليه.",
            how: R`القطع على حدود طبيعية: الفقرات أحسن من عدد حروف ثابت، لأن القطع الأعمى بيقسم الجملة في النص. والـ markdown فيه عناوين، فالقطع على [[##]] حاجة ممتازة. والكود بيتقطع على الدوال مش السطور.

الـ overlap: آخر فقرة من الحتة بتتكرر في أول اللي بعدها، عشان لو الفكرة على الحدود تبقى كاملة في واحدة منهم على الأقل. و [[fresh]] في الكود بيمنع حتة تتكرر لوحدها من غير أي فقرة جديدة.

العنوان جوه الحتة: «بعد كده بيتخصم ٥٠٪» لوحدها ملهاش معنى: بعد إيه؟ ٥٠٪ من إيه؟ إضافة [[# سياسة الإلغاء]] في أولها بتحسّن الـ embedding والإجابة. بعض الأنظمة بتزود جملة سياق أطول لكل حتة يكتبها موديل (contextual retrieval)، بتكلفة أعلى وقت الإدخال.

الحجم: مفيش رقم سحري. نقطة بداية معقولة: من ٣٠٠ لـ ٨٠٠ token تقريبًا لصفحات المساعدة، وأصغر للأسئلة والأجوبة. وجرّب على أسئلة حقيقية: هل أحسن ٣ نتايج فيهم الإجابة؟

البيانات مع كل حتة ([[source]] و [[title]] و [[index]]): دي اللي هتتخزن جنب الـ vector، وهي اللي بتخليك تعرض «المصدر: سياسة الإلغاء» وتربطه بالصفحة، وتمسح حتت مستند معين لما يتحدّث.`,
            when: "أي مستند أطول من فقرتين هيدخل RAG: صفحات مساعدة، و PDF، وعقود، ودوكيومنتيشن داخلية.",
            mistakes: "تقطع كل ٥٠٠ حرف بالظبط فالجمل تتكسر. وتخزن الحتة من غير مصدرها فمتعرفش تستشهد. وحتت صغيرة جدًا (جملة واحدة) فتفقد السياق. ولما المستند يتعدّل تضيف حتت جديدة من غير ما تمسح القديمة، فالبحث يرجّع السياسة القديمة والجديدة مع بعض."
          },
          lines: [
            "دالة بتاخد مستند وترجّع حتت. max: أقصى طول تقريبي، و overlap: كام فقرة تتكرر.",
            "قسّم على السطور الفاضية (فقرات)، وشيل المسافات والفاضي.",
            "الحتت الجاهزة.",
            "الحتة اللي بنبنيها، وعدد الفقرات الجديدة فيها.",
            "لف على الفقرات.",
            "لو فيه فقرات جديدة والفقرة الجاية هتعدّي الحد.",
            "اقفل الحتة الحالية.",
            "ابدأ الجديدة بآخر فقرة (الـ overlap).",
            "ولسه مفيهاش جديد.",
            "قفلة.",
            "ضيف الفقرة.",
            "وعدّها جديدة.",
            "قفلة اللف.",
            "آخر حتة، لو فيها جديد.",
            "كل حتة معاها مصدرها وترتيبها، والعنوان في أولها عشان تبقى مفهومة لوحدها.",
            "قفلة.",
            "مستند صغير للتجربة.",
            "قطّعه بحد صغير عشان نشوف الـ overlap، واطبع الحتت."
          ],
          sol: R`بالحد 90 المفروض تشوف ٣ حتت، كل واحدة فيها العنوان وفقرتين، والفقرة التانية في كل حتة هي الأولى في اللي بعدها («بعد كده بيتخصم ٥٠٪» في الحتة 0 و 1).

لما تضيف فقرة طويلة جدًا من غير تعديل، هتطلع لوحدها في حتة أطول من [[max]]، لأن الدالة مبتقسمش جوه الفقرة. الحل: قبل اللف، أي فقرة أطول من [[max]] قسّمها على الجمل واعتبر كل جملة فقرة. خلي بالك إن علامة الاستفهام العربي [[؟]] غير الإنجليزي، ولو نسيتها الأسئلة العربي مش هتتقسم.`,
          solCode: R`const sentences = (p) => p.split(/(?<=[.!؟?])\s+/);
function toParas(text, max) {
  return text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)
    .flatMap((p) => (p.length > max ? sentences(p) : [p]));
}`
        },
        {
          cmd: "pgvector",
          title: "تخزّن الـ vectors وتدوّر فيها جوه Postgres",
          desc: R`مش محتاج قاعدة بيانات vectors منفصلة في أغلب المشاريع. [[pgvector]] extension بتضيف لـ Postgres نوع [[vector(n)]]، وعوامل مسافة ([[<=>]] للـ cosine distance)، و indexes للبحث السريع. فالحتت والـ vectors بتاعتها وصلاحيات المستخدمين والفلاتر كلهم في نفس الداتابيز ونفس الـ query.

المثال بـ vectors من ٣ أرقام عشان تشغّله في psql وتشوف النتيجة بعينك. في الحقيقة العمود [[vector(768)]] والأرقام جاية من موديل الـ embeddings.`,
          example: R`CREATE EXTENSION IF NOT EXISTS vector;
CREATE TABLE chunks (
  id bigserial PRIMARY KEY,
  doc_title text NOT NULL,
  doc_url text NOT NULL,
  content text NOT NULL,
  embedding vector(3) NOT NULL
);
INSERT INTO chunks (doc_title, doc_url, content, embedding) VALUES
  ('سياسة الإلغاء', '/help/cancel', 'الإلغاء مجاني قبل الميعاد بـ ٢٤ ساعة، وبعدها بيتخصم ٥٠٪.', '[0.9, 0.1, 0.0]'),
  ('الدفع', '/help/pay', 'بنقبل فودافون كاش والكارت، ومفيش دفع كاش في الملعب.', '[0.1, 0.9, 0.1]'),
  ('المواعيد', '/help/hours', 'الملاعب فاتحة من ٤ العصر لـ ٢ بالليل.', '[0.0, 0.2, 0.9]');
CREATE INDEX ON chunks USING hnsw (embedding vector_cosine_ops);
SELECT id, doc_title, doc_url, round((1 - (embedding <=> '[0.8, 0.2, 0.1]'))::numeric, 3) AS similarity
FROM chunks
ORDER BY embedding <=> '[0.8, 0.2, 0.1]'
LIMIT 2;`,
          try: "لو مش عندك pgvector: [[docker run -e POSTGRES_PASSWORD=pw -p 5432:5432 pgvector/pgvector:pg17]] (أو [[apt install postgresql-16-pgvector]] على Ubuntu). شغّل المثال، وبعدين ابحث بـ [['[0.1, 0.8, 0.2]']] وشوف مين طلع الأول. وجرّب [[EXPLAIN]] قبل الـ SELECT.",
          flag: "script",
          deep: {
            why: "الـ vectors لوحدها ملهاش لازمة من غير النص والمصدر والصلاحيات. لما يبقوا في نفس الجدول، query واحدة بتجيب «أقرب ٥ حتت من مستندات الشركة دي بس، اللي اتحدثت السنة دي» من غير ما تزامن بين نظامين.",
            how: R`النوع: [[vector(768)]] لازم الرقم يطابق عدد أبعاد موديل الـ embeddings بالظبط، وإلا الإدخال بيفشل. والقيمة بتتكتب نص بالشكل [['[0.1, 0.2, ...]']]؛ من Node بتبعت [[JSON.stringify(vec)]] كـ parameter وتعمل [[$1::vector]].

المسافات: [[<=>]] cosine distance (من 0 لـ 2، والـ similarity = 1 ناقصها)، و [[<->]] المسافة العادية (L2)، و [[<#>]] سالب الضرب النقطي. مع embeddings النص استخدم cosine.

الـ index: من غيره Postgres بيحسب المسافة لكل صف (exact، ومضبوط، وبطيء لما الصفوف تبقى مئات الآلاف). [[hnsw]] بيبني graph للبحث التقريبي: سريع جدًا ودقته عالية، والـ opclass لازم يطابق العامل ([[vector_cosine_ops]] مع [[<=>]])، وإلا الـ index مش هيتستخدم. البديل [[ivfflat]] أسرع في البناء بس محتاج داتا موجودة قبل ما تبنيه. والـ index بيشتغل مع [[ORDER BY ... LIMIT]]، وده ليه الشكل ده ثابت في كل query.

الفلاتر: [[WHERE org_id = $2]] مع البحث التقريبي ممكن يرجّع نتايج أقل من الـ LIMIT لأن الـ index بيجيب الأقرب الأول وبعدين الفلتر بيشيل. الإصدارات الأحدث من pgvector (٠.٨ وبعدها) فيها iterative scans بتعالج ده. ولو الفلتر بيقسم الداتا لمجموعات كبيرة، index جزئي أو partitioning بيحل. وفي Prisma النوع ده مش مدعوم مباشرة، فبتستخدم [[Unsupported("vector(768)")]] في الـ schema و [[$queryRaw]] للبحث (تاب «SQL و Prisma»).`,
            when: "أي مشروع عنده Postgres أصلًا ومحتاج بحث بالمعنى، لحد ملايين الحتت. قاعدة vectors منفصلة بتبدأ تستاهل لما الحجم يبقى ضخم جدًا أو محتاج مميزات مش موجودة.",
            mistakes: "عمود [[vector(1536)]] والموديل بيطلّع ٧٦٨. و index بـ [[vector_l2_ops]] والـ query بـ [[<=>]] فالـ index ميتستخدمش. و [[ORDER BY similarity DESC]] (عمود محسوب) بدل [[ORDER BY embedding <=> $1]] فالـ index ميشتغلش. وتنسى [[LIMIT]]."
          },
          lines: [
            "فعّل الـ extension (مرة واحدة لكل داتابيز).",
            "جدول الحتت.",
            "id.",
            "عنوان المستند (للاستشهاد).",
            "رابطه.",
            "نص الحتة نفسها (اللي هيتبعت للموديل).",
            "الـ vector: ٣ أرقام هنا للتجربة، و ٧٦٨ في الحقيقة.",
            "قفلة.",
            "ضيف ٣ حتت.",
            "حتة الإلغاء: الـ vector بتاعها «في اتجاه» الرقم الأول.",
            "حتة الدفع: في اتجاه الرقم التاني.",
            "حتة المواعيد: في اتجاه الرقم التالت.",
            "index تقريبي بـ HNSW للـ cosine distance.",
            "هات الحتت، والـ similarity = 1 ناقص المسافة، متقربة لـ ٣ أرقام.",
            "من الجدول.",
            "رتّب بالمسافة من vector السؤال (ده اللي الـ index بيسرّعه).",
            "أقرب اتنين بس."
          ],
          sol: R`النتيجة للمثال: الإلغاء أول بـ similarity حوالي [[0.984]]، والدفع تاني بحوالي [[0.357]]. لما تبحث بـ [['[0.1, 0.8, 0.2]']] الدفع يطلع الأول.

و [[EXPLAIN]] على جدول فيه ٣ صفوف غالبًا هيوريك [[Seq Scan]] مش الـ index، لأن Postgres شايف إن قراية ٣ صفوف أسرع من الـ index. ده طبيعي؛ جرّب بعد ما تدخّل آلاف الصفوف أو اعمل [[SET enable_seqscan = off]] للتجربة بس، وهتلاقي [[Index Scan using chunks_embedding_idx]].

لو [[CREATE EXTENSION]] فشل بـ [[could not open extension control file]]، الـ extension مش متسطبة على السيرفر نفسه، ودي حاجة بتتعمل بـ apt أو image فيها pgvector، مش من SQL.`
        },
        {
          cmd: "RAG",
          title: "الموديل يجاوب من مستنداتك ويقول المصدر",
          desc: R`RAG (Retrieval-Augmented Generation): قبل ما تسأل الموديل، تجيب الحتت اللي ليها علاقة بالسؤال من مستنداتك، وتحطها في الطلب، وتقوله جاوب منها بس وقول الرقم. كده الإجابة من بياناتك الحقيقية المحدّثة مش من ذاكرة الموديل، وكل جملة ليها مصدر المستخدم يقدر يفتحه.

الخطوات: embedding للسؤال ← أقرب حتت من pgvector ← شيل الضعيف ← ابني الطلب بمصادر مرقّمة ← اطلب إجابة بأرقام المصادر ← اتأكد إن الأرقام دي موجودة فعلًا.`,
          example: R`import pg from "pg";
import { GoogleGenAI } from "@google/genai";
import Anthropic from "@anthropic-ai/sdk";
const db = new pg.Pool();
const ai = new GoogleGenAI({});
const claude = new Anthropic();
async function embedQuery(text) {
  const r = await ai.models.embedContent({ model: "gemini-embedding-001", contents: text, config: { taskType: "RETRIEVAL_QUERY", outputDimensionality: 768 } });
  return r.embeddings[0].values;
}
async function ask(question) {
  const vec = JSON.stringify(await embedQuery(question));
  const { rows } = await db.query(
    "SELECT doc_title, doc_url, content, 1 - (embedding <=> $1::vector) AS score FROM chunks ORDER BY embedding <=> $1::vector LIMIT 5",
    [vec],
  );
  const hits = rows.filter((r) => r.score >= 0.6);
  if (!hits.length) return { answer: "مش لاقي ده في صفحات المساعدة. هحوّلك لحد من الفريق.", sources: [] };
  const context = hits.map((h, i) => $__bt<source id="$__{i + 1}">\n$__{h.content}\n</source>$__bt).join("\n");
  const msg = await claude.messages.create({
    model: "claude-opus-5-5",
    max_tokens: 2048,
    output_config: { effort: "low" },
    system: "جاوب من اللي جوه <source> بس. بعد كل جملة حط رقم مصدرها زي [1]. لو الإجابة مش موجودة فيهم قول «مش لاقي ده في صفحات المساعدة».",
    messages: [{ role: "user", content: $__bt$__{context}\n\nالسؤال: $__{question}$__bt }],
  });
  const answer = msg.content.filter((b) => b.type === "text").map((b) => b.text).join("");
  const cited = [...new Set([...answer.matchAll(/\[(\d+)\]/g)].map((m) => Number(m[1])))];
  const sources = cited.filter((n) => hits[n - 1]).map((n) => ({ n, title: hits[n - 1].doc_title, url: hits[n - 1].doc_url }));
  return { answer, sources };
}
console.log(await ask("لو لغيت قبل الماتش بساعتين هدفع كام؟"));
await db.end();`,
          try: "اعمل جدول [[chunks]] بـ [[vector(768)]]، وادخّل حتت صفحتين مساعدة بعد ما تعملهم embedding بنوع [[RETRIEVAL_DOCUMENT]]. اسأل ٣ أسئلة: واحد إجابته موجودة، وواحد إجابته في حتتين مختلفين، وواحد ملوش إجابة خالص. شوف [[sources]] في كل واحد.",
          flag: "script",
          deep: {
            why: "الموديل ميعرفش سياسة شركتك ولا أسعارك، ولو سألته هيألّف إجابة معقولة وغلط. و fine-tuning مش الحل للمعلومات: غالي، وبيتقادم أول ما السياسة تتغير، ومبيدّيش مصدر. RAG بيخلي تحديث المعلومة = تحديث صف في الداتابيز.",
            how: R`الاسترجاع: السؤال بياخد embedding بنوع query، و pgvector بيجيب أقرب ٥. العتبة ([[0.6]] هنا كمثال، تتحدد بالتجربة على داتاك) بتشيل الحتت البعيدة، ولو مفيش ولا واحدة فاضلة بترد رد ثابت من غير ما تنادي الموديل خالص: أرخص، ومفيش فرصة يألّف.

الطلب: كل حتة بين [[<source id="n">]]، والتعليمات بتقول «من اللي جوه source بس» و «رقم المصدر بعد كل جملة» و «لو مش موجود قول كذا». الحتت في رسالة user مش في الـ system، لأنها بيانات متغيرة مع كل سؤال.

الاستشهاد: الكود بيطلّع الأرقام اللي في الرد ويربطها بالحتت، ويرمي أي رقم مش موجود (الموديل ممكن يكتب [3] وانت بعتّ اتنين). كده الواجهة بتعرض روابط حقيقية بس. Anthropic عندها كمان citations مدمجة: تبعت المستندات كـ blocks نوعها [[document]] بـ [[citations: { enabled: true }]]، والرد بيرجع فيه النص المقتبس بالظبط ومكانه، وده أدق من الأرقام اليدوية.

فين الغلط بيحصل: (١) الاسترجاع جاب حتت غلط: الموديل هيجاوب صح من مصدر غلط. ده أغلب مشاكل RAG، وبتتقاس لوحدها (المستوى التالت: evals). (٢) الحتت صح بس الإجابة متقسمة: chunking. (٣) البحث بالمعنى بيفوّت الكلمات الدقيقة (رقم أوردر، اسم منتج)، فأنظمة كتير بتعمل hybrid: full-text search في Postgres جنب الـ vectors وتدمج النتايج.

وأمان: المستندات دي بتدخل الطلب، فلو حد يقدر يكتب في مستند (تعليق، صفحة، PDF مرفوع)، يقدر يحط فيه تعليمات للموديل. ده prompt injection غير المباشر (المستوى التالت). وفلتر الحتت بصلاحيات المستخدم في نفس الـ query ([[WHERE org_id = $2]])، عشان عميل ميشوفش مستندات عميل تاني في الإجابة.`,
            when: "مساعد دعم من صفحات المساعدة، وبحث في دوكيومنتيشن داخلية، وأسئلة على عقود أو سياسات. لو المستندات كلها صغيرة (أقل من كام ألف token)، ممكن تبعتها كلها في كل طلب مع prompt caching من غير RAG خالص.",
            mistakes: "تبعت أقرب ٥ حتت دايمًا من غير عتبة، فلما السؤال ملوش إجابة الموديل يجاوب من حتت ملهاش علاقة. وتعرض أرقام المصادر من غير ما تتأكد إنها موجودة. ومفيش فلتر صلاحيات فالبحث بيعدّي على مستندات كل العملاء. وفي الانترفيو: «RAG ولا fine-tuning؟» الإجابة: RAG للمعرفة اللي بتتغير ومحتاجة مصدر، و fine-tuning للأسلوب والشكل."
          },
          lines: [
            "درايفر Postgres.",
            "Gemini للـ embeddings.",
            "Claude للإجابة (مزوّدين مختلفين عادي).",
            "الاتصال بالداتابيز من [[PGHOST]] و [[PGUSER]] وأخواتهم في البيئة.",
            "client الـ embeddings.",
            "client الإجابة.",
            "embedding للسؤال.",
            "بنوع query، و ٧٦٨ رقم زي المستندات بالظبط.",
            "الأرقام.",
            "قفلة.",
            "الدالة الأساسية.",
            "الـ vector كنص بالشكل اللي pgvector بيفهمه.",
            "query بـ parameter (مش string concatenation).",
            "أقرب ٥ حتت ومعاها درجة القرب، والـ ORDER BY بالمسافة عشان الـ index يشتغل.",
            "الـ vector كـ parameter.",
            "قفلة.",
            "شيل الحتت البعيدة (العتبة بتتحدد بالتجربة).",
            "مفيش حاجة قريبة: رد ثابت من غير ما ننادي الموديل.",
            "كل حتة بين وسوم برقمها.",
            "اطلب الإجابة.",
            "الموديل.",
            "سقف.",
            "تفكير قليل.",
            "من المصادر بس، ورقم بعد كل جملة، وجملة ثابتة لو مش موجود.",
            "المصادر وبعدها السؤال.",
            "قفلة الطلب.",
            "نص الرد.",
            "الأرقام اللي اتذكرت في الرد، من غير تكرار.",
            "خلّي بس الأرقام اللي ليها حتة فعلًا، واربطها بالعنوان والرابط.",
            "الإجابة ومصادرها الحقيقية.",
            "قفلة.",
            "جرّب.",
            "اقفل الاتصال بالداتابيز."
          ],
          sol: R`للسؤال اللي إجابته موجودة: رد زي «هتدفع نص السعر لأن الإلغاء المجاني قبلها بـ ٢٤ ساعة [1]» و [[sources]] فيها عنصر واحد بعنوان «سياسة الإلغاء» ورابطه.

للسؤال اللي إجابته في حتتين: رقمين مختلفين في الرد، و [[sources]] فيها الاتنين. لو لقيت واحد بس، ارفع [[LIMIT]] أو قلل العتبة، أو الحتة التانية مش متقطعة كويس.

للسؤال اللي ملوش إجابة: المفروض [[hits]] تطلع فاضية والرد الثابت يرجع من غير ما Claude يتنادي أصلًا. لو الموديل اتنادى وقال إجابة، يبقى العتبة واطية على داتاك: اطبع [[rows.map(r => r.score)]] لأسئلة ليها إجابة وأسئلة ملهاش، وحط العتبة في النص بينهم.

خطأ شائع: [[expected 768 dimensions, not 3072]] معناه إن المستندات أو السؤال اتعمل من غير [[outputDimensionality: 768]].`
        },
        {
          cmd: "ذاكرة المحادثة",
          title: "الشات فاكر إيه لما المحادثة تطول؟",
          desc: R`الموديل مبيفتكرش (درس [[context window]]). انت اللي بتبعت التاريخ مع كل رسالة، وكل رسالة زيادة بتكبّر الطلب: أغلى، وأبطأ، ولحد ما يعدّي الحد.

الحل: تخزّن المحادثة كلها عندك في الداتابيز (لأنها ملك المستخدم ومحتاجها للعرض والمراجعة)، بس تبعت للموديل جزء بميزانية tokens: آخر الرسايل كاملة، وملخّص للي قبلها، والحقايق المهمة عن المستخدم (اسمه، ملعبه المفضل) في مكان ثابت.`,
          example: R`const approxTokens = (s) => Math.ceil(s.length / 3);
function fitHistory(history, budget) {
  const kept = [];
  let used = 0;
  for (let i = history.length - 1; i >= 0; i--) {
    const t = approxTokens(history[i].content);
    if (used + t > budget) break;
    kept.unshift(history[i]);
    used += t;
  }
  while (kept.length && kept[0].role !== "user") used -= approxTokens(kept.shift().content);
  return { kept, dropped: history.slice(0, history.length - kept.length), used };
}
const history = Array.from({ length: 12 }, (_, i) => ({ role: i % 2 ? "assistant" : "user", content: "رسالة رقم " + (i + 1) + " ".repeat(40) }));
const { kept, dropped, used } = fitHistory(history, 100);
console.log("اتبعت:", kept.map((m) => m.content.trim()), "| اتشال:", dropped.length, "| tokens تقريبًا:", used);`,
          try: "اكتب [[summarize(dropped)]]: طلب رخيص بيلخّص الرسايل اللي اتشالت في ٥ سطور، ويتحط كرسالة في الأول. واحسب إمتى تعيد التلخيص: كل رسالة؟ ولا لما اللي اتشال يعدّي عدد معين؟",
          flag: "script",
          deep: {
            why: "شات من غير إدارة ذاكرة بيبقى كويس في أول ١٠ رسايل، وبعدين يبطأ ويغلى، وفي الآخر يرجّع 400 لأن الطلب عدّى الحد. والحل الساذج (ابعت آخر ١٠ رسايل) بينسى اسم المستخدم اللي قاله في أول رسالة.",
            how: R`تلات طبقات: (١) آخر الرسايل كاملة: السياق القريب. (٢) ملخّص للي قبلها: بيتعمل بطلب رخيص لما رسايل تخرج من الميزانية، ويتخزن في الداتابيز ويتحدّث كل فترة مش كل رسالة. (٣) حقايق ثابتة: «اسمه كريم، بيحجز ملعب ١ عادة» في جدول لوحدها، تتحط في أول الطلب، ويتحدّث بأداة أو بخطوة استخراج (structured output).

الكود بيمشي من الآخر للأول ويضيف لحد ما الميزانية تخلص، وبعدين يتأكد إن أول رسالة user، لأن Anthropic بيرفض محادثة أولها assistant. والعدّ هنا تقريبي (حرف ÷ ٣) عشان سريع ومن غير طلب؛ لو محتاج دقة قبل ما تقرّب من الحد استخدم [[messages.countTokens]]. وخلي بالك: في الأدوات، [[tool_use]] و [[tool_result]] بتوعه لازم يفضلوا مع بعض، متقصّش بينهم.

ومزوّدين بيقدموا حلول جاهزة: Gemini بيحفظ التاريخ على السيرفر ([[previous_interaction_id]])، و Anthropic عندها compaction (بيتا) بيلخّص التاريخ على السيرفر لما يقرّب من الحد. مريحين، بس لسه محتاج نسختك في الداتابيز: عشان تعرض المحادثة، وتمسحها لو المستخدم طلب، وتراجعها لو فيه شكوى.

والتكلفة: prompt caching (المستوى التالت) بيخلي الجزء الثابت في أول الطلب رخيص، فحط الـ system والحقايق الثابتة والملخّص في الأول، والرسايل الجديدة في الآخر.`,
            when: "أي شات أكتر من كام رسالة، وأي بوت (تيليجرام، واتساب) المستخدم بيرجعله بعد أيام.",
            mistakes: "تبعت التاريخ كله للأبد لحد ما يقع. وتقص من غير ما تتأكد إن أول رسالة user فتاخد 400. وتقص بين tool_use و tool_result. وتلخّص كل رسالة (بتدفع مرتين). وتخزن المحادثة عند المزوّد بس، فلما المستخدم يطلب مسح بياناته متعرفش توصلها."
          },
          lines: [
            "عدّ تقريبي: حرف ÷ ٣ (العربي بياخد tokens أكتر من الإنجليزي). سريع ومن غير طلب.",
            "دالة بتختار آخر رسايل تدخل في ميزانية tokens.",
            "اللي هيتبعت.",
            "المستهلك.",
            "من آخر رسالة لأول رسالة.",
            "حجم الرسالة دي.",
            "لو هتعدّي الميزانية، وقّف.",
            "حطها في الأول (عشان الترتيب يفضل صح).",
            "زوّد المستهلك.",
            "قفلة.",
            "لازم أول رسالة تبقى user: شيل أي assistant في الأول، وانقص حجمها.",
            "اللي اتبعت، واللي اتشال (ده اللي يتلخّص)، والمستهلك.",
            "قفلة.",
            "محادثة وهمية: ١٢ رسالة بالتبادل.",
            "ميزانية ١٠٠ token تقريبًا.",
            "اطبع."
          ],
          sol: R`الناتج: [[اتبعت: [ 'رسالة رقم 9', 'رسالة رقم 10', 'رسالة رقم 11', 'رسالة رقم 12' ] | اتشال: 8 | tokens تقريبًا: 71]]. خمس رسايل كانت هتدخل (٨ لـ ١٢)، بس الثامنة assistant فاتشالت عشان أول رسالة تبقى user.

للتلخيص: لما [[dropped]] يبقى فيه رسايل جديدة عن آخر ملخّص، ابعتهم مع الملخّص القديم لموديل رخيص بتعليمات «حدّث الملخّص ده بالرسايل دي في ٥ سطور، وخلي الأسماء والأرقام والقرارات». الملخّص يتخزن في جدول المحادثة، ويتحط في أول الطلب كرسالة user فيها [[<summary>...</summary>]] قبل [[kept]]. وإمتى: لما يبقى فيه مثلًا ١٠ رسايل خرجوا ومتلخّصوش، مش مع كل رسالة.

الغلط الشائع: الملخّص يتكتب فوق نفسه كل مرة من الرسايل الجديدة بس، فالحقايق القديمة تضيع. لازم الملخّص القديم يدخل في طلب التلخيص الجديد.`,
          solCode: R`import Anthropic from "@anthropic-ai/sdk";
const client = new Anthropic();
async function summarize(oldSummary, dropped) {
  const transcript = dropped.map((m) => $__bt$__{m.role}: $__{m.content}$__bt).join("\n");
  const msg = await client.messages.create({
    model: "claude-haiku-4-5",
    max_tokens: 400,
    system: "حدّث ملخّص المحادثة في ٥ سطور بالكتير. خلّي الأسماء والأرقام والمواعيد والقرارات. متضيفش حاجة مش موجودة.",
    messages: [{ role: "user", content: $__bt<summary>$__{oldSummary}</summary>\n<new_messages>\n$__{transcript}\n</new_messages>$__bt }],
  });
  return msg.content.filter((b) => b.type === "text").map((b) => b.text).join("");
}`
        }
      ]
    }
]);
