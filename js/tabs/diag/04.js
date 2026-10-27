// ملف إضافي لتاب diag: الحقول نفس شكلها في 01.js.

MORE("diag", [
    {
      t: "جوه البروسس: أدوات أعمق",
      l: 3,
      n: "اللوج ساكت والعطل لسه موجود: تشوف البروسس بيعمل إيه مع النظام، وأنهي function واكلة المعالج، ومين ماسك الذاكرة والملفات، وexit code بيقولك إيه",
      items: [
        {
          cmd: "strace",
          title: "البرنامج بيعمل إيه مع النظام بالظبط",
          desc: R`[[strace]] بيعرض كل طلب البرنامج بيطلبه من الكيرنل (system call): كل ملف بيفتحه، وكل اتصال بيعمله، والنتيجة. لما البرنامج يفشل من غير رسالة واضحة، أو يعلّق ومش عارف مستني إيه، [[strace]] بيقولك: [[EACCES]] على ملف الإعدادات، أو مستني قفل ماسكه بروسس تاني.

لينكس بس. على الماك فيه [[dtruss]] (من docs Apple)، وعلى ويندوز Process Monitor من Sysinternals.`,
          example: R`# Linux (and WSL):
strace -f -Z -e trace=%file -o /tmp/files.txt node server.js
grep -E "EACCES|EPERM" /tmp/files.txt
strace -f -e trace=connect node server.js
ps -eo pid,etime,args | grep [f]lock
sudo strace -p 444
cat /proc/locks
sudo ls -l /proc/444/fd`,
          try: R`اعمل ملف إعدادات بصلاحية 600 لـ root، وشغّل برنامج كيوزر عادي بيقراه وبيكمّل بالإعدادات الافتراضية لو فشل. شوف [[strace -f -Z -e trace=%file]] بيقول إيه. وبعدين شغّل [[flock /tmp/deploy.lock sleep 300 &]] ووراه [[flock /tmp/deploy.lock echo deployed &]]، واعرف التاني مستني إيه.`,
          deep: {
            why: R`أصعب الأعطال: التطبيق قايم بإعدادات غلط ومفيش error، أو سكربت الـ deploy واقف ساعة ومش بيطبع حاجة. اللوج مش هيساعدك لأن الكود نفسه مش عارف. بس أي حاجة البرنامج بيعملها (يفتح ملف، يتصل، يستنى) لازم تعدّي على الكيرنل، و [[strace]] بيقف في النص ويكتبها.`,
            how: R`[[-f]] تابع كل الـ threads والعمليات اللي البرنامج بيعملها (Node عنده كذا thread). [[-e trace=%file]] الـ system calls اللي ليها علاقة بملفات بس (open و stat و access...). [[-Z]] اللي فشلت بس. [[-o]] اكتب في ملف بدل الشاشة.

[[-e trace=connect]] الاتصالات بس: هتشوف IP والبورت الحقيقيين اللي التطبيق بيتصل بيهم، مش اللي انت فاكره في الإعدادات.

[[strace -p PID]] بيتشبك على بروسس شغال. لو واقف عند [[flock(3, LOCK_EX]] يبقى مستني قفل، عند [[read(]] مستني input، عند [[connect(]] مستني سيرفر مبيردش.

[[/proc/locks]] كل الأقفال في النظام ومين ماسكها. و [[/proc/PID/fd]] كل الملفات اللي البروسس فاتحها بأرقامها، فرقم 3 في [[flock(3]] تعرف هو أنهي ملف.`,
            when: R`برنامج بيتجاهل ملف الإعدادات، أو بيتصل بمكان غلط، أو معلّق ومش بيطبع حاجة. وقبل ما تقول «الكود مش بيقرا الملف» اتأكد هو بيدوّر فيه فين.`,
            mistakes: R`تشغّل [[strace]] على بروسس في الإنتاج عليه ضغط وتسيبه: بيبطّأ البرنامج جامد (كل system call بتقف مرتين). استخدمه دقيقة واقفل. وتنسى [[-f]] فمتشوفش حاجة لأن الشغل بيحصل في thread تاني. وجوه Docker [[strace -p]] محتاج [[--cap-add SYS_PTRACE]].`
          },
          teach: R`## الفكرة: كل حاجة بتعدّي على الكيرنل

البرنامج مش بيقدر يفتح ملف أو يتصل بالشبكة لوحده. بيطلب من الكيرنل، والطلب ده اسمه **system call** (اختصار syscall). [[strace]] (system call trace) بيكتب كل طلب ونتيجته.

المعمل: container من [[node:24-alpine]] (Node v24.22.1) و strace 6.19 من apk. البرنامج [[server.js]] بيدوّر على الإعدادات في [[/etc/shop/config.json]] ثم [[./config.json]]، ولو الاتنين فشلوا **بيكمّل بالقيم الافتراضية من غير ما يقول**، والافتراضي القاعدة على [[127.0.0.1]]. والملف موجود فعلًا (فيه [[10.0.0.5]])، بس صلاحيته [[600]] لـ root، والبرنامج شغال كيوزر [[node]].

~~~text الناتج من غير strace
connecting to database...
db failed: ECONNREFUSED
~~~

مفيش أي كلمة عن الإعدادات.

---

## ١. [[strace -f -Z -e trace=%file -o /tmp/files.txt node server.js]]

| الحتة | معناها |
|---|---|
| [[-f]] | follow: تابع كل thread وكل عملية البرنامج يعملها |
| [[-Z]] | اعرض الـ syscalls اللي **فشلت** بس |
| [[-e trace=%file]] | الـ syscalls اللي بتاخد اسم ملف بس ([[%file]] مجموعة جاهزة) |
| [[-o /tmp/files.txt]] | اكتب في ملف، عشان متتلخبطش مع output البرنامج |
| [[node server.js]] | البرنامج نفسه، strace بيشغّله |

الملف طلع فيه ١٦ سطر، أغلبهم مكتبات Node بيدوّر عليها في كذا مكان (طبيعي). وفيهم:

~~~text /tmp/files.txt
36    open("/work/package.json", O_RDONLY|O_LARGEFILE|O_CLOEXEC) = -1 ENOENT (No such file or directory)
36    open("/etc/shop/config.json", O_RDONLY|O_LARGEFILE|O_CLOEXEC) = -1 EACCES (Permission denied)
36    open("./config.json", O_RDONLY|O_LARGEFILE|O_CLOEXEC) = -1 ENOENT (No such file or directory)
~~~

نقرا السطر التاني:

| الحتة | معناها |
|---|---|
| [[36]] | رقم الـ thread اللي عمل الطلب |
| [[open("/etc/shop/config.json", ...)]] | افتح الملف ده |
| [[O_RDONLY]] | للقراية بس |
| [[= -1]] | فشل |
| [[EACCES (Permission denied)]] | السبب: مفيش صلاحية |

## ٢. [[grep -E "EACCES|EPERM" /tmp/files.txt]]

في برنامج كبير الملف ممكن يبقى آلاف السطور. [[EACCES]] و [[EPERM]] هما أخطاء الصلاحيات، و [[ENOENT]] الملف مش موجود:

~~~text الناتج
421   open("/etc/shop/config.json", O_RDONLY|O_LARGEFILE|O_CLOEXEC) = -1 EACCES (Permission denied)
~~~

السبب في سطر واحد: الملف موجود والبرنامج مش قادر يقراه. الحل [[chown]] أو [[chmod 640]] مع group البرنامج، مش تعديل الكود.

## ٣. [[strace -f -e trace=connect node server.js]]

نفس الفكرة للشبكة. [[connect]] هو الـ syscall اللي بيفتح اتصال:

~~~text الناتج
[pid   432] connect(18, {sa_family=AF_INET, sin_port=htons(5432), sin_addr=inet_addr("127.0.0.1")}, 16) = -1 EINPROGRESS (Operation in progress)
db failed: ECONNREFUSED
~~~

- [[18]] رقم الملف المفتوح (الـ socket).
- [[AF_INET]] يعني IPv4، و [[htons(5432)]] البورت، و [[inet_addr("127.0.0.1")]] العنوان.
- [[EINPROGRESS]] مش خطأ: Node بيفتح الاتصال من غير ما يستنى (non-blocking)، والنتيجة بتيجي بعدين (ECONNREFUSED).

التطبيق بيتصل بـ **127.0.0.1** مش **10.0.0.5**. يعني الإعدادات ماتقرتش، وده اللي الخطوة الأولى قالته.

---

## ٤. بروسس معلّق: [[ps -eo pid,etime,args | grep [f]lock]]

سيناريو تاني: سكربت deploy بيستخدم [[flock]] عشان مايشتغلش مرتين، ونسخة قديمة ماسكة القفل. عملت ده:

~~~bash
flock /tmp/deploy.lock sleep 300 &
flock /tmp/deploy.lock echo deployed &
~~~

التاني مش بيطبع حاجة ومش بيخلص. [[ps -eo pid,etime,args]]: [[-e]] كل العمليات، و [[-o]] الأعمدة: الرقم، والوقت من ساعة ما بدأت ([[etime]] = elapsed time)، والأمر كامل. و [[[f]lock]] حيلة: الـ regex ده بيطابق «flock» بس النص بتاعه نفسه مفيهوش «flock» متصلة، فـ grep مايطلعش نفسه.

~~~text الناتج
  440  0:02   flock /tmp/deploy.lock sleep 300
  444  0:01   flock /tmp/deploy.lock echo deployed
~~~

## ٥. [[sudo strace -p 444]]

[[-p]] اتشبك على بروسس شغال برقمه:

~~~text الناتج
strace: Process 444 attached
flock(3, LOCK_EX
~~~

السطر ناقص (مفيش [[)]] ولا نتيجة) لأن الـ syscall لسه **مخلصش**: البروسس مستني جوه [[flock]] على الملف رقم [[3]]، و [[LOCK_EX]] قفل exclusive (حد واحد بس). [[Ctrl+C]] بيفك strace والبروسس يكمل عادي.

> [[sudo]] لأن أوبونتو بيمنع اليوزر العادي يتشبك على بروسس مش ابنه (إعداد [[ptrace_scope]]، من docs الكيرنل). وجوه Docker محتاج [[--cap-add SYS_PTRACE]]: من غيره طلع [[attach: ptrace(PTRACE_SEIZE, 11): Operation not permitted]].

## ٦. [[cat /proc/locks]]: مين ماسك القفل

~~~text الناتج
7: FLOCK  ADVISORY  WRITE 440 00:70:252887 0 EOF
7: -> FLOCK  ADVISORY  WRITE 444 00:70:252887 0 EOF
~~~

| الحتة | معناها |
|---|---|
| [[FLOCK]] | نوع القفل (من [[flock]]) |
| [[WRITE]] | exclusive |
| [[440]] | البروسس اللي **ماسك** القفل |
| [[->]] و [[444]] | البروسس اللي **مستني** عليه |
| [[252887]] | رقم الـ inode بتاع الملف. [[ls -i /tmp/deploy.lock]] طلّع [[252887]] |

## ٧. [[sudo ls -l /proc/444/fd]]

~~~text الناتج
lr-x------ 1 root root 64 Oct 27 22:41 0 -> /dev/null
l-wx------ 1 root root 64 Oct 27 22:41 1 -> /tmp/out
l-wx------ 1 root root 64 Oct 27 22:41 2 -> pipe:[1170615]
lr-x------ 1 root root 64 Oct 27 22:41 3 -> /tmp/deploy.lock
~~~

كل ملف مفتوح ليه رقم (file descriptor). [[0]] و [[1]] و [[2]] الـ input والـ output والـ errors، والـ [[3]] هو اللي strace قال إنه مستني عليه: [[/tmp/deploy.lock]].

> لما قتلت [[flock]] رقم 440، القفل **فضل**: الـ [[sleep 300]] اللي هو شغّله ورث الملف المفتوح، وهو كمان ماسكه. اقتل الشجرة كلها (أو استنى الأمر يخلص)، مش الأب بس.

---

## الخلاصة

| السؤال | الأمر |
|---|---|
| بيدوّر على ملفاته فين وأنهي فشل؟ | [[strace -f -Z -e trace=%file]] |
| بيتصل بإيه فعلًا؟ | [[strace -f -e trace=connect]] |
| معلّق مستني إيه؟ | [[strace -p PID]] |
| مين ماسك القفل؟ | [[cat /proc/locks]] |
| رقم الـ fd ده أنهي ملف؟ | [[ls -l /proc/PID/fd]] |

- [[ENOENT]] مش موجود، [[EACCES]] و [[EPERM]] صلاحيات، [[ECONNREFUSED]] مفيش حد بيسمع.
- strace بيبطّأ البرنامج: دقيقة وتقفله.`,
          lines: [
            "شغّل البرنامج تحت strace: كل الـ threads، العمليات على الملفات اللي فشلت بس، والناتج في ملف.",
            "دوّر على أخطاء الصلاحيات في الناتج.",
            "شغّله تاني وشوف الاتصالات بس: بيتصل بأنهي IP وبورت فعلًا.",
            "البروسس المعلّق رقمه كام وبقاله قد إيه ([f] عشان grep مايطلعش نفسه).",
            "اتشبك على البروسس الشغال وشوف واقف في أنهي system call.",
            "كل الأقفال في النظام: مين ماسك ومين مستني.",
            "الملفات المفتوحة عند البروسس بأرقامها، عشان تعرف رقم 3 ده إيه."
          ],
          sol: R`الملف فيه [[open("/etc/shop/config.json", ...) = -1 EACCES (Permission denied)]] وبعده [[open("./config.json", ...) = -1 ENOENT]]: البرنامج لقى ملفه ومقدرش يقراه، وكمّل بالافتراضي. و [[trace=connect]] بيأكد: بيتصل بـ [[127.0.0.1]] على 5432 مش بالعنوان اللي في الملف. الحل صلاحية القراية للملف (و الكود المفروض يطبع تحذير لما يفشل يقرا الإعدادات).

وفي حالة الـ flock: [[strace -p]] واقف على [[flock(3, LOCK_EX]]، و [[/proc/locks]] بيقول مين الماسك ([[FLOCK ADVISORY WRITE 440]]) ومين المستني ([[-> ... 444]]). وقتل 440 بس مش كفاية لو ابنه (sleep) لسه فاتح الملف.`
        },
        {
          cmd: "node --cpu-prof",
          title: "أنهي function بالظبط واكلة المعالج",
          desc: R`[[top]] قالك إن node واكل ١٠٠٪ (درس «المعالج 100٪»)، بس مين جوه الكود؟ [[node --cpu-prof]] بيسجّل وقت كل function وانت بتعيد المشكلة، ويكتب ملف [[.cpuprofile]] تفتحه في Chrome DevTools أو VS Code، أو تلخصه بسكربت صغير في الترمنال. وبيشتغل نفس الشكل على لينكس وويندوز والماك.`,
          example: R`# Linux (and WSL):
node --cpu-prof --cpu-prof-dir=./prof server.js &
curl -s -w "%{time_total}s\n" http://127.0.0.1:3000/report
kill -INT 516
ls -l prof/
node top-funcs.js prof/*.cpuprofile
# Windows (PowerShell):
node --cpu-prof --cpu-prof-dir=prof server.js
curl.exe -s http://127.0.0.1:3000/report
node top-funcs.js (Get-ChildItem prof\*.cpuprofile)[0].FullName`,
          try: R`اعمل endpoint بيشيل التكرار من ٢٠ ألف إيميل بـ [[filter]] و [[indexOf]]، وشغّل السيرفر بـ [[--cpu-prof]]، واطلبه ٣ مرات، واقفله بـ SIGINT. لخّص الملف بسكربت الحل، وبعدين بدّل الـ dedupe بـ [[new Set]] وقيس الوقت تاني.`,
          deep: {
            why: R`«التطبيق بياكل CPU» مش تشخيص. ممكن تقرا الكود ساعة وتخمّن، أو تخلي Node يقولك: ٩٩٪ من الوقت في السطر ٦. الـ profiler بيقيس مش بيخمّن، وغالبًا السبب حاجة مكنتش هتشك فيها.`,
            how: R`[[--cpu-prof]] بيشغّل الـ sampling profiler بتاع V8: كل حوالي ملّي ثانية بيبص Node واقف في أنهي function ويعدّ. اللي ليها عينات أكتر هي اللي واكلة الوقت. و [[--cpu-prof-dir]] فين يكتب الملف.

الملف بيتكتب **لما البروسس يخلص بشكل طبيعي** (process.exit أو انتهاء الكود). Ctrl+C أو [[kill -INT]] من غير handler بيقفل Node من غير ما يكتب حاجة، فالسيرفر محتاج سطر [[process.on('SIGINT', () => process.exit(0))]].

الملف JSON: [[nodes]] (كل function ومكانها و [[hitCount]] عدد العينات) و [[samples]] و [[startTime]]/[[endTime]]. افتحه في Chrome DevTools (تبويب Performance ثم Load profile) أو VS Code (بيفتح [[.cpuprofile]] لوحده) وشوف الـ Bottom-Up أو flame chart، أو لخّصه بالسكربت اللي في الحل.

[[(anonymous)]] معناها arrow function أو callback مالهاش اسم، والسطر بيقولك هي فين.`,
            when: R`CPU عالي ومش عارف السبب، أو endpoint بطيء والقاعدة سريعة (درس «الموقع بطيء مش واقع»). وفي الـ staging أو على نسخة واحدة، لأن الـ profiler بيزوّد الحمل شوية.`,
            mistakes: R`تشغّل الـ profiler وتقفل بـ Ctrl+C من غير handler فمتلاقيش ملف. وتسيبه شغال ساعة فالملف يبقى ضخم وأغلبه [[(idle)]]. وتصلّح function بتاخد ١٪ من الوقت عشان «شكلها بطيئة».`
          },
          teach: R`## الفكرة: Node يعدّ هو واقف فين

المعمل: container من [[node:24-alpine]] (Node v24.22.1). [[server.js]] فيه ٢٠ ألف يوزر، و [[/report]] بيطلع الإيميلات من غير تكرار بالطريقة اللي بتتكتب كتير:

~~~js server.js
const http = require('http');

const users = Array.from({ length: 20000 }, (_, i) => ({ id: i, email: 'user' + (i % 15000) + '@shop.test' }));

function uniqueEmails(list) {
  return list.map(u => u.email).filter((e, i, all) => all.indexOf(e) === i);
}

http.createServer((req, res) => {
  if (req.url === '/report') {
    const emails = uniqueEmails(users);
    return res.end('unique=' + emails.length + '\n');
  }
  res.end('ok\n');
}).listen(3000, () => console.log('listening, pid', process.pid));

process.on('SIGINT', () => process.exit(0));
~~~

- [[Array.from({ length: 20000 }, ...)]]: مصفوفة ٢٠ ألف عنصر. و [[i % 15000]] باقي القسمة، فالإيميلات بتتكرر بعد ١٥ ألف.
- السطر ٦: [[filter]] بيلف على كل إيميل، و [[indexOf]] **جواه** بيلف على المصفوفة من الأول عشان يشوف أول مكان للإيميل. ٢٠ ألف × لحد ٢٠ ألف = مئات الملايين من المقارنات.
- السطر الأخير: من غيره [[kill -INT]] بيقفل Node فورًا ومن غير ما يكتب الـ profile. جربت [[--cpu-prof]] على برنامج من غير handler وبعت SIGINT ومرة SIGTERM: الفولدر مااتعملش خالص في المرتين.

---

## ١. [[node --cpu-prof --cpu-prof-dir=./prof server.js &]]

- [[--cpu-prof]]: سجّل profile للمعالج طول ما البرنامج شغال.
- [[--cpu-prof-dir=./prof]]: اكتب الملف في فولدر [[prof]].
- [[&]]: شغّله في الخلفية عشان نكمل في نفس الترمنال.

~~~text الناتج
listening, pid 516
~~~

## ٢. [[curl -s -w "%{time_total}s\n" http://127.0.0.1:3000/report]]

طلبته ٣ مرات:

~~~text الناتج
unique=15000
2.925756s
unique=15000
2.094576s
unique=15000
2.054663s
~~~

ثانيتين للطلب الواحد، وطول الثانيتين دول السيرفر كله واقف (Node بينفذ كود JavaScript واحد في المرة).

## ٣. [[kill -INT 516]]

[[-INT]] = SIGINT، نفس اللي Ctrl+C بيبعته. الـ handler بيعمل [[process.exit(0)]] و Node يكتب الملف.

## ٤. [[ls -l prof/]]

~~~text الناتج
-rw------- 1 root root 92300 Oct 27 22:42 CPU.20261027.224219.516.0.001.cpuprofile
~~~

الاسم فيه التاريخ والساعة ورقم البروسس (516).

## ٥. [[node top-funcs.js prof/*.cpuprofile]]

سكربت صغير (في الحل) بيحسب وقت كل function لوحدها (self time) ويرتّبهم:

~~~text الناتج
  7061 ms  98.8%  (anonymous) server-cpu.js:6
    20 ms   0.3%  uniqueEmails server-cpu.js:5
    10 ms   0.1%  (garbage collector) :0
     6 ms   0.1%  compileForInternalLoader realm:383
     2 ms   0.0%  (program) :0
~~~

(اسم الملف في المعمل كان [[server-cpu.js]].)

- **٩٨.٨٪** من وقت المعالج في [[(anonymous)]] على **السطر ٦**: الـ arrow function اللي جوه [[filter]]. و [[indexOf]] جزء منها.
- [[uniqueEmails]] نفسها ٢٠ ملّي ثانية بس: الـ [[map]]. المشكلة مش «الـ function»، المشكلة الـ callback اللي جواها.
- [[(garbage collector)]] تنضيف الذاكرة. لو كان هو الأول، المشكلة objects كتير بتتعمل وتترمي.

### التصليح والقياس

بدّلت السطر ٦ بـ [[return [...new Set(list.map(u => u.email))];]]. الـ [[Set]] بيشيل التكرار وهو بيضيف (كل إضافة تقريبًا خطوة واحدة):

~~~text الناتج
unique=15000
0.018098s
unique=15000
0.003914s
unique=15000
0.003757s
~~~

من ٢ ثانية لـ ٤ ملّي ثانية: حوالي ٥٠٠ مرة أسرع، ونفس النتيجة ([[unique=15000]]).

---

## ٦. ويندوز

نفس الأوامر بالظبط: [[node --cpu-prof --cpu-prof-dir=prof server.js]] في PowerShell، و [[curl.exe]] (مش [[curl]] لوحده، لأنه في Windows PowerShell 5.1 اسم تاني لـ [[Invoke-WebRequest]])، وتقفل بـ Ctrl+C في نفس الترمنال (Node بيحوّلها SIGINT على ويندوز، من docs Node). مفيش [[kill -INT]] على ويندوز: [[Stop-Process]] بيقفل البروسس فورًا من غير ما يكتب الملف.

جربت على ويندوز ١١ بـ Node v24.22.1 نفس الـ dedupe في سكربت بيخلص لوحده، والملف اتكتب في [[prof]]، و [[top-funcs.js]] طلّع:

~~~text الناتج (pwsh)
   5107 ms  99.7%  (anonymous) [eval]:1
      7 ms   0.1%  uniqueEmails [eval]:1
~~~

و [[(Get-ChildItem prof\*.cpuprofile)[0].FullName]]: هات الملفات اللي آخرها [[.cpuprofile]]، وخد أول واحد ([[[0]]])، ومساره الكامل ([[.FullName]]). PowerShell مش بيفك [[*]] للبرامج زي bash.

---

## الخلاصة

| الخطوة | ليه |
|---|---|
| [[--cpu-prof --cpu-prof-dir]] | سجّل وانت بتعيد المشكلة |
| handler لـ SIGINT | من غيره مفيش ملف |
| أعلى self time | ده اللي يتصلّح، مش اللي «شكله بطيء» |
| [[(anonymous) file:line]] | callback من غير اسم، السطر بيقولك فين |
| قيس بعد التصليح | بنفس الطلب ونفس الأداة |`,
          lines: [
            "لينكس: شغّل السيرفر وهو بيسجّل profile للمعالج في فولدر prof، في الخلفية.",
            "لينكس: اطلب الـ endpoint البطيء واطبع وقته (كرره كذا مرة).",
            "لينكس: ابعت SIGINT للبروسس برقمه (اللي طبعه وهو بيقوم)، فالـ handler يعمل exit والملف يتكتب.",
            "لينكس: الملف اتكتب؟ اسمه فيه التاريخ ورقم البروسس.",
            "لينكس: لخّص الملف: أتقل functions بالـ self time.",
            "ويندوز: نفس التشغيل، وبعد الطلبات Ctrl+C في نفس الترمنال.",
            "ويندوز: curl.exe عشان متاخدش Invoke-WebRequest.",
            "ويندوز: نفس السكربت، والمسار الكامل لأول ملف .cpuprofile في الفولدر."
          ],
          sol: R`الطلب أخد حوالي ثانيتين، والملخص طلّع حوالي ٩٩٪ في [[(anonymous) server.js:6]]: الـ callback بتاع [[filter]] اللي فيه [[indexOf]]. بعد [[new Set]] نفس الطلب بقى حوالي ٤ ملّي ثانية.

السكربت اللي بيلخّص الملف (بيشتغل على أي نظام):`,
          solCode: R`// top-funcs.js: node top-funcs.js file.cpuprofile
const fs = require('fs');
const p = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
const ms = (p.endTime - p.startTime) / p.samples.length / 1000;
const self = {};
for (const n of p.nodes) {
  const f = n.callFrame;
  const name = (f.functionName || '(anonymous)') + ' ' + f.url.split('/').pop() + ':' + (f.lineNumber + 1);
  self[name] = (self[name] || 0) + (n.hitCount || 0) * ms;
}
delete self['(idle) :0'];
const total = Object.values(self).reduce((a, b) => a + b, 0);
Object.entries(self).sort((a, b) => b[1] - a[1]).slice(0, 5).forEach(([name, t]) =>
  console.log(t.toFixed(0).padStart(6) + ' ms ' + (t / total * 100).toFixed(1).padStart(5) + '%  ' + name));`
        },
        {
          cmd: "leak في الذاكرة",
          title: "الرام بتزيد مع الوقت ومش بتنزل",
          desc: R`memory leak: التطبيق بيحتفظ بحاجات مش محتاجها (cache من غير حد، listeners بتتضاف كل طلب)، فالرام بتكبر لحد ما الـ OOM killer يقتله (درس «الرام خلصت»). الطريقة: اتأكد إنها بتكبر فعلًا، وخد heap snapshot مرتين بينهم ضغط، وقارن: الحاجة اللي عددها زاد بالآلاف هي الـ leak.`,
          example: R`node --heapsnapshot-signal=SIGUSR2 leak.js &
grep VmRSS /proc/559/status
for i in $(seq 1 2000); do curl -s -o /dev/null "http://127.0.0.1:3000/prices?ts=$i"; done
kill -USR2 559
for i in $(seq 2001 12000); do curl -s -o /dev/null "http://127.0.0.1:3000/prices?ts=$i"; done
kill -USR2 559
node heap-diff.js Heap.*.001.heapsnapshot Heap.*.002.heapsnapshot`,
          try: R`اعمل سيرفر بيخزن رد كل URL في [[Map]] من غير حد، واضربه بـ URLs فيها [[?ts=]] مختلف كل مرة. قيس [[VmRSS]] قبل وبعد، وخد snapshot بعد ٢٠٠٠ طلب وبعد ١٢٠٠٠، وقارن بسكربت الحل أو في Chrome DevTools (Memory ثم Comparison).`,
          deep: {
            why: R`الـ leak مش بيوقع التطبيق النهارده. بيوقعه بعد ٣ أيام الساعة ٣ الفجر، و restart «بيصلّحه» فالكل بينسى، ويرجع تاني. ومعرفتك إن الرام بتزيد مش بتقولك **إيه** اللي بيزيد. الـ snapshot بيقولك: الـ objects دي، من الـ class دي.`,
            how: R`[[VmRSS]] في [[/proc/PID/status]]: الرام الحقيقية اللي البروسس واخدها. بتزيد وبتنزل طبيعي، المهم الاتجاه بعد ضغط كتير.

[[--heapsnapshot-signal=SIGUSR2]]: لما يوصل البروسس SIGUSR2 يكتب صورة كاملة للـ heap في ملف [[Heap.....heapsnapshot]] في الفولدر الحالي، وبيعمل garbage collection قبلها، فاللي في الصورة هو اللي **لسه حد ماسكه** فعلًا. على ويندوز مفيش SIGUSR2، فمن جوه الكود [[require('v8').writeHeapSnapshot()]] (درس «الذاكرة» في تاب Node).

المقارنة: snapshot بعد ما التطبيق يسخن، وواحدة بعد ضغط كتير. اللي عدده زاد بنفس نسبة الطلبات هو الـ leak. في DevTools: Memory، Load، واختار التانية و Comparison مع الأولى، ورتّب بـ [[# Delta]]، ودوس على الـ class وشوف Retainers (مين ماسكه). أو سكربت الحل في الترمنال.

الـ snapshot بيوقف التطبيق لحد ما يخلص (ثواني على heap كبير) وبيحتاج رام زيادة قد الـ heap تقريبًا. فمتاخدهوش على سيرفر في الإنتاج قرب حد الرام.`,
            when: R`[[docker stats]] أو المراقبة بتوري الرام بتطلع على شكل سلّم ومش بتنزل، أو restart كل كام يوم بسبب 137.`,
            mistakes: R`تفتكر إن أي زيادة leak: Node بيستخدم رام زيادة لحد ما يحتاج ينضّف، ده طبيعي. الـ leak هو اللي بيزيد مع **عدد الطلبات** وبيفضل بعد الـ GC. وتكبّر [[--max-old-space-size]] بدل ما تلاقي السبب: كده بتأجّل الوقعة بس.`
          },
          teach: R`## الفكرة: صورتين للذاكرة والفرق بينهم هو الـ leak

المعمل: container من [[node:24-alpine]] (Node v24.22.1). التطبيق فيه cache بيحفظ نتيجة لكل URL، ومفيش حد ولا مسح:

~~~js leak.js
const http = require('http');

const cache = new Map();

class PriceResult {
  constructor(url) {
    this.url = url;
    this.rows = Array.from({ length: 50 }, (_, i) => ({ sku: i, price: i * 10 }));
  }
}

http.createServer((req, res) => {
  if (!cache.has(req.url)) cache.set(req.url, new PriceResult(req.url));
  res.end('rows=' + cache.get(req.url).rows.length + '\n');
}).listen(3000, () => console.log('pid', process.pid));
~~~

- [[new Map()]]: جدول مفتاح وقيمة، والمفتاح هنا الـ URL **بالـ query string**.
- كل [[PriceResult]] فيه ٥٠ object صغير.
- المشكلة: [[/prices?ts=1]] و [[/prices?ts=2]] مفتاحين مختلفين. الـ frontend بيضيف [[ts]] عشان «يكسر كاش المتصفح»، فكل طلب بيضيف entry جديد للأبد.

---

## ١. [[node --heapsnapshot-signal=SIGUSR2 leak.js &]]

شغّل التطبيق، ولما يوصله SIGUSR2 يكتب snapshot. طبع [[pid 559]].

## ٢. [[grep VmRSS /proc/559/status]]: الرام بتزيد؟

[[/proc/559/status]] ملف فيه حالة البروسس، و [[VmRSS]] (Resident Set Size) الرام الحقيقية اللي واخدها. قسته ٣ مرات: أول ما قام، وبعد ٢٠٠٠ طلب، وبعد ١٢٠٠٠:

~~~text الناتج
VmRSS:	   53660 kB
VmRSS:	   83848 kB
VmRSS:	  148200 kB
~~~

من ٥٣ ميجا لـ ١٤٨ ميجا، والطلبات كلها نفس الـ endpoint. الاتجاه واضح.

## ٣. الضغط: [[for i in $(seq 1 2000); do curl ... "?ts=$i"; done]]

[[seq 1 2000]] بيطلع الأرقام من ١ لـ ٢٠٠٠، و [[$i]] كل رقم، فكل طلب URL مختلف. [[-o /dev/null]] ارمي الرد.

## ٤. [[kill -USR2 559]] مرتين

مرة بعد ٢٠٠٠ طلب ومرة بعد ١٢٠٠٠:

~~~text ls -l *.heapsnapshot
-rw------- 1 root root 13835467 Oct 27 22:42 Heap.20261027.224257.559.0.001.heapsnapshot
-rw------- 1 root root 55101707 Oct 27 22:44 Heap.20261027.224404.559.0.002.heapsnapshot
~~~

الملف التاني ٥٥ ميجا قصاد ١٤: الـ heap كبر حتى بعد الـ GC اللي بيتعمل قبل الصورة. يعني الحاجات دي حد ماسكها.

## ٥. [[node heap-diff.js ...001... ...002...]]

السكربت (في الحل) بيعد الـ objects في كل صورة حسب اسم الـ constructor بتاعها، ويطبع الفرق:

~~~text الناتج
Object       + 500000 objects  +19.1 MB
PriceResult  +  10000 objects  +0.4 MB
Array        +  10001 objects  +0.3 MB
HTTPParser   +      1 objects  +0.0 MB
~~~

| السطر | معناه |
|---|---|
| [[PriceResult +10000]] | زاد **بالظبط** عدد الطلبات بين الصورتين (١٢٠٠٠ - ٢٠٠٠). ده المتهم |
| [[Object +500000]] | ١٠٠٠٠ × ٥٠ صف جوه كل واحد. ده الحجم الحقيقي (١٩ ميجا) |
| [[Array +10001]] | مصفوفة [[rows]] جوه كل واحد |

الـ class اللي ليها اسم بتسهّل القراية: لو كانت objects عادية كنت هتشوف [[Object]] بس. وفي Chrome DevTools نفس الأرقام في Comparison، ولما تدوس على [[PriceResult]] تحت في Retainers بيوريك مين ماسكه: الـ [[Map]] اللي اسمها [[cache]] في [[leak.js]].

---

## ٦. الحل

مش «امسح الكاش كل ساعة». الحل إن المفتاح ميبقاش فيه حاجة مالهاش لازمة ([[url.pathname]] بدل [[req.url]] كله)، وإن أي cache ليه حد: عدد أقصى ويمسح الأقدم (LRU)، أو وقت انتهاء. مكتبة [[lru-cache]] بتعمل ده.

الأسباب المشهورة غير الـ cache:

| السبب | الشكل في الـ snapshot |
|---|---|
| [[emitter.on(...)]] جوه كل طلب | [[Function]] أو [[(closure)]] بيزيدوا، و Node بيطبع [[MaxListenersExceededWarning]] |
| [[setInterval]] من غير [[clearInterval]] | [[Timeout]] بيزيد |
| array عالمي بتضيف فيه للوج أو الإحصائيات | [[Array]] واحد حجمه بيكبر |

---

## الخلاصة

1. اتأكد: [[VmRSS]] بيزيد مع عدد الطلبات ومش بينزل.
2. صورة بعد التسخين، وضغط، وصورة تانية.
3. اللي زاد بنفس عدد الطلبات هو الـ leak، و Retainers بيقولك مين ماسكه.
4. أي cache في الرام لازم يبقى ليه حد.`,
          lines: [
            "شغّل التطبيق، و SIGUSR2 يخليه يكتب heap snapshot.",
            "الرام الحقيقية اللي البروسس واخدها دلوقتي (رقم 559 اللي طبعه وهو بيقوم).",
            "سخّن: ٢٠٠٠ طلب كل واحد بـ ts مختلف.",
            "الصورة الأولى.",
            "ضغط: ١٠٠٠٠ طلب كمان.",
            "الصورة التانية.",
            "قارن الصورتين: أنهي objects زادت وبكام."
          ],
          sol: R`[[VmRSS]] طلع من حوالي ٥٣ ميجا لـ ١٤٨ ميجا. والصورة التانية ٥٥ ميجا قصاد ١٤. والمقارنة: [[PriceResult +10000]] (نفس عدد الطلبات بين الصورتين بالظبط)، و [[Object +500000]] (٥٠ صف جوه كل واحد، ١٩ ميجا). المتهم الـ [[Map]]: المفتاح فيه [[?ts=]] فكل طلب entry جديد.

السكربت اللي بيقارن الصورتين:`,
          solCode: R`// heap-diff.js: node heap-diff.js before.heapsnapshot after.heapsnapshot
const fs = require('fs');

function count(file) {
  const s = JSON.parse(fs.readFileSync(file, 'utf8'));
  const fields = s.snapshot.meta.node_fields;
  const types = s.snapshot.meta.node_types[0];
  const T = fields.indexOf('type'), N = fields.indexOf('name'), Z = fields.indexOf('self_size');
  const out = {};
  for (let i = 0; i < s.nodes.length; i += fields.length) {
    if (types[s.nodes[i + T]] !== 'object') continue;
    const name = s.strings[s.nodes[i + N]];
    out[name] = out[name] || { n: 0, bytes: 0 };
    out[name].n++;
    out[name].bytes += s.nodes[i + Z];
  }
  return out;
}

const a = count(process.argv[2]), b = count(process.argv[3]);
Object.keys(b)
  .map(k => ({ k, n: b[k].n - (a[k] ? a[k].n : 0), mb: (b[k].bytes - (a[k] ? a[k].bytes : 0)) / 1048576 }))
  .sort((x, y) => y.mb - x.mb).slice(0, 4)
  .forEach(r => console.log(r.k.padEnd(12) + ' +' + String(r.n).padStart(7) + ' objects  +' + r.mb.toFixed(1) + ' MB'));`
        },
        {
          cmd: "Too many open files",
          title: "EMFILE: البروسس خلّص عدد الملفات المسموحله",
          desc: R`كل ملف أو اتصال مفتوح بياخد رقم (file descriptor)، ولكل بروسس حد ([[ulimit -n]]). لو الكود بيفتح ومش بيقفل، بعد شوية كل طلب جديد بيفشل بـ [[EMFILE: too many open files]]، والسيرفر بيبان «بيقع بالتقطيع». [[/proc/PID/fd]] بيوريك هو فاتح إيه، و [[/proc/PID/limits]] الحد.`,
          example: R`# Linux (and WSL):
grep "open files" /proc/148/limits
ls /proc/148/fd | wc -l
ls -l /proc/148/fd | awk '{print $NF}' | sed 's|/[^/]*$||' | sort | uniq -c | sort -rn | head -4
ulimit -n
# Windows (PowerShell):
Get-Process -Id 148 | Select-Object Id, ProcessName, HandleCount`,
          try: R`شغّل container بـ [[--ulimit nofile=256:256]] وجواه سيرفر Node بيعمل [[fs.open]] لكل طلب ومش بيقفل. ابعت ٣٠٠ طلب وعدّ كام 200 وكام 500، واقرا الـ error. وبعدين شوف [[/proc/PID/fd]] متجمّع حسب الفولدر.`,
          deep: {
            why: R`العطل ده شكله غريب: السيرفر شغال، وأول ساعة تمام، وبعدين نسبة من الطلبات تفشل، وبعد restart يرجع تمام. لأن العدّاد بيتصفّر مع الـ restart. وممكن السبب مش ملفات خالص: اتصالات HTTP أو قاعدة بيانات مفتوحة ومش بتتقفل، وكلها بتاخد من نفس العدّاد.`,
            how: R`[[/proc/PID/limits]] حدود البروسس، وسطر [[Max open files]] فيه soft (اللي بيتطبق) و hard (أقصى حاجة البروسس يرفع نفسه ليها).

[[ls /proc/PID/fd | wc -l]]: عدد المفتوح دلوقتي. لو قريب من الحد، ده هو.

[[ls -l /proc/PID/fd | awk ... | sort | uniq -c]]: كل fd بيشاور على إيه، متجمّعين. لو فولدر واحد فيه مئات = ملفات مش بتتقفل. [[socket:]] كتير = اتصالات (شوف [[ss -tnp]] مين التاني).

[[ulimit -n]]: الحد في الـ shell الحالي، والبرامج اللي بتشغّلها منه بتورثه.

الحل الحقيقي في الكود: اقفل اللي فتحته ([[fs.close]]، أو استخدم [[fs.appendFile]] و [[fs.promises]] اللي بيقفلوا لوحدهم، و [[finally]] للاتصالات). ورفع الحد مسكّن: في systemd [[LimitNOFILE=65535]] في الـ service، وفي Docker [[--ulimit nofile=65535:65535]] أو [[ulimits:]] في compose.`,
            when: R`[[EMFILE]] أو [[Too many open files]] في اللوج، أو [[accept4() failed (24: Too many open files)]] في error.log بتاع Nginx، أو طلبات بتفشل بنسبة بتزيد مع الوقت.`,
            mistakes: R`ترفع الحد لمليون وخلاص: الـ leak لسه موجود، هيوصل للحد بعد أسبوع بدل ساعة. وتعدّل [[/etc/security/limits.conf]] وتستغرب إن الـ service ماتأثرتش: ده للـ login sessions، و systemd بياخد [[LimitNOFILE]] من ملف الـ service.`
          },
          teach: R`## الفكرة: كل حاجة مفتوحة ليها رقم، والأرقام ليها حد

المعمل: container من [[node:24-alpine]] (Node v24.22.1) اتشغّل بـ [[--ulimit nofile=256:256]] عشان الحد يخلص بسرعة (الافتراضي في Docker عندي كان [[1048576]]). السيرفر بيكتب ملف audit لكل طلب:

~~~js fd.js
const http = require('http');
const fs = require('fs');

fs.mkdirSync('/tmp/audit', { recursive: true });

http.createServer((req, res) => {
  fs.open('/tmp/audit/' + Date.now() + '-' + Math.random() + '.log', 'w', (err, fd) => {
    if (err) {
      console.error(err.message);
      res.statusCode = 500;
      return res.end('error\n');
    }
    fs.write(fd, req.method + ' ' + req.url + '\n', () => {});
    res.end('ok\n');
  });
}).listen(3000, () => console.log('pid', process.pid));
~~~

- [[fs.open(path, 'w', cb)]]: افتح ملف للكتابة، والـ callback بياخد [[fd]] (رقم الملف المفتوح).
- [[fs.write(fd, ...)]]: اكتب فيه.
- **مفيش [[fs.close(fd)]]**: الملف بيفضل مفتوح طول عمر البروسس.

ضربته بـ ٣٠٠ طلب ورا بعض:

~~~text الناتج
{ '200': 235, '500': 65 }
EMFILE: too many open files, open '/tmp/audit/1793141059488-0.0259....log'
~~~

أول ٢٣٥ نجحوا، وبعدها كله 500. [[EMFILE]] = error **M**any **FILE**s: البروسس خلّص أرقامه. السيرفر نفسه شغال وبيرد، بس مش قادر يفتح حاجة جديدة (ولا حتى اتصال جديد بالقاعدة).

---

## ١. [[grep "open files" /proc/148/limits]]

[[148]] رقم البروسس (طبعه وهو بيقوم). [[/proc/148/limits]] كل الحدود بتاعته:

~~~text الناتج
Max open files            256                  256                  files
~~~

العمود الأول soft limit (اللي بيتطبق فعلًا)، والتاني hard limit (أقصى حاجة البروسس يقدر يرفع نفسه ليها من غير root).

## ٢. [[ls /proc/148/fd | wc -l]]

[[/proc/148/fd]] فولدر فيه ملف لكل fd مفتوح، و [[wc -l]] بيعدّهم:

~~~text الناتج
254
~~~

٢٥٤ من ٢٥٦. ده هو.

## ٣. مفتوح على إيه؟

~~~bash
ls -l /proc/148/fd | awk '{print $NF}' | sed 's|/[^/]*$||' | sort | uniq -c | sort -rn | head -4
~~~

من جوه لبرة:

1. [[ls -l /proc/148/fd]]: كل fd بيشاور على إيه ([[12 -> /tmp/audit/...log]]).
2. [[awk '{print $NF}']]: [[$NF]] آخر عمود (Number of Fields)، يعني المسار.
3. [[sed 's|/[^/]*$||']]: امسح آخر [[/]] وكل اللي بعده، فيفضل الفولدر. [[|]] هنا فاصل بدل [[/]] عشان المسارات فيها [[/]].
4. [[sort | uniq -c]]: رتّب وعدّ كل قيمة.
5. [[sort -rn | head -4]]: الأكبر الأول، و ٤ بس.

~~~text الناتج
    235 /tmp/audit
      3 anon_inode:[eventpoll]
      3 anon_inode:[eventfd]
      2 pipe:[1257548]
~~~

**٢٣٥ ملف في [[/tmp/audit]]**، نفس عدد الطلبات اللي نجحت. الباقي حاجات Node الداخلية (event loop و pipes). لو كان السبب اتصالات كنت هتشوف [[socket:[...]]] بالمئات.

## ٤. [[ulimit -n]]

~~~text الناتج
256
~~~

الحد في الـ shell. على سيرفر أوبونتو عادي اليوزر بياخد ١٠٢٤ (soft)، والـ services تحت systemd بتاخد [[LimitNOFILE]] من ملفها (من docs systemd).

---

## ٥. التصليح

بدّلت [[fs.open]] و [[fs.write]] بـ [[fs.appendFile(path, data, cb)]] اللي بيفتح ويكتب ويقفل لوحده، وضربته بـ ١٠٠٠ طلب:

~~~text الناتج
{ '200': 1000 }
19
~~~

ألف نجحوا، والمفتوح ١٩ بس طول الوقت.

---

## ٦. ويندوز

مفيش [[ulimit]] ولا [[/proc]]. كل حاجة مفتوحة اسمها handle، والعدد في [[HandleCount]]:

~~~powershell
Get-Process -Id 56684 | Select-Object Id, ProcessName, HandleCount
~~~

~~~text الناتج (pwsh)
   Id ProcessName HandleCount
   -- ----------- -----------
56684 pwsh                554
~~~

رقم بيكبر من غير ما ينزل مع الوقت = نفس المشكلة. والأداة اللي بتوريك الـ handles نفسها Process Explorer أو [[handle.exe]] من Sysinternals (من docs Microsoft).

---

## الخلاصة

| السؤال | لينكس | ويندوز |
|---|---|---|
| الحد كام؟ | [[/proc/PID/limits]] و [[ulimit -n]] | مفيش حد صغير بالشكل ده |
| مفتوح كام؟ | [[ls /proc/PID/fd | wc -l]] | [[HandleCount]] |
| مفتوح على إيه؟ | [[ls -l /proc/PID/fd]] متجمّع | Process Explorer |

- اقفل كل اللي بتفتحه، أو استخدم الدوال اللي بتقفل لوحدها.
- رفع الحد مسكّن، مش حل.`,
          lines: [
            "لينكس: حد الملفات المفتوحة للبروسس 148 (soft و hard).",
            "لينكس: عدد الملفات المفتوحة دلوقتي.",
            "لينكس: الملفات المفتوحة متجمّعة حسب الفولدر، الأكتر الأول.",
            "لينكس: الحد في الـ shell الحالي (البرامج اللي بتشغّلها بتورثه).",
            "ويندوز: عدد الـ handles المفتوحة للبروسس."
          ],
          sol: R`من ٣٠٠ طلب: ٢٣٥ نجحوا و ٦٥ رجعوا 500، واللوج فيه [[EMFILE: too many open files, open '/tmp/audit/...']]. و [[/proc/PID/limits]] بيقول [[Max open files 256 256]]، والمفتوح ٢٥٤، منهم ٢٣٥ في [[/tmp/audit]]: نفس عدد الطلبات الناجحة، يعني كل طلب بيسيب ملف مفتوح.

بعد [[fs.appendFile]] (أو [[fs.close(fd)]] بعد الكتابة): ١٠٠٠ طلب كلهم 200، والمفتوح ١٩ ثابت.`
        },
        {
          cmd: "load عالي والمعالج فاضي",
          title: "السيرفر بطيء والـ CPU فاضي: مستني الديسك",
          desc: R`الـ load average بيعد اللي مستني المعالج **واللي مستني الديسك** كمان. لو [[top]] بيقول المعالج ٨٥٪ فاضي والسيرفر بيزحف، بص على [[wa]] (iowait) وعلى العمليات اللي حالتها [[D]]. [[vmstat]] و [[iostat]] بيأكدوا إن الديسك هو اللي مخنوق، و [[pidstat -d]] بيقولك مين بيكتب.`,
          example: R`cat /proc/loadavg
vmstat 1 3
top -bn1 | sed -n 3p
ps -eo state,pid,etime,args | awk '$1 ~ /^D/'
iostat -xz 1 2
pidstat -d 1 1`,
          try: R`في container أوبونتو ([[apt-get install procps sysstat]]) شغّل ٨ نسخ من [[dd if=/dev/urandom of=/tmp/sN bs=4k count=4000 oflag=dsync]] في الخلفية، وبعدها على طول الأوامر دي. شوف [[b]] و [[wa]] في vmstat، و [[%util]] في iostat. وامسح الملفات بعدها.`,
          deep: {
            why: R`حد بيقولك «الـ load ٨ والمعالج فاضي، إزاي؟»، فيكبّر السيرفر لـ ٨ أنوية ومفيش حاجة تتحسن. لأن المشكلة كانت ديسك بطيء أو بروسس بيعمل fsync على كل سطر، أو backup شغال، أو swap. المعالج مش هيحل ده.`,
            how: R`لينكس بيحسب في الـ load average العمليات اللي حالتها R (شغالة أو مستنية معالج) و D (uninterruptible sleep: مستنية I/O، غالبًا ديسك). فـ load عالي + CPU فاضي = عمليات واقفة على الديسك.

[[vmstat 1 3]]: سطر كل ثانية ٣ مرات. [[r]] مستنيين معالج، و [[b]] blocked على I/O، و [[bo]] الكتابة (blocks/s)، و [[wa]] نسبة وقت المعالج اللي فاضي **وفيه I/O مستني**.

[[ps -eo state,...]] و [[awk '$1 ~ /^D/']]: العمليات اللي حالتها D، يعني مين واقف.

[[iostat -xz 1 2]] (من sysstat): لكل ديسك. [[w/s]] كتابات في الثانية، و [[w_await]] متوسط انتظار الكتابة بالملّي، و [[aqu-sz]] طول الطابور، و [[%util]] نسبة الوقت اللي الديسك كان مشغول فيه. التقرير الأول متوسط من ساعة ما الجهاز قام، فبص على التاني.

[[pidstat -d 1 1]]: لكل بروسس [[kB_rd/s]] و [[kB_wr/s]]. مين اللي بيكتب.`,
            when: R`load average أعلى من عدد الأنوية و [[top]] مش موريك حد واكل CPU. أو كل حاجة بتعلّق ثانية ثانية (حتى [[ls]]). أو بعد ما backup أو migration تقيلة تبدأ.`,
            mistakes: R`تبص على [[%CPU]] بس وتقول «السيرفر مرتاح». وتقرا أول تقرير من [[iostat]] أو [[vmstat]] وتبني عليه: ده المتوسط من ساعة الـ boot. وتنسى إن [[swap]] بيبان كـ I/O برضه ([[si]] و [[so]] في vmstat).`
          },
          teach: R`## الفكرة: الـ load مش معناه المعالج

المعمل: container من [[ubuntu:24.04]] على ماكينة فيها ١٦ نواة، و [[procps]] (فيه vmstat و top و ps، نسخة 4.0.4) و [[sysstat]] 12.6.1 (فيه iostat و pidstat). عملت ضغط ديسك من غير CPU: ٨ نسخ من [[dd]] بتكتب بلوكات ٤ كيلو و [[oflag=dsync]]، يعني كل كتابة لازم تستنى لحد ما توصل للديسك فعلًا (زي قاعدة بيانات بتعمل fsync على كل transaction):

~~~bash
for i in 1 2 3 4 5 6 7 8; do dd if=/dev/urandom of=/tmp/s$i bs=4k count=4000 oflag=dsync status=none & done
~~~

> جربت الأول [[dd]] كبير من غير dsync: ٢ جيجا اتكتبوا في أقل من نص ثانية (SSD سريع والكاش)، ومفيش أي انتظار. الكتابات الصغيرة اللي بتستنى كل واحدة هي اللي بتخنق.

---

## ١. [[cat /proc/loadavg]]

~~~text الناتج (بعد ٣ ثواني ضغط)
1.24 0.53 0.41 1/797 190
~~~

التلات أرقام الأولى متوسط ١ و ٥ و ١٥ دقيقة. الأول بيطلع ببطء (متوسط متحرك)، فبعد ٣ ثواني بس وصل ١.٢٤، ولو الضغط استمر دقيقة هيقرب من ٨ (عدد الـ dd). ([[uptime]] بيطبع نفس الأرقام.)

## ٢. [[vmstat 1 3]]

~~~text الناتج
procs -----------memory---------- ---swap-- -----io---- -system-- -------cpu-------
 r  b   swpd   free   buff  cache   si   so    bi    bo   in   cs us sy id wa st gu
 3  3    184 11253384 180628 3165916    0    0   361  3168 8771    9  2  2 96  0  0  0
 4  1    184 11253636 182980 3170900    0    0     0 17892 17180 25220  1  4 84 10  0  0
 0  1    184 11252124 185324 3175692    0    0     0 17764 18173 26817  1  5 84 10  0  0
~~~

السطر الأول متوسط من ساعة ما الجهاز قام، **تجاهله**. السطرين التانيين:

| العمود | القيمة | معناه |
|---|---|---|
| [[b]] | 1 | عمليات blocked مستنية I/O |
| [[bo]] | 17892 | blocks اتكتبت في الثانية (كيلوبايت تقريبًا) |
| [[us]] و [[sy]] | 1 و 4 | المعالج شغال في كود البرامج والكيرنل: شوية |
| [[id]] | 84 | فاضي |
| [[wa]] | 10 | فاضي **بس مستني I/O** |
| [[si]] و [[so]] | 0 | مفيش swap. لو أرقام هنا، المشكلة رام مش ديسك |

[[wa]] ١٠٪ على ١٦ نواة يعني تقريبًا نواة ونص بالكامل وقتها ضايع انتظار. على سيرفر بنواتين ونفس الضغط الرقم هيبقى أعلى بكتير.

## ٣. [[top -bn1 | sed -n 3p]]

[[-b]] batch (يطبع ويخلص)، و [[-n1]] مرة واحدة، و [[sed -n 3p]] السطر التالت بس (سطر المعالج):

~~~text الناتج
%Cpu(s):  4.7 us,  1.7 sy,  0.0 ni, 84.3 id,  8.1 wa,  0.0 hi,  1.2 si,  0.0 st
~~~

نفس القصة: [[84.3 id]] و [[8.1 wa]]. اللي بيبص على أول رقم بس هيقول «المعالج مرتاح».

## ٤. [[ps -eo state,pid,etime,args | awk '$1 ~ /^D/']]

[[state]] حالة البروسس، و [[awk '$1 ~ /^D/']] السطور اللي أول عمود فيها بيبدأ بـ [[D]]:

~~~text الناتج
D     177       00:03 dd if=/dev/urandom of=/tmp/s1 bs=4k count=3000 oflag=dsync status=none
D     178       00:03 dd if=/dev/urandom of=/tmp/s2 bs=4k count=3000 oflag=dsync status=none
... (8 سطور)
~~~

| الحالة | معناها |
|---|---|
| [[R]] | شغال أو مستني معالج |
| [[S]] | نايم مستني حاجة (طبيعي، أغلب العمليات) |
| [[D]] | مستني I/O ومش بيصحى حتى لو بعتله kill. ده اللي بيرفع الـ load |
| [[Z]] | zombie: خلص وأبوه ماقراش النتيجة |

## ٥. [[iostat -xz 1 2]]

[[-x]] تفاصيل، و [[-z]] اخفي الديسكات اللي مفيش عليها حاجة، و [[1 2]] كل ثانية مرتين. التقرير التاني:

~~~text الناتج (مختصر)
Device   w/s      wkB/s     w_await  aqu-sz  %util
sdd      1444.00  18448.00  0.87     2.13    97.60
~~~

- [[w/s]] ١٤٤٤ كتابة في الثانية، كل واحدة حوالي ١٢ كيلو ([[wkB/s]] / [[w/s]]).
- [[%util 97.60]]: الديسك كان مشغول ٩٨٪ من الثانية. ده المخنوق.
- [[w_await 0.87]] ملّي ثانية لكل كتابة: ديسك سريع (NVMe). على ديسك شبكة في VPS رخيص الرقم ده ممكن يبقى ١٠ أو ٥٠، وهنا بيبان الفرق.
- [[aqu-sz 2.13]] متوسط طول الطابور.

## ٦. [[pidstat -d 1 1]]

~~~text الناتج
22:33:49      UID       PID   kB_rd/s   kB_wr/s kB_ccwr/s iodelay  Command
22:33:50        0       405      0.00    476.00      0.00       0  dd
22:33:50        0       406      0.00    476.00      0.00       0  dd
... (8 سطور)
~~~

[[kB_wr/s]] الكتابة لكل بروسس. على سيرفر حقيقي هتلاقي هنا [[postgres]] أو [[mysqld]] أو [[rsync]] بتاع الـ backup أو [[node]] بيكتب لوج سطر سطر.

> مسحت ملفات [[/tmp/s*]] بعد التجربة.

---

## ٧. ويندوز

[[Get-Counter]] (درسه في تاب PowerShell) بيقرا نفس المعلومات:

~~~powershell
Get-Counter "\PhysicalDisk(_Total)\% Idle Time","\PhysicalDisk(_Total)\Current Disk Queue Length","\Processor(_Total)\% Processor Time"
~~~

~~~text الناتج (pwsh، جهاز هادي)
Path                                                    Value
----                                                    -----
\\ali-pc\physicaldisk(_total)\% idle time               96.90
\\ali-pc\physicaldisk(_total)\current disk queue length  0.00
\\ali-pc\processor(_total)\% processor time             29.50
~~~

[[% Idle Time]] قليل و [[Disk Queue Length]] أكبر من ١ لفترة = الديسك مخنوق. وفي Task Manager تبويب Performance ثم Disk فيه [[Active time]].

---

## الخلاصة

| اللي شايفه | معناه |
|---|---|
| load عالي و [[us]]+[[sy]] عالي | المعالج (درس «المعالج 100٪») |
| load عالي و [[wa]] عالي وعمليات [[D]] | الديسك |
| [[si]]/[[so]] أكبر من صفر | الرام خلصت والـ swap شغال (درس «الرام خلصت») |
| [[%util]] قريب من ١٠٠ | الديسك ده بالذات مشغول على الآخر |

- تجاهل أول سطر في [[vmstat]] و [[iostat]].
- [[pidstat -d]] بيقولك مين، وبعدين تسأل ليه (backup في وقت الذروة؟ لوج بـ fsync؟ index ناقص فالقاعدة بتقرا الجدول كله؟).`,
          lines: [
            "الـ load average (١ و ٥ و ١٥ دقيقة) وعدد العمليات.",
            "سطر كل ثانية ٣ مرات: b (مستني I/O) و wa (وقت ضايع انتظار). تجاهل أول سطر.",
            "سطر المعالج من top: id و wa جنب بعض.",
            "العمليات اللي حالتها D (مستنية I/O ومش بتصحى).",
            "تفاصيل كل ديسك كل ثانية مرتين: w/s و w_await و %util. بص على التقرير التاني.",
            "القراية والكتابة لكل بروسس: مين اللي بيكتب."
          ],
          sol: R`[[vmstat]] طلّع [[b]] بين 1 و 3 و [[wa]] حوالي 10 و [[id]] 84: المعالج فاضي والعمليات مستنية. و [[ps]] طلّع الـ ٨ نسخ من [[dd]] حالتهم [[D]]. و [[iostat]] على [[sdd]] (ديسك الـ WSL) طلّع حوالي ١٤٠٠ كتابة في الثانية و [[%util]] حوالي 98. و [[pidstat -d]] طلّع كل [[dd]] بيكتب حوالي ٤٧٦ كيلو في الثانية.

لو [[wa]] صفر والـ load عالي: بص على [[r]] و [[us]] (معالج). ولو [[si]] و [[so]] مش صفر: swap، يعني الرام هي المشكلة.`
        },
        {
          cmd: "exit code",
          title: "البروسس وقع: الرقم بيقولك مين قتله",
          desc: R`كل بروسس بيخلص برقم: 0 تمام، وأي رقم تاني فيه معلومة. 1 الكود رمى error، 126 الملف مش executable، 127 الأمر مش موجود، وأي رقم فوق 128 معناه إشارة قتلته (الرقم ناقص 128): 137 = KILL (غالبًا OOM أو docker stop اتأخر)، و 143 = TERM، و 139 = SEGV. [[docker inspect]] بيقولك الرقم وهل كان OOM.`,
          example: R`docker ps -a --format "{{.Names}} {{.Status}}"
docker inspect -f '{{.Name}} exit={{.State.ExitCode}} oom={{.State.OOMKilled}}' api
kill -l 137
echo $?
# Windows (PowerShell):
$LASTEXITCODE`,
          try: R`اعمل containers تقع بكل طريقة: [[node -e "JSON.parse('{bad')"]]، وسكربت من غير صلاحية تنفيذ، وأمر مكتوب غلط، و Node بـ [[-m 64m]] بيحجز رام لحد ما يقع، و [[docker stop]] لـ Node من غير handler ومع [[--init]] ومع handler. واقرا الرقم لكل واحد وقيس [[docker stop]] أخد قد إيه.`,
          deep: {
            why: R`[[Exited (137)]] في [[docker ps]] أو [[code=killed, status=9/KILL]] في systemd بتقولك أكتر من اللوج أحيانًا. البروسس اللي اتقتل بإشارة مش بيلحق يكتب حاجة، فالرقم هو الدليل الوحيد.`,
            how: R`البروسس بيخلص بطريقتين. يا إما بيخلص هو برقم ([[exit(1)]] أو Node لما يرمي error ومحدش يمسكه)، والرقم من 0 لـ 255. يا إما الكيرنل بيقتله بإشارة (signal)، والـ shell و Docker بيكتبوها 128 + رقم الإشارة.

[[kill -l 137]] بيقولك اسم الإشارة: bash بيطرح 128 لوحده ويطبع KILL.

137 (KILL = 9) ليها ٣ أسباب: OOM (الرام خلصت، و [[OOMKilled: true]])، أو [[docker stop]] بعت TERM والتطبيق ماقفلش في ١٠ ثواني فبعت KILL، أو حد عمل [[kill -9]].

143 (TERM = 15): [[docker stop]] أو [[systemctl stop]] والتطبيق قفل بسبب الإشارة من غير ما يمسكها. لو التطبيق مسكها وقفل نضيف بـ [[process.exit(0)]] الرقم 0.

PID 1 جوه الـ container: الكيرنل مش بيطبّق الإشارات الافتراضية عليه، فـ Node من غير handler بيتجاهل TERM خالص، و [[docker stop]] بيستنى ١٠ ثواني ويقتله بـ 137. [[--init]] بيحط بروسس صغير (tini) هو PID 1 ويوصّل الإشارة.`,
            when: R`أي container أو service وقع: الرقم أول حاجة تقراها قبل اللوج. و [[docker stop]] بياخد ١٠ ثواني بالظبط؟ ده 137 من PID 1.`,
            mistakes: R`تفتكر 137 دايمًا OOM: بص على [[OOMKilled]]. وتشوف 0 وتقول «مفيش مشكلة» والـ container واقف: يبقى البروسس خلص شغله (مثلًا [[CMD]] بيشغّل حاجة في الخلفية وبيخلص). وفي سكربتات bash تكتب [[cmd | tee log]] وتبص على [[$?]]: ده رقم [[tee]] مش [[cmd]] (استخدم [[set -o pipefail]]).`
          },
          teach: R`## الفكرة: الرقم الأخير اللي البروسس قاله

كل الأرقام دي من containers عملتها بنفسي (alpine:3.22 و node:24-alpine) وقريت رقمها بـ [[docker inspect]].

---

## ١. [[docker ps -a --format "{{.Names}} {{.Status}}"]]

[[-a]] حتى الواقفين، و [[--format]] عمودين بس: الاسم والحالة. [[{{.Names}}]] صيغة Go templates اللي Docker بيستخدمها.

~~~text الناتج
b2d-ex-139 Exited (139) Less than a second ago
b2d-st-handler Exited (0) 11 seconds ago
b2d-st-init Exited (143) 12 seconds ago
b2d-st-plain Exited (137) 12 seconds ago
b2d-ex-oom Exited (137) 46 seconds ago
b2d-ex-127 Exited (127) 47 seconds ago
b2d-ex-126 Exited (126) 48 seconds ago
b2d-ex-1 Exited (1) 49 seconds ago
b2d-ex-ok Exited (0) 49 seconds ago
~~~

## ٢. [[docker inspect -f '{{.Name}} exit={{.State.ExitCode}} oom={{.State.OOMKilled}}' api]]

[[-f]] اطبع الحقول دي بس: [[.State.ExitCode]] الرقم، و [[.State.OOMKilled]] هل الكيرنل قتله عشان عدّى حد الرام. كل واحد اتعمل إزاي:

| الـ container | اللي حصل | exit | oom |
|---|---|---|---|
| ok | [[true]] | 0 | false |
| 1 | [[node -e "JSON.parse('{bad')"]]: error ومحدش مسكه | 1 | false |
| 126 | سكربت اتعمل من غير [[chmod +x]] وانا بشغّله: [[Permission denied]] | 126 | false |
| 127 | [[nodee server.js]]: [[nodee: not found]] | 127 | false |
| 139 | بروسس اتبعتله SEGV (زي مكتبة C وقعت) | 139 | false |
| oom | [[-m 64m]] و Node بيحجز ميجا ورا ميجا | 137 | **true** |

### الـ ٣ اللي فوق 128

| الرقم | ناقص 128 | الإشارة | مين بيبعتها عادة |
|---|---|---|---|
| 130 | 2 | INT | Ctrl+C |
| 137 | 9 | KILL | OOM killer، أو [[docker stop]] بعد المهلة، أو [[kill -9]] |
| 139 | 11 | SEGV | البرنامج لمس ذاكرة مش بتاعته (مكتبة native) |
| 143 | 15 | TERM | [[docker stop]] و [[systemctl stop]] و [[kill]] |

---

## ٣. [[docker stop]] و PID 1

٣ containers بنفس Node، و [[docker stop]] لكل واحد، وقست الوقت:

~~~text الناتج
plain stop took 10.4031s     exit=137
init stop took 0.4227s       exit=143
handler stop took 0.430831s  exit=0
~~~

- **plain**: [[node -e "setInterval(...)"]] هو PID 1. الكيرنل مش بيطبّق الإشارات الافتراضية على PID 1، فـ TERM اتجاهلت. Docker استنى ١٠ ثواني وبعت KILL: **137** ومش OOM.
- **init**: [[docker run --init]] حط tini كـ PID 1، وهو وصّل TERM لـ Node، و Node وقع بيها: **143** في نص ثانية.
- **handler**: الكود فيه [[process.on('SIGTERM', () => { console.log('bye'); process.exit(0); })]]: Node قفل بنفسه: **0**.

يعني [[docker stop]] بياخد ١٠ ثواني بالظبط و 137 = تطبيقك مش بيسمع TERM. الحل handler في الكود (يقفل السيرفر والقاعدة نضيف، درس «الإغلاق النضيف» في تاب Node) أو [[--init]] (أو [[init: true]] في compose).

---

## ٤. [[kill -l 137]]

[[-l]] list: حوّل رقم لاسم إشارة. على أوبونتو 24.04 (bash):

~~~text الناتج
$ kill -l 9
KILL
$ kill -l 137
KILL
$ kill -l 143
TERM
~~~

bash بيفهم إن 137 exit code فيطرح 128 لوحده.

## ٥. [[echo $?]]

[[$?]] رقم آخر أمر في الـ shell:

~~~text الناتج (bash)
$ ls /nope
ls: cannot access '/nope': No such file or directory
$ echo $?
2
$ nosuch
bash: line 1: nosuch: command not found
$ echo $?
127
~~~

[[2]] هنا رقم [[ls]] نفسه لـ «مش لاقي» (كل برنامج ليه أرقامه في [[man]]).

---

## ٦. ويندوز: [[$LASTEXITCODE]]

في PowerShell [[$LASTEXITCODE]] رقم آخر **برنامج خارجي** (exe)، و [[$?]] بس true أو false. جربتهم في pwsh 7 و Windows PowerShell 5.1، والنتيجة واحدة:

~~~text الناتج
node: 1
cmd: 3
notfound: CommandNotFoundException
killed: -1
~~~

- [[node -e "JSON.parse('{bad')"]] ثم [[$LASTEXITCODE]]: 1 زي لينكس.
- [[cmd /c exit 3]]: 3.
- أمر مش موجود مش بيدّي رقم: PowerShell بيرمي [[CommandNotFoundException]].
- بروسس اتقفل بـ [[Stop-Process]]: ‎-1. ويندوز مفيهوش إشارات، فمفيش 137 و 143. والأرقام السالبة الكبيرة زي ‎-1073741819 (0xC0000005 = access violation، زي SEGV) من docs Microsoft.

---

## الخلاصة

| الرقم | اقرا |
|---|---|
| 0 | خلص شغله. لو المفروض يفضل شغال، الـ CMD غلط |
| 1 | error في الكود: اللوج فيه stack trace |
| 126 / 127 | مش executable / مش موجود: الـ image أو الـ PATH |
| 137 + [[OOMKilled=true]] | الرام (درس «الرام خلصت») |
| 137 + stop أخد ١٠ ثواني | التطبيق مش بيسمع TERM |
| 139 | مكتبة native وقعت |
| 143 | اتقفل بـ TERM ومامسكهاش |`,
          lines: [
            "كل الـ containers حتى الواقفين، بالاسم والحالة (فيها Exited ورقمه).",
            "الرقم بالظبط، وهل الكيرنل قتله عشان عدّى حد الرام.",
            "اسم الإشارة: bash بيطرح 128 من 137 ويطبع KILL.",
            "رقم آخر أمر اتنفذ في الـ shell.",
            "ويندوز: رقم آخر برنامج خارجي في PowerShell."
          ],
          sol: R`الأرقام اللي طلعت: JSON غلط = 1، سكربت من غير صلاحية تنفيذ = 126، أمر غلط = 127، SEGV = 139، Node بـ [[-m 64m]] = 137 و [[OOMKilled=true]]. و [[docker stop]]: من غير handler أخد ١٠.٤ ثانية و 137 (و [[OOMKilled=false]])، مع [[--init]] نص ثانية و 143، ومع handler بيعمل [[process.exit(0)]] نص ثانية و 0.

الفرق بين الـ 137 بتاع OOM والـ 137 بتاع stop هو [[OOMKilled]] بس، فاقراه دايمًا.`
        }
      ]
    }
]);
