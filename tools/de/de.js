// The German course's checks and audio. Reads every German line of the language tabs (the ~~~de, ~~~words,
// ~~~dictate, ~~~speak, ~~~hear and ~~~read fences in js/tabs/dea1/), the same way js/lang.js reads them on the page.
// Lines with no sound (the questions and options of ~~~hear, every line of ~~~read) come back with audio: false: lt checks them, audio skips them.
//   node tools/de/de.js list            every line, its voice and its audio file (and which files are missing)
//   node tools/de/de.js audio           makes the missing mp3s with Piper in Docker, has whisper write each one back, and
//                                       records what it heard in audio/de/index.json; prints every line whisper heard differently
//   node tools/de/de.js lt [04.js]      sends every line (or one file's lines) to LanguageTool (docker run -d --name lt -p 127.0.0.1:8010:8081 meyay/languagetool)
//   node tools/de/de.js audio --cb      the same with Chatterbox on the GPU (image de-cb, tools/de/chatterbox), the course voice
//   node tools/de/de.js cb start|status|collect   remakes every file with Chatterbox in a detached container (hours)
//   node tools/de/de.js prune           lists mp3s no line uses any more (deletes them with --yes)
// tools/check.js uses collect() so a line without its audio fails `npm run check`.
const fs = require('fs'), path = require('path'), vm = require('vm'), { execFileSync } = require('child_process');
const ROOT = path.join(__dirname, '..', '..');
const TABS = ['dea1'];
const AUDIO = path.join(ROOT, 'audio', 'de'), INDEX = path.join(AUDIO, 'index.json');

// deHash, deLine, deSpeakers and deFile come from js/lang.js itself, so the file names can't drift apart
const ctx = { console };
vm.runInNewContext(fs.readFileSync(path.join(ROOT, 'js', 'lang.js'), 'utf8') + '\n;this.L = {deHash, deLine, deSpeakers, deFile, deSpeech, deExample};', ctx);
const { deLine, deSpeakers, deFile, deSpeech, deExample } = ctx.L;

