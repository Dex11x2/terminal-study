// جدول «نفس المهمة في التلاتة»: [المهمة، bash، PowerShell، CMD]
const CMP = [
  ["مكانك الحالي", "pwd", "Get-Location", "cd"],
  ["عرض الملفات بالمخفي", "ls -la", "Get-ChildItem -Force", "dir /a"],
  ["فولدر جوه فولدر", "mkdir -p a/b", R`New-Item -ItemType Directory a\b -Force`, R`mkdir a\b`],
  ["ملف فاضي", "touch f.txt", "New-Item f.txt", "type nul > f.txt"],
  ["نسخ فولدر", "cp -r a b", "Copy-Item a b -Recurse", "xcopy a b /E /I"],
  ["تغيير اسم", "mv old new", "Rename-Item old new", "ren old new"],
  ["مسح فولدر", "rm -rf dir", "Remove-Item dir -Recurse -Force", "rd /s /q dir"],
  ["قراءة ملف", "cat f", "Get-Content f", "type f"],
  ["متابعة لوج لايف", "tail -f app.log", "Get-Content app.log -Tail 10 -Wait", "لا يوجد"],
  ["بحث في النص", R`grep -rn "x" .`, R`Get-ChildItem -Recurse | Select-String "x"`, R`findstr /s /n "x" *`],
  ["مكان برنامج", "which node", "Get-Command node", "where node"],
  ["العمليات", "ps aux", "Get-Process", "tasklist"],
  ["قتل عملية", "kill -9 1234", "Stop-Process -Id 1234 -Force", "taskkill /PID 1234 /F"],
  [
    "مين على بورت 3000",
    "lsof -i :3000",
    "Get-NetTCPConnection -LocalPort 3000 -State Listen",
    "netstat -ano | findstr :3000"
  ],
  ["متغير مؤقت", "export X=1", R`$env:X = "1"`, "set X=1"],
  ["طباعة متغير", "echo $X", "$env:X", "echo %X%"],
  ["مسح الشاشة", "clear", "cls", "cls"],
  ["ضغط فولدر", "tar -czf a.tar.gz dir", "Compress-Archive dir a.zip", "tar -czf a.tar.gz dir"],
  ["طلب HTTP", "curl URL", "Invoke-RestMethod URL", "curl URL"],
  ["IP بتاعك", "ip -br a", "Get-NetIPConfiguration", "ipconfig"],
  ["سؤال DNS", "dig +short example.com", "Resolve-DnsName example.com", "nslookup example.com"],
  [
    "بورت مفتوح على سيرفر؟",
    "nc -zv host 443",
    "Test-NetConnection host -Port 443",
    "لا يوجد، استخدم PowerShell"
  ],
  ["الطريق للسيرفر", "traceroute host", "Test-NetConnection host -TraceRoute", "tracert host"],
  ["ملف hosts", "/etc/hosts", R`C:\Windows\System32\drivers\etc\hosts`, "نفس مسار PowerShell"],
  ["الشرح", "man ls", "Get-Help ls -Examples", "dir /?"],
  ["افتح الفولدر في مدير الملفات", "xdg-open .", "Invoke-Item .", "start ."],
  ["ناتج أمر على الكليب بورد", "pwd | xclip -selection clipboard", "Get-Location | Set-Clipboard", "cd | clip"],
  ["متغير بيئة دايم", R`echo 'export API_URL=x' >> ~/.bashrc`, R`[Environment]::SetEnvironmentVariable("API_URL","x","User")`, "setx API_URL x"],
  ["عدد سطور ملف", "wc -l app.log", "(Get-Content app.log).Count", R`find /c /v "" app.log`],
  ["آخر 20 سطر", "tail -n 20 app.log", "Get-Content app.log -Tail 20", "لا يوجد، استخدم PowerShell"],
  ["حجم فولدر", "du -sh logs", R`(Get-ChildItem logs -Recurse -File | Measure-Object Length -Sum).Sum / 1MB`, "dir /s logs"],
  ["بصمة ملف (hash)", "sha256sum app.zip", "Get-FileHash app.zip", "certutil -hashfile app.zip SHA256"],
  ["تنزيل ملف", "curl -LO https://example.com/f.zip", "Invoke-WebRequest https://example.com/f.zip -OutFile f.zip", "curl -LO https://example.com/f.zip"],
  ["الأوامر اللي كتبتها", "history", "Get-History", "doskey /history"]
];

