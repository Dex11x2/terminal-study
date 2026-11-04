// بيولّد js/meta.js (أسامي التابات وعدد دروسها، للصفحة الرئيسية) و js/search-index.js (أسامي الدروس وعناوينها، للبحث في باقي التابات).
// الصفحة بقت بتحمّل ملفات التاب لما يتفتح، فالاتنين دول هما اللي بيخلّوها تعرف باقي التابات من غير ما تحمّلها.
// tools/check.js بيناديه: بيكتبهم لو اتغيروا، وفي CI بيفشل لو حد نسي يرفعهم.
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..');
const META = path.join(ROOT, 'js', 'meta.js'), INDEX = path.join(ROOT, 'js', 'search-index.js');

function render(DATA, SHELLS) {
  const meta = {}, index = {};
  for (const k of Object.keys(DATA)) {
    meta[k] = { label: SHELLS[k].label, prompt: SHELLS[k].prompt, n: DATA[k].reduce((a, c) => a + c.items.length, 0) };
    index[k] = DATA[k].flatMap(c => c.items.map(it => [it[0], it[1] || '']));
  }
  return {
    meta: '// اتولّد بـ tools/meta.js من ملفات التابات، متعدلوش بإيدك\nconst TAB_META = ' + JSON.stringify(meta) + ';\n',
    index: '// اتولّد بـ tools/meta.js من ملفات التابات، متعدلوش بإيدك\nconst SEARCH_INDEX = ' + JSON.stringify(index) + ';\n',
  };
}

// writes both files when they changed; on CI a stale file is an error instead
function sync(DATA, SHELLS) {
  const { meta, index } = render(DATA, SHELLS), stale = [];
  for (const [f, text] of [[META, meta], [INDEX, index]]) {
    const old = fs.existsSync(f) ? fs.readFileSync(f, 'utf8') : '';
    if (old === text) continue;
    stale.push(path.relative(ROOT, f));
    if (!process.env.CI) fs.writeFileSync(f, text);
  }
  return stale;
}

module.exports = { render, sync };
