// كل درس هنا في مكان واحد:
//   cmd      اسم الأمر (ولازم يبقى فريد جوه التاب، لأن التقدم محفوظ بيه)
//   title    العنوان القصير، ودا اللي بيظهر كسؤال في «اختبرني»
//   desc     الشرح. الفقرات مفصولة بسطر فاضي، و [[كلام]] بيتعرض كـ code
//   example  المثال. كل سطر أمر، والسطور اللي بتبدأ بـ # تعليق
//   try      التجربة اللي تعملها بإيدك
//   flag     اختياري: "danger" أو "script" (من غير prompt) أو "keys" أو "term" أو "console"
//   mac      اختياري (bash بس): ["both"|"diff"|"linux", ملاحظة الماك]
//   deep     اختياري: why / how / when / mistakes
//   lines    اختياري: شرح لكل سطر في المثال بالترتيب، من غير السطور الفاضية والتعليقات
//   sol      اختياري: حل التجربة والناتج المتوقع (بيظهر مقفول تحت «جرّب»)
//   solCode  اختياري: كود الحل، بيتعرض كـ مثال تحت الـ sol
//   check    اختياري: تمرين بيتصحح لوحده في الصفحة
//            JS:  { lang: "js", starter, tests: R`test("..", () => expect(x).toBe(y))`, solution }
//            SQL: { lang: "sql", setup: R`CREATE TABLE ...; INSERT ...`, starter, expect: [[...صفوف]] أو expectSql: R`استعلام مرجعي`, solution, ordered }
//            solution حل مرجعي مش بيظهر، و npm run check بيتأكد إنه بيعدّي الاختبارات. المتاح في tests: test و expect(x).toBe/toEqual/toThrow/toBeTruthy/toBeFalsy
// ولو محتاج تكتب ${ جوه R`...` اكتبها $__{ والصفحة بترجّعها.