// التحديات: t العنوان، d الوصف (فقرات فيها [[code]])، c كود البداية (اختياري)، e شرح الحل (اختياري)
// s الحل: المفتاح شيل (bash، ps...) بيتعرض أوامر، أو تاب دروس (react، data، css...) بيتعرض كود
const MISSIONS = fixDollar([
  {
    t: "هيكل مشروع في سطر واحد",
    d: "جوه lab اعمل فولدر myapp فيه src و public و logs، وملف src/index.js، وملف .env فيه PORT=3000، وبعدين اعرض الهيكل.",
    s: {
      bash: R`mkdir -p myapp/{src,public,logs} && cd myapp && touch src/index.js && echo "PORT=3000" > .env && tree -a`,
      ps: R`New-Item -ItemType Directory myapp\src, myapp\public, myapp\logs -Force; Set-Location myapp; New-Item src\index.js; Set-Content .env "PORT=3000" -Encoding utf8; Get-ChildItem -Recurse -Force`,
      cmd: R`mkdir myapp\src myapp\public myapp\logs && cd myapp && type nul > src\index.js && (echo PORT=3000)> .env && tree /f`,
      zsh: R`mkdir -p myapp/{src,public,logs} && cd myapp && touch src/index.js && echo "PORT=3000" > .env && ls -la **/*`
    }
  },
  {
    t: "البورت مشغول (EADDRINUSE)",
    d: "شغّل سيرفر على بورت 3000 بـ python -m http.server 3000 (أو python3 على لينكس) في نافذة. من نافذة تانية اعرف مين ماسك البورت واقفله.",
    s: {
      bash: R`lsof -i :3000
kill $(lsof -t -iTCP:3000 -sTCP:LISTEN)`,
      ps: R`Get-NetTCPConnection -LocalPort 3000 -State Listen
Stop-Process -Id (Get-NetTCPConnection -LocalPort 3000 -State Listen).OwningProcess -Force`,
      cmd: R`netstat -ano | findstr :3000
REM خد الرقم من آخر عمود
taskkill /PID 1234 /F`,
      zsh: R`lsof -i :3000
kill $(lsof -t -iTCP:3000 -sTCP:LISTEN)`
    }
  },
  {
    t: "حلّل لوج",
    d: "اعمل ملف app.log فيه 4 سطور منهم سطرين فيهم ERROR. اعرف عدد الأخطاء، واحفظ سطورها بأرقامها في errors.txt.",
    s: {
      bash: R`printf "INFO start\nERROR db down\nINFO ok\nERROR timeout\n" > app.log
grep -c ERROR app.log
grep -n ERROR app.log > errors.txt && cat errors.txt`,
      ps: R`"INFO start","ERROR db down","INFO ok","ERROR timeout" | Set-Content app.log
(Select-String ERROR app.log).Count
Select-String ERROR app.log | Out-File errors.txt -Encoding utf8`,
      cmd: R`(echo INFO start& echo ERROR db down& echo INFO ok& echo ERROR timeout) > app.log
find /c "ERROR" app.log
findstr /n "ERROR" app.log > errors.txt`,
      zsh: R`printf "INFO start\nERROR db down\nINFO ok\nERROR timeout\n" > app.log
grep -c ERROR app.log
grep -n ERROR app.log > errors.txt && cat errors.txt`
    }
  },
  {
    t: "أكبر 5 ملفات",
    d: "في أي مشروع عندك اعرف أكبر 5 ملفات من غير node_modules. هنا هتحس بقوة PowerShell قدام CMD.",
    s: {
      bash: R`find . -type f -not -path "*/node_modules/*" -exec du -h {} + | sort -rh | head -5`,
      ps: "Get-ChildItem -Recurse -File | Where-Object FullName -notmatch 'node_modules' | Sort-Object Length -Descending | Select-Object -First 5 Name, @{n='MB'; e={[math]::Round($_.Length / 1MB, 2)}}",
      cmd: R`REM CMD ملوش طريقة نضيفة للمهمة دي
REM dir /o-s بيرتب جوه كل فولدر لوحده بس
REM استخدم PowerShell هنا`,
      zsh: R`find . -type f -not -path "*/node_modules/*" -exec ls -l {} + | sort -k5 -rn | head -5`
    }
  },
  {
    t: "باك أب بتاريخ النهارده",
    d: "اضغط فولدر myapp في ملف اسمه فيه تاريخ النهارده.",
    s: {
      bash: "tar -czf backup-$(date +%F).tar.gz myapp && ls -lh backup-*",
      ps: R`Compress-Archive myapp "backup-$(Get-Date -Format yyyy-MM-dd).zip"; Get-ChildItem backup-*`,
      cmd: R`for /f %d in ('powershell -NoProfile -Command "Get-Date -Format yyyy-MM-dd"') do tar -czf backup-%d.tar.gz myapp
REM جوه ملف .bat اكتب %%d بدل %d
dir backup*`,
      zsh: "tar -czf backup-$(date +%F).tar.gz myapp && open ."
    }
  },
  {
    t: "فحص السيرفر (bash بس)",
    d: "ادخل الـ VPS بتاعك، اتأكد إن Nginx شغال والكونفج سليم، شوف آخر أخطاء، والمساحة والرام، وأكتر 10 IPs بيزوروا الموقع.",
    s: {
      bash: R`ssh deploy@203.0.113.10
sudo systemctl status nginx
sudo nginx -t
sudo tail -n 30 /var/log/nginx/error.log
df -h && free -h
sudo awk '{print $1}' /var/log/nginx/access.log | sort | uniq -c | sort -rn | head -10`
    }
  },
  {
    t: "الموقع مش بيفتح: شخّص طبقة طبقة",
    d: "امشي بالترتيب ده بدل ما تخمّن: DNS، بعدين السيرفر بيرد، بعدين البورت مفتوح، بعدين Nginx، بعدين التطبيق. أول خطوة تفشل هي مكان المشكلة. جرّبه على موقعك وهو شغال عشان تعرف شكل النتيجة السليمة.",
    s: {
      bash: R`# 1. DNS: does the domain point to the server?
dig +short example.com
# 2. Is the server reachable?
ping -c 3 203.0.113.10
# 3. Is port 443 open from outside?
nc -zv 203.0.113.10 443
# 4. What does the browser actually get?
curl -vI https://example.com
# 5. On the server: Nginx up? app listening?
ssh deploy@203.0.113.10
sudo systemctl status nginx
sudo ss -tlnp | grep -E ':(80|443|3000)'
sudo tail -n 30 /var/log/nginx/error.log`,
      ps: R`Resolve-DnsName example.com
Test-Connection 203.0.113.10 -Count 3
Test-NetConnection 203.0.113.10 -Port 443
curl.exe -vI https://example.com
ssh deploy@203.0.113.10`,
      cmd: R`nslookup example.com
ping -n 3 203.0.113.10
curl -vI https://example.com
ssh deploy@203.0.113.10`
    }
  },
  {
    t: "افتح قاعدة بيانات السيرفر من جهازك بأمان",
    d: "قاعدة البيانات على السيرفر سامعة على 127.0.0.1 بس، ومفيش أي بورت مفتوح لها. وصّلها بجهازك من غير ما تفتح حاجة للنت.",
    s: {
      bash: R`ssh -N -L 5433:127.0.0.1:5432 deploy@203.0.113.10
# in a second terminal:
psql -h localhost -p 5433 -U postgres`,
      ps: R`ssh -N -L 5433:127.0.0.1:5432 deploy@203.0.113.10
# then connect DBeaver or pgAdmin to localhost:5433`,
      zsh: R`ssh -f -N -L 5433:127.0.0.1:5432 deploy@203.0.113.10
psql -h localhost -p 5433 -U postgres`
    }
  },
  {
    t: "API بترجع خطأ: اعرف السبب",
    d: "من Network انسخ الطلب اللي فشل (Copy as cURL أو Copy as PowerShell)، وشغّله من الترمنال، واقرا الـ status والـ headers والبودي. الأمثلة تحت طلب login بسيط تقدر تعدّل فيه. مثال PowerShell محتاج PowerShell 7 ([[pwsh]])، لأن -SkipHttpErrorCheck مش موجود في 5.1.",
    s: {
      bash: R`curl -i -X POST https://example.com/api/login -H "Content-Type: application/json" -d '{"email":"a@b.com","password":"wrong"}'`,
      ps: R`$r = Invoke-WebRequest https://example.com/api/login -Method Post -ContentType "application/json" -Body '{"email":"a@b.com","password":"wrong"}' -SkipHttpErrorCheck
$r.StatusCode
$r.Headers["Content-Type"]
$r.Content`,
      cmd: R`curl -i -X POST https://example.com/api/login -H "Content-Type: application/json" -d "{\"email\":\"a@b.com\",\"password\":\"wrong\"}"`
    }
  },
  {
    t: "اقفل SSH من غير ما تقفل على نفسك (bash بس)",
    d: "على سيرفر التجربة: اتأكد إن deploy بيدخل بالمفتاح وعنده sudo، اكتب إعدادات الأمان في ملف drop-in عشان ميتغطّاش عليها، طبّقها، وجرّب من نافذة جديدة إن الدخول بالباسورد بقى مرفوض. سيب النافذة الأولى مفتوحة لحد الآخر.",
    s: {
      bash: R`ssh deploy@203.0.113.10 'sudo -v && echo sudo-ok'
ssh deploy@203.0.113.10
printf "PermitRootLogin no\nPasswordAuthentication no\n" | sudo tee /etc/ssh/sshd_config.d/00-hardening.conf
sudo sshd -t && sudo systemctl restart ssh
sudo sshd -T | grep -Ei "permitrootlogin|passwordauthentication"
# from a NEW local terminal (keep the old one open), both must be refused:
ssh -o PubkeyAuthentication=no deploy@203.0.113.10
ssh root@203.0.113.10`
    }
  },
  {
    t: "الديسك اتملى: فضّي مكان بأمان (bash بس)",
    d: "السيرفر بيقول No space left on device. اعرف المساحة، ولاقي مين واكلها، ونضّف Docker واللوجات وكاش apt، من غير ما تلمس بيانات قواعد البيانات (مفيش --volumes في أي prune).",
    s: {
      bash: R`df -h / && df -i /
sudo du -xh / --max-depth=1 2>/dev/null | sort -rh | head
docker system df
docker image prune -a -f
docker builder prune -f
sudo journalctl --vacuum-size=200M
sudo apt clean
df -h /`
    }
  },
  {
    t: "رجّع commit مسحته بالغلط",
    d: "اعمل repo تجربة فيه commitين، امسح التاني بـ reset --hard، وبعدين رجّعه من reflog في branch اسمها rescue. لاحظ علامات التنصيص حوالين HEAD@{1}: من غيرها PowerShell بيبوّظ الأمر.",
    s: {
      bash: R`git init rescue-lab && cd rescue-lab
echo one > a.txt && git add a.txt && git commit -m "one"
echo two >> a.txt && git commit -am "two"
git reset --hard HEAD~1
git reflog
git branch rescue "HEAD@{1}"
git log --oneline rescue`,
      ps: R`git init rescue-lab; Set-Location rescue-lab
"one" | Set-Content a.txt; git add a.txt; git commit -m "one"
"two" | Add-Content a.txt; git commit -am "two"
git reset --hard HEAD~1
git reflog
git branch rescue "HEAD@{1}"
git log --oneline rescue`,
      cmd: R`git init rescue-lab && cd rescue-lab
echo one> a.txt && git add a.txt && git commit -m "one"
echo two>> a.txt && git commit -am "two"
git reset --hard HEAD~1
git reflog
git branch rescue "HEAD@{1}"
git log --oneline rescue`,
      zsh: R`git init rescue-lab && cd rescue-lab
echo one > a.txt && git add a.txt && git commit -m "one"
echo two >> a.txt && git commit -am "two"
git reset --hard "HEAD~1"
git reflog
git branch rescue "HEAD@{1}"
git log --oneline rescue`
    }
  },
  {
    t: "جهّز VS Code لمشروع الفريق",
    d: "في مشروع عندك: اعمل .vscode/settings.json يخلّي Prettier ينسّق مع كل حفظ و ESLint يصلّح لوحده، و extensions.json يقترح الإضافتين على أي حد يفتح المشروع، وافتح المشروع من الترمنال. الشرح في تاب VS Code المستوى ٣.",
    s: {
      bash: R`mkdir -p .vscode
cat > .vscode/settings.json <<'EOF'
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": { "source.fixAll.eslint": "explicit" },
  "files.eol": "\n"
}
EOF
printf '{ "recommendations": ["esbenp.prettier-vscode", "dbaeumer.vscode-eslint"] }\n' > .vscode/extensions.json
code .`,
      ps: R`New-Item -ItemType Directory .vscode -Force | Out-Null
@'
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": { "source.fixAll.eslint": "explicit" },
  "files.eol": "\n"
}
'@ | Set-Content .vscode/settings.json -Encoding utf8
'{ "recommendations": ["esbenp.prettier-vscode", "dbaeumer.vscode-eslint"] }' | Set-Content .vscode/extensions.json -Encoding utf8
code .`
    }
  },
  {
    t: "Postgres في Docker: شغّال ومقفول على جهازك",
    d: "شغّل Postgres في container بباسورد، على بورت متاح لجهازك بس (127.0.0.1)، واستنى لحد ما يبقى جاهز فعلًا، وبعدين اتأكد إن البورت مش مفتوح لباقي الشبكة. الشرح في تاب Docker (healthchecks) و PostgreSQL.",
    s: {
      bash: R`docker run -d --name pg -e POSTGRES_PASSWORD=secret -p 127.0.0.1:5432:5432 postgres:17
until docker exec pg pg_isready -U postgres; do sleep 1; done
docker exec -it pg psql -U postgres -c "SELECT version();"
ss -tlnp | grep 5432`,
      ps: R`docker run -d --name pg -e POSTGRES_PASSWORD=secret -p 127.0.0.1:5432:5432 postgres:17
do { Start-Sleep 1; docker exec pg pg_isready -U postgres } until ($LASTEXITCODE -eq 0)
docker exec -it pg psql -U postgres -c "SELECT version();"
Get-NetTCPConnection -LocalPort 5432 -State Listen | Select-Object LocalAddress, LocalPort`
    }
  },
  {
    t: "باك أب MongoDB وجرّب ترجّعه (bash بس)",
    d: "الباك أب اللي عمره ما اترجع مش باك أب. خد dump من container اسمه mongo، ورجّعه في container تجربة تاني، واتأكد إن عدد الـ documents واحد، وامسح التجربة. الشرح في تاب MongoDB المستوى ٣.",
    s: {
      bash: R`set -euo pipefail
docker exec mongo mongodump -u admin -p secret --authenticationDatabase admin --archive --gzip > app-$(date +%F).archive.gz
docker run -d --name mongo-test mongo:8
until docker exec mongo-test mongosh --quiet --eval "db.adminCommand('ping')" >/dev/null 2>&1; do sleep 1; done
docker exec -i mongo-test mongorestore --archive --gzip < app-$(date +%F).archive.gz
docker exec mongo-test mongosh --quiet app --eval "db.users.countDocuments()"
docker exec mongo mongosh --quiet -u admin -p secret --authenticationDatabase admin app --eval "db.users.countDocuments()"
docker rm -fv mongo-test`
    }
  },
  {
    t: "بعد الـ deploy: اتأكد إن الموقع سليم",
    d: "اكتب smoke test بيطلب أهم ٣ صفحات ويتأكد إنها بترجع 200، وإن صفحة مش موجودة بترجع 404 فعلًا (مش 200 بصفحة الـ SPA). لو أي حاجة غلط يطلع بكود فشل عشان CI يوقف. حل PowerShell محتاج PowerShell 7 (pwsh). الشرح في تاب التشخيص (smoke test).",
    s: {
      bash: R`fail=0
for p in / /api/health /login; do
  code=$(curl -s -o /dev/null -w '%{http_code}' "https://example.com$p")
  echo "$code $p"; [ "$code" = 200 ] || fail=1
done
[ "$(curl -s -o /dev/null -w '%{http_code}' https://example.com/no-such-page)" = 404 ] || { echo "404 page broken"; fail=1; }
exit $fail`,
      ps: R`$fail = 0
foreach ($p in '/', '/api/health', '/login') {
  $code = (Invoke-WebRequest "https://example.com$p" -SkipHttpErrorCheck -UseBasicParsing).StatusCode
  "$code $p"; if ($code -ne 200) { $fail = 1 }
}
if ((Invoke-WebRequest https://example.com/no-such-page -SkipHttpErrorCheck -UseBasicParsing).StatusCode -ne 404) { "404 page broken"; $fail = 1 }
exit $fail`
    }
  },
  {
    t: "ضيف فولدر للـ PATH واتأكد إنه اشتغل",
    d: "عندك أداة في فولدر tools ومش عايز تكتب مسارها كل مرة. ضيف الفولدر للـ PATH بشكل دايم، وافتح ترمنال جديد، واتأكد إن الشيل بيلاقي الأداة. على ويندوز فيه كمان الطريقة من الواجهة (تاب اختصارات النظام).",
    s: {
      bash: R`echo 'export PATH="$HOME/tools:$PATH"' >> ~/.bashrc
source ~/.bashrc
echo "$PATH" | tr ':' '\n' | head -3
command -v mytool`,
      zsh: R`echo 'export PATH="$HOME/tools:$PATH"' >> ~/.zshrc
source ~/.zshrc
echo $PATH | tr ':' '\n' | head -3
command -v mytool`,
      ps: R`$new = "$HOME\tools;" + [Environment]::GetEnvironmentVariable("Path", "User")
[Environment]::SetEnvironmentVariable("Path", $new, "User")
# افتح ترمنال جديد، وبعدين:
Get-Command mytool`,
      cmd: R`rundll32 sysdm.cpl,EditEnvironmentVariables
REM من النافذة: Path بتاع اليوزر → New → اكتب مسار الفولدر → OK
REM افتح CMD جديد، وبعدين:
where mytool`
    }
  },
  {
    t: "امنع أي commit فيه أخطاء lint",
    d: "في مشروع Node عندك: سطّب husky و lint-staged، واعمل hook بيشغّل ESLint و Prettier على الملفات اللي عملتلها add بس، وجرّب تعمل commit لملف فيه غلطة واتأكد إنه اترفض. الشرح في تاب فحص الكود المستوى ٢.",
    s: {
      bash: R`npm i -D husky lint-staged
npx husky init
echo "npx lint-staged" > .husky/pre-commit
printf '{ "*.{js,ts,tsx}": ["eslint --fix", "prettier --write"] }\n' > .lintstagedrc.json
echo "const x = ;" > broken.js && git add broken.js
git commit -m "test: hook" || echo "اترفض زي ما المفروض"
git reset -q broken.js && rm broken.js`
    }
  },
  {
    t: "مشروع Python نضيف: venv واختبارات",
    d: "اعمل venv للمشروع، وسطّب pytest جواه، واكتب اختبار صغير وشغّله، واحفظ النسخ في requirements.txt. الشرح في تاب Python.",
    s: {
      bash: R`python3 -m venv .venv
source .venv/bin/activate
pip install pytest
printf 'def test_add():\n    assert 1 + 1 == 2\n' > test_math.py
pytest -q
pip freeze > requirements.txt`,
      ps: R`py -m venv .venv
.venv\Scripts\Activate.ps1
pip install pytest
Set-Content test_math.py 'def test_add():', '    assert 1 + 1 == 2' -Encoding utf8
pytest -q
pip freeze > requirements.txt`
    }
  },
  {
    t: "React: بحث بـ debounce ميبعتش طلب مع كل حرف",
    d: R`اعمل كومبوننت [[SearchUsers]] بياخد prop اسمها [[search(q, { signal })]] بترجّع Promise فيها لستة يوزرز. الطلب يتبعت بس بعد ما اليوزر يبطّل كتابة بـ 300ms، ومفيش طلب لو الكلمة أقل من حرفين، واعرض «بيحمّل...» و «مفيش نتايج» ورسالة خطأ.

الفخ الحقيقي هو الـ race condition: لو كتبت «ah» وبعدين «ahmed»، ورد «ah» وصل متأخر، لازم ميكتبش فوق نتيجة «ahmed». اكتب اختبارين بـ Vitest و Testing Library و fake timers يثبتوا الحاجتين. المراجعة في «تاب React» (درس Vitest + Testing Library) و «تاب JavaScript» (درس debounce و throttle). الوقت: 45 لـ 60 دقيقة.`,
    e: R`الـ debounce هنا hook صغير: كل تغيير في القيمة بيلغي الـ timer القديم في الـ cleanup ويبدأ واحد جديد، فالقيمة المتأخرة مبتتغيرش غير لما الكتابة تقف. والـ effect اللي بيبعت الطلب معتمد على القيمة المتأخرة بس.

الـ race condition بيتحل بـ AbortController: الـ cleanup بتاع الـ effect بيعمل abort للطلب القديم أول ما q يتغير، وقبل أي setState بنشيك على [[ctrl.signal.aborted]]. الشيك ده لازم حتى لو fetch بيرمي AbortError، لأن دالة search ممكن تتجاهل الـ signal (زي الـ mock في الاختبار التاني). جرّبناها: من غير الشيك الاختبار التاني بيفشل وبيظهر «ah» بدل «ahmed».

في الاختبار [[vi.useFakeTimers()]] بيخليك تتحكم في الوقت، و [[advanceTimersByTimeAsync]] جوه [[act]] بيخلّي الـ Promises تخلص و React يرسم. وكل خطوة في [[act]] لوحدها: لو قدّمت الوقت كله مرة واحدة، React مش هيشغّل الـ effect الجديد (والـ abort) في النص. ولو مش مفعّل [[globals: true]] اعمل [[cleanup()]] بإيدك في afterEach، وإلا الكومبوننت بتاع الاختبار الأول يفضل في الصفحة. اتجرّب على React 19.3 و Vitest 5 (و 3.2 كمان): [[Tests  2 passed]].`,
    s: {
      react: R`// npm i -D vitest jsdom @testing-library/react @testing-library/dom @vitejs/plugin-react react react-dom
// vitest.config.js
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
export default defineConfig({ plugins: [react()], test: { environment: "jsdom" } });

// SearchUsers.jsx
import { useEffect, useState } from "react";

// hook صغير: بيرجّع القيمة بعد ما تثبت delay ملي ثانية
export function useDebounced(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}

export function SearchUsers({ search, delay = 300 }) {
  const [query, setQuery] = useState("");
  const q = useDebounced(query.trim(), delay);
  const [state, setState] = useState({ status: "idle", items: [] });

  useEffect(() => {
    if (q.length < 2) { setState({ status: "idle", items: [] }); return; }
    const ctrl = new AbortController();
    setState(s => ({ ...s, status: "loading" }));
    search(q, { signal: ctrl.signal })
      .then(items => { if (!ctrl.signal.aborted) setState({ status: "done", items }); })
      .catch(() => { if (!ctrl.signal.aborted) setState({ status: "error", items: [] }); });
    return () => ctrl.abort();
  }, [q, search]);

  return (
    <div>
      <label htmlFor="user-search">دوّر على يوزر</label>
      <input id="user-search" type="search" value={query} onChange={e => setQuery(e.target.value)} />
      <p role="status">
        {state.status === "loading" && "بيحمّل..."}
        {state.status === "error" && "حصلت مشكلة، جرّب تاني"}
        {state.status === "done" && state.items.length === 0 && "مفيش نتايج"}
      </p>
      <ul>{state.items.map(u => <li key={u.id}>{u.name}</li>)}</ul>
    </div>
  );
}

// SearchUsers.test.jsx
import { render, screen, fireEvent, act, cleanup } from "@testing-library/react";
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { SearchUsers } from "./SearchUsers.jsx";

beforeEach(() => vi.useFakeTimers());
afterEach(() => { cleanup(); vi.useRealTimers(); });

test("بيبعت طلب واحد بس بعد ما الكتابة تقف", async () => {
  const search = vi.fn(async q => [{ id: 1, name: "Sara " + q }]);
  render(<SearchUsers search={search} />);
  const input = screen.getByLabelText("دوّر على يوزر");
  for (const v of ["s", "sa", "sar", "sara"]) {
    fireEvent.change(input, { target: { value: v } });
    act(() => vi.advanceTimersByTime(100));
  }
  expect(search).not.toHaveBeenCalled();
  await act(() => vi.advanceTimersByTimeAsync(300));
  expect(search).toHaveBeenCalledTimes(1);
  expect(search.mock.calls[0][0]).toBe("sara");
  expect(screen.getByText("Sara sara")).toBeTruthy();
});

test("الرد القديم ميكتبش فوق الجديد", async () => {
  const signals = [];
  const search = vi.fn((q, { signal }) => { signals.push(signal); return new Promise(r => setTimeout(() => r([{ id: q, name: q }]), q === "ah" ? 1000 : 10)); });
  render(<SearchUsers search={search} />);
  const input = screen.getByLabelText("دوّر على يوزر");
  fireEvent.change(input, { target: { value: "ah" } });
  await act(() => vi.advanceTimersByTimeAsync(300));
  fireEvent.change(input, { target: { value: "ahmed" } });
  await act(() => vi.advanceTimersByTimeAsync(300));
  await act(() => vi.advanceTimersByTimeAsync(2000));
  expect(signals[0].aborted).toBe(true);
  expect(screen.queryByText("ah")).toBeNull();
  expect(screen.getByText("ahmed")).toBeTruthy();
});`
    }
  },
  {
    t: "Endpoint بـ pagination و validation واختبارات supertest",
    d: R`في Express 5 اعمل [[GET /api/products]] بيقبل [[page]] (من 1) و [[limit]] (من 1 لـ 50، والافتراضي 10) و [[category]] اختياري من لستة ثابتة، و [[sort]] واحدة من [[price]] أو [[-price]] أو [[id]]. الرد يبقى [[{ data, meta: { page, limit, total, totalPages, hasNext } }]]، وأي قيمة غلط ترجع 400 فيها كل الحقول الغلط مرة واحدة، مش أول واحد بس.

اكتب اختبارات بـ supertest و node:test: الصفحة الأولى، والصفحة الأخيرة الناقصة، وفلتر مع ترتيب، والـ 400، وصفحة بعد الآخر. المراجعة في «تاب Backend بـ Node» (درس supertest). الوقت: 45 لـ 75 دقيقة.`,
    e: R`الـ query string كله strings، فـ [[z.coerce.number()]] بيحوّل «2» لـ 2، و [[.int().min(1)]] بيرفض 0 و 1.5 و abc. و [[safeParse]] بيرجّع كل الأخطاء في [[issues]]، فالـ 400 بيبقى فيها page و limit و sort مع بعض.

صفحة بعد الآخر بترجع 200 و [[data: []]] مش 404: القايمة موجودة، بس الصفحة فاضية. والترتيب فيه ترتيب تاني بالـ id عند التساوي ([[|| a.id - b.id]])، وإلا المنتجات اللي ليها نفس السعر ممكن تتنقل بين الصفحات فاليوزر يشوف منتج مرتين أو ميشوفوش خالص. في قاعدة بيانات ده [[ORDER BY price DESC, id]]، وللجداول الكبيرة استخدم cursor pagination بدل OFFSET (درس cursor pagination في «تاب APIs متقدمة»).

supertest بيشغّل الـ app من غير listen على بورت، عشان كده الملف بيعمل [[export const app]] ومفيهوش listen، والـ listen في ملف server.js لوحده. اتجرّب على Express 5.2 و Zod 4.6 و Node 22 بـ [[node --test]]: [[# pass 5]].`,
    s: {
      api: R`// npm i express zod && npm i -D supertest
// app.js
import express from "express";
import { z } from "zod";

// داتا تجربة: 45 منتج
export const products = Array.from({ length: 45 }, (_, i) => ({
  id: i + 1,
  name: "Product " + (i + 1),
  price: 10 + ((i * 7) % 90),
  category: ["books", "games", "tools"][i % 3],
}));

const ListQuery = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(10),
  category: z.enum(["books", "games", "tools"]).optional(),
  sort: z.enum(["price", "-price", "id"]).default("id"),
});

export const app = express();

app.get("/api/products", (req, res) => {
  const parsed = ListQuery.safeParse(req.query);
  if (!parsed.success) {
    return res.status(400).json({
      error: "VALIDATION_ERROR",
      issues: parsed.error.issues.map(i => ({ field: i.path.join("."), message: i.message })),
    });
  }
  const { page, limit, category, sort } = parsed.data;

  let rows = category ? products.filter(p => p.category === category) : [...products];
  const key = sort.replace("-", ""), dir = sort.startsWith("-") ? -1 : 1;
  rows.sort((a, b) => (a[key] - b[key]) * dir || a.id - b.id);

  const total = rows.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const data = rows.slice((page - 1) * limit, page * limit);
  res.json({ data, meta: { page, limit, total, totalPages, hasNext: page < totalPages } });
});

// app.test.js  (node --test)
import { test } from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import { app } from "./app.js";

test("الصفحة الأولى بالقيم الافتراضية", async () => {
  const res = await request(app).get("/api/products").expect(200);
  assert.equal(res.body.data.length, 10);
  assert.deepEqual(res.body.meta, { page: 1, limit: 10, total: 45, totalPages: 5, hasNext: true });
});

test("آخر صفحة فيها الباقي بس", async () => {
  const res = await request(app).get("/api/products?page=5&limit=10").expect(200);
  assert.equal(res.body.data.length, 5);
  assert.equal(res.body.meta.hasNext, false);
});

test("فلتر وترتيب مع بعض", async () => {
  const res = await request(app).get("/api/products?category=books&sort=-price&limit=50").expect(200);
  assert.equal(res.body.meta.total, 15);
  assert.ok(res.body.data.every(p => p.category === "books"));
  const prices = res.body.data.map(p => p.price);
  assert.deepEqual(prices, [...prices].sort((a, b) => b - a));
});

test("قيم غلط ترجع 400 بكل الأخطاء", async () => {
  const res = await request(app).get("/api/products?page=0&limit=500&sort=name").expect(400);
  assert.equal(res.body.error, "VALIDATION_ERROR");
  assert.deepEqual(res.body.issues.map(i => i.field).sort(), ["limit", "page", "sort"]);
});

test("صفحة بعد الآخر ترجع data فاضية مش خطأ", async () => {
  const res = await request(app).get("/api/products?page=99").expect(200);
  assert.deepEqual(res.body.data, []);
});`
    }
  },
  {
    t: "SQL: تقرير الإيراد الشهري بـ running total",
    d: R`عندك جدول [[orders]] فيه [[status]] و [[total]] و [[created_at timestamptz]]. طلّع تقرير من يناير لأبريل 2026: لكل شهر الإيراد من الأوردرات المدفوعة بس، وعدد الأوردرات، والإجمالي التراكمي من أول الفترة، ونسبة التغيير عن الشهر اللي قبله. الشهر اللي مفيهوش مبيعات لازم يظهر بصفر، والشهور تتحسب بتوقيت القاهرة.

الكود اللي تحت بيعمل الجدول وداتا تجربة (شغّله في psql). المراجعة في «تاب SQL و Prisma» (درس window functions). الوقت: 30 لـ 60 دقيقة.`,
    c: R`DROP TABLE IF EXISTS orders;
CREATE TABLE orders (
  id          serial PRIMARY KEY,
  customer_id int NOT NULL,
  status      text NOT NULL CHECK (status IN ('paid', 'refunded', 'pending')),
  total       numeric(10,2) NOT NULL,
  created_at  timestamptz NOT NULL
);
INSERT INTO orders (customer_id, status, total, created_at) VALUES
  (1, 'paid',     120.00, '2026-01-05 10:00+02'),
  (2, 'paid',      80.00, '2026-01-20 18:30+02'),
  (1, 'refunded',  50.00, '2026-01-25 09:00+02'),
  (3, 'paid',     200.00, '2026-02-01 00:30+02'),
  (2, 'pending',   40.00, '2026-02-14 12:00+02'),
  (4, 'paid',     150.00, '2026-04-03 15:00+02'),
  (1, 'paid',      30.00, '2026-04-28 20:00+02');`,
    e: R`[[generate_series]] بيعمل صف لكل شهر، و LEFT JOIN عليه بيخلّي مارس يظهر بصفر. من غيره مارس بيختفي، و [[lag]] بيقارن أبريل بفبراير وانت فاكره بيقارن بمارس.

[[sum(revenue) OVER (ORDER BY month)]] بيجمع من أول صف لحد الصف الحالي، وده الـ running total. و [[lag(revenue) OVER w]] بيجيب قيمة الشهر اللي قبله، و [[nullif(..., 0)]] بيمنع القسمة على صفر، فأبريل (اللي قبله مارس بصفر) بيطلع NULL مش error. و [[WINDOW w AS (...)]] بيخليك تكتب تعريف الشباك مرة واحدة.

والتوقيت: أوردر [[2026-02-01 00:30+02]] بيتحسب في فبراير بتوقيت القاهرة، بس لو السيشن UTC بيبقى 31 يناير الساعة 10:30 بالليل ويتحسب في يناير. عشان كده [[SET TIME ZONE]]، أو [[date_trunc('month', created_at, 'Africa/Cairo')]] (Postgres 12 وأحدث). والفلتر [[created_at < '2026-05-01']] مش [[<= '2026-04-30']]، لأن التانية بتضيّع كل ساعات يوم 30. الناتج المتوقع في آخر الحل، واتجرّب على Postgres 16.`,
    s: {
      data: R`SET TIME ZONE 'Africa/Cairo';
WITH months AS (
  SELECT generate_series(timestamptz '2026-01-01', timestamptz '2026-04-01', interval '1 month') AS month
),
monthly AS (
  SELECT date_trunc('month', created_at) AS month,
         sum(total) AS revenue,
         count(*)   AS orders
  FROM orders
  WHERE status = 'paid'
    AND created_at >= timestamptz '2026-01-01'
    AND created_at <  timestamptz '2026-05-01'
  GROUP BY 1
),
filled AS (
  SELECT m.month, coalesce(x.revenue, 0) AS revenue, coalesce(x.orders, 0) AS orders
  FROM months m
  LEFT JOIN monthly x ON x.month = m.month
)
SELECT to_char(month, 'YYYY-MM') AS month,
       revenue,
       orders,
       sum(revenue) OVER (ORDER BY month) AS running_total,
       round(100.0 * (revenue - lag(revenue) OVER w) / nullif(lag(revenue) OVER w, 0), 1) AS mom_pct
FROM filled
WINDOW w AS (ORDER BY month)
ORDER BY month;

-- الناتج:
--   month  | revenue | orders | running_total | mom_pct
-- ---------+---------+--------+---------------+---------
--  2026-01 |  200.00 |      2 |        200.00 |
--  2026-02 |  200.00 |      1 |        400.00 |     0.0
--  2026-03 |       0 |      0 |        400.00 |  -100.0
--  2026-04 |  180.00 |      2 |        580.00 |`
    }
  },
  {
    t: "React: صلّح فورم فيه bug في الـ state و closure",
    d: R`الفورم اللي تحت فيه مشكلتين بيشتكي منهم اليوزرز: الكتابة في الحقول مش بتظهر خالص، ولما حد صلّح دي بسرعة اكتشفوا إن الـ autosave اللي بيشتغل كل 3 ثواني بيبعت فورم فاضي دايمًا.

لاقي السببين وصلّحهم من غير ما تعمل interval جديد مع كل حرف، واكتب اختبار بيفشل على الكود القديم وينجح على الجديد. المراجعة في «تاب React» (useState و useEffect). الوقت: 30 لـ 45 دقيقة.`,
    c: R`import { useEffect, useState } from "react";

export function ProfileForm({ onAutosave }) {
  const [form, setForm] = useState({ name: "", email: "" });

  function handleChange(e) {
    form[e.target.name] = e.target.value;
    setForm(form);
  }

  useEffect(() => {
    const id = setInterval(() => onAutosave(form), 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <form>
      <label>الاسم <input name="name" value={form.name} onChange={handleChange} /></label>
      <label>الإيميل <input name="email" value={form.email} onChange={handleChange} /></label>
      <p>معاينة: {form.name}</p>
    </form>
  );
}`,
    e: R`السبب الأول mutation: [[form[name] = value]] بيعدّل نفس الـ object، و [[setForm(form)]] بيدّي React نفس المرجع. React بيقارن بـ [[Object.is]] فبيعتبر مفيش تغيير ومبيرسمش، ولأن الـ input controlled بيرجّع قيمته لآخر قيمة اترسمت، فالحقل يفضل فاضي. الحل object جديد: [[setForm(prev => ({ ...prev, [name]: value }))]].

السبب التاني stale closure: الـ effect بـ dependencies فاضية اتشغّل مرة واحدة، والدالة اللي جوه الـ interval قافلة على [[form]] بتاع أول render للأبد. لو حطيت [[form]] في الـ dependencies هيشتغل، بس الـ interval هيتلغي ويتعمل مع كل حرف، ولو اليوزر فضل يكتب الـ autosave عمره ما هيحصل. الحل [[useEffectEvent]] (React 19.2 وأحدث): دالة بتقرا آخر props و state ومبتتحطش في الـ dependencies. في React أقدم استخدم [[useRef]] وحدّث [[ref.current]] في effect.

جرّبنا الاختبار على تلات نسخ: الأصلية بتفشل عند [[expected '' to be 'Mona']]، والنسخة اللي صلّحت الـ mutation بس بتفشل عند الـ autosave (اتبعت الاسم فاضي)، والنسخة اللي تحت بتنجح. الـ fake timers هنا للـ interval بس ([[toFake]])، لأن userEvent بيستخدم setTimeout، ولو زيّفت الـ timers كلها الاختبار بيعلق لحد الـ timeout.`,
    s: {
      react: R`// ProfileForm.jsx
import { useEffect, useEffectEvent, useState } from "react";

export function ProfileForm({ onAutosave }) {
  const [form, setForm] = useState({ name: "", email: "" });

  // bug 1: كان بيعدّل نفس الـ object، فـ React شايف نفس المرجع ومبيرسمش
  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  // bug 2: الـ interval اتعمل مرة واحدة، فالدالة اللي جواه شايفة form بتاع أول render (stale closure)
  // useEffectEvent (React 19.2+) بيقرا دايمًا آخر form و onAutosave، والـ interval يفضل واحد
  const autosave = useEffectEvent(() => onAutosave(form));

  useEffect(() => {
    const id = setInterval(() => autosave(), 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <form>
      <label>الاسم <input name="name" value={form.name} onChange={handleChange} /></label>
      <label>الإيميل <input name="email" value={form.email} onChange={handleChange} /></label>
      <p>معاينة: {form.name}</p>
    </form>
  );
}

// ProfileForm.test.jsx
import { render, screen, act, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { ProfileForm } from "./ProfileForm.jsx";

// نزيّف الـ interval بس، عشان userEvent يفضل شغال بالـ setTimeout الحقيقي
beforeEach(() => vi.useFakeTimers({ toFake: ["setInterval", "clearInterval"] }));
afterEach(() => { cleanup(); vi.useRealTimers(); });

test("الكتابة بتظهر والـ autosave بيبعت آخر قيمة", async () => {
  const onAutosave = vi.fn();
  const user = userEvent.setup();
  render(<ProfileForm onAutosave={onAutosave} />);
  await user.type(screen.getByLabelText("الاسم"), "Mona");
  expect(screen.getByLabelText("الاسم").value).toBe("Mona");
  expect(screen.getByText("معاينة: Mona")).toBeTruthy();
  await act(() => vi.advanceTimersByTimeAsync(3000));
  expect(onAutosave).toHaveBeenLastCalledWith({ name: "Mona", email: "" });
});`
    }
  },
  {
    t: "Rate limiter بـ sliding window",
    d: R`اكتب [[createRateLimiter({ limit, windowMs, now })]] بترجّع [[check(key)]]: لو الـ key (IP أو userId) عمل أقل من limit طلب في آخر windowMs ترجّع [[{ allowed: true, remaining }]]، وإلا [[{ allowed: false, retryAfterMs }]]. الطلب المرفوض ميتحسبش. وضيف [[prune()]] تمسح الـ keys الخلصانة عشان الذاكرة متكبرش للأبد.

[[now]] بتتحقن من برّه عشان تختبر من غير ما تستنى وقت حقيقي. اكتب اختبارات بـ node:test. المراجعة في «تاب Backend بـ Node» (درس express-rate-limit). الوقت: 40 لـ 60 دقيقة.`,
    e: R`ده sliding window log: لكل key array بأوقات الطلبات، وقبل كل check بنشيل اللي أقدم من [[t - windowMs]]. أدق من fixed window، اللي بيسمح بضعف الحد حوالين حدود الدقيقة (limit في آخر ثانية من الدقيقة و limit في أول ثانية من اللي بعدها)، بس الذاكرة O(limit) لكل key. لو الحد كبير (آلاف) استخدم sliding window counter أو token bucket.

[[retryAfterMs]] = أقدم طلب في الشباك + windowMs − دلوقتي، وده اللي تحطه في header [[Retry-After]] (بالثواني ومقرّب لفوق) مع status 429. والحل ده في ذاكرة البروسس، يعني لسيرفر واحد بس: لو عندك أكتر من instance لازم Redis (درس rate-limit-redis في «تاب Backend بـ Node»). وفي الانترفيو اتكلم عن الفرق بين الخوارزميات وليه [[now]] بتتحقن. اتجرّب بـ [[node --test]]: [[# pass 6]].`,
    s: {
      js: R`// rateLimiter.js
// sliding window log: لكل key بنحفظ أوقات الطلبات اللي جوه آخر windowMs بس
export function createRateLimiter({ limit, windowMs, now = () => Date.now() }) {
  if (!Number.isInteger(limit) || limit < 1) throw new RangeError("limit must be a positive integer");
  if (!(windowMs > 0)) throw new RangeError("windowMs must be > 0");
  const hits = new Map(); // key -> array of timestamps (أقدم الأول)

  function check(key) {
    const t = now();
    const list = (hits.get(key) ?? []).filter(ts => ts > t - windowMs);
    if (list.length >= limit) {
      hits.set(key, list);
      return { allowed: false, remaining: 0, retryAfterMs: list[0] + windowMs - t };
    }
    list.push(t);
    hits.set(key, list);
    return { allowed: true, remaining: limit - list.length, retryAfterMs: 0 };
  }

  // عشان الـ Map متكبرش للأبد باليوزرز اللي مشيوا
  function prune() {
    const t = now();
    for (const [key, list] of hits) {
      if (!list.length || list[list.length - 1] <= t - windowMs) hits.delete(key);
    }
  }

  return { check, prune, size: () => hits.size };
}

// rateLimiter.test.js  (node --test)
import { test } from "node:test";
import assert from "node:assert/strict";
import { createRateLimiter } from "./rateLimiter.js";

function setup(limit = 3, windowMs = 1000) {
  let t = 0;
  const rl = createRateLimiter({ limit, windowMs, now: () => t });
  return { rl, tick: ms => { t += ms; } };
}

test("بيسمح لحد limit وبعدين يرفض", () => {
  const { rl } = setup();
  assert.deepEqual([1, 2, 3, 4].map(() => rl.check("ip1").allowed), [true, true, true, false]);
});

test("كل key ليه عدّاد لوحده", () => {
  const { rl } = setup(1);
  assert.equal(rl.check("a").allowed, true);
  assert.equal(rl.check("b").allowed, true);
  assert.equal(rl.check("a").allowed, false);
});

test("الشباك بيتحرك: أقدم طلب يخرج فيتفتح مكان", () => {
  const { rl, tick } = setup(2, 1000);
  rl.check("u");           // t=0
  tick(600); rl.check("u"); // t=600
  tick(300);               // t=900
  const r = rl.check("u");
  assert.equal(r.allowed, false);
  assert.equal(r.retryAfterMs, 100); // أول طلب يخرج عند 1000
  tick(100);               // t=1000
  assert.equal(rl.check("u").allowed, true);
});

test("الرفض مش بيتحسب طلب", () => {
  const { rl, tick } = setup(1, 1000);
  rl.check("u");
  for (let i = 0; i < 5; i++) { tick(100); rl.check("u"); }
  tick(500); // t=1000
  assert.equal(rl.check("u").allowed, true);
});

test("prune بيمسح الـ keys الخلصانة", () => {
  const { rl, tick } = setup();
  rl.check("a"); rl.check("b");
  tick(1000);
  rl.prune();
  assert.equal(rl.size(), 0);
});

test("مدخلات غلط ترمي خطأ", () => {
  assert.throws(() => createRateLimiter({ limit: 0, windowMs: 1000 }), RangeError);
});`
    }
  },
  {
    t: "TypeScript: fetch بـ type حقيقي من Zod",
    d: R`[[(await res.json()) as User]] كذبة: TypeScript مصدّقك ومفيش أي فحص وقت التشغيل. اكتب [[fetchJson(url, schema)]] بترجّع نوع مستنتج من الـ schema نفسها، وبترمي [[ApiError]] فيها [[kind]] بيفرّق بين: السيرفر مبيردش ([[network]])، و status مش 2xx ([[http]])، وشكل رد غلط ([[invalid-response]]) مع كل الحقول الغلط. ولازم [[createdAt]] يرجع Date مش string.

اختبر بسيرفر [[node:http]] محلي بيرجّع رد سليم ورد غلط و 404، وشغّل [[tsc --noEmit]]. المراجعة في «تاب TypeScript» (درس Express + Zod). الوقت: 45 لـ 60 دقيقة.`,
    e: R`الـ generic [[S extends z.ZodType]] ونوع الرجوع [[z.infer<S>]] بيخلّوا [[getUsers()]] نوعها [[{ data: User[]; nextCursor: string | null }]] من غير ولا interface مكتوب بإيدك. [[res.json()]] متخزّن في [[unknown]] عن قصد، والـ schema هي اللي بتحوّله لنوع. [[z.coerce.date()]] بيحوّل الـ ISO string لـ Date، و [[z.prettifyError]] (Zod 4) بيطلع رسالة فيها سطر لكل مشكلة زي [[✖ Invalid email address]] وتحته [[→ at data[0].email]].

الكلاس مكتوب بـ fields عادية مش [[constructor(public readonly status...)]]، لأن parameter properties مش «erasable»: Node بيشغّل .ts بـ type stripping ومبيدعمهاش (الاختبار وقع فعلًا بيها)، و [[erasableSyntaxOnly]] في tsconfig بيمسكها بدري. ولاحظ [[{ cause }]]: الخطأ الأصلي بيفضل موجود للّوج.

اتجرّب على Zod 4.6 و TypeScript 6 و Node 22 ([[node --test api.test.ts]] من غير أي أداة): [[# pass 4]] و tsc من غير أخطاء.`,
    s: {
      ts: R`// npm i zod && npm i -D typescript @types/node
// tsconfig.json: strict + "noUncheckedIndexedAccess" + "allowImportingTsExtensions" + "erasableSyntaxOnly" + "noEmit"
// api.ts
import { z } from "zod";

export const User = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1),
  email: z.email(),
  role: z.enum(["admin", "member"]),
  createdAt: z.coerce.date(),           // JSON فيه string، احنا عايزين Date
  bio: z.string().nullable().default(null),
});
export type User = z.infer<typeof User>;

export const UserList = z.object({
  data: z.array(User),
  nextCursor: z.string().nullable(),
});

export class ApiError extends Error {
  readonly status: number;
  readonly kind: "http" | "invalid-response" | "network";
  constructor(message: string, status: number, kind: ApiError["kind"], options?: { cause?: unknown }) {
    super(message, options);
    this.name = "ApiError";
    this.status = status;
    this.kind = kind;
  }
}

export async function fetchJson<S extends z.ZodType>(
  url: string,
  schema: S,
  init?: RequestInit,
): Promise<z.infer<S>> {
  let res: Response;
  try {
    res = await fetch(url, { ...init, headers: { Accept: "application/json", ...init?.headers } });
  } catch (err) {
    throw new ApiError("Network error", 0, "network", { cause: err });
  }
  if (!res.ok) {
    throw new ApiError($__btHTTP $__{res.status} for $__{url}$__bt, res.status, "http");
  }
  const json: unknown = await res.json().catch(() => undefined);
  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    throw new ApiError($__btUnexpected response shape:\n$__{z.prettifyError(parsed.error)}$__bt, res.status, "invalid-response", { cause: parsed.error });
  }
  return parsed.data;
}

export const getUsers = (cursor?: string) =>
  fetchJson($__bthttp://localhost:4010/users$__{cursor ? $__bt?cursor=$__{encodeURIComponent(cursor)}$__bt : ""}$__bt, UserList);

// api.test.ts  (node --test api.test.ts)
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { createServer, type Server } from "node:http";
import { fetchJson, getUsers, ApiError, User, UserList } from "./api.ts";

let server: Server;
const good = { data: [{ id: 1, name: "Mona", email: "mona@example.com", role: "admin", createdAt: "2026-09-01T10:00:00Z" }], nextCursor: null };
before(() => new Promise<void>(r => {
  server = createServer((req, res) => {
    res.setHeader("Content-Type", "application/json");
    if (req.url === "/users") return res.end(JSON.stringify(good));
    if (req.url === "/bad") return res.end(JSON.stringify({ data: [{ id: "1", name: "", email: "nope", role: "owner", createdAt: "x" }], nextCursor: null }));
    res.statusCode = 404; res.end("{}");
  }).listen(4010, r);
}));
after(() => server.close());

test("رد سليم بيرجع typed وفيه Date", async () => {
  const page = await getUsers();
  const u = page.data[0]!;
  assert.ok(u.createdAt instanceof Date);
  assert.equal(u.createdAt.getUTCFullYear(), 2026);
  assert.equal(u.bio, null);
});

test("شكل غلط يرمي invalid-response بكل الحقول", async () => {
  const err = await fetchJson("http://localhost:4010/bad", UserList).catch(e => e);
  assert.ok(err instanceof ApiError);
  assert.equal(err.kind, "invalid-response");
  assert.match(err.message, /data\[0\]\.email/);
});

test("404 يرمي http error بالـ status", async () => {
  const err = await fetchJson("http://localhost:4010/missing", UserList).catch(e => e);
  assert.equal(err.kind, "http");
  assert.equal(err.status, 404);
});

test("السيرفر مش شغال يرمي network", async () => {
  const err = await fetchJson("http://localhost:4999/users", User).catch(e => e);
  assert.equal(err.kind, "network");
});`
    }
  },
  {
    t: "CSS: جريد كروت responsive بيشتغل RTL و LTR",
    d: R`عندك كارت منتج (الـ HTML تحت، حط منه 4 أو 5 جوه [[<main class="grid">]] في صفحة [[<html lang="ar" dir="rtl">]]). المطلوب: عمود واحد على الموبايل، والأعمدة تزيد لوحدها على الشاشات الأكبر من غير ولا media query، وكل الكروت في الصف بنفس الطول، والسعر والزرار لازقين تحت مهما كان طول الوصف، ومفيش scroll أفقي حتى لو فيه لينك طويل من غير مسافات.

وفيه خط ملوّن على «بداية» الكارت: يمين في العربي وشمال في الإنجليزي، من غير CSS مخصوص لكل اتجاه. جرّب على 360 و 700 و 1280 بكسل، وغيّر [[dir]] على [[html]] لـ ltr. المراجعة في «تاب HTML و CSS» (grid و logical properties). الوقت: 30 لـ 60 دقيقة.`,
    c: R`<article class="card">
  <img src="headphones.jpg" alt="سماعة سودا لاسلكية">
  <div class="body">
    <h2>سماعة لاسلكية</h2>
    <p>وصف قصير أو طويل، وممكن يبقى فيه لينك زي https://example.com/a/very/long/url/without/spaces</p>
    <div class="meta"><span class="price">EGP 1,250</span><a class="more" href="/p/1">التفاصيل</a></div>
  </div>
</article>`,
    e: R`[[repeat(auto-fill, minmax(min(100%, 16rem), 1fr))]]: كل عمود 16rem على الأقل، وعدد الأعمدة على قد المساحة. والـ [[min(100%, ...)]] بيمنع overflow على شاشة أضيق من 16rem. الكروت بنفس الطول لوحدها لأن عناصر الـ grid بتتمط لطول الصف (الافتراضي stretch)، والـ meta بتنزل لتحت بـ [[margin-block-start: auto]] جوه flex column.

كل الاتجاهات logical: [[border-inline-start]] و [[margin-inline]] و [[max-inline-size]]، فالخط بيتنقل من اليمين للشمال لوحده. السعر [[direction: ltr]] مع [[unicode-bidi: isolate]] عشان «EGP 1,250» ميتلخبطش جوه نص عربي، والسهم بيتبدل بـ [[:dir(ltr)]]، و [[overflow-wrap: anywhere]] بيكسر اللينك الطويل.

اتقاس في Chromium: على 360 عمود واحد عرضه 328، وعلى 700 عمودين، وعلى 1280 أربعة أعمدة كل واحد 268 وكلهم نفس الطول، و [[scrollWidth]] = عرض الشاشة في الكل. ولما بدّلنا لـ ltr الخط الـ 4px اتنقل من اليمين للشمال وترتيب الأعمدة اتعكس.`,
    s: {
      css: R`*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, sans-serif; background: #f4f4f5; color: #18181b; }

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 16rem), 1fr));
  gap: 1rem;
  max-inline-size: 72rem;
  margin-inline: auto;
  padding: 1rem;
}

.card {
  display: flex;
  flex-direction: column;
  background: #fff;
  border: 1px solid #e4e4e7;
  border-inline-start: 4px solid #4f46e5;
  border-radius: 12px;
  overflow: hidden;
}
.card img { inline-size: 100%; aspect-ratio: 16 / 9; object-fit: cover; display: block; background: #c7d2fe; }
.card .body { display: flex; flex-direction: column; gap: .5rem; padding: 1rem; flex: 1; }
.card h2 { margin: 0; font-size: 1.1rem; }
.card p { margin: 0; color: #52525b; overflow-wrap: anywhere; }
.card .meta { display: flex; justify-content: space-between; align-items: center; gap: .5rem; margin-block-start: auto; }
.card .price { font-weight: 700; unicode-bidi: isolate; direction: ltr; }
.card .badge { padding-inline: .5rem; border-radius: 999px; background: #eef2ff; font-size: .8rem; }
.card .more::after { content: "←"; margin-inline-start: .25rem; }
.card .more:dir(ltr)::after { content: "→"; }`
    }
  },
  {
    t: "DSA: sliding window و two pointers باختبارات",
    d: R`اكتب دالتين في O(n): [[longestUnique(s)]] بترجّع طول ونص أطول substring مفيهوش حرف متكرر، و [[pairsWithSum(sorted, target)]] بترجّع كل الأزواج المختلفة في array مترتبة اللي مجموعها target، من غير ما زوج يتكرر.

اختبر الحالات الحدية (string فاضي، و «abba»، والأرقام السالبة، والتكرار)، وقارن الدالة الأولى بحل brute force على مدخلات عشوائية. المراجعة في «تاب DSA» (دروس variable sliding window و two pointers (sorted)). الوقت: 45 لـ 75 دقيقة.`,
    e: R`في الشباك: [[last]] بيحفظ آخر مكان لكل حرف، ولما الحرف يتكرر بننقل [[start]] بعده، بس لو المكان ده جوه الشباك الحالي ([[>= start]]). من غير الشرط ده «abba» بتطلع 3 غلط: عند آخر a الـ start بيرجع لورا. كل index بيدخل الشباك مرة ويخرج مرة، فالوقت O(n).

في two pointers: المجموع أصغر من المطلوب يبقى حرّك الشمال، أكبر يبقى حرّك اليمين، وده صح بس لأن الـ array مترتبة. بعد ما تلاقي زوج عدّي كل القيم المكررة من الناحيتين، وإلا [[[1, 1, 5, 5]]] هيطلع [1, 5] أكتر من مرة.

الاختبار العشوائي هو اللي بيمسك الأخطاء اللي مش هتفكر فيها: 500 string من 4 حروف بس عشان التكرار يكتر، ونقارن بالـ brute force البطيء اللي أكيد صح. اتجرّب بـ [[node --test]]: [[# pass 3]].`,
    s: {
      dsa: R`// window.js
// 1) sliding window: أطول substring من غير حروف متكررة. O(n) وقت، O(k) مساحة
export function longestUnique(s) {
  const last = new Map(); // الحرف -> آخر index شفناه فيه
  let start = 0, best = 0, bestStart = 0;
  for (let end = 0; end < s.length; end++) {
    const ch = s[end];
    if (last.has(ch) && last.get(ch) >= start) start = last.get(ch) + 1; // انقل بداية الشباك بعد التكرار
    last.set(ch, end);
    if (end - start + 1 > best) { best = end - start + 1; bestStart = start; }
  }
  return { length: best, value: s.slice(bestStart, bestStart + best) };
}

// 2) two pointers: في array مترتبة، كل الأزواج المختلفة اللي مجموعها target. O(n)
export function pairsWithSum(sorted, target) {
  const out = [];
  let i = 0, j = sorted.length - 1;
  while (i < j) {
    const sum = sorted[i] + sorted[j];
    if (sum < target) i++;
    else if (sum > target) j--;
    else {
      out.push([sorted[i], sorted[j]]);
      const a = sorted[i], b = sorted[j];
      while (i < j && sorted[i] === a) i++; // عدّي التكرار عشان الزوج ميتكررش
      while (i < j && sorted[j] === b) j--;
    }
  }
  return out;
}

// window.test.js  (node --test)
import { test } from "node:test";
import assert from "node:assert/strict";
import { longestUnique, pairsWithSum } from "./window.js";

test("longestUnique: حالات معروفة", () => {
  assert.deepEqual(longestUnique("abcabcbb"), { length: 3, value: "abc" });
  assert.deepEqual(longestUnique("bbbbb"), { length: 1, value: "b" });
  assert.deepEqual(longestUnique("pwwkew"), { length: 3, value: "wke" });
  assert.deepEqual(longestUnique(""), { length: 0, value: "" });
  assert.deepEqual(longestUnique("abba"), { length: 2, value: "ab" }); // الفخ: التكرار قبل بداية الشباك
});

test("pairsWithSum: تكرار وسالب ومفيش نتيجة", () => {
  assert.deepEqual(pairsWithSum([1, 1, 2, 3, 4, 4, 5], 6), [[1, 5], [2, 4]]);
  assert.deepEqual(pairsWithSum([-3, -1, 0, 2, 4], 1), [[-3, 4], [-1, 2]]);
  assert.deepEqual(pairsWithSum([3, 3], 6), [[3, 3]]);
  assert.deepEqual(pairsWithSum([1, 2], 10), []);
});

// اختبار عشوائي ضد حل brute force بطيء بس أكيد
const bruteLen = s => { let b = 0; for (let i = 0; i < s.length; i++) for (let j = i; j < s.length; j++) { const t = s.slice(i, j + 1); if (new Set(t).size === t.length) b = Math.max(b, t.length); } return b; };
test("longestUnique = brute force على 500 string عشوائي", () => {
  for (let k = 0; k < 500; k++) {
    const s = Array.from({ length: Math.floor(Math.random() * 20) }, () => "abcd"[Math.floor(Math.random() * 4)]).join("");
    const r = longestUnique(s);
    assert.equal(r.length, bruteLen(s), s);
    assert.equal(new Set(r.value).size, r.value.length);
  }
});`
    }
  },
  {
    t: "حوّل callbacks لـ async/await بمعالجة أخطاء صح",
    d: R`الكود اللي تحت بيقرا config ويتصل بمكتبة قاعدة بيانات قديمة بالـ callbacks ويجيب يوزرز. فيه تلات مشاكل: JSON بايظ بيوقّع البروسس كله، ويوزر مش موجود بينادي [[done]] بالخطأ وبعدين يوقع بـ TypeError، والاتصال مبيتقفلش لو حصل خطأ.

حوّله لـ [[async function buildReport(path)]] من غير ما تعدّل مكتبة db: الطلبات تتبعت مع بعض مش ورا بعض، والاتصال يتقفل في كل الحالات، وأخطاء الـ config تبقى رسالة واضحة والخطأ الأصلي في [[cause]]. جرّبه على config سليم، ويوزر مش موجود، و JSON بايظ، وملف مش موجود. المراجعة في «تاب JavaScript» (async و await). الوقت: 30 لـ 45 دقيقة.`,
    c: R`// db.cjs (المكتبة القديمة، متعدلهاش)
// مكتبة قديمة بالـ callbacks (متعدلهاش): آخر argument هو callback(err, result)
const users = { 1: { id: 1, name: "Mona" }, 2: { id: 2, name: "Omar" } };
exports.connect = (url, cb) => setTimeout(() => url.startsWith("db://") ? cb(null, { url }) : cb(new Error("bad url " + url)), 10);
exports.getUser = (conn, id, cb) => setTimeout(() => users[id] ? cb(null, users[id]) : cb(new Error("user " + id + " not found")), 10);
exports.close = (conn, cb) => setTimeout(() => { console.log("closed"); cb(null); }, 5);

// old.cjs
const fs = require("fs");
const db = require("./db.cjs");

function buildReport(configPath, done) {
  fs.readFile(configPath, "utf8", (err, text) => {
    if (err) return done(err);
    const config = JSON.parse(text);            // لو الـ JSON بايظ: throw جوه callback محدش هيمسكه
    db.connect(config.dbUrl, (err, conn) => {
      if (err) return done(err);
      const result = [];
      config.userIds.forEach(id => {
        db.getUser(conn, id, (err, user) => {
          if (err) done(err);                   // ممكن تتنادي أكتر من مرة، والاتصال ميتقفلش
          result.push(user.name);               // وهنا user undefined → crash
          if (result.length === config.userIds.length) {
            db.close(conn, () => done(null, result));
          }
        });
      });
    });
  });
}
module.exports = { buildReport };`,
    e: R`[[promisify]] بيحوّل أي دالة آخر argument فيها [[callback(err, result)]] لدالة بترجّع Promise، فمش محتاج تلمس المكتبة. و [[node:fs/promises]] بيغنيك عن promisify مع fs.

الـ throw جوه callback مبيوصلش لأي try/catch برّه (الـ stack اتغير)، وعشان كده الكود القديم بيوقّع البروسس. جوه async function أي throw بيبقى rejection تمسكه عند النداء. [[Promise.all]] بيبعت الطلبات مع بعض وبيرفض عند أول خطأ، ولو عايز كل النتايج حتى الفاشلة استخدم [[Promise.allSettled]]. و [[finally]] بيقفل الاتصال في النجاح والفشل.

شغّلناه: ok.json رجّع Mona و Omar واتطبع closed، و missing-user.json رجّع [[user 99 not found]] واتطبع closed برضه، و broken.json و nope.json رجعوا [[Cannot load config]] والسبب الأصلي في cause (SyntaxError و ENOENT). والكود القديم على missing-user.json نادى done بالخطأ وبعدين البروسس وقع بـ [[Cannot read properties of undefined (reading 'name')]].`,
    s: {
      js: R`// report.js
import { readFile } from "node:fs/promises";
import { promisify } from "node:util";
import db from "./db.cjs";

const connect = promisify(db.connect);
const getUser = promisify(db.getUser);
const close = promisify(db.close);

export async function buildReport(configPath) {
  let config;
  try {
    config = JSON.parse(await readFile(configPath, "utf8"));
  } catch (err) {
    throw new Error($__btCannot load config $__{configPath}$__bt, { cause: err });
  }

  const conn = await connect(config.dbUrl);
  try {
    // الطلبات مستقلة عن بعض، فبنبعتها مع بعض مش واحد ورا واحد
    const users = await Promise.all(config.userIds.map(id => getUser(conn, id)));
    return users.map(u => u.name);
  } finally {
    await close(conn); // بيتقفل في النجاح والفشل
  }
}

// run.js  (node run.js)
import { writeFile } from "node:fs/promises";
import { buildReport } from "./report.js";

await writeFile("ok.json", JSON.stringify({ dbUrl: "db://local", userIds: [1, 2] }));
await writeFile("missing-user.json", JSON.stringify({ dbUrl: "db://local", userIds: [1, 99] }));
await writeFile("broken.json", "{ not json");

for (const f of ["ok.json", "missing-user.json", "broken.json", "nope.json"]) {
  try {
    console.log(f, "->", await buildReport(f));
  } catch (err) {
    console.log(f, "-> ERROR:", err.message, err.cause ? $__bt(cause: $__{err.cause.message})$__bt : "");
  }
}`
    }
  },
  {
    t: "Unit test بـ mock لخدمة الإيميل",
    d: R`[[registerUser]] بتعمل يوزر وتبعتله إيميل ترحيب. اكتبها بحيث الـ dependencies (اليوزرز، وخدمة الإيميل، والـ logger) تيجي كـ parameter، واكتب اختبارات Vitest بـ [[vi.fn()]] من غير أي إيميل حقيقي:

الإيميل اتبعت مرة واحدة بالبيانات الصح وبعد إنشاء اليوزر، والإيميل المتسجّل قبل كده ميعملش create ولا يبعت حاجة، ولو خدمة الإيميل وقعت اليوزر يتعمل برضه والخطأ يتسجّل. المراجعة في «تاب فحص الكود» (دروس vitest و vi.fn و vi.spyOn). الوقت: 30 لـ 45 دقيقة.`,
    e: R`الـ dependency injection هو اللي خلّى الاختبار سهل: مفيش [[vi.mock]] لموديول ولا سيرفر SMTP، بنمرّر objects فيها [[vi.fn()]]. [[mockResolvedValue]] بيخلّي الـ mock async، و [[mockRejectedValueOnce]] بيفشّل النداء الجاي بس. [[toHaveBeenCalledWith]] بيتأكد من الـ arguments بالظبط، و [[invocationCallOrder]] من الترتيب، و [[expect.objectContaining]] من جزء من الـ object بس.

القرار المهم هنا إن فشل الإيميل ميلغيش التسجيل. في production الأحسن الإيميل يروح queue ويتعاد لوحده (درس queue ولا pub/sub ولا stream في «تاب APIs متقدمة»). والغلطة الشائعة إنك تختبر إن [[mailer.send]] اتنادت وبس، من غير البيانات، فالاختبار ينجح حتى لو الإيميل اتبعت من غير lowercase أو لليوزر الغلط. اتجرّب على Vitest 5 (و 3.2 كمان): [[Tests  3 passed]].`,
    s: {
      api: R`// register.js
export class ConflictError extends Error {}

// الـ dependencies بتيجي من برّه (dependency injection)، فالاختبار يقدر يدّي نسخ مزيّفة
export async function registerUser({ email, name }, { users, mailer, logger = console }) {
  const normalized = email.trim().toLowerCase();
  if (await users.findByEmail(normalized)) throw new ConflictError("Email already registered");

  const user = await users.create({ email: normalized, name });
  try {
    await mailer.send({
      to: normalized,
      template: "welcome",
      data: { name, userId: user.id },
    });
    return { user, emailSent: true };
  } catch (err) {
    // الإيميل مش أهم من التسجيل: اليوزر اتعمل، نسجّل الخطأ ونكمّل
    logger.error("welcome email failed", { userId: user.id, err: err.message });
    return { user, emailSent: false };
  }
}

// register.test.js
import { beforeEach, describe, expect, test, vi } from "vitest";
import { registerUser, ConflictError } from "./register.js";

let users, mailer, logger;
beforeEach(() => {
  users = {
    findByEmail: vi.fn().mockResolvedValue(null),
    create: vi.fn(async data => ({ id: 42, ...data })),
  };
  mailer = { send: vi.fn().mockResolvedValue({ messageId: "m1" }) };
  logger = { error: vi.fn() };
});

describe("registerUser", () => {
  test("بيبعت إيميل ترحيب مرة واحدة بالبيانات الصح", async () => {
    const res = await registerUser({ email: "  Mona@Example.com ", name: "Mona" }, { users, mailer, logger });
    expect(res).toEqual({ user: { id: 42, email: "mona@example.com", name: "Mona" }, emailSent: true });
    expect(mailer.send).toHaveBeenCalledTimes(1);
    expect(mailer.send).toHaveBeenCalledWith({ to: "mona@example.com", template: "welcome", data: { name: "Mona", userId: 42 } });
    // الإيميل اتبعت بعد ما اليوزر اتعمل، مش قبله
    expect(users.create.mock.invocationCallOrder[0]).toBeLessThan(mailer.send.mock.invocationCallOrder[0]);
  });

  test("إيميل متسجّل قبل كده: مفيش create ومفيش إيميل", async () => {
    users.findByEmail.mockResolvedValue({ id: 1 });
    await expect(registerUser({ email: "a@b.com", name: "A" }, { users, mailer, logger })).rejects.toBeInstanceOf(ConflictError);
    expect(users.create).not.toHaveBeenCalled();
    expect(mailer.send).not.toHaveBeenCalled();
  });

  test("خدمة الإيميل وقعت: اليوزر اتعمل والخطأ اتسجّل", async () => {
    mailer.send.mockRejectedValueOnce(new Error("SMTP timeout"));
    const res = await registerUser({ email: "a@b.com", name: "A" }, { users, mailer, logger });
    expect(res.emailSent).toBe(false);
    expect(users.create).toHaveBeenCalledOnce();
    expect(logger.error).toHaveBeenCalledWith("welcome email failed", expect.objectContaining({ userId: 42, err: "SMTP timeout" }));
  });
});`
    }
  },
  {
    t: "Prisma: صفحة كتّاب من غير N+1",
    d: R`صفحة بتعرض كل كاتب، وعدد مقالاته المنشورة، وآخر 3 مقالات منشورة. الكود الحالي بيجيب الكتّاب وبعدين يعمل استعلامين لكل كاتب، يعني مع 50 كاتب 101 استعلام.

اكتبه بـ Prisma 7 بعدد استعلامات ثابت مهما زاد الكتّاب وبنفس الناتج بالظبط، وعدّ الاستعلامات بـ query events عشان تثبت. الـ schema والكود الحالي تحت، و [[db.ts]] زي درس إعداد Prisma 7 بس بـ [[log: [{ emit: "event", level: "query" }]]]. المراجعة في «تاب SQL و Prisma» (دروس إعداد Prisma 7 و N+1). الوقت: 45 لـ 90 دقيقة.`,
    c: R`model Author {
  id    Int    @id @default(autoincrement())
  name  String
  posts Post[]
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  published Boolean  @default(false)
  createdAt DateTime @default(now())
  authorId  Int
  author    Author   @relation(fields: [authorId], references: [id])

  @@index([authorId, createdAt])
}

// الكود الحالي (N+1)
const authors = await prisma.author.findMany({ orderBy: { id: "asc" } });
const rows = await Promise.all(authors.map(async a => ({
  name: a.name,
  publishedCount: await prisma.post.count({ where: { authorId: a.id, published: true } }),
  latest: await prisma.post.findMany({ where: { authorId: a.id, published: true }, orderBy: { createdAt: "desc" }, take: 3, select: { title: true } }),
})));`,
    e: R`[[_count]] بـ [[where]] جوه [[select]] بيتحسب في SQL بـ LEFT JOIN على subquery فيها COUNT و GROUP BY، و [[posts]] بـ [[where]] و [[orderBy]] و [[take: 3]] بيجيب آخر 3 لكل كاتب. في الـ log هتلاقي استعلامين بس: واحد للكتّاب ومعاه العدد، وواحد للمقالات بـ [[IN]] على كل الـ ids.

على 50 كاتب و 500 مقالة (Postgres محلي): N+1 عمل 101 استعلام في حوالي 200ms، والنسخة الجديدة استعلامين في حوالي 10ms، و [[same result: true]]. ومع قاعدة على سيرفر بعيد الفرق أكبر بكتير، لأن كل استعلام round trip.

فخ لازم تعرفه: [[take: 3]] جوه العلاقة مش بيتحول لـ LIMIT. الاستعلام التاني بيجيب كل المقالات المنشورة للكتّاب دول، و Prisma بيقطع 3 في الذاكرة. لو كل كاتب عنده آلاف المقالات اكتب SQL خام بـ ROW_NUMBER أو LATERAL (دروس في «تاب SQL و Prisma»). و [[Promise.all]] مع map مش بيحل N+1: بيبعت الـ 100 استعلام مع بعض بس، وممكن يخلّص الـ connection pool. اتجرّب على Prisma 7.10 مع [[@prisma/adapter-pg]] و [[npx tsx src/n1.ts]].`,
    s: {
      data: R`// src/n1.ts  (npx tsx src/n1.ts)
import { prisma } from "./db.ts";

let queries = 0;
prisma.$on("query", () => { queries++; });

async function measure(label: string, fn: () => Promise<unknown>) {
  queries = 0;
  const t = performance.now();
  const rows = (await fn()) as unknown[];
  console.log(label.padEnd(14), "queries:", String(queries).padStart(3), "rows:", rows.length, $__bt$__{(performance.now() - t).toFixed(0)}ms$__bt);
  return rows;
}

// ❌ N+1: استعلام للكتّاب، وبعدين استعلام لكل كاتب
const slow = await measure("N+1", async () => {
  const authors = await prisma.author.findMany({ orderBy: { id: "asc" } });
  return Promise.all(authors.map(async a => ({
    name: a.name,
    publishedCount: await prisma.post.count({ where: { authorId: a.id, published: true } }),
    latest: await prisma.post.findMany({ where: { authorId: a.id, published: true }, orderBy: { createdAt: "desc" }, take: 3, select: { title: true } }),
  })));
});

// ✅ استعلام واحد من ناحية الكود: _count و include بفلتر و take جوه العلاقة
const fast = await measure("include", async () => {
  const authors = await prisma.author.findMany({
    orderBy: { id: "asc" },
    select: {
      name: true,
      _count: { select: { posts: { where: { published: true } } } },
      posts: { where: { published: true }, orderBy: { createdAt: "desc" }, take: 3, select: { title: true } },
    },
  });
  return authors.map(a => ({ name: a.name, publishedCount: a._count.posts, latest: a.posts }));
});

console.log("same result:", JSON.stringify(slow) === JSON.stringify(fast));
console.log(JSON.stringify(fast[0]));
await prisma.$disconnect();

// الناتج عندنا:
// N+1            queries: 101 rows: 50 217ms
// include        queries:   2 rows: 50 11ms
// same result: true`
    }
  },
  {
    t: "صلّح accessibility بتاع modal تسجيل الدخول",
    d: R`الـ modal اللي تحت شكله كويس بالماوس، بس بالكيبورد Tab بيقف على الحقلين بس، وقارئ الشاشة بيقول «img» ونص من غير أي أدوار. صلّحه: كل حاجة بتتضغط توصلها بـ Tab وتشتغل بـ Enter، وكل حقل ليه label، والـ modal ليه اسم، ورسالة الخطأ تتقري لوحدها ومربوطة بالحقل ومش معتمدة على اللون بس.

المراجعة في «تاب HTML و CSS» (درس aria). الوقت: 30 لـ 45 دقيقة.`,
    c: R`<div class="modal">
  <div class="close" onclick="closeModal()">✕</div>
  <img src="logo.png">
  <div class="title">سجّل دخول</div>
  <input type="email" placeholder="الإيميل">
  <input type="password" placeholder="الباسورد">
  <span style="color:red">الباسورد غلط</span>
  <div class="btn" onclick="login()">دخول</div>
  <a onclick="forgot()">نسيت الباسورد؟</a>
</div>`,
    e: R`القاعدة الأولى: استخدم العنصر الصح قبل ما تفكر في aria. [[div onclick]] مبيتعملوش focus ولا بيشتغل بـ Enter، فبقى [[button]]. و [[a]] من غير href مش لينك، فبقى ليه href. والحقول بقت جوه [[form]] فـ Enter في الباسورد بيبعت. و placeholder مش label لأنه بيختفي أول ما تكتب. واللوجو زينة فبقى [[alt=""]] عشان قارئ الشاشة يتجاهله (لو اللوجو لينك للرئيسية يبقى alt اسم الموقع).

[[aria-describedby]] بيربط رسالة الخطأ بالحقل فتتقري لما تقف عليه، و [[role="alert"]] بيخليها تتقري أول ما تظهر، والعلامة مع النص بدل اللون الأحمر لوحده. وزرار ✕ بقى ليه [[aria-label]]، لأن من غيره قارئ الشاشة ممكن يقول اسم الرمز أو ميقولش حاجة.

اتفحص: axe-core على النسخة القديمة لقى [[image-alt]] بس، مع إن فيها مشاكل كيبورد واضحة، يعني الأدوات الأوتوماتيك بتمسك جزء بس. وبالكيبورد في Chromium، القديمة Tab وقف على الحقلين بس، والجديدة وقف على ✕ والحقلين ودخول واللينك، وشجرة الـ accessibility بقت dialog اسمه «سجّل دخول» فيه button و heading و textbox [invalid] و alert. والـ modal الحقيقي محتاج كمان focus trap ويرجّع الـ focus للزرار اللي فتحه، وأسهل طريقة [[<dialog>]] مع [[showModal()]].`,
    s: {
      css: R`<div class="modal" role="dialog" aria-modal="true" aria-labelledby="login-title">
  <button type="button" class="close" aria-label="إغلاق" onclick="closeModal()">✕</button>
  <img src="logo.png" alt="">
  <h2 id="login-title">سجّل دخول</h2>
  <form onsubmit="login(event)">
    <label for="email">الإيميل</label>
    <input id="email" name="email" type="email" autocomplete="email" required>
    <label for="password">الباسورد</label>
    <input id="password" name="password" type="password" autocomplete="current-password" required
           aria-invalid="true" aria-describedby="password-error">
    <p id="password-error" class="error" role="alert">⚠ الباسورد غلط</p>
    <button type="submit">دخول</button>
  </form>
  <a href="/forgot-password">نسيت الباسورد؟</a>
</div>`
    }
  }
]);
