/* ---------- language tabs (German): sound, word cards, dictation, speaking, videos, AI prompts ----------
   They are fences in the same mini-markdown as teach and the solutions (mdHTML in app.js calls langFence):
     ~~~de [Lena=f Tom=m] [title]     German lines, each with ▶ and a slower ▶. «Lena: text» is spoken by Lena's voice
                                      (f = kerstin, m = thorsten), «text || عربي» shows a translation under it.
     ~~~words [title]                 word cards: «der Name, die Namen | الاسم | Wie ist Ihr Name?» (word | meaning | example);
                                      core.js registers them, so they join «اختبرني» and «عليك مراجعة» like the lessons.
     ~~~dictate [title]               one sentence a line («f: text» for the woman's voice): the reader hears it, types it, and it is checked here.
                                      «S, A, L, A, H => Salah» plays the left side and expects the right one.
     ~~~hear [Lena=f] [title]         listening like the exam: the sound, then «? question», then «- option» lines (« *» marks the right one);
                                      the transcript stays closed until asked for. Several blocks in one fence.
     ~~~speak [title]                 lines to say: ▶ the model, then record yourself and play the two one after the other.
     ~~~yt <id> [title]               an Easy German video (youtube-nocookie), with the tasks written under it as the fence body.
     ~~~prompt [title]                a ready prompt for Claude or ChatGPT: the reader writes an answer, and one button copies prompt + answer.
   Every German line has an mp3 made once by tools/de/audio.js (Piper, then checked by whisper), named by deHash below;
   the same function is in that tool. Offline or in the single file, a missing file falls back to the hosted site, then to the browser's own German voice. */
const DE_PAGES = 'https://dex11x2.github.io/terminal-study/';
const DE_VOICES = {m: 'thorsten', f: 'kerstin'};
/* FNV-1a over the code points of "voice|text": short, stable, and the same in node (tools/de/audio.js) */
function deHash(s){ let h = 0x811c9dc5; for (const ch of s){ h ^= ch.codePointAt(0); h = Math.imul(h, 0x01000193) >>> 0; } return h.toString(16).padStart(8, '0'); }
/* a letter on its own («M, A, N», «A wie Aachen», «zwei S») is spoken by its German name: Piper read «A, B, C, D» as
   «a, w, c, d» (whisper heard it back that way, 22 Nov), so it gets the names written as words. The page still shows the letters. */
const DE_LETTERS = {A:'Ah', B:'Beh', C:'Zeh', D:'Deh', E:'Eh', F:'Eff', G:'Geh', H:'Hah', I:'Ih', J:'Jott', K:'Kah', L:'Ell', M:'Emm', N:'Enn', O:'Oh', P:'Peh', Q:'Kuh', R:'Err', S:'Ess', T:'Teh', U:'Uh', V:'Fau', W:'Weh', X:'Iks', Y:'Üpsilon', Z:'Zett', 'Ä':'Äh', 'Ö':'Öh', 'Ü':'Üh', 'ß':'Eszett'};
// and a short abbreviation in capitals («USA», «DW») is spelled: Piper read «USA» as a word («Wässer», 22 Nov)
const deSpeech = s => s.replace(/(^|[\s,(])([A-ZÄÖÜ]{2,4})(?=$|[\s,.)!?])/g, (_, p, w) => p+[...w].map(l => DE_LETTERS[l]).join(' '))
  .replace(/(^|[\s,(])([A-ZÄÖÜß])(?=$|[\s,.)!?])/g, (_, p, l) => p+DE_LETTERS[l]);
