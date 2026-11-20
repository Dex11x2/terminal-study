// العرض والبحث والتقدم وأدوات المذاكرة
/* ---------- helpers ---------- */
const $ = s => document.querySelector(s);
const esc = s => s.replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
// [[code]] → <code>; the \]* keeps closing brackets that belong to the code, e.g. [[arr[0]]] → arr[0]
// [[code]] becomes <code>, and **bold** becomes <b>. The code is set aside first so a ** inside it ([[2 ** 53]])
// stays as written, while bold can still wrap code (**[[27]]**)
const fmt = s => {
  const codes = [];
  return esc(s).replace(/\[\[(.+?\]*)\]\]/g, (_, c) => '\u0000' + (codes.push(c) - 1) + '\u0000')
    .replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')
    .replace(/\u0000(\d+)\u0000/g, (_, i) => '<code>' + codes[i] + '</code>');
};
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
const LESSON_TABS = ['start','vue','pydata','web','sec','glossary','real','os','tools','vscode','js','ts','css','react','next','api','data','pyapi','php','flutter','ai','arch','interview','dsa','sweng','apis','cloud','projects','career','english','dotnet','angular','spring','rn','speak','cpp','kotlin','swift','go','symbols','files','net','re'];
function countLabel(n){
  const lesson = LESSON_TABS.includes(shell);
  if (shell==='glossary') return n + ' مصطلح';
  if (n===1) return lesson ? 'درس واحد' : 'أمر واحد';
  if (n===2) return lesson ? 'درسين' : 'أمرين';
  return n + ' ' + (lesson ? (n>10?'درس':'دروس') : (n>10?'أمر':'أوامر'));
}
/* every paragraph of desc is shown; after the first they get .more, which the brief mode hides */
function descHTML(d){
  // the first paragraph is the summary; the rest may hold fences, tables and lists, so it goes through mdHTML
  // the summary ends at the first blank line, or earlier where a fence, table or list starts right under it
  // a solution may open straight with a fence or a table: then all of it is markdown
  if (/^(~~~|\||- |\d+\. |#{2,3} |> )/.test(d)) return '<div class="desc">'+mdHTML(d.trim())+'</div>';
  const blank = d.search(/\n\s*\n/), block = d.search(/\n(~~~|\||- |\d+\. |#{2,3} |> )/);
  const cut = blank < 0 ? block : block < 0 ? blank : Math.min(blank, block);
  if (cut < 0) return '<p class="desc">'+fmt(d.trim())+'</p>';
  return '<p class="desc">'+fmt(d.slice(0, cut).trim())+'</p><div class="desc more">'+mdHTML(d.slice(cut).trim())+'</div>';
}
/* the long step-by-step explanation (lesson field teach), written in a small markdown:
   ## and ### headings, ~~~lang label fences (~~~ because lesson text can't hold backticks), - and 1. lists, | tables |, > notes, --- separators, **bold**, [[code]] */
const FENCE = {powershell:['ps','PowerShell'], ps:['ps','PowerShell'], bash:['bash','bash'], sh:['bash','bash'], cmd:['cmd','CMD'], zsh:['zsh','zsh']};
function teachHTML(c){
  const t = TEACH[shell+'|'+c];
  if (!t) return '';
  return '<details class="teach" open><summary>الشرح خطوة بخطوة</summary>'+mdHTML(t)+'</details>';
}
/* the mini-markdown of teach (and deep): ~~~ fences, ## headings, ---, > quotes, - and 1. lists, | tables, paragraphs */
function mdHTML(t){
  const inl = fmt;
  const src = t.split('\n'), out = [];
  for (let i = 0; i < src.length; i++){
    const l = src[i];
    if (!l.trim()) continue;
    let m;
    if ((m = l.match(/^~~~(\w*)\s*(.*)$/))){
      const code = [];
      for (i++; i < src.length && !/^~~~\s*$/.test(src[i]); i++) code.push(src[i]);
      if (m[1] === 'live' || m[1] === 'view'){ out.push(liveHTML(code.join('\n'), m[2], m[1] === 'view')); continue; }
      const [k, name] = FENCE[m[1]] || [shell, m[1] === 'text' || !m[1] ? '' : m[1]];
      let box = termHTML(code.join('\n'), k, true, m[2] || name || 'الناتج').replace('class="term"', 'class="term os tcode"');
      // diagrams and outputs: every piece between 2+ spaces keeps its column (an Arabic run would otherwise flip the order of the pieces),
      // and Arabic gets the page font, since the code font has no Arabic letters
      // HTML with Arabic text: each Arabic run is isolated, so the tags stay in the order they were typed (left to right) and the Arabic reads right inside its own run
      if (m[1] === 'html') box = box.replace(/<pre>[\s\S]*<\/pre>/, () => '<pre>'+code.map(l => {
        let o = '', at = 0;
        for (const r of l.matchAll(/[؀-ۿ](?:[؀-ۿ\s\d.,:;!?()«»%+–-]*[؀-ۿ.!»])?/g)){ o += esc(l.slice(at, r.index))+'<bdi class="ar" dir="rtl">'+esc(r[0])+'</bdi>'; at = r.index + r[0].length; }
        return o + esc(l.slice(at));
      }).join('\n')+'</pre>').replace('<pre>', '<pre class="wrap">');
      else if (!FENCE[m[1]]) box = box.replace(/<pre>[\s\S]*<\/pre>/, () => '<pre>'+code.map(l => l.split(/(\s{2,})/).map((s, j) => j % 2 || !s ? s : '<bdi'+(/[؀-ۿ]/.test(s) ? ' class="ar"' : '')+'>'+esc(s)+'</bdi>').join('')).join('\n')+'</pre>');
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
      for (; i < src.length && src[i].startsWith('|'); i++) if (!/^\|[\s:|-]+\|\s*$/.test(src[i])) rows.push(src[i].trim().replace(/^\||\|$/g, '').split(/(?<!\\)\|(?![^[]*\]\])/).map(x => inl(x.trim().replace(/\\\|/g, '|')))); // a | inside [[code]] or written \| isn't a cell border
      i--; out.push('<div class="tbl"><table>'+rows.map((r, j) => '<tr>'+r.map(x => j ? '<td>'+x+'</td>' : '<th>'+x+'</th>').join('')+'</tr>').join('')+'</table></div>');
    } else {
      const p = [];
      for (; i < src.length && src[i].trim() && !/^(~~~|#{2,3} |---+\s*$|> |- |\d+\. |\|)/.test(src[i]); i++) p.push(inl(src[i]));
      i--; out.push('<p>'+p.join('<br>')+'</p>');
    }
  }
  return out.join('');
}
/* ~~~live [height] [title]: an HTML page shown as code and, under it, as the real rendered page
   (ROADMAP rule 3.4: an HTML/CSS solution shows what it looks like). ~~~view: the rendered page only, when the files were shown above one by one.
   A fragment gets a minimal Arabic RTL document around it. The page runs in a sandboxed iframe: its own origin, no access to this site. */
const liveDoc = code => /<html[\s>]|<!doctype/i.test(code) ? code : '<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head><body>\n'+code+'\n</body></html>';
/* what the preview iframe gets: the page plus one helper. A sandboxed srcdoc frame doesn't follow <a href="#id"> on its own,
   so the helper scrolls to the target the way a real page would (the code the reader sees stays exactly as written). */
const LIVE_HASH = '<script>document.addEventListener("click",function(e){var a=e.target.closest&&e.target.closest("a[href^=\\"#\\"]");if(!a||e.defaultPrevented)return;var id=decodeURIComponent(a.getAttribute("href").slice(1));var t=id&&id!=="top"?document.getElementById(id):document.documentElement;if(!t)return;e.preventDefault();t.scrollIntoView();if(t.focus&&t.tabIndex>=0)t.focus()})<\/script>';
// the frame also reports its content height, so a preview whose height nobody measured (data-auto) can fit itself
const LIVE_SIZE = '<script>(function(){function p(){var b=document.body,h=Math.max(document.documentElement.offsetHeight,b?b.offsetHeight+32:0);if(h>0)parent.postMessage({liveH:h},"*")}addEventListener("load",function(){p();setTimeout(p,400)});addEventListener("resize",p)})()<\/script>';
const liveFrame = code => liveDoc(code) + LIVE_HASH + LIVE_SIZE;
addEventListener('message', e => {
  if (!e.data || typeof e.data.liveH !== 'number') return;
  for (const f of document.querySelectorAll('iframe[data-auto]')) if (f.contentWindow === e.source){
    const h = Math.max(60, Math.min(520, Math.ceil(e.data.liveH) + 2));
    f.style.setProperty('--h', h+'px'); f.style.setProperty('--hm', h+'px');
  }
});
/* «الشكل النهائي»: the finished page shown before the reader starts, result only and no code
   (owner, 19 Nov: «عاوز ع كل مثال هيطلع شكله عامل ازاي… عشان الناس تتحمس تعمل المشاريع»).
   Projects show the first ~~~view of their solution (or its index.html, or its first ~~~live); a drill solved in the page shows its reference solution;
   a lesson's HTML example gets its page drawn under it. */
function showHTML(code, name, h, hm, auto){
  return '<div class="live show"><div class="live-bar"><span>'+esc(name)+'</span><span class="live-w">'+
    [['360', 'موبايل'], ['768', 'تابلت'], ['', 'كامل']].map(([w, l]) => '<button type="button" data-lw="'+w+'"'+(w ? '' : ' class="on"')+'>'+l+'</button>').join('')+'</span></div>'+
    '<div class="live-f"><iframe sandbox="allow-scripts allow-forms" loading="lazy" title="'+esc(name)+'"'+(auto ? ' data-auto="1"' : '')+' style="--h:'+h+'px;--hm:'+hm+'px" srcdoc="'+esc(liveFrame(code))+'"></iframe></div></div>';
}
/* the solution box of a project or challenge: closed (the reader tries first), but its summary is a big, obvious button
   that says what is inside (owner, 20 Nov: the code and the explanation were there but nobody noticed the small line) */
const solBox = (sol, first) => {
  if (!sol) return '';
  const files = [...String(sol).matchAll(/^~~~\w+[ \t]+([\w.-]+(?:\/[\w.-]+)*\.\w+)[ \t]*$/gm)].length;
  const what = files === 2 ? 'الكود الكامل (ملفين) والشرح خطوة بخطوة' : files > 2 ? 'الكود الكامل ('+files.toLocaleString('ar-EG')+' ملفات) والشرح خطوة بخطوة' : files === 1 ? 'الكود الكامل والشرح خطوة بخطوة' : 'الحل والشرح خطوة بخطوة';
  return '<details class="psol psol--sol"><summary><span class="psol-t">'+what+'</span><span class="psol-h">'+first+'، وبعدين افتحه وقارن</span></summary><div class="psol-b">'+mdHTML(sol)+'</div></details>';
};
const solFences = sol => [...String(sol || '').matchAll(/^~~~(live|view|html)[ \t]*([^\n]*)\n([\s\S]*?)^~~~[ \t]*$/gm)].map(m => ({lang: m[1], title: m[2].trim(), code: m[3].replace(/\n$/, '')}));
const fenceH = (f, cap) => { const m = f.title.match(/^(\d{2,4})(?:\s+(\d{2,4}))?/), h = m ? +m[1] : 280; return [Math.min(h, cap), Math.min(m && m[2] ? +m[2] : h, cap)]; };
/* A project's «الشكل النهائي» is a button that opens the page in its own tab. Drawing it here put dozens of full pages
   (with their images as data URIs) into one course page and made it slow (owner, 20 Nov: «زرار ادوس عليه يدخلني ع الصفحة»).
   The page is kept in SHOWS and only turned into a frame when asked for. */
const SHOWS = [];
function projShowHTML(p){
  const fs = solFences(p.sol).filter(f => f.lang !== 'html');
  const f = fs.find(f => f.lang === 'view') || fs.find(f => /(^|[\s/])index\.html$/.test(f.title)) || fs[0];
  if (!f) return '';
  const [h, hm] = fenceH(f, 440);
  SHOWS.push({code: f.code, title: String(p.t).split('[[').join('').split(']]').join(''), h, hm});
  return '<button type="button" class="show-open" data-show="'+(SHOWS.length - 1)+'">شوف الشكل النهائي اللي هتبنيه <span aria-hidden="true">↗</span></button>';
}
// the new tab: a small page of our own (title, phone/tablet/full buttons) around the same sandboxed frame the site always uses.
// window.open('') then document.write needs no extra file, so it also works in the single-file build (terminal.html)
function showPage(s){
  return '<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">'+
    '<title>الشكل النهائي: '+esc(s.title)+'</title><style>'+
    'body{margin:0;font-family:system-ui,"Segoe UI",Tahoma,sans-serif;background:#1b1b24;color:#f3f3f7;height:100vh;display:flex;flex-direction:column}'+
    'header{display:flex;flex-wrap:wrap;align-items:center;gap:8px 16px;padding:10px 16px;border-bottom:1px solid #3a3a48}'+
    'h1{margin:0;font-size:16px;flex:1 1 16rem}button{font:inherit;padding:4px 12px;border:1px solid #55556a;border-radius:6px;background:#26263a;color:inherit;cursor:pointer}'+
    'button.on{background:#f0a6ca;color:#1b1b24;border-color:#f0a6ca}button:focus-visible{outline:3px solid #f0a6ca;outline-offset:2px}'+
    'main{flex:1;display:flex;justify-content:center;background:#e9e9ee;overflow:auto}iframe{border:0;background:#fff;width:100%;height:100%}'+
    '</style></head><body><header><h1>الشكل النهائي: '+esc(s.title)+'</h1><span>'+
    [['360', 'موبايل'], ['768', 'تابلت'], ['', 'كامل']].map(([w, l]) => '<button type="button" data-w="'+w+'"'+(w ? '' : ' class="on"')+'>'+l+'</button>').join(' ')+
    '</span></header><main><iframe sandbox="allow-scripts allow-forms" title="الشكل النهائي" srcdoc="'+esc(liveFrame(s.code))+'"></iframe></main>'+
    '<script>document.querySelector("header").addEventListener("click",function(e){var b=e.target.closest("[data-w]");if(!b)return;'+
    'document.querySelector("iframe").style.width=b.dataset.w?b.dataset.w+"px":"100%";'+
    'document.querySelectorAll("[data-w]").forEach(function(x){x.classList.toggle("on",x===b)})});<\/script></body></html>';
}
function openShow(btn){
  const s = SHOWS[+btn.dataset.show];
  if (!s) return;
  const w = window.open('', '_blank');
  if (w){ w.opener = null; w.document.write(showPage(s)); w.document.close(); return; }
  // popups blocked: draw it here under the button, as before
  btn.insertAdjacentHTML('afterend', showHTML(s.code, 'الشكل النهائي اللي هتبنيه', s.h, s.hm));
  btn.remove();
}
function drillShowHTML(p){
  // a «predict» or «classify» drill would be given away by its answer; the rest show what the finished page looks like
  if (!p.work || /^\*\*(اقرا وتوقّع|صنّف|توقّع)/.test(p.t)) return '';
  const fs = solFences(p.sol), f = p.work.sol !== undefined ? {title: '', code: p.work.sol} : fs[p.work.solAt || 0];
  if (!f) return '';
  const h = p.work.h || fenceH(f, 360)[0];
  return showHTML(f.code, 'الشكل المطلوب لما تخلّص', Math.min(h, 360), Math.min(h, 360));
}
function exShowHTML(ex){
  if (shell !== 'css' || !/^\s*</.test(ex) || /className=|\{\{|=>|<\?php/.test(ex) || /\ssrc="(?!data:)/.test(ex)) return '';
  if (!/<(p|h[1-6]|ul|ol|dl|table|form|a|button|img|input|div|section|article|main|nav|header|footer|figure|blockquote|details|dialog|audio|video|svg|span|strong|em|label|select|textarea|progress|meter|pre|address)[\s>]/.test(ex)) return ''; // head-only snippets have nothing to draw
  return showHTML(ex, 'شكل المثال ده في المتصفح', 160, 160, true);
}
/* «ابدأ إزاي»: the same six steps for every HTML project that names its folder (project field dir): make the folder and files in the terminal,
   open it in VS Code, write, see it in Chrome, inspect it, then compare with the solution. The file names come from the solution's fence titles. */
function projStartHTML(p){
  if (!p.dir) return '';
  const files = [...new Set([...String(p.sol || '').matchAll(/^~~~\w+[ \d]*?([\w.-]+(?:\/[\w.-]+)*\.(?:html|css|js))\s*$/gm)].map(m => m[1]))];
  if (!files.includes('index.html')) files.unshift('index.html');
  // files inside subfolders (blog/index.html): the subfolders are made first
  const subs = [...new Set(files.filter(f => f.includes('/')).map(f => f.slice(0, f.lastIndexOf('/'))))];
  const d = p.dir, more = files.length > 1;
  // cont: the project goes on inside a folder an earlier project (or the unit's lessons) already made
  const first = p.cont
    ? '**١. ادخل فولدر المشروع اللي عملته قبل كده.** المشروع ده بيكمّل على نفس الفولدر، فمتعملش فولدر جديد. افتح الترمنال في المكان اللي فيه [['+d+']] واكتب:\n\n'+
      '~~~powershell\ncd '+d+'\nls\n~~~\n\n'+
      '[[ls]] بيوريك الملفات اللي عندك من المرة اللي فاتت، وهي شغالة في PowerShell و bash. الملفات الجديدة اللي المطلوب بيسمّيها اعملها بـ [[ni اسم-الملف.html]] (في PowerShell) أو [[touch اسم-الملف.html]] (في bash والماك)، والملفات الموجودة سيبها زي ما هي.\n\n'
    : '**١. اعمل فولدر المشروع و'+(more ? 'ملفاته' : 'ملفه')+' من الترمنال.** افتح الترمنال في المكان اللي بتحط فيه شغلك، واكتب:\n\n'+
      '~~~powershell\nmkdir '+d+'\ncd '+d+'\n'+(subs.length ? 'mkdir '+subs.join(', ')+'\n' : '')+'ni '+files.join(', ')+'\n~~~\n\n~~~bash\nmkdir '+d+' && cd '+d+'\n'+(subs.length ? 'mkdir -p '+subs.join(' ')+'\n' : '')+'touch '+files.join(' ')+'\n~~~\n\n'+
      '[[mkdir]] بيعمل الفولدر، و [[cd]] بيدخّلك جواه، و [[ni]] (في PowerShell) أو [[touch]] (في bash والماك) بيعمل '+(more ? 'الملفات فاضية' : 'الملف فاضي')+'.'+(subs.length ? ' و [[mkdir]] التانية بتعمل الفولدرات الفرعية اللي جوه المشروع قبل ما الملفات اللي جواها تتعمل.' : '')+' اسم الفولدر والملفات بحروف إنجليزي صغيرة ومن غير مسافات، عشان الاسم ده هيبقى جزء من رابط الصفحة.\n\n';
  return '<details class="psol pstart"><summary>ابدأ إزاي: الفولدر، و VS Code، والمتصفح (٦ خطوات)</summary><div class="psol-b">'+mdHTML(first+
    '**٢. افتح الفولدر في VS Code.** وانت لسه جوه الفولدر:\n\n~~~powershell\ncode .\n~~~\n\n'+
    'النقطة معناها «الفولدر اللي أنا فيه». لو طلعلك إن [[code]] مش متعرّف: افتح VS Code بإيدك، ومن القايمة File اختار Open Folder واختار [['+d+']].\n\n'+
    '**٣. اكتب الصفحة.** افتح [[index.html]] من العمود اللي على الشمال (أو الملف الجديد)، وفي الملف الفاضي اكتب علامة [[!]] ودوس Tab: VS Code هيكتبلك هيكل الصفحة. غيّر [[lang="en"]] لـ [[lang="ar" dir="rtl"]]، واكتب المطلوب جوه [[<body>]]، واحفظ بـ [[Ctrl+S]] (على الماك [[Cmd+S]]).\n\n'+
    '**٤. شوفها في Chrome.** من الترمنال اللي جوه VS Code (من القايمة Terminal اختار New Terminal):\n\n'+
    '~~~powershell\nstart index.html\n~~~\n\n~~~bash\nopen index.html       # الماك\nxdg-open index.html   # لينكس\n~~~\n\n'+
    'الصفحة هتفتح في المتصفح الأساسي عندك. لو مش Chrome: اسحب [[index.html]] من VS Code وارميه على نافذة Chrome. **وبعد كل تعديل:** احفظ في VS Code، وارجع للمتصفح ودوس [[Ctrl+R]] عشان يقرا الملف من جديد.\n\n'+
    '**٥. افحصها زي المحترف.** في Chrome دوس [[F12]]: تاب Elements بيوريك الشجرة اللي المتصفح فهمها من كودك، و [[Ctrl+Shift+M]] بيوريك الصفحة على عرض موبايل (اختار 360). قارن اللي شايفه ببند «تعرف إنك خلصت» اللي تحت.\n\n'+
    '**٦. قارن بالحل.** بعد ما تخلّص نسختك، افتح زرار «الكود الكامل والشرح» تحت المشروع: هتلاقي الكود كامل والصفحة مرسومة، وزرار «عدّل وجرّب» بيخليك تغيّر في الحل وتشوف الفرق.\n\n'+
    '> محتاج تراجع؟ [[code .]] و Emmet في كورس VS Code، و Elements و Device Toolbar في كورس «المتصفح و DevTools».'
  )+(shell === 'css' ? '<p class="pre"><b>الشرح الكامل للخطوات دي:</b> وحدة «HTML: من الملف للمتصفح»، وأولها <a href="#css/'+encodeURIComponent('mkdir و ni و touch')+'">درس «mkdir و ni و touch»</a>.</p>' : '')+'</div></details>';
}
function liveHTML(code, title, only){
  // "~~~live 90 120 title": 90px tall at full width, 120px on a phone (and when the «موبايل» width is chosen); one number serves both
  const m = title.match(/^(\d{2,4})(?:\s+(\d{2,4}))?\s*(.*)$/), h = m ? +m[1] : 240, hm = m && m[2] ? +m[2] : h, name = (m ? m[3] : title) || 'النتيجة في المتصفح';
  const doc = liveFrame(code);
  return (only ? '' : mdHTML('~~~html\n'+code+'\n~~~'))+
    '<div class="live"><div class="live-bar"><span>'+fmt(name)+'</span><span class="live-w">'+
    [['360', 'موبايل'], ['768', 'تابلت'], ['', 'كامل']].map(([w, l]) => '<button type="button" data-lw="'+w+'"'+(w ? '' : ' class="on"')+'>'+l+'</button>').join('')+
    // «عدّل وجرّب»: the code in a box the reader can change, and the page under it follows every key
    '<button type="button" class="live-edit" data-le="1">عدّل وجرّب</button></span></div>'+
    '<div class="live-ed" hidden><textarea dir="ltr" spellcheck="false" autocapitalize="off" autocomplete="off" aria-label="كود الصفحة، عدّله وشوف النتيجة تحته" rows="'+Math.min(18, code.split('\n').length + 1)+'">'+esc(code)+'</textarea>'+
    '<p>غيّر أي حاجة والنتيجة تحت بتتغيّر على طول. التعديل هنا للتجربة بس ومبيتحفظش. <button type="button" data-lr="1">رجّع الكود الأصلي</button></p></div>'+
    '<div class="live-f"><iframe sandbox="allow-scripts allow-forms" loading="lazy" title="'+esc(name.split('[[').join('').split(']]').join(''))+'" style="--h:'+h+'px;--hm:'+hm+'px" srcdoc="'+esc(doc)+'"></iframe></div></div>';
}
/* «قبل ما تبدأ»: the lessons (or whole courses) to review first, each a direct link (ROADMAP rule 2) */
function preHTML(list){
  if (!list || !list.length) return '';
  return '<p class="pre"><b>قبل ما تبدأ:</b> راجع '+list.map(p => {
    const to = typeof p === 'string' ? p : p.to, i = to.indexOf('/'), tab = i < 0 ? to : to.slice(0, i), cmd = i < 0 ? '' : to.slice(i+1);
    const course = SHELLS[tab] ? tabName(tab) : tab; // the name on the tab's card (the start tab's own label is «bash»)
    return '<a href="#'+encodeURIComponent(tab)+(cmd ? '/'+encodeURIComponent(cmd) : '')+'">'+(cmd ? 'درس «'+esc(cmd)+'»'+(tab !== shell ? ' في كورس '+esc(course) : '') : 'كورس '+esc(course))+'</a>'+(p.why ? ' ('+fmt(p.why)+')' : '');
  }).join('، ')+'.</p>';
}
/* the official references the lesson was written from (lesson field ref) */
function refHTML(c){
  const r = typeof REF !== 'undefined' && REF[shell+'|'+c];
  if (!r || !r.length) return '';
  return '<p class="refs"><b>المرجع:</b> '+r.map(x => '<a href="'+esc(x.url)+'" target="_blank" rel="noopener">'+esc(x.t)+'</a>').join('، ')+'</p>';
}
function deepHTML(c){
  const d = DEEP[shell+'|'+c];
  if (!d) return '';
  const part = (h, t) => t ? '<section><h4>'+h+'</h4>'+mdHTML(t)+'</section>' : '';
  return '<div class="deep">'+part('ليه موجود؟', d.why)+part('بيحصل إيه من جوه؟', d.how)+part('هتستخدمه إمتى؟', d.when)+part('غلطات شائعة', d.mistakes)+'</div>';
}
/* reference solution for the try task: hidden until the learner opens it.
   When the lesson also has an auto-checked exercise, this solution usually solves it too,
   so it stays locked until the exercise passes (chk:) or the learner gives up (reveal:). */
function solHTML(c){
  const s = SOL[shell+'|'+c];
  if (!s) return '';
  const k = shell+':'+c, body = descHTML(s.text)+(s.code ? osBoxes(s.code, c) || termBlock(s.code, c, 'script') : '');
  if (CHECK[shell+'|'+c] && store.get('chk:'+k)!=='1' && store.get('reveal:'+k)!=='1')
    return '<details class="trysol locked"><summary>الحل والناتج المتوقع (مقفول لحد ما تحل التمرين)</summary>'+
      '<p class="sol-lock">الحل ده بيحل التمرين اللي فوق كمان، فهيفتح لوحده أول ما كودك يعدّي الاختبارات. لو وقفت خالص وعايز تشوفه: <button type="button" class="sol-reveal">افتح الحل برضه</button></p>'+
      '<div class="sol-body" hidden>'+body+'</div></details>';
  return '<details class="trysol"><summary>الحل والناتج المتوقع (افتحه بعد ما تجرب)</summary>'+body+'</details>';
}
function solUnlock(sol){
  if (!sol || !sol.classList.contains('locked')) return;
  sol.classList.remove('locked');
  sol.querySelector('.sol-lock').remove(); sol.querySelector('.sol-body').hidden = false;
  sol.querySelector('summary').textContent = 'الحل والناتج المتوقع';
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
/* ---------- the course view: a unit map first, then one lesson at a time ----------
   #list holds either the map (level headers + a compact table per category) or the reader
   (one lesson with prev/next). The right rail lists the unit, the left rail indexes the open lesson. */
let openCmd = null;                                   // the lesson open in the reader, null = the map
const catOf = c => DATA[shell].find(x => x.items.some(it => it[0] === c));
/* the first sentence of desc, for a lesson that has no learn of its own */
function sumOf(d){
  const p = (d || '').split(/\n\s*\n/)[0].trim();
  const m = p.match(/^[\s\S]{0,120}?[.!؟](\s|$)/);
  return (m ? m[0] : p).trim();
}
/* where the lesson is used, written per field so a lesson shows only the fields it really serves */
const USE_F = [['prog','برمجة'], ['net','شبكات وسيرفرات'], ['cs','علوم حاسب'], ['work','شغل يومي']];
function useHTML(c){
  const u = USE[shell+'|'+c];
  if (!u) return '';
  const cards = USE_F.filter(([k]) => u[k]).map(([k, label]) =>
    '<div class="uc"><span class="tag">'+label+'</span><p>'+fmt(u[k])+'</p></div>').join('');
  return '<div class="use"><h4>تستخدمها فين؟</h4><div class="ucards">'+cards+'</div>'+
    (u.scen ? '<p class="scen"><b>سيناريو حقيقي:</b> '+fmt(u.scen)+'</p>' : '')+'</div>';
}
/* one lesson's card: the same markup wherever it is shown */
/* what the lesson's name stands for (js/names.js): «cd = change directory = غيّر الفولدر» */
function nameHTML(c){
  const notes = typeof cmdNameNotes === 'function' ? cmdNameNotes(shell, c) : [];
  if (!notes.length) return '';
  return '<p class="nm"><b>الاسم</b> '+notes.map(([w, n]) => '<span><code>'+esc(w)+'</code> '+fmt(n)+'</span>').join('')+'</p>';
}
/* the tab's lab folder, repeated under every «جرّب»: whoever lands on a lesson from a link never saw the lab at the top of the tab */
function labHint(tr){
  const lab = LAB[shell] || '';
  const m = lab.match(/mkdir -p (~\/lab[\w\/-]*) && cd \1/) || lab.match(/Set-Location (\$HOME\\lab\S*)/) || lab.match(/cd \/d (%USERPROFILE%\\lab\S*)/);
  if (!m || shell === 'glossary' || (tr || '').includes(m[1])) return '';
  // PowerShell 5.1 has no &&, and CMD's mkdir fails when the folder exists, so CMD joins with & (runs the cd anyway)
  const [go, why] = m[0].startsWith('mkdir') ? [m[0], 'ولو طلعلك [[Permission denied]] يبقى انت واقف في فولدر مش بتاعك (زي [[/]] في Git Bash).']
    : m[0].startsWith('Set-Location') ? ['New-Item -ItemType Directory '+m[1]+' -Force; '+m[0], 'الـ [[-Force]] بيخلّي الأمر ينفع حتى لو الفولدر موجود.']
    : ['mkdir '+m[1]+' & '+m[0], 'لو الفولدر موجود هتشوف [[already exists]] وده عادي، والـ [[&]] بتكمّل الـ [[cd]] برضه.'];
  return '<span class="labhint">'+fmt('قبل ما تجرّب، اشتغل في فولدر المعمل: [['+go+']]. '+why)+'</span>';
}
function articleHTML(it){
  const [c, t, d, ex, tr, flag] = it;
  const key = 'done:'+shell+':'+c;
  const done = store.get(key) === '1';
  return '<article class="cmd'+(done?' is-done':'')+'" data-c="'+esc(c)+'">'+
    '<div class="cmd-h"><span class="name">'+esc(c)+'</span>'+(t?'<span class="title">'+esc(t)+'</span>':'')+(/\bdanger\b/.test(flag||'')?'<span class="tag-danger">خطر: اقرا الشرح قبل ما تنفّذ</span>':'')+osBadge(c)+'</div>'+
    preHTML(typeof PRE !== 'undefined' && PRE[shell+'|'+c])+nameHTML(c)+(d?descHTML(d):'')+teachHTML(c)+deepHTML(c)+useHTML(c)+osNote(c)+
    (ex ? termBlock(ex, c, flag)+exShowHTML(ex) : '')+breakHTML(c, ex)+
    '<button type="button" class="reveal">اكشف الإجابة</button>'+
    '<div class="try"><span class="lbl">'+(shell==='glossary'?'الشرح الكامل في':'جرّب')+'</span><p>'+fmt(tr)+labHint(tr)+'</p><label class="done"><input type="checkbox" data-k="'+esc(key)+'"'+(done?' checked':'')+'> جربتها</label></div>'+
    practiceHTML(c)+chkHTML(c)+solHTML(c)+noteHTML(c)+refHTML(c)+reportHTML(c, t)+
  '</article>';
}
/* «something missing here?»: opens a prefilled GitHub issue for this lesson */
const REPO = 'https://github.com/Dex11x2/terminal-study';
function reportHTML(c, t){
  const title = '['+shell+'] '+c+(t ? ' — '+t : '');
  const body = 'الدرس: '+shell+' › '+c+'\nالرابط: '+location.origin+location.pathname+'#'+shell+'/'+encodeURIComponent(c)+
    '\n\nإيه اللي ناقص أو مش واضح أو غلط؟\n\n\nلو أمر طلّع ناتج مختلف: النظام إيه، والأمر، والناتج اللي طلعلك:\n';
  return '<p class="report"><a href="'+REPO+'/issues/new?title='+encodeURIComponent(title)+'&body='+encodeURIComponent(body)+'" target="_blank" rel="noopener">في حاجة ناقصة أو مش واضحة أو غلط هنا؟ قولّنا</a></p>';
}
/* a drill's task: one line as before, or (when it carries code to read or fix) the same mini-markdown as teach */
const ptHTML = t => t.includes('\n') ? '<div class="pt">'+mdHTML(t)+'</div>' : '<span class="pt">'+fmt(t)+'</span>';
/* the lesson's practice drills, easiest first; each one has its own tick (data-d, not the lesson's data-k) */
const DRILL_LV = {'سريع': 1, 'تطبيق': 2, 'تحدي': 3};
/* «حلّها هنا» (drill field work): an HTML drill solved inside the page. The reader types in the box, the page under it is drawn from what they typed,
   and each condition turns ✓ or ✗ as they type. work = { start: the code the box opens with, h: preview height, checks: [{ say, q, n | min, has, attr: [name, value], src, nosrc }] }
   q is a CSS selector run on the parsed page (DOMParser: nothing the reader types is executed here); n = exactly that many matches, otherwise at least min (1);
   has = the match's text holds this; attr = the match has this attribute (and value); src / nosrc = the typed code holds / doesn't hold this text. */
const workNorm = s => String(s).replace(/\s+/g, ' ').trim();
/* a CSS condition: style: [property, computed value] (and optional pseudo: "::before") is read with getComputedStyle from `live`,
   the same code rendered in a hidden frame that runs no scripts; every element q matches has to have that value */
function workEval(code, checks, live){
  const doc = new DOMParser().parseFromString(liveDoc(code), 'text/html');
  return checks.map(c => {
    if (c.src !== undefined && !code.includes(c.src)) return false;
    if (c.nosrc !== undefined && code.includes(c.nosrc)) return false;
    if (c.q === undefined) return true;
    if (c.style){
      if (!live || !live.defaultView) return false;
      let le;
      try { le = [...live.querySelectorAll(c.q)]; } catch (e) { return false; }
      if (c.has !== undefined) le = le.filter(e => workNorm(e.textContent).includes(workNorm(c.has)));
      return le.length > 0 && le.every(e => workNorm(live.defaultView.getComputedStyle(e, c.pseudo || null).getPropertyValue(c.style[0])) === workNorm(c.style[1]));
    }
    let els;
    try { els = [...doc.querySelectorAll(c.q)]; } catch (e) { return false; }
    if (c.has !== undefined) els = els.filter(e => workNorm(e.textContent).includes(workNorm(c.has)));
    if (c.attr) els = els.filter(e => e.hasAttribute(c.attr[0]) && (c.attr[1] === undefined || e.getAttribute(c.attr[0]) === c.attr[1]));
    return c.n !== undefined ? els.length === c.n : els.length >= (c.min || 1);
  });
}
const workMsg = ok => { const n = ok.filter(Boolean).length; return n === ok.length ? 'كل الشروط اتحققت. افتح زرار «الكود الكامل والشرح» تحت وقارن طريقتك بيه.' : 'اتحقق '+n+' من '+ok.length+'. كمّل على اللي عليه ✗.'; };
function workHTML(w, key){
  if (!w || !Array.isArray(w.checks) || !w.checks.length) return '';
  const start = w.start || '', saved = store.get('work:'+key), code = saved !== null && saved !== undefined ? saved : start;
  const ok = workEval(code, w.checks), h = w.h || 200;
  return '<div class="work'+(ok.every(Boolean) ? ' done' : '')+'" data-wk="'+esc(key)+'" data-checks="'+esc(JSON.stringify(w.checks))+'">'+
    '<div class="work-h"><b>حلّها هنا</b> <span>اكتب في المربع: صفحتك والشروط اللي تحتها بيتغيّروا مع كل حرف، وشغلك بيتحفظ على جهازك.</span></div>'+
    '<textarea class="work-code" dir="ltr" spellcheck="false" autocapitalize="off" autocomplete="off" aria-label="كود التمرين: اكتب حلّك هنا" rows="'+Math.max(5, Math.min(16, code.split('\n').length + 2))+'">'+esc(code)+'</textarea>'+
    '<textarea class="work-orig" hidden>'+esc(start)+'</textarea>'+
    '<div class="live"><div class="live-bar"><span>صفحتك دلوقتي</span><span class="live-w">'+
    [['360', 'موبايل'], ['', 'كامل']].map(([x, l]) => '<button type="button" data-lw="'+x+'"'+(x ? '' : ' class="on"')+'>'+l+'</button>').join('')+'</span></div>'+
    '<div class="live-f"><iframe sandbox="allow-scripts allow-forms" loading="lazy" title="صفحتك دلوقتي" style="--h:'+h+'px;--hm:'+h+'px" srcdoc="'+esc(liveFrame(code))+'"></iframe></div></div>'+
    // CSS conditions need the page really rendered: a hidden copy that runs no scripts, read from here when it has loaded
    (w.checks.some(c => c.style) ? '<iframe class="work-probe" sandbox="allow-same-origin" aria-hidden="true" tabindex="-1" onload="workProbe(this)" srcdoc="'+esc(liveDoc(code))+'"></iframe>' : '')+
    '<ul class="work-checks">'+w.checks.map((c, i) => '<li class="'+(ok[i] ? 'ok' : 'no')+'">'+fmt(c.say)+'</li>').join('')+'</ul>'+
    '<p class="work-res" role="status">'+workMsg(ok)+'</p>'+
    '<button type="button" class="work-reset" data-wreset="1">ابدأ التمرين من الأول</button></div>';
}
function workShow(box, ok){
  box.querySelectorAll('.work-checks li').forEach((li, i) => { li.className = ok[i] ? 'ok' : 'no'; });
  box.querySelector('.work-res').textContent = workMsg(ok);
  box.classList.toggle('done', ok.every(Boolean));
}
/* the hidden copy finished loading: now the CSS conditions can be read too */
function workProbe(frame){
  const box = frame.closest('.work');
  if (box) workShow(box, workEval(box.querySelector('.work-code').value, JSON.parse(box.dataset.checks), frame.contentDocument));
}
function workUpdate(box){
  const code = box.querySelector('.work-code').value, probe = box.querySelector('.work-probe'), ok = workEval(code, JSON.parse(box.dataset.checks), probe && probe.contentDocument);
  if (probe) probe.srcdoc = liveDoc(code); // its load calls workProbe with the new styles
  box.querySelector('.live iframe').srcdoc = liveFrame(code);
  if (!probe) workShow(box, ok);
  store.set('work:'+box.dataset.wk, code);
}
function practiceHTML(c){
  const list = typeof PRACTICE !== 'undefined' && PRACTICE[shell+'|'+c];
  if (!list || !list.length) return '';
  const rows = list.map((p, i) => [p, i]).sort((a, b) => (DRILL_LV[a[0].lvl] || 2) - (DRILL_LV[b[0].lvl] || 2)).map(([p, i]) => {
    const k = 'drill:'+shell+':'+c+':'+i, on = store.get(k) === '1';
    return '<li'+(on?' class="on"':'')+'>'+(p.lvl?'<em class="lv lv'+(DRILL_LV[p.lvl]||2)+'">'+esc(p.lvl)+'</em>':'')+ptHTML(p.t)+
      (p.done?'<span class="pdone"><b>تعرف إنك خلصت لما:</b> '+fmt(p.done)+'</span>':'')+
      drillShowHTML(p)+workHTML(p.work, shell+':'+c+':'+i)+
      // the solution stays closed until asked for: try first, then compare
      solBox(p.sol, 'جرّبه الأول')+
      '<label class="ptick"><input type="checkbox" data-d="'+esc(k)+'"'+(on?' checked':'')+'> عملته</label></li>';
  }).join('');
  return '<div class="practice"><span class="lbl">تمارين عملية</span><ol class="projlist">'+rows+'</ol></div>';
}
/* the unit head: what you can do when you finish it, and which fields it serves */
const GOAL_F = [['prog','البرمجة'], ['net','الشبكات والسيرفرات'], ['cs','علوم الحاسب'], ['work','الشغل اليومي']];
function unitHead(cat){
  if (!cat.goal && !cat.use) return '';
  const g = cat.goal ? '<div class="goal"><h4>هتقدر تعمل إيه لما تخلص</h4><ul>'+cat.goal.map(x => '<li>'+fmt(x)+'</li>').join('')+'</ul></div>' : '';
  const u = cat.use ? '<div class="goal gu"><h4>وهتستخدمها فين؟</h4><ul>'+GOAL_F.filter(([k]) => cat.use[k]).map(([k, l]) => '<li><b>'+l+':</b> '+fmt(cat.use[k])+'</li>').join('')+'</ul></div>' : '';
  return '<div class="unit-two">'+g+u+'</div>';
}
/* the setup box and the end-of-unit projects, under the map table */
function unitFoot(cat, id){
  if (!cat.lab && !cat.projects) return '';
  const lab = cat.lab ? '<div><h4 class="uf-h">جهّز معملك</h4><p class="uf-p">متتعلمش الأوامر الخطيرة على ملفاتك الحقيقية.</p>'+termHTML(cat.lab, shell, false, '')+'</div>' : '';
  // lvl: صغير/متوسط/كبير/فكرة, shown as a badge and kept in that order; done: how you know it works;
  // ext: ways to make it your own; a كبير project also says how to put it in your portfolio
  const LV = {'صغير': 1, 'متوسط': 2, 'كبير': 3, 'فكرة': 4};
  const projs = cat.projects ? cat.projects.slice().sort((a, b) => (LV[a.lvl] || 2) - (LV[b.lvl] || 2)) : [];
  const pr = cat.projects ? '<div class="projbox"><h4 class="uf-h">مشاريع القسم</h4><p class="uf-p">بعد ما تخلص الدروس، دي حاجات تبنيها بإيدك من اللي اتعلمته، من الصغير للكبير. و«فكرة» مشروع مفتوح: انت اللي بتقرر تفاصيله.</p><ol class="projlist">'+
    projs.map(p => '<li>'+(p.lvl?'<em class="lv lv'+(LV[p.lvl]||2)+'">'+esc(p.lvl)+'</em>':'')+'<b>'+fmt(p.t)+'</b>'+(p.what?'<span>'+(p.dir?'<b class="plbl">المطلوب:</b> ':'')+fmt(p.what)+'</span>':'')+
      projShowHTML(p)+projStartHTML(p)+
      (p.done?'<span class="pdone"><b>تعرف إنك خلصت لما:</b> '+fmt(p.done)+'</span>':'')+
      (p.ext?'<span class="pdone"><b>خليه بتاعك:</b> '+fmt(p.ext)+'</span>':'')+
      solBox(p.sol, 'ابنيه الأول')+
      (p.lvl==='كبير'||p.lvl==='فكرة'?'<span class="pfolio">ينفع يتحط في الـ portfolio: ارفعه repo على GitHub فيه README بيقول بيعمل إيه وإزاي يتشغّل، وصورة أو ناتج حقيقي.</span>':'')+
      '</li>').join('')+'</ol></div>' : '';
  return '<div class="unit-two uf" id="'+id+'-foot">'+lab+pr+'</div>';
}
/* a category's lessons as a compact table: the whole row opens the lesson */
function mapTable(cat, items){
  const out = items.some(it => (CARD[shell+'|'+it[0]] || {}).out);
  let h = '<table class="map"><thead><tr><th>#</th><th>الدرس</th><th>هتتعلم إيه</th>'+(out?'<th>النتيجة العملية</th>':'')+'</tr></thead><tbody>';
  items.forEach(it => {
    const [c, t, d] = it, card = CARD[shell+'|'+c] || {}, n = cat.items.indexOf(it) + 1;
    h += '<tr'+(store.get('done:'+shell+':'+c)==='1'?' class="is-done"':'')+' data-open="'+esc(c)+'" tabindex="0">'+
      '<td class="n">'+AR(n)+'</td>'+
      '<td class="t"><span class="w"><span class="nm">'+esc(c)+'</span>'+(t?'<span class="ti">'+esc(t)+'</span>':'')+'<i class="go">◂</i></span></td>'+
      '<td><span class="w2">'+fmt(card.learn || sumOf(d))+'</span></td>'+
      (out?'<td><span class="w2">'+fmt(card.out || '')+'</span></td>':'')+'</tr>';
  });
  return h+'</tbody></table>';
}

function renderMap(q, rawQ){
  const cats = DATA[shell].map((c, i) => Object.assign({i}, c)).sort((a, b) => a.l - b.l).filter(c => !level || c.l === level);
  let html = '', chips = '', shown = 0, lastL = 0, shownHint = 0;
  cats.forEach(cat => {
    const items = cat.items.filter(it => !q || searchText(shell, it).includes(q));
    if (!items.length) return;
    shown += items.length;
    if (cat.l !== lastL){
      lastL = cat.l;
      html += '<div class="lvl"><span class="n">المستوى '+AR(cat.l)+'</span><h2>'+lvInfo(cat.l)[0]+'</h2><p>'+lvInfo(cat.l)[1]+'</p>'+examHTML(cat.l)+'</div>';
    }
    if (!shownHint){ shownHint = 1;
      // what the tab's own name means (js/names.js), once, above the first unit
      if (!q && typeof TAB_ABOUT !== 'undefined' && TAB_ABOUT[shell]) html += '<div class="tab-about"><b>'+esc(SHELLS[shell].label)+' يعني إيه؟</b><p>'+fmt(TAB_ABOUT[shell])+'</p></div>';
      html += '<p class="maphint">دوس على أي درس يفتح لوحده في صفحته، وتتنقل منه للي بعده بالسهم أو بزرار «الدرس الجاي».</p>'; }
    const id = shell+'-c'+cat.i;
    chips += '<button class="chip" type="button" data-t="'+id+'">'+esc(cat.t)+'</button>';
    html += '<section class="cat" id="'+id+'"><h3>'+esc(cat.t)+'<small>'+countLabel(cat.items.length)+(cat.time?' · '+esc(cat.time):'')+'</small></h3>'+
      (cat.n?'<p class="cat-note">'+esc(cat.n)+'</p>':'')+preHTML(cat.pre)+unitHead(cat)+
      mapTable(cat, items)+(q?'':unitFoot(cat, id))+'</section>';
  });
  if (!shown){
    html = '<div class="empty">مفيش نتيجة لـ «'+esc(rawQ)+'» في '+SHELLS[shell].label+'.<span id="elsewhere"> بدوّر في باقي الكورسات…</span></div>';
    searchElsewhere(q);
  }
  $('#list').innerHTML = html;
  $('#chips').innerHTML = chips;
  railMap(cats);
  $('#toc').innerHTML = ''; $('#toc').hidden = true;
  $('#lbar').hidden = true;
}

/* nothing in this tab: look through the other tabs' lesson names (js/search-index.js, a small file loaded the first time it's needed) */
let searchIndexReady = null;
async function searchElsewhere(q){
  await null;   // renderMap writes #elsewhere into the page after calling this
  let other;
  if (Object.keys(TAB_FILES).length){
    try { await (searchIndexReady = searchIndexReady || addScript('js/search-index.js')); }
    catch (e) { searchIndexReady = null; const box = $('#elsewhere'); if (box) box.textContent = ' جرّب كلمة أقصر أو اسم الأمر بالإنجليزي.'; return; }
    other = Object.keys(SEARCH_INDEX).filter(k => k !== shell && SEARCH_INDEX[k].some(([c, t]) => normAr(c+' '+t).includes(q)));
  } else other = Object.keys(DATA).filter(k => k !== shell && DATA[k].some(c => c.items.some(it => searchText(k, it).includes(q))));
  const box = $('#elsewhere');
  if (!box || normAr($('#q').value.trim()) !== q) return;
  box.innerHTML = other.length ? ' موجودة في: '+other.map(k => '<button type="button" data-go="'+k+'">'+SHELLS[k].label+'</button>').join(' و ') : ' جرّب كلمة أقصر أو اسم الأمر بالإنجليزي.';
}

function renderReader(){
  const cat = catOf(openCmd), idx = cat.items.findIndex(it => it[0] === openCmd);
  const it = cat.items[idx], seq = lessonSeq(), at = seq.findIndex(x => x[1][0] === openCmd);
  const prevE = seq[at-1], nextE = seq[at+1], prev = prevE && prevE[1], next = nextE && nextE[1];
  const nextLbl = nextE && nextE[0] !== cat ? 'القسم الجاي: '+nextE[0].t : 'الدرس الجاي';
  const prevLbl = prevE && prevE[0] !== cat ? 'القسم اللي فات: '+prevE[0].t : 'الدرس اللي فات';
  const btn = (x, cls, lbl) => '<button type="button" class="pg-b '+cls+'" data-open="'+esc(x[0])+'"><span>'+lbl+'</span><b>'+esc(x[1] || x[0])+'</b></button>';
  $('#list').innerHTML =
    '<nav class="lnav"><button type="button" class="back" data-map="1">▸ '+esc(cat.t)+'</button>'+
    '<span class="pos">الدرس <b>'+AR(idx+1)+'</b> من '+AR(cat.items.length)+'</span></nav>'+
    '<div class="reader">'+articleHTML(it)+'</div>'+
    '<div class="pager">'+
      (prev ? btn(prev, 'pv', prevLbl) : '<span></span>')+
      (next ? btn(next, 'nx', nextLbl) : '<button type="button" class="pg-b nx" data-map="1"><span>خلصت التاب</span><b>ارجع للخريطة</b></button>')+
    '</div>';
  $('#chips').innerHTML = DATA[shell].map((c, i) => '<button class="chip" type="button" data-t="'+shell+'-c'+i+'">'+esc(c.t)+'</button>').join('');
  railUnit(cat);
  buildToc();
  lessonBar(cat, idx, prev, next);
}

/* every lesson of the tab in reading order (level first, like the map), as [unit, lesson] */
function lessonSeq(){
  return [...DATA[shell]].sort((a, b) => a.l - b.l).filter(c => !level || c.l === level).flatMap(c => c.items.map(it => [c, it]));
}
/* the strip that stays on screen while reading: changing lessons never needs a scroll to the top or the bottom */
function lessonBar(cat, idx, prev, next){
  const set = (b, x) => { b.disabled = !x; if (x) b.dataset.open = x[0]; else delete b.dataset.open; };
  $('#lbar').hidden = false;
  set($('#lbPrev'), prev); set($('#lbNext'), next);
  $('#lbMenu').innerHTML = '<span class="pos">'+esc(cat.t)+' · '+AR(idx+1)+' من '+AR(cat.items.length)+'</span><b>'+esc(cat.items[idx][1] || openCmd)+'</b><i aria-hidden="true">▾</i>';
}
/* the drawer with every unit and lesson of the tab */
function renderOutline(){
  const q = normAr($('#olQ').value.trim()), cur = openCmd && catOf(openCmd);
  $('#olTitle').textContent = SHELLS[shell].label;
  $('#olBody').innerHTML = [...DATA[shell]].sort((a, b) => a.l - b.l).filter(c => !level || c.l === level).map(c => {
    const items = c.items.filter(it => !q || normAr(it[0]+' '+(it[1] || '')).includes(q));
    if (!items.length) return '';
    return '<details class="ol-cat"'+(q || c === cur ? ' open' : '')+'><summary>'+esc(c.t)+'<em>'+AR(items.length)+'</em></summary><ol>'+items.map(it =>
      '<li'+(it[0]===openCmd?' class="on"':'')+(store.get('done:'+shell+':'+it[0])==='1'?' data-done="1"':'')+'><button type="button" data-open="'+esc(it[0])+'">'+esc(it[1] || it[0])+'</button></li>').join('')+'</ol></details>';
  }).join('') || '<p class="ol-none">مفيش درس بالاسم ده هنا.</p>';
}
function openOutline(){
  $('#olQ').value = '';
  renderOutline();
  $('#outline').showModal();
  const on = $('#olBody .on');
  // scroll the list only: scrollIntoView would move the page behind the dialog too
  if (on) $('#olBody').scrollTop = on.offsetTop - $('#olBody').offsetTop - 120;
}

/* right rail: the categories in map view, the open unit's lessons in the reader */
function railMap(cats){
  $('#unitnav').innerHTML = '<h4>الأقسام</h4><ol class="rl">'+cats.map(c => {
    const d = c.items.filter(it => store.get('done:'+shell+':'+it[0])==='1').length;
    return '<li><button type="button" data-t="'+shell+'-c'+c.i+'">'+esc(c.t)+'<em>'+AR(d)+'/'+AR(c.items.length)+'</em></button></li>';
  }).join('')+'</ol>';
}
function railUnit(cat){
  $('#unitnav').innerHTML = '<h4>'+esc(cat.t)+'</h4><ol class="rl num">'+cat.items.map(it =>
    '<li'+(it[0]===openCmd?' class="on"':'')+(store.get('done:'+shell+':'+it[0])==='1'?' data-done="1"':'')+
    '><button type="button" data-open="'+esc(it[0])+'">'+esc(it[1] || it[0])+'</button></li>').join('')+'</ol>'+
    '<button type="button" class="rl-back" data-map="1">▸ كل الأقسام</button>';
}
/* left rail: the open lesson's own sections, so a long lesson is still one glance */
let tocObs = null;
function buildToc(){
  const toc = $('#toc'), art = $('#list .reader article');
  const heads = art ? [...art.querySelectorAll('.teach h4, .deep h4, .use h4, .bd h4, .try .lbl, .trysol summary')] : [];
  if (tocObs){ tocObs.disconnect(); tocObs = null; }
  if (heads.length < 3){ toc.innerHTML = ''; toc.hidden = true; return; }
  toc.hidden = false;
  toc.innerHTML = '<h4>في الدرس ده</h4><ol class="tl">'+heads.map((h, i) => {
    h.id = 'h'+i;
    const txt = (h.textContent || '').replace(/\s*\(.*\)\s*$/, '').trim();
    return '<li><button type="button" data-h="h'+i+'">'+esc(txt.length > 46 ? txt.slice(0, 44)+'…' : txt)+'</button></li>';
  }).join('')+'</ol>';
  const links = {};
  toc.querySelectorAll('[data-h]').forEach(a => links[a.dataset.h] = a);
  tocObs = new IntersectionObserver(es => {
    es.forEach(e => { if (e.isIntersecting){ toc.querySelectorAll('.on').forEach(a => a.classList.remove('on')); if (links[e.target.id]) links[e.target.id].classList.add('on'); } });
  }, {rootMargin: '-130px 0px -70% 0px'});
  heads.forEach(h => tocObs.observe(h));
}

function openLesson(c){
  if (!catOf(c)) return;
  if ($('#q').value.trim()) $('#q').value = '';
  openCmd = c;
  pushNext = true;
  render();
  // land on the lesson, not the top of the page: above #list sit the hero and the tab cards, thousands of px
  // on a phone, so a jump beats a long smooth scroll. scroll-padding-top on html keeps it clear of the sticky
  // bar, and inline:'nearest' leaves the horizontal scroll alone (resetting it on an RTL page jumps to the far left)
  $('#list').scrollIntoView({block: 'start', inline: 'nearest'});
}
function backToMap(to){
  const c = openCmd;
  openCmd = null;
  pushNext = true;
  render();
  const el = to && document.getElementById(to);
  if (el) return el.scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
  // back on the map, the lesson you were just reading is the row you look for
  const row = c && [...$('#list').querySelectorAll('tr[data-open]')].find(r => r.dataset.open === c);
  row ? row.scrollIntoView({block:'center', behavior:'auto'}) : $('#list').scrollIntoView({block:'start', inline:'nearest', behavior:'auto'});
}
// the page changes under the same document, so the browser must not put back an old scroll position
try{ history.scrollRestoration = "manual"; }catch(e){}
/* the address bar carries the tab and the open lesson, so a lesson can be bookmarked and shared */
let hashMine = '', pushNext = false;
function hashSet(){
  hashMine = atHome ? '#home' : '#'+shell+(openCmd ? '/'+encodeURIComponent(openCmd) : '');
  try{ if (location.hash !== hashMine) history[pushNext ? 'pushState' : 'replaceState'](null, '', hashMine); }catch(e){}
  pushNext = false;
  if (openCmd) store.set('last', shell+'\n'+openCmd);
}
/* home = the cards alone; a tab = its own page, with no cards above it to scroll past */
let atHome = false;
function setHome(on){ atHome = on; document.body.classList.toggle('home', on); }
function goHome(){
  openCmd = null;
  setHome(true);
  hashSet();
  updateProgress();
  const [s, c] = (store.get('last') || '').split('\n'), b = $('#resumeBtn');
  b.hidden = !(c && TAB_META[s]);
  if (!b.hidden){ b.textContent = 'كمّل: '+SHELLS[s].label+' › '+c; b.dataset.s = s; b.dataset.c = c; }
  window.scrollTo(0, 0);
}
/* a tab's lesson files load when the tab opens. index.html keeps the list in an inert <template> (the tools read it there);
   the single-file build inlines everything and has no template, so TAB_FILES stays empty and nothing loads */
const TAB_FILES = {}, tabPromise = {}, tabLoaded = {};
{
  const t = document.getElementById('tabfiles');
  if (t) t.content.querySelectorAll('script').forEach(s => { const f = s.getAttribute('src'), k = f.split('/')[2]; (TAB_FILES[k] = TAB_FILES[k] || []).push(f); });
}
Object.keys(TAB_META).forEach(k => { if (!SHELLS[k]) SHELLS[k] = {label: TAB_META[k].label, prompt: TAB_META[k].prompt}; });
function addScript(src){
  return new Promise((ok, no) => {
    const s = document.createElement('script');
    s.src = src; s.async = false;   // async=false keeps execution in list order: TAB() runs before the tab's MORE() files
    s.onload = ok; s.onerror = () => no(new Error(src));
    document.head.appendChild(s);
  });
}
function loadTab(k){
  return tabPromise[k] || (tabPromise[k] = Promise.all(TAB_FILES[k].map(addScript)).catch(e => { delete tabPromise[k]; throw e; }));
}
async function tabReady(tabs){
  const need = [].concat(tabs).filter(k => TAB_FILES[k] && !tabLoaded[k]);
  if (!need.length) return true;
  const box = $('#loadbar');
  box.textContent = 'بيحمّل '+(need.length > 1 ? AR(need.length)+' كورس' : SHELLS[need[0]].label)+'…';
  box.hidden = false;
  try {
    await Promise.all(need.map(loadTab));
    need.forEach(k => tabLoaded[k] = true);
    box.hidden = true;
    return true;
  } catch (e) {
    box.textContent = 'الكورس ده مش محفوظ عندك ومفيش نت. وصّل النت وجرّب تاني.';
    setTimeout(() => { box.hidden = true; }, 5000);
    return false;
  }
}
function loadAllTabs(){ return tabReady(Object.keys(TAB_FILES)); }
async function enterTab(s, cmd){
  if (!await tabReady(s)) return false;
  pushNext = true;
  setShell(s, cmd);
  window.scrollTo(0, 0);
  return true;
}
const hashParse = h => { const i = h.indexOf('/'); return i < 0 ? [decodeURIComponent(h.slice(1)), null] : [decodeURIComponent(h.slice(1, i)), decodeURIComponent(h.slice(i+1))]; };

function render(){
  if (atHome || !DATA[shell]) return;
  const rawQ = $('#q').value.trim(), q = normAr(rawQ);
  // a search always lands on the map, and a lesson the level filter hides can't stay open
  if (q || (openCmd && !DATA[shell].some(c => (!level || c.l === level) && c.items.some(it => it[0] === openCmd)))) openCmd = null;
  document.body.classList.toggle('reading', !!openCmd);
  openCmd ? renderReader() : renderMap(q, rawQ);
  hashSet();
  $('#labBox').innerHTML = termHTML(LAB[shell], shell, shell==='vps' || shell==='web' || shell==='os', shell==='vps' ? 'على جهازك' : shell==='web' || shell==='os' ? 'اختصارات' : '');
  $('#labTxt').textContent = LABTXT[shell] || LABDEF;
  updateProgress();
}

function cardProgress(){
  let T = 0, D = 0;
  // counted from the saved marks, so the home page doesn't need the tabs' lessons loaded
  const doneBy = {};
  store.keys().forEach(k => { if (k.startsWith('done:') && store.get(k)==='1'){ const t = k.split(':')[1]; doneBy[t] = (doneBy[t] || 0) + 1; } });
  document.querySelectorAll('.sw').forEach(b => {
    const k = b.dataset.s, t = TAB_META[k] ? TAB_META[k].n : 0, d = Math.min(doneBy[k] || 0, t);
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
  updateWeak(); updateDue();
  if (!DATA[shell]) return;
  lvBadges();
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
function setShell(s, cmd){
  setHome(false);
  shell = s;
  openCmd = cmd && DATA[s].some(c => c.items.some(it => it[0] === cmd)) ? cmd : null;
  document.body.dataset.shell = s;
  document.querySelectorAll('.sw').forEach(b => b.setAttribute('aria-selected', b.dataset.s===s ? 'true':'false'));
  store.set('shell', s);
  render();
  // the two blocks under the lessons belong to the tab: the bash/PowerShell/CMD table to the terminal tabs,
  // and each challenge to the tabs it has a solution for
  $('#compare').hidden = !COMPARE_TABS.includes(s);
  renderMissions();
}

const COMPARE_TABS = ['start', 'bash', 'ps', 'cmd', 'zsh', 'wsl'];

function renderStatic(){
  let t = '<thead><tr><th>المهمة</th><th class="b">bash</th><th class="p">PowerShell</th><th class="c">CMD</th></tr></thead><tbody>';
  CMP.forEach(r => { t += '<tr><td>'+esc(r[0])+'</td><td class="m">'+esc(r[1])+'</td><td class="m">'+esc(r[2])+'</td><td class="m">'+esc(r[3])+'</td></tr>'; });
  $('#cmpT').innerHTML = t+'</tbody>';
}
/* a challenge shows on a tab when it has a solution written for that tab, or when its topic belongs there
   (tabs: git, docker, python...); on a topic tab every solution shows, since that tab isn't a shell */
function renderMissions(){
  const list = MISSIONS.filter(m => m.s[shell] !== undefined || (m.tabs || []).includes(shell));
  $('#missions').hidden = !list.length;
  if (!list.length) return $('#mBox').innerHTML = '';
  $('#missions h2').textContent = 'تحديات ' + (SHELLS[shell].label || shell);
  // d و e فقرات فيها [[code]]، و c كود البداية (اختياري). مفاتيح s اللي هي تابات دروس (react، data...) بتتعرض كود مش أوامر
  const paras = s => s.split(/\n\s*\n/).map(p => '<p>'+fmt(p.trim())+'</p>').join('');
  const code = (src, k, label) => LESSON_TABS.includes(k) ? termHTML(src, k, true, label || SHELLS[k].label) : termHTML(src, k, false);
  $('#mBox').innerHTML = list.map((m,i) =>
    '<div class="mission"><h3><span class="n">'+(i+1)+'</span>'+esc(m.t)+'</h3>'+paras(m.d)+(m.c ? code(m.c, m.s[shell] !== undefined ? shell : Object.keys(m.s)[0], 'الكود اللي هتبدأ منه') : '')+'<details><summary>اعرض الحل بعد ما تجرب</summary><div class="sol">'+
    (m.e ? paras(m.e) : '')+(m.s[shell] !== undefined ? code(m.s[shell], shell) : Object.keys(m.s).map(k => code(m.s[k], k)).join(''))+'</div></details></div>').join('');
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
// a saved card still counts while its lesson exists; a tab that isn't loaded yet gets the benefit of the doubt
const knownKey = key => { const i = key.indexOf(':'), t = key.slice(0, i), c = key.slice(i+1); return !!TAB_META[t] && (!tabLoaded[t] && TAB_FILES[t] ? true : DATA[t].some(x => x.items.some(it => it[0] === c))); };
// a card counts as "forgotten" while it was missed more often than recalled
const isWeak = key => { const st = fcStats(key); return st.m > st.k; };
const weakPool = () => allCards(isWeak);
const duePool = () => { const t = day(); return allCards(k => isDue(k, t)); };
function updateWeak(){
  let n = 0;
  // counted like weakPool(): a card of a lesson that no longer exists can't be reviewed, so it doesn't count
  store.keys().forEach(k => { if (k.startsWith('fc:') && knownKey(k.slice(3)) && isWeak(k.slice(3))) n++; });
  $('#weakN').textContent = AR(n);
  $('#weakBtn').hidden = !n;
}
function updateDue(){
  const t = day(); let n = 0;
  store.keys().forEach(k => { if (k.startsWith('srs:') && knownKey(k.slice(4)) && isDue(k.slice(4), t)) n++; });
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
async function fcOpen(mode){
  // reviews across tabs need the lessons of the tabs that have cards waiting, and only those
  if (mode==='weak' || mode==='due'){
    const pre = mode==='due' ? 'srs:' : 'fc:', tabs = [...new Set(store.keys().filter(k => k.startsWith(pre)).map(k => k.slice(pre.length).split(':')[0]).filter(k => TAB_META[k]))];
    if (!await tabReady(tabs)) return;
  }
  fcStart(mode || '', mode==='weak' ? weakPool() : mode==='due' ? duePool() : cards(shell, c => !level || c.l === level));
}

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
  if (art) solUnlock(art.querySelector('.trysol.locked'));
  updateProgress();
}

const BACKUP_KEYS = /^(done:|note:|fc:|srs:|exam:|chk:|code:|reveal:|shell$|level$|brief$|todo$|theme$)/;
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
      if (o.shell && TAB_META[o.shell]) enterTab(o.shell); else { render(); updateProgress(); }
      alert('اترجّع '+n+' عنصر.');
    }catch(e){ alert('الملف ده مش نسخة تقدم من الصفحة دي.'); }
  };
  r.readAsText(file);
}

/* ---------- events ---------- */
document.querySelectorAll('.sw').forEach(b => b.addEventListener('click', () => enterTab(b.dataset.s)));
$('#offlineBtn').addEventListener('click', async e => {
  const b = e.currentTarget;
  b.disabled = true; b.textContent = 'بينزّل كل الدروس…';
  const ok = await loadAllTabs();
  b.disabled = false; b.textContent = ok ? 'كل الدروس اتحفظت عندك' : 'النت قطع، جرّب تاني';
});
$('#homeBtn').addEventListener('click', () => { pushNext = true; goHome(); });
$('#resumeBtn').addEventListener('click', e => enterTab(e.currentTarget.dataset.s, e.currentTarget.dataset.c));
$('#lbMenu').addEventListener('click', openOutline);
$('#olClose').addEventListener('click', () => $('#outline').close());
$('#olQ').addEventListener('input', renderOutline);
// closed before the document-level handler opens the lesson; a click on the backdrop closes it too
$('#olBody').addEventListener('click', e => { if (e.target.closest('[data-open]')) $('#outline').close(); });
$('#outline').addEventListener('click', e => { if (e.target === e.currentTarget) e.currentTarget.close(); });
let qTm;
$('#q').addEventListener('input', () => {
  clearTimeout(qTm);
  qTm = setTimeout(render, 120);
});
document.addEventListener('keydown', e => {
  const inField = /^(TEXTAREA|INPUT|SELECT)$/.test(document.activeElement.tagName);
  if (e.key === 'Enter' && e.target.matches && e.target.matches('tr[data-open]')){ e.preventDefault(); openLesson(e.target.dataset.open); return; }
  if (openCmd && !inField && !$('#fc').open && !$('#outline').open){
    // the page is RTL, so the right arrow is the lesson before this one
    const b = e.key === 'ArrowLeft' ? $('#list .pg-b.nx') : e.key === 'ArrowRight' ? $('#list .pg-b.pv') : null;
    if (b && b.dataset.open){ e.preventDefault(); openLesson(b.dataset.open); return; }
    if (e.key === 'Escape'){ e.preventDefault(); backToMap(); return; }
  }
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
  const le = e.target.closest('[data-le]');
  if (le){ // open or close the editable copy of a live preview's code
    const ed = le.closest('.live').querySelector('.live-ed');
    ed.hidden = !ed.hidden; le.classList.toggle('on', !ed.hidden);
    if (!ed.hidden) ed.querySelector('textarea').focus();
    return;
  }
  const wr = e.target.closest('[data-wreset]');
  if (wr){ const box = wr.closest('.work'); box.querySelector('.work-code').value = box.querySelector('.work-orig').value; workUpdate(box); store.del ? store.del('work:'+box.dataset.wk) : store.set('work:'+box.dataset.wk, box.querySelector('.work-orig').value); return; }
  const lr = e.target.closest('[data-lr]');
  if (lr){ const ta = lr.closest('.live-ed').querySelector('textarea'); ta.value = ta.defaultValue; lr.closest('.live').querySelector('iframe').srcdoc = liveFrame(ta.value); return; }
  const so = e.target.closest('[data-show]');
  if (so){ openShow(so); return; }
  const lw = e.target.closest('[data-lw]');
  if (lw){ // a live preview at phone, tablet or full width
    const box = lw.closest('.live');
    box.querySelector('iframe').style.width = lw.dataset.lw ? lw.dataset.lw+'px' : '';
    box.classList.toggle('narrow', lw.dataset.lw === '360');
    box.querySelectorAll('[data-lw]').forEach(b => b.classList.toggle('on', b === lw)); return;
  }
  const sr = e.target.closest('.sol-reveal');
  if (sr){
    const art = sr.closest('article'), box = art && art.querySelector('.chk');
    if (box) store.set('reveal:'+box.dataset.t+':'+box.dataset.c, '1');
    solUnlock(sr.closest('.trysol')); return;
  }
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
  const th = e.target.closest('[data-h]');
  if (th){ const el=document.getElementById(th.dataset.h); if (el) el.scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth', block:'start'}); return; }
  const op = e.target.closest('[data-open]');
  if (op){ openLesson(op.dataset.open); return; }
  if (e.target.closest('[data-map]')){ backToMap(); return; }
  const chip = e.target.closest('.chip, #unitnav [data-t]');
  if (chip){
    // a chip from inside the reader goes back to the map and lands on that category
    if (openCmd) return backToMap(chip.dataset.t);
    const el=document.getElementById(chip.dataset.t); if (el) el.scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'}); return;
  }
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
    enterTab(go.dataset.go).then(ok => { if (ok && go.dataset.lv !== undefined) $('#list').scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'}); });
  }
});
// the SQL engine is ~6 MB, so it starts loading only when the learner reaches a SQL exercise's box
document.addEventListener('focusin', e => {
  const box = e.target.closest('.chk');
  if (box && e.target.matches('.chk-code') && (CHECK[box.dataset.t+'|'+box.dataset.c] || {}).lang==='sql') sqlReady().catch(() => {});
});
$('#importFile').addEventListener('change', e => { const fl = e.target.files[0]; if (fl) importProgress(fl); e.target.value = ''; });
document.addEventListener('input', e => {
  const wc = e.target.closest('.work-code');
  if (wc){ workUpdate(wc.closest('.work')); return; } // a drill being solved in the page
  const led = e.target.closest('.live-ed textarea');
  if (led){ led.closest('.live').querySelector('iframe').srcdoc = liveFrame(led.value); return; } // the edited code, rendered as you type
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
  const dr = e.target.closest('input[type=checkbox][data-d]');
  if (dr) { store.set(dr.dataset.d, dr.checked ? '1':'0'); dr.closest('li').classList.toggle('on', dr.checked); return; }
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
const [fromHash, fromCmd] = hashParse(location.hash), savedShell = store.get('shell');
if (TAB_META[savedShell]) shell = savedShell;
(async () => {
  if (!TAB_META[fromHash] || !await tabReady(fromHash)) return goHome();
  setShell(fromHash, fromCmd);
  // a shared lesson link opens on the lesson, not on the top of the page
  if (openCmd) $('#list').scrollIntoView({block:'start', inline:'nearest'});
})();
window.addEventListener('hashchange', async () => {
  if (location.hash === hashMine) return;
  const [tab, cmd] = hashParse(location.hash);
  if (!TAB_META[tab] || !await tabReady(tab)) return goHome();
  const was = openCmd, wasHome = atHome;
  if (wasHome || tab !== shell) setShell(tab, cmd);
  else if ((cmd || null) !== openCmd){ openCmd = cmd && catOf(cmd) ? cmd : null; render(); }
  else return;
  if (wasHome) window.scrollTo(0, 0);
  // back/forward lands where the reader is looking: the lesson, or the map row of the lesson just left
  if (openCmd) return $('#list').scrollIntoView({block:'start', inline:'nearest'});
  const row = was && [...$('#list').querySelectorAll('tr[data-open]')].find(r => r.dataset.open === was);
  if (row) row.scrollIntoView({block:'center', inline:'nearest'});
});

/* ---------- offline (PWA) ---------- */
// only on the hosted site: the single-file copy in dist/ has no manifest, and file:// can't run service workers
if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol) && document.querySelector('link[rel="manifest"]')){
  window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
}