TAB("sshc", {
  label: "ssh config",
  prompt: "$ ",
  lab: R`touch ~/.ssh/config && chmod 600 ~/.ssh/config
ssh -G prod | head`,
  labText: R`الملف في ~/.ssh/config على جهازك (وعلى ويندوز في C:\Users\اسمك\.ssh\config). بعد أي تعديل: ssh -G اسم يوريك الإعدادات النهائية.`,
  levels: {
    "1": ["الأساسيات", "اسم واحد لكل سيرفر، وأنماط، و jump hosts، ومفاتيح متعددة، و tunnels في الملف"]
  },
  categories: [
    {
      t: "~/.ssh/config",
      l: 1,
      n: "بدل ما تكتب اليوزر والـ IP والبورت والمفتاح كل مرة، تكتب اسم",
      items: [
        {
          cmd: "الملف الأساسي",
          title: "ssh prod بدل ssh -p 2222 -i key deploy@203.0.113.10",
          desc: "ملف نصي في [[~/.ssh/config]]. كل [[Host]] اسم مختصر بتختاره، وتحته الإعدادات. بعدها [[ssh prod]] بيقرا الباقي من الملف. وكل أدوات SSH (scp، rsync، git، VS Code) بتفهمه.",
          example: R`Host prod
    HostName 203.0.113.10
    User deploy
    Port 2222
    IdentityFile ~/.ssh/prod_ed25519

Host staging
    HostName staging.example.com
    User deploy
    IdentityFile ~/.ssh/staging_ed25519`,
          try: "اكتب الملف، و [[chmod 600 ~/.ssh/config]]، وجرّب [[ssh prod]] و [[scp file prod:/tmp/]].",
          flag: "script",
          deep: {
            why: "٤ سيرفرات، كل واحد يوزر وبورت ومفتاح. بعد أسبوع مش هتفتكر. والأمر الطويل بيتكتب غلط. الملف بيخلي كل سيرفر كلمة.",
            how: R`ssh بيقرا [[~/.ssh/config]] قبل ما يتصل. لما تكتب [[ssh prod]]، بيدوّر على [[Host prod]] ويطبّق اللي تحته: [[HostName]] العنوان الحقيقي (IP أو دومين)، [[User]] اليوزر، [[Port]] لو مش 22، [[IdentityFile]] المفتاح.

الاسم بعد Host أي حاجة تختارها، مش لازم يبقى دومين. والمسافات البادئة للتنظيم بس.

خلّي صلاحيته 600، و ssh بيرفضه لو حد غيرك يقدر يكتب فيه (664 أو 666)، وفولدر .ssh 700.

ومن اللحظة دي [[scp file prod:/tmp/]] و [[rsync ... prod:/path]] و [[git clone prod:/repo]] كلهم بيفهموا prod.

على ويندوز نفس الملف في [[C:\Users\اسمك\.ssh\config]] مع OpenSSH المبني، و VS Code بيقراه.

[[ssh -v prod]] بيوريك أنهي إعدادات اتطبقت من الملف.`,
            when: "من أول سيرفر. وكل سيرفر جديد سطرين في الملف.",
            mistakes: "صلاحيات الملف 664 أو 666 (جروب أو حد تاني يقدر يكتب) فـ ssh يقول Bad owner or permissions. و HostName بالـ IP القديم بعد نقل السيرفر."
          },
          lines: [
            "اسم مختصر بتختاره.",
            "العنوان الحقيقي.",
            "اليوزر.",
            "البورت (لو مش 22).",
            "المفتاح.",
            "سيرفر تاني.",
            "بدومين.",
            "يوزر.",
            "مفتاح مختلف."
          ],
          sol: R`[[ssh prod]] يدخلك على طول من غير ما تكتب IP ولا بورت ولا مفتاح، وأول مرة بس هيسألك عن بصمة السيرفر. [[scp file prod:/tmp/]] هيرفع الملف ويطبع سطر تقدّم فيه اسمه و 100%، وتقدر تتأكد بـ [[ssh prod 'ls -l /tmp/file']]. جربنا ده على sshd محلي على بورت 2222 بنفس الشكل واشتغل من غير أي flag.

لو ssh قال [[Bad owner or permissions on ~/.ssh/config]] يبقى الـ chmod متعملش أو الملف مملوك ليوزر تاني. ولو قال [[Could not resolve hostname prod]] يبقى ssh مش شايف الملف: اتأكد إن اسمه [[config]] بالظبط من غير امتداد (Notepad على ويندوز بيضيف [[.txt]] لوحده) وإنه في [[~/.ssh/]]. ولو [[Permission denied (publickey)]] شوف مسار [[IdentityFile]] وإن المفتاح العام متحط في [[authorized_keys]] على السيرفر.`
        },
        {
          cmd: "Host * والأنماط",
          title: "إعدادات لكل السيرفرات",
          desc: "[[Host *]] بيطبّق على الكل، و [[Host *.example.com]] على مجموعة. الإعداد الأول اللي يطابق بيكسب، فالعام في آخر الملف. هنا بتحط الحاجات اللي عايزها دايمًا: keepalive، والمفتاح الافتراضي، والـ agent.",
          example: R`Host web1 web2 web3
    HostName %h.example.com
    User deploy

Host *.internal
    User admin
    ProxyJump bastion

Host *
    ServerAliveInterval 30
    ServerAliveCountMax 3
    AddKeysToAgent yes
    IdentitiesOnly yes`,
          try: "[[ssh -G prod]] بيطبع الإعدادات النهائية لـ host بعد دمج كل الأنماط. اتأكد إن اللي عايزه اتطبق.",
          flag: "script",
          deep: {
            why: "١٠ سيرفرات بنفس اليوزر ونفس المفتاح: مش هتكرر ١٠ مرات. والإعدادات اللي عايزها على كل اتصال (keepalive) مكانها الطبيعي مرة واحدة.",
            how: R`[[Host]] بياخد أكتر من اسم في سطر ([[web1 web2 web3]])، و [[%h]] في HostName بيتبدّل بالاسم اللي كتبته، فـ [[ssh web2]] بيروح [[web2.example.com]].

الأنماط: [[*]] أي حاجة، [[?]] حرف واحد، [[!]] استثناء ([[Host * !bastion]]).

الترتيب: ssh بيقرا الملف من فوق لتحت، ولكل إعداد أول قيمة يلاقيها بتثبت. فلو [[Host *]] في الأول وفيه User، مش هتقدر تغيّره في host بعده. عشان كده العام دايمًا في آخر الملف.

[[ServerAliveInterval 30]]: نبضة كل ٣٠ ثانية. [[ServerAliveCountMax 3]]: بعد ٣ نبضات من غير رد يعتبر الاتصال مات (بدل ما يعلّق للأبد).

[[AddKeysToAgent yes]]: أول مرة تستخدم مفتاح بـ passphrase، بيتضاف للـ agent لوحده.

[[IdentitiesOnly yes]]: استخدم المفتاح المحدد بس، متجرّبش كل اللي في الـ agent (بعض السيرفرات بتحظرك بعد ٥ محاولات بمفاتيح غلط).

[[ssh -G host]] بيطبع الإعدادات النهائية بعد الدمج: أفضل طريقة تتأكد.`,
            when: "Host * من أول يوم بالـ keepalive. والأنماط لما السيرفرات بتزيد.",
            mistakes: "Host * في أول الملف فيغطي على الباقي. وتنسى إن IdentitiesOnly محتاجة IdentityFile في كل host."
          },
          lines: [
            "تلات أسامي في سطر.",
            "%h بيتبدّل بالاسم اللي كتبته.",
            "نفس اليوزر للتلاتة.",
            "أي حاجة بتنتهي بـ .internal.",
            "يوزر.",
            "عبر bastion.",
            "لكل السيرفرات (في الآخر عشان ميغطيش على اللي فوق).",
            "نبضة كل ٣٠ ثانية.",
            "بعد ٣ من غير رد اعتبره وقع.",
            "ضيف المفتاح للـ agent أول استخدام.",
            "استخدم المفتاح المحدد بس."
          ],
          sol: R`[[ssh -G prod]] بيطبع حوالي ٨٠ سطر، كل إعداد بقيمته النهائية وبحروف صغيرة. دوّر بـ [[ssh -G prod | grep -E '^(hostname|user|port|identityfile|serveraliveinterval|identitiesonly) ']] وهتلاقي حاجة زي: [[user deploy]] و [[hostname 203.0.113.10]] و [[port 2222]] من بلوك prod، و [[serveraliveinterval 30]] و [[identitiesonly yes]] من [[Host *]]. ولو جربت [[ssh -G web2]] هتلاقي [[hostname web2.example.com]] لأن [[%h]] اتبدلت باسم الـ host، و [[ssh -G db.internal]] يطلع [[user admin]] و [[proxyjump bastion]].

القاعدة اللي بتفسر أي نتيجة غريبة: لكل إعداد، أول قيمة ssh يقابلها من فوق لتحت هي اللي بتكسب. عشان كده [[Host *]] لازم في الآخر. لو حطيته فوق وفيه [[User root]]، هتلاقي [[ssh -G prod]] بيقول [[user root]] مع إن بلوك prod فيه deploy. و [[-G]] مبيتصلش بالسيرفر خالص، فتقدر تجربه على أسامي وهمية.`
        },
        {
          cmd: "ProxyJump",
          title: "سيرفر ورا سيرفر",
          desc: "قاعدة البيانات أو السيرفرات الداخلية مش على النت، بتوصلها من سيرفر واحد مكشوف (bastion). [[ProxyJump]] بيخلي ssh يدخل الأول ومنه للتاني في أمر واحد، والاتصال متشفّر من طرف لطرف.",
          example: R`Host bastion
    HostName 203.0.113.5
    User deploy

Host db-internal
    HostName 10.0.0.12
    User deploy
    ProxyJump bastion

# equivalent one-off:
ssh -J deploy@203.0.113.5 deploy@10.0.0.12`,
          try: "[[ssh db-internal]] و [[scp backup.dump db-internal:/tmp/]] بيشتغلوا عبر bastion لوحدهم.",
          flag: "script",
          deep: {
            why: "الأصح أمنيًا إن قاعدة البيانات والسيرفرات الداخلية مش عليها IP عام. بتدخل من سيرفر واحد محمي (bastion أو jump host). من غير ProxyJump ده اتنين ssh ورا بعض ومفيش scp مباشر.",
            how: R`[[ProxyJump bastion]]: ssh بيتصل بـ bastion الأول، ومن خلاله بيفتح اتصال TCP للسيرفر الداخلي، وبيعمل مصافحة SSH كاملة مع الداخلي عبر الممر ده. النتيجة: التشفير بينك وبين الداخلي مباشرة، و bastion بيمرر بايتات مش شايفها. مفتاحك مش لازم يبقى على bastion.

الـ bastion نفسه Host في الملف، وممكن يبقى له ProxyJump كمان (سلسلة).

[[-J]] نفس الحاجة من سطر الأوامر لمرة واحدة، وممكن كذا واحد بفواصل.

بعد كده كل أدوات ssh بتشتغل مع db-internal مباشرة: scp و rsync و LocalForward (tunnel للقاعدة الداخلية عبر bastion في أمر واحد).

الطريقة القديمة كانت [[ProxyCommand ssh bastion -W %h:%p]]، ProxyJump أبسط ونفس النتيجة.

على bastion: اليوزر يفضل من غير shell كامل لو هيبقى للمرور بس.`,
            when: "أي بنية فيها سيرفرات داخلية. و VPCs على الكلاود.",
            mistakes: "تنسخ مفتاحك الخاص على bastion «عشان يعدّي». ProxyJump مش محتاجه. وتنسى HostName للداخلي بالـ IP الخاص مش العام."
          },
          lines: [
            "السيرفر المكشوف.",
            "عنوانه العام.",
            "يوزر.",
            "الداخلي.",
            "IP خاص مش على النت.",
            "يوزر.",
            "ادخله عبر bastion.",
            "نفس الحاجة لمرة واحدة بـ -J."
          ],
          sol: R`الاتنين هيشتغلوا كأن db-internal قدامك، وهتلاحظ إنهم أبطأ شوية (اتصالين مش واحد). عشان تتأكد إنه عدّى عبر bastion فعلًا شغّل [[ssh -v db-internal true 2>&1 | grep -i proxy]]، هيطلع [[Setting implicit ProxyCommand from ProxyJump: ssh -W '[%h]:%p' bastion]] وبعدين [[Authenticated to 10.0.0.12 (via proxy)]]. جربناها بسيرفر محلي والسطرين دول طلعوا بالظبط.

المفتاح بيتقري من جهازك في المرحلتين، مش من bastion، فمش محتاج تحط مفتاحك الخاص على bastion. ولو ظهر [[channel 0: open failed: administratively prohibited]] يبقى bastion قافل [[AllowTcpForwarding]] في sshd_config بتاعه. ولو الاتصال بـ bastion نفسه نجح بس بعده timeout، يبقى [[10.0.0.12]] مش متشاف من bastion (IP غلط أو firewall داخلي).`
        },
        {
          cmd: "مفاتيح متعددة",
          title: "GitHub شخصي وشغل بنفس الجهاز",
          desc: "حسابين GitHub بمفتاحين. GitHub بيعرفك من المفتاح، فلازم تقوله أنهي مفتاح لأنهي حساب. الحيلة: Host وهمي لكل حساب، وتستخدمه في remote URL. و [[IdentitiesOnly]] يمنع ssh يجرّب كل مفاتيحك.",
          example: R`Host github.com
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519
    IdentitiesOnly yes

Host github-work
    HostName github.com
    User git
    IdentityFile ~/.ssh/work_ed25519
    IdentitiesOnly yes

# in the work repo:
git remote set-url origin git@github-work:company/repo.git`,
          try: "[[ssh -T github-work]] المفروض يرد باسم حساب الشغل، و [[ssh -T github.com]] بالشخصي.",
          flag: "script",
          deep: {
            why: "GitHub بيقبل المفتاح الواحد في حساب واحد بس. شغل وشخصي = مفتاحين. ومن غير config، ssh بيبعت أول مفتاح يلاقيه، فتعمل push بالحساب الغلط أو يترفض.",
            how: R`الفكرة: اسمين مختلفين لنفس السيرفر. [[Host github.com]] الشخصي بمفتاحه، و [[Host github-work]] (اسم وهمي) بـ [[HostName github.com]] ومفتاح الشغل.

الـ remote URL في مشاريع الشغل: [[git@github-work:company/repo.git]] بدل [[git@github.com:...]]. Git بيمرر github-work لـ ssh، و ssh بيلاقيه في الملف ويستخدم مفتاح الشغل ويتصل بـ github.com.

[[IdentitiesOnly yes]] هنا أساسية: من غيرها ssh بيجرّب كل المفاتيح في الـ agent بالترتيب، وأول واحد GitHub يقبله بيحدد الحساب، وممكن يبقى الشخصي.

[[User git]] لأن GitHub كل الاتصالات بيوزر git.

[[ssh -T]] بيختبر: GitHub بيرد «Hi username!» فتعرف أنهي حساب.

بديل لكل الـ repos في فولدر معين: في [[~/.gitconfig]] قسم [[[includeIf "gitdir:~/work/"]]] بيحمّل config تاني فيه [[core.sshCommand = ssh -i ~/.ssh/work_ed25519]]، فمش محتاج تغيّر remote URLs.

ونفس الحيلة لسيرفرين بنفس الدومين بيوزرز مختلفين.`,
            when: "أول ما يبقى عندك حسابين GitHub أو GitLab.",
            mistakes: "clone بـ git@github.com في مشروع شغل فيروح بالمفتاح الشخصي. و commits باسم وإيميل الحساب الغلط (ده Git config مش SSH)."
          },
          lines: [
            "الشخصي (نفس اسم الدومين).",
            "العنوان.",
            "GitHub كله بيوزر git.",
            "المفتاح الشخصي.",
            "ده بس، متجرّبش غيره.",
            "اسم وهمي للشغل.",
            "نفس العنوان.",
            "git.",
            "مفتاح الشغل.",
            "ده بس.",
            "في مشروع الشغل: الـ remote بالاسم الوهمي."
          ],
          sol: R`الاتنين هيرجعوا exit code 1 ورسالة زي [[Hi work-user! You've successfully authenticated, but GitHub does not provide shell access.]]، والفرق في الاسم بعد Hi: [[ssh -T github-work]] باسم حساب الشغل، و [[ssh -T github.com]] باسمك الشخصي. الـ exit code 1 طبيعي هنا لأن GitHub مبيدكش shell.

لو الاتنين ردوا بنفس الاسم، غالبًا [[IdentitiesOnly yes]] ناقص، فـ ssh بيجرب المفاتيح اللي في الـ agent الأول، وGitHub بيقبل أول مفتاح يعرفه. ولو [[Permission denied (publickey)]] يبقى المفتاح العام بتاع الشغل مش متضاف في حساب الشغل. وتقدر تتأكد إن الاسم بيتحول صح من غير نت: [[ssh -G github-work | grep -E '^(hostname|identityfile) ']] يطلع [[hostname github.com]] والمفتاح بتاع الشغل.`
        },
        {
          cmd: "keepalive و multiplexing",
          title: "اتصال مش بيقع، وثاني ssh لحظي",
          desc: "[[ServerAliveInterval]] بيبعت نبضة كل ٣٠ ثانية فالراوتر ميقفلش الاتصال الصامت. و [[ControlMaster]] بيعيد استخدام اتصال مفتوح: أول ssh بياخد ثانية، والتاني والـ scp اللي بعده لحظي من غير مصافحة جديدة.",
          example: R`Host *
    ServerAliveInterval 30
    ServerAliveCountMax 3
    ControlMaster auto
    ControlPath ~/.ssh/cm-%r@%h:%p
    ControlPersist 10m

# check / close the shared connection:
ssh -O check prod
ssh -O exit prod`,
          try: "افتح [[ssh prod]] في نافذة، وفي نافذة تانية [[time ssh prod true]]: أقل من ٠.١ ثانية.",
          flag: "script",
          deep: {
            why: "اتصال ssh صامت لدقايق بيتقفل من الراوتر أو الفايروول، وترجع تلاقي الترمنال متجمّد. و deploy بيعمل ٥ أوامر ssh ورا بعض كل واحد بمصافحة كاملة.",
            how: R`[[ServerAliveInterval]]: ssh بيبعت رسالة صغيرة للسيرفر كل ٣٠ ثانية عبر الاتصال المشفّر، فالراوتر شايف نشاط ومش بيقفله. و [[CountMax 3]]: لو ٣ رسايل من غير رد، ssh بيقفل ويقولك بدل ما يعلّق.

الـ multiplexing: [[ControlMaster auto]] أول اتصال لـ host بيبقى «الأساسي» وبيعمل socket في [[ControlPath]]. أي ssh أو scp تاني لنفس الـ host بيلاقي الـ socket ويعدّي من الاتصال المفتوح: مفيش مصافحة ولا مصادقة تانية، فبيفتح في أجزاء من الثانية. [[%r@%h:%p]] في المسار عشان socket لكل يوزر وسيرفر وبورت.

[[ControlPersist 10m]]: الاتصال الأساسي يفضل مفتوح ١٠ دقايق بعد ما تقفل آخر جلسة، فـ ssh بعدها لحظي.

[[-O check]] هل فيه اتصال مشترك، و [[-O exit]] يقفله (مفيد لو السيرفر عمل ريستارت والـ socket بقى قديم).

مع الـ multiplexing، سكربت deploy بـ ١٠ أوامر ssh بيبقى بنفس سرعة أمر واحد.

على ويندوز ControlMaster مش مدعوم في OpenSSH المبني، الباقي شغال.`,
            when: "Host * في كل جهاز. الـ multiplexing لما تعمل أوامر متكررة على نفس السيرفر.",
            mistakes: "ControlPath في مكان مش موجود أو طويل (Unix sockets ليها حد في الطول). و socket قديم بعد ريستارت السيرفر: -O exit."
          },
          lines: [
            "لكل السيرفرات.",
            "نبضة كل ٣٠ ثانية.",
            "٣ من غير رد = وقع.",
            "أول اتصال يبقى مشترك.",
            "ملف الـ socket: يوزر وسيرفر وبورت.",
            "يفضل مفتوح ١٠ دقايق بعد آخر جلسة.",
            "فيه اتصال مشترك؟",
            "اقفله."
          ],
          sol: R`أول [[ssh prod]] بيعمل الاتصال الحقيقي وبيعمل socket في [[~/.ssh/]] باسم زي [[cm-deploy@203.0.113.10:22]]. التاني [[time ssh prod true]] هيطلع [[real 0m0.0xx]]: جربناها على سيرفر محلي والأول أخد ٠.٢ ثانية والتاني ٠.٠٠٩. وعلى سيرفر بعيد الفرق أوضح بكتير لأن مفيش handshake ولا مصادقة من جديد. [[ssh -O check prod]] يطبع [[Master running (pid=...)]]، و [[ssh -O exit prod]] يطبع [[Exit request sent.]].

لو التاني لسه بطيء، [[ssh -O check prod]] هيقولك [[Control socket connect(...): No such file or directory]]، يعني الإعدادات مش متطبقة على الـ host ده (اتأكد بـ [[ssh -G prod | grep control]]). وعلى ويندوز بـ OpenSSH بتاع مايكروسوفت، ControlMaster مبيشتغلش أصلًا، اعمل التجربة من WSL.`
        },
        {
          cmd: "LocalForward",
          title: "الـ tunnel في الملف",
          desc: "الـ SSH tunnel لقاعدة البيانات (bash المستوى ٣) بتكتبه مرة في config. [[ssh -N prod-db]] يفتح الممر، أو مع أي ssh عادي للـ host ده. و [[RemoteForward]] العكس: بورت على السيرفر يوصل لجهازك (webhook على جهازك من غير ngrok).",
          example: R`Host prod-db
    HostName 203.0.113.10
    User deploy
    LocalForward 5433 127.0.0.1:5432
    LocalForward 6380 127.0.0.1:6379

Host prod-expose
    HostName 203.0.113.10
    User deploy
    RemoteForward 9000 127.0.0.1:3000`,
          try: "[[ssh -N -f prod-db]] وبعدين DBeaver على localhost:5433. و [[ssh -O exit prod-db]] يقفله.",
          flag: "script",
          deep: {
            why: "الـ tunnel لقاعدة البيانات أمر طويل بتكتبه كل يوم. في config بيبقى [[ssh -N prod-db]]. وفيه اتجاه معاكس ناس كتير مش عارفاه.",
            how: R`[[LocalForward 5433 127.0.0.1:5432]]: نفس [[-L]] بالظبط: بورت 5433 على جهازك يروح لـ 127.0.0.1:5432 من ناحية السيرفر. كذا سطر لكذا خدمة (Postgres و Redis). كل ما تعمل ssh للـ host ده الممرات بتتفتح، و [[-N]] لو مش عايز ترمنال، و [[-f]] للخلفية.

[[RemoteForward 9000 127.0.0.1:3000]]: العكس. بورت 9000 على السيرفر يروح لـ localhost:3000 على جهازك. يعني حاجة على السيرفر (أو Nginx عليه) تقدر توصل لتطبيقك المحلي. مع server block في Nginx بيعمل proxy لـ 9000، يبقى عندك [[dev.example.com]] بيوصل لجهازك من غير ngrok، على دومينك وبشهادتك. للـ webhooks والعرض للعميل. (بيحتاج [[GatewayPorts]] لو عايز 9000 يسمع على كل الكروت، بس مع Nginx على نفس السيرفر مش لازم.)

[[DynamicForward 1080]] نوع تالت: SOCKS proxy، المتصفح كله بيعدّي من السيرفر (زي VPN بسيط).

الممر بيفضل طول ما ssh شغال. مع ControlPersist بيقفل بعد المدة.`,
            when: "LocalForward لكل قاعدة بيانات إنتاج. RemoteForward بديل ngrok لو عندك سيرفر.",
            mistakes: "بورت محلي مشغول فالممر يفشل بصمت (ssh بيطبع تحذير بس بيكمّل)، و [[ExitOnForwardFailure yes]] في الـ Host بيخليه يقف بدل كده. و RemoteForward على بورت مفتوح للنت من غير auth."
          },
          lines: [
            "host للـ tunnel.",
            "العنوان.",
            "يوزر.",
            "5433 عندك يروح لـ Postgres على السيرفر.",
            "و 6380 لـ Redis.",
            "host للعكس.",
            "العنوان.",
            "يوزر.",
            "9000 على السيرفر يروح لتطبيقك المحلي على 3000."
          ],
          sol: R`[[ssh -N -f prod-db]] هيرجعلك الـ prompt على طول من غير ما يدخلك، لأن [[-f]] بيحطه في الخلفية و [[-N]] يعني من غير أوامر. اتأكد إن البورت بقى مفتوح عندك: [[ss -ltn | grep 5433]] (أو [[lsof -i :5433]] على الماك) هيطلع [[127.0.0.1:5433 LISTEN]]. في DBeaver: Host [[localhost]] و Port [[5433]] واليوزر والباسورد بتوع Postgres اللي على السيرفر، مش بتوع SSH. جربناها محليًا و psql على 5433 وصل لـ Postgres وطلب الباسورد، يعني النفق شغال.

خد بالك: [[ssh -O exit prod-db]] بيشتغل بس لو [[ControlMaster]] و [[ControlPath]] متفعلين (زي [[Host *]] في الدرس اللي قبله)، غير كده هيقول [[No ControlPath specified]] وتقفله بـ [[pkill -f 'ssh -N -f prod-db']]. ولو قال [[bind [127.0.0.1]:5433: Address already in use]] يبقى نفق قديم لسه شغال أو Postgres محلي ماسك البورت.`
        },
        {
          cmd: "ssh-agent و forwarding",
          title: "المفتاح في الذاكرة مش على السيرفر",
          desc: "الـ agent بيحفظ المفتاح مفكوك في الذاكرة فمتكتبش passphrase كل مرة. و [[ForwardAgent]] بيخلي السيرفر يستخدم مفتاحك (لـ git pull من repo خاص) من غير ما تنسخ المفتاح عليه. بس على سيرفرات تثق فيها بس: الـ root هناك يقدر يستخدمه طول ما انت داخل.",
          example: R`eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
ssh-add -l
Host prod
    ForwardAgent yes
ssh prod 'ssh -T git@github.com'`,
          try: "على السيرفر بعد الدخول بـ ForwardAgent: [[git clone git@github.com:USER/private.git]] من غير أي مفتاح على السيرفر.",
          flag: "script",
          deep: {
            why: "مفتاح بـ passphrase آمن بس مزعج: كل ssh بيسألك. والسيرفر محتاج يعمل git pull من repo خاص: تحط مفتاحك عليه؟ لأ.",
            how: R`[[ssh-agent]] عملية بتفضل شغالة وبتحفظ المفاتيح مفكوكة في الذاكرة. [[eval "$(ssh-agent -s)"]] بيشغّله ويحط متغيرات البيئة اللي ssh بيلاقيه بيها (على أوبونتو ديسكتوب والماك شغال لوحده). [[ssh-add]] بيضيف مفتاح (بيسأل passphrase مرة). [[-l]] يعرض المضاف.

[[ForwardAgent yes]]: لما تدخل السيرفر، ssh بيعمل socket هناك بيوصّل لـ agent بتاعك على جهازك. أي ssh من السيرفر (زي git لـ GitHub) بيطلب التوقيع من agent جهازك عبر الاتصال. المفتاح نفسه عمره ما يسيب جهازك.

الخطر: طول ما انت داخل، أي حد root على السيرفر ده يقدر يستخدم الـ socket ويوقّع بمفتاحك (مش يقراه، بس يستخدمه). فـ ForwardAgent على سيرفراتك انت بس، ومش في [[Host *]].

البديل الأنضف للسيرفرات: deploy key خاص بالسيرفر ده على GitHub بصلاحية قراية لـ repo واحد (تاب Git).

الـ agent بيتقفل مع الجلسة. على الماك Keychain بيحفظ الـ passphrase (تاب zsh). على ويندوز خدمة ssh-agent لازم تتفعّل مرة: [[Set-Service ssh-agent -StartupType Automatic]].`,
            when: "agent دايمًا. forwarding لسيرفراتك عند الحاجة، مش افتراضيًا.",
            mistakes: "ForwardAgent yes في Host *، فأي سيرفر (حتى تجربة على استضافة مشتركة) يقدر يستخدم مفتاحك. وتنسى إن agent forwarding مش بيشتغل مع sudo على السيرفر من غير إعداد."
          },
          lines: [
            "شغّل الـ agent وجهّز متغيراته.",
            "ضيف مفتاحك (passphrase مرة).",
            "المفاتيح المضافة.",
            "في config لسيرفرك.",
            "مرر الـ agent للسيرفر ده.",
            "من السيرفر: كلّم GitHub بمفتاحك اللي على جهازك."
          ],
          sol: R`بعد [[ssh-add]]، [[ssh-add -l]] على جهازك يطبع سطر زي [[256 SHA256:... you@laptop (ED25519)]]. على السيرفر اللي دخلته بـ [[ForwardAgent yes]]، [[ssh-add -l]] هيطبع نفس السطر بالظبط، و [[echo $SSH_AUTH_SOCK]] يطبع مسار زي [[/tmp/ssh-XXXX/agent.1234]]. عشان كده [[git clone git@github.com:USER/private.git]] هناك هيشتغل من غير أي ملف مفتاح في [[~/.ssh]] على السيرفر.

لو [[ssh-add -l]] على السيرفر قال [[Could not open a connection to your authentication agent]] (جربناها من غير ForwardAgent وده اللي طلع)، يبقى الـ forwarding مش شغال: إما [[ForwardAgent]] مش على الـ Host ده، أو السيرفر قافل [[AllowAgentForwarding]]، أو الـ agent عندك فاضي ([[The agent has no identities]]). وفعّله بس للسيرفرات اللي تثق فيها، لأن root عليها يقدر يستخدم مفتاحك طول ما انت متصل.`
        },
        {
          cmd: "الأدوات بتقرا الملف",
          title: "scp و rsync و VS Code و Git",
          desc: "أي حاجة بتستخدم ssh من تحت بتفهم الأسامي: scp و rsync و git و Ansible و VS Code Remote-SSH (بيعرض الـ hosts من الملف في قايمة). اسم واحد في مكان واحد، وتغيير IP السيرفر سطر واحد.",
          example: R`scp -r dist/ prod:/var/www/site/
rsync -avz --delete dist/ prod:/var/www/site/
ssh prod 'docker compose -f /var/www/app/compose.yml logs --tail 50'
git clone prod:/srv/git/repo.git
code --remote ssh-remote+prod /var/www/app`,
          try: "في VS Code: Remote-SSH ثم Connect to Host: هتلاقي prod و staging جاهزين من الملف.",
          deep: {
            why: "الفايدة الحقيقية من config إن مش ssh بس اللي بيقراه. كل أداة بتستخدم ssh من تحت بتفهم الأسامي، فـ prod بقى اسم في كل مكان.",
            how: R`[[scp]] و [[rsync]]: [[prod:/path]] بدل [[deploy@203.0.113.10:/path]] مع كل الإعدادات (بورت، مفتاح، jump). rsync بيستخدم ssh افتراضيًا (لو عايز تحدد: [[-e ssh]]).

[[ssh prod 'أمر']]: ينفّذ أمر ويرجع. أساس السكربتات: deploy.sh بيعمل [[ssh prod 'cd /app && docker compose up -d']].

[[git clone prod:/srv/git/repo.git]]: repo على سيرفرك بدل GitHub، و [[git@github-work:...]] من عنصر المفاتيح.

VS Code: extension Remote-SSH بتقرا الملف وبتعرض الـ hosts في قايمة، وبتفتح فولدر على السيرفر كأنه محلي (نفس WSL extension بالظبط). [[code --remote ssh-remote+prod /path]] من الترمنال.

Ansible و Terraform و Docker context ([[docker context create prod --docker "host=ssh://prod"]] وبعدها [[docker ps]] بيوريك containers السيرفر) كلهم بيقروا الملف.

فلما IP السيرفر يتغير: سطر HostName واحد، وكل الأدوات والسكربتات شغالة.`,
            when: "من أول ما تكتب الملف. وكل سكربت جديد يستخدم الأسامي مش العناوين.",
            mistakes: "سكربتات فيها IPs وبورتات مكتوبة، فنقل السيرفر يكسرها كلها."
          },
          lines: [
            "scp بالاسم.",
            "rsync بالاسم (مع مسح اللي مش في المصدر).",
            "أمر على السيرفر ويرجع.",
            "clone من repo على سيرفرك.",
            "VS Code يفتح فولدر على السيرفر."
          ],
          sol: R`في VS Code: F1 ثم «Remote-SSH: Connect to Host...» هيظهر لستة فيها [[prod]] و [[staging]] بالأسامي اللي في [[Host]]، وأي بلوك فيه [[*]] زي [[Host *]] مش هيظهر. اختار prod هيفتح شباك جديد، أول مرة هيسألك نوع السيرفر (Linux) ويسطّب VS Code Server هناك، وبعدين في الركن الشمال تحت هتلاقي [[SSH: prod]].

لو اللستة فاضية، VS Code بيقرا ملف تاني: من «Remote-SSH: Open SSH Configuration File...» شوف أنهي مسار مختار (الإعداد [[remote.SSH.configFile]]). وعلى ويندوز، الملف لازم يبقى في [[C:\Users\you\.ssh\config]]، مش جوه WSL، لأن Remote-SSH شغال بـ ssh بتاع ويندوز.`
        },
        {
          cmd: "known_hosts",
          title: "بصمة السيرفر والتحذير الكبير",
          desc: "أول اتصال ssh بيسألك «متأكد؟» وبيحفظ بصمة السيرفر في [[~/.ssh/known_hosts]]. بعدها لو البصمة اتغيرت بيرفض بتحذير كبير (REMOTE HOST IDENTIFICATION HAS CHANGED): يا إما السيرفر اتعمل من جديد، يا إما حد في النص. [[StrictHostKeyChecking accept-new]] بيقبل الجديد لوحده بس بيرفض المتغيّر.",
          example: R`Host *
    StrictHostKeyChecking accept-new
    HashKnownHosts yes
    UpdateHostKeys yes

# fingerprint on the server itself vs what you see:
ssh-keygen -lf /etc/ssh/ssh_host_ed25519_key.pub
ssh-keyscan -t ed25519 203.0.113.10 | ssh-keygen -lf -
ssh-keygen -F 203.0.113.10
ssh-keygen -R 203.0.113.10`,
          try: "بعد ما تعيد تسطيب سيرفر، [[ssh-keygen -R IP]] وادخل تاني. ومتحطش أبدًا [[StrictHostKeyChecking no]] في Host *.",
          flag: "script",
          deep: {
            why: "البصمة هي الضمان الوحيد إنك بتكلّم سيرفرك مش حد عامل نفسه هو. التحذير الكبير اللي الناس بتتخطاه بـ StrictHostKeyChecking no هو بالظبط اللي بيحميك من هجوم في النص.",
            how: R`كل سيرفر ليه مفتاح host ثابت. أول اتصال ssh بيوريك بصمته (SHA256:...)، ولو قلت yes بيتحفظ في [[known_hosts]]. كل اتصال بعد كده بيقارن.

[[StrictHostKeyChecking]]: [[ask]] الافتراضي بيسأل في الأول. [[accept-new]] بيقبل أي سيرفر جديد من غير سؤال، بس لو بصمة سيرفر معروف اتغيرت بيرفض. ده الأنسب للسكربتات. [[no]] بيقبل أي حاجة، وده بيلغي الحماية.

[[HashKnownHosts yes]] بيخزّن أسامي السيرفرات متشفّرة، فلو الملف اتسرّب محدش يعرف انت بتدخل فين. و [[UpdateHostKeys yes]] بيحدّث المفاتيح لوحده لو السيرفر ضاف نوع جديد.

عشان تتأكد بجد: [[ssh-keygen -lf]] على ملف المفتاح العام جوه السيرفر (من console الاستضافة) بيدّي البصمة الحقيقية. قارنها باللي [[ssh-keyscan]] جابه من بره. [[-F]] بيدوّر على سيرفر في known_hosts، و [[-R]] بيمسح بصمته القديمة.

وفي CI (GitHub Actions) حط سطر known_hosts الجاهز في secret بدل ssh-keyscan وقت التشغيل.`,
            when: "accept-new في Host * من أول يوم. و -R بعد أي إعادة تسطيب لسيرفر.",
            mistakes: "[[StrictHostKeyChecking no]] و [[UserKnownHostsFile /dev/null]] «عشان التحذير يسكت». وتعمل -R وتدخل من غير ما تعرف ليه البصمة اتغيرت."
          },
          lines: [
            "لكل السيرفرات.",
            "اقبل السيرفر الجديد لوحده، وارفض لو بصمة معروف اتغيرت.",
            "خزّن الأسامي متشفّرة.",
            "حدّث مفاتيح السيرفر لوحده.",
            "البصمة الحقيقية من جوه السيرفر.",
            "البصمة اللي بتوصلك من بره: لازم تطابق اللي فوقها.",
            "السيرفر ده موجود في known_hosts؟",
            "امسح بصمته القديمة (بعد إعادة تسطيب)."
          ],
          sol: R`بعد إعادة التسطيب، أول [[ssh]] هيطلع تحذير كبير [[WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!]] ومعاه [[Offending ED25519 key in ~/.ssh/known_hosts:1]] والاتصال هيقف. [[ssh-keygen -R 203.0.113.10]] يطبع [[# Host 203.0.113.10 found: line 1]] و [[known_hosts updated.]] و [[Original contents retained as known_hosts.old]]. بعدها ssh هيتعامل معاه كسيرفر جديد: مع [[accept-new]] يضيفه لوحده ويطبع [[Warning: Permanently added ...]]، ومن غيرها هيسألك yes/no. جربنا ده كله على sshd محلي غيّرنا مفتاحه.

قبل ما تعمل [[-R]]، قارن البصمة: [[ssh-keygen -lf /etc/ssh/ssh_host_ed25519_key.pub]] على السيرفر (من الـ console بتاع شركة الاستضافة) لازم يطابق اللي في رسالة التحذير. ولاحظ إن [[accept-new]] بيقبل السيرفرات الجديدة بس، والمفتاح اللي اتغير لسه بيوقف الاتصال، وده الصح. [[StrictHostKeyChecking no]] هو اللي بيعدّي ده، وعشان كده ممنوع.`
        }
      ]
    }
  ]
});
