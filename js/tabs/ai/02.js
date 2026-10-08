// تكملة تاب ai: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/ai/01.js (شرح حقول الدرس في أوله)
MORE("ai", [
    {
      t: "أول طلب من الكود",
      l: 1,
      n: "نفس الفكرة بتلات SDKs: Gemini من Node، ومن Python، و Claude",
      items: [
        {
          cmd: "@google/genai",
          title: "أول طلب لـ Gemini من Node",
          desc: R`[[@google/genai]] هو الـ SDK الرسمي لـ Gemini في JavaScript. [[new GoogleGenAI({})]] بيقرا المفتاح من [[GEMINI_API_KEY]] لوحده، و [[ai.interactions.create]] هو الطريقة الموصى بيها دلوقتي (Interactions API)، والرد النصي في [[output_text]].

هتلاقي كود أقدم (وفي مشاريعك) بيستخدم [[ai.models.generateContent]] و [[response.text]]. ده لسه مدعوم، بس الجديد كله بينزل على Interactions.`,
          example: R`import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({});
try {
  const it = await ai.interactions.create({
    model: process.env.GEMINI_MODEL ?? "gemini-3.8-flash",
    input: "اشرح الفرق بين let و const في جملتين",
    generation_config: { thinking_level: "low", max_output_tokens: 1000 },
  });
  console.log(it.output_text);
  console.log(it.usage);
} catch (err) {
  console.error("الطلب فشل:", err.message);
}`,
          try: "احفظ الكود في [[first.mjs]] (الامتداد ده بيسمح بـ import و await في أول الملف)، وشغّله بـ [[node --env-file=.env first.mjs]]. بعدين غيّر [[thinking_level]] لـ [[high]] وقارن الوقت و [[total_thought_tokens]].",
          flag: "script",
          deep: {
            why: "الـ SDK بيوفّر عليك تفاصيل HTTP: الـ headers، وشكل الـ JSON، والـ streaming، والأخطاء. وبيتحدّث مع الـ API، فمش هتلاحق الفروق بنفسك.",
            how: R`تحت الغطا هو نفس طلب curl اللي في أول درس: POST على [[/v1beta/interactions]] والمفتاح في header اسمه [[x-goog-api-key]]. الرد فيه [[steps]]: خطوات الموديل بالترتيب (تفكير، واستدعاء أداة، ورد). [[output_text]] اختصار بيجمع آخر نص في الرد؛ لو فيه أدوات أو صور هتلف على [[steps]] بنفسك.

[[generation_config]] فيه إعدادات التوليد: [[thinking_level]] ([[low]] أو [[medium]] أو [[high]] في [[gemini-3.8-flash]])، و [[max_output_tokens]]. التفكير بيحسّن الإجابات الصعبة بس بيزود الوقت والتكلفة، فللمهام البسيطة خليه low.

اسم الموديل من متغير بيئة وليه قيمة افتراضية: كده تغيّر الموديل من غير ما تلمس الكود. في مشروع حقيقي كل أسماء الموديلات والعتبات والـ timeouts كانت في ملف [[config.js]] واحد بيقرا من .env، ومفيش اسم موديل مكتوب في أي مكان تاني.

الفرق بين [[generateContent]] القديم و Interactions: القديم بياخد [[contents]] و [[config]] ويرجّع [[response.text]]، ومفيش حاجة بتتخزن على السيرفر. الجديد بياخد [[input]] و [[system_instruction]] و [[generation_config]]، وبيحفظ الـ interaction افتراضيًا عشان تكمّل بـ [[previous_interaction_id]]. والـ embeddings وعدّ الـ tokens لسه تحت [[ai.models]].`,
            when: "أي مشروع Node أو Next.js (في الـ server بس) بيكلّم Gemini. المشاريع الجديدة على Interactions، والقديمة اللي شغالة بـ generateContent مفيش داعي تستعجل نقلها.",
            mistakes: "تنسى [[await]] فتطبع Promise. وتشغّل ملف [[.js]] في مشروع CommonJS فيقولك [[Cannot use import statement outside a module]]. وتكتب اسم موديل من الذاكرة أو من مقال قديم فتاخد 404: الأسماء بتتغير بسرعة، خدها من صفحة الموديلات في ai.google.dev."
          },
          teach: R`## نفس طلب curl، بس من Node وبأمان

الملف بيبعت سؤال لـ Gemini بالـ SDK الرسمي، ويطبع الرد والاستهلاك، ولو أي حاجة فشلت يطبع السبب بدل ما البرنامج يقع.

> اتشغّل على ويندوز 11 بـ Node 24.19 و [[@google/genai]] 2.28. مفيش مفتاح حقيقي، فالـ SDK اتوجّه لـ mock محلي بمتغير البيئة [[GOOGLE_GEMINI_BASE_URL]] (الـ SDK بيقراه لوحده، والكود نفسه متغيّرش). رسايل الأخطاء اللي طالعة من الـ SDK نفسه حقيقية؛ النص والأرقام والأوقات من الـ mock.

---

## ١. [[import { GoogleGenAI } from "@google/genai";]]

بيجيب الكلاس [[GoogleGenAI]] من الـ SDK. عشان [[import]] يشتغل، الملف لازم يبقى ES Module: امتداد [[.mjs]]، أو [[.js]] في مشروع الـ [[package.json]] بتاعه فيه [["type": "module"]]. جرّبناه [[.js]] في فولدر فيه [["type": "commonjs"]]:

~~~text الناتج
Warning: Failed to load the ES module: ...\first.js. Make sure to set "type": "module" in the nearest package.json file or use the .mjs extension.
...\first.js:1
import { GoogleGenAI } from "@google/genai";
^^^^^^

SyntaxError: Cannot use import statement outside a module
~~~

---

## ٢. [[const ai = new GoogleGenAI({});]]

بيعمل client. الـ [[{}]] الفاضي معناه «دوّر على المفتاح لوحدك» في [[GEMINI_API_KEY]] (أو [[GOOGLE_API_KEY]]). شغّلناه من غير أي مفتاح في البيئة:

~~~text الناتج
API key should be set when using the Gemini API.
الطلب فشل: Unexpected HTTP client error: Error: Could not load the default credentials. ...
~~~

السطر الأول تحذير من الـ SDK إن المفتاح مش موجود، وبعده بيحاول طريقة دخول تانية بتاعة Google Cloud ويفشل. يعني لو شفت «default credentials»، المشكلة غالبًا إن المفتاح مش متقري، مش إن Google Cloud محتاج إعداد.

---

## ٣. [[try { ... } catch (err) { ... }]]

أي حاجة بترمي خطأ جوه [[try]] (مفتاح غلط، 429، شبكة واقعة) بتنط على طول لـ [[catch]]، و [[err]] فيه الخطأ. من غيرها البرنامج يقع بـ stack trace طويل.

---

## ٤. [[const it = await ai.interactions.create({ ... });]]

[[await]] بيستنى الطلب يخلص. لو نسيته، [[it]] هتبقى Promise مش رد. والطلب نفسه POST على [[/v1beta/interactions]]، نفس endpoint الـ curl في أول درس، والـ SDK بيحط المفتاح في header [[x-goog-api-key]] لوحده.

### [[model: process.env.GEMINI_MODEL ?? "gemini-3.8-flash"]]

- [[process.env]] متغيرات البيئة في Node.
- [[??]] (nullish coalescing): لو اللي على الشمال [[undefined]] أو [[null]]، خد اللي على اليمين.

يعني تغيّر الموديل من [[.env]] من غير ما تلمس الكود.

### [[generation_config: { thinking_level: "low", max_output_tokens: 1000 }]]

| الإعداد | معناه |
|---|---|
| [[thinking_level]] | الموديل يفكر قد إيه قبل ما يرد: [[low]] أو [[medium]] أو [[high]] |
| [[max_output_tokens]] | سقف الخروج كله، **والتفكير محسوب منه** |

---

## ٥. [[console.log(it.output_text); console.log(it.usage);]]

~~~text الناتج (من الـ mock)
الـ let بتعمل متغير تقدر تغيّر قيمته بعدين، والـ const قيمته مبتتغيرش بعد أول مرة. الاتنين block-scoped يعني عايشين جوه الـ {} اللي اتعرّفوا فيها بس.
{
  total_input_tokens: 15,
  total_output_tokens: 51,
  total_thought_tokens: 48,
  total_tokens: 114
}
~~~

[[total_tokens]] = 15 + 51 + 48. و [[output_text]] مش جاي من السيرفر: الـ SDK بيحسبه من [[steps]] (بيجمّع نص آخر رد).

---

## ٦. [[catch]]: لما المفتاح غلط

~~~text الناتج بمفتاح غلط
الطلب فشل: 400 API key not valid. Please pass a valid API key.
~~~

[[err.message]] فيه الـ status ([[400]]) ورسالة السيرفر. البرنامج مكملش يقع، طبع سطر واحد مفهوم.

---

## ٧. لو السقف صغير على التفكير

خلّينا [[thinking_level: "high"]] و [[max_output_tokens: 100]]:

~~~text الناتج (من الـ mock)
undefined
{ total_input_tokens: 15, total_output_tokens: 0, total_thought_tokens: 100, total_tokens: 115 }
~~~

التفكير أكل السقف كله، ومفضلش حاجة للرد، فـ [[output_text]] بقى [[undefined]] (الـ SDK مبيحطوش لو مفيش نص). ومفيش أي خطأ اترمى. ده اللي بيحصل فعلًا لما السقف صغير: علّي [[max_output_tokens]].

---

## ٨. الحل (solCode): نقيس low قدام high

| السطر | بيعمل إيه |
|---|---|
| [[for (const level of ["low", "high"])]] | يلف مرتين، مرة بكل مستوى |
| [[const t0 = performance.now();]] | الوقت بالملي ثانية قبل الطلب |
| [[max_output_tokens: 4000]] | سقف أكبر عشان التفكير العالي ميقطعش الرد |
| [[Math.round(performance.now() - t0)]] | الوقت اللي الطلب خده، من غير كسور |

~~~text الناتج (الـ mock بيأخّر الطلب حسب المستوى)
low 395 ms | thought: 48 | out: 51
high 1910 ms | thought: 760 | out: 51
~~~

الأرقام دي من الـ mock، بس الشكل هو اللي هتشوفه مع الموديل الحقيقي: الرد نفسه نفس الطول تقريبًا، والتفكير والوقت هما اللي بيكبروا. والتفكير بيتحاسب بسعر الخروج.

---

## الخلاصة

| الجزء | ليه |
|---|---|
| [[new GoogleGenAI({})]] | المفتاح من [[GEMINI_API_KEY]] |
| [[process.env.GEMINI_MODEL ?? ...]] | الموديل من البيئة وليه قيمة افتراضية |
| [[thinking_level]] | تفكير أقل = أسرع وأرخص |
| [[max_output_tokens]] | سقف للرد **والتفكير مع بعض** |
| [[try/catch]] | خطأ مفهوم بدل ما البرنامج يقع |

- [[output_text]] ممكن يبقى [[undefined]] من غير أي خطأ، فاتعامل مع الحالة دي.
- الكود القديم بـ [[ai.models.generateContent]] و [[response.text]] لسه شغال، والجديد على Interactions.`,
          lines: [
            "استورد الـ SDK.",
            "الـ client. المفتاح من [[GEMINI_API_KEY]].",
            "أي خطأ (مفتاح غلط، 429، شبكة) نمسكه تحت.",
            "ابعت الطلب واستنى الرد.",
            "اسم الموديل من البيئة، ولو مش موجود القيمة دي.",
            "السؤال.",
            "تفكير قليل (أسرع وأرخص)، وسقف للرد.",
            "قفلة الطلب.",
            "النص.",
            "الاستهلاك: دخول وخروج وتفكير.",
            "لو فشل.",
            "اطبع السبب بدل ما البرنامج يقع.",
            "قفلة."
          ],
          sol: R`لو كله تمام هتشوف جملتين بالعامية عن الفرق بين let و const، وتحتهم object الـ [[usage]] فيه [[total_input_tokens]] (رقم صغير، عشرات) و [[total_output_tokens]] و [[total_thought_tokens]]. مع [[high]] المفروض الطلب ياخد وقت أطول بشكل ملحوظ، و [[total_thought_tokens]] يكبر (ممكن أضعاف)، والإجابة نفسها لسؤال سهل زي ده مش هتبقى أحسن تقريبًا. ده الدرس: التفكير العالي بتدفع تمنه وقت وفلوس، ويستاهل في المسائل الصعبة بس. قيس الوقت بـ [[performance.now()]] قبل وبعد الطلب، والأرقام نفسها بتتغير من تشغيل للتاني.

الأخطاء المتوقعة: [[الطلب فشل: ... API key not valid]] يعني [[.env]] مش متقري (نسيت [[--env-file]] أو اسم المتغير غلط). ولو الملف [[first.js]] مش [[.mjs]] هتاخد [[Cannot use import statement outside a module]]. ولو الرد اتقطع أو [[output_text]] طلع undefined مع [[high]]، يبقى [[max_output_tokens: 1000]] صغير على التفكير والرد مع بعض: علّيه.`,
          solCode: R`import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({});
for (const level of ["low", "high"]) {
  const t0 = performance.now();
  const it = await ai.interactions.create({
    model: process.env.GEMINI_MODEL ?? "gemini-3.8-flash",
    input: "اشرح الفرق بين let و const في جملتين",
    generation_config: { thinking_level: level, max_output_tokens: 4000 },
  });
  console.log(level, Math.round(performance.now() - t0), "ms | thought:", it.usage.total_thought_tokens, "| out:", it.usage.total_output_tokens);
}`
        },
        {
          cmd: "google-genai",
          title: "نفس الطلب من Python",
          desc: R`في Python المكتبة اسمها [[google-genai]] (بتتستورد [[from google import genai]]). [[genai.Client()]] بيقرا [[GEMINI_API_KEY]] من البيئة، والطلب بنفس الشكل بأسماء Python.

خلي بالك: فيه مكتبة قديمة اسمها [[google-generativeai]] ([[import google.generativeai as genai]])، ودي متوقفة من آخر ٢٠٢٥. أي tutorial بيستخدمها قديم.`,
          example: R`import os
from google import genai

client = genai.Client()
model = os.getenv("GEMINI_MODEL", "gemini-3.8-flash")

interaction = client.interactions.create(
    model=model,
    system_instruction="جاوب بالعامية المصرية في جملتين.",
    input="يعني إيه virtual environment في Python؟",
)
print(interaction.output_text)
print(interaction.usage)`,
          try: "اعمل venv (التفاصيل في تاب Python)، وسطّب [[pip install google-genai]]، واحفظ الكود في [[first.py]] وشغّله. بعدين اسأل عن حاجة حصلت الأسبوع ده وشوف هيقول إيه.",
          flag: "script",
          deep: {
            why: "أغلب أدوات الـ AI التانية (embeddings محلية، ومعالجة بيانات، و FastAPI) عايشة في Python، فلازم تعرف تكلّم الموديل منها بنفس السهولة.",
            how: R`[[genai.Client()]] بيدوّر على [[GEMINI_API_KEY]] أو [[GOOGLE_API_KEY]] في البيئة. ممكن تمرر [[api_key=]] صريح، بس الأحسن من البيئة (أو من pydantic-settings في FastAPI).

الـ client فيه واجهة sync (اللي في المثال) وواجهة async تحت [[client.aio]]. جوه FastAPI (async) استخدم الـ async، أو شغّل الـ sync في thread، لأن طلب الموديل بياخد ثواني، ولو اشتغل sync جوه [[async def]] هيوقف السيرفر كله لحد ما يخلص. في مشروع حقيقي النداءات كانت بالشكل [[await client.aio.models.generate_content(...)]].

وفي نفس المشروع كل نداءات الموديل كانت ورا interface واحد ([[LLMProvider]] فيه [[generate]] و [[embed]])، ومفيش ملف تاني بيستورد الـ SDK مباشرة. فلما حب يجرّب مزوّد تاني أو موديل محلي، غيّر ملف واحد. عادة تستاهل من أول يوم.

الرد زي Node: [[interaction.output_text]] للنص، و [[interaction.usage]] للـ tokens، و [[interaction.steps]] للتفاصيل.`,
            when: "سكربتات، و FastAPI، ومعالجة بيانات، وأي حاجة معاها sentence-transformers أو pandas.",
            mistakes: "تسطّب [[google-generativeai]] القديمة بسبب tutorial قديم. وتنادي الـ client الـ sync جوه [[async def]] في FastAPI فالسيرفر يقف. وتحط المفتاح في الكود وترفعه على git."
          },
          teach: R`## نفس الطلب، بأسماء Python

الكود بيعمل client، ويبعت سؤال ومعاه تعليمات ثابتة، ويطبع الرد والاستهلاك. نفس فكرة درس Node بالظبط، والفرق في شكل الكتابة بس.

> اتشغّل على ويندوز بـ Python 3.14 جوه venv فيه [[google-genai]] 2.29، والـ client متوجّه لـ mock محلي بمتغير البيئة [[GOOGLE_GEMINI_BASE_URL]] (المكتبة بتقراه لوحدها). رسايل الأخطاء وشكل [[usage]] حقيقيين من المكتبة؛ النص والأرقام من الـ mock.

---

## ١. [[import os]] و [[from google import genai]]

- [[os]] موديول جاي مع Python، هنستخدمه نقرا متغيرات البيئة.
- [[from google import genai]]: الباكدج اللي بتسطّبه اسمه [[google-genai]] (بشرطة)، بس بيتستورد كده. ده الجديد. القديم كان [[import google.generativeai as genai]] من باكدج [[google-generativeai]] اللي اتوقفت.

---

## ٢. [[client = genai.Client()]]

من غير أي argument، بيدوّر على المفتاح في [[GEMINI_API_KEY]] أو [[GOOGLE_API_KEY]]. شغّلناه من غير مفتاح:

~~~text الناتج
ValueError: No API key was provided. Please pass a valid API key. Learn how to create an API key at https://ai.google.dev/gemini-api/docs/api-key.
~~~

لاحظ إن Python بيوقف من أول سطر بخطأ واضح، مش زي Node اللي بيحذّر ويكمّل.

---

## ٣. [[model = os.getenv("GEMINI_MODEL", "gemini-3.8-flash")]]

[[os.getenv(اسم, افتراضي)]]: لو المتغير موجود رجّع قيمته، غير كده رجّع القيمة التانية. ده نفس [[??]] في Node.

---

## ٤. [[interaction = client.interactions.create(...)]]

| Python | Node | معناه |
|---|---|---|
| [[model=model]] | [[model]] | الموديل |
| [[system_instruction="..."]] | [[system_instruction: "..."]] | التعليمات الثابتة |
| [[input="..."]] | [[input: "..."]] | السؤال |

في Python الـ arguments بتتكتب [[اسم=قيمة]] (keyword arguments) بدل object. ومفيش [[await]]: ده الـ client الـ sync، يعني السطر بيستنى لحد ما الرد ييجي. (الـ async تحت [[client.aio]]، ودي اللي تستخدمها جوه [[async def]] في FastAPI عشان طلب بياخد ثواني ميوقفش السيرفر كله.)

---

## ٥. [[print(interaction.output_text)]]

~~~text الناتج (من الـ mock)
الـ virtual environment فولدر فيه نسخة Python ومكتباتها للمشروع ده بس. كده كل مشروع ليه مكتباته ونسخها من غير ما يبوّظ التاني.
~~~

---

## ٦. [[print(interaction.usage)]]

~~~text الناتج (شكل المكتبة الحقيقي، والأرقام من الـ mock)
cached_tokens_by_modality=None grounding_tool_count=None input_tokens_by_modality=None output_tokens_by_modality=None tool_use_tokens_by_modality=None total_cached_tokens=None total_input_tokens=23 total_output_tokens=38 total_thought_tokens=180 total_tokens=241 total_tool_use_tokens=None
~~~

سطر طويل وفيه [[None]] كتير، ده مش خطأ. [[usage]] object من pydantic (مكتبة بتعرّف شكل البيانات)، و [[print]] بيطبع كل خاناته، واللي السيرفر مرجّعهوش بيبقى [[None]]. لو عايز رقم واحد:

~~~text
interaction.usage.total_input_tokens
~~~

وزي Node، [[interaction.steps]] فيها الخطوات بالترتيب. في نفس التشغيل كانت [[['thought', 'model_output']]].

---

## ٧. لو المفتاح غلط

~~~text الناتج (آخر سطر)
google.genai._gaos.lib.compat_errors.BadRequestError: Error code: 400 - {'error': {'code': 400, 'message': 'API key not valid. Please pass a valid API key.', 'status': 'INVALID_ARGUMENT'}}
~~~

نفس رد السيرفر اللي شفناه بـ curl، بس متغلّف في exception نوعه [[BadRequestError]]. هنا مفيش [[try]] في المثال، فالبرنامج وقع؛ في سكربت حقيقي امسكه بـ [[try / except]].

---

## الخلاصة

| الخطوة | السطر |
|---|---|
| تسطيب | [[pip install google-genai]] جوه venv |
| استيراد | [[from google import genai]] |
| client | [[genai.Client()]] بيقرا [[GEMINI_API_KEY]] |
| طلب | [[client.interactions.create(model=..., system_instruction=..., input=...)]] |
| النص | [[interaction.output_text]] |
| الاستهلاك | [[interaction.usage.total_input_tokens]] وأخواتها |

- [[google-generativeai]] القديمة متوقفة. أي tutorial بيستخدمها قديم.
- جوه FastAPI استخدم [[client.aio]].
- الموديل مفيهوش أخبار: سؤال عن حاجة حصلت الأسبوع ده هيطلّع «مش عارف» في أحسن حالة، أو تأليف.`,
          lines: [
            "عشان نقرا متغيرات البيئة.",
            "الـ SDK الرسمي الجديد.",
            "الـ client. المفتاح من [[GEMINI_API_KEY]].",
            "الموديل من البيئة، وإلا القيمة الافتراضية.",
            "ابعت الطلب.",
            "الموديل.",
            "التعليمات الثابتة.",
            "السؤال.",
            "قفلة.",
            "النص.",
            "الاستهلاك."
          ],
          sol: R`بعد [[python3 -m venv .venv]] و [[source .venv/bin/activate]] و [[pip install google-genai]]، تشغيل [[python first.py]] المفروض يطبع جملتين عن الـ venv، وتحتهم سطر طويل زي [[total_input_tokens=26 total_output_tokens=... total_thought_tokens=...]] وحقول تانية كتير قيمتها [[None]]. ده مش خطأ: [[usage]] object من pydantic، واللي مش متاح بيطلع None. لو عايز رقم واحد اكتب [[interaction.usage.total_input_tokens]].

سؤال عن حاجة حصلت الأسبوع ده هيطلّع واحدة من تلاتة: يقولك صراحةً إن معلوماته لحد تاريخ معين ومش عارف (أحسن حالة)، أو يتكلم عن أحداث قديمة كأنها جديدة، أو يألّف تفاصيل مقنعة. التانية والتالتة هما الـ hallucination اللي في أول درس: الموديل مفيهوش أخبار، إلا لو اديته أداة بحث (زي Google Search grounding) أو حطيت الخبر في الطلب.

الأخطاء المعتادة: [[ModuleNotFoundError: No module named 'google']] يعني سطّبت برا الـ venv أو شغّلت بـ python تاني. و [[AttributeError]] على [[interactions]] يعني نسخة قديمة من المكتبة ([[pip install -U google-genai]])، أو سطّبت [[google-generativeai]] القديمة بالغلط.`
        },
        {
          cmd: "@anthropic-ai/sdk",
          title: "نفس الطلب لـ Claude",
          desc: R`الـ SDK بتاع Anthropic شكله مختلف شوية، بس نفس الفكرة: [[client.messages.create]] بياخد [[model]] و [[max_tokens]] (إجباري) و [[system]] و [[messages]] (قايمة user و assistant). والرد [[content]] قايمة blocks، والنص في الـ blocks اللي نوعها [[text]].

[[new Anthropic()]] بيقرا [[ANTHROPIC_API_KEY]] من البيئة.`,
          example: R`import Anthropic from "@anthropic-ai/sdk";
const client = new Anthropic();
const msg = await client.messages.create({
  model: "claude-opus-5-5",
  max_tokens: 4096,
  system: "جاوب بالعامية المصرية في جملتين.",
  messages: [{ role: "user", content: "يعني إيه REST API؟" }],
});
const text = msg.content.filter((b) => b.type === "text").map((b) => b.text).join("");
console.log(text);
console.log(msg.stop_reason, msg.usage.input_tokens, msg.usage.output_tokens);`,
          try: "سطّب [[npm i @anthropic-ai/sdk]] وشغّله. بعدين نزّل [[max_tokens]] لـ 20 وشوف [[stop_reason]] بقى [[max_tokens]] والرد مقطوع أو فاضي.",
          flag: "script",
          deep: {
            why: "مش هتفضل على مزوّد واحد: موديل أحسن في مهمة معينة، أو المزوّد الأساسي وقع أو بطيء. لازم تعرف تكتب نفس الطلب للتاني في دقايق.",
            how: R`الفروق اللي بتفرق: (١) [[max_tokens]] إجباري، وده سقف الرد (والتفكير معاه) مش الطول المطلوب. (٢) مفيش حفظ للمحادثة على السيرفر: انت بتبعت [[messages]] كلها كل مرة، وأول رسالة لازم تبقى [[user]]. (٣) الرد blocks: ممكن [[text]] و [[thinking]] و [[tool_use]] في نفس الرد، فمتقراش أول block وخلاص. (٤) [[stop_reason]] بيقولك وقف ليه: [[end_turn]] خلص، و [[max_tokens]] اتقطع، و [[tool_use]] عايز أداة، و [[refusal]] رفض.

الموديلات الحالية: [[claude-opus-5-5]] الافتراضي، و [[claude-sonnet-5-5]] أسرع وأرخص، و [[claude-haiku-4-5]] الأرخص للمهام البسيطة. في الموديلات الجديدة التفكير شغال دايمًا والتحكم فيه بـ [[output_config: { effort: 'low' }]] مثلًا، و [[temperature]] مرفوضة.

الـ SDK بيعمل retry لوحده على 429 و 5xx (مرتين افتراضيًا)، وليه أنواع أخطاء ([[Anthropic.RateLimitError]] وغيرها) تفرّق بيها في الـ catch بدل ما تقرا نص الرسالة.

في مشروع حقيقي (مساعد ميتنج) الكود كان بيختار المزوّد من .env: Gemini لو مفتاحه موجود، وإلا Claude، بنفس الـ system prompt. وبعدين اتضاف إعداد يخلي Claude هو اللي يكتب الإجابات، لأن الـ free tier بتاع Gemini كان بيأخّر ٤-١٢ ثانية و Haiku كان بيرد في حوالي ثانية.`,
            when: "لما تحتاج جودة أعلى في كتابة أو كود، أو كمزوّد احتياطي، أو لما عميلك أصلًا على Anthropic.",
            mistakes: "[[msg.content[0].text]] مباشرة: لو أول block كان thinking أو tool_use هتاخد undefined. و [[max_tokens]] صغير جدًا فالرد يتقطع وانت فاكره خلص (بص على [[stop_reason]]). وتبدأ [[messages]] برسالة assistant: أول رسالة لازم user."
          },
          teach: R`## نفس السؤال لـ Claude: الشكل مختلف والفكرة واحدة

الكود بيبعت سؤال لـ [[claude-opus-5-5]]، ويجمّع النص من الرد، ويطبع ليه الموديل وقف وكام token اتصرف.

> اتشغّل على ويندوز بـ Node 24.19 و [[@anthropic-ai/sdk]] 0.132، والـ SDK متوجّه لـ mock محلي بمتغير البيئة [[ANTHROPIC_BASE_URL]] (الـ SDK بيقراه لوحده). شكل الرد (الـ blocks، و [[stop_reason]]، و [[usage]]) زي الـ API الحقيقي حسب الـ docs؛ النص والأرقام من الـ mock. رسالة الخطأ 401 نوعها من الـ SDK نفسه.

---

## ١. [[import Anthropic from "@anthropic-ai/sdk";]]

هنا من غير [[{ }]]: الـ SDK بيصدّر الكلاس كـ default export، فبتستورده باسم انت تختاره (والعادة [[Anthropic]]).

---

## ٢. [[const client = new Anthropic();]]

بيقرا المفتاح من [[ANTHROPIC_API_KEY]] لوحده، وبيبعته في header اسمه [[x-api-key]]. بمفتاح غلط:

~~~text الناتج
AuthenticationError: 401 {"type":"error","error":{"type":"authentication_error","message":"invalid x-api-key"},"request_id":"..."}
~~~

هنا 401 (مش 400 زي Google)، والـ SDK بيرمي كلاس مخصوص [[AuthenticationError]]، فتقدر تفرّق في الـ catch بـ [[instanceof]] بدل ما تقرا نص الرسالة.

---

## ٣. [[client.messages.create({ ... })]]

| الحقل | معناه |
|---|---|
| [[model: "claude-opus-5-5"]] | الموديل |
| [[max_tokens: 4096]] | **إجباري**. سقف الرد والتفكير مع بعض، مش الطول المطلوب |
| [[system: "..."]] | التعليمات الثابتة في حقل لوحدها |
| [[messages: [{ role: "user", content: "..." }]]] | المحادثة كلها: قايمة رسايل، كل واحدة ليها [[role]] ([[user]] أو [[assistant]]) و [[content]] |

مفيش حفظ للمحادثة على السيرفر هنا. لو عايز تكمّل، بتبعت [[messages]] كلها تاني ومعاها الجديد، وأول رسالة لازم [[user]].

---

## ٤. [[const text = msg.content.filter(...).map(...).join("");]]

الرد مش نص واحد. [[msg.content]] قايمة blocks، وده اللي رجع فعلًا:

~~~text msg.content (أنواع الـ blocks)
[ 'thinking', 'text' ]
~~~

أول block نوعه [[thinking]]: الموديل فكّر قبل ما يرد. وفي [[claude-opus-5-5]] التفكير شغال دايمًا ونصه مش بيرجع افتراضيًا (الخانة [[thinking]] فاضية وفيه [[signature]] بس). النص في الـ block التاني.

السلسلة من الشمال لليمين:

1. [[.filter((b) => b.type === "text")]]: خلي الـ blocks النصية بس.
2. [[.map((b) => b.text)]]: من كل واحد خد النص.
3. [[.join("")]]: الزقهم في نص واحد (ممكن يبقوا أكتر من واحد).

ولو كتبت [[msg.content[0].text]] على طول:

~~~text الناتج
content[0].text = undefined
~~~

لأن أول block هو التفكير مش النص.

---

## ٥. [[console.log(msg.stop_reason, msg.usage.input_tokens, msg.usage.output_tokens);]]

~~~text الناتج بـ max_tokens: 4096 (الأرقام من الـ mock)
الـ REST API طريقة إن برنامجين يكلّموا بعض على HTTP، ...
end_turn 21 149
~~~

- [[stop_reason]]: وقف ليه. [[end_turn]] = خلّص كلامه لوحده.
- [[input_tokens]]: الـ system والرسالة. [[output_tokens]]: الرد **والتفكير** مع بعض.

| [[stop_reason]] | معناه |
|---|---|
| [[end_turn]] | خلص |
| [[max_tokens]] | اتقطع عند السقف |
| [[tool_use]] | عايز يشغّل أداة (درس tool calling) |
| [[refusal]] | رفض |

---

## ٦. لما [[max_tokens: 20]]

~~~text الناتج (من الـ mock)

max_tokens 21 20
[ 'thinking' ]
~~~

السطر الأول فاضي: مفيش ولا block نصي، لأن التفكير خلّص الـ 20 كلهم. و [[stop_reason]] بقى [[max_tokens]]. والمهم: **مفيش أي exception**، الطلب نجح من وجهة نظر الـ API. عشان كده الكود الحقيقي بيفحص [[stop_reason]] قبل ما يعتبر الرد كامل.

---

## الخلاصة

| Gemini (Interactions) | Claude (Messages) |
|---|---|
| [[new GoogleGenAI({})]] + [[GEMINI_API_KEY]] | [[new Anthropic()]] + [[ANTHROPIC_API_KEY]] |
| [[input]] | [[messages]] (قايمة) |
| [[system_instruction]] | [[system]] |
| [[max_output_tokens]] اختياري | [[max_tokens]] إجباري |
| [[it.output_text]] | فلتر الـ blocks اللي نوعها [[text]] |
| التاريخ ممكن يتحفظ على السيرفر | انت بتبعت التاريخ كله دايمًا |

- الرد blocks، فمتقراش أول واحد وخلاص.
- [[stop_reason]] هو اللي يقولك الرد كامل ولا اتقطع.
- الـ SDK بيعمل retry لوحده مرتين على 429 و 5xx.`,
          lines: [
            "الـ SDK الرسمي.",
            "الـ client. المفتاح من [[ANTHROPIC_API_KEY]].",
            "ابعت رسالة.",
            "الموديل.",
            "سقف الرد (إجباري).",
            "التعليمات الثابتة في حقل لوحده.",
            "المحادثة: رسالة واحدة من المستخدم.",
            "قفلة الطلب.",
            "اجمع كل الـ blocks النصية بس (ممكن يبقى فيه blocks تانية).",
            "اطبع الرد.",
            "وقف ليه، واستهلك كام."
          ],
          sol: R`بـ [[max_tokens: 4096]]: جملتين عن REST، وبعدين سطر زي [[end_turn 30 60]] (الأرقام تقريبية). [[end_turn]] معناها إن الموديل خلص كلامه لوحده.

بـ [[max_tokens: 20]]: السطر التاني هيبقى [[max_tokens]] ومعاه [[output_tokens]] قريب من 20. النص يا إما مقطوع في نص جملة، يا إما فاضي خالص (سطر فاضي)، لأن الموديلات الجديدة بتفكر الأول، والتفكير بيتحسب من نفس الـ 20 فممكن يخلّصهم قبل ما يكتب حرف. والمهم إن مفيش أي exception: الـ API اعتبر الطلب ناجح. عشان كده الكود الحقيقي لازم يفحص [[stop_reason]]، مش يفترض إن أي رد رجع يبقى كامل.

لو طلعلك [[401 authentication_error]] يبقى [[ANTHROPIC_API_KEY]] مش في البيئة. ولو اتطبع [[undefined]] (أو [[TypeError]] مع [[max_tokens]] صغير و [[content]] فاضية) يبقى كتبت [[msg.content[0].text]] بدل الفلتر.`
        }
      ]
    }
]);
