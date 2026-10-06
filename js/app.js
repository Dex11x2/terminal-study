// العرض والبحث والتقدم وأدوات المذاكرة
/* ---------- helpers ---------- */
const $ = s => document.querySelector(s);
const esc = s => s.replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
// [[code]] → <code>; the \]* keeps closing brackets that belong to the code, e.g. [[arr[0]]] → arr[0]
const fmt = s => esc(s).replace(/\[\[(.+?\]*)\]\]/g, '<code>$1</code>');
const store = {
  get(k){ try{ return localStorage.getItem(k); }catch(e){ return null; } },
  set(k,v){ try{ localStorage.setItem(k,v); }catch(e){} },
  del(k){ try{ localStorage.removeItem(k); }catch(e){} },
  keys(){ try{ return Object.keys(localStorage); }catch(e){ return []; } }
};
const isComment = l => /^\s*(#(?![A-Za-z_$][\w$]*\s*[=;(])|REM\b|\/\/)/.test(l);
// the box bar says where the code runs, not just the shell's name ("bash" alone tells a beginner nothing)
const RUNS_IN = {bash:'bash: لينكس والماك و WSL', start:'bash: لينكس والماك و WSL', glossary:'bash: لينكس والماك و WSL', zsh:'zsh: الماك', ps:'PowerShell: ويندوز', cmd:'CMD: ويندوز'};
// a comment line that is only an OS name, like "# Windows (PowerShell):", starts a separate box with that system's name and prompt
const OS_HEAD = /^\s*#\s*(Linux|Ubuntu|WSL|Git Bash|Windows|Mac|macOS)\b[^:\n]*:\s*$/i;
const OS_BOX = [
  [/powershell/i, 'ps', 'PowerShell: ويندوز', 'PS> '],
  [/\bcmd\b/i, 'cmd', 'CMD: ويندوز', 'C:\\> '],
  [/git bash/i, 'bash', 'Git Bash: ويندوز', '$ '],
  [/#\s*(linux|ubuntu)\b.*\bmac/i, 'bash', 'bash: لينكس والماك و WSL', '$ '],
  [/#\s*mac/i, 'zsh', 'zsh: الماك', '% '],
  [/#\s*(linux|ubuntu|wsl)/i, 'bash', 'bash: لينكس و WSL', '$ '],
  [/#\s*windows/i, 'ps', 'PowerShell: ويندوز', 'PS> ']
];
const PLACE_LABELS = new Set([...Object.values(RUNS_IN), ...OS_BOX.map(b => b[2])]);
// scriptName: set for solution code, which shows without prompts (code before the first OS header is labelled with the lesson name, like any script box)
function osBoxes(ex, scriptName){
  const src = ex.split('\n');
  if (!src.some(l => OS_HEAD.test(l))) return '';
  const boxes = [];
  let cur = {k: shell, label: '', pr: undefined, lines: []};
  const push = () => { if (cur.lines.some(l => l.trim())) boxes.push(cur); };
  src.forEach(l => {
    if (!OS_HEAD.test(l)) return cur.lines.push(l);
    push();
    const [, k, label, pr] = OS_BOX.find(([re]) => re.test(l));
    cur = {k, label, pr, lines: []};
  });
  push();
  return boxes.map(b => termHTML(b.lines.join('\n').replace(/^\n+|\n+$/g, ''), b.k, !!scriptName, b.label || scriptName || '', b.pr).replace('class="term"', 'class="term os"')).join('');
}

function termHTML(code, shell, script, label, prOverride){
  const pr = prOverride || SHELLS[shell].prompt;
  const lines = code.split('\n').map(l => {
    if (l.trim()==='') return '';
    if (script) return /^\s*(#(?!(?:include|define|pragma|ifdef|ifndef|endif)\b|!|[A-Za-z_$][\w$]*\s*[=;(])|REM\b|\/\/)/.test(l) ? '<span class="cm">'+esc(l)+'</span>' : esc(l);
    if (isComment(l)) return '<span class="cm">'+esc(l)+'</span>';
    // psql tab mixes SQL (app=#) with shell commands (psql, pg_dump, docker...), which start lowercase
    const p = shell==='pg' && !prOverride && /^\s*[a-z]/.test(l) ? '$ ' : pr;
    return '<span class="pr">'+esc(p)+'</span>'+esc(l);
  }).join('\n');
  // "PowerShell: ويندوز" → the shell name in the code font, where it runs in the page font (Arabic in a monospace font looks broken)
  const full = label || (script?'script':(RUNS_IN[shell] || SHELLS[shell].label));
  const [name, where] = PLACE_LABELS.has(full) ? full.split(': ') : [full];
  return '<div class="term" data-k="'+shell+'"><div class="term-bar"><span>'+esc(name)+(where ? ' <b class="runs">على '+esc(where)+'</b>' : '')+'</span><button class="copy" type="button">نسخ</button></div><pre>'+lines+'</pre></div>';
}

let shell = 'bash';
const lvInfo = l => (LEVEL_TAB[shell] && LEVEL_TAB[shell][l]) || LEVEL_INFO[l];
const LESSON_TABS = ['start','web','sec','glossary','real','os','vscode','js','ts','css','react','next','api','data','pyapi','php','flutter','ai','arch','interview','dsa','sweng','apis','cloud','projects','career','english','dotnet','angular','spring','rn','speak','cpp','kotlin','swift','go','symbols','files'];
function countLabel(n){
  const lesson = LESSON_TABS.includes(shell);
  if (shell==='glossary') return n + ' مصطلح';
  if (n===1) return lesson ? 'درس واحد' : 'أمر واحد';
  if (n===2) return lesson ? 'درسين' : 'أمرين';
  return n + ' ' + (lesson ? (n>10?'درس':'دروس') : (n>10?'أمر':'أوامر'));
}
/* every paragraph of desc is shown; after the first they get .more, which the brief mode hides */
function descHTML(d){
  return d.split(/\n\s*\n/).map((p, i) => '<p class="desc'+(i?' more':'')+'">'+fmt(p.trim())+'</p>').join('');
}
/* the long step-by-step explanation (lesson field teach), written in a small markdown:
   ## and ### headings, ~~~lang label fences (~~~ because lesson text can't hold backticks), - and 1. lists, | tables |, > notes, --- separators, **bold**, [[code]] */
const FENCE = {powershell:['ps','PowerShell'], ps:['ps','PowerShell'], bash:['bash','bash'], sh:['bash','bash'], cmd:['cmd','CMD'], zsh:['zsh','zsh']};
function teachHTML(c){
  const t = TEACH[shell+'|'+c];
  if (!t) return '';
  const inl = s => fmt(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');
  const src = t.split('\n'), out = [];
  for (let i = 0; i < src.length; i++){
    const l = src[i];
    if (!l.trim()) continue;
    let m;
    if ((m = l.match(/^~~~(\w*)\s*(.*)$/))){
      const code = [];
      for (i++; i < src.length && !/^~~~\s*$/.test(src[i]); i++) code.push(src[i]);
      const [k, name] = FENCE[m[1]] || [shell, m[1] === 'text' || !m[1] ? '' : m[1]];
      let box = termHTML(code.join('\n'), k, true, m[2] || name || 'الناتج').replace('class="term"', 'class="term os tcode"');
      // diagrams and outputs: every piece between 2+ spaces keeps its column (an Arabic run would otherwise flip the order of the pieces),
      // and Arabic gets the page font, since the code font has no Arabic letters
      if (!FENCE[m[1]]) box = box.replace(/<pre>[\s\S]*<\/pre>/, () => '<pre>'+code.map(l => l.split(/(\s{2,})/).map((s, j) => j % 2 || !s ? s : '<bdi'+(/[؀-ۿ]/.test(s) ? ' class="ar"' : '')+'>'+esc(s)+'</bdi>').join('')).join('\n')+'</pre>');
      out.push(box);
    } else if ((m = l.match(/^(#{2,3}) (.+)/))) out.push(m[1].length === 2 ? '<h4>'+inl(m[2])+'</h4>' : '<h5>'+inl(m[2])+'</h5>');
    else if (/^---+\s*$/.test(l)) out.push('<hr>');
    else if (l.startsWith('> ')){
      const q = [];
      for (; i < src.length && src[i].startsWith('> '); i++) q.push(inl(src[i].slice(2)));
      i--; out.push('<blockquote>'+q.join('<br>')+'</blockquote>');
    } else if (/^(- |\d+\. )/.test(l)){
      const ol = /^\d/.test(l), items = [];
      // an indented "  - " right under an item is a sub-list of that item
      for (; i < src.length && (ol ? /^\d+\. /.test(src[i]) : src[i].startsWith('- ') || /^ {2,}- /.test(src[i])); i++){
        if (/^ {2,}- /.test(src[i]) && items.length) items[items.length-1].sub.push('<li>'+inl(src[i].replace(/^ +- /, ''))+'</li>');
        else items.push({text: inl(src[i].replace(/^(- |\d+\. )/, '')), sub: []});
        if (ol) for (; i+1 < src.length && /^ {2,}- /.test(src[i+1]); i++) items[items.length-1].sub.push('<li>'+inl(src[i+1].replace(/^ +- /, ''))+'</li>');
      }
      i--; out.push((ol?'<ol>':'<ul>')+items.map(x => '<li>'+x.text+(x.sub.length ? '<ul>'+x.sub.join('')+'</ul>' : '')+'</li>').join('')+(ol?'</ol>':'</ul>'));
    } else if (l.startsWith('|')){
      const rows = [];
      for (; i < src.length && src[i].startsWith('|'); i++) if (!/^\|[\s:|-]+\|\s*$/.test(src[i])) rows.push(src[i].trim().replace(/^\||\|$/g, '').split(/\|(?![^[]*\]\])/).map(x => inl(x.trim()))); // a | inside [[code]] isn't a cell border
      i--; out.push('<div class="tbl"><table>'+rows.map((r, j) => '<tr>'+r.map(x => j ? '<td>'+x+'</td>' : '<th>'+x+'</th>').join('')+'</tr>').join('')+'</table></div>');
    } else {
      const p = [];
      for (; i < src.length && src[i].trim() && !/^(~~~|#{2,3} |---+\s*$|> |- |\d+\. |\|)/.test(src[i]); i++) p.push(inl(src[i]));
      i--; out.push('<p>'+p.join('<br>')+'</p>');
    }
  }
  return '<details class="teach" open><summary>الشرح خطوة بخطوة</summary>'+out.join('')+'</details>';
}
function deepHTML(c){
  const d = DEEP[shell+'|'+c];
  if (!d) return '';
  const part = (h, t) => t ? '<section><h4>'+h+'</h4>'+t.split(/\n\s*\n/).map(x => '<p>'+fmt(x.trim())+'</p>').join('')+'</section>' : '';
  return '<div class="deep">'+part('ليه موجود؟', d.why)+part('بيحصل إيه من جوه؟', d.how)+part('هتستخدمه إمتى؟', d.when)+part('غلطات شائعة', d.mistakes)+'</div>';
}
/* reference solution for the try task: hidden until the learner opens it */
function solHTML(c){
  const s = SOL[shell+'|'+c];
  if (!s) return '';
  return '<details class="trysol"><summary>الحل والناتج المتوقع (افتحه بعد ما تجرب)</summary>'+descHTML(s.text)+(s.code ? osBoxes(s.code, c) || termBlock(s.code, c, 'script') : '')+'</details>';
}
function breakHTML(c, ex){
  const b = BREAK[shell+'|'+c];
  if (!b || !ex) return '';
  const lines = ex.split('\n').filter(l => l.trim() && !/^\s*(#(?!(?:include|define|pragma|ifdef|ifndef|endif)\b|[A-Za-z_$][\w$]*\s*[=;(])|\/\/|REM\b)/.test(l));
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
  return osBoxes(ex) || termHTML(ex, shell, false, '');
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

const normAr = s => (s || '').toLowerCase()
  .replace(/[أإآٱ]/g, 'ا')
  .replace(/ة/g, 'ه')
  .replace(/ى/g, 'ي')
  .replace(/[\u064B-\u065F\u0670]/g, '');

const _st = {};
function searchText(sh, it){
  const k = sh+'|'+it[0];
  const note = normAr(store.get('note:'+sh+':'+it[0]) || '');
  if (_st[k]) return _st[k] + ' ' + note;
  const d = DEEP[k], b = BREAK[k];
  _st[k] = normAr(it.slice(0,5).join(' ')+' '+(d ? [d.why,d.how,d.when,d.mistakes].join(' ') : '')+' '+(b ? b.join(' ') : ''));
  return _st[k] + ' ' + note;
}
function noteHTML(c){
  const nk = 'note:'+shell+':'+c, v = store.get(nk) || '';
  return '<div class="notes"><button type="button" class="note-btn'+(v?' has':'')+'" aria-expanded="'+(v?'true':'false')+'">'+(v?'ملاحظتي':'اكتب ملاحظة')+'</button>'+
    '<textarea class="note'+(v?' open':'')+'" data-n="'+esc(nk)+'" placeholder="اكتب بكلامك انت: الأمر ده بيعمل إيه، وإمتى هتحتاجه، وأي غلطة وقعت فيها." aria-label="ملاحظتك على '+esc(c)+'">'+esc(v)+'</textarea></div>';
}
function render(){
  const rawQ = $('#q').value.trim();
  const q = normAr(rawQ);
  const cats = DATA[shell].map((c, i) => Object.assign({i}, c)).sort((a, b) => a.l - b.l).filter(c => !level || c.l === level);
  let html = '', chips = '', shown = 0, lastL = 0;
  cats.forEach(cat => {
    const items = cat.items.filter(it => !q || searchText(shell, it).includes(q));
    if (!items.length) return;
    shown += items.length;
    if (cat.l !== lastL){
      lastL = cat.l;
      html += '<div class="lvl"><span class="n">المستوى '+AR(cat.l)+'</span><h2>'+lvInfo(cat.l)[0]+'</h2><p>'+lvInfo(cat.l)[1]+'</p>'+examHTML(cat.l)+'</div>';
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
        (d?descHTML(d):'')+teachHTML(c)+deepHTML(c)+osNote(c)+
        (ex ? termBlock(ex, c, flag) : '')+breakHTML(c, ex)+
        '<button type="button" class="reveal">اكشف الإجابة</button>'+
        '<div class="try"><span class="lbl">'+(shell==='glossary'?'الشرح الكامل في':'جرّب')+'</span><p>'+fmt(tr)+'</p><label class="done"><input type="checkbox" data-k="'+esc(key)+'"'+(done?' checked':'')+'> جربتها</label></div>'+
        chkHTML(c)+solHTML(c)+noteHTML(c)+
      '</article>';
    });
    html += '</section>';
  });
  if (!shown){
    const other = Object.keys(DATA).filter(k => k!==shell && DATA[k].some(c => c.items.some(it => searchText(k, it).includes(q))));
    html = '<div class="empty">مفيش نتيجة لـ «'+esc(rawQ)+'» في '+SHELLS[shell].label+'.'+
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
  updateWeak(); updateDue(); lvBadges();
  let total = 0, done = 0;
  DATA[shell].filter(c => !level || c.l === level).forEach(c => c.items.forEach(it => { total++; if (store.get('done:'+shell+':'+it[0])==='1') done++; }));
  $('#doneN').textContent = AR(done);
  $('#allN').textContent = AR(total);
  $('#shellName').textContent = ({web:'المتصفح', sec:'أمان الموقع', start:'ابدأ من هنا', docker:'Docker', node:'Node و npm', pg:'PostgreSQL', diag:'التشخيص', gha:'GitHub Actions', wsl:'WSL', nginx:'Nginx', sshc:'ssh config', glossary:'القاموس', symbols:'الرموز', files:'الملفات وامتداداتها'}[shell] || SHELLS[shell].label) + (level ? ' المستوى '+AR(level) : '');
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
  // d و e فقرات فيها [[code]]، و c كود البداية (اختياري). مفاتيح s اللي هي تابات دروس (react، data...) بتتعرض كود مش أوامر
  const paras = s => s.split(/\n\s*\n/).map(p => '<p>'+fmt(p.trim())+'</p>').join('');
  const code = (src, k, label) => LESSON_TABS.includes(k) ? termHTML(src, k, true, label || SHELLS[k].label) : termHTML(src, k, false);
  $('#mBox').innerHTML = MISSIONS.map((m,i) =>
    '<div class="mission"><h3><span class="n">'+(i+1)+'</span>'+esc(m.t)+'</h3>'+paras(m.d)+(m.c ? code(m.c, Object.keys(m.s)[0], 'الكود اللي هتبدأ منه') : '')+'<details><summary>اعرض الحل بعد ما تجرب</summary><div class="sol">'+
    (m.e ? paras(m.e) : '')+Object.keys(m.s).map(k => code(m.s[k], k)).join('')+'</div></details></div>').join('');
}

/* ---------- study tools ---------- */
const THEMES = [['auto','تلقائي'],['light','فاتح'],['dark','غامق']];
function applyTheme(t){
  if (t==='light' || t==='dark') document.documentElement.dataset.theme = t; else delete document.documentElement.dataset.theme;
  $('#themeBtn').textContent = 'المظهر: '+(THEMES.find(x => x[0]===t) || THEMES[0])[1];
}

const fc = {pool:[], cur:null, last:null, ok:0, n:0, mode:'', missed:new Set(), wrong:[], over:false};
function fcStats(k){ try{ return JSON.parse(store.get('fc:'+k)) || {k:0,m:0}; }catch(e){ return {k:0,m:0}; } }
/* spaced repetition (Leitner): every «عرفتها» moves the card one box up, and each box waits longer before the card is due again.
   «لسه» sends it back to box 1. Stored as srs:<tab>:<cmd> = {box, due} with due as a local YYYY-MM-DD */
const SRS_DAYS = [1, 3, 7, 16, 35];
const day = (n = 0) => { const d = new Date(); d.setDate(d.getDate()+n); return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0'); };
function srsGet(k){ try{ const s = JSON.parse(store.get('srs:'+k)); return s && s.box ? s : null; }catch(e){ return null; } }
function srsRate(k, ok){ const s = srsGet(k), box = ok ? Math.min((s ? s.box : 0)+1, SRS_DAYS.length) : 1; store.set('srs:'+k, JSON.stringify({box, due:day(SRS_DAYS[box-1])})); }
const isDue = (k, today = day()) => { const s = srsGet(k); return !!s && s.due <= today; };
// progress from before the boxes has only fc: counts: forgotten cards start in box 1 and are due today, the rest as if reviewed today
function srsMigrate(){
  store.keys().forEach(k => {
    const key = k.slice(3);
    if (!k.startsWith('fc:') || srsGet(key)) return;
    const st = fcStats(key), weak = st.m > st.k, box = weak ? 1 : Math.min(Math.max(st.k-st.m, 1), 3);
    store.set('srs:'+key, JSON.stringify({box, due: weak ? day() : day(SRS_DAYS[box-1])}));
  });
}
function fcPick(){
  const today = day();
  // in «اختبرني» a due card weighs 8x, a card never seen 2x, and one that isn't due yet half
  const w = fc.pool.map(x => { if (x.key===fc.last && fc.pool.length>1) return 0; const st = fcStats(x.key), s = srsGet(x.key); return (st.m*3+1)/(st.k+1) * (fc.mode ? 1 : !s ? 2 : s.due <= today ? 8 : .5); });
  let r = Math.random() * w.reduce((a,b) => a+b, 0);
  for (let i = 0; i < w.length; i++){ r -= w[i]; if (r <= 0 && w[i]) return fc.pool[i]; }
  return fc.pool.find(x => x.key!==fc.last) || fc.pool[0];
}
const tabName = k => $('.sw[data-s="'+k+'"] .top b') ? $('.sw[data-s="'+k+'"] .top b').textContent : SHELLS[k].label;
const cards = (tab, keep) => { const a = []; DATA[tab].forEach(cat => { if (!keep || keep(cat)) cat.items.forEach(([c,t,d,ex,tr,flag]) => a.push({key:tab+':'+c, tab, cat:cat.t, c, t, d, ex, flag})); }); return a; };
const allCards = test => Object.keys(DATA).flatMap(k => cards(k).filter(x => test(x.key)));
let _lk; const lessonKeys = () => _lk || (_lk = new Set(allCards(() => true).map(x => x.key)));
// a card counts as "forgotten" while it was missed more often than recalled
const isWeak = key => { const st = fcStats(key); return st.m > st.k; };
const weakPool = () => allCards(isWeak);
const duePool = () => { const t = day(); return allCards(k => isDue(k, t)); };
function updateWeak(){
  let n = 0;
  // counted like weakPool(): a card of a lesson that no longer exists can't be reviewed, so it doesn't count
  store.keys().forEach(k => { if (k.startsWith('fc:') && lessonKeys().has(k.slice(3)) && isWeak(k.slice(3))) n++; });
  $('#weakN').textContent = AR(n);
  $('#weakBtn').hidden = !n;
}
function updateDue(){
  const t = day(); let n = 0;
  store.keys().forEach(k => { if (k.startsWith('srs:') && lessonKeys().has(k.slice(4)) && isDue(k.slice(4), t)) n++; });
  $('#dueN').textContent = AR(n);
  $('#dueBtn').hidden = !n;
}
function withTab(tab, fn){ const prev = shell; shell = tab; try{ return fn(); } finally { shell = prev; } }
function fcNext(){
  if (!fc.pool.length){ fcClose(); return; }
  const x = fc.cur = fc.mode==='exam' ? fc.pool[fc.n] : fcPick(); fc.last = x.key;
  const st = fcStats(x.key), cross = fc.mode==='weak' || fc.mode==='due', N = AR(fc.pool.length);
  $('#fcMeta').textContent = fc.mode==='exam' ? 'امتحان المستوى '+AR(fc.exam)+' · سؤال '+AR(fc.n+1)+' من '+N : (cross ? tabName(x.tab)+' › ' : '') + x.cat + (st.m ? ' · نسيتها '+AR(st.m)+' مرة' : '');
  $('#fcQ').textContent = x.t || x.c;
  $('#fcHint').textContent = x.tab==='glossary' ? 'إيه المصطلح ده، وبيعمل إيه؟' : 'إيه الأمر اللي بيعمل كده؟ قوله بصوت عالي أو اكتبه في دماغك، وبعدين اكشف.';
  $('#fcAns').hidden = true; $('#fcShow').hidden = false; $('#fcKnow').hidden = $('#fcMiss').hidden = true;
  const keys = 'مسافة تكشف، و 1 عرفتها، و 2 لسه.';
  if (fc.mode==='exam') $('#fcStat').textContent = (fc.n ? 'عرفت '+AR(fc.ok)+' من '+AR(fc.n)+' لحد دلوقتي. ' : '')+'تنجح لو عرفت '+AR(Math.ceil(fc.pool.length*.8))+' من '+N+'. '+keys;
  else {
    const due = fc.mode ? 0 : fc.pool.filter(y => isDue(y.key)).length;
    const from = fc.mode==='weak' ? 'اللي نسيته من كل التابات ('+N+' بطاقة). ' : fc.mode==='due' ? 'المراجعة المستحقة النهارده من كل التابات ('+N+' بطاقة). ' : 'البطاقات من '+$('#shellName').textContent+' ('+N+' بطاقة'+(due ? '، منهم '+AR(due)+' عليك مراجعتهم النهارده وبيظهروا الأول' : '')+'). ';
    $('#fcStat').textContent = (fc.n ? 'الجلسة دي: عرفت '+AR(fc.ok)+' من '+AR(fc.n)+'. ' : from)+keys;
  }
  $('#fcShow').focus();
}
function fcReveal(){
  const x = fc.cur, sum = x.d ? x.d.split(/\n\s*\n/)[0] : '', sol = fc.mode==='exam' && SOL[x.tab+'|'+x.c];
  $('#fcAns').innerHTML = '<span class="name">'+esc(x.c)+'</span>'+(sum ? '<p>'+fmt(sum)+'</p>' : '')+(x.ex ? withTab(x.tab, () => termBlock(x.ex, x.c, x.flag)) : '')+
    (sol ? '<div class="fc-sol"><b>حل التجربة:</b>'+descHTML(sol.text)+'</div>' : '');
  $('#fcAns').hidden = false; $('#fcShow').hidden = true; $('#fcKnow').hidden = $('#fcMiss').hidden = false;
  $('#fcKnow').focus();
}
function fcEnd(q, hint, html){
  fc.over = true; fc.cur = null;
  $('#fcQ').textContent = q; $('#fcHint').textContent = hint;
  $('#fcAns').innerHTML = html || ''; $('#fcAns').hidden = !html;
  $('#fcKnow').hidden = $('#fcMiss').hidden = $('#fcShow').hidden = true; $('#fcStat').textContent = '';
  $('#fcClose').focus();
}
function fcMark(ok){
  if (!fc.cur || fc.over) return;
  const key = fc.cur.key, st = fcStats(key); ok ? st.k++ : st.m++;
  store.set('fc:'+key, JSON.stringify(st));
  // a card missed earlier in this session stays in box 1 even if it's recalled later in the same session
  if (!ok){ srsRate(key, false); fc.missed.add(key); fc.wrong.push(fc.cur); } else if (!fc.missed.has(key)) srsRate(key, true);
  fc.n++; if (ok) fc.ok++;
  updateWeak(); updateDue();
  if (fc.mode==='exam'){ if (fc.n >= fc.pool.length) examFinish(); else fcNext(); return; }
  // in the forgotten-cards review a card leaves the pile once it's recalled more than missed; in the due review once it's recalled
  if (fc.mode==='weak' && !isWeak(key)) fc.pool = fc.pool.filter(x => x.key !== key);
  if (fc.mode==='due' && ok) fc.pool = fc.pool.filter(x => x.key !== key);
  const score = 'عرفت '+AR(fc.ok)+' من '+AR(fc.n)+' في الجلسة دي. ';
  if (fc.mode==='weak' && !fc.pool.length) return fcEnd('خلصت كل اللي كنت ناسيه', score+'ارجع بعد يوم وجرّب «اختبرني» تاني.');
  if (fc.mode==='due' && !fc.pool.length) return fcEnd('خلصت مراجعة النهارده', score+'كل بطاقة هترجعلك في ميعادها: اللي عرفتها بعد أيام أكتر، واللي نسيتها بكرة.');
  fcNext();
}
function fcStart(mode, pool, extra){
  Object.assign(fc, {mode, pool, ok:0, n:0, last:null, cur:null, over:false, missed:new Set(), wrong:[]}, extra);
  if (!pool.length) return;
  const dlg = $('#fc');
  if (typeof dlg.showModal === 'function'){ if (!dlg.open) dlg.showModal(); } else dlg.setAttribute('open', '');
  fcNext();
}
function fcOpen(mode){ fcStart(mode || '', mode==='weak' ? weakPool() : mode==='due' ? duePool() : cards(shell, c => !level || c.l === level)); }

/* level exam: up to 10 random lessons of one level, graded by the learner; 80% (8 of 10) passes. exam:<tab>:<level> = {last, pass} */
// an imported backup can hold anything, so only a well-formed record counts (and its date is escaped where it's shown)
function examGet(tab, l){ try{ const r = JSON.parse(store.get('exam:'+tab+':'+l)); return r && r.last && typeof r.last==='object' ? r : null; }catch(e){ return null; } }
const examScore = r => esc(AR(r.score)+'/'+AR(r.n));
function examHTML(l){
  const r = examGet(shell, l), n = Math.min(10, cards(shell, c => c.l === l).length);
  return '<div class="exam-row" data-l="'+l+'"><button type="button" class="quiz-btn exam-btn" data-exam="'+l+'">امتحان المستوى '+AR(l)+'</button>'+
    '<span class="exam-last">'+(r ? (r.pass ? '<b class="exam-ok">✓ عدّيته</b> ' : '')+'آخر نتيجة '+examScore(r.last)+' يوم '+esc(String(r.last.date)) : AR(n)+' أسئلة من المستوى ده، وتعدّي بـ '+AR(Math.ceil(n*.8)))+'</span></div>';
}
function lvBadges(){
  document.querySelectorAll('.lv').forEach(b => {
    const l = +b.dataset.l, old = b.querySelector('.lv-b'), r = l && examGet(shell, l);
    if (old) old.remove();
    if (r && r.pass) b.insertAdjacentHTML('beforeend', '<span class="lv-b" title="عدّيت امتحان المستوى ده ('+examScore(r.pass)+')"><span aria-hidden="true">✓</span><span class="vh">، عدّيت امتحانه</span></span>');
  });
  const eb = $('#examBtn'), has = !!level && DATA[shell].some(c => c.l===level && c.items.length);
  eb.hidden = !has;
  if (has){ const r = examGet(shell, level); eb.textContent = 'امتحان المستوى '+AR(level)+(r ? ' (آخر مرة '+examScore(r.last)+')' : ''); }
}
function examOpen(l){
  const all = cards(shell, c => c.l === l);
  for (let i = all.length-1; i > 0; i--){ const j = Math.floor(Math.random()*(i+1)); [all[i], all[j]] = [all[j], all[i]]; }
  fcStart('exam', all.slice(0, 10), {exam:l, examTab:shell});
}
function examFinish(){
  const n = fc.pool.length, need = Math.ceil(n*.8), pass = fc.ok >= need, l = fc.exam, now = {score:fc.ok, n, date:day()};
  const r = examGet(fc.examTab, l) || {};
  r.last = now; if (pass) r.pass = now;
  store.set('exam:'+fc.examTab+':'+l, JSON.stringify(r));
  const wrong = fc.wrong.length ? '<p>راجع دول:</p><ul class="fc-wrong">'+fc.wrong.map(x => '<li><code>'+esc(x.c)+'</code> '+esc(x.t || '')+'</li>').join('')+'</ul>' : '';
  $('#fcMeta').textContent = 'امتحان المستوى '+AR(l)+' · خلص';
  fcEnd(pass ? 'عدّيت امتحان المستوى '+AR(l)+': '+examScore(now) : 'لسه: '+examScore(now)+'، والنجاح من '+AR(need),
    pass ? 'المستوى ده اتعلّم عليه ✓. '+(fc.wrong.length ? 'وراجع اللي نسيته تحت، هيظهرلك في «عليك مراجعة» بكرة.' : 'ولا غلطة.') : 'راجع الدروس دي وارجع امتحن تاني. البطاقات اللي نسيتها هتظهرلك في «عليك مراجعة» بكرة.', wrong);
  if (fc.examTab===shell){ document.querySelectorAll('.exam-row[data-l="'+l+'"]').forEach(el => { el.outerHTML = examHTML(l); }); lvBadges(); }
}
function fcClose(){ const dlg = $('#fc'); if (dlg.close) dlg.close(); else dlg.removeAttribute('open'); }

/* ---------- auto-checked exercises (lesson field check) ---------- */
function chkHTML(c){
  const ch = CHECK[shell+'|'+c];
  if (!ch) return '';
  const k = shell+':'+c, saved = store.get('code:'+k), code = saved !== null ? saved : ch.starter || '', sql = ch.lang==='sql';
  return '<section class="chk" data-t="'+esc(shell)+'" data-c="'+esc(c)+'" aria-label="تمرين بيتصحح لوحده: '+esc(c)+'">'+
    '<div class="chk-h"><span class="lbl">تمرين بيتصحح لوحده</span><span class="chk-eng">'+(sql ? 'PostgreSQL حقيقي جوه المتصفح (PGlite)' : 'JavaScript، والاختبارات بتتشغل على كودك')+'</span>'+(store.get('chk:'+k)==='1' ? '<span class="chk-ok">✓ عدّى الاختبارات</span>' : '')+'</div>'+
    '<details class="chk-more"><summary>'+(sql ? 'الجداول والبيانات اللي هتشتغل عليها' : 'الاختبارات اللي هتتشغل على كودك')+'</summary>'+termHTML(sql ? ch.setup : ch.tests, shell, true, sql ? 'setup.sql' : 'tests.js')+'</details>'+
    '<textarea class="chk-code" dir="ltr" spellcheck="false" autocapitalize="off" autocomplete="off" autocorrect="off" rows="'+Math.min(Math.max(code.split('\n').length+1, 4), 16)+'" aria-label="'+(sql ? 'استعلام SQL بتاعك' : 'كود JavaScript بتاعك')+'">'+esc(code)+'</textarea>'+
    '<div class="chk-actions"><button type="button" class="chk-run">شغّل واختبر</button><button type="button" class="chk-reset">رجّع كود البداية</button><span class="chk-kbd">أو Ctrl+Enter</span></div>'+
    '<div class="chk-out" role="status" aria-live="polite"></div></section>';
}
// JS runs in a Worker built from runJsCheck's source (core.js): a blob works from file:// and in the single-file build,
// and a loop that never ends is stopped by terminate() after 3 seconds
let jsWorkerURL;
function runJs(code, tests){
  return new Promise(res => {
    let w;
    try{
      jsWorkerURL = jsWorkerURL || URL.createObjectURL(new Blob(['const runJsCheck = '+runJsCheck+';\nonmessage = async e => postMessage(await runJsCheck(e.data.code, e.data.tests));'], {type:'text/javascript'}));
      w = new Worker(jsWorkerURL);
    }catch(e){ return res({results:[], error:'المتصفح ده مش مخلّيني أشغّل الكود في worker: [['+e.message+']]'}); }
    const end = r => { clearTimeout(tm); w.terminate(); res(r); };
    const tm = setTimeout(() => end({timeout:true, results:[]}), 3000);
    w.onmessage = e => end(e.data);
    w.onerror = e => { e.preventDefault(); end({results:[], error:'الكود وقع: [['+e.message+']]'}); };
    w.postMessage({code, tests});
  });
}
function jsResultHTML(r){
  if (r.timeout) return '<p class="chk-sum bad">الكود مخلصش: غالبًا loop مبتخلصش، أو الحل أبطأ من المطلوب (زي O(n^2) على اختبار كبير). راجع شرط الوقوف في الـ while أو الـ for (وقفناه بعد ٣ ثواني).</p>';
  const n = r.results.filter(x => x.ok).length, all = r.results.length;
  let h = r.error ? '<p class="chk-sum bad">'+fmt(r.error)+'</p>' : '<p class="chk-sum '+(n===all ? 'ok' : 'bad')+'">'+(n===all ? '✓ كل الاختبارات عدّت ('+AR(n)+' من '+AR(all)+')، واتعلّم على «جربتها».' : 'عدّى '+AR(n)+' من '+AR(all)+'. صلّح اللي عليه ✗ وجرّب تاني.')+'</p>';
  if (all) h += '<ul class="chk-res">'+r.results.map(x => '<li class="'+(x.ok ? 'ok' : 'bad')+'"><span class="mk" aria-hidden="true">'+(x.ok ? '✓' : '✗')+'</span><span class="vh">'+(x.ok ? 'عدّى: ' : 'فشل: ')+'</span><span class="tn">'+esc(x.name)+'</span>'+(x.msg ? '<span class="msg">'+fmt(x.msg)+'</span>' : '')+'</li>').join('')+'</ul>';
  if (r.logs && r.logs.length) h += '<div class="chk-log"><b>console.log</b><pre dir="ltr">'+esc(r.logs.join('\n'))+'</pre></div>';
  return h;
}
// SQL runs on real Postgres (PGlite, vendor/pglite) in a module worker, loaded the first time a SQL exercise is focused or run.
// It needs http(s): file:// and the single-file dist can't load the worker, so they show a note instead
const sqlEng = {w:null, ready:null, id:0};
function sqlReady(){
  if (!/^https?:$/.test(location.protocol)) return Promise.reject(new Error('file'));
  if (!sqlEng.ready) sqlEng.ready = new Promise((res, rej) => {
    let w;
    try{ w = new Worker('js/sql-worker.js', {type:'module'}); }catch(e){ return rej(e); }
    w.onmessage = e => { if (e.data.id) return; if (e.data.ready){ sqlEng.w = w; res(w); } else if (e.data.fail){ w.terminate(); rej(new Error(e.data.fail)); } };
    w.onerror = e => { if (e.preventDefault) e.preventDefault(); if (sqlEng.w===w) return; w.terminate(); rej(new Error(e.message || 'js/sql-worker.js مش موجود')); };
  }).catch(e => { sqlEng.ready = null; throw e; });
  return sqlEng.ready;
}
function sqlExec(w, msg){
  return new Promise(res => {
    const id = ++sqlEng.id;
    const tm = setTimeout(() => { w.terminate(); sqlEng.w = sqlEng.ready = null; res({timeout:true}); }, 5000);
    const h = e => { if (e.data.id!==id) return; clearTimeout(tm); w.removeEventListener('message', h); res(e.data); };
    w.addEventListener('message', h);
    w.postMessage(Object.assign({id}, msg));
  });
}
function tblHTML(cap, r){
  const rows = r.rows.slice(0, 20), cell = v => v===null ? '<td class="nul">NULL</td>' : '<td>'+esc(String(v))+'</td>';
  return '<div class="chk-tbl"><p class="cap">'+cap+' ('+AR(r.rows.length)+' صف)</p>'+(r.rows.length || r.cols.length ? '<div class="chk-scroll" dir="ltr"><table>'+(r.cols.length ? '<thead><tr>'+r.cols.map(c => '<th>'+esc(c)+'</th>').join('')+'</tr></thead>' : '')+
    '<tbody>'+rows.map(x => '<tr>'+x.map(cell).join('')+'</tr>').join('')+'</tbody></table></div>' : '')+(r.rows.length > 20 ? '<p class="cap">وكمان '+AR(r.rows.length-20)+' صف</p>' : '')+'</div>';
}
async function runSql(ch, code, status){
  let w;
  try{ if (!sqlEng.w) status('بيحمّل PostgreSQL: حوالي ٦ ميجا أول مرة بس، وبعدها بيشتغل من غير نت…'); w = await sqlReady(); }
  catch(e){ return {html:'<p class="chk-sum bad">التمارين دي محتاجة النسخة الأونلاين أو التطبيق. '+(e.message==='file' ? 'انت فاتح الصفحة كملف من الجهاز، والمتصفح مبيسمحش يحمّل محرك قاعدة البيانات كده.' : 'محرك PostgreSQL محملش: '+esc(e.message))+'</p>'}; }
  status('بيشغّل الاستعلام…');
  const r = await sqlExec(w, {setup:ch.setup, sql:code, ref:ch.expectSql});
  if (r.timeout) return {html:'<p class="chk-sum bad">الاستعلام مخلصش في ٥ ثواني: غالبًا WITH RECURSIVE مبيقفش. هنحمّل المحرك من جديد في التشغيل الجاي.</p>'};
  if (r.fail) return {html:'<p class="chk-sum bad">التمرين نفسه فيه مشكلة، مش انت:</p><pre class="chk-err" dir="ltr">'+esc(r.fail)+'</pre>'};
  if (r.got.err) return {html:'<p class="chk-sum bad">PostgreSQL رجّع error:</p><pre class="chk-err" dir="ltr">'+esc(r.got.err)+'</pre>'};
  const exp = r.exp || {cols:[], rows:ch.expect}, diff = sqlDiff(r.got.rows, exp.rows, ch.ordered);
  return {pass:!diff, html:'<p class="chk-sum '+(diff ? 'bad' : 'ok')+'">'+(diff ? esc(diff) : '✓ الناتج مطابق، واتعلّم على «جربتها».')+'</p>'+tblHTML('ناتج استعلامك', r.got)+(diff ? tblHTML('الناتج المتوقع', exp) : '')};
}
async function chkRun(box){
  const t = box.dataset.t, c = box.dataset.c, ch = CHECK[t+'|'+c], out = box.querySelector('.chk-out'), btn = box.querySelector('.chk-run'), code = box.querySelector('.chk-code').value;
  if (!ch || btn.disabled) return;
  const status = m => { out.innerHTML = '<p class="chk-wait">'+m+'</p>'; };
  btn.disabled = true; btn.setAttribute('aria-busy', 'true'); status('بيشغّل…');
  try{
    let res;
    if (ch.lang==='sql') res = await runSql(ch, code, status);
    else { const r = await runJs(code, ch.tests); res = {pass: !r.timeout && !r.error && r.results.length > 0 && r.results.every(x => x.ok), html: jsResultHTML(r)}; }
    out.innerHTML = res.html;
    if (res.pass) chkPass(box, t, c);
  }catch(e){ out.innerHTML = '<p class="chk-sum bad">حصلت مشكلة: '+esc(String(e && e.message || e))+'</p>'; }
  finally{ btn.disabled = false; btn.removeAttribute('aria-busy'); }
}
// all tests pass → chk:<tab>:<cmd> = 1, and the lesson's «جربتها» gets checked
function chkPass(box, t, c){
  store.set('chk:'+t+':'+c, '1'); store.set('done:'+t+':'+c, '1');
  const art = box.closest('article'), cb = art && art.querySelector('input[type=checkbox][data-k]');
  if (cb) cb.checked = true;
  // in «اللي فاضل بس» the lesson would vanish with its result, so it's hidden on the next render instead
  if (art && !document.body.classList.contains('todo')) art.classList.add('is-done');
  if (!box.querySelector('.chk-ok')) box.querySelector('.chk-h').insertAdjacentHTML('beforeend', '<span class="chk-ok">✓ عدّى الاختبارات</span>');
  updateProgress();
}

const BACKUP_KEYS = /^(done:|note:|fc:|srs:|exam:|chk:|code:|shell$|level$|brief$|todo$|theme$)/;
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
      srsMigrate();
      if (o.theme) applyTheme(o.theme);
      if (o.todo !== undefined) { document.body.classList.toggle('todo', o.todo === '1'); $('#todoBtn').setAttribute('aria-pressed', o.todo === '1' ? 'true' : 'false'); }
      if (o.brief !== undefined) { document.body.classList.toggle('brief', o.brief === '1'); $('#briefBtn').setAttribute('aria-pressed', o.brief === '1' ? 'true' : 'false'); }
      if (o.level !== undefined && [0,1,2,3].includes(+o.level)) { level = +o.level; markLevel(); }
      if (o.shell && DATA[o.shell]) setShell(o.shell); else render();
      alert('اترجّع '+n+' عنصر.');
    }catch(e){ alert('الملف ده مش نسخة تقدم من الصفحة دي.'); }
  };
  r.readAsText(file);
}

/* ---------- events ---------- */
document.querySelectorAll('.sw').forEach(b => b.addEventListener('click', () => setShell(b.dataset.s)));
let qTm;
$('#q').addEventListener('input', () => {
  clearTimeout(qTm);
  qTm = setTimeout(render, 120);
});
document.addEventListener('keydown', e => {
  if ((e.code === 'Slash' || e.key === '/' || e.key === 'ظ') && document.activeElement !== $('#q') && !/^(TEXTAREA|INPUT)$/.test(document.activeElement.tagName) && !$('#fc').open){ e.preventDefault(); $('#q').focus(); }
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
  if (e.target.closest('#weakBtn')){ fcOpen('weak'); return; }
  if (e.target.closest('#dueBtn')){ fcOpen('due'); return; }
  if (e.target.closest('#examBtn')){ examOpen(level); return; }
  const ex = e.target.closest('[data-exam]');
  if (ex){ examOpen(+ex.dataset.exam); return; }
  const run = e.target.closest('.chk-run');
  if (run){ chkRun(run.closest('.chk')); return; }
  const rs = e.target.closest('.chk-reset');
  if (rs){
    const box = rs.closest('.chk'), ta = box.querySelector('.chk-code');
    ta.value = CHECK[box.dataset.t+'|'+box.dataset.c].starter || ''; store.del('code:'+box.dataset.t+':'+box.dataset.c);
    box.querySelector('.chk-out').innerHTML = ''; ta.focus(); return;
  }
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
    if (confirm('هتمسح علامات «جربتها» ونتايج «اختبرني» والمراجعة والامتحانات والتمارين في '+name+'. الملاحظات والكود اللي كتبته مش هيتمسحوا. متأكد؟')){
      store.keys().filter(k => ['done:','fc:','srs:','exam:','chk:'].some(p => k.startsWith(p+shell+':'))).forEach(k => store.del(k));
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
// the SQL engine is ~6 MB, so it starts loading only when the learner reaches a SQL exercise's box
document.addEventListener('focusin', e => {
  const box = e.target.closest('.chk');
  if (box && e.target.matches('.chk-code') && (CHECK[box.dataset.t+'|'+box.dataset.c] || {}).lang==='sql') sqlReady().catch(() => {});
});
$('#importFile').addEventListener('change', e => { const fl = e.target.files[0]; if (fl) importProgress(fl); e.target.value = ''; });
document.addEventListener('input', e => {
  const code = e.target.closest('.chk-code');
  if (code){ const box = code.closest('.chk'); store.set('code:'+box.dataset.t+':'+box.dataset.c, code.value); return; }
  const ta = e.target.closest('textarea[data-n]');
  if (!ta) return;
  const v = ta.value.trim();
  v ? store.set(ta.dataset.n, ta.value) : store.del(ta.dataset.n);
  const nb = ta.previousElementSibling; nb.classList.toggle('has', !!v); nb.textContent = v ? 'ملاحظتي' : 'اكتب ملاحظة';
});
document.addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && e.key==='Enter' && e.target.closest('.chk-code')){ e.preventDefault(); chkRun(e.target.closest('.chk')); return; }
  if (!$('#fc').open) return;
  const asking = !$('#fcShow').hidden;
  if (asking && e.key===' ' && document.activeElement!==$('#fcShow')){ e.preventDefault(); fcReveal(); }
  else if (!asking && (e.key==='1' || e.key==='١' || e.code==='Digit1' || e.code==='Numpad1')){ e.preventDefault(); fcMark(true); }
  else if (!asking && (e.key==='2' || e.key==='٢' || e.code==='Digit2' || e.code==='Numpad2')){ e.preventDefault(); fcMark(false); }
});
document.addEventListener('change', e => {
  const cb = e.target.closest('input[type=checkbox][data-k]');
  if (!cb) return;
  store.set(cb.dataset.k, cb.checked ? '1':'0');
  cb.closest('article').classList.toggle('is-done', cb.checked);
  updateProgress();
});

renderStatic();
srsMigrate();
applyTheme(store.get('theme') || 'auto');
if (store.get('todo')==='1'){ document.body.classList.add('todo'); $('#todoBtn').setAttribute('aria-pressed','true'); }
if (store.get('brief')==='1'){ document.body.classList.add('brief'); $('#briefBtn').setAttribute('aria-pressed','true'); }
const savedL = +(store.get('level') || 0);
if ([0,1,2,3].includes(savedL)){ level = savedL; markLevel(); }
const fromHash = decodeURIComponent(location.hash.slice(1)), saved = store.get('shell');
setShell(DATA[fromHash] ? fromHash : DATA[saved] ? saved : 'start');
window.addEventListener('hashchange', () => { const h = decodeURIComponent(location.hash.slice(1)); if (DATA[h] && h !== shell) setShell(h); });

/* ---------- offline (PWA) ---------- */
// only on the hosted site: the single-file copy in dist/ has no manifest, and file:// can't run service workers
if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol) && document.querySelector('link[rel="manifest"]')){
  window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
}