function collect() {
  const lines = [];
  for (const tab of TABS) {
    const dir = path.join(ROOT, 'js', 'tabs', tab);
    if (!fs.existsSync(dir)) continue;
    for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.js')).sort()) {
      const src = fs.readFileSync(path.join(dir, f), 'utf8');
      // a fence can close right before the template's backtick («~~~`,»): that line ends it too
      for (const m of src.matchAll(/^[ \t]*~~~(de|words|dictate|speak|hear)([^\n]*)\n([\s\S]*?)^[ \t]*~~~[ \t]*(?:`.*)?$/gm)) {
        const kind = m[1], head = m[2].trim(), sp = deSpeakers(head), at = f + ':' + (src.slice(0, m.index).split('\n').length + 1);
        for (const raw of m[3].split('\n')) {
          const l = raw.trim();
          if (!l) continue;
          if (kind === 'words') {
            const [w, , ex] = l.split(' | ').map(s => (s || '').trim());
            lines.push({ text: w, voice: 'm', at, kind });
            const [exT, exV] = deExample(ex);
            if (exT) lines.push({ text: exT, voice: exV, at, kind });
          } else {
            // questions and options have no sound, and neither has a reading text; their German still goes to LanguageTool
            if (kind === 'read' || (kind === 'hear' && (l.startsWith('? ') || l.startsWith('- ')))) {
              const t = l.replace(/^[?-] /, '').split(' || ')[0].replace(/ \*$/, '').trim();
              if (t) lines.push({ text: t, voice: '', at, kind, audio: false });
              continue;
            }
            const x = deLine(l, kind === 'de' || kind === 'hear' ? sp : {});
            // a dictation line «S, A, L, A, H => Salah» sounds its left side; the right side is only the answer
            lines.push({ text: kind === 'dictate' ? x.de.split(' => ')[0] : x.de, voice: x.voice, at, kind });
          }
        }
      }
    }
  }
  for (const l of lines) if (l.audio !== false) l.file = deFile(l.text, l.voice);
  return lines;
}
const unique = lines => [...new Map(lines.map(l => [l.file, l])).values()];
const readIndex = () => fs.existsSync(INDEX) ? JSON.parse(fs.readFileSync(INDEX, 'utf8')) : {};
// what whisper wrote vs the line: case, punctuation and spacing don't count, and numbers it writes as digits are fine
// whisper writes numbers as digits («dreizehn» -> «13»), so number words 0–99 become digits on both sides before comparing
const UNITS = ['null', 'eins', 'zwei', 'drei', 'vier', 'fünf', 'sechs', 'sieben', 'acht', 'neun', 'zehn', 'elf', 'zwölf', 'dreizehn', 'vierzehn', 'fünfzehn', 'sechzehn', 'siebzehn', 'achtzehn', 'neunzehn'];
const TENS = { zwanzig: 20, dreißig: 30, vierzig: 40, fünfzig: 50, sechzig: 60, siebzig: 70, achtzig: 80, neunzig: 90, hundert: 100 };
const numWord = w => {
  if (UNITS.includes(w)) return UNITS.indexOf(w);
  if (w === 'ein' || w === 'eine') return null;
  if (TENS[w]) return TENS[w];
  const m = w.match(/^(ein|zwei|drei|vier|fünf|sechs|sieben|acht|neun)und(zwanzig|dreißig|vierzig|fünfzig|sechzig|siebzig|achtzig|neunzig)$/);
  return m ? TENS[m[2]] + (m[1] === 'ein' ? 1 : UNITS.indexOf(m[1])) : null;
};
const norm = s => s.toLowerCase().normalize('NFC').replace(/[^\p{L}\p{N} ]/gu, ' ').replace(/\s+/g, ' ').trim()
  .split(' ').map(w => { const n = numWord(w); return n === null ? w : String(n); }).join(' ');

// the same score as tools/de/cb.py (keep the two alike): the share of the line's words whisper heard, minus the words it
// heard that the line doesn't have (Chatterbox sometimes says a short word twice: «unmöglich, unmöglich»)
const NUMW = /^(null|eins?|zwei|drei|vier|fünf|sechs|sieben|acht|neun|zehn|elf|zwölf|\p{L}*zehn|\p{L}*zig|\p{L}*ßig|hundert|\p{L}*tausend\p{L}*|\p{L}*hundert\p{L}*|\d+)$/u;
const ABBR = new Set(['cm', 'mm', 'm', 'km', 'kg', 'g', 'l', 'ml', 'qm', 'm²', 'ca', 'z', 'b']);
const toks = s => (s || '').toLowerCase().replace(/'/g, '').match(/[\p{L}\p{N}_²]+/gu) || [];
function score(text, heard) {
  const count = ws => ws.reduce((m, w) => m.set(w, (m.get(w) || 0) + 1), new Map());
  const want = count(toks(text).filter(w => !NUMW.test(w))), got = count(toks(heard).filter(w => !NUMW.test(w) && !ABBR.has(w)));
  const n = [...want.values()].reduce((a, b) => a + b, 0);
  if (!n) return 1;
  let hit = 0, extra = 0;
  for (const [w, c] of want) hit += Math.min(c, got.get(w) || 0);
  for (const [w, c] of got) extra += Math.max(0, c - (want.get(w) || 0));
  return Math.max(0, Math.round((hit - extra) / n * 100) / 100);
}

// Chatterbox repeats some short lines in all 3 takes («unfreundlich, unfreundlich»), where Piper says them cleanly. So a
// Chatterbox file under 0.9 is made with Piper too, and the one whisper hears better stays (engine: "piper", and the
// Chatterbox result kept under cb, so cb start doesn't queue it again).
function piperFallback(idx) {
  const weak = Object.entries(idx).filter(([, r]) => r.engine === 'cb' && score(r.text, r.heard) < 0.9);
  if (!weak.length) return 0;
  const dir = path.join(ROOT, '.cache', 'de', 'fallback');
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'jobs.json'), JSON.stringify(weak.map(([f, r]) => ({ text: deSpeech(r.text), voice: r.voice, out: '.cache/de/fallback/' + f }))));
  console.log(`${weak.length} Chatterbox files under 0.9: trying Piper on them…`);
  const res = JSON.parse(execFileSync('docker', ['run', '--rm', '-v', ROOT + ':/w', '-w', '/w', 'de-tools', 'python', 'tools/de/tts.py', '.cache/de/fallback/jobs.json'],
    { encoding: 'utf8', maxBuffer: 64 << 20, env: { ...process.env, MSYS_NO_PATHCONV: '1' }, stdio: ['ignore', 'pipe', 'ignore'] }));
  let n = 0;
  for (const p of res) {
    const f = path.basename(p.out), r = idx[f], cbS = score(r.text, r.heard), piS = score(r.text, p.heard);
    if (piS > cbS) {
      fs.copyFileSync(path.join(ROOT, p.out), path.join(AUDIO, f));
      idx[f] = { text: r.text, voice: r.voice, heard: p.heard, score: piS, take: p.take, engine: 'piper', cb: { heard: r.heard, score: cbS } };
      n++;
      console.log(`  piper ${piS} > cb ${cbS}  «${r.text}»`);
    }
  }
  fs.rmSync(dir, { recursive: true, force: true });
  return n;
}

// the lines that need an mp3 (check.js, list, audio, prune)
const sounded = () => collect().filter(l => l.audio !== false);
module.exports = { collect, sounded };

if (require.main === module) {
  const cmd = process.argv[2] || 'list';
  const every = collect(), lines = every.filter(l => l.audio !== false), all = unique(lines);
  if (cmd === 'list') {
    for (const l of all) console.log((fs.existsSync(path.join(ROOT, l.file)) ? '  ' : '✗ ') + l.voice + ' ' + path.basename(l.file) + '  ' + l.text);
    console.log(`${lines.length} lines, ${all.length} audio files, ${all.filter(l => !fs.existsSync(path.join(ROOT, l.file))).length} missing`);
  }
  // Chatterbox downloads a 34 MB word splitter (spacy_ontonotes, for Chinese) into ~/.pkuseg the first time it runs; a
  // container made with --rm forgets it, so every run downloaded it again (and one run died when the download broke)
  const CB_KEEP = ['-v', path.join(ROOT, '.cache', 'de', 'pkuseg') + ':/root/.pkuseg'];
  if (cmd === 'audio') {
    fs.mkdirSync(AUDIO, { recursive: true });
    const idx = readIndex(), todo = all.filter(l => !fs.existsSync(path.join(ROOT, l.file)));
    if (todo.length) {
      const jobs = path.join(ROOT, '.cache', 'de', 'tts-jobs.json');
      fs.mkdirSync(path.dirname(jobs), { recursive: true });
      fs.writeFileSync(jobs, JSON.stringify(todo.map(l => ({ text: deSpeech(l.text), voice: l.voice, out: l.file }))));
      console.log(`making ${todo.length} files…`);
      // --cb: Chatterbox on the GPU (the course voice since 25 Nov), else Piper
      const cb = process.argv.includes('--cb');
      // Chatterbox prints its own lines on stdout («loaded PerthNet…»), so its results come from a log file (one JSON line a
      // file, written as each one finishes) instead of stdout; a run that stops halfway keeps what it made.
      const cbLog = '.cache/de/tts-done.jsonl';
      if (cb) fs.rmSync(path.join(ROOT, cbLog), { force: true });
      const args = cb ? ['run', '--rm', '--gpus', 'all', ...CB_KEEP, '-v', ROOT + ':/w', '-w', '/w', 'de-cb', 'python', 'tools/de/cb.py', '.cache/de/tts-jobs.json', 'de', cbLog]
        : ['run', '--rm', '-v', ROOT + ':/w', '-w', '/w', 'de-tools', 'python', 'tools/de/tts.py', '.cache/de/tts-jobs.json'];
      let res = [], failed = null;
      try {
        const out = execFileSync('docker', args, { encoding: 'utf8', maxBuffer: 64 << 20, env: { ...process.env, MSYS_NO_PATHCONV: '1' }, stdio: ['ignore', 'pipe', 'inherit'] });
        if (!cb) res = JSON.parse(out);
      } catch (e) { failed = e; }
      if (cb && fs.existsSync(path.join(ROOT, cbLog))) res = fs.readFileSync(path.join(ROOT, cbLog), 'utf8').split('\n').filter(Boolean).map(l => JSON.parse(l));
      if (failed) console.error(`the run stopped (${failed.message.split('\n')[0]}); the ${res.length} files it finished are kept`);
      for (const r of res) { const l = todo.find(x => x.file === r.out); idx[path.basename(r.out)] = { text: l.text, voice: l.voice, heard: r.heard, score: r.score, take: r.take, ...(cb ? { engine: 'cb' } : {}) }; }
      if (cb) console.log(`${piperFallback(idx)} files went back to Piper`);
      const sorted = Object.fromEntries(Object.entries(idx).sort());
      fs.writeFileSync(INDEX, JSON.stringify(sorted, null, 1) + '\n');
    }
    // the flags are worked out again on every run, so a change to norm() reaches the old files too
    for (const r of Object.values(idx)) r.ok = norm(r.heard) === norm(r.text);
    fs.writeFileSync(INDEX, JSON.stringify(Object.fromEntries(Object.entries(idx).sort()), null, 1) + '\n');
    const rows = all.map(l => idx[path.basename(l.file)]).filter(Boolean), bad = rows.filter(r => !r.ok);
    const weak = bad.filter(r => r.score !== undefined && r.score < 0.8);
    console.log(`${all.length} files; whisper heard ${rows.length - bad.length} exactly, ${bad.length} differently, ${weak.length} of them with under 80% of the words (listen to those):`);
    for (const r of bad.sort((a, b) => (a.score ?? 1) - (b.score ?? 1))) console.log(`  ${r.score ?? '-'} ${r.voice} «${r.text}»  ->  «${r.heard}»${r.take ? '  (take ' + (r.take + 1) + ')' : ''}`);
  }
  if (cmd === 'lt') {
    (async () => {
      let n = 0;
      // «lt 04.js» checks one file's lines only (a new unit), the whole course takes about 12 minutes
      const only = process.argv[3], texts = [...new Map(every.filter(l => !only || l.at.startsWith(only + ':')).map(l => [l.text, l])).values()];
      for (const l of texts) {
        const body = new URLSearchParams({ text: l.text, language: 'de-DE' });
        const r = await (await fetch('http://127.0.0.1:8010/v2/check', { method: 'POST', body })).json();
        for (const m of r.matches) { n++; console.log(`${l.at}  «${l.text}»\n    ${m.rule.id}: ${m.message}  -> ${m.replacements.slice(0, 3).map(x => x.value).join(' / ')}`); }
      }
      console.log(`${texts.length} lines checked, ${n} LanguageTool matches`);
    })();
  }
  // Remaking every file with Chatterbox takes hours, so it runs as a detached container (docker run -d) that survives this
  // shell, writes each finished line to .cache/de/cb-done.jsonl, and skips lines already there when started again.
  //   node tools/de/de.js cb start     every file not made by Chatterbox yet -> .cache/de/cb-jobs.json, then the container
  //   node tools/de/de.js cb status    how far it is, and the time left at the current speed
  //   node tools/de/de.js cb collect   moves the finished lines into audio/de/index.json (engine: "cb"), then piperFallback
//   node tools/de/de.js fallback     piperFallback alone, on every Chatterbox file under 0.9
  if (cmd === 'cb') {
    const sub = process.argv[3] || 'status', idx = readIndex();
    const jobsF = path.join(ROOT, '.cache', 'de', 'cb-jobs.json'), logF = path.join(ROOT, '.cache', 'de', 'cb-done.jsonl');
    const doneRows = () => fs.existsSync(logF) ? fs.readFileSync(logF, 'utf8').split('\n').filter(Boolean).map(l => JSON.parse(l)) : [];
    if (sub === 'start') {
      const todo = all.filter(l => { const r = idx[path.basename(l.file)] || {}; return r.engine !== 'cb' && !r.cb; });
      fs.mkdirSync(path.dirname(jobsF), { recursive: true });
      fs.writeFileSync(jobsF, JSON.stringify(todo.map(l => ({ text: deSpeech(l.text), voice: l.voice, out: l.file }))));
      const env = { ...process.env, MSYS_NO_PATHCONV: '1' };
      try { execFileSync('docker', ['rm', '-f', 'de-cb-run'], { env, stdio: 'ignore' }); } catch (e) { /* not there */ }
      execFileSync('docker', ['run', '-d', '--name', 'de-cb-run', '--gpus', 'all', ...CB_KEEP, '-v', ROOT + ':/w', '-w', '/w', 'de-cb',
        'python', 'tools/de/cb.py', '.cache/de/cb-jobs.json', 'de', '.cache/de/cb-done.jsonl'], { env, stdio: 'inherit' });
      console.log(`${todo.length} files queued; follow with: docker logs -f de-cb-run  or  node tools/de/de.js cb status`);
    }
    if (sub === 'status') {
      const jobs = fs.existsSync(jobsF) ? JSON.parse(fs.readFileSync(jobsF, 'utf8')) : [], rows = doneRows();
      const last = rows.slice(-50), sec = last.reduce((s, r) => s + r.sec, 0) / (last.length || 1), left = jobs.length - rows.length;
      console.log(`${rows.length} of ${jobs.length} done, ${left} left, about ${(left * sec / 3600).toFixed(1)} hours at ${sec.toFixed(1)}s a file`);
      console.log(`${rows.filter(r => r.score < 0.8).length} with under 80% of the words heard so far`);
    }
    if (sub === 'collect') {
      const rows = doneRows(), byFile = new Map(all.map(l => [l.file, l]));
      let n = 0;
      for (const r of rows) {
        const l = byFile.get(r.out), f = path.basename(r.out);
        if (!l || (idx[f] && idx[f].cb)) continue; // gone from the course, or Piper already won this one
        idx[f] = { text: l.text, voice: l.voice, heard: r.heard, score: r.score, take: r.take, engine: 'cb' }; n++;
      }
      console.log(`${n} files now marked as Chatterbox in audio/de/index.json`);
      if (!process.argv.includes('--no-piper')) console.log(`${piperFallback(idx)} files went back to Piper`);
      for (const r of Object.values(idx)) r.ok = norm(r.heard) === norm(r.text);
      fs.writeFileSync(INDEX, JSON.stringify(Object.fromEntries(Object.entries(idx).sort()), null, 1) + '\n');
    }
  }
  if (cmd === 'fallback') {
    const idx = readIndex(), n = piperFallback(idx);
    for (const r of Object.values(idx)) r.ok = norm(r.heard) === norm(r.text);
    fs.writeFileSync(INDEX, JSON.stringify(Object.fromEntries(Object.entries(idx).sort()), null, 1) + '\n');
    console.log(`${n} files went back to Piper`);
  }
  if (cmd === 'prune') {
    const used = new Set(all.map(l => path.basename(l.file)));
    const extra = fs.existsSync(AUDIO) ? fs.readdirSync(AUDIO).filter(f => f.endsWith('.mp3') && !used.has(f)) : [];
    for (const f of extra) { console.log(f); if (process.argv.includes('--yes')) fs.unlinkSync(path.join(AUDIO, f)); }
    if (process.argv.includes('--yes')) { const idx = readIndex(); extra.forEach(f => delete idx[f]); fs.writeFileSync(INDEX, JSON.stringify(idx, null, 1) + '\n'); }
    console.log(extra.length + ' unused');
  }
}