const deFile = (text, v) => 'audio/de/'+deHash((v || 'm')+'|'+deSpeech(text))+'.mp3';
/* «Lena: Hallo! || أهلًا» -> {who, voice, de, ar} with the speakers of the fence head (Lena=f) */
function deLine(l, speakers){
  let who = '', de = l, ar = '';
  const tr = de.split(' || '); de = tr[0]; ar = tr.slice(1).join(' || ');
  const m = de.match(/^([A-ZÄÖÜa-zäöüß][\wÄÖÜäöüß.]*|[mf]):\s+(.*)$/);
  if (m && (speakers[m[1]] || m[1] === 'm' || m[1] === 'f')){ who = /^[mf]$/.test(m[1]) ? '' : m[1]; de = m[2]; }
  const voice = m ? (speakers[m[1]] || (/^[mf]$/.test(m[1]) ? m[1] : 'm')) : 'm';
  return {who, voice, de: de.trim(), ar: ar.trim()};
}
const deSpeakers = head => { const sp = {}; head.replace(/(\S+)=([mf])\b/g, (_, n, v) => { sp[n] = v; return ''; }); return sp; };
const deTitle = head => head.replace(/\S+=[mf]\b/g, '').trim();
const sayBtns = (de, v) => '<span class="say" data-de="'+esc(de)+'" data-v="'+v+'"><button type="button" class="say-b" aria-label="اسمع">▶</button><button type="button" class="say-b say-slow" aria-label="اسمع أبطأ" title="أبطأ">🐢</button></span>';
/* the article in colour (der blue, die red, das green, as most German textbooks do), so the gender is seen as well as read */
const deArt = s => esc(s).replace(/(^|, )(der|die|das)\b/g, (_, p, a) => p+'<b class="art art-'+a+'">'+a+'</b>');

