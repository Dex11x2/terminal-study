// تكملة تاب ai: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/ai/01.js (شرح حقول الدرس في أوله)
MORE("ai", [
    {
      t: "موديل على جهازك: Ollama",
      l: 2,
      n: "Ollama في Docker بموديل صغير، و API بتاعه، و endpoint متوافق مع OpenAI من Node و Python، و embeddings محلي، وإمتى المحلي يكسب وإمتى يخسر",
      items: [
        {
          cmd: "ollama في Docker",
          title: "شغّل موديل لغة على جهازك من غير مفتاح ولا فلوس",
          desc: R`Ollama برنامج بيشغّل موديلات مفتوحة (Qwen و Gemma و Llama وغيرهم) على جهازك، وبيعرضها كـ HTTP API على بورت 11434. في Docker: container واحد من [[ollama/ollama]]، و volume للموديلات عشان متتنزلش تاني، وبعدين [[ollama pull]] لموديل و [[ollama run]] تكلّمه.
الموديلات الصغيرة (أقل من ١ جيجا) بتشتغل على CPU عادي، بس أضعف بكتير من الموديلات الكبيرة المستضافة: كويسة للتجربة والمهام البسيطة والداتا اللي متطلعش برّه جهازك.`,
          example: R`docker run -d --name ollama -v ollama:/root/.ollama -p 127.0.0.1:11434:11434 ollama/ollama
docker exec ollama ollama pull qwen3:0.6b
docker exec ollama ollama list
docker exec -it ollama ollama run qwen3:0.6b --think=false --verbose "يعني إيه API؟ جاوب بجملة واحدة."
docker exec ollama ollama ps
docker stop ollama`,
          try: R`شغّل الأوامر، واسأل الموديل نفس السؤال مرة بالعربي ومرة بالإنجليزي، ومرة من غير [[--think=false]]. قارن الجودة والوقت ([[eval rate]]). وفي الآخر شوف حجم الصورة والموديل بـ [[docker images ollama/ollama]] و [[ollama list]]، ولو خلصت امسحهم.`,
          deep: {
            why: "تقدر تجرّب وتبني features بموديل لغة من غير API key ولا فاتورة، والداتا مبتطلعش من جهازك (مهم لو بتشتغل على داتا عملاء أو كود مقفول). ونفس الـ API بتاعه بيشتغل في CI أو في سيرفر داخلي.",
            how: R`[[ollama/ollama]] فيه السيرفر والـ CLI. السيرفر بيسمع على 11434 جوه الـ container، و [[-p 127.0.0.1:11434:11434]] بيفتحه على جهازك **بس** (من غير [[127.0.0.1]] أي حد على نفس الشبكة يقدر يستخدمه، ومفيش مصادقة). [[-v ollama:/root/.ollama]] volume باسم [[ollama]] فيه الموديلات، فلو مسحت الـ container ورجعته مش هتنزّل تاني.

[[ollama pull qwen3:0.6b]]: [[qwen3]] اسم الموديل و [[0.6b]] الـ tag (حوالي ٦٠٠ مليون parameter). الموديل بيتنزل كملف GGUF مضغوط (quantized، هنا [[Q4_K_M]] يعني كل وزن حوالي ٤ bits) فحجمه 522 MB بدل حوالي ١.٥ جيجا. [[ollama run]] بيحمّل الموديل في الذاكرة لو مش محمّل، وبيسيبه ٥ دقايق بعد آخر طلب ([[UNTIL]] في [[ollama ps]]) عشان الطلب الجاي يبقى سريع.

[[qwen3]] بيفكر قبل ما يرد افتراضيًا (thinking)، وده بيضاعف الوقت على CPU. [[--think=false]] بيقفله. و [[--verbose]] بيطبع الأرقام: [[eval rate]] هو سرعة الكتابة بالـ tokens في الثانية.

GPU: الصورة فيها مكتبات NVIDIA (عشان كده حجمها كبير)، وبتستخدمها لو شغّلت بـ [[--gpus=all]] على جهاز عليه NVIDIA و Docker متظبط ليه (من الـ docs). من غير GPU بيشتغل على CPU، وده اللي جربناه.`,
            when: "تجربة وتعلم، ونماذج أولية، ومهام بسيطة متكررة (تصنيف، استخراج حقول)، وداتا ممنوع تطلع برّه، و CI بيختبر الكود اللي بيكلّم موديل. ولو المهمة محتاجة جودة عالية (كود معقد، تحليل طويل، عربي كويس) الموديل الصغير مش هيكفي.",
            mistakes: R`[[-p 11434:11434]] من غير [[127.0.0.1]] فالـ API يبقى مفتوح للشبكة كلها. ومن غير volume فكل مرة تنزّل الموديل تاني. وتحكم على «الـ AI» كله من موديل 0.6b. وتنسى إن الصورة نفسها حوالي ٨ جيجا على الديسك. و [[ollama run]] من غير [[-it]] مع [[docker exec]] لما عايز تكتب أسئلة ورا بعض (من غير [[-it]] بيرد على السؤال اللي في الأمر بس).`
          },
          teach: R`## موديل على جهازك في ٦ أوامر

الأوامر بتشغّل سيرفر Ollama في container، وتنزّل موديل صغير ([[qwen3:0.6b]])، وتعرض الموديلات اللي عندك، وتسأله سؤال وتطبع سرعته، وتشوف إيه المحمّل في الذاكرة، وبعدين توقف الـ container.

> اتشغّل على ويندوز (Docker Desktop، من Git Bash) بـ [[ollama/ollama]] (Ollama 0.40.11) على CPU بس (Ryzen 9 5900HX، ١٦ logical processor، من غير GPU). الـ container والـ volume كانوا بأسامي تانية في التجربة عشان ميتلخبطوش مع أي حاجة عند المستخدم، واتمسحوا في الآخر. الأوامر نفسها نفس الشكل في PowerShell وعلى لينكس.

---

## ١. [[docker run -d --name ollama -v ollama:/root/.ollama -p 127.0.0.1:11434:11434 ollama/ollama]]

| الحتة | معناها |
|---|---|
| [[-d]] | (detached) اشتغل في الخلفية |
| [[--name ollama]] | اسم الـ container، عشان الأوامر الجاية |
| [[-v ollama:/root/.ollama]] | volume اسمه [[ollama]] مكان الموديلات جوه الـ container. بيفضل لو الـ container اتمسح |
| [[-p 127.0.0.1:11434:11434]] | بورت 11434 على جهازك **بس** يوصّل لنفس البورت جوه |
| [[ollama/ollama]] | الصورة الرسمية |

> الصورة كبيرة: [[docker images]] قال **8.43GB** (فيها مكتبات GPU). خد بالك من مساحة الديسك.

اللوج أول ما اشتغل ([[docker logs ollama]]) فيه سطر بيقول هيستخدم إيه:

~~~text الناتج (جزء)
msg="inference compute" id=cpu library=cpu ... total="15.3 GiB" available="15.0 GiB"
msg="vram-based default context" total_vram="0 B" default_num_ctx=4096
~~~

مفيش GPU ([[total_vram="0 B"]])، فهيشتغل على الـ CPU والـ RAM. و [[default_num_ctx=4096]]: الـ context window الافتراضي ٤٠٩٦ token (درس [[context window]]).

---

## ٢. [[docker exec ollama ollama pull qwen3:0.6b]]

- [[docker exec ollama]]: شغّل أمر جوه الـ container اللي اسمه [[ollama]].
- [[ollama pull qwen3:0.6b]]: نزّل الموديل. [[qwen3]] العيلة، و [[0.6b]] الحجم (b = billion parameters).

~~~text الناتج (آخره)
pulling 7f4030143c1c: 100% ▕██████████████████▏ 522 MB
~~~

الملف الكبير هو الأوزان. ولو النت قطع في الآخر، [[ollama pull]] تاني بيكمّل من مكانه (حصلت في التجربة).

---

## ٣. [[docker exec ollama ollama list]]

~~~text الناتج
NAME          ID              SIZE      MODIFIED
qwen3:0.6b    7df6b6e09427    522 MB    10 seconds ago
~~~

و [[curl http://localhost:11434/api/tags]] بيطلّع نفس القايمة JSON ومعاها تفاصيل: [[parameter_size: "751.63M"]]، و [[quantization_level: "Q4_K_M"]] (كل وزن متخزّن في حوالي ٤ bits بدل ١٦، عشان كده الحجم صغير)، و [[context_length: 40960]] (أقصى context الموديل يقدر عليه)، و [[capabilities: ["completion","tools","thinking"]]].

---

## ٤. [[docker exec -it ollama ollama run qwen3:0.6b --think=false --verbose "..."]]

- [[-it]]: terminal تفاعلي. لو شلت السؤال من الأمر، هيفتح شات تكتب فيه (و [[/bye]] تخرج).
- [[--think=false]]: من غير تفكير قبل الرد.
- [[--verbose]]: اطبع الأرقام في الآخر.

~~~text الناتج
نعم، API (Application Programming Interface) هو مفهوم يربط بين بين التطبيقات والبيانات المُحْدَّثَة.

total duration:       553.835971ms
load duration:        756.915µs
prompt eval count:    30 token(s)
prompt eval duration: 53.498ms
prompt eval rate:     504.69 tokens/s
eval count:           35 token(s)
eval duration:        480.57ms
eval rate:            72.83 tokens/s
~~~

نقرا:

- **الرد**: «بين بين» مكررة والجملة مش مفهومة قوي. موديل 0.6b عربيّه ضعيف. بالإنجليزي رد بجملة سليمة. ده الفرق الحقيقي بين موديل صغير وموديل كبير مستضاف.
- [[load duration]]: [[756µs]] لأن الموديل كان محمّل من سؤال قبله. أول مرة بتاخد أكتر (الدرس الأخير).
- [[prompt eval]]: قراية السؤال، ٣٠ token بسرعة ٥٠٥ token/ثانية.
- [[eval]]: الكتابة، ٣٥ token بسرعة **٧٣ token/ثانية** على CPU.

ومن غير [[--think=false]] الموديل كتب فقرة تفكير بالإنجليزي («Wait, is that all? Maybe I should check...») وبعدين [[...done thinking.]] وبعدين الرد. التفكير بيتحسب tokens ووقت، وعلى CPU ده بيفرق.

---

## ٥. [[docker exec ollama ollama ps]]

~~~text الناتج
NAME          ID              SIZE      PROCESSOR    CONTEXT    RUNNER      UNTIL
qwen3:0.6b    7df6b6e09427    1.0 GB    100% CPU     4096       llamacpp    4 minutes from now
~~~

- [[SIZE 1.0 GB]]: في الذاكرة أكبر من الملف (522 MB)، لأن فيه مكان للـ context كمان.
- [[100% CPU]]: مفيش GPU.
- [[UNTIL 4 minutes from now]]: هيفضل محمّل ٥ دقايق من آخر طلب، وبعدين يتشال من الذاكرة.

و [[docker stats]] قال إن الـ container كله واخد حوالي 1.6 GiB RAM.

---

## ٦. [[docker stop ollama]]

بيوقف الـ container. الموديل في الـ volume، فـ [[docker start ollama]] بيرجّعه من غير تنزيل. والمسح الكامل لما تخلص: [[docker rm ollama]] وبعدين [[docker volume rm ollama]] (بيمسح الموديلات) و [[docker rmi ollama/ollama]].

---

## الخلاصة

| الأمر | بيعمل |
|---|---|
| [[docker run ... -v ollama:/root/.ollama -p 127.0.0.1:11434:11434 ollama/ollama]] | السيرفر، والموديلات في volume، والبورت لجهازك بس |
| [[ollama pull <model>]] | تنزيل (بيكمّل لو اتقطع) |
| [[ollama list]] / [[ollama ps]] | اللي على الديسك / اللي في الذاكرة |
| [[ollama run <model> --think=false --verbose]] | سؤال، ومعاه السرعة |

- موديل 0.6b بيشتغل على أي لابتوب بسرعة معقولة، بس جودته (خصوصًا بالعربي) أقل بكتير من الموديلات الكبيرة.`,
          lines: [
            "شغّل سيرفر Ollama في الخلفية، والموديلات في volume، والبورت لجهازك بس.",
            "نزّل موديل صغير (522 MB).",
            "اعرض الموديلات اللي على الديسك.",
            "اسأله سؤال من غير تفكير، واطبع الأرقام.",
            "اعرض الموديلات المحمّلة في الذاكرة ولحد إمتى.",
            "وقّف الـ container (الموديلات بتفضل في الـ volume)."
          ],
          sol: R`بالإنجليزي ([[What is an API? One sentence.]]) الرد كان جملة سليمة زي [[An API is a set of standardized protocols, languages, and tools that allow two or more systems to communicate with each other over a network.]]. بالعربي الجملة كان فيها تكرار ومعنى مهزوز. ده طبيعي في موديل 0.6b: اتدرّب على عربي أقل بكتير، وحجمه مش مكفّي.

من غير [[--think=false]]: فقرة تفكير بالإنجليزي قبل الرد، والـ [[eval count]] بيبقى أضعاف، والوقت كمان. في التجربة عن طريق الـ API: ٦٤١ حرف تفكير و ١٥٣ token و ٣.٤ ثانية، مقابل ٢٦ token و ٠.٧ ثانية من غير تفكير.

الأحجام: الصورة 8.43GB والموديل 522 MB. المسح: [[docker rm -f ollama]] و [[docker volume rm ollama]] و [[docker rmi ollama/ollama]].`
        },
        {
          cmd: "Ollama API",
          title: "كلّم الموديل المحلي بـ HTTP",
          desc: R`Ollama بيعرض API على [[http://localhost:11434]]: أهمها [[POST /api/chat]] (رسايل زي أي شات)، و [[/api/embed]]، و [[/api/tags]] للموديلات. الـ body فيه [[model]] و [[messages]]، و [[stream: false]] عشان يرجع JSON واحد بدل حتت، و [[think: false]] للموديلات اللي بتفكر، و [[format]] لو عايز JSON بـ schema.
الرد فيه [[message.content]] وأرقام مفيدة: عدد الـ tokens ([[prompt_eval_count]] و [[eval_count]]) والأوقات بالـ nanoseconds.`,
          example: R`# Linux and Mac:
curl -s http://localhost:11434/api/chat -d '{"model":"qwen3:0.6b","stream":false,"think":false,"messages":[{"role":"user","content":"What is an API? One sentence."}]}'
# Windows (PowerShell):
$body = @{ model = "qwen3:0.6b"; stream = $false; think = $false; messages = @(@{ role = "user"; content = "What is an API? One sentence." }) } | ConvertTo-Json -Depth 5
$r = Invoke-RestMethod -Uri http://localhost:11434/api/chat -Method Post -Body $body -ContentType "application/json"
$r.message.content`,
          try: R`شغّل الطلب، وبعدين ضيف [[format]] بـ JSON schema فيه [[intent]] (enum) و [[booking_id]] (نص أو null)، وابعت «I want my money back, booking B-2041 was cancelled». الشكل هيطلع صح؟ والقيم؟ وجرّب [[stream: true]] (أو شيله) وشوف شكل الرد.`,
          deep: {
            why: "الـ CLI للتجربة، بس كودك هيكلّم الموديل بـ HTTP. ولما تفهم الـ API نفسه، تقدر تستخدمه من أي لغة، وتقرا الأرقام اللي بتقولك السرعة والتكلفة الحقيقية على جهازك.",
            how: R`[[/api/chat]]: [[messages]] قايمة [[role]] ([[system]] أو [[user]] أو [[assistant]] أو [[tool]]) و [[content]]. زي Claude API، السيرفر مبيفتكرش المحادثة: انت بتبعت التاريخ كله كل مرة (درس [[ذاكرة المحادثة]]).

[[stream]] افتراضيًا [[true]]: الرد بيرجع NDJSON (سطر JSON لكل حتة، وآخر سطر فيه [[done: true]] والأرقام). [[false]] = JSON واحد في الآخر. [[think]]: [[false]] يقفل التفكير، و [[true]] يرجّعه في [[message.thinking]] منفصل عن [[content]].

[[format]]: يا إما [["json"]] يا إما JSON Schema، و Ollama بيجبر الموديل يطلّع JSON مطابق للشكل (constrained decoding). ده بيضمن **الشكل** بس: في التجربة [[booking_id]] طلع [[null]] رغم إن [[B-2041]] مكتوب صريح. الموديل الصغير معرفش يستخرج. عشان كده الـ validation المنطقي والـ eval لازمين (درس [[structured output]]).

[[options]]: [[temperature]] (٠ = أقل عشوائية)، و [[num_ctx]] (حجم الـ context، الافتراضي ٤٠٩٦ هنا)، و [[num_predict]] (أقصى tokens للرد)، و [[seed]]. و [[keep_alive]]: الموديل يفضل محمّل قد إيه ([[0]] يشيله فورًا).

الأرقام في الرد بالـ nanoseconds: قسّم على [[1e9]] عشان الثواني. [[eval_count / (eval_duration / 1e9)]] = سرعة الكتابة.`,
            when: "أي كود بيكلّم Ollama مباشرة، وخصوصًا لو محتاج حاجات خاصة بيه ([[keep_alive]]، [[num_ctx]]، [[think]]). ولو عايز نفس الكود يشتغل مع OpenAI أو مزوّدين تانيين، استخدم الـ endpoint المتوافق (الدرس الجاي).",
            mistakes: R`تنسى [[stream: false]] فتلاقي ٤٠ سطر JSON بدل رد واحد، و [[JSON.parse]] يقع. وتفتكر إن [[format]] بيضمن إن القيم صح. و [[num_ctx]] صغير على مستند طويل فالبداية تتقص من غير error. وفي PowerShell [[ConvertTo-Json]] من غير [[-Depth]] كافي فالـ [[messages]] تتبعت كنص غلط.`
          },
          teach: R`## نفس السؤال بـ HTTP

الطلب بيبعت رسالة واحدة لـ [[qwen3:0.6b]] على [[/api/chat]] ويستنى الرد كله مرة واحدة. في bash بـ [[curl]]، وفي PowerShell بـ [[Invoke-RestMethod]].

> اتشغّل على ويندوز: [[curl]] من Git Bash، و PowerShell 7.6، على Ollama 0.40.11 في Docker (CPU). الردود بتتغير كل مرة (فيه عشوائية)، والأرقام حقيقية من التجربة.

---

## ١. [[curl -s http://localhost:11434/api/chat -d '{...}']]

- [[-s]]: من غير شريط التقدم.
- [[-d '...']]: الـ body، و [[-d]] بيخلي الطلب POST لوحده.

الـ body:

| الحقل | القيمة | ليه |
|---|---|---|
| [[model]] | [[qwen3:0.6b]] | لازم يكون متنزّل ([[ollama list]]) |
| [[stream]] | [[false]] | JSON واحد في الآخر بدل حتت |
| [[think]] | [[false]] | من غير تفكير (أسرع بكتير على CPU) |
| [[messages]] | [[[{"role":"user","content":"..."}]]] | المحادثة |

~~~text الناتج
{"model":"qwen3:0.6b","created_at":"2026-10-27T18:33:35.916845675Z","message":{"role":"assistant","content":"An API is a set of pre-designed interfaces that allow programs to interact with each other, enabling data exchange and functionality."},"done":true,"done_reason":"stop","total_duration":384247488,"load_duration":975542,"prompt_eval_count":32,"prompt_eval_cached_count":1,"prompt_eval_duration":61163000,"eval_count":25,"eval_duration":314821000}
~~~

| الحقل | القيمة | معناها |
|---|---|---|
| [[message.content]] | الجملة | الرد |
| [[done_reason]] | [[stop]] | خلص لوحده (لو [[length]] يبقى اتقطع عند [[num_predict]]) |
| [[prompt_eval_count]] | 32 | tokens الـ input (السؤال + قالب الشات) |
| [[eval_count]] | 25 | tokens الرد |
| [[eval_duration]] | 314821000 | بالـ nanoseconds = ٠.٣١ ثانية |
| [[total_duration]] | 384247488 | الطلب كله ٠.٣٨ ثانية |

السرعة: ٢٥ ÷ ٠.٣١٥ = حوالي **٧٩ token/ثانية**.

---

## ٢. PowerShell

### [[$body = @{ ... } | ConvertTo-Json -Depth 5]]

- [[@{ key = value; ... }]]: hashtable (زي object في JS).
- [[$false]]: false في PowerShell.
- [[@( ... )]]: array.
- [[ConvertTo-Json -Depth 5]]: حوّله نص JSON. [[-Depth]] مهم: الافتراضي ٢ مستويات بس، و [[messages]] جواها objects، فمن غيره هتتبعت غلط.

### [[$r = Invoke-RestMethod -Uri ... -Method Post -Body $body -ContentType "application/json"]]

بيبعت الطلب، ولو الرد JSON بيحوّله object على طول. فـ [[$r.message.content]] هو النص.

~~~text الناتج
An API, or Application Programming Interface, is a set of standardized protocols and tools for exchanging data between applications.
~~~

وجربنا كمان [[$r.eval_count]] و [[$r.eval_duration/1e9]]: [[23 tokens in 0.52 s]].

---

## ٣. [[format]]: JSON بشكل ثابت

~~~text الطلب (bash)
curl -s http://localhost:11434/api/chat -d '{"model":"qwen3:0.6b","stream":false,"think":false,
  "format":{"type":"object","properties":{"intent":{"type":"string","enum":["refund","booking","question","other"]},"booking_id":{"type":["string","null"]}},"required":["intent","booking_id"]},
  "options":{"temperature":0},
  "messages":[{"role":"system","content":"Classify the customer message. Extract the booking id if present, else null."},
              {"role":"user","content":"I want my money back, booking B-2041 was cancelled"}]}'
~~~

- [[format]]: JSON Schema. Ollama بيمنع الموديل يطلّع أي token يكسر الشكل.
- [[options.temperature: 0]]: أقل عشوائية.

~~~text الناتج: message.content
{
  "intent": "refund",
  "booking_id": null
}
~~~

الشكل مظبوط و [[intent]] صح، بس [[booking_id]] طلع [[null]] و [[B-2041]] مكتوب قدامه. الـ schema بتضمن الشكل مش الصح، والموديل الصغير بيغلط في الاستخراج. نفس المهمة في درس [[agent ولا workflow؟]] بموديل كبير هي اللي فيها قيمة الموديل.

---

## ٤. [[stream]] افتراضيًا [[true]]

من غير [[stream: false]] الرد بيرجع NDJSON: سطر لكل حتة، كل واحد فيه [[message.content]] صغير و [[done: false]]، وآخر سطر [[done: true]] ومعاه الأرقام. ده اللي بتستخدمه عشان تعرض الكلام وهو بيتكتب (درس [[streaming]]).

---

## الخلاصة

| | Ollama [[/api/chat]] | Claude Messages |
|---|---|---|
| العنوان | [[http://localhost:11434/api/chat]] | [[https://api.anthropic.com/v1/messages]] |
| المفتاح | مفيش | [[x-api-key]] |
| التعليمات | رسالة [[role: "system"]] | حقل [[system]] |
| الرد | [[message.content]] نص | [[content]] blocks |
| الـ tokens | [[prompt_eval_count]] و [[eval_count]] | [[usage.input_tokens]] و [[output_tokens]] |
| JSON بـ schema | [[format]] | [[output_config.format]] |

- [[stream: false]] لرد واحد، و [[think: false]] للسرعة.
- الأوقات بالـ nanoseconds.
- [[format]] بيضمن الشكل، مش القيم.`,
          lines: [
            "ابعت رسالة لـ /api/chat واستنى الرد كله (من غير stream ومن غير تفكير).",
            "PowerShell: ابني الـ body كـ hashtable وحوّله JSON (Depth كفاية للرسايل).",
            "ابعت الطلب، والرد JSON بيتحوّل object.",
            "اطبع نص الرد."
          ],
          sol: R`الرد العادي: جملة إنجليزي عن الـ API، و [[done_reason: "stop"]].

بـ [[format]]: [[{"intent": "refund", "booking_id": null}]]. الشكل مضبوط، لكن الرقم [[B-2041]] ماتطلعش، رغم إنه مكتوب. ده بالظبط الفرق بين «الشكل مضمون» و «القيمة صح»: لازم تتحقق بالكود (مثلًا regex [[B-\d+]] على الرسالة الأصلية) أو تستخدم موديل أقوى للاستخراج.

بـ [[stream: true]]: عشرات السطور كل واحد فيه كلمة أو جزء كلمة في [[message.content]] و [[done: false]]، وآخر سطر [[done: true]] و [[done_reason]] والأرقام.`
        },
        {
          cmd: "OpenAI-compatible",
          title: "نفس كود OpenAI SDK يكلّم الموديل المحلي",
          desc: R`Ollama كمان بيعرض endpoints على شكل OpenAI API تحت [[/v1]] ([[/v1/chat/completions]] و [[/v1/embeddings]] و [[/v1/models]] وغيرهم). فالـ SDK الرسمي بتاع OpenAI (Node أو Python) يشتغل معاه لو غيّرت [[baseURL]] لـ [[http://localhost:11434/v1]] وحطيت أي [[apiKey]] (الـ SDK بيطلبه و Ollama بيتجاهله).
ده بيخليك تكتب كود واحد تجرّبه محلي ببلاش، وتنقله لمزوّد مستضاف بتغيير إعدادات بس. بس «متوافق» مش «زي بعض»: فيه حقول مش مدعومة، والجودة غير.`,
          example: R`import OpenAI from "openai";
const client = new OpenAI({ baseURL: "http://localhost:11434/v1", apiKey: "ollama" });
const res = await client.chat.completions.create({
  model: "qwen3:0.6b",
  reasoning_effort: "none",
  messages: [
    { role: "system", content: "Answer in one short sentence." },
    { role: "user", content: "What is an API?" },
  ],
});
console.log(res.choices[0].message.content);
console.log(res.choices[0].finish_reason, res.usage.prompt_tokens, res.usage.completion_tokens);`,
          try: R`سطّب [[npm i openai]] وشغّل الكود. وبعدين اعمل نفسه بـ Python ([[pip install openai]]) وقارن الشكل. وجرّب: شيل [[reasoning_effort]] وشوف [[completion_tokens]] والوقت، وغيّر [[model]] لموديل مش متنزّل.`,
          flag: "script",
          deep: {
            why: "أغلب المكتبات والأدوات (LangChain، LlamaIndex، Vercel AI SDK، أدوات كتير) بتتكلم شكل OpenAI. لو الموديل المحلي بيفهم نفس الشكل، كل ده بيشتغل معاه. وفي الاختبارات و CI تقدر توجّه نفس الكود لـ Ollama بدل مزوّد بفلوس.",
            how: R`[[new OpenAI({ baseURL, apiKey })]]: [[baseURL]] لازم فيه [[/v1]] في الآخر. و [[apiKey]] أي نص (الـ docs بتاعة Ollama بتستخدم [["ollama"]]). في Python نفس الحاجة بأسماء [[base_url]] و [[api_key]]، أو من البيئة [[OPENAI_BASE_URL]] و [[OPENAI_API_KEY]] من غير ما تغيّر الكود.

[[chat.completions.create]]: [[messages]] زي Ollama بالظبط، والرد في [[choices[0].message.content]]، و [[finish_reason]] ([[stop]] أو [[length]])، و [[usage]] فيه [[prompt_tokens]] و [[completion_tokens]] (والتفكير محسوب جوه [[completion_tokens]]).

التفكير: [[qwen3]] بيفكر افتراضيًا، والتفكير بيرجع في حقل [[reasoning]] جنب [[content]] (مش جزء من النص). [[reasoning_effort: "none"]] بيقفله: في التجربة نزل من ١٥٣ token و ٣.٤ ثانية لـ ٢٦ token و ٠.٧ ثانية.

مش مدعوم في [[/v1/chat/completions]] حسب docs Ollama: [[logprobs]]، وصور بـ URL (base64 بس)، و [[tool_choice]] و [[logit_bias]] و [[n]]. و [[/v1/responses]] موجود بس من غير [[previous_response_id]].

والأخطاء: موديل مش موجود بيرجع 404، والـ SDK بيرمي [[NotFoundError]]، زي ما بيحصل مع OpenAI نفسه.

وده **مش** للـ Claude API: Anthropic ليها SDK بشكل مختلف (درس [[@anthropic-ai/sdk]]). الكود اللي عايز يكلّم Claude يستخدم الـ SDK بتاعها، مش طبقة توافق.`,
            when: "لما الكود بتاعك أو مكتبة بتستخدمها مبنية على شكل OpenAI، أو عايز تبدّل بين محلي ومستضاف من الإعدادات. ولو بتستخدم مزايا خاصة بـ Ollama ([[keep_alive]]، [[num_ctx]]، [[format]] بـ schema)، الـ API الأصلي ([[/api/chat]]) أوضح.",
            mistakes: R`[[baseURL]] من غير [[/v1]] فكل الطلبات 404. وتفتكر إن [[apiKey]] الفاضي مقبول: الـ SDK بيرمي error قبل ما يبعت لو مفيش مفتاح خالص. وتنسى إن الموديلات اللي بتفكر بتصرف tokens ووقت على التفكير. وتفترض إن كل حقول OpenAI بتشتغل.`
          },
          teach: R`## الـ SDK بتاع OpenAI، والموديل على جهازك

الكود بيستخدم مكتبة [[openai]] الرسمية، بس بيوجّهها لـ Ollama بدل سيرفرات OpenAI. نفس شكل الطلب والرد بالظبط.

> اتشغّل على ويندوز بـ Node 24.22 و [[openai]] 7.45 (و Python 3.14 بـ [[openai]] 3.40 للمقارنة)، على Ollama 0.40.11 في Docker (CPU) و [[qwen3:0.6b]]. مفيش أي طلب راح لـ OpenAI؛ المفتاح نص وهمي.

---

## ١. [[const client = new OpenAI({ baseURL: "http://localhost:11434/v1", apiKey: "ollama" });]]

| الخانة | ليه |
|---|---|
| [[baseURL]] | بدل [[https://api.openai.com/v1]]. لازم [[/v1]] في الآخر |
| [[apiKey: "ollama"]] | الـ SDK مش بيشتغل من غير مفتاح، و Ollama مش بيبص عليه |

---

## ٢. [[client.chat.completions.create({ ... })]]

- [[model: "qwen3:0.6b"]]: اسم الموديل زي ما في [[ollama list]].
- [[reasoning_effort: "none"]]: من غير تفكير.
- [[messages]]: [[system]] بتعليمات و [[user]] بالسؤال. (في OpenAI و Ollama الـ system رسالة في القايمة؛ في Claude حقل لوحده.)

---

## ٣. الرد

~~~text الناتج: node chat.mjs
An API is a web service that allows different systems to communicate with each other.
stop 32 17
~~~

- [[res.choices[0].message.content]]: [[choices]] قايمة لأن OpenAI ممكن يرجّع كذا بديل (هنا واحد). و [[[0]]] الأول.
- [[finish_reason: stop]]: خلص لوحده.
- ٣٢ token input و ١٧ output.

---

## ٤. التفكير

نفس السؤال من غير [[reasoning_effort]]:

~~~text الناتج (مقارنة)
{}                            [ 'role', 'content', 'reasoning' ] 641 153 3381 ms
{"reasoning_effort":"none"}   [ 'role', 'content' ] 0 26 697 ms
~~~

- من غير الإعداد: فيه حقل [[reasoning]] (٦٤١ حرف تفكير)، و ١٥٣ token، و ٣.٤ ثانية.
- بـ [[none]]: ٢٦ token و ٠.٧ ثانية.

التفكير بيتحسب في [[completion_tokens]]، وعلى CPU كل token وقت.

---

## ٥. Python

~~~text chat.py
from openai import OpenAI

client = OpenAI(base_url="http://localhost:11434/v1", api_key="ollama")
res = client.chat.completions.create(
    model="qwen3:0.6b",
    reasoning_effort="none",
    messages=[
        {"role": "system", "content": "Answer in one short sentence."},
        {"role": "user", "content": "What is an API?"},
    ],
)
print(res.choices[0].message.content)
print(res.choices[0].finish_reason, res.usage.prompt_tokens, res.usage.completion_tokens)
~~~

~~~text الناتج: python chat.py
An API is a set of predefined protocols, specifications, and data structures used to create software applications that interact with each other, allowing developers to build applications that are easily integrable into different platforms and systems.
stop 32 42
~~~

نفس الشكل بالظبط، بأسماء Python ([[base_url]] و [[api_key]]). الرد مختلف عن Node لأن فيه عشوائية في الاختيار (درس [[temperature]]).

---

## ٦. موديل مش موجود

~~~text الناتج
NotFoundError 404 404 model 'llama3:70b' not found
~~~

نفس كلاس الخطأ اللي بيرميه الـ SDK مع OpenAI، فالـ [[catch]] بتاعك بيشتغل في الحالتين.

---

## الخلاصة

| | OpenAI | Ollama |
|---|---|---|
| [[baseURL]] | الافتراضي | [[http://localhost:11434/v1]] |
| [[apiKey]] | مفتاحك من البيئة | أي نص |
| [[model]] | اسم موديل OpenAI | اسم من [[ollama list]] |
| الكود | نفسه | نفسه |

- التوافق بيوفّر كود، بس مش كل الحقول مدعومة، والجودة على حسب الموديل.
- الموديلات اللي بتفكر: [[reasoning_effort: "none"]] لو مش محتاج تفكير.`,
          lines: [
            "الـ SDK الرسمي بتاع OpenAI.",
            "client متوجّه لـ Ollama المحلي، والمفتاح وهمي.",
            "طلب شات:",
            "الموديل المحلي.",
            "من غير تفكير.",
            "الرسايل:",
            "التعليمات.",
            "السؤال.",
            "قفلة الرسايل.",
            "قفلة الطلب.",
            "اطبع الرد.",
            "اطبع سبب الوقوف وعدد الـ tokens."
          ],
          sol: R`Node: [[An API is a web service that allows different systems to communicate with each other.]] و [[stop 32 17]].

Python (الكود في الشرح): نفس الشكل، والجملة مختلفة (عشوائية)، و [[stop 32 42]].

من غير [[reasoning_effort]]: [[completion_tokens]] بقى ١٥٣ والوقت ٣.٤ ثانية بدل ٠.٧، وظهر حقل [[reasoning]] فيه التفكير.

بموديل مش متنزّل: [[NotFoundError 404 404 model 'llama3:70b' not found]]. الحل [[ollama pull]] الأول.`
        },
        {
          cmd: "embeddings محلي",
          title: "embeddings على جهازك، وليه الموديل لازم يفهم لغتك",
          desc: R`[[POST /api/embed]] في Ollama بياخد [[model]] و [[input]] (نص أو قايمة نصوص) ويرجّع [[embeddings]]: vector لكل نص. بنفس فكرة درس [[embeddings]] تقارن المعنى بـ cosine similarity، بس على جهازك ومن غير فلوس، فتقدر تعمل embeddings لآلاف المستندات ببلاش.
بس موديل الـ embeddings لازم يكون متدرّب على لغتك: [[all-minilm]] (45 MB) ممتاز بالإنجليزي، وبالعربي رتّب النتايج غلط تمامًا.`,
          example: R`async function embed(input) {
  const res = await fetch("http://localhost:11434/api/embed", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model: "all-minilm", input }),
  });
  if (!res.ok) throw new Error(res.status + " " + (await res.text()));
  return (await res.json()).embeddings;
}
const cosine = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0) / Math.hypot(...a) / Math.hypot(...b);
const docs = ["Cancellation is free up to 24 hours before the booking.", "We accept cash and credit cards.", "The fields are open until 2 AM."];
const [q, ...vecs] = await embed(["If I cancel my reservation, do I pay anything?", ...docs]);
console.log("dimensions:", q.length);
docs.map((d, i) => ({ score: cosine(q, vecs[i]), d })).sort((a, b) => b.score - a.score).forEach((r) => console.log(r.score.toFixed(3), r.d));`,
          try: R`نزّل الموديل ([[ollama pull all-minilm]]) وشغّل الكود. بعدين حط نفس الجمل بالعربي («الإلغاء مجاني قبل الميعاد بـ ٢٤ ساعة»، والسؤال «لو كنسلت الحجز هدفع حاجة؟») وشوف الترتيب. وبعدين دوّر في مكتبة Ollama على موديل embeddings متعدد اللغات وجرّبه بنفس الجمل.`,
          flag: "script",
          deep: {
            why: "الـ embeddings بتتحسب لكل مستند مرة، ولكل سؤال مع كل بحث. محليًا ده ببلاش وسريع ومفيش داتا بتطلع، وده مهم لو المستندات داخلية. بس اختيار الموديل الغلط بيدّيك بحث بيرجّع نتايج غلط بثقة، ومحدش هياخد باله غير لما تعمل eval.",
            how: R`[[/api/embed]]: [[input]] نص أو قايمة. القايمة أحسن: طلب واحد لكل الجمل. الرد [[embeddings]] قايمة vectors بنفس الترتيب. و [[all-minilm]] بيطلّع ٣٨٤ رقم لكل نص (موديلات تانية ٧٦٨ أو ١٠٢٤ أو أكتر). وفيه كمان [[/v1/embeddings]] بشكل OpenAI (جربناه: [[object: "list"]] و vector بـ ٣٨٤ رقم).

الـ cosine: [[a.reduce((s, x, i) => s + x * b[i], 0)]] هو الـ dot product، و [[Math.hypot(...a)]] طول الـ vector (جذر مجموع المربعات). القسمة على الطولين = cosine. ١ = نفس الاتجاه.

اللغة: [[all-minilm]] اتدرّب على إنجليزي. بالعربي الـ tokenizer بيقطّع الكلام لحتت ملهاش معنى عنده، فالـ vectors بتقرّب جمل على أساس حاجات سطحية (الطول، الحروف). في التجربة «بنقبل فودافون كاش» جت الأقرب لسؤال عن الإلغاء بـ ٠.٨٣٨، وجملة الإلغاء نفسها الأبعد. للعربي اختار موديل متعدد اللغات (multilingual) من مكتبة Ollama، واقرا صفحته إنه بيدعم العربي، وقيسه على أمثلتك قبل ما تعتمد عليه.

وقواعد درس [[embeddings]] لسه شغالة: كل الـ vectors من نفس الموديل، ولو غيّرت الموديل تعيد حساب كل المستندات، والعتبة (threshold) تتحدد من داتاك.`,
            when: "بحث داخلي و RAG على مستندات مش عايزها تطلع، أو حجم كبير من النصوص مش عايز تدفع عليه، أو تجربة قبل ما تختار مزوّد. بشرط موديل بيفهم لغة المستندات، و eval صغير بيقيس إن الأقرب فعلًا هو الصح.",
            mistakes: R`موديل إنجليزي على نصوص عربي. وتقارن vectors من موديلين. وطلب لكل جملة لوحدها بدل قايمة. وتعتمد على الرقم المطلق («٠.٨ يبقى قريب») من غير ما تشوف الترتيب على أمثلة معروفة إجابتها.`
          },
          teach: R`## embeddings ببلاش على جهازك

الكود بيبعت السؤال و ٣ جمل لموديل embeddings محلي في طلب واحد، وياخد vector لكل واحدة، ويرتّب الجمل حسب قربها من السؤال بالـ cosine.

> اتشغّل على ويندوز بـ Node 24.22 ([[fetch]] جوه Node من غير مكتبات)، على Ollama 0.40.11 في Docker و [[all-minilm]] (45 MB). الأرقام من التجربة.

---

## ١. [[async function embed(input) { ... }]]

~~~text
const res = await fetch("http://localhost:11434/api/embed", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ model: "all-minilm", input }),
});
~~~

- [[fetch]]: HTTP جوه Node (من النسخة 18).
- [[body]]: [[model]] و [[input]]، و [[input]] هنا قايمة نصوص.

### [[if (!res.ok) throw new Error(res.status + " " + (await res.text()));]]

[[fetch]] مبيرميش error لو الرد 404 أو 500، بيرجّع عادي و [[res.ok]] بـ [[false]]. فلازم تفحص بنفسك. موديل مش متنزّل بيرجّع 404 هنا.

### [[return (await res.json()).embeddings;]]

قايمة vectors، واحد لكل نص بنفس الترتيب.

---

## ٢. [[const cosine = (a, b) => ...]]

| الحتة | بتحسب |
|---|---|
| [[a.reduce((s, x, i) => s + x * b[i], 0)]] | الـ dot product: اضرب كل رقمين في نفس المكان واجمع |
| [[Math.hypot(...a)]] | طول الـ vector: جذر مجموع المربعات. [[...a]] بتفرد القايمة كمدخلات |
| القسمة على الطولين | cosine: من غير تأثير الطول، الاتجاه بس |

---

## ٣. [[const [q, ...vecs] = await embed([سؤال, ...docs]);]]

طلب واحد فيه السؤال والجمل. و [[[q, ...vecs]]]: أول vector في [[q]]، والباقي في [[vecs]] (rest).

---

## ٤. الترتيب والطباعة

[[docs.map(...)]]: لكل جملة الـ score بتاعها، و [[.sort((a, b) => b.score - a.score)]] من الأكبر للأصغر، و [[toFixed(3)]] ٣ أرقام بعد العلامة.

~~~text الناتج
dimensions: 384
0.665 Cancellation is free up to 24 hours before the booking.
0.283 We accept cash and credit cards.
0.054 The fields are open until 2 AM.
~~~

- [[384]]: طول الـ vector في [[all-minilm]].
- جملة الإلغاء الأولى بفرق كبير، رغم إن السؤال فيه «cancel my reservation» والجملة فيها «Cancellation ... booking»: كلمات مختلفة، نفس المعنى.

---

## ٥. نفس الكود بالعربي

غيّرنا الجمل والسؤال للعربي (نفس جمل درس [[embeddings]]):

~~~text الناتج
dimensions: 384
0.838 بنقبل فودافون كاش والكارت
0.673 الملاعب فاتحة لحد ٢ بالليل
0.561 الإلغاء مجاني قبل الميعاد بـ ٢٤ ساعة
~~~

الترتيب **مقلوب**: الإجابة الصح الأخيرة، والأرقام نفسها عالية وبتدّي إحساس غلط بالثقة. [[all-minilm]] اتدرّب على إنجليزي، فبالعربي بيقارن حاجات سطحية. وده بالظبط ليه بتعمل eval صغير (أسئلة إجابتها معروفة) قبل ما تختار موديل embeddings.

للعربي: اختار موديل متعدد اللغات من مكتبة Ollama وصفحته بتقول إنه بيدعم العربي، وجرّبه بنفس الطريقة. (متجرّبش هنا عشان الحجم: الموديلات دي من ٢٥٠ MB لأكتر من ٦٠٠.)

---

## ٦. بشكل OpenAI

[[POST /v1/embeddings]] بـ [[{"model":"all-minilm","input":"hello"}]]:

~~~text الناتج (ملخص)
list 384 all-minilm {"prompt_tokens":3,"total_tokens":3}
~~~

يعني [[client.embeddings.create(...)]] في SDK بتاع OpenAI بيشتغل كمان (درس [[OpenAI-compatible]]).

---

## الخلاصة

- [[/api/embed]] بقايمة نصوص = طلب واحد و vector لكل نص.
- [[fetch]] مبيرميش على 404؛ افحص [[res.ok]].
- موديل الـ embeddings لازم يفهم لغة المستندات، والطريقة الوحيدة تعرف: تقيس على أمثلة معروفة.`,
          lines: [
            "دالة بتاخد نص أو قايمة وترجّع vectors.",
            "طلب لـ /api/embed:",
            "POST.",
            "الـ body JSON.",
            "الموديل والنصوص.",
            "قفلة الطلب.",
            "لو الرد مش 2xx ارمي error فيه الكود والرسالة.",
            "رجّع قايمة الـ vectors.",
            "قفلة الدالة.",
            "cosine similarity: الـ dot product على الطولين.",
            "٣ جمل (مستندات).",
            "طلب واحد للسؤال والجمل: الأول vector السؤال والباقي للجمل.",
            "اطبع طول الـ vector.",
            "رتّب الجمل حسب قربها من السؤال واطبع الـ score."
          ],
          sol: R`بالإنجليزي: جملة الإلغاء الأولى ([[0.665]]) بفرق كبير عن الباقي.

بالعربي بـ [[all-minilm]]: [[0.838 بنقبل فودافون كاش والكارت]] الأولى، و [[0.561 الإلغاء مجاني ...]] الأخيرة. الترتيب غلط لأن الموديل إنجليزي. الأرقام العالية مش معناها إن النتيجة صح.

بموديل متعدد اللغات المفروض جملة الإلغاء ترجع الأولى. قيس ده بنفسك على ٥-١٠ أسئلة إجابتها معروفة قبل ما تبني عليه بحث.

ولو طلع [[Error: 404 {"error":"model 'nomic-embed-text' not found"}]] (باسم الموديل بتاعك): الموديل مش متنزّل، [[ollama pull]] الأول.`
        },
        {
          cmd: "محلي ولا hosted",
          title: "الموديل المحلي بيكسب في إيه وبيخسر في إيه",
          desc: R`الموديل المحلي: ببلاش لكل طلب، والداتا مبتطلعش، وشغال من غير نت، بس جودته على قد حجمه، وأول طلب بطيء (تحميل في الذاكرة)، وسرعته على قد جهازك، والصيانة عليك. المستضاف (Claude، OpenAI، Gemini): جودة أعلى بكتير وسرعة ثابتة، بس بتدفع لكل token والداتا بتروح لمزوّد.
القرار بيتاخد بالقياس على مهمتك: جودة على eval، وسرعة، وتكلفة. السكربت هنا بيقيس السرعة على جهازك.`,
          example: R`const URL = "http://localhost:11434/api";
const post = async (path, body) => (await fetch(URL + path, { method: "POST", body: JSON.stringify(body) })).json();
const sec = (ns) => (ns / 1e9).toFixed(2) + "s";
await post("/generate", { model: "qwen3:0.6b", keep_alive: 0 });
const body = { model: "qwen3:0.6b", stream: false, think: false, messages: [{ role: "user", content: "Write 3 short tips for booking a football field." }] };
for (const run of ["cold", "warm"]) {
  const r = await post("/chat", body);
  const rate = r.eval_count / (r.eval_duration / 1e9);
  console.log(run, "| load", sec(r.load_duration), "| in", r.prompt_eval_count, "tok", sec(r.prompt_eval_duration), "| out", r.eval_count, "tok", sec(r.eval_duration), rate.toFixed(1), "tok/s | total", sec(r.total_duration));
}`,
          try: R`شغّل السكربت على جهازك وسجّل الأرقام. بعدين خد مهمة حقيقية عندك (تصنيف ١٠ رسايل مثلًا، درس [[evals]]) وشغّلها على الموديل المحلي وعلى موديل مستضاف (لو عندك مفتاح)، واملا الجدول اللي في الحل: الجودة، والوقت، والتكلفة لكل ١٠٠٠ طلب.`,
          flag: "script",
          deep: {
            why: "«نشغّل موديل محلي ونوفّر» قرار بيتاخد كتير من غير قياس. أحيانًا صح (تصنيف بسيط، داتا حساسة، حجم ضخم)، وأحيانًا بيطلع أغلى: سيرفر GPU شغال ٢٤ ساعة، ووقت مهندس على الصيانة، وجودة أقل بتعمل شكاوى.",
            how: R`الأرقام اللي بتفرق في المحلي: [[load_duration]] (تحميل الموديل في الذاكرة، أول طلب أو بعد ما يتشال)، و [[prompt_eval]] (قراية الـ input، سريعة)، و [[eval]] (الكتابة، token ورا token، وده عنق الزجاجة). [[eval_count / eval_duration]] = token/ثانية. والـ [[keep_alive]] بيحدد الموديل يفضل محمّل قد إيه (الافتراضي ٥ دقايق)، و [[keep_alive: 0]] بيشيله فورًا، وده اللي السكربت بيعمله الأول عشان يقيس أول طلب.

المقارنة:

| | محلي (Ollama) | مستضاف |
|---|---|---|
| تكلفة الطلب | صفر (كهربا وجهاز) | لكل token |
| تكلفة ثابتة | الجهاز/السيرفر، والصيانة | مفيش |
| الجودة | على قد الحجم: 0.6b ضعيف، ٧-٣٠b كويس لمهام كتير | الأعلى |
| السرعة | على قد الـ CPU/GPU، وأول طلب أبطأ | ثابتة تقريبًا، وفيه شبكة |
| الداتا | مبتطلعش | بتروح للمزوّد (بشروطه) |
| من غير نت | أيوه | لأ |
| حجم الـ context | محدود بالذاكرة ([[num_ctx]]) | لحد مليون token في بعض الموديلات |

الحسبة: لو مهمة بتعمل مليون طلب في الشهر، كل واحد ٥٠٠ token input و ١٠٠ output، الموديل المستضاف بسعر X و Y لكل مليون بيكلّف ٥٠٠ × X + ١٠٠ × Y دولار في الشهر. قارنه بسيرفر GPU في الشهر + وقت الصيانة، **بشرط** إن الموديل المحلي جاب نفس الجودة على الـ eval. ولو مجاب، المقارنة ملهاش معنى.

وفيه حل وسط: المحلي للمهام البسيطة الكتير (تصنيف، تنضيف داتا، embeddings) أو للتطوير والاختبار، والمستضاف للمهام الصعبة. نفس فكرة درس [[اختيار الموديل]].`,
            when: "قبل ما تختار تشغّل موديل بنفسك في الإنتاج، ومع أي ميزة فيها داتا ممنوع تطلع، أو حجم طلبات كبير جدًا على مهمة بسيطة.",
            mistakes: R`تقيس أول طلب بس (فيه التحميل) أو تاني طلب بس (من غير التحميل). وتقارن سرعة من غير ما تقارن جودة. وتنسى تكلفة السيرفر والصيانة. وتفتكر إن «محلي» = «آمن» تلقائيًا: لو الـ API مفتوح على الشبكة من غير مصادقة، أي حد يستخدمه.`
          },
          teach: R`## قياس السرعة على جهازك: أول طلب وتاني طلب

السكربت بيشيل الموديل من الذاكرة، وبعدين بيبعت نفس الطلب مرتين: الأولى «cold» (لازم يحمّل الموديل)، والتانية «warm» (محمّل). ويطبع لكل مرة: وقت التحميل، وقراية الـ input، والكتابة وسرعتها، والإجمالي.

> اتشغّل على ويندوز بـ Node 24.22 على Ollama 0.40.11 في Docker، على CPU بس (Ryzen 9 5900HX، ١٦ logical processor، الـ container بيشوف ١٦ جيجا RAM)، و [[qwen3:0.6b]]. الأرقام بتاعة الجهاز ده؛ جهازك هيطلّع غيرها.

---

## ١. الأدوات الصغيرة

- [[const post = async (path, body) => (await fetch(URL + path, { method: "POST", body: JSON.stringify(body) })).json();]]: POST بـ JSON ويرجّع الرد object.
- [[const sec = (ns) => (ns / 1e9).toFixed(2) + "s";]]: الأوقات من Ollama بالـ nanoseconds (جزء من مليار)، فبنقسم على [[1e9]].

---

## ٢. [[await post("/generate", { model: "qwen3:0.6b", keep_alive: 0 });]]

طلب من غير prompt و [[keep_alive: 0]] = «شيل الموديل من الذاكرة دلوقتي». كده الطلب الجاي هيبدأ cold. (لو مشغّل حاجة تانية بتستخدم نفس الموديل، ده هيبطّأها لحظة.)

---

## ٣. اللوب

لنفس الطلب مرتين ([[cold]] ثم [[warm]]):

- [[const rate = r.eval_count / (r.eval_duration / 1e9);]]: tokens الرد على وقت كتابتها بالثواني.
- السطر الطويل بيطبع كل الأرقام.

~~~text الناتج
cold | load 1.35s | in 27 tok 0.06s | out 62 tok 0.93s 66.6 tok/s | total 2.34s
warm | load 0.00s | in 27 tok 0.01s | out 50 tok 0.66s 75.5 tok/s | total 0.69s
~~~

| الرقم | cold | warm | ليه |
|---|---|---|---|
| [[load]] | 1.35s | 0.00s | أول مرة الموديل بيتقري من الديسك للذاكرة |
| [[in]] | 0.06s | 0.01s | قراية ٢٧ token سريعة، وفي warm جزء منها في الكاش |
| [[out]] | 66.6 tok/s | 75.5 tok/s | الكتابة. ده الرقم اللي بيحدد الطلبات الطويلة |
| [[total]] | 2.34s | 0.69s | أول طلب أبطأ ٣ مرات |

وعدد الـ tokens اختلف (٦٢ و ٥٠) لأن الرد نفسه اختلف (فيه عشوائية).

حجم الموديل في الذاكرة ([[ollama ps]]): 1.0 GB، والـ container كله حوالي 1.6 GiB.

---

## ٤. نقرا الأرقام دي

- **٧٥ token/ثانية** لموديل 0.6b على CPU: رد ٣٠٠ token = ٤ ثواني. موديل ٧b على نفس الجهاز هيبقى أبطأ بكتير (تقريبًا على قد ما هو أكبر)، ومحتاج GPU عشان يبقى مريح.
- **أول طلب بعد ٥ دقايق سكون** بياخد ثانية ونص زيادة. لو الطلبات قليلة ومتفرقة، المستخدم هيحس بيها. [[keep_alive]] أطول بيحلها على حساب RAM محجوزة.
- **الجودة** مش في الجدول ده، وهي الأهم: في الدروس اللي فاتت الموديل ده كرر كلام بالعربي، ومستخرجش رقم حجز مكتوب صريح.

---

## ٥. القرار

| الحالة | الأنسب غالبًا |
|---|---|
| تطوير وتجربة واختبارات CI | محلي |
| داتا ممنوع تطلع (قانونًا أو تعاقديًا) | محلي، أو مستضاف بعقد يناسب |
| تصنيف أو embeddings لملايين النصوص البسيطة | محلي (بعد ما تتأكد من الجودة على eval) |
| كود معقد، تحليل طويل، عربي كويس، أدوات كتير | مستضاف كبير |
| حجم قليل ومتقطع | مستضاف (من غير سيرفر شغال على الفاضي) |

---

## الخلاصة

- قيس cold و warm، والكتابة (tok/s) هي عنق الزجاجة.
- المحلي ببلاش للطلب بس مش ببلاش: جهاز وصيانة وجودة أقل.
- القرار بالـ eval: لو الجودة مش كفاية، السرعة والتكلفة ملهمش لازمة.`,
          lines: [
            "عنوان الـ API المحلي.",
            "دالة POST بـ JSON بترجّع الرد object.",
            "تحويل nanoseconds لثواني.",
            "شيل الموديل من الذاكرة عشان أول قياس يبقى cold.",
            "نفس الطلب كل مرة: من غير stream ومن غير تفكير.",
            "مرتين: cold ثم warm.",
            "ابعت الطلب.",
            "سرعة الكتابة بالـ token/ثانية.",
            "اطبع التحميل والقراية والكتابة والإجمالي.",
            "قفلة اللوب."
          ],
          sol: R`أرقام التجربة (Ryzen 9 5900HX، CPU بس، [[qwen3:0.6b]]):

[[cold | load 1.35s | ... | out 62 tok 0.93s 66.6 tok/s | total 2.34s]]
[[warm | load 0.00s | ... | out 50 tok 0.66s 75.5 tok/s | total 0.69s]]

جدول المقارنة اللي تملاه لمهمتك:

| | محلي | مستضاف |
|---|---|---|
| الجودة على الـ eval | ؟٪ | ؟٪ |
| متوسط الوقت (warm) | ؟ ثانية | ؟ ثانية |
| أول طلب (cold) | ؟ ثانية | مش موجود |
| تكلفة ١٠٠٠ طلب | كهربا + جهاز | tokens × السعر |
| الداتا بتطلع؟ | لأ | أيوه |

لو الجودة المحلية أقل من المطلوب بوضوح، القرار اتاخد. لو قريبة، ساعتها السرعة والتكلفة والخصوصية بيحسموا.`
        },
      ]
    }
]);
