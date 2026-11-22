/* ---------- «تمرّن»: games on the words and sentences of the lessons you finished (language tabs) ----------
   The pool is only what you marked «خلّصت الدرس» (done:<tab>:<cmd>): the words of its ~~~words fences (WORDS, from core.js)
   and the sentences with a translation in its ~~~de and ~~~speak fences. A session is 10 rounds of mixed games:
     pick the meaning (German → Arabic, with the sound), pick the word (Arabic → German), type the word, der/die/das,
     listen and type, fill the gap in the card's example, put the sentence in order (Arabic shown, German tiles), match 5 pairs.
   Every answer moves the word in the review boxes of «اختبرني» (srsRate, key <tab>:w:<word>), so a missed word comes back in
   «عليك مراجعة». XP and the day streak are per tab: pr:<tab> = {xp, days, last}. Nothing leaves the device. */
const LANG_INFO = {dea1: {code: 'de', name: 'الألماني', articles: ['der', 'die', 'das']}};
const PR_ROUNDS = 10;
const prShuffle = a => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--){ const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
const prPick = (a, n) => prShuffle(a).slice(0, n);
/* "der Bruder, die Brüder" -> {base: "der Bruder", art: "der", noun: "Bruder", plural: "Brüder"}; "die Eltern (Plural)" -> base "die Eltern" */
function prForm(w){
  const clean = w.replace(/\s*\([^)]*\)\s*/g, ' ').trim(), [first, second] = clean.split(/,\s*/);
  const m = first.match(/^(der|die|das)\s+(.+)$/), p = second && second.match(/^(?:die\s+)?(.+)$/);
  return {base: first.trim(), art: m ? m[1] : '', noun: m ? m[2] : '', plural: p ? p[1].trim() : '', isNoun: !!m};
}
/* the answer as typed: case, ä→ae and the full stop don't fail it, but they are pointed out */
const prNorm = s => deAscii(deNorm(s)).toLowerCase().replace(/[!?.,]/g, '').replace(/\s+/g, ' ').trim();
/* the sentences with a translation in a lesson's ~~~de and ~~~speak fences (dialogue speakers dropped), 3 to 9 words */
function prSentences(tab, cmd){
  const t = TEACH[tab+'|'+cmd] || '', out = [];
  for (const m of t.matchAll(/^~~~(de|speak)([^\n]*)\n([\s\S]*?)^~~~[ \t]*$/gm)){
    const sp = deSpeakers(m[2]);
    for (const raw of m[3].split('\n')){
      if (!raw.includes(' || ')) continue;
      const x = deLine(raw.trim(), m[1] === 'de' ? sp : {}), n = x.de.split(/\s+/).length;
      if (n >= 3 && n <= 9 && !/[…|]/.test(x.de) && x.ar) out.push({de: x.de, ar: x.ar, voice: x.voice, lesson: cmd});
    }
  }
  return out;
}
/* what you finished in this tab, unit by unit: [{cat, i, done, total, words, sentences}] */
function prUnits(tab){
  return DATA[tab].map((cat, i) => {
    const done = cat.items.filter(it => store.get('done:'+tab+':'+it[0]) === '1').map(it => it[0]);
    const words = (WORDS[tab] || []).filter(w => done.includes(w.lesson));
    return {cat, i, done: done.length, total: cat.items.length, words, sentences: done.flatMap(c => prSentences(tab, c))};
  });
}
function prStats(tab){ try{ return Object.assign({xp: 0, days: 0, last: ''}, JSON.parse(store.get('pr:'+tab))); }catch(e){ return {xp: 0, days: 0, last: ''}; } }
/* the streak counts days with a finished session in a row; a missed day starts it again */
function prAddXp(tab, xp){
  const s = prStats(tab), today = day();
  if (s.last !== today) s.days = s.last === day(-1) ? s.days + 1 : 1;
  s.last = today; s.xp += xp;
  store.set('pr:'+tab, JSON.stringify(s));
  return s;
}
const prMastered = (tab, words) => words.filter(w => { const s = srsGet(tab+':w:'+w.w); return s && s.box >= 4; }).length;

