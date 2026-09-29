// العرض والبحث والتقدم وأدوات المذاكرة
/* ---------- helpers ---------- */
const $ = s => document.querySelector(s);
const esc = s => s.replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const fmt = s => esc(s).replace(/\[\[(.+?)\]\]/g, '<code>$1</code>');
const store = {
  get(k){ try{ return localStorage.getItem(k); }catch(e){ return null; } },
  set(k,v){ try{ localStorage.setItem(k,v); }catch(e){} },
  del(k){ try{ localStorage.removeItem(k); }catch(e){} },
  keys(){ try{ return Object.keys(localStorage); }catch(e){ return []; } }
};
const isComment = l => /^\s*(#|REM\b|\/\/)/.test(l);

function termHTML(code, shell, script, label, prOverride){
  const pr = prOverride || SHELLS[shell].prompt;
  const lines = code.split('\n').map(l => {
    if (l.trim()==='') return '';
    if (script) return /^\s*(#(?!!)|REM\b|\/\/)/.test(l) ? '<span class="cm">'+esc(l)+'</span>' : esc(l);
    if (isComment(l)) return '<span class="cm">'+esc(l)+'</span>';
    // psql tab mixes SQL (app=#) with shell commands (psql, pg_dump, docker...), which start lowercase
    const p = shell==='pg' && !prOverride && /^\s*[a-z]/.test(l) ? '$ ' : pr;
    return '<span class="pr">'+esc(p)+'</span>'+esc(l);
  }).join('\n');
  return '<div class="term" data-k="'+shell+'"><div class="term-bar"><span>'+esc(label || (script?'script':SHELLS[shell].label))+'</span><button class="copy" type="button">نسخ</button></div><pre>'+lines+'</pre></div>';
}

let shell = 'bash';
const lvInfo = l => (LEVEL_TAB[shell] && LEVEL_TAB[shell][l]) || LEVEL_INFO[l];
const LESSON_TABS = ['start','web','sec','glossary','real','os','vscode'];
function countLabel(n){
  const lesson = LESSON_TABS.includes(shell);
  if (shell==='glossary') return n + ' مصطلح';
  if (n===1) return lesson ? 'درس واحد' : 'أمر واحد';
  if (n===2) return lesson ? 'درسين' : 'أمرين';
  return n + ' ' + (lesson ? (n>10?'درس':'دروس') : (n>10?'أمر':'أوامر'));
}
function descHTML(d){
  return d.split(/\n\s*\n/).map(p => '<p class="desc">'+fmt(p.trim())+'</p>').join('');
}
function deepHTML(c){
  const d = DEEP[shell+'|'+c];
  if (!d) return '';
  const part = (h, t) => t ? '<section><h4>'+h+'</h4>'+t.split(/\n\s*\n/).map(x => '<p>'+fmt(x.trim())+'</p>').join('')+'</section>' : '';
  return '<div class="deep">'+part('ليه موجود؟', d.why)+part('بيحصل إيه من جوه؟', d.how)+part('هتستخدمه إمتى؟', d.when)+part('غلطات شائعة', d.mistakes)+'</div>';
}
function breakHTML(c, ex){
  const b = BREAK[shell+'|'+c];
  if (!b || !ex) return '';
  const lines = ex.split('\n').filter(l => l.trim() && !/^\s*(#|\/\/|REM\b)/.test(l));
  const n = Math.min(lines.length, b.length);
  let h = '<div class="bd"><h4>فكّ الأمر سطر سطر</h4><ol>';
  for (let i = 0; i < n; i++) h += '<li><code dir="ltr">'+esc(lines[i].trim())+'</code><span>'+fmt(b[i])+'</span></li>';
  return h + '</ol></div>';
}
function termBlock(ex, c, flag){
  flag = (flag||'').split(' ').filter(f => f && f!=='danger')[0];
  if (flag==='script') return termHTML(ex, shell, true, c);
  if (flag==='keys') return termHTML(ex, shell, true, 'اختصارات');
  if (flag==='console') return termHTML(ex, shell, true, 'Console');
  if (flag==='term') return termHTML(ex, shell, false, 'Terminal', '$ ');
  return termHTML(ex, shell, false, '');
}
let level = 0;
function osBadge(c){
  if (shell!=='bash') return '';
  const o = (BASH_OS[c]||['both'])[0];
  return o==='linux' ? '<span class="os linux">لينكس بس</span>' : o==='diff' ? '<span class="os diff">مختلف على الماك</span>' : '<span class="os">أوبونتو وماك</span>';
}
function osNote(c){
  if (shell!=='bash' || !BASH_OS[c]) return '';
  return '<p class="osnote"><b>على الماك:</b> '+fmt(BASH_OS[c][1])+'</p>';
}

const _st = {};
function searchText(sh, it){
  const k = sh+'|'+it[0];
  const note = (store.get('note:'+k) || '').toLowerCase();
  if (_st[k]) return _st[k] + ' ' + note;
  const d = DEEP[k], b = BREAK[k];
  _st[k] = (it.slice(0,5).join(' ')+' '+(d ? [d.why,d.how,d.when,d.mistakes].join(' ') : '')+' '+(b ? b.join(' ') : '')).toLowerCase();
  return _st[k] + ' ' + note;
}
function noteHTML(c){
  const nk = 'note:'+shell+':'+c, v = store.get(nk) || '';
  return '<div class="notes"><button type="button" class="note-btn'+(v?' has':'')+'" aria-expanded="'+(v?'true':'false')+'">'+(v?'ملاحظتي':'اكتب ملاحظة')+'</button>'+
    '<textarea class="note'+(v?' open':'')+'" data-n="'+esc(nk)+'" placeholder="اكتب بكلامك انت: الأمر ده بيعمل إيه، وإمتى هتحتاجه، وأي غلطة وقعت فيها." aria-label="ملاحظتك على '+esc(c)+'">'+esc(v)+'</textarea></div>';
}
function render(){
  const q = $('#q').value.trim().toLowerCase();
  const cats = DATA[shell].map((c, i) => Object.assign({i}, c)).sort((a, b) => a.l - b.l).filter(c => !level || c.l === level);
  let html = '', chips = '', shown = 0, lastL = 0;
  cats.forEach(cat => {
    const items = cat.items.filter(it => !q || searchText(shell, it).includes(q));
    if (!items.length) return;
    shown += items.length;
    if (cat.l !== lastL){
      lastL = cat.l;
      html += '<div class="lvl"><span class="n">المستوى '+AR(cat.l)+'</span><h2>'+lvInfo(cat.l)[0]+'</h2><p>'+lvInfo(cat.l)[1]+'</p></div>';
    }
    const id = shell+'-c'+cat.i;
    chips += '<button class="chip" type="button" data-t="'+id+'">'+esc(cat.t)+'</button>';
    const n = cat.items.length;
    html += '<section class="cat" id="'+id+'"><h3>'+esc(cat.t)+'<small>'+countLabel(n)+'</small></h3>'+(cat.n?'<p class="cat-note">'+esc(cat.n)+'</p>':'');
    items.forEach(([c,t,d,ex,tr,flag]) => {
      const key = 'done:'+shell+':'+c;
      const done = store.get(key)==='1';
      html += '<article class="cmd'+(done?' is-done':'')+'">'+
        '<div class="cmd-h"><span class="name">'+esc(c)+'</span>'+(t?'<span class="title">'+esc(t)+'</span>':'')+(/\bdanger\b/.test(flag||'')?'<span class="tag-danger">خطر: اقرا الشرح قبل ما تنفّذ</span>':'')+osBadge(c)+'</div>'+
        (DEEP[shell+'|'+c] ? deepHTML(c)+(d?'<p class="sum"><b>الخلاصة:</b> '+fmt(d.split(/\n\s*\n/)[0])+'</p>':'') : (d?descHTML(d):''))+osNote(c)+
        (ex ? termBlock(ex, c, flag) : '')+breakHTML(c, ex)+
        '<button type="button" class="reveal">اكشف الإجابة</button>'+
        '<div class="try"><span class="lbl">'+(shell==='glossary'?'الشرح الكامل في':'جرّب')+'</span><p>'+fmt(tr)+'</p><label class="done"><input type="checkbox" data-k="'+esc(key)+'"'+(done?' checked':'')+'> جربتها</label></div>'+
        noteHTML(c)+
      '</article>';
    });
    html += '</section>';
  });
  if (!shown){
    const other = Object.keys(DATA).filter(k => k!==shell && DATA[k].some(c => c.items.some(it => searchText(k, it).includes(q))));
    html = '<div class="empty">مفيش نتيجة لـ «'+esc(q)+'» في '+SHELLS[shell].label+'.'+
      (other.length ? ' موجودة في: '+other.map(k=>'<button type="button" data-go="'+k+'">'+SHELLS[k].label+'</button>').join(' و ') : ' جرّب كلمة أقصر أو اسم الأمر بالإنجليزي.')+'</div>';
  }
  $('#list').innerHTML = html;
  $('#chips').innerHTML = chips;
  $('#labBox').innerHTML = termHTML(LAB[shell], shell, shell==='vps' || shell==='web' || shell==='os', shell==='vps' ? 'على جهازك' : shell==='web' || shell==='os' ? 'اختصارات' : '');
  $('#labTxt').textContent = LABTXT[shell] || LABDEF;
  updateProgress();
}

function cardProgress(){
  let T = 0, D = 0;
  document.querySelectorAll('.sw').forEach(b => {
    const k = b.dataset.s; let t = 0, d = 0;
    DATA[k].forEach(c => c.items.forEach(it => { t++; if (store.get('done:'+k+':'+it[0])==='1') d++; }));
    let pg = b.querySelector('.pg');
    if (!pg){ pg = document.createElement('span'); pg.className = 'pg'; b.querySelector('.top').appendChild(pg); }
    pg.textContent = d ? AR(d)+' / '+AR(t) : AR(t);
    pg.classList.toggle('full', d && d===t);
    pg.title = d ? 'جربت '+d+' من '+t : t+' عنصر';
    T += t; D += d;
  });
  $('#totalDone').textContent = AR(D);
  $('#totalAll').textContent = AR(T);
}
function updateProgress(){
  cardProgress();
  let total = 0, done = 0;
  DATA[shell].filter(c => !level || c.l === level).forEach(c => c.items.forEach(it => { total++; if (store.get('done:'+shell+':'+it[0])==='1') done++; }));
  $('#doneN').textContent = AR(done);
  $('#allN').textContent = AR(total);
  $('#shellName').textContent = ({web:'المتصفح', sec:'أمان الموقع', start:'ابدأ من هنا', docker:'Docker', node:'Node و npm', pg:'PostgreSQL', diag:'التشخيص', gha:'GitHub Actions', wsl:'WSL', nginx:'Nginx', sshc:'ssh config', glossary:'القاموس'}[shell] || SHELLS[shell].label) + (level ? ' المستوى '+AR(level) : '');
  $('#meter').style.width = (total ? done/total*100 : 0)+'%';
}

function markLevel(){
  document.querySelectorAll('.lv').forEach(b => b.setAttribute('aria-pressed', +b.dataset.l===level ? 'true':'false'));
  store.set('level', String(level));
}
function setShell(s){
  shell = s;
  document.body.dataset.shell = s;
  document.querySelectorAll('.sw').forEach(b => b.setAttribute('aria-selected', b.dataset.s===s ? 'true':'false'));
  store.set('shell', s);
  try{ history.replaceState(null, '', '#'+s); }catch(e){}
  render();
}

function renderStatic(){
  let t = '<thead><tr><th>المهمة</th><th class="b">bash</th><th class="p">PowerShell</th><th class="c">CMD</th></tr></thead><tbody>';
  CMP.forEach(r => { t += '<tr><td>'+esc(r[0])+'</td><td class="m">'+esc(r[1])+'</td><td class="m">'+esc(r[2])+'</td><td class="m">'+esc(r[3])+'</td></tr>'; });
  $('#cmpT').innerHTML = t+'</tbody>';
  $('#mBox').innerHTML = MISSIONS.map((m,i) =>
    '<div class="mission"><h3><span class="n">'+(i+1)+'</span>'+esc(m.t)+'</h3><p>'+esc(m.d)+'</p><details><summary>اعرض الحل بعد ما تجرب</summary><div class="sol">'+
    Object.keys(m.s).map(k => termHTML(m.s[k], k, false)).join('')+'</div></details></div>').join('');
}

/* ---------- study tools ---------- */
const THEMES = [['auto','تلقائي'],['light','فاتح'],['dark','غامق']];
function applyTheme(t){
  if (t==='light' || t==='dark') document.documentElement.dataset.theme = t; else delete document.documentElement.dataset.theme;
  $('#themeBtn').textContent = 'المظهر: '+(THEMES.find(x => x[0]===t) || THEMES[0])[1];
}

const fc = {pool:[], cur:null, last:null, ok:0, n:0};
function fcStats(k){ try{ return JSON.parse(store.get('fc:'+k)) || {k:0,m:0}; }catch(e){ return {k:0,m:0}; } }
function fcPick(){
  const w = fc.pool.map(x => { const st = fcStats(x.key); return x.key===fc.last && fc.pool.length>1 ? 0 : (st.m*3+1)/(st.k+1); });
  let r = Math.random() * w.reduce((a,b) => a+b, 0);
  for (let i = 0; i < w.length; i++){ r -= w[i]; if (r <= 0 && w[i]) return fc.pool[i]; }
  return fc.pool.find(x => x.key!==fc.last) || fc.pool[0];
}
function fcNext(){
  const x = fc.cur = fcPick(); fc.last = x.key;
  const st = fcStats(x.key);
  $('#fcMeta').textContent = x.cat + (st.m ? ' · نسيتها '+AR(st.m)+' مرة' : '');
  $('#fcQ').textContent = x.t || x.c;
  $('#fcHint').textContent = shell==='glossary' ? 'إيه المصطلح ده، وبيعمل إيه؟' : 'إيه الأمر اللي بيعمل كده؟ قوله بصوت عالي أو اكتبه في دماغك، وبعدين اكشف.';
  $('#fcAns').hidden = true; $('#fcShow').hidden = false; $('#fcKnow').hidden = $('#fcMiss').hidden = true;
  $('#fcStat').textContent = (fc.n ? 'الجلسة دي: عرفت '+AR(fc.ok)+' من '+AR(fc.n)+'. ' : 'البطاقات من '+$('#shellName').textContent+' ('+AR(fc.pool.length)+' بطاقة). ')+'مسافة تكشف، و 1 عرفتها، و 2 لسه.';
  $('#fcShow').focus();
}
function fcReveal(){
  const x = fc.cur, sum = x.d ? x.d.split(/\n\s*\n/)[0] : '';
  $('#fcAns').innerHTML = '<span class="name">'+esc(x.c)+'</span>'+(sum ? '<p>'+fmt(sum)+'</p>' : '')+(x.ex ? termBlock(x.ex, x.c, x.flag) : '');
  $('#fcAns').hidden = false; $('#fcShow').hidden = true; $('#fcKnow').hidden = $('#fcMiss').hidden = false;
  $('#fcKnow').focus();
}
function fcMark(ok){
  const st = fcStats(fc.cur.key); ok ? st.k++ : st.m++;
  store.set('fc:'+fc.cur.key, JSON.stringify(st));
  fc.n++; if (ok) fc.ok++;
  fcNext();
}
function fcOpen(){
  fc.pool = []; fc.ok = fc.n = 0; fc.last = null;
  DATA[shell].filter(c => !level || c.l === level).forEach(cat => cat.items.forEach(([c,t,d,ex,tr,flag]) => fc.pool.push({key:shell+':'+c, cat:cat.t, c, t, d, ex, flag})));
  if (!fc.pool.length) return;
  const dlg = $('#fc');
  if (typeof dlg.showModal === 'function') dlg.showModal(); else dlg.setAttribute('open', '');
  fcNext();
}
function fcClose(){ const dlg = $('#fc'); if (dlg.close) dlg.close(); else dlg.removeAttribute('open'); }

const BACKUP_KEYS = /^(done:|note:|fc:|shell$|level$|brief$|todo$|theme$)/;
function exportProgress(){
  const o = {}; store.keys().filter(k => BACKUP_KEYS.test(k)).forEach(k => o[k] = store.get(k));
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([JSON.stringify({v:1, saved:new Date().toISOString(), data:o}, null, 1)], {type:'application/json'}));
  a.download = 'terminal-progress-'+new Date().toISOString().slice(0,10)+'.json';
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 2000);
}
function importProgress(file){
  const r = new FileReader();
  r.onload = () => {
    try{
      const j = JSON.parse(r.result), o = j && j.data;
      if (!o || typeof o !== 'object') throw 0;
      let n = 0; Object.keys(o).forEach(k => { if (BACKUP_KEYS.test(k) && typeof o[k]==='string'){ store.set(k, o[k]); n++; } });
      alert('اترجّع '+n+' عنصر.'); render();
    }catch(e){ alert('الملف ده مش نسخة تقدم من الصفحة دي.'); }
  };
  r.readAsText(file);
}

/* ---------- events ---------- */
document.querySelectorAll('.sw').forEach(b => b.addEventListener('click', () => setShell(b.dataset.s)));
$('#q').addEventListener('input', render);
document.addEventListener('keydown', e => {
  if (e.key==='/' && document.activeElement!==$('#q') && !/^(TEXTAREA|INPUT)$/.test(document.activeElement.tagName) && !$('#fc').open){ e.preventDefault(); $('#q').focus(); }
});
document.addEventListener('click', e => {
  const cp = e.target.closest('.copy');
  if (cp){
    const pre = cp.closest('.term').querySelector('pre').cloneNode(true);
    pre.querySelectorAll('.pr').forEach(p => p.remove());
    const text = pre.textContent;
    const ok = () => { cp.textContent='اتنسخ'; setTimeout(()=>cp.textContent='نسخ',1400); };
    const fallback = () => { const ta=document.createElement('textarea'); ta.value=text; document.body.appendChild(ta); ta.select(); try{document.execCommand('copy'); ok();}catch(_){} ta.remove(); };
    if (navigator.clipboard) navigator.clipboard.writeText(text).then(ok, fallback); else fallback();
    return;
  }
  const nb = e.target.closest('.note-btn');
  if (nb){ const ta = nb.nextElementSibling, on = !ta.classList.contains('open'); ta.classList.toggle('open', on); nb.setAttribute('aria-expanded', on ? 'true' : 'false'); if (on) ta.focus(); return; }
  if (e.target.closest('#fcBtn')){ fcOpen(); return; }
  if (e.target.closest('#fcClose')){ fcClose(); return; }
  if (e.target.closest('#fcShow')){ fcReveal(); return; }
  if (e.target.closest('#fcKnow')){ fcMark(true); return; }
  if (e.target.closest('#fcMiss')){ fcMark(false); return; }
  if (e.target.id==='fc'){ const r = e.target.getBoundingClientRect(); if (e.clientX<r.left || e.clientX>r.right || e.clientY<r.top || e.clientY>r.bottom) fcClose(); return; }
  if (e.target.closest('#todoBtn')){
    const on = !document.body.classList.contains('todo');
    document.body.classList.toggle('todo', on);
    $('#todoBtn').setAttribute('aria-pressed', on ? 'true' : 'false');
    store.set('todo', on ? '1' : '0');
    return;
  }
  if (e.target.closest('#themeBtn')){
    const cur = store.get('theme') || 'auto', nxt = THEMES[(THEMES.findIndex(x => x[0]===cur)+1) % THEMES.length][0];
    store.set('theme', nxt); applyTheme(nxt); return;
  }
  if (e.target.closest('#exportBtn')){ exportProgress(); return; }
  if (e.target.closest('#importBtn')){ $('#importFile').click(); return; }
  if (e.target.closest('#printBtn')){ window.print(); return; }
  if (e.target.closest('#resetBtn')){
    const name = $('#shellName').textContent.replace(/ المستوى .*/, '');
    if (confirm('هتمسح علامات «جربتها» ونتايج «اختبرني» في '+name+'. الملاحظات مش هتتمسح. متأكد؟')){
      store.keys().filter(k => k.startsWith('done:'+shell+':') || k.startsWith('fc:'+shell+':')).forEach(k => store.del(k));
      render();
    }
    return;
  }
  const chip = e.target.closest('.chip');
  if (chip){ const el=document.getElementById(chip.dataset.t); if (el) el.scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'}); return; }
  const rv = e.target.closest('.reveal');
  if (rv){ rv.closest('article').classList.add('shown'); return; }
  if (e.target.closest('#briefBtn')){
    const on = !document.body.classList.contains('brief');
    document.body.classList.toggle('brief', on);
    $('#briefBtn').setAttribute('aria-pressed', on ? 'true' : 'false');
    store.set('brief', on ? '1' : '0');
    return;
  }
  if (e.target.closest('#quizBtn')){
    const on = !document.body.classList.contains('quiz');
    document.body.classList.toggle('quiz', on);
    $('#quizBtn').setAttribute('aria-pressed', on ? 'true' : 'false');
    document.querySelectorAll('article.cmd.shown').forEach(a => a.classList.remove('shown'));
    return;
  }
  const lv = e.target.closest('.lv');
  if (lv){ level = +lv.dataset.l; markLevel(); render(); return; }
  const go = e.target.closest('[data-go]');
  if (go){
    if (go.dataset.lv !== undefined){ level = +go.dataset.lv; markLevel(); }
    setShell(go.dataset.go);
    if (go.dataset.lv !== undefined) $('#list').scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
  }
});
$('#importFile').addEventListener('change', e => { const fl = e.target.files[0]; if (fl) importProgress(fl); e.target.value = ''; });
document.addEventListener('input', e => {
  const ta = e.target.closest('textarea[data-n]');
  if (!ta) return;
  const v = ta.value.trim();
  v ? store.set(ta.dataset.n, ta.value) : store.del(ta.dataset.n);
  const nb = ta.previousElementSibling; nb.classList.toggle('has', !!v); nb.textContent = v ? 'ملاحظتي' : 'اكتب ملاحظة';
});
document.addEventListener('keydown', e => {
  if (!$('#fc').open) return;
  const asking = !$('#fcShow').hidden;
  if (asking && e.key===' ' && document.activeElement!==$('#fcShow')){ e.preventDefault(); fcReveal(); }
  else if (!asking && e.key==='1'){ e.preventDefault(); fcMark(true); }
  else if (!asking && e.key==='2'){ e.preventDefault(); fcMark(false); }
});
document.addEventListener('change', e => {
  const cb = e.target.closest('input[type=checkbox][data-k]');
  if (!cb) return;
  store.set(cb.dataset.k, cb.checked ? '1':'0');
  cb.closest('article').classList.toggle('is-done', cb.checked);
  updateProgress();
});

renderStatic();
applyTheme(store.get('theme') || 'auto');
if (store.get('todo')==='1'){ document.body.classList.add('todo'); $('#todoBtn').setAttribute('aria-pressed','true'); }
if (store.get('brief')==='1'){ document.body.classList.add('brief'); $('#briefBtn').setAttribute('aria-pressed','true'); }
const savedL = +(store.get('level') || 0);
if ([0,1,2,3].includes(savedL)){ level = savedL; markLevel(); }
const fromHash = decodeURIComponent(location.hash.slice(1)), saved = store.get('shell');
setShell(DATA[fromHash] ? fromHash : DATA[saved] ? saved : 'start');
window.addEventListener('hashchange', () => { const h = decodeURIComponent(location.hash.slice(1)); if (DATA[h] && h !== shell) setShell(h); });