function langFence(kind, lines, head){
  const box = (cls, title, body) => '<div class="de-box '+cls+'">'+(title ? '<div class="de-h">'+esc(title)+'</div>' : '')+body+'</div>';
  if (kind === 'de'){
    const sp = deSpeakers(head), rows = lines.filter(l => l.trim()).map(l => {
      const x = deLine(l, sp);
      return '<div class="de-l'+(x.who ? ' de-who-'+x.voice : '')+'">'+sayBtns(x.de, x.voice)+(x.who ? '<b class="de-who">'+esc(x.who.replace(/_/g, ' '))+':</b> ' : '')+
        '<span class="de-t" lang="de" dir="ltr">'+esc(x.de)+'</span>'+(x.ar ? '<span class="de-ar">'+fmt(x.ar)+'</span>' : '')+'</div>';
    });
    return box('de-say', deTitle(head), '<div class="de-lines" dir="ltr">'+rows.join('')+'</div>'+(lines.some(l => l.includes(' || ')) ? '<button type="button" class="de-tr">اخفي الترجمة</button>' : ''));
  }
  if (kind === 'words'){
    // cards, not a table: on a phone a 3-column table pushed the meaning and the example off the screen (measured at 400px)
    const rows = lines.filter(l => l.trim()).map(l => {
      const [w, ar, ex] = l.split(' | ').map(s => (s || '').trim());
      return '<li class="de-wi"><div class="de-wd" dir="ltr" lang="de">'+sayBtns(w, 'm')+' <span class="de-w">'+deArt(w)+'</span></div><div class="de-wa">'+fmt(ar)+'</div>'+
        (ex ? '<div class="de-wx" dir="ltr" lang="de">'+sayBtns(ex, 'f')+' <span>'+esc(ex)+'</span></div>' : '')+'</li>';
    });
    return box('de-words', head || 'الكلمات', '<ul class="de-wl">'+rows.join('')+'</ul>'+
      '<p class="de-note">الكلمات دي دخلت «اختبرني» و «عليك مراجعة»: السؤال بالعربي، وإنت تقول الكلمة بأداتها وجمعها.</p>');
  }
  if (kind === 'dictate'){
    const items = lines.filter(l => l.trim()).map((l, i) => {
      // «S, A, L, A, H => Salah»: the sound says the left side, the answer is the right side (spelling drills)
      const x = deLine(l, {}), [say, ans] = x.de.includes(' => ') ? x.de.split(' => ') : [x.de, x.de];
      const k = 'dict:'+deHash(x.voice+'|'+say+'|'+ans), ok = typeof store !== 'undefined' && store.get(k) === '1';
      return '<li class="dict'+(ok ? ' ok' : '')+'" data-ans="'+esc(ans)+'" data-k="'+esc(k)+'">'+sayBtns(say, x.voice)+
        '<input type="text" dir="ltr" lang="de" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="اكتب الجملة '+(i+1)+' اللي سمعتها">'+
        '<button type="button" class="dict-go">صحّح</button><div class="dict-res" role="status">'+(ok ? '✓ حلّيتها قبل كده' : '')+'</div></li>';
    });
    return box('de-dict', head || 'إملا: اسمع واكتب', '<p class="de-note">اسمع الجملة (مرة أو مرتين، والسلحفاة أبطأ)، واكتبها بالظبط. الحروف الكبيرة بتفرق في الألماني. مفيش ä في كيبوردك؟ اكتب ae (و oe و ue و ss)، وهتتقبل مع تنبيه.</p><ol class="dict-l">'+items.join('')+'</ol>');
  }
  if (kind === 'speak'){
    const items = lines.filter(l => l.trim()).map(l => {
      const x = deLine(l, {});
      return '<li class="spk" data-de="'+esc(x.de)+'">'+sayBtns(x.de, x.voice)+'<span class="de-t" lang="de" dir="ltr">'+esc(x.de)+'</span>'+(x.ar ? '<span class="de-ar">'+fmt(x.ar)+'</span>' : '')+
        '<span class="spk-c"><button type="button" class="spk-rec">🎙 سجّل صوتك</button><button type="button" class="spk-me" hidden>▶ صوتك</button><button type="button" class="spk-both" hidden>قارن: الأصل ثم إنت</button></span></li>';
    });
    return box('de-speak', head || 'قول بصوتك', '<p class="de-note">اسمع الأصل، وسجّل نفسك وإنت بتقولها، واسمع الاتنين ورا بعض. التسجيل بيفضل على جهازك ومش بيتبعت لأي حتة، وبيتمسح لما تقفل الصفحة.</p><ol class="spk-l">'+items.join('')+'</ol>');
  }
  if (kind === 'yt'){
    const [id, ...t] = head.split(/\s+/), title = t.join(' ') || 'فيديو';
    if (!/^[\w-]{11}$/.test(id)) return '';
    const link = 'https://www.youtube.com/watch?v='+id;
    return box('de-yt', title, '<div class="yt-f"><iframe loading="lazy" title="'+esc(title)+'" allow="encrypted-media; picture-in-picture; fullscreen" referrerpolicy="strict-origin-when-cross-origin" src="https://www.youtube-nocookie.com/embed/'+id+'?hl=de&amp;cc_lang_pref=de"></iframe></div>'+
      '<p class="de-note">مش ظاهر (من غير نت أو اتقفل)؟ <a href="'+link+'" target="_blank" rel="noopener">افتحه على YouTube</a>. الفيديو من قناة Easy German، مش من الموقع.</p>'+(lines.join('').trim() ? mdHTML(lines.join('\n')) : ''));
  }
  if (kind === 'hear'){
    // blocks: the sound (one or more lines, «f:»/«m:» or a speaker of the head), then «? question || عربي», then «- option» with « *» on the right one
    const sp = deSpeakers(head), blocks = [];
    let cur = null;
    for (const raw of lines){
      const l = raw.trim();
      if (!l) continue;
      if (l.startsWith('? ')){ if (cur) cur.qs.push({q: l.slice(2), opts: []}); continue; }
      if (l.startsWith('- ') && cur && cur.qs.length){ const o = l.slice(2), ok = / \*$/.test(o); cur.qs[cur.qs.length-1].opts.push({t: o.replace(/ \*$/, ''), ok}); continue; }
      if (!cur || cur.qs.length) blocks.push(cur = {say: [], qs: []});
      cur.say.push(deLine(l, sp));
    }
    const items = blocks.map((b, bi) => {
      const k = 'hear:'+deHash(b.say.map(x => x.de).join('|'));
      const qs = b.qs.map((q, qi) => {
        const [qt, qa] = q.q.split(' || ');
        return '<div class="hq" data-k="'+esc(k+':'+qi)+'"><p class="hq-q"><span dir="ltr" lang="de">'+esc(qt)+'</span>'+(qa ? ' <span class="de-ar">'+fmt(qa)+'</span>' : '')+'</p>'+
          q.opts.map(o => '<button type="button" class="hq-o" dir="ltr" lang="de" data-ok="'+(o.ok ? 1 : 0)+'">'+esc(o.t)+'</button>').join('')+'<span class="hq-r" role="status"></span></div>';
      }).join('');
      return '<li class="hear">'+b.say.map(x => sayBtns(x.de, x.voice)).join('')+' <span class="de-note">اسمع (مرتين لو عايز)، وبعدين جاوب</span>'+qs+
        '<details class="hear-t"><summary>اظهر النص</summary><div dir="ltr" lang="de">'+b.say.map(x => '<p>'+(x.who ? '<b>'+esc(x.who.replace(/_/g, ' '))+':</b> ' : '')+esc(x.de)+'</p>').join('')+'</div></details></li>';
    });
    return box('de-hear', deTitle(head) || 'سمع: اسمع وجاوب', '<ol class="hear-l">'+items.join('')+'</ol>');
  }
  if (kind === 'prompt'){
    const pk = 'pans:'+deHash(lines.join('\n')), saved = typeof store !== 'undefined' && store.get(pk) || '';
    return box('de-prompt', head || 'صحّحها بالذكاء الاصطناعي', '<p class="de-note">اكتب إجابتك هنا، ودوس «انسخ»: هيتنسخ الطلب ده ومعاه إجابتك، والصقه في Claude أو ChatGPT. إجابتك بتتحفظ على جهازك بس.</p>'+
      '<textarea class="prompt-ans" dir="ltr" lang="de" rows="5" aria-label="إجابتك بالألماني" data-k="'+pk+'">'+esc(saved)+'</textarea>'+
      '<details class="prompt-d"><summary>الطلب اللي هيتنسخ</summary><pre class="prompt-t" dir="ltr">'+esc(lines.join('\n'))+'</pre></details>'+
      '<button type="button" class="prompt-copy">انسخ الطلب مع إجابتك</button>');
  }
  return null;
}
const LANG_FENCES = ['de', 'words', 'dictate', 'speak', 'hear', 'yt', 'prompt'];