let pr = null;
const $pr = s => document.querySelector('#pr '+s);
function prDialog(){
  let d = document.getElementById('pr');
  if (d) return d;
  d = document.createElement('dialog');
  d.id = 'pr'; d.setAttribute('aria-labelledby', 'prTitle');
  d.innerHTML = '<div class="pr-top"><button type="button" class="pr-x" aria-label="قفل">✕</button><div class="pr-bar" role="progressbar" aria-valuemin="0" aria-valuemax="'+PR_ROUNDS+'"><i></i></div><span class="pr-xp"></span></div>'+
    '<div class="pr-body" id="prBody"></div><div class="pr-foot" id="prFoot"></div>';
  document.body.appendChild(d);
  d.addEventListener('click', prClick);
  d.addEventListener('keydown', e => { if (e.key === 'Enter' && e.target.matches('.pr-in')){ e.preventDefault(); prCheck(); } });
  // the close event comes a moment later: if the dialog was opened again meanwhile, its new session stays
  d.addEventListener('close', () => { deStop(); if (!d.open) pr = null; if (typeof updateProgress === 'function') updateProgress(); });
  return d;
}
/* the start screen: what's in the pool, the units to pick from, the streak */
function prOpen(tab){
  tab = tab || shell;
  const d = prDialog(), units = prUnits(tab), st = prStats(tab), any = units.some(u => u.done);
  const pick = pr && pr.tab === tab && pr.sel ? pr.sel : new Set(units.filter(u => u.done).map(u => u.i));
  pr = {tab, sel: pick, units};
  d.classList.remove('playing');
  $pr('.pr-bar').hidden = true; $pr('.pr-xp').textContent = '';
  const allWords = units.reduce((a, u) => a + u.words.length, 0);
  $pr('.pr-body').innerHTML = '<h2 id="prTitle">تمرّن على كلماتك</h2>'+
    '<div class="pr-stats"><div><b>'+AR(st.days)+'</b><span>يوم ورا بعض</span></div><div><b>'+AR(st.xp)+'</b><span>نقطة</span></div><div><b>'+AR(prMastered(tab, units.flatMap(u => u.words)))+'</b><span>كلمة ثبتت</span></div></div>'+
    (any ? '<p class="pr-note">الكلمات والجمل هنا من الدروس اللي علّمت عليها «خلّصت الدرس» بس. اختار الوحدات اللي عايز تتمرّن عليها:</p>'
      : '<p class="pr-note">لسه مفيش درس متعلّم عليه «خلّصت الدرس». في آخر كل درس فيه الزرار ده، ولما تدوسه كلماته بتدخل هنا. لو عايز تجرّب دلوقتي، اختار وحدة من تحت.</p>')+
    '<ul class="pr-units">'+units.map(u => '<li><label><input type="checkbox" data-u="'+u.i+'"'+(pick.has(u.i) ? ' checked' : '')+'><span class="pr-un">'+esc(u.cat.t)+'</span><em>'+(u.done ? AR(u.done)+' من '+AR(u.total)+' درس · '+AR(u.words.length)+' كلمة' : 'لسه مخلّصتش دروس منها')+'</em></label></li>').join('')+'</ul>'+
    (allWords ? '' : '<p class="pr-note">الوحدة اللي مخلّصتش دروسها لو اخترتها هتتمرّن على كل كلماتها.</p>');
  $pr('.pr-foot').innerHTML = '<button type="button" class="pr-go" data-pr="start">ابدأ (١٠ جولات)</button>';
  if (!d.open) d.showModal();
}
/* the session's words and sentences: the picked units, finished lessons only (a unit with none finished gives all of it) */
function prPool(){
  const words = [], sents = [];
  pr.units.forEach(u => {
    if (!pr.sel.has(u.i)) return;
    if (u.done){ words.push(...u.words); sents.push(...u.sentences); return; }
    words.push(...(WORDS[pr.tab] || []).filter(w => w.cat === u.cat.t));
    u.cat.items.forEach(it => sents.push(...prSentences(pr.tab, it[0])));
  });
  return {words, sents};
}
/* due and weak words first (the review boxes of «اختبرني»), then never seen, then the rest */
function prOrderWords(words){
  const t = day(), score = w => { const s = srsGet(pr.tab+':w:'+w.w); return !s ? 1 : s.due <= t ? 0 : 2 + s.box; };
  return prShuffle(words).sort((a, b) => score(a) - score(b));
}
/* a gap in the card's example: the word's own form in the sentence (Bruder or Brüder; for a verb the same start, «arbeit» in «arbeite») */
function prGap(w){
  if (!w.ex) return null;
  const f = prForm(w.w), toks = w.ex.split(/(\s+|[,.!?])/);
  const plain = s => s.toLowerCase();
  const forms = f.isNoun ? [f.noun, f.plural].filter(Boolean) : [f.base];
  let at = toks.findIndex(x => forms.some(fm => plain(x) === plain(fm)));
  if (at < 0 && !f.isNoun && !/\s/.test(f.base)){
    const stem = plain(f.base).replace(/(en|n)$/, '');
    if (stem.length >= 3) at = toks.findIndex(x => plain(x).startsWith(stem));
  }
  if (at < 0) return null;
  return {before: toks.slice(0, at).join(''), answer: toks[at], after: toks.slice(at + 1).join('')};
}
function prStart(){
  const {words, sents} = prPool();
  if (words.length < 4){ $pr('.pr-foot').insertAdjacentHTML('afterbegin', '<p class="pr-warn">محتاج ٤ كلمات على الأقل. اختار وحدة كمان أو خلّص درس تاني.</p>'); return; }
  const ws = prOrderWords(words), nouns = ws.filter(w => prForm(w.w).isNoun), gaps = ws.filter(w => prGap(w));
  // the plan mixes the kinds so no two rounds in a row are the same game; a kind with nothing to ask is skipped
  let plan = ['meaning', 'article', 'word', 'type', 'gap', 'match', 'listen', 'order', 'type', 'order'];
  // a new order every session, never the same game twice in a row; the first round stays an easy pick
  for (let t = 0; t < 30; t++){ const p = prShuffle(plan.slice(1)); if (p.every((k, i) => i === 0 || k !== p[i-1]) && p[0] !== 'meaning'){ plan = ['meaning', ...p]; break; } }
  const used = new Set(), take = list => { const w = list.find(x => !used.has(x.w)) || list[0]; used.add(w.w); return w; };
  const rounds = [];
  let si = 0;
  const S = prShuffle(sents);
  for (const kind of plan){
    if (kind === 'article' && nouns.length) rounds.push({kind, w: take(nouns)});
    else if (kind === 'gap' && gaps.length) rounds.push({kind, w: take(gaps)});
    else if (kind === 'match' && ws.length >= 5) rounds.push({kind, ws: prPick(ws, 5)});
    else if (kind === 'order' && S[si]) rounds.push({kind, s: S[si++]});
    // a kind with nothing to ask (no noun left, no example with a gap, no sentence) becomes a pick-the-meaning round
    else rounds.push({kind: ['article', 'gap', 'match', 'order'].includes(kind) ? 'meaning' : kind, w: take(ws)});
  }
  Object.assign(pr, {words, all: WORDS[pr.tab] || [], rounds, n: 0, ok: 0, xp: 0, missed: [], streak: 0});
  prDialog().classList.add('playing');
  $pr('.pr-bar').hidden = false;
  prRound();
}
const prMeaning = w => w.ar;
/* 3 wrong options of the same kind (nouns with nouns), from the whole tab so the choice isn't trivial */
function prDistract(w, field){
  const f = prForm(w.w), same = pr.all.filter(x => x.w !== w.w && prForm(x.w).isNoun === f.isNoun && x[field] !== w[field]);
  return prPick(same.length >= 3 ? same : pr.all.filter(x => x.w !== w.w), 3);
}
function prOptions(list, right){
  return '<div class="pr-opts">'+prShuffle(list).map(o => '<button type="button" class="pr-o" data-pr="pick" data-ok="'+(o === right ? 1 : 0)+'" dir="auto">'+o+'</button>').join('')+'</div>';
}
const prSay = (text, v) => '<button type="button" class="pr-say" data-pr="say" data-de="'+esc(text)+'" data-v="'+(v || 'm')+'" aria-label="اسمع">🔊</button>';
function prRound(){
  const r = pr.rounds[pr.n], body = $pr('.pr-body');
  $pr('.pr-bar i').style.width = (pr.n / PR_ROUNDS * 100)+'%';
  $pr('.pr-bar').setAttribute('aria-valuenow', pr.n);
  $pr('.pr-xp').textContent = AR(pr.xp)+' نقطة';
  pr.answered = false; pr.cur = r;
  const f = r.w && prForm(r.w.w);
  let h = '', check = false;
  if (r.kind === 'meaning'){
    h = '<p class="pr-ask">معناها إيه؟</p><div class="pr-de" dir="ltr" lang="de">'+prSay(r.w.w)+'<span>'+deArt(f.base)+'</span></div>'+
      prOptions([...new Set([r.w, ...prDistract(r.w, 'ar')].map(x => fmt(prMeaning(x))))], fmt(prMeaning(r.w)));
    setTimeout(() => deSay(r.w.w, 'm'), 250);
  } else if (r.kind === 'word'){
    h = '<p class="pr-ask">اختار الكلمة بالألماني</p><p class="pr-ar">'+fmt(prMeaning(r.w))+'</p>'+
      prOptions([...new Set([r.w, ...prDistract(r.w, 'w')].map(x => '<span dir="ltr" lang="de">'+deArt(prForm(x.w).base)+'</span>'))], '<span dir="ltr" lang="de">'+deArt(f.base)+'</span>');
  } else if (r.kind === 'article'){
    h = '<p class="pr-ask">der ولا die ولا das؟</p><div class="pr-de" dir="ltr" lang="de"><span class="pr-blank">___</span> <span>'+esc(f.noun)+'</span></div><p class="pr-ar">'+fmt(prMeaning(r.w))+'</p>'+
      '<div class="pr-opts pr-arts">'+LANG_INFO[pr.tab].articles.map(a => '<button type="button" class="pr-o art-'+a+'" data-pr="pick" data-ok="'+(a === f.art ? 1 : 0)+'">'+a+'</button>').join('')+'</div>';
  } else if (r.kind === 'type' || r.kind === 'listen'){
    check = true;
    h = r.kind === 'type'
      ? '<p class="pr-ask">اكتبها بالألماني'+(f.isNoun ? ' بأداتها' : '')+'</p><p class="pr-ar">'+fmt(prMeaning(r.w))+'</p>'
      : '<p class="pr-ask">اسمع واكتب الكلمة'+(f.isNoun ? ' بأداتها (الجمع مش لازم)' : '')+'</p><div class="pr-de">'+prSay(r.w.w)+prSay(r.w.w, 'm').replace('data-pr="say"', 'data-pr="slow"').replace('🔊', '🐢')+'</div>';
    h += '<input class="pr-in" type="text" dir="ltr" lang="de" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="إجابتك">';
    if (r.kind === 'listen') setTimeout(() => deSay(r.w.w, 'm'), 250);
  } else if (r.kind === 'gap'){
    const g = prGap(r.w); r.g = g;
    const opts = [g.answer, ...prDistract(r.w, 'w').map(x => { const y = prForm(x.w); return y.isNoun ? y.noun : y.base; })];
    h = '<p class="pr-ask">كمّل الجملة</p><div class="pr-sent" dir="ltr" lang="de">'+esc(g.before)+'<span class="pr-blank">____</span>'+esc(g.after)+'</div><p class="pr-ar">('+fmt(prMeaning(r.w))+')</p>'+
      prOptions([...new Set(opts)].map(x => '<span dir="ltr" lang="de">'+esc(x)+'</span>'), '<span dir="ltr" lang="de">'+esc(g.answer)+'</span>');
  } else if (r.kind === 'order'){
    check = true;
    r.toks = r.s.de.replace(/[.!?]+$/, '').split(/\s+/);
    h = '<p class="pr-ask">رتّب الجملة</p><p class="pr-ar">'+fmt(r.s.ar)+'</p><div class="pr-line" dir="ltr" lang="de" aria-label="جملتك"></div>'+
      '<div class="pr-tiles" dir="ltr" lang="de">'+prShuffle(r.toks.map((t, i) => [t, i])).map(([t, i]) => '<button type="button" class="pr-tile" data-pr="tile" data-i="'+i+'">'+esc(t)+'</button>').join('')+'</div>';
  } else if (r.kind === 'match'){
    r.left = 5;
    const L = prShuffle(r.ws), Rr = prShuffle(r.ws);
    h = '<p class="pr-ask">وصّل كل كلمة بمعناها</p><div class="pr-match"><div dir="ltr" lang="de">'+L.map(w => '<button type="button" class="pr-m" data-pr="m" data-side="de" data-w="'+esc(w.w)+'">'+deArt(prForm(w.w).base)+'</button>').join('')+'</div>'+
      '<div>'+Rr.map(w => '<button type="button" class="pr-m" data-pr="m" data-side="ar" data-w="'+esc(w.w)+'">'+fmt(prMeaning(w))+'</button>').join('')+'</div></div>';
  }
  body.innerHTML = h;
  $pr('.pr-foot').innerHTML = check ? '<button type="button" class="pr-go" data-pr="check">اتأكد</button>' : '<p class="pr-tip">اختار إجابة</p>';
  const inp = body.querySelector('.pr-in'); if (inp) inp.focus();
}
/* right/wrong: the bottom strip turns green or red, says the right answer, and plays it */
function prResult(ok, right, note){
  const r = pr.cur;
  pr.answered = true;
  if (ok){ pr.ok++; pr.streak++; pr.xp += 10 + (pr.streak >= 3 ? 5 : 0); }
  else { pr.streak = 0; if (r.w && !pr.missed.includes(r.w)) pr.missed.push(r.w); }
  if (r.w) srsRate(pr.tab+':w:'+r.w.w, ok);
  if (r.ws) r.ws.forEach(w => srsRate(pr.tab+':w:'+w.w, ok));
  // the word card's own text (it has an mp3), or the sentence in its speaker's voice
  const say = r.s ? [r.s.de, r.s.voice] : r.w ? [r.w.w, 'm'] : null;
  $pr('.pr-foot').innerHTML = '<div class="pr-res '+(ok ? 'ok' : 'no')+'" role="status"><b>'+(ok ? (pr.streak >= 3 ? 'ممتاز! '+AR(pr.streak)+' ورا بعض' : 'صح!') : 'الإجابة الصح:')+'</b>'+
    (right ? '<span dir="ltr" lang="de">'+right+'</span>' : '')+(note ? '<small>'+note+'</small>' : '')+'</div>'+
    '<button type="button" class="pr-go" data-pr="next">'+(pr.n + 1 < PR_ROUNDS ? 'كمّل' : 'النتيجة')+'</button>';
  $pr('.pr-xp').textContent = AR(pr.xp)+' نقطة';
  if (say) deSay(say[0], say[1]);
  $pr('[data-pr="next"]').focus();
}
function prCheck(){
  if (pr.answered) return prNext();
  const r = pr.cur;
  if (r.kind === 'order'){
    const got = [...document.querySelectorAll('#pr .pr-line .pr-tile')].map(b => r.toks[+b.dataset.i]).join(' ');
    if (!got) return;
    return prResult(got === r.toks.join(' '), esc(r.s.de));
  }
  const inp = $pr('.pr-in'), raw = inp.value.trim(), f = prForm(r.w.w);
  if (!raw) return;
  // the base («der Bruder») or the whole card («der Bruder, die Brüder») both count
  const want = f.base, got = prNorm(raw), ok = got === prNorm(want) || got === prNorm(r.w.w.replace(/\s*\([^)]*\)/g, ''));
  // a noun without its article is half right: the word is known, the gender isn't
  const noArt = f.isNoun && got === prNorm(f.noun);
  let note = '';
  if (ok && deNorm(raw).replace(/[.!?]$/, '') !== want) note = 'صح، بس اكتبها كده بالظبط: الحروف الكبيرة و ä ö ü ß بتفرق.';
  if (noArt) note = 'الكلمة صح، بس الأداة ناقصة. الاسم بيتحفظ بأداته.';
  inp.disabled = true;
  prResult(ok, ok ? '' : deArt(want), note);
}
function prNext(){
  pr.n++;
  if (pr.n < PR_ROUNDS) return prRound();
  const s = prAddXp(pr.tab, pr.xp), pct = Math.round(pr.ok / PR_ROUNDS * 100);
  $pr('.pr-bar i').style.width = '100%';
  $pr('.pr-body').innerHTML = '<h2>'+(pct >= 80 ? 'شغل عالي!' : pct >= 50 ? 'كويس، كمّل' : 'محتاج تراجع')+'</h2>'+
    '<div class="pr-stats"><div><b>'+AR(pr.ok)+' / '+AR(PR_ROUNDS)+'</b><span>إجابة صح</span></div><div><b>+'+AR(pr.xp)+'</b><span>نقطة</span></div><div><b>'+AR(s.days)+'</b><span>يوم ورا بعض</span></div></div>'+
    (pr.missed.length ? '<h3 class="pr-h3">راجع دول (هيرجعولك في «عليك مراجعة»)</h3><ul class="pr-miss">'+pr.missed.map(w => '<li><span dir="ltr" lang="de">'+prSay(w.w)+deArt(prForm(w.w).base)+'</span><span>'+fmt(w.ar)+'</span></li>').join('')+'</ul>' : '<p class="pr-note">مغلطتش في ولا كلمة. الكلمات دي هتظهرلك تاني بعد كام يوم عشان تثبت.</p>');
  $pr('.pr-foot').innerHTML = '<button type="button" class="pr-go" data-pr="again">جولة تانية</button><button type="button" class="pr-go pr-sec" data-pr="home">ارجع للاختيار</button>';
}
function prClick(e){
  const d = document.getElementById('pr');
  if (e.target === d){ d.close(); return; }
  if (e.target.closest('.pr-x')){ d.close(); return; }
  const u = e.target.closest('input[data-u]');
  if (u){ u.checked ? pr.sel.add(+u.dataset.u) : pr.sel.delete(+u.dataset.u); return; }
  const b = e.target.closest('[data-pr]');
  if (!b) return;
  const a = b.dataset.pr, r = pr && pr.cur;
  if (a === 'start' || a === 'again') return prStart();
  if (a === 'home') return prOpen(pr.tab);
  if (a === 'next') return prNext();
  if (a === 'check') return prCheck();
  if (a === 'say' || a === 'slow') return deSay(b.dataset.de, b.dataset.v, a === 'slow', b);
  if (pr.answered) return;
  if (a === 'pick'){
    const ok = b.dataset.ok === '1', right = d.querySelector('.pr-o[data-ok="1"]');
    d.querySelectorAll('.pr-o').forEach(x => { x.disabled = true; });
    b.classList.add(ok ? 'right' : 'wrong'); right.classList.add('right');
    return prResult(ok, ok ? '' : right.innerHTML);
  }
  if (a === 'tile'){
    const line = d.querySelector('.pr-line'), tiles = d.querySelector('.pr-tiles');
    (b.parentElement === line ? tiles : line).appendChild(b);
    return;
  }
  if (a === 'm'){
    if (b.classList.contains('done')) return;
    const other = d.querySelector('.pr-m.sel');
    if (!other || other.dataset.side === b.dataset.side){ if (other) other.classList.remove('sel'); b.classList.add('sel'); if (b.dataset.side === 'de') deSay(b.dataset.w, 'm'); return; }
    other.classList.remove('sel');
    if (other.dataset.w === b.dataset.w){
      [other, b].forEach(x => { x.classList.add('done'); x.disabled = true; });
      if (--r.left === 0) prResult(!r.miss, '', r.miss ? 'خلّصتهم، بس غلطت '+AR(r.miss)+' مرة.' : '');
    } else {
      r.miss = (r.miss || 0) + 1;
      [other, b].forEach(x => { x.classList.add('bad'); setTimeout(() => x.classList.remove('bad'), 500); });
    }
  }
}
