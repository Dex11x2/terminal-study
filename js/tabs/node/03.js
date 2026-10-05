// تكملة تاب node: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/node/01.js (شرح حقول الدرس في أوله)
MORE("node", [
    {
      t: "الإنتاج والتشخيص",
      l: 3,
      n: "Node على السيرفر: الذاكرة، والإغلاق النضيف، والسكربتات كأدوات",
      items: [
        {
          cmd: "NODE_ENV=production",
          title: "الوضع اللي التطبيق بيشتغل بيه",
          desc: "مكتبات كتير (Express، وReact) بتتصرف مختلف لما [[NODE_ENV=production]]: كاش أكتر، ورسايل أخطاء أقل، وأسرع. و [[npm ci --omit=dev]] بيسطّب dependencies الإنتاج بس. الاتنين لازمين على السيرفر.",
          example: R`NODE_ENV=production node server.js
npm ci --omit=dev
node -e "console.log(process.env.NODE_ENV)"
npm run build && NODE_ENV=production npm start`,
          try: "شغّل تطبيق Express بـ production ومن غيرها، واعمل error، وقارن الرد.",
          deep: {
            why: "نفس الكود بيشتغل مختلف في الإنتاج: Express بيعمل كاش للـ templates، و React بيشيل التحذيرات والـ dev tools، ومكتبات كتير بتسرّع. من غير المتغير ده التطبيق أبطأ وبيكشف معلومات.",
            how: R`[[NODE_ENV]] مجرد متغير بيئة بالاتفاق، Node نفسه مش بيعمل بيه حاجة. المكتبات هي اللي بتقراه: [[if (process.env.NODE_ENV === 'production')]].

Express في الإنتاج: كاش للـ view templates، ورسايل أخطاء أقل تفصيلًا للمستخدم. React: الـ build بيطلّع نسخة أصغر وأسرع من غير checks التطوير. Prisma وغيرها بتقلل اللوج.

و [[npm ci --omit=dev]] مرتبط: لو NODE_ENV=production موجود وقت التسطيب، npm بيتخطى devDependencies لوحده. بس صريح أوضح.

الخطأ الشائع: الـ build محتاج devDependencies (TypeScript مثلًا). فالترتيب: سطّب الكل، اعمل build، وبعدين في الـ image النهائية سطّب production بس. وده اللي multi-stage في Docker بيعمله.

في Next.js: [[next build]] بيضبط production لوحده، و [[next start]] بيشغّل بيه.`,
            when: "كل تشغيل على سيرفر: في Dockerfile، أو pm2 ecosystem، أو systemd unit.",
            mistakes: "NODE_ENV=production على جهازك وقت التطوير، فـ devDependencies متتسطبش والـ hot reload يقف. وتنساه على السيرفر."
          },
          lines: [
            "شغّل في وضع الإنتاج.",
            "سطّب dependencies الإنتاج بس.",
            "اتأكد من القيمة.",
            "ابني وبعدين شغّل الناتج في الإنتاج."
          ],
          sol: R`في Express 5 مع route بيرمي [[new Error("db password is hunter2")]]:

من غير NODE_ENV: الرد 500 وصفحة HTML فيها [[<pre>Error: db password is hunter2<br> at file:///.../app.js:3:32 ...]]، يعني رسالة الخطأ والـ stack trace ومسارات الملفات على السيرفر ظاهرين لأي حد. مع [[NODE_ENV=production]]: نفس الـ 500 بس الـ body [[<pre>Internal Server Error</pre>]] بس. والتفاصيل راحت للوج السيرفر ([[Error: db password is hunter2]] في الترمنال).

ودا سبب إن الإعداد ده مش اختياري. ولو لسه شايف الـ stack في production: اتأكد بـ [[node -e "console.log(process.env.NODE_ENV)"]] إن المتغير واصل فعلًا للـ process (مع pm2 أو Docker بيتحط في الـ config مش في الترمنال)، أو إن عندك error handler بتاعك بيبعت [[err.stack]] بنفسه.`,
          solCode: R`import express from "express";
const app = express();
app.get("/boom", () => { throw new Error("db password is hunter2"); });
app.listen(3000);

// node app.js                      -> stack trace in the response
// NODE_ENV=production node app.js  -> Internal Server Error only`
        },
        {
          cmd: "الذاكرة",
          title: "heap out of memory",
          desc: "الرسالة: [[FATAL ERROR: Reached heap limit]]. Node بيحدد لنفسه سقف رام (بيتحسب من رام الجهاز، وممكن يبقى أقل من اللي الـ build محتاجه). لو الـ build أو التطبيق محتاج أكتر، ترفعه. ولو بيوصل للسقف مع الوقت، ده memory leak.",
          example: R`node --max-old-space-size=4096 server.js
NODE_OPTIONS=--max-old-space-size=4096 npm run build
node -e "console.log(process.memoryUsage())"
node --heapsnapshot-signal=SIGUSR2 server.js`,
          try: "شغّل [[npm run build]] لمشروع Next.js على سيرفر ١ جيجا: لو وقع، جرّب بـ NODE_OPTIONS ولو لسه، ده معناه محتاج swap أو build في CI.",
          deep: {
            why: "[[next build]] على سيرفر ١ جيجا بيقع بـ heap out of memory. أو التطبيق بيكبر في الرام يوم ورا يوم لحد ما يتقتل.",
            how: R`V8 (محرك JavaScript) بيحدد سقف للـ heap (الذاكرة بتاعة الـ objects). لو التطبيق عدّاه، بيقع بـ [[FATAL ERROR: Reached heap limit Allocation failed]]. السقف بيتحسب من رام الجهاز بس ممكن يبقى أقل مما تحتاج.

[[--max-old-space-size=4096]] بيرفعه لـ ٤ جيجا (بالميجا). لازم يبقى أقل من الرام الفعلية المتاحة، وإلا النظام هيقتل العملية بـ 137 قبل ما V8 يوصل للسقف.

[[NODE_OPTIONS]] متغير بيئة بيضيف flags لأي node بيتشغّل، مفيد مع npm scripts اللي مش بتشغّل node مباشرة.

[[process.memoryUsage()]] بيوريك rss (الكل) و heapUsed (المستخدم فعلًا). لو heapUsed بيزيد باستمرار من غير ما ينزل، memory leak.

[[--heapsnapshot-signal]] بيخلي التطبيق يكتب snapshot للـ heap لما يستلم إشارة، تفتحها في Chrome DevTools (Memory tab) وتشوف إيه اللي مالي الذاكرة.`,
            when: "build بيقع. تطبيق بيتقتل كل كام ساعة. قبل ما تكبّر السيرفر.",
            mistakes: "ترفع السقف فوق رام السيرفر. وتعالج الـ leak بريستارت يومي بدل ما تلاقيه."
          },
          lines: [
            "ارفع سقف الـ heap لـ ٤ جيجا.",
            "نفس الحاجة لأي node بيتشغّل من npm script.",
            "استهلاك الذاكرة دلوقتي.",
            "اكتب heap snapshot لما تستلم إشارة، لتحليل الـ leak."
          ],
          sol: R`الحالات اللي هتشوفها على سيرفر ١ جيجا:

١. Node نفسه يوصل للحد: [[FATAL ERROR: Reached heap limit Allocation failed - JavaScript heap out of memory]]. هنا [[NODE_OPTIONS=--max-old-space-size=...]] ممكن يفرق لو فيه RAM فاضية. ٢. النظام يقتل العملية: الـ build يقف بكلمة [[Killed]] بس، والـ exit code 137، و [[dmesg | grep -i oom]] يقول [[Out of memory: Killed process ... (node)]]. هنا رفع الـ heap مش هيفيد، بالعكس: [[--max-old-space-size=4096]] على جهاز فيه ١ جيجا بيخلي Node يطلب أكتر، فالـ OOM killer يقتله أسرع.

عشان تعرف الحد الحالي: [[node -e "console.log(require('v8').getHeapStatistics().heap_size_limit / 1024 / 1024)"]]. عندي على جهاز ١٦ جيجا طلع 8240، ومع [[--max-old-space-size=4096]] بقى 4144. على سيرفر صغير الرقم الافتراضي بيبقى أقل.

الخلاصة الصح: لو اتقتل بـ Killed، الحل swap ([[fallocate -l 2G /swapfile]] ...) أو إنك تبني في CI وتنقل النتيجة (image جاهز أو standalone)، مش إنك ترفع الرقم.`
        },
        {
          cmd: "الإغلاق النضيف",
          title: "SIGTERM و unhandled rejections",
          desc: "لما Docker أو pm2 يقفل التطبيق، بيبعت SIGTERM. لو التطبيق مسمعش، الطلبات الجارية بتتقطع. وأي promise فشل من غير catch بيوقع التطبيق كله في Node الحديث.",
          example: R`const server = app.listen(3000);

process.on("SIGTERM", () => {
  console.log("SIGTERM: closing");
  server.close(() => process.exit(0));
  setTimeout(() => process.exit(1), 10000).unref();
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled:", err);
  process.exit(1);
});`,
          try: "شغّل السيرفر، وابعتله [[kill -TERM PID]]، وشوفه بيطبع الرسالة ويقفل بدل ما يتقطع.",
          flag: "script",
          deep: {
            why: "مع كل deploy، الطلبات اللي كانت شغالة بتتقطع في النص: دفعة اتسجّلت نص تسجيل، أو رد مرجعش. والتطبيق ممكن يقع فجأة بسبب promise فشل في مكان بعيد.",
            how: R`[[SIGTERM]] الإشارة اللي Docker و pm2 و systemd بيبعتوها عشان «اقفل بأدب». من غير معالج، Node بيقفل فورًا. مع معالج: [[server.close()]] بيوقف استقبال طلبات جديدة، ويستنى الجارية تخلص، وبعدين بينادي الـ callback اللي بيعمل exit.

الـ timeout مهم: لو طلب معلّق للأبد، السيرفر مش هيقفل أبدًا و Docker هيقتله بعد ١٠ ثواني بأي حال. فبنحط مهلة ونخرج بـ 1. و [[.unref()]] بيخلي الـ timer ميمنعش الخروج لو كل حاجة خلصت قبله.

هنا كمان بتقفل اتصالات القاعدة ([[prisma.$disconnect()]]) وأي workers.

[[unhandledRejection]]: promise فشل ومحدش عمله catch. من Node 15 ده بيوقع العملية. المعالج بيسجّل الخطأ بوضوح قبل الخروج، فتعرف السبب من اللوج. والخروج بـ 1 مقصود: pm2 أو Docker يرجّعوه نضيف بدل ما يفضل في حالة مش معروفة.`,
            when: "كل سيرفر إنتاج. وخصوصًا لو بتعمل deploy كتير.",
            mistakes: "تمسك unhandledRejection وتكمّل من غير خروج، فالتطبيق يفضل شغال بحالة غلط. وتنسى الـ timeout فالـ deploy يتعلّق."
          },
          lines: [
            "احتفظ بالسيرفر عشان تقفله بعدين.",
            "لما تيجي إشارة الإغلاق.",
            "سجّل.",
            "بطّل تستقبل طلبات، ولما الجارية تخلص اخرج بنجاح.",
            "لو معدّاش ١٠ ثواني اخرج بفشل. unref عشان الـ timer ميمنعش الخروج الطبيعي.",
            "قفلة.",
            "أي promise فشل من غير catch.",
            "سجّل الخطأ بوضوح.",
            "اخرج بفشل عشان pm2 أو Docker يرجّعوك نضيف.",
            "قفلة."
          ],
          sol: R`لما تبعت [[kill -TERM PID]] من ترمنال تاني، السيرفر بيطبع [[SIGTERM: closing]] وبعدها بيخرج بـ 0، لأن [[server.close]] استنى الطلبات المفتوحة وخلص. والـ timer بتاع ١٠ ثواني بـ [[unref()]] فمش بيأخر الخروج لو كله خلص بدري.

قارن من غير الـ handler: نفس الأمر بيقفل السيرفر فورًا من غير أي رسالة، والـ exit code 143 (128 + 15)، وأي طلب كان في النص بيتقطع. ودا اللي بيحصل في كل deploy بـ Docker أو pm2 لو ما عملتش الـ handler.

لو ما طبعش الرسالة: غالبًا بتبعت الـ signal لـ [[npm]] مش لـ [[node]] (لو شغال بـ [[npm start]] الـ PID اللي في [[ps]] لـ npm ممكن ما يوصلش الإشارة صح)، فشغّل [[node server.js]] مباشرة أو خد PID الـ node. و [[kill -9]] مش بيتمسك خالص، مفيش handler بيشتغل معاه.`,
          solCode: R`import express from "express";
const app = express();
app.get("/", (req, res) => res.send("ok"));
const server = app.listen(3000, () => console.log("pid", process.pid));

process.on("SIGTERM", () => {
  console.log("SIGTERM: closing");
  server.close(() => process.exit(0));
  setTimeout(() => process.exit(1), 10000).unref();
});

// ترمنال تاني:  kill -TERM <pid>`
        },
        {
          cmd: "الـ debugger",
          title: "--inspect و VS Code",
          desc: "console.log بيوصّلك لحد ما. الـ debugger بيوقف الكود على سطر وتشوف كل المتغيرات. [[--inspect]] يفتح بورت 9229، و VS Code أو Chrome يتصلوا بيه. في Docker لازم [[0.0.0.0]] عشان يوصل من بره الـ container.",
          example: R`node --inspect server.js
node --inspect-brk server.js
node --inspect=0.0.0.0:9229 server.js
node --trace-warnings server.js
node --stack-trace-limit=50 server.js`,
          try: "حط [[debugger;]] في route، وشغّل بـ --inspect، وافتح chrome://inspect، واطلب الـ route وشوف الكود بيقف.",
          deep: {
            why: "bug بيحصل في حالة معينة ومش عارف قيمة المتغير ساعتها. console.log في ٢٠ مكان مش هيكفي. الـ debugger بيوقف الكود وتتفرج.",
            how: R`[[--inspect]] بيخلي Node يفتح بورت 9229 لبروتوكول DevTools. Chrome (من chrome://inspect) أو VS Code بيتصلوا بيه، وبيشوفوا الكود والمتغيرات، ويقدروا يوقفوه على breakpoints.

[[--inspect-brk]] بيوقف على أول سطر قبل ما يشتغل، عشان مشاكل الـ startup.

جوه Docker، 9229 بيسمع على localhost بتاع الـ container، فمن بره مش هيوصل. [[--inspect=0.0.0.0:9229]] بيخليه يسمع على كل الكروت، ومع [[-p 9229:9229]] في compose بيوصل من جهازك. في التطوير بس.

في VS Code: launch.json بـ [["type": "node", "request": "attach", "port": 9229]]، أو أسهل: JavaScript Debug Terminal بيربط أي node تشغّله منه لوحده.

[[--trace-warnings]] بيوريك مصدر التحذيرات (زي deprecation). و [[--stack-trace-limit]] بيطوّل الـ stack trace لما الـ error جاي من مكان عميق.`,
            when: "bug مش مفهوم. الـ startup بيقع. وأي وقت console.log مبقاش كفاية.",
            mistakes: "--inspect على سيرفر إنتاج ببورت مفتوح: أي حد يقدر ينفّذ كود. للتطوير بس، وعلى localhost."
          },
          lines: [
            "افتح بورت 9229 للـ debugger.",
            "ووقف على أول سطر.",
            "اسمع على كل الكروت (جوه Docker).",
            "اطبع مصدر التحذيرات.",
            "stack trace أطول."
          ],
          sol: R`[[node --inspect server.js]] بيطبع [[Debugger listening on ws://127.0.0.1:9229/...]] و [[For help, see: https://nodejs.org/en/docs/inspector]]. في [[chrome://inspect]] تحت Remote Target هيظهر [[server.js]] وجنبه [[inspect]]. تدوس عليه تفتح DevTools.

لما تطلب الـ route من المتصفح أو curl، التنفيذ بيقف على سطر [[debugger;]] والطلب نفسه بيفضل مستني. في DevTools تقدر تشوف [[req.params]] و [[req.body]] في Scope، وتحط mouse على أي متغير، وتكمّل بـ F8. وفي الترمنال هيبان [[Debugger attached.]].

لو الكود ما وقفش: DevTools مش مفتوح (الـ [[debugger;]] بيتجاهل من غير debugger متوصل)، أو السيرفر ما اتعملوش restart بعد ما ضفت السطر. ولو [[chrome://inspect]] مش شايف حاجة، دوس Configure واتأكد إن [[localhost:9229]] موجود. ومتشغّلش [[--inspect=0.0.0.0]] على سيرفر مفتوح؛ أي حد يوصل للبورت يقدر ينفذ كود.`
        },
        {
          cmd: "سكربت Node كأداة",
          title: "اقرا arguments وملفات",
          desc: "Node مش بس سيرفرات. سكربت صغير بيقرا JSON ويعدّله، أو يعمل migration للداتا، أو يولّد ملفات. [[process.argv]] الـ arguments، و [[fs]] الملفات، والـ shebang يخليه يتشغّل مباشرة.",
          example: R`#!/usr/bin/env node
import { readFile, writeFile } from "node:fs/promises";

const [,, file, key, value] = process.argv;
if (!file || !key) {
  console.error("Usage: setkey <file.json> <key> <value>");
  process.exit(1);
}
const data = JSON.parse(await readFile(file, "utf8"));
data[key] = value ?? null;
await writeFile(file, JSON.stringify(data, null, 2) + "\n");
console.log("updated", file);`,
          try: R`احفظه كـ setkey.mjs، و [[chmod +x]]، وشغّل [[./setkey.mjs package.json description "my api"]].`,
          flag: "script",
          deep: {
            why: "bash كويس للملفات والأوامر، بس لما الشغل فيه JSON أو منطق أو async، Node أسهل وأنت عارفه أصلًا. سكربتات الـ migration وتوليد الملفات وتنضيف الداتا.",
            how: R`الـ shebang [[#!/usr/bin/env node]] زي bash: بيخلي الملف يتشغّل بـ [[./script.mjs]] بعد chmod +x. والامتداد .mjs عشان ESM من غير package.json.

[[node:fs/promises]] النسخة الـ async من fs. الـ [[node:]] prefix بيوضّح إنها مكتبة مبنية مش من npm.

[[process.argv]] array: أول عنصر مسار node، والتاني مسار السكربت، وبعدين الـ arguments. عشان كده الـ destructuring بيتخطى الأولين.

التحقق من الـ arguments وطباعة usage على stderr والخروج بـ 1: نفس عادات bash. الـ exit code بيخلي السكربت يتركّب في pipelines و CI.

[[await]] في أعلى الملف شغال في ESM. و [[JSON.stringify(data, null, 2)]] بينسّق بمسافتين، والسطر الجديد في الآخر عادة كويسة.

للسكربتات الأكبر: مكتبة [[commander]] للـ arguments و [[zx]] لتشغيل أوامر شيل من Node بسهولة.`,
            when: "أي أتمتة فيها JSON أو API أو منطق. سكربتات seed و migration.",
            mistakes: "تنسى [[process.exit(1)]] عند الفشل فالـ CI يعتبره نجح. و [[readFileSync]] في سكربت بيعالج ملفات كتير فيبقى بطيء."
          },
          lines: [
            "دوال الملفات async من مكتبة Node المبنية.",
            "تخطى مسار node والسكربت، وخد الـ arguments التلاتة.",
            "لو الملف أو المفتاح ناقص...",
            "...اطبع الاستخدام على stderr...",
            "...واخرج بفشل.",
            "قفلة.",
            "اقرا الملف وحوّله object.",
            "عدّل المفتاح (null لو مفيش قيمة).",
            "اكتبه منسّق بمسافتين وسطر جديد في الآخر.",
            "اطبع."
          ],
          sol: R`من غير [[chmod +x]]: [[./setkey.mjs ...]] بيقول [[Permission denied]] (exit 126). بعده:

[[./setkey.mjs package.json description "my api"]] بيطبع [[updated package.json]]، و [[npm pkg get description]] بيطبع [["my api"]]. والسطر الأول [[#!/usr/bin/env node]] هو اللي خلّى الـ shell يشغّله بـ node.

من غير arguments: [[Usage: setkey <file.json> <key> <value>]] و exit 1. ولو نسيت علامات التنصيص: [[./setkey.mjs package.json description my api]] حط [["my"]] بس، لأن الـ shell قسم الكلام لـ arguments منفصلة وال script بياخد التالت بس.

الأخطاء التانية: [[env: 'node\r': No such file or directory]] لو الملف اتحفظ بـ CRLF من ويندوز (غيّره لـ LF). و [[SyntaxError: Unexpected token]] لو الملف JSON مش سليم؛ ضيف try/catch حوالين الـ parse لو عايز رسالة أوضح.`
        },
        {
          cmd: "Next.js CLI",
          title: "dev و build و start و standalone",
          desc: "[[next dev]] للتطوير بـ hot reload. [[next build]] بيبني للإنتاج ويطبع جدول الصفحات (static ولا dynamic). [[next start]] بيشغّل الناتج. و [[output: standalone]] بيطلّع فولدر فيه بس اللي التطبيق محتاجه، وده اللي بيتحط في Docker.",
          example: R`npx next dev -p 4000
npx next build
npx next start
npx eslint .
node .next/standalone/server.js`,
          try: "اعمل build واقرا الجدول اللي بيطلع: أنهي صفحات static وأنهي dynamic.",
          deep: {
            why: "Next.js ليه ٣ أوضاع مختلفة تمامًا، والخلط بينهم أشهر سبب لـ «شغال في dev ومش شغال في production».",
            how: R`[[next dev]]: يبني كل صفحة لما تطلبها، مع hot reload وتفاصيل الأخطاء. بطيء ومش للإنتاج أبدًا. و [[-p]] بورت تاني.

[[next build]]: بيبني كل حاجة مرة واحدة: بيحدد أنهي صفحات static (بتتبني دلوقتي كـ HTML) وأنهي dynamic (بتتبني مع كل طلب)، وبيعمل bundle للـ JS ويصغّره، وبيطبع جدول بالـ routes ونوع كل واحد (من Next 16 مبقاش يطبع الأحجام). أخطاء TypeScript اللي dev بيتساهل فيها هنا بتوقف الـ build، أما الـ lint فمن Next 16 مبقاش جزء من الـ build.

[[next start]]: بيشغّل ناتج الـ build. لازم build قبله. ده الإنتاج.

[[output: 'standalone']] في next.config: الـ build بيطلّع [[.next/standalone]] فيه server.js ونسخة مصغّرة من node_modules فيها اللي التطبيق محتاجه بس. الـ image بتصغر من مئات الميجا لعشرات. وبتنسخ [[.next/static]] و [[public]] جنبه بإيدك.

[[next lint]] اتشال في Next 16: شغّل [[eslint .]] مباشرة (أو Biome).`,
            when: "build قبل كل deploy، وشوف الجدول: لو صفحة المفروض static طلعت dynamic، حاجة فيها بتقرا cookies أو headers.",
            mistakes: "[[next dev]] على السيرفر. ومتغيرات البيئة: اللي بتبدأ بـ NEXT_PUBLIC_ بتدخل الـ build (للمتصفح)، فتغييرها محتاج build جديد."
          },
          lines: [
            "تطوير على بورت 4000.",
            "ابني للإنتاج، واقرا الجدول.",
            "شغّل الناتج.",
            "Lint: من Next 16 [[next lint]] اتشال، فبتشغّل ESLint مباشرة.",
            "شغّل نسخة standalone مباشرة (اللي بتتحط في Docker)."
          ],
          sol: R`آخر [[next build]] جدول [[Route (app)]] فيه كل صفحة وقدامها رمز، وتحت الجدول شرح الرموز: [[○ (Static) prerendered as static content]] و [[ƒ (Dynamic) server-rendered on demand]]، وأحيانًا [[● (SSG)]] لصفحات [[generateStaticParams]].

مثلًا [[○ /]] و [[○ /about]] static، و [[ƒ /api/orders]] و [[ƒ /dashboard]] dynamic. الـ static اتعملت HTML وقت الـ build وبتتبعت زي ما هي (سريعة جدًا)، والـ dynamic بتشتغل مع كل طلب.

المفاجأة الشائعة: صفحة كنت فاكرها static طلعت [[ƒ]] لأنها بتقرا [[cookies()]] أو [[headers()]] أو [[searchParams]]، أو بتعمل fetch من غير cache. والعكس: صفحة بتعرض داتا متغيرة طلعت [[○]] فبتعرض نفس الداتا القديمة للكل لحد build جديد. الجدول ده أسرع طريقة تمسك الاتنين قبل الإنتاج.`
        },
        {
          cmd: "Next.js standalone",
          title: "تشغيل Next من غير node_modules كاملة",
          desc: R`[[output: "standalone"]] في next.config بيخلي الـ build يطلّع [[.next/standalone]]: فيه [[server.js]] ونسخة صغيرة من node_modules فيها اللي الكود بيستخدمه فعلًا. تنسخ الفولدر ده للسيرفر أو للـ image وتشغّل [[node server.js]].

بس فيه حاجتين مش بيتنسخوا لوحدهم: [[.next/static]] و [[public]]. من غيرهم الصفحة بتفتح من غير CSS ولا صور.`,
          example: R`# next.config.ts فيه:  output: "standalone"
npm run build
test -d .next/standalone || echo "standalone مطلعش"
cp -r public .next/standalone/
cp -r .next/static .next/standalone/.next/
du -sh node_modules .next/standalone
cd .next/standalone && HOSTNAME=0.0.0.0 PORT=3000 node server.js`,
          try: "فعّل standalone في مشروع Next، وابنيه، وشغّل server.js مرة من غير نسخ static وشوف الصفحة، وبعدين انسخه وقارن. وقارن حجم الفولدر بـ node_modules.",
          deep: {
            why: "الـ image اللي فيها node_modules كاملة بتبقى مئات الميجا، وفيها مكتبات التطوير والـ build. standalone بياخد اللي بيتشغّل بس، فالـ image بتصغر لعشرات الميجا، وبتنزل على السيرفر أسرع، وفيها كود أقل ممكن يبقى فيه ثغرة.",
            how: R`وقت الـ build Next بيتتبّع كل ملف الكود بيعمله import أو require (file tracing)، وبينسخ بس الملفات دي من node_modules لـ [[.next/standalone/node_modules]]، ويكتب [[server.js]] صغير بيشغّل التطبيق من غير [[next start]].

[[static]] و [[public]] متسابين بره عن قصد، على أساس إنك ممكن تحطهم على CDN. لو مش هتعمل كده، انسخهم جنبه زي المثال، وفي Dockerfile ده سطرين [[COPY --from=builder]].

[[server.js]] بيسمع على [[HOSTNAME]] و [[PORT]] من البيئة. جوه Docker، Docker نفسه بيحط HOSTNAME باسم الـ container، فلو نسيت [[HOSTNAME=0.0.0.0]] السيرفر ممكن يسمع على عنوان واحد بس ومش هيرد على الـ healthcheck أو Nginx.

متغيرات [[NEXT_PUBLIC_*]] بتتحط جوه JS وقت الـ build، فلازم تبقى موجودة ساعتها. الباقي (أسرار السيرفر) وقت التشغيل من env_file، مش build args.

و [[basePath: "/myapp"]] جنب standalone لو الموقع هيشتغل تحت مسار فرعي على دومين مشترك.`,
            when: "أي Next.js بيتنشر في Docker أو على VPS من غير Vercel.",
            mistakes: R`في مشروع حقيقي كان .dockerignore فيه [[*.png]] عشان يشيل screenshots من الجذر، فشال معاها صور public ولوجو الموقع، والصور طلعت 404 جوه الـ container بس وعلى الجهاز شغالة. الصح [[/*.png]] للجذر بس. وفي مشروع تاني أسرار زي مفتاح service role و HMAC اتبعتت build args، فاتحفظت في طبقات الـ image وبتبان في docker history. وسطر [[test -d .next/standalone]] جوه RUN بيوقف الـ build بخطأ واضح لو حد شال output من الـ config بالغلط.`
          },
          lines: [
            "ابني، ومع output standalone بيطلع الفولدر.",
            "اتأكد إن الفولدر طلع فعلًا (في Dockerfile خليها تفشل الـ build).",
            "انسخ public جنب server.js.",
            "وانسخ ملفات static (CSS و JS المبنية).",
            "قارن الحجمين: node_modules كاملة ضد الفولدر اللي هيتنشر.",
            "ادخل الفولدر وشغّل السيرفر يسمع على كل الكروت."
          ],
          sol: R`بعد [[npm run build]] بـ [[output: "standalone"]] هيتعمل [[.next/standalone]] فيه [[server.js]] و [[node_modules]] صغير.

من غير نسخ static: [[node server.js]] بيطبع [[✓ Ready]] والصفحة بتفتح بـ HTML، بس من غير CSS والتفاعل مش شغال، والـ Network في المتصفح مليان 404 على [[/_next/static/...]]، والصور اللي في [[public]] مش ظاهرة. بعد ما تنسخ [[public]] و [[.next/static]] وتعيد التشغيل: كل حاجة ظاهرة.

والحجم: [[du -sh node_modules .next/standalone]] على مشروع عادي بيطلّع node_modules بمئات الميجات والـ standalone بعشرات بس، لأنه فيه الملفات اللي السيرفر فعلًا بيحتاجها. ودا اللي بيخلي الـ Docker image صغيرة.

لو [[.next/standalone]] مطلعش خالص: الـ config مش متقري (اسم الملف غلط، أو [[output]] جوه حاجة تانية)، أو الـ build فشل. ولو السيرفر فتح بس مش قادر توصله من بره الـ container، دا سبب [[HOSTNAME=0.0.0.0]].`
        },
        {
          cmd: "npm publish",
          title: "انشر مكتبة",
          desc: "لو عملت حاجة بتتكرر بين مشاريعك، انشرها كباكدج. [[@scope/name]] باسم حسابك. [[--dry-run]] يوريك إيه اللي هيترفع من غير ما يرفع، ودي مهمة عشان متعملش publish لـ .env.",
          example: R`npm login
npm pack
npm publish --dry-run
npm publish --access public
npm version patch && npm publish`,
          try: "شغّل [[npm pack]] وافتح ملف tgz اللي طلع وشوف إيه اللي كان هيترفع.",
          deep: {
            why: "كود بتنسخه بين مشاريعك (helpers، و client لـ API بتاعك). لما يبقى باكدج، التحديث في مكان واحد، وكل مشروع بيسطّب النسخة اللي يحتاجها.",
            how: R`[[npm login]] مرة. الاسم في package.json لازم يبقى فريد على npm، والـ scoped [[@username/name]] بيضمن ده.

[[npm pack]] بيعمل ملف tgz هو بالظبط اللي هيترفع، من غير رفع. افتحه وشوف: المفروض الكود والـ README و package.json بس. لو لقيت .env أو tests أو src الأصلي، ضبط حقل [[files]] في package.json أو .npmignore.

[[publish --dry-run]] نفس الفكرة بيعرض القايمة. و [[--access public]] لازمة للـ scoped أول مرة، لأن الافتراضي private (وده مدفوع).

[[npm version patch]] بيرفع الرقم في package.json ويعمل commit و tag في Git. minor و major نفسه. ومينفعش تنشر نفس النسخة مرتين.

ونشر على GitHub Packages بدل npm: نفس الأوامر مع registry في .npmrc، ومناسب للباكدجات الخاصة بالشركة.`,
            when: "لما نفس الكود اتنسخ لتالت مشروع.",
            mistakes: "publish من غير dry-run فيترفع .env. ونشر بنسخة 1.0.0 قبل ما الـ API يستقر، بعدها كل تغيير كاسر major."
          },
          lines: [
            "سجّل دخول على npm.",
            "اعمل tgz هو بالظبط اللي هيترفع، من غير رفع.",
            "اعرض إيه اللي هيترفع.",
            "انشر، و public لازمة للـ scoped أول مرة.",
            "ارفع رقم patch (مع commit و tag) وانشر."
          ],
          sol: R`[[npm pack]] بيطبع [[Tarball Contents]] فيها كل ملف وحجمه، و [[Tarball Details]] ([[name]] و [[version]] و [[package size]] و [[total files]])، وبيعمل ملف زي [[myapp-1.0.0.tgz]]. [[tar tzf myapp-1.0.0.tgz]] بيعرض الملفات تحت [[package/]].

في تجربة على فولدر فيه [[.env]] ومفيش [[.gitignore]] ولا [[files]]: الـ tgz كان فيه [[package/.env]] وملفات لوج كمان. يعني لو عملت publish كان الـ secret هيبقى على npm لأي حد. npm بيستخدم [[.gitignore]] لو مفيش [[.npmignore]]، ولو الاتنين مش موجودين بياخد تقريبًا كل حاجة.

الحل الأأمن: حقل [["files": ["dist"]]] في package.json، فالـ tarball يبقى فيه dist و package.json و README و LICENSE بس. واعمل [[npm pack]] أو [[npm publish --dry-run]] قبل كل نشر.`
        }
      ]
    },
    {
      t: "Prisma في مشروع Node",
      l: 3,
      n: "الكلاينت المتولّد، والـ migrations وقت التشغيل، وليه db push مكانه جهازك بس (تفاصيل migrate في تاب PostgreSQL)",
      items: [
        {
          cmd: "prisma generate",
          title: "الكلاينت اللي بيتولّد من الـ schema",
          desc: R`الكود اللي بتكتب بيه [[prisma.user.findMany()]] مش مكتوب في المكتبة، ده بيتولّد من [[schema.prisma]] بأمر [[prisma generate]]. عدّلت الـ schema أو سطّبت من الأول؟ generate تاني، وإلا الكود بيشتغل بأنواع قديمة أو بيقع بـ [[did not initialize yet]].

وgenerate مش محتاج يتصل بالقاعدة، فمفيش داعي تدّي الـ build أي سر.`,
          example: R`npx prisma validate
npx prisma format
npx prisma generate
pnpm exec prisma generate
npm pkg set scripts.postinstall="prisma generate"`,
          try: "ضيف حقل جديد في model في schema.prisma، وجرّب تستخدمه في الكود قبل generate وشوف خطأ الأنواع، وبعدين generate وشوفه اختفى.",
          deep: {
            why: "Prisma بيديك أنواع مظبوطة لكل جدول وعمود، والتمن إن الكود ده لازم يتولّد. أغلب أخطاء Prisma الغريبة بعد pull أو في Docker سببها generate متعملش، أو اتعمل على schema قديمة.",
            how: R`[[validate]] بيتأكد إن الـ schema سليمة، و [[format]] بينسّقها. [[generate]] بيقرا الـ schema ويكتب كود الكلاينت: في Prisma 7 بالـ generator الجديد [[prisma-client]] بيتكتب في فولدر انت محدده بـ [[output]] (زي src/generated/prisma) وبتستورد منه، وفي النسخ القديمة كان بيتكتب جوه [[node_modules/.prisma/client]].

إمتى تشغّله: بعد أي تعديل في الـ schema، وبعد تسطيب من الصفر (CI و Docker)، وقبل [[next build]] أو [[tsc]]. ومن Prisma 7 [[migrate dev]] مبقاش بيعمله لوحده.

[[postinstall]] بيخليه يتعمل بعد كل install لوحده، ودي أسهل طريقة تضمن إن محدش ينساه. في Dockerfile: [[RUN npx prisma generate && npm run build]] في مرحلة الـ build.

مع pnpm 10: لو Prisma محتاج سكربت تسطيب ومش متوافق عليه في approve-builds، الـ generate أو الـ engines ممكن يبقوا ناقصين.`,
            when: "بعد كل تعديل في schema.prisma، وفي كل build نضيف.",
            mistakes: R`في مشروع حقيقي كان الـ Dockerfile فيه [[ARG DATABASE_URL]] و [[ENV DATABASE_URL]] عشان generate يشتغل، والسر اتحفظ في طبقات الـ image. generate مش محتاج اتصال: شيلهم، ولو prisma.config.ts بيطلب المتغير حط قيمة وهمية في الـ build بس، والحقيقي وقت التشغيل. وغلطة تانية: الفولدر المتولّد داخل Git، فكل واحد في الفريق عنده نسخة مختلفة شوية.`
          },
          lines: [
            "اتأكد إن الـ schema سليمة.",
            "نسّقها.",
            "ولّد الكلاينت من الـ schema.",
            "نفس الحاجة في مشروع pnpm.",
            "خليه يتولّد لوحده بعد كل install."
          ],
          sol: R`لو ضفت [[phone String?]] في [[model User]] وكتبت [[user.phone]] في الكود قبل generate، الـ editor و [[tsc --noEmit]] بيقولوا [[error TS2339: Property 'phone' does not exist on type '{ name: string; id: number; email: string; role: string; }'.]]، ولو استخدمته في [[create]] أو [[where]]: [[Object literal may only specify known properties, and 'phone' does not exist in type ...]].

بعد [[npx prisma generate]] (بيطبع [[✔ Generated Prisma Client (7.10.0) to ./generated/prisma]] أو المسار عندك) الخطأ بيختفي، لأن الأنواع اتولّدت من الـ schema الجديدة. أحيانًا VS Code محتاج [[TypeScript: Restart TS Server]] عشان ياخد باله.

خلي بالك إن generate بيحدّث الكود بس، مش القاعدة: لو شغّلت الكود هتاخد error إن العمود مش موجود لحد ما تعمل migration. والغلط الشائع إنك تنسى generate بعد [[git pull]] فيه تغيير في الـ schema، ودا اللي [[postinstall]] في المثال بيحله.`
        },
        {
          cmd: "prisma db push",
          title: "مزامنة الـ schema من غير migrations، وليه خطر",
          desc: R`[[db push]] بيقارن الـ schema بالقاعدة ويعدّلها على طول: من غير ملف migration ولا تاريخ. ممتاز وانت بتجرّب شكل الجداول على جهازك. و [[--accept-data-loss]] بيوافق مقدمًا على أي تغيير بيمسح داتا، من غير ما يسألك.

الاتنين مكانهم جهاز التطوير. الإنتاج بياخد [[migrate deploy]] بس.`,
          example: R`npx prisma db push
npx prisma db push --accept-data-loss
# الغلطة: أمر تشغيل الـ container في الإنتاج
# command: sh -c "npx prisma db push --accept-data-loss && node src/server.js"
# الصح:
# command: sh -c "npx prisma migrate deploy && node src/server.js"`,
          try: "على قاعدة تجربة: اعمل model فيه عمود name وضيف كام صف، وغيّر اسمه لـ fullName، وشغّل db push واقرا التحذير. بعدها جرّب بـ --accept-data-loss وشوف الداتا راحت فين.",
          flag: "danger",
          deep: {
            why: "db push مريح جدًا: تعدّل الـ schema، أمر واحد، والقاعدة زيها. عشان كده بيتسرّب لسكربتات التشغيل. وهناك بيبقى قنبلة: أول تعديل بيمسح عمود، بيمسح داتا العملاء مع أول deploy.",
            how: R`db push مبيعرفش نيتك. لو غيّرت اسم عمود من [[name]] لـ [[fullName]]، هو شايف عمود اتشال وعمود جديد اتضاف، فبيعمل DROP للقديم و ADD للجديد، والداتا بتروح. نفس الحاجة لو غيّرت نوع عمود بطريقة مش متوافقة.

من غير الفلاج: لو فيه خسارة داتا، بيوقف ويسأل. وفي container مفيش حد يجاوب، فبيفشل والـ deploy يقف، ودي بالظبط الحماية. الفلاج بيشيلها.

[[migrate deploy]] مختلف: بيطبّق ملفات SQL اتكتبت واتراجعت واتعملها commit، بالترتيب، وبيسجّل اللي اتطبق. محدش بيولّد حاجة وقت الـ deploy.

لو القاعدة اتعملت بـ db push وعايز تنقل لـ migrations: ولّد migration أولى من الـ schema بـ [[prisma migrate diff --from-empty --to-schema prisma/schema.prisma --script]] في [[prisma/migrations/0_init/migration.sql]]، وعلّمها متطبقة بـ [[prisma migrate resolve --applied 0_init]]. التفاصيل في تاب PostgreSQL.`,
            when: "db push على جهازك وانت لسه بتصمم الجداول، أو قاعدة تجربة بتترمي. مش على أي قاعدة فيها داتا حد محتاجها.",
            mistakes: R`في مشروع حقيقي كان أمر تشغيل الـ backend في docker-compose: [[npx prisma db push --accept-data-loss && node src/server.js]]. يعني مع كل restart أو deploy، أي تغيير في الـ schema بيتطبق فورًا ومن غير سؤال، ولو فيه rename لعمود الداتا بتتمسح. والصح migrate deploy في نفس المكان. وقريب منه [[prisma migrate reset]]: بيمسح القاعدة كلها ويعيد بناها، فاتأكد إن DATABASE_URL مش بيشاور على الإنتاج قبل ما تشغّله.`
          },
          lines: [
            "طابق القاعدة مع الـ schema، ويسأل لو فيه مسح.",
            "نفسه، ويوافق على المسح من غير سؤال (تجربة بس)."
          ],
          sol: R`مع model فيه [[name String]] وصفّين، ولما تغيّره لـ [[fullName String]] (مطلوب):

[[⚠️ We found changes that cannot be executed:]] و [[Added the required column fullName to the User table without a default value. There are 2 rows in this table, it is not possible to execute this step.]] يعني مينفعش أصلًا، و [[--accept-data-loss]] مش هيحلها (الـ CLI بيقترح [[--force-reset]] اللي بيمسح القاعدة كلها).

لو خليته [[fullName String?]]: [[⚠️ There might be data loss when applying the changes:]] و [[You are about to drop the column name on the User table, which still contains 2 non-null values.]] و [[Use the --accept-data-loss flag to ignore the data loss warnings]]. مع [[--accept-data-loss]]: عمود [[name]] اتمسح بالداتا، و [[fullName]] اتعمل فاضي ([[null]] في الصفين). الداتا راحت، مش اتنقلت، لأن db push مش بيعرف إن دا rename.

ودا سبب إنه مينفعش في الإنتاج: rename بسيط بقى مسح. الصح migration بـ [[RENAME COLUMN]]. ولاحظ إن نسخ Prisma الجديدة ممكن ترفض الـ flag ده لو حسّت إنها شغالة من agent آلي، وتطلب موافقة صريحة من الإنسان.`
        },
        {
          cmd: "migrate deploy قبل السيرفر",
          title: "فين تشغّل الـ migrations في الإنتاج",
          desc: R`[[prisma migrate deploy]] لازم يتشغّل قبل الكود الجديد ما يقوم، وإلا الكود يطلب عمود لسه مش موجود. يا إما خطوة في الـ deploy قبل ما تشغّل التطبيق، يا إما أول سطر في الـ entrypoint.

والمهم في الحالتين: لو الـ migration فشلت، السيرفر ميقومش.`,
          example: R`npx prisma migrate status
docker compose run --rm app npx prisma migrate deploy
docker compose up -d app
docker compose logs --tail 50 app
# أو في entrypoint.sh:
# npx prisma migrate deploy && exec node server.js`,
          try: "في مشروع تجربة بـ compose: اعمل migration جديدة، وارفعها، وطبّقها بـ [[docker compose run --rm]] قبل [[up -d]]، وبعدين [[migrate status]] يقول كله متطبق.",
          deep: {
            why: "الكود والقاعدة لازم يتحركوا مع بعض. deploy الكود من غير migration = أخطاء في كل request. و migration بتفشل في صمت = نفس النتيجة، بس انت فاكر كله تمام.",
            how: R`[[migrate status]] بيقولك إيه اللي لسه متطبقش، اقراه قبل أي deploy.

الطريقة الأولى، خطوة منفصلة: [[docker compose run --rm app npx prisma migrate deploy]] بيشغّل container مؤقت من نفس الـ image، يطبّق ويخرج. لو فشل، الـ && في سكربت الـ deploy بتوقف قبل [[up -d]]، والنسخة القديمة لسه شغالة.

الطريقة التانية، في الـ entrypoint: [[migrate deploy && exec node server.js]]. بسيطة، بس بتتشغّل مع كل restart، ومحتاجة Prisma CLI جوه image الإنتاج (وده مش موجود في standalone ولا مع omit=dev)، ولو عندك أكتر من نسخة من التطبيق الكل بيحاول مع بعض (Prisma بيقفل بـ lock فواحدة بس بتطبّق، والباقي بيستنى لحد 10 ثواني بس، ولو الـ migration طوّلت أكتر بيفشلوا).

[[exec]] بيخلي node ياخد مكان الشيل كـ PID 1، فيستلم SIGTERM من Docker ويقفل نضيف.`,
            when: "كل deploy فيه migration جديدة. والخطوة المنفصلة أحسن أول ما يبقى عندك CI أو أكتر من نسخة.",
            mistakes: R`في مشروع حقيقي كان الـ entrypoint: [[node scripts/auto-migrate.mjs || echo "schema sync skipped"]]. الـ [[|| echo]] بتبلع الفشل، فالسيرفر يقوم على schema قديمة وكل request يضرب error. ده غير إن السكربت كان بيشتغل مع كل تشغيل container بتوكن إدارة كامل للقاعدة، وكان فيه ملفين entrypoint واحد بيشاور على .js والتاني على .mjs. خليها [[&&]] من غير أي fallback.`
          },
          lines: [
            "إيه اللي لسه متطبقش.",
            "طبّق في container مؤقت من نفس الـ image، ويتمسح بعدها.",
            "وبعد ما نجح بس، شغّل النسخة الجديدة.",
            "اتأكد إنه قام من غير أخطاء قاعدة."
          ],
          sol: R`[[docker compose run --rm app npx prisma migrate deploy]] بيطبع اسم كل migration جديدة و [[All migrations have been successfully applied.]] (ولو مفيش جديد: [[No pending migrations to apply.]]). وبعد [[up -d]]، [[npx prisma migrate status]] بيقول [[Database schema is up to date!]]، واللوج بتاع app مفيهوش errors عن أعمدة ناقصة.

ليه [[run --rm]] الأول: لو الـ migration فشلت، السيرفر القديم لسه شغال على الـ schema القديمة، والجديد ما اتشغلش على schema ناقصة. [[--rm]] بيمسح الـ container المؤقت بعد ما يخلص.

الأخطاء الشائعة: [[P3009 migrate found failed migrations in the target database]] يعني migration سابقة وقعت في النص؛ اقرا الـ error، صلّح القاعدة، و [[prisma migrate resolve]]. و [[P1001 Can't reach database server]] يعني الـ app مش شايف الـ db (اسم الـ service في DATABASE_URL أو الـ db لسه مقامتش). ولو [[migrate status]] قال فيه migrations مش متطبقة، يبقى الـ image اللي عملت منها run قديمة ومفيهاش ملفات الـ migrations الجديدة: اعمل build الأول.`
        },
        {
          cmd: "prisma db seed و studio",
          title: "بيانات أولية وواجهة تتصفّح بيها القاعدة",
          desc: R`[[db seed]] بيشغّل سكربت بيحط بيانات البداية: أدمن، وتصنيفات، وإعدادات. أمره بيتكتب مرة في الإعدادات وأي حد في الفريق يشغّله بنفس الشكل. و [[studio]] بيفتح واجهة ويب على [[localhost:5555]] تشوف وتعدّل فيها الداتا.

الاتنين للتطوير. على السيرفر بحذر شديد، و studio عمره ما يتفتح للنت.`,
          example: R`npx prisma db seed
node --env-file=.env prisma/seed.js
npx prisma studio
npx prisma studio --port 5556 --browser none
ssh -L 5555:localhost:5555 deploy@203.0.113.10`,
          try: "اكتب seed بيعمل أدمن بـ upsert، وشغّله مرتين، واتأكد إن مفيش أدمن مكرر. وبعدين افتح studio وشوفه.",
          deep: {
            why: "كل واحد جديد في الفريق، وكل قاعدة تجربة بعد reset، محتاجة نفس البيانات الأولية. من غير seed كل واحد بيعملها بإيده وبشكل مختلف.",
            how: R`أمر الـ seed بيتعرّف مرة: في Prisma 7 جوه [[prisma.config.ts]] تحت [[migrations.seed]] (زي [[node --env-file=.env prisma/seed.js]] أو [[tsx prisma/seed.ts]])، وفي النسخ القديمة في package.json تحت [[prisma.seed]]. و [[npx prisma db seed]] بينفّذه. ومتعتمدش إنه يتشغّل لوحده بعد migrate، شغّله صريح.

وفي Prisma 7 مع prisma.config.ts ملف .env مش بيتقري لوحده، فيا [[import "dotenv/config"]] في أول الـ config، يا [[--env-file]] في أمر node.

الـ seed لازم يبقى ينفع يتشغّل كذا مرة: [[upsert]] بدل [[create]]، عشان تشغيله تاني ميكررش ولا يقع على unique.

[[studio]] سيرفر ويب صغير بيتصل بالقاعدة اللي في DATABASE_URL. [[--browser none]] ميفتحش متصفح (على سيرفر مثلًا). ولو محتاجه على سيرفر، شغّله هناك واوصله من جهازك بـ SSH tunnel زي آخر سطر، ومتفتحش البورت في الفايروول.`,
            when: "seed بعد أي reset وفي أول تشغيل للمشروع. studio لما تحب تبص على الداتا بسرعة من غير SQL.",
            mistakes: "seed بـ create فالتشغيل التاني يقع أو يكرر. و studio شغال و .env فيه DATABASE_URL بتاع الإنتاج، فتعديل «تجربة» بيتكتب في داتا حقيقية."
          },
          lines: [
            "شغّل أمر الـ seed المتعرّف في الإعدادات.",
            "أو شغّل السكربت مباشرة وهو بيقرا .env.",
            "افتح الواجهة على localhost:5555.",
            "على بورت تاني ومن غير ما يفتح متصفح.",
            "من جهازك: وصّل 5555 على السيرفر لجهازك عبر SSH بدل ما تفتحه للنت."
          ],
          sol: R`الحل: [[upsert]] بالـ email كـ where (والعمود لازم يكون [[@unique]]). أول مرة بيعمل الأدمن ويطبع [[admin id 1]] و [[🌱  The seed command has been executed.]]، والتانية بيلاقيه فبيعمل update (هنا فاضي فمبيغيرش حاجة). بعد تشغيلين [[SELECT count(*) FROM "User" WHERE email = 'admin@example.com']] بيرجّع [[1]]، و Studio على [[http://localhost:5555]] بيعرض صف واحد.

لو استخدمت [[create]] بدل upsert: التشغيل التاني يقع بـ [[Unique constraint failed on the fields: (email)]] (P2002)، ولو email مش unique، هيعمل أدمن تاني بصمت، ودا الأسوأ.

وفي Prisma 7 أمر الـ seed بيتكتب في [[prisma.config.ts]] ([[migrations: { seed: "node prisma/seed.js" }]])، لو [[npx prisma db seed]] قال إنه مش لاقي seed command يبقى الإعداد ناقص، شغّله مباشرة بـ [[node --env-file=.env prisma/seed.js]].`,
          solCode: R`// prisma/seed.ts (Prisma 7: generator "prisma-client" بـ output = "../generated/prisma")
import { PrismaClient } from "../generated/prisma/client.ts";
import { PrismaPg } from "@prisma/adapter-pg";

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }) });

const admin = await prisma.user.upsert({
  where: { email: "admin@example.com" },
  update: {},
  create: { email: "admin@example.com", name: "Admin", role: "ADMIN" },
});
console.log("admin id", admin.id);
await prisma.$disconnect();

// prisma.config.ts: migrations: { seed: "node --env-file=.env prisma/seed.ts" }`
        }
      ]
    },
    {
      t: "Webhooks: خلّي Paymob يوصل لجهازك",
      l: 3,
      n: "بوابة الدفع بتبعت callback لسيرفر على النت، وجهازك مش على النت. الـ tunnel بيحل ده",
      items: [
        {
          cmd: "المشكلة",
          title: "ليه localhost مش بيوصل",
          desc: "Paymob وTabby وTamara بعد الدفع بيبعتوا طلب POST لـ URL انت مسجّله عندهم. الـ URL لازم يبقى على النت. [[localhost:3000]] موجود على جهازك بس. الـ tunnel بيعمل عنوان عام مؤقت بيوصّل لجهازك.",
          example: R`curl -X POST http://localhost:3000/webhooks/paymob -H "Content-Type: application/json" -d '{"type":"TRANSACTION","obj":{"success":true,"amount_cents":10000}}'`,
          try: "اعمل route للـ webhook بيطبع req.body، وجرّبه بالأمر ده الأول قبل أي tunnel.",
          deep: {
            why: "بتطوّر الدفع، وكل حاجة شغالة لحد صفحة Paymob، وبعدين مفيش callback. السبب إن Paymob بتبعت للـ URL المسجّل، وده localhost اللي عمره ما هيوصل من سيرفرات Paymob.",
            how: R`الـ webhook مجرد طلب HTTP من سيرفر البوابة لسيرفرك. عشان يوصل، سيرفرك لازم يبقى ليه عنوان عام على النت. جهازك ورا راوتر (NAT) ومفيش عنوان عام يشاور عليه.

الحلول: يا تعمل deploy على staging مع كل تعديل (بطيء)، يا tunnel: برنامج على جهازك بيفتح اتصال لسيرفر على النت، والسيرفر ده بيديك URL عام، وأي طلب يوصله بيبعته جوه الاتصال لجهازك. الطلب بيوصل لـ localhost:3000 كأنه من النت.

بس قبل أي tunnel: الـ curl في المثال بيحاكي الـ webhook. لو الـ route بتاعك مش بيشتغل مع curl من جهازك، مش هيشتغل مع Paymob. اختبر المنطق الأول بـ curl، والـ tunnel بعدين للتكامل الحقيقي.

كل بوابة ليها شكل body مختلف. Paymob بتبعت [[type]] و [[obj]] فيه بيانات المعاملة، و hmac في query string. Tabby و Tamara بيبعتوا JSON مختلف وتوقيع في header. اقرا وثائق كل واحدة.`,
            when: "أول ما تبدأ تطوير أي integration فيه callback: دفع، أو WhatsApp API، أو GitHub webhooks.",
            mistakes: "تسجّل http://localhost في لوحة البوابة وتستنى. وتختبر بالـ tunnel قبل ما الـ route يشتغل مع curl."
          },
          lines: ["حاكي webhook من Paymob على جهازك: POST بـ JSON بنفس شكل اللي بيبعتوه."],
          sol: R`الـ route البسيط: [[app.post("/webhooks/paymob", (req, res) => { console.log(req.body); res.sendStatus(200); })]] مع [[app.use(express.json())]]. الـ curl بيرجّع [[OK]]، والترمنال بتاع السيرفر بيطبع:

[[{ type: 'TRANSACTION', obj: { success: true, amount_cents: 10000 } }]].

لو طبع [[undefined]]: نسيت [[express.json()]]، أو الـ middleware متسجل بعد الـ route. ولو الـ curl رجّع [[Cannot POST /webhooks/paymob]] (404)، المسار أو الـ method مختلف. ولو [[Connection refused]] السيرفر مش شغال أو على بورت تاني.

النقطة: لما دا يشتغل محليًا بـ curl، أي مشكلة بعد ما تحط ngrok تبقى في الـ tunnel أو إعدادات Paymob، مش في الكود. مش هتحتاج تعمل دفعة حقيقية عشان تختبر كل تعديل.`,
          solCode: R`import express from "express";
const app = express();
app.use(express.json());
app.post("/webhooks/paymob", (req, res) => {
  console.log(req.body);
  res.sendStatus(200);
});
app.listen(3000);`
        },
        {
          cmd: "ngrok",
          title: "tunnel في ثانية",
          desc: "[[ngrok http 3000]] بيديك URL عام زي [[https://a1b2.ngrok-free.app]] بيوصّل لبورت 3000 عندك. تحطه في إعدادات Paymob كـ callback. وعلى [[localhost:4040]] لوحة بتوريك كل طلب وصل وبتعيد إرساله.",
          example: R`ngrok config add-authtoken TOKEN
ngrok http 3000
ngrok http 3000 --url=https://myapp.ngrok-free.dev
curl -s localhost:4040/api/requests/http | jq '.requests[0].request.uri'`,
          try: "شغّل ngrok وافتح الـ URL من موبايلك على الداتا (مش الواي فاي) واتأكد إنه فتح سيرفرك.",
          deep: {
            why: "أسرع طريقة تخلي جهازك على النت لدقايق. أمر واحد و URL جاهز تحطه في Paymob.",
            how: R`[[ngrok http 3000]] بيفتح اتصال لسيرفرات ngrok، وبيطبع URL عام. أي طلب على الـ URL ده بيتبعت لـ localhost:3000 عندك. HTTPS جاهز، وده مهم لأن البوابات بترفض http.

الـ authtoken مرة واحدة بعد التسجيل (مجاني). من غيره ngrok مش هيفتح tunnel أصلًا.

في الخطة المجانية الـ URL عشوائي وبيتغير كل مرة، فبتغيّره في لوحة Paymob كل مرة. كل حساب مجاني بياخد dev domain ثابت واحد (على ngrok-free.dev) تلاقيه في اللوحة، وتشغّله بـ [[--url]] (بديل [[--domain]] القديم).

الأقوى في ngrok: لوحة [[localhost:4040]]. بتعرض كل طلب وصل بالـ headers والـ body والرد، وزرار Replay بيعيد إرسال نفس الطلب لسيرفرك من غير ما تعمل دفعة جديدة. والـ API بتاعتها على [[/api/requests/http]] بتديك نفس المعلومات كـ JSON.

الطلبات بتعدّي على سيرفرات ngrok، فمتستخدمهوش لبيانات حقيقية حساسة. للتطوير بس.`,
            when: "تطوير أي webhook. وتوريك شغلك لعميل قبل الـ deploy.",
            mistakes: "تنسى ngrok شغال وتقفل الترمنال والـ URL يموت، والبوابة تفضل تبعت لعنوان ميت. وتستخدم الـ URL العشوائي في staging."
          },
          lines: [
            "التوكن مرة واحدة بعد التسجيل.",
            "افتح tunnel لبورت 3000، وخد الـ URL اللي يطلع.",
            "بدومين ثابت من ngrok بدل العشوائي.",
            "من API اللوحة: مسار آخر طلب وصل."
          ],
          sol: R`[[ngrok http 3000]] بيفتح شاشة فيها [[Forwarding https://xxxx.ngrok-free.app -> http://localhost:3000]] (الدومين ممكن يبقى ngrok-free.app أو ngrok-free.dev حسب الحساب)، و [[Web Interface http://127.0.0.1:4040]].

من الموبايل على الداتا: أول مرة في الخطة المجانية بتظهر صفحة تحذير من ngrok إنك رايح لموقع حد تاني، وزرار [[Visit Site]]. بعده بتشوف رد سيرفرك، وفي شاشة ngrok في الترمنال السطر [[GET / 200 OK]]. الداتا مش الواي فاي عشان تتأكد إن الطلب فعلًا جاي من الإنترنت، مش من شبكتك.

لو [[ERR_NGROK_4018]] يبقى محتاج [[ngrok config add-authtoken]]. ولو الموبايل شاف [[502 Bad Gateway]] أو صفحة ngrok بتقول مش قادر يوصل لـ localhost:3000، سيرفرك مش شغال أو على بورت تاني. والـ webhooks من Paymob مش بتتأثر بصفحة التحذير لأنها مش متصفح.`
        },
        {
          cmd: "cloudflared",
          title: "tunnel مجاني وثابت",
          desc: "Cloudflare Tunnel بديل مجاني، وبيديك دومين ثابت لو ربطته بدومين عندك على Cloudflare. [[--url]] للتجربة السريعة بعنوان عشوائي. والـ named tunnel للاستخدام المتكرر بعنوان زي [[dev.example.com]].",
          example: R`cloudflared tunnel --url http://localhost:3000
cloudflared tunnel login
cloudflared tunnel create dev
cloudflared tunnel route dns dev dev.example.com
cloudflared tunnel run dev`,
          try: "اعمل named tunnel على subdomain، وحطه مرة واحدة في Paymob، ومش هتغيّره تاني.",
          deep: {
            why: "ngrok المجاني ليه حدود، ولو عندك دومين على Cloudflare أصلًا، الـ tunnel بتاعهم مجاني بالكامل وبيديك subdomain ثابت.",
            how: R`[[cloudflared tunnel --url http://localhost:3000]] زي ngrok بالظبط: URL عشوائي على trycloudflare.com، من غير حساب حتى.

الـ named tunnel للاستخدام المتكرر: [[login]] بيربط بحسابك، [[create dev]] بيعمل tunnel اسمه dev ويحفظ credentials في ملف، [[route dns dev dev.example.com]] بيعمل سجل DNS في Cloudflare يشاور على الـ tunnel، و [[run dev]] بيشغّله.

والـ tunnel محتاج ملف config يقول أنهي hostname يروح لأنهي بورت محلي: [[~/.cloudflared/config.yml]] فيه [[ingress]] بـ hostname و service.

النتيجة: [[dev.example.com]] ثابت، بتحطه في Paymob مرة واحدة. وممكن تحطه على السيرفر كخدمة (cloudflared service install) لو عايز تعرّض خدمة من سيرفر من غير ما تفتح بورت في الفايروول أصلًا، وده استخدام أمني قوي.

ومع Cloudflare Access تقدر تحط تسجيل دخول قبل الـ URL، فمحدش يوصل لجهازك غيرك (بس الـ webhook محتاج استثناء للمسار بتاعه).`,
            when: "لو عندك دومين على Cloudflare. ولتعريض خدمات داخلية من السيرفر بأمان.",
            mistakes: "route dns لدومين مش على Cloudflare nameservers. وتنسى ingress في config فيطلع 404 من Cloudflare."
          },
          lines: [
            "tunnel سريع بعنوان عشوائي من غير حساب.",
            "اربط بحسابك على Cloudflare.",
            "اعمل tunnel اسمه dev.",
            "اعمل سجل DNS يشاور عليه.",
            "شغّله (بعد ملف config فيه ingress)."
          ],
          sol: R`الخطوات: [[cloudflared tunnel login]] (بتختار الدومين من المتصفح)، [[cloudflared tunnel create dev]] بيطبع [[Created tunnel dev with id <uuid>]] وبيعمل ملف credentials [[~/.cloudflared/<uuid>.json]]، و [[cloudflared tunnel route dns dev dev.example.com]] بيعمل CNAME في Cloudflare. وبعدين [[~/.cloudflared/config.yml]]:

[[tunnel: <uuid>]] و [[credentials-file: /home/you/.cloudflared/<uuid>.json]] و [[ingress]] فيها [[hostname: dev.example.com]] و [[service: http://localhost:3000]] وآخر قاعدة [[service: http_status:404]]. [[cloudflared tunnel run dev]] بيطبع [[Registered tunnel connection]] (عادة ٤ اتصالات)، و [[https://dev.example.com]] بيفتح سيرفرك. حط الرابط ده في Paymob مرة واحدة.

لو فتح 404 من Cloudflare: الـ ingress ناقصة أو الـ hostname فيها مختلف. ولو DNS مش بيتحل، الدومين مش على nameservers بتاعة Cloudflare.`,
          solCode: R`# ~/.cloudflared/config.yml
tunnel: <TUNNEL-UUID>
credentials-file: /home/you/.cloudflared/<TUNNEL-UUID>.json
ingress:
  - hostname: dev.example.com
    service: http://localhost:3000
  - service: http_status:404`
        },
        {
          cmd: "التحقق من التوقيع",
          title: "متصدقش أي POST",
          desc: "أي حد يعرف الـ URL يقدر يبعت JSON يقول «الدفع نجح». البوابة بتبعت توقيع HMAC محسوب بمفتاح سري انت بس اللي عارفه. لازم تحسبه عندك وتقارن، وإلا حد يفعّل طلبات من غير ما يدفع.",
          example: R`import crypto from "node:crypto";

export function verifyPaymob(obj, receivedHmac, secret) {
  const fields = ["amount_cents","created_at","currency","error_occured","has_parent_transaction","id","integration_id","is_3d_secure","is_auth","is_capture","is_refunded","is_standalone_payment","is_voided","order.id","owner","pending","source_data.pan","source_data.sub_type","source_data.type","success"];
  const get = (o, path) => path.split(".").reduce((a, k) => (a == null ? a : a[k]), o);
  const concat = fields.map((f) => String(get(obj, f))).join("");
  const expected = crypto.createHmac("sha512", secret).update(concat).digest("hex");
  if (typeof receivedHmac !== "string" || receivedHmac.length !== expected.length) return false;
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(receivedHmac));
}`,
          try: "ابعت webhook بدون hmac أو بـ hmac غلط واتأكد إن الـ route بيرفض بـ 401 مش بيفعّل الطلب.",
          flag: "script",
          deep: {
            why: R`الـ webhook URL بتاعك عام. أي حد يعرفه (أو يخمّنه) يقدر يبعت POST فيه [["success": true]] ويفعّل طلب من غير ما يدفع. التوقيع هو الدليل إن الطلب من Paymob فعلًا.`,
            how: R`HMAC: البوابة بتاخد بيانات المعاملة، وبتلزقهم في نص واحد بترتيب محدد، وبتحسب hash منه بمفتاح سري (الـ HMAC secret اللي في لوحة Paymob). وبتبعت الـ hash ده مع الطلب.

انت عندك نفس المفتاح. بتعمل نفس الحسبة بالبيانات اللي وصلتك. لو طلع نفس الـ hash، يبقى البيانات متغيرتش واللي بعتها عنده المفتاح. لو حد غيّر [[success]] أو المبلغ، الـ hash هيختلف.

Paymob بتحدد ترتيب الحقول بالظبط (اللي في المثال، أبجدي)، والفصل بينهم مفيش، والقيم كـ نصوص ([[true]] بتبقى "true"). والحقول المتداخلة زي [[order.id]] بتتقري من جوه. الترتيب ده من وثائقهم ولازم يبقى مطابق حرفيًا.

[[timingSafeEqual]] بدل [[===]]: المقارنة العادية بتوقف عند أول حرف مختلف، فوقتها بيكشف قد إيه التخمين قريب (timing attack). دي بتاخد نفس الوقت دايمًا.

Tabby و Tamara بيبعتوا التوقيع في header وبيحسبوه على الـ body الخام، فمحتاج [[express.raw()]] للمسار ده عشان تاخد الـ body قبل ما يتعمله parse.`,
            when: "كل webhook بيأثر على فلوس أو صلاحيات. من غير استثناء.",
            mistakes: "تقارن بـ ===. وتعمل parse للـ body قبل التحقق في البوابات اللي بتوقّع على الـ raw body، فالتوقيع يفشل دايمًا."
          },
          lines: [
            "مكتبة التشفير المبنية في Node.",
            "الدالة: بيانات المعاملة، والتوقيع اللي وصل، والمفتاح السري.",
            "الحقول بالترتيب اللي Paymob بتحدده (من وثائقهم، حرفيًا).",
            "دالة تقرا حقل متداخل زي order.id بأمان.",
            "الزق قيم الحقول كنصوص من غير فواصل.",
            "احسب HMAC-SHA512 بالمفتاح.",
            "لو الـ hmac مش موجود أو طوله غلط ارفض على طول، لأن timingSafeEqual بيضرب error لو الطولين مختلفين.",
            "قارن بطريقة بتاخد وقت ثابت (مش ===).",
            "قفلة."
          ],
          sol: R`جرّبتها على route فيه [[verifyPaymob]] والـ secret [[test-secret]]، وحسبت الـ hmac الصح بنفس الدالة للـ body ده. النتيجة بالترتيب: من غير [[?hmac]] [[401]]، بـ [[?hmac=abc]] [[401]]، بالـ hmac الصح [[200]] وطبع [[activate order 777]].

من غير hmac الدالة بترجع false قبل ما تحسب حاجة ([[typeof receivedHmac !== "string"]])، و [[abc]] بترجع false من فحص الطول قبل [[timingSafeEqual]] (اللي بيرمي error لو الأطوال مختلفة). والمهم إن الـ route بيرجع 401 وبيخرج قبل أي تعديل في القاعدة.

الأخطاء الشائعة: تستخدم الـ API key بدل الـ HMAC secret من لوحة Paymob فكل الطلبات الحقيقية تطلع 401. أو تغيّر ترتيب الحقول أو تنسى [[order.id]] المتداخل. أو تقارن بـ [[===]] وتنسى إن الرد 200 لازم ميبقاش قبل التحقق.`,
          solCode: R`// sign.js: يحسب الـ hmac الصح لـ body تجربة (نفس خوارزمية verifyPaymob)
import { readFileSync } from "node:fs";
import crypto from "node:crypto";
const tx = JSON.parse(readFileSync(0, "utf8")).obj;
const fields = ["amount_cents","created_at","currency","error_occured","has_parent_transaction","id","integration_id","is_3d_secure","is_auth","is_capture","is_refunded","is_standalone_payment","is_voided","order.id","owner","pending","source_data.pan","source_data.sub_type","source_data.type","success"];
const get = (o, p) => p.split(".").reduce((a, k) => (a == null ? a : a[k]), o);
console.log(crypto.createHmac("sha512", process.env.PAYMOB_HMAC).update(fields.map((f) => String(get(tx, f))).join("")).digest("hex"));

// الترمنال
BODY='{"type":"TRANSACTION","obj":{"id":12345,"success":true,"amount_cents":10000,"order":{"id":777}}}'
H=$(echo "$BODY" | PAYMOB_HMAC=test-secret node sign.js)
curl -s -o /dev/null -w "%{http_code}\n" -X POST "http://localhost:3000/webhooks/paymob" -H "Content-Type: application/json" -d "$BODY"
curl -s -o /dev/null -w "%{http_code}\n" -X POST "http://localhost:3000/webhooks/paymob?hmac=abc" -H "Content-Type: application/json" -d "$BODY"
curl -s -o /dev/null -w "%{http_code}\n" -X POST "http://localhost:3000/webhooks/paymob?hmac=$H" -H "Content-Type: application/json" -d "$BODY"`
        },
        {
          cmd: "إعادة الإرسال والتكرار",
          title: "idempotency",
          desc: "البوابة بتعيد إرسال الـ webhook لو سيرفرك مردّش بـ 200 في ثواني. فنفس الدفعة ممكن توصلك ٣ مرات. الحل: رد 200 بسرعة، واعمل الشغل بعدين، وسجّل id الدفعة عشان متنفّذش مرتين.",
          example: R`app.post("/webhooks/paymob", async (req, res) => {
  const tx = req.body.obj;
  if (!verifyPaymob(tx, req.query.hmac, process.env.PAYMOB_HMAC)) {
    return res.status(401).end();
  }
  res.status(200).end();
  const seen = await db.payment.findUnique({ where: { gatewayId: String(tx.id) } });
  if (seen) return;
  await db.payment.create({ data: { gatewayId: String(tx.id), amount: tx.amount_cents, ok: tx.success } });
  if (tx.success) await activateOrder(tx.order.id);
});`,
          try: "من لوحة ngrok (localhost:4040) اعمل Replay لنفس الطلب ٣ مرات واتأكد إن الطلب اتفعّل مرة واحدة.",
          flag: "script",
          deep: {
            why: "البوابة مش بتبعت مرة واحدة. لو سيرفرك تأخر في الرد أو رد بـ 500، بتعيد بعد دقيقة، وبعد ٥، وبعد ساعة. فلو الكود بيفعّل الطلب مع كل webhook، العميل بيتفعّله ٣ مرات، أو بيتسجّل ٣ دفعات.",
            how: R`الترتيب في الـ handler مقصود: التحقق من التوقيع الأول، وبعدين [[res.status(200).end()]] فورًا قبل أي شغل تقيل. البوابة بتعتبر 200 «استلمت»، ومش هتعيد. لو استنيت لحد ما تكتب في القاعدة وتبعت إيميل، ممكن تعدّي مهلتهم (ثواني قليلة) ويعيدوا.

بعد الرد، الشغل بيكمّل في نفس الـ handler (Express بيسمح بكده). في الأنظمة الأكبر، بيتحط في queue.

الـ idempotency: كل معاملة ليها [[id]] فريد من البوابة. قبل ما تعمل أي حاجة، دوّر عليه في جدول payments. لو موجود، ده تكرار، اطلع. لو لأ، سجّله وكمّل. الجدول ده هو الحماية من التكرار وهو كمان سجل كامل للدفعات.

و [[gatewayId]] لازم يبقى unique في الـ schema، عشان لو webhookين وصلوا في نفس اللحظة، القاعدة ترفض التاني.

[[tx.success]] بيتفحص بعد التسجيل: الدفعات الفاشلة كمان بتتسجّل، مفيدة في الدعم.`,
            when: "كل webhook handler. والفكرة نفسها لأي عملية ممكن تتكرر: إيميلات، وتفعيل اشتراكات.",
            mistakes: "الشغل قبل الرد فتعدّي المهلة. والتحقق من التكرار بالـ order id بدل transaction id، فمحاولة دفع تانية لنفس الطلب تتعتبر تكرار."
          },
          lines: [
            "مسار الـ webhook.",
            "بيانات المعاملة.",
            "لو التوقيع غلط (Paymob بتبعته في query string)...",
            "...ارفض من غير أي شغل.",
            "قفلة.",
            "رد 200 فورًا عشان ميعيدوش، والشغل بعدين.",
            "دوّرنا على المعاملة دي قبل كده؟",
            "لو أيوه، تكرار، خلاص.",
            "سجّلها (gatewayId لازم unique في الـ schema).",
            "لو نجحت، فعّل الطلب.",
            "قفلة."
          ],
          sol: R`بعد الطلب الأصلي و ٣ Replay من [[localhost:4040]]: كلهم بيرجعوا [[200]] (ودا المطلوب، عشان Paymob يبطّل يعيد)، بس التفعيل حصل مرة واحدة. في تجربتي بنفس الـ id طبع [[activate order 777]] أول مرة، وبعدين [[duplicate 12345]] في كل مرة بعدها، وجدول [[payment]] فيه صف واحد بـ [[gatewayId = "12345"]].

لو الطلب اتفعّل كذا مرة: الـ [[findUnique]] بيدوّر على حقل تاني، أو [[gatewayId]] مش متخزن كنص فالمقارنة فشلت. ولو Replay رجّع 401: ngrok بيعيد نفس الـ URL بالـ query، فغالبًا الـ secret اتغير أو الطلب الأصلي كان 401 أصلًا.

وفيه حالة الـ Replay مش بتمسكها: طلبين في نفس اللحظة، الاتنين يعملوا findUnique قبل ما أي واحد يعمل create. الحماية الحقيقية [[@unique]] على [[gatewayId]] في الـ schema، فالتاني يقع بـ P2002 وتتجاهله.`
        },
        {
          cmd: "لوج الـ webhooks",
          title: "سجّل كل حاجة توصل",
          desc: "لما عميل يقول «دفعت والطلب متفعّلش»، محتاج تعرف الـ webhook وصل أصلًا ولا لأ، وبإيه. سجّل الـ body الخام والـ headers والوقت قبل أي معالجة، في جدول أو ملف.",
          example: R`tail -f logs/webhooks.log | jq .
grep '"id":12345' logs/webhooks.log | jq .
curl -s localhost:4040/api/requests/http | jq '.requests[] | {uri, status: .response.status}'`,
          try: "سجّل كل webhook في ملف JSON lines، وبعدين استخدم jq تلاقي دفعة معينة بالـ id.",
          deep: {
            why: "«دفعت والاشتراك متفعّلش» أصعب شكوى تحلها لو مش عندك سجل. وصل webhook أصلًا؟ بإيه؟ التوقيع فشل؟ من غير لوج بتخمّن.",
            how: R`السجل بيتكتب قبل أي معالجة: الوقت، والمسار، والـ headers المهمة، والـ body الخام كامل، ورقم الرد اللي رجعته. لو التوقيع فشل، بيتسجّل إنه فشل. وده غير جدول payments اللي بيتكتب بعد التحقق.

الصيغة الأنسب JSON lines: سطر لكل حدث، كل سطر JSON كامل. [[tail -f | jq .]] بيعرضه منسّق لايف، و [[grep]] بيلاقي دفعة بالـ id وبعدين jq بيفكّها. وفي الإنتاج نفس الفكرة بجدول webhook_events في القاعدة.

في التطوير، لوحة ngrok هي اللوج: الـ API بتاعتها على 4040 بترجع كل الطلبات، والأمر في المثال بيلخّصها: المسار والـ status اللي رجّعته لكل طلب. أي 4xx أو 5xx هناك هو المشكلة.

والاحتفاظ: ٩٠ يوم على الأقل، لأن نزاعات الدفع بتتفتح بعد أسابيع.`,
            when: "من أول webhook في أي مشروع. مش بعد أول شكوى.",
            mistakes: "تسجّل الـ body بعد ما تعدّل فيه. وتسجّل في console.log بس على سيرفر لوجاته بتتدور كل يوم."
          },
          lines: [
            "تابع اللوج لايف منسّق.",
            "لاقي دفعة بالـ id.",
            "من لوحة ngrok: كل الطلبات ومساراتها والرد اللي رجّعته."
          ],
          sol: R`الحل: سطر [[appendFile("logs/webhooks.log", JSON.stringify({...}) + "\n")]] في أول الـ route قبل أي تحقق، فكل طلب، حتى المرفوض، بيتسجل. في تجربتي ٥ طلبات بنفس الـ id طلّعوا ٥ سطور، و [[grep '"id":12345' logs/webhooks.log | jq .]] بيعرضهم كـ JSON منسّق:

[[{ "at": "2026-09-30T07:55:59.070Z", "id": 12345, "success": true, "hmacOk": false }]] (الأولين كانوا من غير hmac صح) وبعدهم [[hmacOk: true]].

خلي بالك: [[grep '"id":12345']] بيعتمد على إن [[JSON.stringify]] بيكتب من غير مسافات؛ لو كتبت اللوج بإيدك بشكل تاني الـ grep مش هيلاقي. الأدق [[jq 'select(.id == 12345)' logs/webhooks.log]]. ومتسجلش بيانات كارت أو الـ hmac الكامل في اللوج، وحط اللوج في [[.gitignore]].`,
          solCode: R`import { appendFile } from "node:fs/promises";

app.post("/webhooks/paymob", async (req, res) => {
  const tx = req.body.obj;
  const hmacOk = verifyPaymob(tx, req.query.hmac, process.env.PAYMOB_HMAC);
  await appendFile("logs/webhooks.log",
    JSON.stringify({ at: new Date().toISOString(), id: tx?.id, success: tx?.success, hmacOk }) + "\n");
  if (!hmacOk) return res.status(401).end();
  res.status(200).end();
});

// jq 'select(.id == 12345)' logs/webhooks.log`
        },
        {
          cmd: "webhook تيليجرام",
          title: "سجّل عنوان البوت عند تيليجرام وتابعه",
          desc: R`بوت تيليجرام يا بيسأل كل شوية عن رسايل جديدة (polling)، يا تيليجرام بيبعتله كل رسالة على URL (webhook). [[setWebhook]] بيسجّل الـ URL ومعاه [[secret_token]] بيرجع في header مع كل طلب، و [[getWebhookInfo]] بيقولك في رسايل متراكمة ولا لأ، وآخر خطأ حصل.`,
          example: R`source .env
curl -sS "https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/setWebhook" -d "url=https://example.com/telegram/webhook" -d "secret_token=$WEBHOOK_SECRET"
curl -sS "https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/getWebhookInfo" | jq .result
curl -sS "https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/deleteWebhook?drop_pending_updates=true"`,
          try: "اعمل بوت تجربة من BotFather، وسجّل له webhook على URL من ngrok، وابعت له رسالة، وبعدين [[getWebhookInfo]] وشوف pending_update_count.",
          deep: {
            why: "البوت مبيردش، ومش عارف المشكلة فين: الـ URL متسجّلش؟ تيليجرام بيبعت وسيرفرك بيرد بخطأ؟ الشهادة؟ getWebhookInfo بيجاوب في سطر.",
            how: R`[[setWebhook]] بيقول لتيليجرام «ابعت كل update على الـ URL ده». الـ URL لازم HTTPS بشهادة سليمة، وعلى بورت من 443 أو 80 أو 88 أو 8443 بس. في التطوير URL الـ tunnel بيمشي.

[[secret_token]] قيمة انت بتختارها، وتيليجرام بيبعتها في header اسمه [[X-Telegram-Bot-Api-Secret-Token]] مع كل طلب. سيرفرك يقارنها ويرفض أي طلب من غيرها، نفس فكرة توقيع Paymob.

[[getWebhookInfo]] فيه: [[url]] المتسجّل، و [[pending_update_count]] عدد الرسايل اللي مستنية (لو بيزيد، سيرفرك مش بيرد 200)، و [[last_error_message]] و [[last_error_date]] آخر مرة فشل وليه.

الـ webhook والـ polling ميشتغلوش مع بعض: طول ما فيه webhook، [[getUpdates]] بيرجع خطأ 409. [[deleteWebhook]] بيرجّعك للـ polling، و [[drop_pending_updates]] بيرمي الرسايل المتراكمة عشان البوت ميردش على رسايل من إمبارح.

[[source .env]] عشان التوكن ميتكتبش في الأمر نفسه ويفضل في الـ history.`,
            when: "بعد كل deploy بيغيّر الدومين أو المسار. وأول حاجة لما البوت يسكت.",
            mistakes: "تسجّل URL الـ tunnel وتقفل الترمنال، فتيليجرام يفضل يبعت لعنوان ميت والرسايل تتراكم. وتشغّل نسخة polling على جهازك والـ webhook متسجّل للسيرفر، فتاخد 409. وسيرفرك بيرد 500 على update معين، فتيليجرام يفضل يعيده ويوقف اللي وراه."
          },
          lines: [
            "حمّل التوكن والسر من .env من غير ما تكتبهم في الأمر.",
            "سجّل الـ URL والسر اللي هيرجع في header مع كل طلب.",
            "الحالة: الـ URL، والرسايل المتراكمة، وآخر خطأ.",
            "شيل الـ webhook (ارجع لـ polling) وارمي الرسايل القديمة."
          ],
          sol: R`[[setWebhook]] بيرد [[{"ok":true,"result":true,"description":"Webhook was set"}]]. ولما تبعت رسالة للبوت، سيرفرك بيستقبل POST فيه [[message.text]]، وتيليجرام بيبعت header [[X-Telegram-Bot-Api-Secret-Token]] بنفس الـ [[secret_token]].

[[getWebhookInfo | jq .result]] لو كله تمام: [[url]] بالرابط بتاعك، و [[pending_update_count: 0]]، ومفيش [[last_error_message]]. لو سيرفرك واقع أو رجّع حاجة غير 200: الرقم بيزيد مع كل رسالة، ويظهر [[last_error_date]] و [[last_error_message]] زي [[Wrong response from the webhook: 401 Unauthorized]] أو [[Connection refused]] أو [[502 Bad Gateway]] (لو ngrok وقف).

وخلي بالك إن ngrok المجاني بيغيّر الـ URL كل مرة، فلازم [[setWebhook]] تاني. و [[deleteWebhook?drop_pending_updates=true]] بيمسح الرسايل المتراكمة عشان البوت ما يرّدش على كل حاجة قديمة مرة واحدة.`
        }
      ]
    }
]);
