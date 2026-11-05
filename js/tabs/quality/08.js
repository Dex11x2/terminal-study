// تكملة تاب quality: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/quality/01.js (شرح حقول الدرس في أوله)
MORE("quality", [
    {
      t: "لما الاختبارات تعدّي والغلطة كمان",
      l: 2,
      n: "حالات حقيقية: كومت اترفع واختبار واقع قدامه، واختبار كتب فوق إعدادات المستخدم، واختبار بيقع مرة من أربعة، ومتوسط مخبّي فريمات متأخرة",
      items: [
        {
          cmd: "&& قبل git push",
          title: "اوعى ترفع وفيه اختبار واقع: ; و && و | و pipefail",
          desc: R`[[;]] بيكمّل مهما حصل، و [[&&]] بيكمّل لو اللي قبله نجح بس. فـ [[test ; git push]] بيرفع وهو واقع، و [[test && git push]] بيقف.

والفخ التاني: [[test | tail -3 && git push]] بيرفع برضه، لأن نتيجة الـ pipe هي نتيجة آخر أمر فيه ([[tail]]) مش الاختبار. الحل [[set -o pipefail]].`,
          example: R`./test.sh; git push origin main
./test.sh && git push origin main
./test.sh | tail -1 && git push origin main
set -o pipefail
./test.sh | tail -1 && git push origin main
./test.sh | tail -1; echo "$__{PIPESTATUS[@]}"
git push --no-verify origin main`,
          try: R`في ريبو تجريبي اعمل [[test.sh]] بيطبع سطر وآخره [[exit 1]]، وجرّب تلات أشكال: [[./test.sh ; echo pushed]] و [[./test.sh && echo pushed]] و [[./test.sh | tail -1 && echo pushed]]. عدّ كام مرة اتطبعت [[pushed]] وليه. وبعدين كرر التالت بعد [[set -o pipefail]].`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** قبل ما تنفّذ، اكتب على ورقة كل سطر هيطبع إيه: [[false; echo a]] و [[false && echo b]] و [[false || echo c]] و [[true | false; echo "$?"]] و [[false | true; echo "$?"]]. وبعدين شغّلهم وقارن.`, done: R`عرفت تفسّر ليه [[b]] ماطلعتش، وليه آخر سطرين طلعوا [[1]] و [[0]].`, sol: R`~~~bash
false; echo a
false && echo b
false || echo c
true | false; echo "$?"
false | true; echo "$?"
~~~

[[;]] مش بيبص على النتيجة، فـ [[a]] بتطلع. و [[&&]] بيقف عند الفشل، فـ [[b]] مش بتطلع. و [[||]] عكسه: بيشتغل لو اللي قبله فشل، فـ [[c]] بتطلع. والـ pipe بياخد نتيجة آخر أمر: [[true | false]] نتيجته [[1]]، و [[false | true]] نتيجته [[0]] رغم إن أول أمر فشل، وده الفخ كله. الغلطة الشائعة إنك تفتكر إن أي فشل في الـ pipe بيبان.

~~~text الناتج
a
c
1
0
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** سكربت [[ship.sh]] بياخد رسالة الكومت، يشغّل [[./test.sh]] ويعرض آخر ٣ سطور بس من ناتجه، وبعدين يعمل add و commit و push. لو الاختبار وقع أو الرسالة ناقصة ميرفعش حاجة.`, done: R`مع اختبار واقع: [[git log origin/main]] ماتغيرش والـ exit code [[1]]. ومن غير رسالة: رسالة خطأ واضحة. ومع اختبار ناجح: اترفع.`, sol: R`~~~bash ship.sh
#!/usr/bin/env bash
set -euo pipefail
message=$__{1:?write a commit message}
./test.sh | tail -3
git add -A
git commit -qm "$message"
git push -q origin main
echo "shipped: $message"
~~~

[[set -e]] يقف عند أي فشل، و [[-u]] يعتبر المتغير الفاضي غلطة، و [[-o pipefail]] هو اللي بيخلي [[| tail -3]] مايخبيش فشل الاختبار. و [[$__{1:?...}]] بيوقف السكربت برسالة لو مفيش معامل. الغلطة الشائعة: تشيل [[pipefail]] فالسكربت يبان مظبوط وهو بيرفع كل حاجة.

~~~text الناتج
$ ./ship.sh "add notes"      # الاختبار واقع
test 1 ok
test 2 FAILED: expected 3 got 4
exit 1

$ ./ship.sh "add notes"      # بعد التصليح
test 1 ok
test 2 ok
shipped: add notes
exit 0

$ ./ship.sh
./ship.sh: line 3: 1: write a commit message
exit 1
~~~` },
            { lvl: 'تحدي', t: R`**صلّح الكود البايظ:** السكربت ده بيقول [[publishing]] حتى لو الاختبار واقع: [[./test.sh | tee test.log]] وبعده [[echo "publishing"]]. صلّحه من غير ما تخسر [[test.log]].`, done: R`مع اختبار بيخرج بـ [[exit 1]]: مفيش [[publishing]]، والـ exit code [[1]]، و [[test.log]] موجود.`, sol: R`~~~bash release.sh
#!/usr/bin/env bash
set -euo pipefail
./test.sh | tee test.log
echo "publishing"
~~~

المشكلتين: مفيش [[set -e]] فالسكربت بيكمّل، و [[tee]] نجح فنتيجة الـ pipe [[0]]. لازم الاتنين مع بعض: [[pipefail]] يخلي نتيجة الـ pipe فشل، و [[-e]] يوقف عندها. ولأن [[tee]] بيفضل شغال، الملف بيتكتب برضه.

~~~text الناتج
قبل التصليح:  publishing   ثم exit 0
بعد التصليح:  (مفيش publishing)   ثم exit 1
~~~` },
          ],
          deep: {
            why: R`الغلطة دي حصلت فعلًا في مشروع: سطر واحد فيه [[cargo test ...; git commit ...; git push]]، والفلتر [[grep | head]] مختصر الناتج. الاختبار وقع، بس الفشل ظهر في الشاشة بعد ما الرفع حصل خلاص، فالفرع الرئيسي بقى فيه كومت بايظ. الأوامر كانت بتتنفذ زي ما اتكتبت بالظبط، والمشكلة في طريقة الربط بينها.`,
            how: R`كل أمر بيرجّع رقم (exit code): [[0]] نجاح، وأي رقم تاني فشل، ومخزن في [[$?]]. [[;]] بيتجاهله، و [[&&]] بيقراه. والـ pipe بيشغّل كل الأوامر مع بعض، وبيرجّع رقم **آخر** أمر بس.

[[set -o pipefail]] بيغيّر القاعدة: الـ pipe يرجّع فشل لو أي أمر فيه فشل. و [[PIPESTATUS]] مصفوفة في bash فيها رقم كل أمر، بتتقرا فورًا بعد الـ pipe لأن أي أمر تالي بيمسحها.

أضمن حل هو hook: ملف [[.git/hooks/pre-push]] بيشتغل قبل أي push، ولو طلع بفشل الـ push بيتلغي، حتى لو نسيت.`,
            when: "أي سكربت أو سطر فيه خطوة بعد خطوة تعتمد عليها: اختبار ثم رفع، build ثم نشر، نسخة احتياطية ثم مسح. أول سطر في أي سكربت bash جدي: set -euo pipefail. وأي مشروع مشترك: hook أو CI يمنع الدمج.",
            mistakes: R`تحط [[| head]] أو [[| grep]] بعد الاختبار عشان الناتج يبقى أقصر وتنسى [[pipefail]]. أو تستخدم [[set -o pipefail]] في سكربت بيبدأ بـ [[#!/bin/sh]]: على Ubuntu ده [[dash]] وبيقع بـ [[Illegal option -o pipefail]]. أو تصلّح بعد الرفع بـ [[git push --force]] على فرع مشترك: كومت تصليح جديد أأمن. أو تتعوّد على [[--no-verify]]: ده مخرج طوارئ، مش طريقة شغل.`,
          },
          teach: R`## الحكاية

سطر واحد بيعمل تلات حاجات: يشغّل الاختبارات، ويعمل commit، ويرفع. الاختبار وقع، والكود اترفع برضه. هنعيد نفس الموقف في معمل. كل اللي تحت اتشغّل في [[ubuntu:24.04]] بريو تجريبي، والـ [[remote]] فولدر [[--bare]] جنبه، فمفيش حاجة بتطلع بره.

الاختبار سكربت صغير بيقع دايمًا:

~~~bash test.sh
#!/usr/bin/env bash
echo "test 1 ok"
echo "test 2 FAILED: expected 3 got 4"
exit 1
~~~

[[exit 1]] هو الرقم اللي بيقول للي شغّله «أنا فشلت».

---

## ١. [[;]]: كمّل مهما حصل

~~~bash
./test.sh; git commit -qm "with a broken test"; git push -q origin main
git log --oneline origin/main | head -2
~~~

~~~text الناتج
test 1 ok
test 2 FAILED: expected 3 got 4
4dadc7a with a broken test
7185461 start
~~~

الفشل اتطبع قدامك، والكومت اترفع. [[;]] معناها «خلصت، اللي بعده».

---

## ٢. [[&&]]: كمّل لو نجح بس

~~~bash
./test.sh && git commit -qm "second" && git push -q origin main
echo "chain exit: $?"
~~~

~~~text الناتج
test 1 ok
test 2 FAILED: expected 3 got 4
chain exit: 1
~~~

الـ commit والـ push ماشتغلوش، و [[origin/main]] فضل زي ما هو. السلسلة كلها بترجّع رقم أول حلقة فشلت.

---

## ٣. الفخ: الـ pipe بيخبّي الفشل

عايز ناتج أقصر، فبتحط [[tail]]:

~~~bash
./test.sh | tail -1; echo "exit after pipe: $?"
./test.sh | tail -1 && echo "looks fine, pushing"
~~~

~~~text الناتج
test 2 FAILED: expected 3 got 4
exit after pipe: 0
test 2 FAILED: expected 3 got 4
looks fine, pushing
~~~

الكلمة [[FAILED]] قدامك، والرقم [[0]]. الـ pipe نتيجته نتيجة آخر أمر، و [[tail]] نجح في شغلته. فـ [[&&]] هنا مش بيحميك.

### [[PIPESTATUS]]: رقم كل أمر

~~~bash
./test.sh | tail -1; echo "statuses: $__{PIPESTATUS[*]}"
~~~

~~~text الناتج
test 2 FAILED: expected 3 got 4
statuses: 1 0
~~~

[[1]] للاختبار و [[0]] لـ [[tail]]. ده موجود في bash، ومش موجود في [[sh]]. واقراه في نفس السطر، لأن أي أمر تالي بيمسحه.

---

## ٤. [[set -o pipefail]]

~~~bash
set -o pipefail
./test.sh | tail -1; echo "exit after pipe: $?"
./test.sh | tail -1 && echo "pushing" || echo "stopped"
~~~

~~~text الناتج
test 2 FAILED: expected 3 got 4
exit after pipe: 1
test 2 FAILED: expected 3 got 4
stopped
~~~

دلوقتي الـ pipe بيرجّع فشل لو أي أمر فيه فشل، وناتجك فضل قصير.

**فخ:** على Ubuntu [[sh]] هو [[dash]]:

~~~text الناتج
sh: 1: set: Illegal option -o pipefail
~~~

فالسكربت لازم أوله [[#!/usr/bin/env bash]].

---

## ٥. احفظ الناتج، وبعدين قرر

لو عايز تفحص الناتج نفسه:

~~~bash
if out=$(./test.sh 2>&1); then
  echo "ok"
else
  echo "stopped, last line:"
  echo "$out" | tail -1
fi
~~~

~~~text الناتج
stopped, last line:
test 2 FAILED: expected 3 got 4
~~~

[[if]] هنا بيقرا رقم الأمر اللي جوه [[$(...)]]. و [[2>&1]] بيضم الأخطاء للناتج عشان تتحفظ معاه.

---

## ٦. الضمان: [[pre-push]] hook

السطور فوق بتعتمد على إنك تفتكر. الـ hook مش محتاج:

~~~bash .git/hooks/pre-push
#!/usr/bin/env bash
set -euo pipefail
echo "pre-push: running tests"
./test.sh
~~~

بعد [[chmod +x .git/hooks/pre-push]]:

~~~text الناتج
$ git push origin main
pre-push: running tests
test 1 ok
test 2 FAILED: expected 3 got 4
error: failed to push some refs to '/tmp/shop.git'

$ git status -sb
## main...origin/main [ahead 1]
~~~

[[ahead 1]]: الكومت عندك بس، ومارفعش. و [[--no-verify]] بيتخطى الـ hook، وده اتجرّب فعلًا ورفع، فالـ hook بيحميك من النسيان، مش من القرار. عشان كده الفحص الأخير مكانه CI. وفولدر [[.git/hooks]] مش بيتنسخ مع الريبو: شوف درس [[husky]].

---

## لو اترفع خلاص؟

كومت تصليح جديد، مش [[push --force]]:

~~~bash
git add .
git commit -m "Fix the failing test"
git push origin main
git log --oneline origin/main | head -3
~~~

~~~text الناتج
[main 1f4fe63] Fix the failing test
 1 file changed, 2 insertions(+), 2 deletions(-)
To /tmp/shop.git
   77c6116..1f4fe63  main -> main
1f4fe63 Fix the failing test
77c6116 broken
4ca702a start
~~~

التاريخ بيفضل صادق، واللي سحب النسخة البايظة مش هيتلخبط.

---

## الفرق في PowerShell

جرّبته على PowerShell 7.6:

~~~powershell
cmd /c "exit 3"; "LASTEXITCODE=$LASTEXITCODE  ?=$?"
cmd /c "exit 1" && "ran second"
cmd /c "exit 1"; "ran anyway"
~~~

~~~text الناتج
LASTEXITCODE=3  ?=False
ran anyway
~~~

نفس الفكرة: [[;]] بتكمل، و [[&&]] بيقف. ورقم البرنامج في [[$LASTEXITCODE]]. و [[&&]] موجود من PowerShell 7 بس، وفي Windows PowerShell 5.1 بيقع:

~~~text powershell -NoProfile (5.1)
The token '&&' is not a valid statement separator in this version.
~~~

---

## الخلاصة

| الشكل | لو الاختبار وقع |
|---|---|
| [[test ; push]] | بيرفع |
| [[test && push]] | بيقف |
| [[test | tail && push]] | بيرفع |
| [[set -o pipefail]] وبعده [[test | tail && push]] | بيقف |
| [[pre-push]] hook | بيقف، إلا لو [[--no-verify]] |`,
          lines: [
            R`غلط: [[;]] بترفع حتى لو الاختبار واقع.`,
            R`صح: [[&&]] بيقف عند أول فشل.`,
            R`غلط: رقم الـ pipe رقم [[tail]]، فبيرفع.`,
            R`خلّي الـ pipe يفشل لو أي أمر فيه فشل.`,
            R`دلوقتي نفس السطر بيقف.`,
            R`اعرض رقم كل أمر في الـ pipe (bash).`,
            R`يتخطى الـ hook: للطوارئ بس.`
          ],
          sol: R`[[pushed]] بتتطبع مرتين من التلاتة: مع [[;]] ومع الـ pipe، ومرة بس لا (مع [[&&]]). وبعد [[set -o pipefail]] الشكل التالت كمان بيقف.`,
        },
        {
          cmd: "HOME مؤقت للاختبار",
          title: "اختبار كتب فوق إعدادات المستخدم الحقيقية",
          desc: R`اختبار بينادي كود بيحفظ، فبيكتب في نفس الملف اللي البرنامج الحقيقي بيستخدمه. الاختبار بينجح، وإعداداتك راحت.

الحل إن الاختبارات تشتغل في بيت مؤقت: [[HOME]] متوجّه لفولدر من [[mkdtemp]]، أو المسار يتبعت للكود كمعامل. وتتأكد بمقارنة [[md5sum]] قبل وبعد.`,
          example: R`md5sum ~/.notes-app/settings.json
node --test bad.test.js
md5sum ~/.notes-app/settings.json
cmp ~/.notes-app/settings.json /tmp/settings.backup.json
HOME=/tmp/fakehome node -e 'console.log(require("node:os").homedir())'
node --test good.test.js`,
          try: R`اعمل [[settings.js]] فيه [[save]] بيكتب في [[~/.notes-app/settings.json]]، واكتب ليه اختبار. في حاوية [[docker run --rm -it node:22-slim bash]] حط ملف إعدادات بقيمة [[dark]]، شغّل الاختبار، وشوف الملف اتغير. متجربش ده على مسارات حقيقية على جهازك.`,
          practice: [
            { lvl: 'سريع', t: R`**قارن وقيس:** اطبع [[os.homedir()]] مرة عادي ومرة مع [[HOME=/tmp/fakehome]] قدام الأمر. وبعدين اشرح: المتغير اتغير لمين، وفضل قد إيه؟`, done: R`طلع مسارين مختلفين، وعرفت إن التغيير للأمر ده بس.`, sol: R`~~~bash
HOME=/tmp/fakehome node -e 'console.log(require("node:os").homedir())'
node -e 'console.log(require("node:os").homedir())'
~~~

[[VAR=value command]] بيحط المتغير في بيئة الأمر ده بس، والـ shell نفسه مش بيتأثر. وعلى لينكس [[os.homedir()]] بيقرا [[HOME]] الأول. على ويندوز المتغير [[USERPROFILE]]، وفي PowerShell بتكتبها [[$env:USERPROFILE = "..."]] قبل الأمر، وده بيفضل للجلسة كلها.

~~~text الناتج
/tmp/fakehome
/root
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** سكربت [[guard.sh]] بياخد أي أمر، يشغّله، ولو ملف الإعدادات الحقيقي اتغير يطبع تحذير ويرجّع exit code [[2]]. جرّبه على [[good.test.js]] و [[bad.test.js]].`, done: R`مع الاختبار السليم: exit [[0]]. ومع البايظ: رسالة [[guard:]] و exit [[2]] رغم إن الاختبار نفسه ناجح.`, sol: R`~~~bash guard.sh
#!/usr/bin/env bash
# Run a command and fail if it changed the real settings.
set -uo pipefail
file=$HOME/.notes-app/settings.json
before=$(md5sum < "$file")
"$@"
status=$?
after=$(md5sum < "$file")
if [ "$before" != "$after" ]; then
  echo "guard: $file changed!" >&2
  exit 2
fi
exit "$status"
~~~

مفيش [[-e]] هنا عن قصد: لو الاختبار وقع لازم نفحص الملف برضه. و [[$@]] بين علامتي تنصيص بيعدّي الأمر زي ما هو بمسافاته. و [[md5sum < "$file"]] بيقرا من stdin، فالناتج من غير اسم الملف ومقارنته أسهل.

~~~text الناتج
$ ./guard.sh node --test good.test.js
✔ tests keep away from the real home
✔ a changed shortcut comes back
exit 0

$ ./guard.sh node --test bad.test.js
✔ a changed shortcut comes back
guard: /root/.notes-app/settings.json changed!
exit 2
~~~` },
            { lvl: 'تحدي', t: R`**refactor:** بدل ما الاختبار يغيّر [[HOME]]، خلّي الكود ياخد المسار كمعامل: [[settingsStore(home = os.homedir())]]. واكتب اختبار بيمسح فولدره لما يخلص.`, done: R`الاختبار بينجح، و [[guard.sh]] بيرجّع [[0]]، ومفيش فولدر بيفضل وراه.`, sol: R`~~~js settings2.js
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

function settingsStore(home = os.homedir()) {
  const file = path.join(home, ".notes-app", "settings.json");
  return {
    file,
    save(settings) {
      fs.mkdirSync(path.dirname(file), { recursive: true });
      fs.writeFileSync(file, JSON.stringify(settings, null, 2));
    },
    load() {
      return JSON.parse(fs.readFileSync(file, "utf8"));
    },
  };
}

module.exports = { settingsStore };
~~~

~~~js store.test.js
const test = require("node:test");
const assert = require("node:assert");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { settingsStore } = require("./settings2.js");

test("a changed shortcut comes back", (t) => {
  const home = fs.mkdtempSync(path.join(os.tmpdir(), "notes-"));
  t.after(() => fs.rmSync(home, { recursive: true, force: true }));
  const store = settingsStore(home);
  store.save({ shortcut: { brush: "P" } });
  assert.equal(store.load().shortcut.brush, "P");
});
~~~

الكود الحقيقي مش بيتغير (بيستخدم القيمة الافتراضية)، والاختبار بيدّيه فولدر تاني. ده اسمه dependency injection. و [[t.after]] بيمسح حتى لو الاختبار وقع.

~~~text الناتج
✔ a changed shortcut comes back
exit 0
~~~` },
          ],
          deep: {
            why: R`حصلت في برنامج رسم: دالة جديدة بتحفظ الإعدادات، واختبار ناداها، ومسار الملف ثابت على مجلد المستخدم. الاختبارات كلها خضرا، وملف إعدادات المطور الحقيقي اتكتب فوقه اختصار غريب ووضع قلم مختلف. اتكشفت بالصدفة لما حد فتح الملف عشان يعمل نسخة احتياطية، فلقى قيمة مكتوبة في الاختبار حرفيًا. والنسخة اتاخدت بعد الضرر، فالقيم القديمة راحت.`,
            how: R`الكود بيكتب في مسار، والمسار جاي من مكان ثابت. لو الاختبار شغّل نفس الكود، بيكتب في نفس المكان. تلات طرق تعزله:

١. **متغير بيئة:** [[HOME]] (وعلى ويندوز [[USERPROFILE]] و [[LOCALAPPDATA]]) متوجّه لفولدر مؤقت.
٢. **حقن المسار:** الدالة تاخد المسار كمعامل بقيمة افتراضية. أوضح طريقة.
٣. **وقت الترجمة:** في اللغات المترجمة، زي Rust: [[#[cfg(test)]]] يدّي مسار مؤقت، و [[#[cfg(not(test))]]] المسار الحقيقي.

وفي كل الأحوال اكتب اختبار بيتأكد إن المسار مش جوه البيت الحقيقي، عشان لو حد غيّر الكود بعدين يقع فورًا.`,
            when: "أي كود بيكتب بره فولدر الاختبار: إعدادات، كاش، سجل، قاعدة بيانات محلية، ملفات مستخدم. نفس الفكرة مع قاعدة بيانات الإنتاج وخدمات الدفع والإيميل: الاختبار مايلمسش الحقيقي أبدًا.",
            mistakes: R`تعمل نسخة احتياطية **بعد** أول تشغيل. أو تنسى إن الفولدر المؤقت لازم يبقى مختلف لكل اختبار (شوف درس «اختبار flaky بملف مشترك»). أو [[os.homedir()]] تتحسب مرة واحدة أول تحميل الملف، فتغيير [[HOME]] في الاختبار مايأثرش. أو تجرب على جهازك بمسار حقيقي «مرة واحدة بس»: جرّب في حاوية.`,
          },
          teach: R`## الموقف

برنامج ملاحظات بيحفظ إعداداته في [[~/.notes-app/settings.json]]. كل اللي تحت اتشغّل في حاوية [[node:22-slim]] (Node 22)، فـ [[/root]] هنا بيت الحاوية، مش جهازك.

~~~js settings.js
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

function settingsPath() {
  return path.join(os.homedir(), ".notes-app", "settings.json");
}

function save(settings) {
  const file = settingsPath();
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(settings, null, 2));
}

function load() {
  try {
    return JSON.parse(fs.readFileSync(settingsPath(), "utf8"));
  } catch {
    return { theme: "light", shortcut: {} };
  }
}

module.exports = { settingsPath, save, load };
~~~

- [[os.homedir()]]: بيت المستخدم. ده الخط اللي بيوصّل الكود بالملف الحقيقي.
- [[recursive: true]]: يعمل الفولدر لو مش موجود، ومايعترضش لو موجود.

والاختبار شكله سليم:

~~~js bad.test.js
const test = require("node:test");
const assert = require("node:assert");
const { save, load } = require("./settings.js");

test("a changed shortcut comes back", () => {
  save({ theme: "light", shortcut: { brush: "P" } });
  assert.equal(load().shortcut.brush, "P");
});
~~~

---

## ١. الجريمة

بصمة الملف قبل التشغيل:

~~~text md5sum ~/.notes-app/settings.json
14fc01c6fca7b70597795d6d2c5d8de0  /root/.notes-app/settings.json
~~~

~~~text cat
{
  "theme": "dark",
  "shortcut": {
    "brush": "B"
  },
  "pressure": 1.4
}
~~~

[[md5sum]] بيطلّع بصمة للمحتوى: أي حرف يتغير، البصمة تتغير. شغّل الاختبار:

~~~text node --test --test-reporter=spec bad.test.js
✔ a changed shortcut comes back
ℹ tests 1
ℹ pass 1
ℹ fail 0
~~~

ناجح. والملف؟

~~~text بعد الاختبار
005351c5db0cd0120ba035f797354911  /root/.notes-app/settings.json
{
  "theme": "light",
  "shortcut": {
    "brush": "P"
  }
}
~~~

الثيم رجع [[light]]، و [[pressure]] اختفى خالص. مفيش أي علامة في ناتج الاختبار.

[[cmp]] بيقارن ملفين بايت بايت، وبيرجّع [[1]] لو مختلفين:

~~~text cmp ~/.notes-app/settings.json /tmp/settings.backup.json
/root/.notes-app/settings.json /tmp/settings.backup.json differ: char 15, line 2
cmp exit: 1
~~~

---

## ٢. التصليح: بيت مؤقت لكل اختبار

~~~js good.test.js
const test = require("node:test");
const assert = require("node:assert");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { settingsPath, save, load } = require("./settings.js");

const realHome = os.homedir();

test.beforeEach(() => {
  process.env.HOME = fs.mkdtempSync(path.join(os.tmpdir(), "notes-"));
});

test("tests keep away from the real home", () => {
  assert.ok(!settingsPath().startsWith(realHome), settingsPath());
});

test("a changed shortcut comes back", () => {
  save({ theme: "light", shortcut: { brush: "P" } });
  assert.equal(load().shortcut.brush, "P");
});
~~~

- [[realHome]]: بنحفظ البيت الحقيقي الأول، قبل ما نغيّره.
- [[mkdtempSync]]: بيعمل فولدر باسم عشوائي جديد كل مرة.
- [[beforeEach]]: قبل كل اختبار، فكل اختبار ليه بيت لوحده.
- الاختبار الأول حارس: لو حد غيّر الكود بعدين وتجاهل [[HOME]]، يقع فورًا.

---

## ٣. اتأكد بنفسك

~~~bash
before=$(md5sum < ~/.notes-app/settings.json)
node --test --test-reporter=spec good.test.js
after=$(md5sum < ~/.notes-app/settings.json)
[ "$before" = "$after" ] && echo "real settings untouched" || echo "CHANGED"
~~~

~~~text الناتج
✔ tests keep away from the real home
✔ a changed shortcut comes back
ℹ tests 2
ℹ pass 2
real settings untouched
~~~

نجاح الاختبارات مكانش كفاية في الأول، فالدليل هنا هو البصمة.

---

## متغير البيئة لأمر واحد

~~~text HOME=/tmp/fakehome node -e 'console.log(require("node:os").homedir())'
/tmp/fakehome
~~~

على ويندوز [[os.homedir()]] بيقرا [[USERPROFILE]]، وبيانات البرامج غالبًا في [[LOCALAPPDATA]]، فلازم تغيّر اللي برنامجك بيستخدمه. وأي تجربة يدوية لبرنامجك نفسه تقدر تعملها بنفس الطريقة، فيشتغل ببيانات معزولة.

---

## الخلاصة

| الخطوة | ليه |
|---|---|
| نسخة احتياطية **قبل** أول تشغيل | بعدها القديم بيكون راح |
| [[mkdtemp]] لكل اختبار | عزل عن الحقيقي وعن باقي الاختبارات |
| اختبار حارس على المسار | يقع لو حد كسر العزل |
| [[md5sum]] قبل وبعد | دليل، مش افتراض |`,
          lines: [
            R`بصمة الملف قبل التشغيل.`,
            R`اختبار بيكتب في المسار الحقيقي، وبينجح.`,
            R`البصمة اتغيرت: الملف اتكتب فوقه.`,
            R`قارن بالنسخة الاحتياطية بايت بايت.`,
            R`[[HOME]] مختلف للأمر ده بس.`,
            R`اختبار معزول: كل اختبار في بيت مؤقت.`
          ],
          sol: R`الاختبار بينجح، وملف الإعدادات بقى فيه [[light]] و [[brush: P]]، والقيم التانية اتمسحت.`,
        },
        {
          cmd: "اختبار flaky بملف مشترك",
          title: "اختبار بيقع مرة من أربعة: سباق على ملف واحد",
          desc: R`اختبارين بيعدّوا كل واحد لوحده، ولما يشتغلوا مع بعض بيقعوا أحيانًا، لأنهم بيكتبوا في نفس الملف. فشل مرة ماينفعش تتجاهله.

الكشف: شغّلهم ٤٠ مرة وعدّ الفشل. والتأكد: [[--test-concurrency=1]] يخلي الفشل صفر. والحل: كل اختبار ليه ملفه.`,
          example: R`node --test a.test.js b.test.js
./flaky.sh 40 a.test.js b.test.js
node --test --test-concurrency=1 a.test.js b.test.js
CACHE_FILE=/tmp/one.json node --test a.test.js`,
          try: R`شغّل [[node --test a.test.js b.test.js]] عشر مرات يدوي، وعدّ كام مرة وقع. قارن بـ [[flaky.sh 40]]. وبعدين احسب: لو الفشل ٢٥٪، إيه احتمال إن ٥ تشغيلات تعدّي كلها؟`,
          practice: [
            { lvl: 'سريع', t: R`**قارن وقيس:** اختبار بيقع ٢٥٪ من المرات. احسب بـ Node احتمال إن ١ و ٥ و ١٠ و ٢٠ و ٤٠ تشغيل يعدّوا كلهم، وقرر محتاج كام تشغيل عشان تثق.`, done: R`طلعت جدول، وعرفت ليه «عدّى ٣ مرات» مش دليل.`, sol: R`~~~bash
node -e 'for (const n of [1,5,10,20,40]) console.log(n, (0.75 ** n * 100).toFixed(2) + "%")'
~~~

كل تشغيل بينجح باحتمال ٠٫٧٥، و [[**]] هو الأس، فاحتمال نجاح n مرات ورا بعض ٠٫٧٥ أس n. يعني ٥ تشغيلات ناجحة تحصل كل ٤ مرات تقريبًا والمشكلة لسه موجودة.

~~~text الناتج
1 75.00%
5 23.73%
10 5.63%
20 0.32%
40 0.00%
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح:** من غير ما تغيّر [[cache.js]] ولا الاختبارات نفسها، اعمل ملف [[fresh.js]] يتحمّل أول سطر في كل اختبار، ويدّي كل ملف اختبار كاش خاص ويمسحه في الآخر.`, done: R`[[flaky.sh 40]] طلع [[0 failed out of 40]]، ومفيش فولدر فاضل في [[/tmp]].`, sol: R`~~~js fresh.js
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const folder = fs.mkdtempSync(path.join(os.tmpdir(), "cache-"));
process.env.CACHE_FILE = path.join(folder, "cache.json");
process.on("exit", () => fs.rmSync(folder, { recursive: true, force: true }));
~~~

~~~bash
sed -i '1i require("./fresh.js");' a.test.js b.test.js
./flaky.sh 40 a.test.js b.test.js
~~~

لازم يبقى قبل [[require("./cache.js")]]، لأن [[cache.js]] بيقرا [[CACHE_FILE]] وقت التحميل. و [[node --test]] بيشغّل كل ملف في عملية لوحدها، فكل واحد بياخد فولدر. و [[sed '1i ...']] بيضيف سطر في الأول.

~~~text الناتج
0 failed out of 40
~~~` },
            { lvl: 'تحدي', t: R`**اشرحها:** زميلك زوّد [[retries: 3]] والاختبار بقى أخضر. اكتب له في ٣ سطور ليه ده مش حل، وإيه اللي المفروض يتعمل.`, done: R`الرد فيه السبب، والخطر، والخطوة البديلة.`, sol: R`رد نموذجي:

«الـ retry خبّى الفشل بس، والسباق لسه موجود، وممكن يكون بيحصل في الإنتاج كمان لما طلبين يكتبوا في نفس الملف. شغّل الاختبارات بالتتابع: لو الفشل راح، يبقى في مورد مشترك. عدّل الاختبارات تستخدم ملف لكل واحد، وشيل الـ retry، وأكد بـ ٤٠ تشغيل.»

الغلطة الشائعة إنك تعتبر [[--test-concurrency=1]] هو الحل: ده أداة تشخيص، والسباق لسه في الكود.` },
          ],
          deep: {
            why: R`الاختبار الهش بيضيع وقت أكتر من الاختبار الواقع، لأنه بيعلّم الفريق يتجاهل اللون الأحمر ويعمل re-run. وحصلت: اختبار جديد لحفظ الخط فشل مرة واحدة والخاصية سليمة، وكل الاختبارات كانت بتكتب في نفس الملف المؤقت، فواحد بيقرا اللي التاني كتبه.`,
            how: R`[[node --test]] بيشغّل كل ملف اختبار في عملية منفصلة بالتوازي. الاتنين هنا بيستخدموا [[app-cache.json]]. [[writeFile]] بيفضّي الملف الأول وبعدين يكتب، فلو التاني قرا في اللحظة دي بيلاقي ملف فاضي: [[Unexpected end of JSON input]]. ولو مسحه ([[clear]]) وقت القراية يبقى [[ENOENT]].

السباق معناه إن النتيجة بتعتمد على ترتيب مش مضمون. عشان كده تشغيل واحد مش بيثبت حاجة.

خطوات التشخيص: كرّر لحد ما يقع، واقرا الرسالة، وبعدين [[--test-concurrency=1]]: لو الفشل راح يبقى مورد مشترك، ولو فضل يبقى حاجة تانية زي الوقت أو الترتيب.`,
            when: "أول ما اختبار يقع مرة ويعدّي مرة من غير تغيير. وقبل ما تدمج اختبار جديد بيلمس ملف أو قاعدة بيانات أو بورت. ومع Playwright في درس «trace viewer و flaky».",
            mistakes: R`تعمل re-run وتكمل. أو تزوّد retries. أو تشغّل كله بالتتابع كحل دايم فالـ CI يبقى أبطأ والسباق لسه موجود. أو تستخدم [[sleep]]. أو تقول «اتحلت» بعد تشغيل واحد ناجح: لازم عدد كبير. وفي الفولدر المؤقت: اسم ثابت زي [[/tmp/test.json]] هو نفس المشكلة، فاستخدم [[mkdtemp]].`,
          },
          teach: R`## الموقف

كاش صغير في ملف. كل اللي تحت اتشغّل في [[node:22-slim]].

~~~js cache.js
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const FILE = process.env.CACHE_FILE ?? path.join(os.tmpdir(), "app-cache.json");

async function put(key, value) {
  let all = {};
  try {
    all = JSON.parse(await fs.promises.readFile(FILE, "utf8"));
  } catch {}
  all[key] = value;
  await fs.promises.writeFile(FILE, JSON.stringify(all));
}

async function get(key) {
  const all = JSON.parse(await fs.promises.readFile(FILE, "utf8"));
  return all[key];
}

async function clear() {
  await fs.promises.rm(FILE, { force: true });
}

module.exports = { put, get, clear };
~~~

[[??]] معناها «لو الشمال فاضي خد اليمين»: يعني الملف من متغير البيئة، وإلا اسم ثابت في [[/tmp]]. واختبارين عاديين:

~~~js a.test.js
const test = require("node:test");
const assert = require("node:assert");
const { put, get } = require("./cache.js");

test("keeps a user", async () => {
  await put("user", "sara");
  assert.equal(await get("user"), "sara");
});
~~~

~~~js b.test.js
const test = require("node:test");
const assert = require("node:assert");
const { put, get, clear } = require("./cache.js");

test("clear empties it", async () => {
  await put("order", 7);
  await clear();
  await assert.rejects(get("order"));
});
~~~

---

## ١. تشغيلة واحدة: كله تمام

~~~text node --test --test-reporter=spec a.test.js b.test.js
✔ keeps a user
✔ clear empties it
ℹ tests 2
ℹ pass 2
ℹ fail 0
~~~

لو وقفت هنا، هتدمج الكود.

---

## ٢. كرّر وعدّ

~~~bash flaky.sh
#!/usr/bin/env bash
# Run the tests many times and count the failures.
runs=$__{1:-20}
fails=0
for i in $(seq 1 "$runs"); do
  node --test "$__{@:2}" > /tmp/run.log 2>&1 || fails=$((fails + 1))
done
echo "$fails failed out of $runs"
~~~

- [[$__{1:-20}]]: أول معامل، أو ٢٠ لو مفيش.
- [[$__{@:2}]]: باقي المعاملات من التاني.
- [[|| fails=...]]: لو الأمر فشل زوّد العداد.

~~~text ./flaky.sh 40 a.test.js b.test.js
10 failed out of 40
~~~

ربع المرات. الرقم بيتغير من تشغيل للتاني وعلى كل جهاز، فالمهم إنه مش صفر.

---

## ٣. اقرا رسالة الفشل

~~~text الناتج
✖ keeps a user
✔ clear empties it
ℹ tests 2
ℹ pass 1
ℹ fail 1

✖ failing tests:

test at a.test.js:5:1
✖ keeps a user
  SyntaxError: Unexpected end of JSON input
      at JSON.parse (<anonymous>)
      at get (/tmp/b/cache.js:17:20)
~~~

الاختبار اللي وقع مالوش ذنب: [[Unexpected end of JSON input]] معناها الملف كان فاضي لحظة القراية، لأن [[writeFile]] في اختبار تاني كان بيكتب.

---

## ٤. اثبت السبب

~~~text node --test --test-concurrency=1 (٤٠ مرة)
0 failed out of 40
~~~

من ١٠ لصفر لما اشتغلوا بالتتابع: يبقى السبب إنهم بيشتغلوا مع بعض. ده تشخيص، مش حل. السباق موجود، وبس مش بيظهر.

---

## ٥. الحل: كل اختبار ليه ملفه

~~~js أول a.test.js و b.test.js
process.env.CACHE_FILE = require("node:path").join(
  require("node:fs").mkdtempSync(require("node:path").join(require("node:os").tmpdir(), "t-")),
  "c.json",
);
~~~

لازم **قبل** [[require("./cache.js")]]. والأشيك ملف مساعد، وده في التمرين.

~~~text ./flaky.sh 40 a2.test.js b2.test.js
0 failed out of 40
~~~

ودلوقتي بيشتغلوا بالتوازي بسرعتهم الكاملة.

---

## الخلاصة

| الخطوة | الأداة | النتيجة هنا |
|---|---|---|
| كشف | تشغيل متكرر | ١٠ من ٤٠ |
| قراية | الرسالة | ملف فاضي لحظة القراية |
| إثبات | [[--test-concurrency=1]] | صفر |
| حل | ملف لكل اختبار | صفر بالتوازي |
| تأكيد | تشغيل متكرر تاني | ٠ من ٤٠ |`,
          lines: [
            R`تشغيلة واحدة: غالبًا بتعدّي، ودي المشكلة.`,
            R`شغّلهم ٤٠ مرة وعدّ الفشل.`,
            R`بالتتابع: تشخيص يثبت إن السبب التوازي.`,
            R`ملف خاص عن طريق متغير البيئة.`
          ],
          sol: R`هتلاقي الفشل أحيانًا بس، وممكن ٥ تشغيلات تعدّي. لو الفشل ٢٥٪ فاحتمال ٥ تشغيلات ناجحة ٠٫٧٥ أس ٥ يعني حوالي ٢٤٪.`,
        },
        {
          cmd: "ميزانية الزمن",
          title: "المتوسط ممتاز و ١٠ فريمات متأخرة: قِس بالميزانية",
          desc: R`الميزانية هي الوقت اللي معاك: ١٢ فريم في الثانية يعني ٨٣ مللي ثانية للفريم. المتوسط بيخبّي الحالات الوحشة، فقارن الوسيط و p95 والأسوأ وعدد اللي عدّوا الميزانية.

وقِس بالشكل الحقيقي للاستخدام قبل ما تبني أي تحسين.`,
          example: R`node budget.js
node -e 'console.log((1000 / 12).toFixed(1), (1000 / 60).toFixed(1), (1000 / 200).toFixed(1))'
node measure.js`,
          try: R`في [[budget.js]] غيّر [[240]] لـ [[60]] وشغّله: كام فريم متأخر؟ وبعدين رجّعها وغيّر [[frame % 40]] لـ [[frame % 5]]. قبل كل تشغيل اكتب توقعك للمتوسط والأسوأ.`,
          practice: [
            { lvl: 'سريع', t: R`**قارن وقيس:** احسب ميزانية ١٢ و ٢٤ و ٣٠ و ٦٠ فريم في الثانية، وقلم بيبعت ٢٠٠ نقطة في الثانية.`, done: R`طلع جدول، وعرفت ليه ٥ مللي ثانية للقلم أصعب من ٨٣ للفريم.`, sol: R`~~~bash
node -e 'for (const [n, hz] of [["12 fps",12],["24 fps",24],["30 fps",30],["60 fps",60],["pen",200]]) console.log(n, (1000/hz).toFixed(1) + " ms")'
~~~

الميزانية ١٠٠٠ على عدد المرات في الثانية. والقلم أضيق، ولو اتأخر بتحس بيه فورًا لأن الخط بيتأخر عن إيدك.

~~~text الناتج
12 fps 83.3 ms
24 fps 41.7 ms
30 fps 33.3 ms
60 fps 16.7 ms
pen 5.0 ms
~~~` },
            { lvl: 'تطبيق', t: R`**اكتب أداة:** دالة [[measure(name, budget, times, work)]] تشغّل أي شغل، وترجّع سطر فيه الوسيط و p95 والأسوأ وعدد المتأخرين، والسكربت يطلع بفشل لو في تأخير. جرّبها على ترتيب ١٠٠٠ و ٢٠٠٠٠٠ رقم بميزانية ٥ مللي ثانية.`, done: R`الأول بدون تأخير، والتاني كله متأخر، و exit code [[1]].`, sol: R`~~~js measure.js
function measure(name, budget, times, work) {
  const took = [];
  for (let i = 0; i < times; i++) {
    const start = performance.now();
    work(i);
    took.push(performance.now() - start);
  }
  took.sort((a, b) => a - b);
  const at = (p) => took[Math.floor((took.length - 1) * p)];
  const late = took.filter((t) => t > budget).length;
  const line = name + ": median " + at(0.5).toFixed(2) + ", p95 " + at(0.95).toFixed(2) + ", worst " + at(1).toFixed(2) + " ms, " + late + " late";
  return { line, ok: late === 0 };
}

const fast = measure("sort 1000", 5, 200, () => Array.from({ length: 1000 }, (_, i) => (i * 7919) % 1000).sort((a, b) => a - b));
const slow = measure("sort 200000", 5, 20, () => Array.from({ length: 200000 }, (_, i) => (i * 7919) % 200000).sort((a, b) => a - b));
console.log(fast.line);
console.log(slow.line);
process.exitCode = fast.ok && slow.ok ? 0 : 1;
~~~

الترتيب لازم يبقى رقمي بـ [[(a, b) => a - b]]، لأن [[sort()]] لوحدها بترتب كنص. و [[process.exitCode]] بيخلي الأداة تنفع في CI. الأرقام من الحاوية عندنا، وهتختلف عندك.

~~~text الناتج
sort 1000: median 0.15, p95 0.25, worst 0.60 ms, 0 late
sort 200000: median 45.70, p95 48.52, worst 49.83 ms, 20 late
exit 1
~~~` },
            { lvl: 'تحدي', t: R`**اشرحها:** مديرك بيقول «المتوسط ٨ مللي ثانية والميزانية ٨٣، فمفيش مشكلة». رد عليه في ٣ سطور بأرقام المثال.`, done: R`الرد فيه رقم الأسوأ، وعدد الفريمات المتأخرة، وترجمتها لتجربة المستخدم.`, sol: R`رد نموذجي:

«المتوسط ٨٫٣، بس ١٠ فريمات من ٤٠٠ أخدوا فوق ٨٣، وأسوأهم ١٢٤. يعني مرة كل ٣ ثواني تقريبًا الفريم بيتأخر والمستخدم هيشوف تقطيعة. المتوسط بيوزّع الفريمات البطيئة على الباقي، فلازم نبص على عدد اللي عدّوا الميزانية.»

٤٠ فريم على ١٢ في الثانية حوالي ٣٫٣ ثانية، وده اللي بيحسب «كل ٣ ثواني».` },
          ],
          deep: {
            why: R`حصلت في برنامج أنيميشن بالاتجاهين. مرة قدّرنا حلقة ٥ دقايق بـ ٦٠٠٠ رسمة، والفتح ١١ ثانية، وكنا هنبني كاش وتحميل كسول. لما بنينا مشروع بشكله الفعلي (خلفيات ثابتة وأجزاء متحركة) طلع ٨٠١ رسمة، والفتح ١٫٧ ثانية، والفريم ٣١ مللي ثانية من ٨٣، فالشغل ده اتلغى. ومرة تانية القياس ورّى إن الحفظ ١١ ثانية فعلًا في الحجم الكبير، فاتعمل حفظ جزئي نزّله لثانية. القرار جه من الرقم في المرتين.`,
            how: R`الميزانية ١٠٠٠ على عدد المرات في الثانية. قِس الزمن حوالين الشغل بساعة دقيقة، زي [[performance.now()]]، واجمع القيم، ورتّبها.

- **المتوسط:** الإجمالي على العدد. بيتأثر بالقيم الكبيرة، بس بيخبّيها وسط الكتير.
- **الوسيط (median, p50):** النص. ده الوضع العادي.
- **p95:** ٩٥٪ أقل منه.
- **الأسوأ:** أكبر قيمة. مهم في حاجة بتتحس زي القلم والفريمات.
- **عدد المتأخرين:** أوضح رقم: كام مرة فشلت في الميزانية.

ولازم تقيس بنسخة release وببيانات بشكل الاستخدام الحقيقي، وكرّر عشان تعرف الفرق الطبيعي بين التشغيلات.`,
            when: "أي حاجة لها وقت محدد: رسم فريم، رد على ضغطة، استجابة API، خطوة في طابور. قبل ما تبني cache أو توازي، وبعد التعديل عشان تثبت إنه فرق. وخلّي القياس أداة بتتعاد.",
            mistakes: R`تقيس في وضع debug، وعلى بيانات صغيرة، أو على أسوأ حالة نظرية بس فتحل مشكلة مش موجودة، أو على الحالة العادية بس فتفوتك اللي بتتحس. أو تصدّق المتوسط لوحده. أو تقارن رقمين من تشغيلة واحدة. أو تحسّن قبل ما تقيس.`,
          },
          teach: R`## الفكرة

برنامج بيعرض ١٢ فريم في الثانية. الثانية ١٠٠٠ مللي ثانية، فكل فريم معاه ١٠٠٠ ÷ ١٢ = ٨٣٫٣. ده الميزانية. لو فريم أخد أكتر، الصورة بتتأخر.

هنعمل برنامج شكله كويس، وفيه مشكلة المتوسط مش هيقولك عليها. كله اتشغّل في [[node:22-slim]]، والأرقام من جهازنا، وهتختلف عندك.

~~~js budget.js
// How long does one frame take, against what the frame rate allows?
const fps = 12;
const budget = 1000 / fps;

// Most frames are simple; every 40th has a whole crowd on it.
function drawFrame(frame) {
  const layers = frame % 40 === 0 ? 240 : 12;
  let sum = 0;
  for (let l = 0; l < layers; l++) {
    for (let i = 0; i < 400_000; i++) sum += (i * l) % 7;
  }
  return sum;
}

const times = [];
for (let frame = 0; frame < 400; frame++) {
  const start = performance.now();
  drawFrame(frame);
  times.push(performance.now() - start);
}

times.sort((a, b) => a - b);
const at = (p) => times[Math.floor((times.length - 1) * p)];
const average = times.reduce((a, b) => a + b, 0) / times.length;
const late = times.filter((t) => t > budget).length;

console.log("budget:  " + budget.toFixed(1) + " ms a frame");
console.log("average: " + average.toFixed(1) + " ms");
console.log("median:  " + at(0.5).toFixed(1) + " ms");
console.log("p95:     " + at(0.95).toFixed(1) + " ms");
console.log("worst:   " + at(1).toFixed(1) + " ms");
console.log("late:    " + late + " of " + times.length + " frames");
~~~

- [[drawFrame]]: شغل وهمي بيمثل الرسم. كل فريم ١٢ طبقة، وكل ٤٠ فريم مشهد زحمة بـ ٢٤٠.
- [[performance.now()]]: ساعة بكسور المللي ثانية.
- [[(a, b) => a - b]]: ترتيب رقمي.
- [[at(p)]]: القيمة عند نسبة من القايمة المرتبة، يعني [[at(0.5)]] الوسيط و [[at(1)]] الأسوأ.
- [[reduce]]: بيجمع القيم.
- [[filter]]: عدد اللي عدّوا الميزانية.

---

## ١. النتيجة

~~~text node budget.js
budget:  83.3 ms a frame
average: 8.3 ms
median:  5.5 ms
p95:     7.5 ms
worst:   124.1 ms
late:    10 of 400 frames
~~~

| الرقم | القراءة |
|---|---|
| المتوسط ٨٫٣ | عُشر الميزانية، شكله ممتاز |
| الوسيط ٥٫٥ | الفريم العادي |
| p95 ٧٫٥ | حتى ده مش شايف المشكلة! |
| الأسوأ ١٢٤ | فوق الميزانية بـ ٥٠٪ |
| متأخر ١٠ | المستخدم هيحس بيهم |

الفريمات البطيئة ٢٫٥٪ بس، فـ p95 نفسه ماشافهاش. عشان كده عدد المتأخرين أصدق رقم لما يكون عندك حد ثابت.

تشغيلة تانية طلعت [[8.2]] و [[141.7]] و ١٠ متأخرين: الأسوأ بيتحرك كتير، بس العدد ثابت.

---

## ٢. قِس الشكل الحقيقي

الرقم ده من حالة حقيقية:

| | التقدير | القياس |
|---|---|---|
| عدد الرسومات في حلقة ٥ دقايق | ٦٠٠٠ | ٨٠١ |
| الفتح | ١١ ثانية | ١٫٧ ثانية |
| الفريم | | ٣١ من ٨٣ مللي ثانية |
| القرار | كاش وتحميل كسول | مفيش داعي |

التقدير افترض كل فريم مرسوم بالإيد على ٣ طبقات. الواقع خلفيات ثابتة وأجزاء بتتحرك، فالعدد نزل لأقل من السبع.

---

## ٣. قيس أسوأ حجم برضه

وفي نفس المشروع، الفرش بحجم ٤٠٠ (أكبر حجم، مش العادي) أخدت ١٫٢ مللي ثانية للنقطة في المتوسط و٣٫٣ في أسوأ حالة، والميزانية ٥، فمفيش تحسين. ولو كنا قسنا الحجم العادي بس، ماكناش هنعرف.

القاعدة: الشكل العادي عشان تعرف تحسّن إيه، وأكبر حالة معقولة عشان تعرف الحد.

---

## ٤. حط القياس مكان ما يتعاد

خلّيه أمر بيتشغل، مش تجربة بتتمسح. لو الأداة بترجّع exit code، تقدر تحطها في CI تقع لو حد بطّأ الكود. وفي الاختبارات العادية مش أحسن مكان، لأن أجهزة CI بتختلف في السرعة، فميزانية واسعة أو تشغيل منفصل.

---

## الخلاصة

| السؤال | الرقم |
|---|---|
| معايا قد إيه؟ | ١٠٠٠ ÷ عدد المرات في الثانية |
| الوضع العادي؟ | الوسيط |
| فيه تقطيع؟ | عدد المتأخرين والأسوأ |
| أبني تحسين؟ | قِس الشكل الحقيقي الأول |`,
          lines: [
            R`قِس ٤٠٠ فريم واطبع المتوسط والوسيط و p95 والأسوأ وعدد المتأخرين.`,
            R`ميزانية ١٢ و ٦٠ فريم في الثانية، و ٢٠٠ نقطة في الثانية.`,
            R`أداة قياس عامة بتطلع بفشل لو في تأخير.`
          ],
          sol: R`مع [[60]] بدل [[240]]: [[worst 29.4 ms]] و [[late 0 of 400]]، يعني مفيش مشكلة. ومع [[frame % 5]]: [[average 25.6]] و [[p95 107.1]] و [[worst 118.5]] و [[late 80 of 400]]. مشاهد الزحمة بقت ٢٠٪ من الفريمات، فـ p95 شافها، والمتوسط لسه أقل من الميزانية بكتير رغم إن خُمس الفريمات متأخرة.`,
        },
      ]
    },
]);