/* ---------- playing ---------- */
let deAudio = null, deBtn = null;
function deStop(){ if (deAudio){ deAudio.pause(); deAudio = null; } if (deBtn){ deBtn.classList.remove('on'); deBtn = null; } if (window.speechSynthesis) speechSynthesis.cancel(); }
/* plays one line; resolves when it ends (so «قارن» can play the model and then the recording) */
function deSay(de, v, slow, btn){
  deStop();
  return new Promise(done => {
    const rate = slow ? 0.7 : 1, file = deFile(de, v);
    const urls = location.protocol === 'file:' ? [DE_PAGES+file] : [file, DE_PAGES+file];
    const speak = () => {
      // the last resort: the browser's own German voice (offline, no file). Not the course's voice, but better than silence
      if (!window.speechSynthesis) return done();
      const u = new SpeechSynthesisUtterance(deSpeech(de)); u.lang = 'de-DE'; u.rate = slow ? 0.7 : 0.95;
      u.onend = u.onerror = () => { if (btn) btn.classList.remove('on'); done(); };
      speechSynthesis.speak(u);
    };
    const tryUrl = i => {
      if (i >= urls.length) return speak();
      const a = deAudio = new Audio(urls[i]);
      a.playbackRate = rate; a.preservesPitch = true;
      a.onended = () => { if (btn) btn.classList.remove('on'); done(); };
      a.onerror = () => { if (deAudio === a) tryUrl(i+1); };
      a.play().catch(() => { if (deAudio === a) tryUrl(i+1); });
    };
    if (btn){ btn.classList.add('on'); deBtn = btn; }
    tryUrl(0);
  });
}

/* ---------- dictation ---------- */
const deNorm = s => s.normalize('NFC').replace(/[„“”"«»]/g, '').replace(/\s+/g, ' ').trim().replace(/\s*([,.!?:;])/g, '$1').replace(/[.!?]+$/, '');
const deAscii = s => s.replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/Ä/g, 'Ae').replace(/Ö/g, 'Oe').replace(/Ü/g, 'Ue').replace(/ß/g, 'ss');
function dictCheck(li){
  const shown = li.dataset.ans, want = deNorm(shown), got = deNorm(li.querySelector('input').value), res = li.querySelector('.dict-res');
  if (!got){ res.textContent = 'اكتب اللي سمعته الأول.'; return; }
  let ok = false, msg;
  if (got === want){ ok = true; msg = '✓ بالظبط.'; }
  else if (deAscii(got) === deAscii(want)){ ok = true; msg = '✓ صح، بس اكتب الحروف دي كده: '+shown; }
  else if (got.toLowerCase() === want.toLowerCase()) msg = '✗ الكلام صح والحروف الكبيرة لأ. في الألماني كل اسم (Name, Land, Stadt) بيبدأ بحرف كبير، و Sie (حضرتك) كمان. الصح: '+shown;
  else {
    const w = want.split(' '), g = got.split(' '), bad = w.filter((x, i) => deAscii(x).toLowerCase() !== deAscii(g[i] || '').toLowerCase());
    msg = '✗ قارن كلمة كلمة. الكلمات اللي اختلفت: '+bad.join('، ')+'. الصح: '+shown;
  }
  res.textContent = msg;
  li.classList.toggle('ok', ok); li.classList.toggle('no', !ok);
  if (ok) store.set(li.dataset.k, '1');
}

/* ---------- recording (MediaRecorder; nothing leaves the device) ---------- */
const deRec = new WeakMap();
async function spkRecord(li, btn){
  const st = deRec.get(li) || {};
  if (st.rec && st.rec.state === 'recording'){ st.rec.stop(); return; }
  if (!navigator.mediaDevices || !window.MediaRecorder){ btn.textContent = 'المتصفح ده مبيسجّلش صوت'; return; }
  let stream;
  try { stream = await navigator.mediaDevices.getUserMedia({audio: true}); }
  catch (e){ btn.textContent = 'مفيش إذن للمايك (اسمح بيه من جنب العنوان وجرّب تاني)'; return; }
  const chunks = [], rec = new MediaRecorder(stream);
  rec.ondataavailable = e => { if (e.data.size) chunks.push(e.data); };
  rec.onstop = () => {
    stream.getTracks().forEach(t => t.stop());
    if (st.url) URL.revokeObjectURL(st.url);
    st.url = URL.createObjectURL(new Blob(chunks, {type: rec.mimeType}));
    btn.textContent = '🎙 سجّل تاني'; btn.classList.remove('on');
    li.querySelector('.spk-me').hidden = li.querySelector('.spk-both').hidden = false;
  };
  st.rec = rec; deRec.set(li, st);
  rec.start(); btn.textContent = '■ وقّف التسجيل'; btn.classList.add('on');
}
function spkMine(li){ const st = deRec.get(li); if (!st || !st.url) return Promise.resolve(); deStop(); return new Promise(done => { const a = deAudio = new Audio(st.url); a.onended = a.onerror = done; a.play().catch(done); }); }

if (typeof document !== 'undefined'){
  document.addEventListener('click', e => {
    const sb = e.target.closest('.say-b');
    if (sb){ const s = sb.closest('.say'); deSay(s.dataset.de, s.dataset.v, sb.classList.contains('say-slow'), sb); return; }
    const tr = e.target.closest('.de-tr');
    if (tr){ const b = tr.closest('.de-box'), off = b.classList.toggle('no-tr'); tr.textContent = off ? 'اظهر الترجمة' : 'اخفي الترجمة'; return; }
    const ho = e.target.closest('.hq-o');
    if (ho){
      const q = ho.closest('.hq'), ok = ho.dataset.ok === '1';
      q.querySelectorAll('.hq-o').forEach(b => b.classList.remove('picked', 'right', 'wrong'));
      ho.classList.add('picked', ok ? 'right' : 'wrong');
      q.querySelector('.hq-r').textContent = ok ? '✓ صح' : '✗ لأ. اسمع تاني، وركّز في الكلمة اللي بتجاوب السؤال';
      if (ok) store.set(q.dataset.k, '1');
      return;
    }
    const dg = e.target.closest('.dict-go');
    if (dg){ dictCheck(dg.closest('.dict')); return; }
    const rb = e.target.closest('.spk-rec');
    if (rb){ spkRecord(rb.closest('.spk'), rb); return; }
    const mb = e.target.closest('.spk-me');
    if (mb){ spkMine(mb.closest('.spk')); return; }
    const bb = e.target.closest('.spk-both');
    if (bb){ const li = bb.closest('.spk'), s = li.querySelector('.say'); deSay(s.dataset.de, s.dataset.v, false).then(() => spkMine(li)); return; }
    const pc = e.target.closest('.prompt-copy');
    if (pc){
      const b = pc.closest('.de-prompt'), ans = b.querySelector('.prompt-ans').value.trim();
      const text = b.querySelector('.prompt-t').textContent+'\n\n---\nإجابتي:\n'+(ans || '(لسه مكتبتش)');
      const ok = () => { pc.textContent = 'اتنسخ: الصقه في Claude أو ChatGPT'; setTimeout(() => { pc.textContent = 'انسخ الطلب مع إجابتك'; }, 2200); };
      if (navigator.clipboard) navigator.clipboard.writeText(text).then(ok, () => {});
      return;
    }
  });
  document.addEventListener('keydown', e => { if (e.key === 'Enter' && e.target.matches && e.target.matches('.dict input')){ e.preventDefault(); dictCheck(e.target.closest('.dict')); } });
  document.addEventListener('input', e => { if (e.target.matches && e.target.matches('.prompt-ans')) store.set(e.target.dataset.k, e.target.value); });
}
const LANG_TABS = ['dea1'];
