// تكملة تاب vps: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/vps/01.js (شرح حقول الدرس في أوله)
MORE("vps", [
  {
    t: "Ansible: كل السيرفرات بأمر واحد",
    l: 3,
    n: "بدل ما تدخل كل سيرفر وتكتب نفس الأوامر بإيدك: اكتبها مرة في ملف، وشغّلها على سيرفر أو عشرة، ومن غير ما تبوّظ اللي شغال",
    items: [
      {
        cmd: "ansible ping",
        title: "Ansible: inventory وأوامر سريعة على كل السيرفرات",
        desc: R`Ansible أداة بتشغّل أوامر وإعدادات على سيرفرات كتير مرة واحدة من جهازك، عن طريق SSH عادي ومن غير ما تسطّب أي حاجة على السيرفرات غير Python. ملف الـ inventory فيه السيرفرات متقسمة مجموعات، و [[ansible <مجموعة> -m <module>]] بيشغّل حاجة واحدة على المجموعة كلها (ده اسمه ad-hoc command).

Ansible نفسه بيشتغل على لينكس أو الماك أو WSL، مش على ويندوز مباشرة. والجهاز اللي بتشغّله منه اسمه control node، والسيرفرات اسمها managed nodes.`,
        example: R`python3 -m venv ~/.venvs/ansible
~/.venvs/ansible/bin/pip install ansible-core
export PATH="$HOME/.venvs/ansible/bin:$PATH"
cd ~/infra
ansible-inventory --graph
ansible web -m ping
ansible all -a "uptime"
ansible web -b -m ansible.builtin.apt -a "name=tree state=present update_cache=true"`,
        try: "اعمل فولدر infra فيه inventory.ini و ansible.cfg زي الشرح، وحط فيه سيرفر التجربة (أو كونتينرين أوبونتو فيهم openssh-server)، وشغّل ping، وبعدين سطّب باكدج صغيرة بـ apt module مرتين وقارن الناتج.",
        deep: {
          why: R`لما يبقى عندك سيرفرين أو تلاتة، كل تعديل (باكدج جديدة، يوزر جديد، سطر في إعداد Nginx) لازم يتعمل على كل واحد بإيدك، وبعد شهر هتلاقيهم مختلفين عن بعض ومحدش فاكر ليه. Ansible بيخلي الإعداد مكتوب في ملفات جوه Git: أي سيرفر جديد ياخد نفس الإعداد بأمر واحد، وتقدر تعرف مين غيّر إيه وإمتى.`,
          how: R`Ansible بيقرا الـ inventory يعرف السيرفرات، وبيفتح SSH لكل واحد (بالتوازي، ٥ في المرة افتراضيًا)، وبيبعت كود Python صغير (اسمه module) يتنفّذ هناك ويرجّع النتيجة JSON، وبعدين يمسحه. مفيش agent شغال على السيرفر ومفيش بورت جديد غير SSH.

الـ module زي [[ansible.builtin.apt]] بيوصف «الحالة اللي عايزها» ([[state=present]] يعني الباكدج لازم تكون موجودة)، مش «الأمر اللي يتنفّذ». فلو الحالة موجودة أصلًا مبيعملش حاجة ويقولك [[changed: false]]. وده اسمه idempotency، وهو الفرق الأساسي بين Ansible وسكربت bash بيتشغّل على كل سيرفر.`,
          when: "أول ما يبقى عندك أكتر من سيرفر، أو سيرفر واحد عايز تقدر تبنيه من الصفر تاني في دقايق (لو اتمسح أو نقلت لشركة استضافة تانية).",
          mistakes: R`تشغّل Ansible من PowerShell على ويندوز: مش مدعوم، استخدم WSL. تنسى إن أول اتصال بسيرفر جديد لازم يقبل الـ host key، فيقولك [[Host key verification failed]]: ادخل بـ ssh مرة بإيدك وقارن البصمة باللي في لوحة شركة الاستضافة. تستخدم [[-m shell]] أو [[-a]] (يعني [[command]]) لكل حاجة، فتخسر الـ idempotency: كل مرة [[CHANGED]] حتى لو محصلش حاجة. وتنسى [[-b]] في حاجة محتاجة root فتقع بـ [[Permission denied]] أو رسالة إن apt مش قادر ياخد الـ lock.`
        },
        teach: R`## الأول: ٣ حاجات بس

Ansible محتاج ٣ حاجات: نفسه متسطّب على جهازك، وملف فيه السيرفرات (الـ inventory)، و SSH بمفتاح شغال لكل سيرفر. السيرفرات نفسها محتاجة Python 3 بس، وده موجود في أي أوبونتو server.

اتجرّب على شبكة Docker فيها ٣ كونتينرات [[ubuntu:24.04]]: واحد اسمه [[laptop]] (الـ control node) فيه [[ansible-core 2.21.5]]، واتنين [[web1]] و [[web2]] فيهم openssh-server و systemd ويوزر [[deploy]] عنده sudo من غير باسورد، زي ما عملنا في قسم «اليوزرز». على سيرفرات حقيقية بتحط الـ IP بدل اسم الكونتينر.

---

## ١. التسطيب: [[python3 -m venv]] و [[pip install ansible-core]]

~~~bash
python3 -m venv ~/.venvs/ansible
~/.venvs/ansible/bin/pip install ansible-core
export PATH="$HOME/.venvs/ansible/bin:$PATH"
~~~

| الحتة | معناها |
|---|---|
| [[python3 -m venv ~/.venvs/ansible]] | اعمل بيئة Python منفصلة (venv) في الفولدر ده، عشان متلخبطش Python بتاع النظام |
| [[pip install ansible-core]] | سطّب Ansible جواها. [[ansible-core]] هو المحرك + الـ modules الأساسية ([[ansible.builtin]]) |
| [[export PATH=...]] | خلّي أوامر [[ansible]] تتلاقي من غير ما تكتب المسار كامل. حطها في [[~/.bashrc]] عشان تفضل |

وفيه باكدج اسمها [[ansible]] من غير [[-core]]: دي نفس المحرك ومعاه مئات الـ collections (لـ AWS و Docker و MySQL...). للسيرفرات العادية [[ansible-core]] كفاية، ولو احتجت collection زيادة: [[ansible-galaxy collection install community.general]]. و [[pipx install ansible-core]] طريقة تانية بتعمل الـ venv لوحدها.

~~~bash
ansible --version
~~~

~~~text الناتج (أول سطرين، من برّه فولدر المشروع)
ansible [core 2.21.5]
  config file = None
~~~

[[None]] لأنه اتشغّل في فولدر مفيهوش [[ansible.cfg]]. جوه فولدر المشروع (الخطوة الجاية) السطر ده بيطبع مسار الملف.

---

## ٢. الفولدر: [[inventory.ini]] و [[ansible.cfg]]

اعمل فولدر للمشروع ([[~/infra]]) وحطه في Git. فيه ملفين:

~~~text inventory.ini
[web]
web1 ansible_host=203.0.113.10
web2 ansible_host=203.0.113.11

[web:vars]
ansible_user=deploy
ansible_python_interpreter=/usr/bin/python3
~~~

| السطر | معناه |
|---|---|
| [[[web]]] | اسم مجموعة. تقدر تعمل [[[db]]] و [[[staging]]] وأي اسم |
| [[web1 ansible_host=...]] | اسم السيرفر جوه Ansible ([[web1]])، وعنوانه الحقيقي |
| [[[web:vars]]] | متغيرات لكل اللي في مجموعة [[web]] |
| [[ansible_user=deploy]] | ادخل بيوزر deploy (مش root) |
| [[ansible_python_interpreter]] | Python اللي على السيرفر. من غيره Ansible بيدوّر لوحده، وبيطبع تحذير طويل في كل أمر |

وفيه مجموعتين موجودين لوحدهم: [[all]] (كل السيرفرات) و [[ungrouped]] (اللي مش في أي مجموعة).

~~~text ansible.cfg
[defaults]
inventory = inventory.ini
private_key_file = ~/.ssh/id_ed25519
~~~

[[ansible.cfg]] في الفولدر اللي انت واقف فيه بيتقري لوحده: كده مش محتاج تكتب [[-i inventory.ini]] و [[--private-key]] في كل أمر.

---

## ٣. [[ansible-inventory --graph]]: Ansible فاهم الملف إزاي؟

~~~text الناتج
@all:
  |--@ungrouped:
  |--@web:
  |  |--web1
  |  |--web2
~~~

[[@]] قبل الاسم يعني مجموعة. أول حاجة تعملها بعد ما تعدّل الـ inventory، عشان تتأكد إن مفيش غلطة كتابة.

---

## ٤. [[ansible web -m ping]]: أوصل لكل السيرفرات؟

| الحتة | معناها |
|---|---|
| [[ansible]] | الأمر اللي بيشغّل حاجة واحدة (ad-hoc) |
| [[web]] | على مين: مجموعة، أو سيرفر واحد ([[web1]])، أو [[all]] |
| [[-m ping]] | الـ module اسمه ping |

ده **مش** ping الشبكة (ICMP). ده بيدخل SSH، ويشغّل Python هناك، ويرد [[pong]]. يعني لو نجح، يبقى SSH والمفتاح و Python تمام.

~~~text الناتج
web1 | SUCCESS => {
    "changed": false,
    "ping": "pong"
}
web2 | SUCCESS => {
    "changed": false,
    "ping": "pong"
}
~~~

الترتيب ممكن يتغير كل مرة، لأن السيرفرات بتتكلّم بالتوازي. ولو السيرفر جديد ومدخلتلوش قبل كده:

~~~text الناتج لو الـ host key مش في known_hosts
web1 | UNREACHABLE! => {
    "changed": false,
    "msg": "Task failed: Failed to connect to the host via ssh: Host key verification failed.",
    "unreachable": true
}
~~~

الحل: [[ssh deploy@203.0.113.10]] مرة بإيدك وقول yes بعد ما تقارن البصمة. (في المعمل استخدمت [[ssh-keyscan -t ed25519 web1 web2 >> ~/.ssh/known_hosts]]، وده بيصدّق أي بصمة من غير ما يسألك، فمتعملهوش على نت مش بتثق فيه.)

---

## ٥. [[ansible all -a "uptime"]]: أمر عادي على الكل

[[-a]] (arguments) من غير [[-m]] معناها module اسمه [[command]]: نفّذ الأمر ده زي ما هو.

~~~text الناتج
web1 | CHANGED | rc=0 >>
 22:34:01 up  6:56,  0 user,  load average: 2.21, 0.49, 0.16
web2 | CHANGED | rc=0 >>
 22:34:01 up  6:56,  0 user,  load average: 2.21, 0.49, 0.16
~~~

[[rc=0]] يعني الأمر خلص من غير error (return code). ولاحظ [[CHANGED]] مع إن [[uptime]] مغيّرش حاجة: Ansible ميعرفش الأمر ده بيعمل إيه، فبيفترض إنه غيّر. (السيرفرين طالعين نفس الـ uptime لأنهم كونتينرات على نفس الماكينة.)

ومن غير [[-b]] انت [[deploy]]، ومعاها انت root:

~~~text ansible web -a "whoami"  ثم  ansible web -b -a "whoami"
web2 | CHANGED | rc=0 >>
deploy
...
web1 | CHANGED | rc=0 >>
root
~~~

[[-b]] اختصار [[--become]]، يعني «اعمل sudo». ولو الـ sudo محتاج باسورد زوّد [[-K]] (بيسألك عليه).

---

## ٦. [[ansible web -b -m ansible.builtin.apt -a "..."]]: هنا الفرق

| الحتة | معناها |
|---|---|
| [[-b]] | sudo، لأن التسطيب محتاج root |
| [[-m ansible.builtin.apt]] | module الـ apt. الاسم الكامل (FQCN) أوضح من [[apt]] لوحده |
| [[name=tree]] | الباكدج |
| [[state=present]] | **لازم تكون موجودة**. ([[absent]] = لازم تتشال، و [[latest]] = آخر نسخة) |
| [[update_cache=true]] | اعمل [[apt update]] الأول |

أول مرة:

~~~text الناتج (مختصر)
web2 | CHANGED => {"cache_updated": false, "changed": true, "stderr": "debconf: delaying package configuration, ...
web1 | CHANGED => {"cache_updated": true, "changed": true, ...
~~~

تاني مرة، نفس الأمر بالظبط:

~~~text الناتج
web2 | SUCCESS => {"cache_update_time": 1793140600, "cache_updated": false, "changed": false}
web1 | SUCCESS => {"cache_update_time": 1793140674, "cache_updated": false, "changed": false}
~~~

[[changed: false]]: الـ module شاف إن [[tree]] متسطّبة، فمعملش حاجة. ده معنى **idempotent**: تشغّله مرة أو عشرة، النتيجة واحدة، ومش بيلمس اللي مظبوط. وده اللي يخليك تشغّل نفس الإعداد على سيرفر جديد وقديم من غير خوف.

> كل module ليه صفحة: [[ansible-doc ansible.builtin.apt]] (أو [[-s]] لملخص قصير). و [[ansible-doc -l]] بيعرض الـ modules المتسطبة (٧١ في [[ansible-core]] لوحده).

---

## الخلاصة

~~~text
inventory.ini              مين السيرفرات، ومتقسمين مجموعات
ansible.cfg                إعدادات الفولدر (الـ inventory والمفتاح)
ansible-inventory --graph  اتأكد إن الـ inventory مقري صح
ansible web -m ping        SSH و Python شغالين؟ (مش ping شبكة)
ansible all -a "cmd"       أمر عادي على الكل: دايمًا CHANGED
-b                         sudo
-m apt -a "state=present"  وصف حالة: لو موجودة يبقى changed: false
~~~`,
        lines: [
          "اعمل بيئة Python منفصلة (venv) لـ Ansible في [[~/.venvs/ansible]].",
          "سطّب [[ansible-core]] جواها بالـ pip بتاعها.",
          "زوّد فولدر الـ venv على الـ PATH عشان [[ansible]] و [[ansible-playbook]] يتلاقوا.",
          "ادخل فولدر المشروع اللي فيه [[inventory.ini]] و [[ansible.cfg]].",
          "اعرض السيرفرات والمجموعات زي ما Ansible فاهمها.",
          "اتأكد إن SSH و Python شغالين على كل سيرفر في مجموعة [[web]] (بيرد [[pong]]).",
          "شغّل [[uptime]] على كل السيرفرات ([[-a]] من غير [[-m]] يعني module [[command]]).",
          "سطّب [[tree]] بـ sudo ([[-b]]) لو مش موجودة. تاني مرة هيقول [[changed: false]]."
        ],
        sol: R`على المعمل (كونتينرين [[ubuntu:24.04]] و [[ansible-core 2.21.5]]): [[ansible web -m ping]] رجّع [[SUCCESS]] و [[pong]] للاتنين. أمر [[apt]] أول مرة رجّع [[CHANGED]] و [[changed: true]] للاتنين (وخد حوالي ٤ دقايق عشان [[apt update]])، وتاني مرة [[SUCCESS]] و [[changed: false]] في ثانيتين.

لو شفت [[Host key verification failed]] يبقى لسه مدخلتش السيرفر ده بـ ssh قبل كده. ولو شفت تحذير [[is using the discovered Python interpreter]] زوّد [[ansible_python_interpreter=/usr/bin/python3]] في [[[web:vars]]]. ولو استخدمت [[-o]] عشان الناتج يبقى سطر واحد، في 2.21 بيطبع [[DEPRECATION WARNING]] إنه هيتشال في 2.23.`
      },
      {
        cmd: "ansible-playbook",
        title: "playbook: الإعداد كله في ملف، ويتشغّل كام مرة براحتك",
        desc: R`الـ playbook ملف YAML فيه مهام (tasks) بالترتيب، كل مهمة بتستخدم module وبتوصف حالة: «nginx متسطّب»، «شغال»، «الملف ده فيه الكلام ده». [[ansible-playbook site.yml]] بيطبّقها على السيرفرات، وفي الآخر بيطبع ملخص: كام حاجة كانت مظبوطة ([[ok]]) وكام اتغيّرت ([[changed]]).

[[--check --diff]] بيوريك هيتغيّر إيه بالظبط (الفرق سطر سطر) من غير ما يغيّر حاجة. شغّله قبل أي playbook على سيرفر حقيقي.`,
        example: R`- name: Web servers
  hosts: web
  become: true
  tasks:
    - name: Install nginx
      ansible.builtin.apt:
        name: nginx
        state: present
        update_cache: true
        cache_valid_time: 3600

    - name: nginx running and enabled
      ansible.builtin.service:
        name: nginx
        state: started
        enabled: true

    - name: Home page
      ansible.builtin.copy:
        content: "hello from {{ inventory_hostname }}\n"
        dest: /var/www/html/index.html
        mode: "0644"`,
        flag: "script",
        try: "احفظ الملف باسم site.yml وشغّله مرتين وقارن [[PLAY RECAP]]. بعدين غيّر كلمة في الـ content وشغّل [[--check --diff]] واتأكد إن الصفحة على السيرفر لسه زي ما هي، وبعدين شغّله من غير check.",
        deep: {
          why: R`الأوامر السريعة (ad-hoc) كويسة لحاجة مرة واحدة. لكن إعداد السيرفر عبارة عن ٢٠ أو ٥٠ خطوة، ولازم تتعمل بنفس الترتيب على كل سيرفر، وتتراجع في Git. الـ playbook هو «دليل تسطيب السيرفر» بس بيتنفّذ لوحده.`,
          how: R`الملف قايمة من plays. كل play بيقول على مين ([[hosts]])، وبأي صلاحية ([[become]])، وبعدين [[tasks]] بالترتيب. Ansible بيعمل task واحدة على كل السيرفرات بالتوازي، وبعدين اللي بعدها. لو task فشلت على سيرفر، السيرفر ده بيقف والباقي يكمّل.

قبل أول task بيعمل [[Gathering Facts]]: بيجمع معلومات عن كل سيرفر (النظام، والـ IP، والرام) في متغيرات زي [[ansible_distribution]] تقدر تستخدمها.

وكل module بيقارن الحالة الحالية بالمطلوبة: [[copy]] بيقارن محتوى الملف (checksum)، و [[service]] بيسأل systemd. لو زي بعض: [[ok]]. لو لأ: يغيّر ويقول [[changed]]. وفي [[--check]] بيعمل المقارنة بس.`,
          when: "أي إعداد هتعمله أكتر من مرة، أو على أكتر من سيرفر، أو عايز تفتكره بعد ست شهور: الباكدجات، واليوزرز، وإعداد Nginx، و ufw، و fail2ban.",
          mistakes: R`مسافات YAML: لازم مسافات مش Tab، وكل مستوى بنفس العدد. [[name:]] تحت [[ansible.builtin.apt:]] لازم تكون أبعد منه، وإلا هتلاقي [[conflicting action statements]] أو [[Syntax Error while loading YAML]]. وإنك تستخدم [[shell: echo ... >> file]] بدل [[lineinfile]]: كل تشغيل بيزوّد سطر جديد. وإنك تفتكر [[--check]] بيتنبأ بكل حاجة: task بتعتمد على نتيجة task قبلها (زي ملف هيتعمل) ممكن تفشل أو تتخطّى في check وهي سليمة في الحقيقة، و [[command]] و [[shell]] بيتخطّوا في check خالص.`
        },
        teach: R`## الأول: ده وصف للسيرفر، مش سكربت

المثال مش أوامر. ده ملف [[site.yml]] بيقول «عايز السيرفرات تبقى كده»: nginx متسطّب، وشغال، والصفحة الرئيسية فيها جملة. وكل مرة تشغّله، Ansible بيقارن ويصلّح اللي مش مظبوط بس.

اتجرّب على نفس المعمل بتاع الدرس اللي فات (كونتينرين [[web1]] و [[web2]] أوبونتو 24.04 فيهم systemd، و [[ansible-core 2.21.5]]).

---

## ١. رأس الـ play

~~~yaml
- name: Web servers
  hosts: web
  become: true
  tasks:
~~~

| السطر | معناه |
|---|---|
| [[- name: Web servers]] | الـ [[-]] معناها عنصر في قايمة: ده أول play. الاسم بيظهر في الناتج |
| [[hosts: web]] | على مجموعة [[web]] من الـ inventory |
| [[become: true]] | كل الـ tasks بـ sudo (زي [[-b]]) |
| [[tasks:]] | وتحته المهام بالترتيب |

YAML بيعتمد على المسافات: [[hosts]] و [[become]] و [[tasks]] تحت [[name]] بنفس البُعد (مسافتين) لأنهم خصائص لنفس الـ play.

---

## ٢. أول task: [[ansible.builtin.apt]]

~~~yaml
    - name: Install nginx
      ansible.builtin.apt:
        name: nginx
        state: present
        update_cache: true
        cache_valid_time: 3600
~~~

نفس الـ ad-hoc اللي فات بس مكتوب في ملف. الجديد [[cache_valid_time: 3600]]: متعملش [[apt update]] لو اتعمل في آخر ٣٦٠٠ ثانية (ساعة). من غيره كل تشغيل هيعمل update ويضيّع وقت.

لاحظ إن فيه [[name]] مرتين بمعنيين: الأولى اسم الـ task (بيظهر في الناتج)، والتانية تحت [[apt]] هي اسم الباكدج.

---

## ٣. تاني task: [[ansible.builtin.service]]

~~~yaml
    - name: nginx running and enabled
      ansible.builtin.service:
        name: nginx
        state: started
        enabled: true
~~~

| الخاصية | زي إيه بإيدك |
|---|---|
| [[state: started]] | [[systemctl start nginx]] لو مش شغال بس |
| [[enabled: true]] | [[systemctl enable nginx]] لو مش enabled بس |

و [[state]] ليها كمان [[stopped]]، و [[restarted]] و [[reloaded]] (ودول دايمًا بيعملوا حاجة، فمكانهم الطبيعي الـ handlers في درس جاي).

---

## ٤. تالت task: [[ansible.builtin.copy]] بـ [[content]]

~~~yaml
    - name: Home page
      ansible.builtin.copy:
        content: "hello from {{ inventory_hostname }}\n"
        dest: /var/www/html/index.html
        mode: "0644"
~~~

| الخاصية | معناها |
|---|---|
| [[content]] | محتوى الملف مكتوب هنا (أو [[src: files/index.html]] لملف من جهازك) |
| [[{{ inventory_hostname }}]] | متغير: اسم السيرفر في الـ inventory. [[{{ }}]] صيغة Jinja2، وهتتشرح في درس الـ templates |
| [[\n]] | سطر جديد في آخر الملف |
| [[dest]] | المسار على السيرفر |
| [[mode: "0644"]] | الصلاحيات، بين علامات تنصيص زي ما دليل Ansible بيوصّي. لو كتبت [[644]] من غير صفر ومن غير تنصيص، YAML بيقراها رقم عشري والصلاحيات تطلع غلط |

---

## ٥. أول تشغيل

~~~bash
ansible-playbook site.yml
~~~

~~~text الناتج
PLAY [Web servers] *************************************************************

TASK [Gathering Facts] *********************************************************
ok: [web1]
ok: [web2]

TASK [Install nginx] ***********************************************************
changed: [web2]
changed: [web1]

TASK [nginx running and enabled] ***********************************************
changed: [web1]
changed: [web2]

TASK [Home page] ***************************************************************
changed: [web1]
changed: [web2]

PLAY RECAP *********************************************************************
web1                       : ok=4    changed=3    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0
web2                       : ok=4    changed=3    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0
~~~

| في الـ RECAP | معناه |
|---|---|
| [[ok=4]] | ٤ tasks خلصت من غير error (ومنهم اللي غيّرت) |
| [[changed=3]] | منهم ٣ غيّروا حاجة فعلًا |
| [[unreachable]] | سيرفرات مقدرش يوصلها بـ SSH |
| [[failed]] | tasks وقعت |
| [[skipped]] | اتخطّت (شرط [[when]] مش متحقق، أو check mode) |

[[Gathering Facts]] هو الـ task الرابعة: جمع المعلومات، ودي [[ok]] دايمًا. وفي المعمل [[nginx running]] طلعت [[changed]] لأن صورة أوبونتو بتاعة Docker بتمنع الخدمات تقوم لوحدها وقت التسطيب. على VPS حقيقي غالبًا هتلاقيها [[ok]] لأن apt بيشغّل nginx لوحده.

---

## ٦. تاني تشغيل: هنا الفكرة كلها

~~~text الناتج (الآخر)
PLAY RECAP *********************************************************************
web1                       : ok=4    changed=0    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0
web2                       : ok=4    changed=0    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0
~~~

[[changed=0]]: كل حاجة مظبوطة، فمتلمسش حاجة. لو شغّلته على سيرفر جديد هيعمل كله، وعلى سيرفر قديم هيصلّح اللي اختلف بس. وده بيخليك تكتشف لو حد غيّر حاجة بإيده على السيرفر: هتلاقي [[changed=1]] على task معينة.

### إزاي تبوّظ الـ idempotency

لو كتبت سطر في ملف بـ [[shell]]:

~~~text ansible web1 -b -m ansible.builtin.shell -a "echo LOG_LEVEL=info >> /etc/myapp.env"  (مرتين)
web1 | CHANGED | rc=0 >>
web1 | CHANGED | rc=0 >>
~~~

~~~text cat /etc/myapp.env
LOG_LEVEL=info
LOG_LEVEL=info
~~~

السطر اتكرر. نفس الشغلانة بـ [[lineinfile]] (module بيضمن إن السطر موجود مرة واحدة):

~~~text ansible web1 -b -m ansible.builtin.lineinfile -a "path=/etc/myapp2.env line=LOG_LEVEL=info create=true"  (مرتين)
web1 | CHANGED => { "changed": true, "msg": "line added" }
web1 | SUCCESS => { "changed": false, "msg": "" }
~~~

القاعدة: دوّر على module قبل ما تكتب [[shell]] أو [[command]]. ولو مفيش، استخدم [[creates:]] (متشغّلش لو الملف ده موجود) أو [[changed_when]].

---

## ٧. [[--check --diff]]: شوف قبل ما تغيّر

غيّرت [[hello from]] لـ [[hello v2 from]] في الملف، وشغّلت:

~~~bash
ansible-playbook site.yml --check --diff
~~~

~~~text الناتج (task الصفحة)
TASK [Home page] ***************************************************************
--- before: /var/www/html/index.html
+++ after: /var/www/html/index.html
@@ -1 +1 @@
-hello from web2
+hello v2 from web2

changed: [web2]
~~~

| الحتة | معناها |
|---|---|
| [[--check]] | dry run: قارن وقول هتغيّر إيه، ومتغيّرش |
| [[--diff]] | ووريني الفرق سطر سطر ([[-]] اللي هيتشال، [[+]] اللي هيتحط) |

وبعدها [[curl http://web1]] لسه بيرجّع [[hello from web1]]: محصلش حاجة. ولما شغّلته من غير check اتغيّرت. وفيه كمان [[--limit web1]] (على سيرفر واحد بس) و [[--syntax-check]] (اقرا الملف واتأكد إن YAML سليم من غير ما تتصل بحاجة).

---

## الخلاصة

~~~text
hosts / become / tasks       على مين، بـ sudo؟، وإيه المهام
module + state               وصف الحالة، مش أمر
ok / changed                 كان مظبوط / اتظبط دلوقتي
changed=0 تاني مرة           ده الطبيعي (idempotent)
shell >> file                بيكرر كل مرة: استخدم lineinfile أو template
--check --diff               شوف الفرق من غير تغيير، قبل أي تشغيل على production
~~~`,
        lines: [
          "أول play، واسمه بيظهر في الناتج.",
          "هيتطبّق على مجموعة [[web]] من الـ inventory.",
          "كل الـ tasks بـ sudo.",
          "وتحت [[tasks]] المهام بالترتيب.",
          "أول task: اسمها.",
          "بتستخدم module الـ apt.",
          "الباكدج اسمها nginx.",
          "لازم تكون متسطّبة ([[present]]).",
          "اعمل [[apt update]] الأول...",
          "...بس لو آخر update أقدم من ساعة (٣٦٠٠ ثانية).",
          "تاني task: اسمها.",
          "module الخدمات (بيكلّم systemd).",
          "الخدمة nginx.",
          "لازم تكون شغالة دلوقتي.",
          "ولازم تقوم مع كل ريستارت ([[enable]]).",
          "تالت task: اسمها.",
          "module بيكتب ملف على السيرفر.",
          "محتوى الملف، و [[{{ inventory_hostname }}]] بيتحط مكانه اسم السيرفر.",
          "مكان الملف على السيرفر.",
          "صلاحياته، بين علامات تنصيص عشان YAML ميقراهاش رقم عشري."
        ],
        sol: R`التشغيل الأول على المعمل: [[changed=3]] لكل سيرفر، والتاني [[changed=0]]. و [[--check --diff]] بعد تغيير الكلمة طبع diff فيه [[-hello from web1]] و [[+hello v2 from web1]] و [[changed=1]]، و [[curl]] بعدها لسه رجّع النسخة القديمة. التشغيل العادي بعدها غيّرها، والتشغيل اللي بعده رجع [[changed=0]].

لو ظهرلك [[Syntax Error while loading YAML]]، غالبًا Tab بدل مسافات أو مستوى مسافات غلط. شغّل [[ansible-playbook site.yml --syntax-check]].`
      },
      {
        cmd: "group_vars و template",
        title: "متغيرات لكل سيرفر وملف إعداد بيتولّد منها (Jinja2)",
        desc: R`بدل ملف Nginx منسوخ على كل سيرفر بتعدّله بإيدك، بتكتب **template** واحد فيه [[{{ متغير }}]] مكان اللي بيختلف، وموديول [[ansible.builtin.template]] بيولّد منه الملف الحقيقي لكل سيرفر. والمتغيرات بتتحط في ملفات: [[group_vars/web.yml]] لكل المجموعة، و [[host_vars/web1.yml]] لسيرفر واحد (وده بيغلب).

الـ template مكتوب بلغة Jinja2: [[{{ x }}]] اطبع قيمة، و [[{% for %}]] و [[{% if %}]] تكرار وشرط.`,
        example: R`# {{ ansible_managed }}
server {
    listen 80;
    server_name {{ domain }};
    client_max_body_size {{ max_body }};

    location / {
        proxy_pass http://127.0.0.1:{{ app_port }};
        proxy_set_header Host $host;
    }
{% for path in static_paths %}
    location {{ path }} {
        root /var/www/myapp/public;
    }
{% endfor %}
}`,
        flag: "script",
        try: "اعمل group_vars/web.yml و host_vars لسيرفرين بدومين مختلف، وولّد الملف، وبعدين اعرض المتغيرات النهائية لكل سيرفر بـ [[ansible-inventory --host]] وقارنها بالملف اللي اتولّد.",
        deep: {
          why: R`السيرفرات شبه بعض في ٩٠٪ من الإعداد ومختلفة في حاجات صغيرة: الدومين، والبورت، وحجم الرفع. لو نسخت الملف لكل واحد وعدّلت بإيدك، أول تعديل عام هتنساه في واحد منهم. الـ template بيخلي الشكل في مكان واحد والفرق في متغيرات.`,
          how: R`وقت التشغيل Ansible بيجمع متغيرات كل سيرفر من أماكن كتير ليها ترتيب أولوية: defaults بتاعة الـ role (أضعف حاجة)، بعدين [[group_vars/all]]، بعدين [[group_vars/<group>]]، بعدين [[host_vars/<host>]]، و [[-e]] من سطر الأوامر بيغلب أي حاجة. بعدين بيشغّل Jinja2 على الـ template على جهازك (مش على السيرفر)، وبيقارن الناتج بالملف اللي هناك، ولو مختلف بيبعته.

[[{{ ansible_managed }}]] متغير جاهز بيطبع [[Ansible managed]]: تحطه في أول الملف عشان أي حد يفتحه على السيرفر يعرف إن التعديل بإيده هيتمسح في التشغيل الجاي.`,
          when: "أي ملف إعداد بيختلف من سيرفر للتاني: موقع Nginx، و .env، و systemd unit فيه بورت، و fail2ban jail.local.",
          mistakes: R`متغير مش متعرّف لسيرفر: [['domain' is undefined]] والـ task بتقع (حط قيمة افتراضية في group_vars أو [[{{ domain | default('_') }}]]). قيمة YAML من غير علامات تنصيص بتبدأ بـ [[{{]]: لازم [[x: "{{ y }}"]] وإلا YAML يفتكرها dictionary. وتعديل الملف على السيرفر بإيدك: التشغيل الجاي هيرجّعه زي الـ template من غير ما يسألك.`
        },
        teach: R`## الأول: ملف واحد، وكل سيرفر ياخد نسخته

المثال ده محتوى ملف [[templates/myapp.conf.j2]] ([[.j2]] = Jinja2) جوه فولدر المشروع. هو موقع Nginx عادي (reverse proxy لتطبيق على بورت 3000، زي درس «/etc/nginx/sites-available/myapp»)، بس الحاجات اللي بتختلف بقت [[{{ ... }}]].

اتجرّب على نفس المعمل ([[web1]] و [[web2]]، [[ansible-core 2.21.5]] و Jinja [[3.1.6]]).

---

## ١. المتغيرات: فين بتتكتب

~~~text شكل الفولدر
infra/
  ansible.cfg
  inventory.ini
  group_vars/
    web.yml          لكل السيرفرات في مجموعة web
  host_vars/
    web1.yml         لـ web1 بس
    web2.yml         لـ web2 بس
  templates/
    myapp.conf.j2
  web.yml            الـ playbook
~~~

Ansible بيدوّر على [[group_vars]] و [[host_vars]] جنب الـ inventory أو الـ playbook لوحده، واسم الملف لازم يبقى نفس اسم المجموعة أو السيرفر بالظبط.

~~~yaml
# group_vars/web.yml
app_port: 3000
max_body: 10m
static_paths:
  - /assets
  - /uploads
~~~

~~~yaml
# host_vars/web1.yml
domain: app1.example.com
~~~

~~~yaml
# host_vars/web2.yml
domain: app2.example.com
max_body: 50m
~~~

[[static_paths]] قايمة (كل عنصر بـ [[- ]])، والباقي قيم عادية. و [[web2]] عنده [[max_body]] مختلف: [[host_vars]] بيغلب [[group_vars]].

### [[ansible-inventory --host web2]]: المتغيرات النهائية

~~~text الناتج
{
    "ansible_host": "web2",
    "ansible_python_interpreter": "/usr/bin/python3",
    "ansible_user": "deploy",
    "app_port": 3000,
    "domain": "app2.example.com",
    "max_body": "50m",
    "static_paths": [
        "/assets",
        "/uploads"
    ]
}
~~~

ده أهم أمر لما تحتار «القيمة دي جاية منين». [[max_body]] طلع [[50m]] مش [[10m]]: الـ host كسب.

---

## ٢. الـ template سطر سطر

### [[# {{ ansible_managed }}]]

بيتطبع [[# Ansible managed]]. تحذير لأي حد يفتح الملف على السيرفر: متعدّلش هنا.

### [[server_name {{ domain }};]]

[[{{ domain }}]] بيتحط مكانها قيمة [[domain]] بتاعة السيرفر ده. على web1 [[app1.example.com]]، وعلى web2 [[app2.example.com]].

### [[client_max_body_size {{ max_body }};]] و [[proxy_pass http://127.0.0.1:{{ app_port }};]]

نفس الفكرة. و [[$host]] في [[proxy_set_header]] ده متغير **Nginx** مش Ansible، فبيفضل زي ما هو (Jinja بيفهم [[{{ }}]] بس).

### [[{% for path in static_paths %}]] ... [[{% endfor %}]]

[[{% %}]] أمر Jinja مش طباعة. ده تكرار: لكل عنصر في [[static_paths]] حطه في [[path]] واكتب البلوك اللي جوه. قايمتنا فيها اتنين، فهيطلع بلوكين [[location]].

وفيه كمان [[{% if enable_gzip %}]] ... [[{% endif %}]] للشرط، و filters بعد [[|]]: [[{{ domain | upper }}]] و [[{{ x | default('y') }}]].

---

## ٣. الـ task اللي بتولّد الملف

~~~yaml
    - name: Site config from template
      ansible.builtin.template:
        src: templates/myapp.conf.j2
        dest: /etc/nginx/sites-available/myapp
        mode: "0644"
~~~

[[src]] على جهازك، و [[dest]] على السيرفر. الملف كامل في درس الـ handlers الجاي. بعد التشغيل:

~~~text ansible web2 -a "cat /etc/nginx/sites-available/myapp"
# Ansible managed
server {
    listen 80;
    server_name app2.example.com;
    client_max_body_size 50m;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
    }
    location /assets {
        root /var/www/myapp/public;
    }
    location /uploads {
        root /var/www/myapp/public;
    }
}
~~~

---

## ٤. [[-e]]: غيّر قيمة من سطر الأوامر (وشوف قبل ما تغيّر)

~~~bash
ansible-playbook web.yml -e max_body=20m --check --diff --limit web1
~~~

| الحتة | معناها |
|---|---|
| [[-e max_body=20m]] | extra var: أعلى أولوية، بيغلب host_vars نفسه |
| [[--limit web1]] | على web1 بس |

~~~text الناتج (task الـ template)
--- before: /etc/nginx/sites-available/myapp
+++ after: /root/.ansible/tmp/ansible-local-8029y0zc9ef/tmpry99598s/myapp.conf.j2
@@ -2,7 +2,7 @@
 server {
     listen 80;
     server_name app1.example.com;
-    client_max_body_size 10m;
+    client_max_body_size 20m;
~~~

[[after]] مسار مؤقت على جهازك: ده الملف اللي Jinja ولّده قبل ما يتبعت.

---

## ترتيب الأولوية (من الأضعف للأقوى، المختصر)

| المكان | امتى تستخدمه |
|---|---|
| [[roles/x/defaults/main.yml]] | قيمة افتراضية للـ role (الدرس الجاي بعد الـ handlers) |
| [[group_vars/all.yml]] | لكل السيرفرات |
| [[group_vars/web.yml]] | لمجموعة |
| [[host_vars/web1.yml]] | لسيرفر |
| [[-e]] | مرة واحدة من سطر الأوامر |

## الخلاصة

~~~text
{{ x }}                     اطبع متغير
{% for %} / {% if %}        تكرار وشرط
group_vars/<group>.yml      متغيرات مجموعة
host_vars/<host>.yml        متغيرات سيرفر (بتغلب المجموعة)
ansible-inventory --host X  القيم النهائية لسيرفر
ansible_managed             علامة «متعدّلش بإيدك»
~~~`,
        lines: [
          "بداية موقع Nginx.",
          "اسمع على بورت 80.",
          "الدومين من متغير [[domain]] (بيختلف لكل سيرفر من host_vars).",
          "أقصى حجم رفع من [[max_body]].",
          "كل الطلبات...",
          "...تروح للتطبيق على البورت اللي في [[app_port]].",
          "[[$host]] متغير Nginx مش Ansible، فبيفضل زي ما هو.",
          "قفلة [[location /]].",
          "لكل عنصر في قايمة [[static_paths]]، حطه في [[path]]...",
          "...واعمل location بالمسار ده.",
          "الملفات الثابتة من الفولدر ده.",
          "قفلة الـ location.",
          "نهاية التكرار.",
          "قفلة الـ server."
        ],
        sol: R`[[ansible-inventory --host web2]] طبع [[domain: app2.example.com]] و [[max_body: 50m]] (من host_vars) و [[app_port: 3000]] و [[static_paths]] (من group_vars). والملف المتولّد على web2 فيه [[server_name app2.example.com;]] و [[client_max_body_size 50m;]] وبلوكين [[location /assets]] و [[location /uploads]]، وعلى web1 [[app1.example.com]] و [[10m]].

لو ظهر [[AnsibleUndefinedVariable: 'domain' is undefined]]، سيرفر من غير ملف host_vars أو اسم الملف مش مطابق لاسمه في الـ inventory.`
      },
      {
        cmd: "handlers",
        title: "handlers: اعمل reload بس لو الإعداد اتغيّر فعلًا",
        desc: R`الـ handler task مستنية حد ينادي عليها بـ [[notify]]، ومش بتشتغل غير لو الـ task اللي نادت عملت [[changed]]. فـ Nginx يعمل reload لما ملف الإعداد يتغيّر بس، مش في كل تشغيل. والـ handlers بتشتغل مرة واحدة في آخر الـ play حتى لو اتنادى عليها من كذا task.

حط handler بيعمل [[nginx -t]] قبل الـ reload: لو الإعداد فيه غلطة، الـ reload ميحصلش والموقع يفضل شغال بالإعداد القديم.`,
        example: R`- name: Nginx site for myapp
  hosts: web
  become: true
  tasks:
    - name: Site config from template
      ansible.builtin.template:
        src: templates/myapp.conf.j2
        dest: /etc/nginx/sites-available/myapp
        mode: "0644"
      notify:
        - Test nginx config
        - Reload nginx

    - name: Enable the site
      ansible.builtin.file:
        src: /etc/nginx/sites-available/myapp
        dest: /etc/nginx/sites-enabled/myapp
        state: link
      notify:
        - Test nginx config
        - Reload nginx

  handlers:
    - name: Test nginx config
      ansible.builtin.command: nginx -t
      changed_when: false

    - name: Reload nginx
      ansible.builtin.service:
        name: nginx
        state: reloaded`,
        flag: "script",
        try: "شغّل الـ playbook مرتين وشوف إن الـ handlers ظهرت في الأولى بس. بعدين حط قيمة غلط في max_body (زي [[50 mb]] بمسافة) وشغّل، وشوف مين وقع ومين اشتغل، واتأكد إن nginx لسه active.",
        deep: {
          why: R`لو حطيت [[state: reloaded]] كـ task عادية، Nginx هيعمل reload كل مرة تشغّل الـ playbook حتى لو محصلش أي تغيير، وده بيقطع اتصالات مالوش لازمة، وبيخلي [[changed]] مش صفر أبدًا فمتعرفش إمتى حصل تغيير بجد. والأخطر: reload بإعداد غلط.`,
          how: R`كل task فيها [[notify]] بتسجّل أسامي handlers لو هي عملت changed. في آخر الـ play، Ansible بيشغّل الـ handlers اللي اتسجّلت، كل واحد مرة واحدة لكل سيرفر، **بترتيب كتابتهم في [[handlers:]]** مش بترتيب الـ notify. فـ Test مكتوب قبل Reload، ولو Test وقع على سيرفر، السيرفر ده بيقف وميوصلش للـ Reload.

ولو task وقعت في النص، الـ handlers اللي اتسجّلت قبلها مش بتشتغل افتراضيًا (إلا مع [[--force-handlers]])، ولو عايز تشغّلهم في نص الـ play: task فيها [[ansible.builtin.meta: flush_handlers]].`,
          when: "أي ملف إعداد لخدمة: Nginx و sshd و fail2ban و systemd unit (وده محتاج handler بيعمل [[daemon_reload: true]]).",
          mistakes: R`اسم في [[notify]] مختلف عن اسم الـ handler ولو بحرف: Ansible بيوقف بـ error [[The requested handler 'X' was not found]]. وإنك تفتكر إن الـ test بيمنع الملف الغلط يتكتب: الملف الغلط بيتكتب على الديسك، والـ reload بس هو اللي اتمنع، فلو السيرفر عمل restart قبل ما تصلّح، Nginx مش هيقوم. صلّح وشغّل تاني على طول (أو استخدم [[validate:]] في الـ template لملفات كاملة زي [[sshd_config]]: [[validate: /usr/sbin/sshd -t -f %s]]).`
        },
        teach: R`## الأول: الـ handler = «لو اتغيّر، اعمل كذا»

ده playbook [[web.yml]] كامل: بيولّد موقع Nginx من الـ template بتاع الدرس اللي فات، ويفعّله، ولو أي واحد منهم غيّر حاجة يختبر الإعداد ويعمل reload. اتجرّب على نفس المعمل (nginx [[1.24]] من أوبونتو 24.04).

---

## ١. الـ tasks: [[notify]]

~~~yaml
    - name: Site config from template
      ansible.builtin.template:
        ...
      notify:
        - Test nginx config
        - Reload nginx
~~~

[[notify]] على نفس مستوى [[ansible.builtin.template]] (خاصية للـ task مش للـ module)، وتحتها أسامي handlers. لو الـ task طلعت [[changed]] يتسجّلوا، ولو [[ok]] لأ.

~~~yaml
    - name: Enable the site
      ansible.builtin.file:
        src: /etc/nginx/sites-available/myapp
        dest: /etc/nginx/sites-enabled/myapp
        state: link
~~~

[[ansible.builtin.file]] بـ [[state: link]] = [[ln -s]] اللي في درس «تفعيل الموقع»: [[src]] الملف الأصلي و [[dest]] اللينك. ولو اللينك موجود صح: [[ok]].

---

## ٢. الـ handlers

~~~yaml
  handlers:
    - name: Test nginx config
      ansible.builtin.command: nginx -t
      changed_when: false

    - name: Reload nginx
      ansible.builtin.service:
        name: nginx
        state: reloaded
~~~

| الحتة | معناها |
|---|---|
| [[handlers:]] | على نفس مستوى [[tasks:]] |
| [[command: nginx -t]] | اختبر الإعداد. لو فيه غلطة الأمر بيرجع رقم غير صفر، فالـ task تقع |
| [[changed_when: false]] | الاختبار مبيغيّرش حاجة، فقوله يكتب [[ok]] مش [[changed]] |
| [[state: reloaded]] | [[systemctl reload nginx]]: يقرا الإعداد الجديد من غير ما يقطع الاتصالات |

---

## ٣. أول تشغيل: الاتنين اتغيّروا، والـ handlers اشتغلت مرة

~~~text الناتج
TASK [Site config from template] ***********************************************
changed: [web1]
changed: [web2]

TASK [Enable the site] *********************************************************
changed: [web2]
changed: [web1]

RUNNING HANDLER [Test nginx config] ********************************************
ok: [web1]
ok: [web2]

RUNNING HANDLER [Reload nginx] *************************************************
changed: [web2]
changed: [web1]

PLAY RECAP *********************************************************************
web1                       : ok=5    changed=3    ...
~~~

الـ task الاتنين نادوا على نفس الـ handlers، بس كل handler اشتغل **مرة واحدة** في الآخر. وتاني تشغيل:

~~~text الناتج
PLAY RECAP *********************************************************************
web1                       : ok=3    changed=0    ...
web2                       : ok=3    changed=0    ...
~~~

[[ok=3]] (facts و الـ task الاتنين) ومفيش [[RUNNING HANDLER]] خالص: مفيش تغيير، فمفيش reload.

---

## ٤. لما الإعداد يبقى غلط

غيّرت [[max_body]] في [[host_vars/web2.yml]] لـ [[50 mb]] (بمسافة، Nginx مش بيقبلها):

~~~text الناتج
TASK [Site config from template] ***********************************************
changed: [web2]
ok: [web1]

RUNNING HANDLER [Test nginx config] ********************************************
[ERROR]: Task failed: Module failed: The command exited with a non-zero return code.
fatal: [web2]: FAILED! => {... "stderr": "... [emerg] 1681#1681: invalid number of arguments in \"client_max_body_size\" directive in /etc/nginx/sites-enabled/myapp:5\nnginx: configuration file /etc/nginx/nginx.conf test failed" ...}

PLAY RECAP *********************************************************************
web1                       : ok=3    changed=0    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0
web2                       : ok=3    changed=1    unreachable=0    failed=1    skipped=0    rescued=0    ignored=0
~~~

اللي حصل:

| | web1 | web2 |
|---|---|---|
| الـ template | [[ok]]: متغيّرش | [[changed]]: اتكتب الملف الغلط |
| Test | مااشتغلش (مفيش notify) | **وقع**، وفيه السطر والسبب |
| Reload | مااشتغلش | **مااشتغلش**: السيرفر وقف عند الـ Test |
| nginx | شغال | [[systemctl is-active nginx]] = [[active]]، بالإعداد القديم |

بس الملف الغلط موجود على الديسك ([[client_max_body_size 50 mb;]]). صلّحت القيمة لـ [[50m]] وشغّلت تاني: الـ template [[changed]]، والـ handlers اشتغلت، و [[failed=0]].

---

## ٥. الـ handlers في [[--check]]

في [[--check --diff]] على web1 (الدرس اللي فات)، الناتج كان:

~~~text الناتج
RUNNING HANDLER [Test nginx config] ********************************************
skipping: [web1]

RUNNING HANDLER [Reload nginx] *************************************************
changed: [web1]
~~~

[[command]] بيتخطّى في check mode (ميعرفش الأمر هيعمل إيه)، و [[service]] بيقول «كنت هعمل reload» من غير ما يعمله. فـ check مش بيختبر إعداد Nginx نفسه.

---

## الخلاصة

~~~text
notify: [اسم]            لو الـ task دي changed، سجّل الـ handler
handlers:                 بتشتغل في آخر الـ play، مرة واحدة، بترتيب كتابتها
nginx -t قبل reload       الإعداد الغلط ميوصلش لـ nginx الشغال
changed_when: false       لأمر بيقرا بس
الملف الغلط بيفضل         صلّح وشغّل تاني قبل أي restart
~~~`,
        lines: [
          "play جديد اسمه كده.",
          "على مجموعة [[web]].",
          "بـ sudo.",
          "المهام:",
          "أول task: ولّد ملف الموقع.",
          "بـ module الـ template (Jinja2).",
          "الـ template من فولدر المشروع على جهازك.",
          "يتكتب هنا على السيرفر.",
          "صلاحياته.",
          "لو الملف اتغيّر، سجّل الـ handlers دي:",
          "اختبر الإعداد...",
          "...واعمل reload.",
          "تاني task: فعّل الموقع.",
          "بـ module الملفات.",
          "اللينك بيشاور على الملف ده...",
          "...واللينك نفسه هنا.",
          "[[state: link]] يعني symlink (زي [[ln -s]]).",
          "لو اللينك اتعمل دلوقتي، نفس الـ handlers:",
          "اختبر...",
          "...و reload.",
          "الـ handlers: مستنية [[notify]].",
          "الأول: اختبر إعداد Nginx.",
          "[[nginx -t]]: لو فيه غلطة الـ handler يقع ومفيش reload.",
          "الاختبار مبيغيّرش حاجة، فيتكتب [[ok]].",
          "التاني: reload.",
          "بـ module الخدمات.",
          "لخدمة nginx.",
          "[[reloaded]] = [[systemctl reload]]: الإعداد الجديد من غير قطع الاتصالات."
        ],
        sol: R`على المعمل: التشغيل الأول [[changed=3]] (الملف واللينك والـ reload)، والـ handlers ظهرت مرة واحدة رغم إن اتنادى عليها مرتين. التاني [[ok=3 changed=0]] ومفيش [[RUNNING HANDLER]].

بـ [[max_body: 50 mb]]: [[fatal: [web2]: FAILED!]] في [[Test nginx config]] ومعاها [[invalid number of arguments in "client_max_body_size" directive in /etc/nginx/sites-enabled/myapp:5]]، والـ Reload مااشتغلش، و [[systemctl is-active nginx]] على web2 رجّع [[active]]. وبعد التصليح والتشغيل تاني [[failed=0]].`
      },
      {
        cmd: "roles",
        title: "roles: قسّم الإعداد حتت بتتعاد على أي مشروع",
        desc: R`لما الـ playbook يكبر، بتقسمه roles: كل role فولدر فيه حاجة واحدة متكاملة (nginx، postgres، اليوزرز) بفولدرات ثابتة: [[tasks/]] و [[handlers/]] و [[templates/]] و [[defaults/]]. و [[ansible-galaxy role init]] بيعمل الهيكل ده جاهز، والـ playbook يبقى سطور قليلة: السيرفرات دي تاخد الـ roles دي.`,
        example: R`ansible-galaxy role init --init-path roles nginx_site
find roles -type f | sort
ansible-playbook site.yml
ansible-playbook site.yml --list-tasks`,
        try: "حوّل playbook الـ handlers لـ role اسمه nginx_site، وشغّله على نفس السيرفرات، ولازم يطلع [[changed=0]]: نقلت الكود من غير ما تغيّر السيرفرات.",
        deep: {
          why: R`playbook واحد فيه ١٠٠ task صعب يتقرا، وصعب تاخد جزء منه لمشروع تاني. الـ role وحدة مستقلة: تاخد فولدر [[roles/nginx_site]] كله لأي مشروع، وتغيّر سلوكه بالمتغيرات بس. وفيه آلاف roles جاهزة على Ansible Galaxy (بتتسطّب بـ [[ansible-galaxy role install]])، بس اقرا كودها قبل ما تشغّلها بـ root على سيرفرك.`,
          how: R`لما تكتب [[roles:]] وتحتها [[- nginx_site]] في play، Ansible بيدوّر على [[roles/nginx_site/]] جنب الـ playbook، ويقرا: [[tasks/main.yml]] (المهام)، و [[handlers/main.yml]] (الـ handlers)، و [[defaults/main.yml]] (متغيرات بأقل أولوية، عشان أي group_vars تغلبها)، و [[vars/main.yml]] (متغيرات بأولوية عالية، صعب تتغيّر من برّه)، و [[meta/main.yml]] (معلومات ومين الـ roles اللي لازم تشتغل قبله). والـ template في [[templates/]] بتتكتب باسمها بس ([[src: myapp.conf.j2]]).`,
          when: "أول ما يبقى عندك أكتر من «حاجة» بتسطّبها (nginx و node و postgres و fail2ban)، أو مشروعين بيستخدموا نفس الإعداد.",
          mistakes: R`[[ansible-galaxy role init roles/nginx_site]] من غير [[--init-path]]: بيشتغل بس بيكتب [[roles/nginx_site]] كاسم للـ role في التعليقات ([[# tasks file for roles/nginx_site]]). ومتغيرات الـ role في [[vars/]] بدل [[defaults/]]، فمتعرفش تغيّرها من group_vars. وإنك تسيب فولدرات فاضية ([[tests/]] و [[files/]]) ملهاش لازمة، امسحها.`
        },
        teach: R`## الأول: نفس الكود، مترتّب في فولدرات

مش هنكتب حاجة جديدة. هناخد [[web.yml]] بتاع درس الـ handlers (template + link + handlers) ونحطه في role. والدليل إن النقل صح: التشغيل يطلع [[changed=0]]، لأن السيرفرات أصلًا مظبوطة. اتجرّب على نفس المعمل بـ [[ansible-core 2.21.5]].

---

## ١. [[ansible-galaxy role init --init-path roles nginx_site]]

| الحتة | معناها |
|---|---|
| [[ansible-galaxy]] | أداة الـ roles والـ collections (بتيجي مع ansible-core) |
| [[role init]] | اعمل هيكل role جديد |
| [[--init-path roles]] | جوه فولدر [[roles/]] |
| [[nginx_site]] | اسم الـ role (حروف صغيرة و [[_]]، من غير [[-]]) |

~~~text الناتج
- Role nginx_site was created successfully
~~~

---

## ٢. [[find roles -type f | sort]]: إيه اللي اتعمل

~~~text الناتج
roles/nginx_site/README.md
roles/nginx_site/defaults/main.yml
roles/nginx_site/handlers/main.yml
roles/nginx_site/meta/main.yml
roles/nginx_site/tasks/main.yml
roles/nginx_site/tests/inventory
roles/nginx_site/tests/test.yml
roles/nginx_site/vars/main.yml
~~~

[[-type f]] يعني ملفات بس، فـ [[files/]] و [[templates/]] مش ظاهرين لأنهم فولدرات فاضية (موجودين، [[find roles]] من غير [[-type f]] بيعرضهم).

| الفولدر | فيه إيه |
|---|---|
| [[tasks/main.yml]] | المهام (من غير [[hosts]] ولا [[become]]: دول بتوع الـ play) |
| [[handlers/main.yml]] | الـ handlers |
| [[templates/]] | ملفات [[.j2]] |
| [[files/]] | ملفات بتتنسخ زي ما هي ([[copy: src=]]) |
| [[defaults/main.yml]] | قيم افتراضية، **أضعف** أولوية |
| [[vars/main.yml]] | قيم ثابتة، أولوية عالية |
| [[meta/main.yml]] | المؤلف والترخيص، و [[dependencies]] |
| [[tests/]] | مثال تشغيل. مش محتاجينه |

مسحت [[tests]] و [[vars]] و [[files]]، ونقلت الحاجات:

~~~yaml
# roles/nginx_site/defaults/main.yml
app_port: 3000
max_body: 10m
static_paths: []
~~~

~~~yaml
# roles/nginx_site/tasks/main.yml (أول task، والباقي زي web.yml بالظبط)
- name: Install nginx
  ansible.builtin.apt:
    name: nginx
    state: present
    update_cache: true
    cache_valid_time: 3600

- name: Site config from template
  ansible.builtin.template:
    src: myapp.conf.j2
    dest: /etc/nginx/sites-available/myapp
    mode: "0644"
  notify:
    - Test nginx config
    - Reload nginx
~~~

لاحظ [[src: myapp.conf.j2]] من غير [[templates/]]: الـ role بيدوّر في فولدره لوحده. و [[handlers/main.yml]] فيه نفس الـ handlerين، و [[myapp.conf.j2]] اتنقل لـ [[roles/nginx_site/templates/]].

و [[defaults]] هنا معناها: الـ role شغال لوحده لو محدش حدد قيم، و [[group_vars/web.yml]] (فيه [[static_paths]] بقيمتين) بيغلبها.

---

## ٣. الـ playbook بقى ٥ سطور

~~~yaml
# site.yml
- name: Web servers
  hosts: web
  become: true
  roles:
    - nginx_site
~~~

~~~bash
ansible-playbook site.yml
~~~

~~~text الناتج
TASK [nginx_site : Install nginx] **********************************************
ok: [web1]
ok: [web2]

TASK [nginx_site : Site config from template] **********************************
ok: [web1]
ok: [web2]

TASK [nginx_site : Enable the site] ********************************************
ok: [web1]
ok: [web2]

PLAY RECAP *********************************************************************
web1                       : ok=4    changed=0    ...
web2                       : ok=4    changed=0    ...
~~~

اسم الـ role بقى قبل اسم كل task ([[nginx_site : ...]])، فتعرف الـ task دي جاية منين. و [[changed=0]]: الملف اللي اتولّد من الـ role هو هو اللي كان على السيرفر.

### [[--list-tasks]]

بيطبع كل الـ tasks اللي هتشتغل بالترتيب من غير ما يتصل بالسيرفرات. مفيد لما تبقى roles كتير.

---

## ٤. مشروع حقيقي بيبقى شكله كده

~~~text
infra/
  ansible.cfg
  inventory.ini
  group_vars/web.yml
  host_vars/web1.yml
  site.yml               roles: [base, nginx_site, node_app]
  roles/
    base/                اليوزرز و ufw و fail2ban و unattended-upgrades
    nginx_site/
    node_app/            node و systemd unit للتطبيق
~~~

---

## الخلاصة

~~~text
ansible-galaxy role init --init-path roles X   هيكل role جاهز
tasks/ handlers/ templates/ defaults/           كل حاجة في مكانها
defaults                                         أضعف قيم، أي group_vars تغلبها
roles: [x, y]                                    الـ playbook بقى قايمة
changed=0 بعد النقل                              دليل إن الـ refactor مغيّرش السيرفرات
~~~`,
        lines: [
          "اعمل هيكل role اسمه [[nginx_site]] جوه فولدر [[roles/]].",
          "اعرض الملفات اللي اتعملت مترتّبة.",
          "شغّل الـ playbook اللي بقى فيه [[roles:]] وتحتها [[nginx_site]] بس.",
          "اعرض الـ tasks اللي هتشتغل بالترتيب من غير ما تشغّل حاجة."
        ],
        sol: R`[[ansible-galaxy role init]] طبع [[Role nginx_site was created successfully]]، و [[find]] عرض [[README.md]] و [[defaults/main.yml]] و [[handlers/main.yml]] و [[meta/main.yml]] و [[tasks/main.yml]] و [[tests/inventory]] و [[tests/test.yml]] و [[vars/main.yml]]. بعد النقل، [[ansible-playbook site.yml]] طبع tasks باسم [[nginx_site : ...]] و [[changed=0]] للسيرفرين.

لو ظهر [[the role 'nginx_site' was not found]]، الـ playbook مش جنب فولدر [[roles/]]، أو زوّد [[roles_path = roles]] في [[ansible.cfg]].`
      },
      {
        cmd: "ansible-vault",
        title: "ansible-vault: الباسوردات في Git من غير ما حد يقراها",
        desc: R`الـ playbook محتاج باسورد قاعدة البيانات عشان يكتب [[.env]]، بس مينفعش يتحط في Git مكشوف. [[ansible-vault encrypt]] بيشفّر ملف المتغيرات بـ AES256 بباسورد واحد (vault password)، والملف المشفّر هو اللي يتعمل commit. ووقت التشغيل Ansible بيفك التشفير في الذاكرة بس.

باسورد الـ vault نفسه **مش** في الريبو: في ملف على جهازك صلاحياته 600 (أو [[--ask-vault-pass]] يسألك عليه كل مرة).`,
        example: R`umask 077; echo 'lab-vault-pass-123' > ~/.vault_pass
ansible-vault encrypt group_vars/web/vault.yml --vault-password-file ~/.vault_pass
head -3 group_vars/web/vault.yml
ansible-vault view group_vars/web/vault.yml --vault-password-file ~/.vault_pass
ansible-playbook secrets.yml --vault-password-file ~/.vault_pass
ansible-vault encrypt_string --vault-password-file ~/.vault_pass 'fake-api-key-000' --name api_key`,
        try: "اعمل vault.yml فيه باسورد تجربة، شفّره، وشغّل playbook بيكتب .env بصلاحيات 600. بعدين جرّب تشغّله من غير باسورد الـ vault وشوف الـ error، وجرّب [[--diff]] مع [[no_log]] ومن غيره.",
        deep: {
          why: R`الباسوردات اللي في Git بتتسرّب: ريبو بقى public بالغلط، أو لابتوب اتسرق، أو موظف ساب الشركة ومعاه نسخة. والتشفير بيخلي الملف من غير الباسورد كلام ملوش معنى، فتقدر تحطه جنب باقي الإعداد وتتابع تغييراته.`,
          how: R`[[ansible-vault]] بيشتق مفتاح من باسوردك (PBKDF2) ويشفّر الملف كله بـ AES256، ويحط في أوله [[$ANSIBLE_VAULT;1.1;AES256]] عشان Ansible يعرف إنه مشفّر. أي ملف متغيرات بيتقري (group_vars أو host_vars أو vars_files) لو بيبدأ بالسطر ده، Ansible بيفكّه بالباسورد اللي إديته.

الطريقة المنظمة: فولدر [[group_vars/web/]] فيه [[vars.yml]] (مكشوف) و [[vault.yml]] (مشفّر). المتغيرات المشفّرة بتبدأ بـ [[vault_]]، والمكشوف بيشاور عليها: [[db_password: "{{ vault_db_password }}"]]. كده تعرف بـ grep إن المتغير موجود ومنين جاي من غير ما تفك حاجة. و [[encrypt_string]] بيشفّر قيمة واحدة تحطها جوه ملف مكشوف.`,
          when: "أي باسورد أو token أو مفتاح API الـ playbook محتاجه: باسورد قاعدة البيانات، و token بوت Telegram بتاع التنبيهات، و SMTP.",
          mistakes: R`ملف [[~/.vault_pass]] جوه الريبو (زوّده في [[.gitignore]] لو حطيته جنبه)، أو صلاحياته 644. و [[--diff]] على task بتكتب secret من غير [[no_log: true]]: الباسورد بيتطبع في الترمنال (وفي لوج CI لو بتشغّله هناك). وإنك تنسى إن group_vars بتتقري في الأوامر السريعة كمان: [[ansible web -a ...]] هيقع بـ [[Attempting to decrypt but no vault secrets found]] لو مفيش باسورد، فحط [[vault_password_file]] في [[ansible.cfg]].`
        },
        teach: R`## الأول: ملفين، واحد مكشوف وواحد مشفّر

اتجرّب على نفس المعمل بـ [[ansible-core 2.21.5]]. كل الباسوردات هنا وهمية للتجربة ([[test-only-not-a-real-password]])، متستخدمش أي حاجة شبهها على سيرفر حقيقي.

حوّلت [[group_vars/web.yml]] لفولدر:

~~~text
group_vars/web/
  vars.yml      المتغيرات العادية + db_password: "{{ vault_db_password }}"
  vault.yml     vault_db_password: test-only-not-a-real-password   ← هيتشفّر
~~~

Ansible بيقرا كل الملفات اللي في [[group_vars/web/]] كأنها ملف واحد.

---

## ١. [[umask 077; echo '...' > ~/.vault_pass]]

| الحتة | معناها |
|---|---|
| [[umask 077]] | أي ملف يتعمل بعد كده في الجلسة دي صلاحياته لصاحبه بس |
| [[echo '...' > ~/.vault_pass]] | باسورد الـ vault في ملف في الـ home، **برّه** الريبو |

~~~text ls -la ~/.vault_pass
-rw------- 1 root root 19 Oct 27 22:41 /root/.vault_pass
~~~

[[19]] = ١٨ حرف + سطر جديد. على جهازك استخدم باسورد طويل عشوائي ([[openssl rand -base64 32]]) واحفظه في password manager، لأنه لو ضاع الملفات المشفّرة مش هتتفتح تاني.

---

## ٢. [[ansible-vault encrypt ... --vault-password-file ~/.vault_pass]]

بيشفّر الملف مكانه. وبعدها:

~~~text head -3 group_vars/web/vault.yml
$ANSIBLE_VAULT;1.1;AES256
39303131376230613566643838623161373762623631303839376131346533333035306131663831
3932393332636337653662323233333134353333636534610a656437633166666232393665326131
~~~

| الحتة | معناها |
|---|---|
| [[$ANSIBLE_VAULT]] | علامة: الملف ده vault |
| [[1.1]] | نسخة الصيغة |
| [[AES256]] | نوع التشفير |
| الأرقام | الملف المشفّر مكتوب hex (أرقام و a-f) |

ده اللي هيتعمل له commit. ولو عايز تعدّل: [[ansible-vault edit group_vars/web/vault.yml]] بيفكّه في ملف مؤقت ويفتحه في الـ editor ويشفّره تاني لما تقفل. و [[ansible-vault create]] لملف جديد من الأول، و [[ansible-vault rekey]] لتغيير الباسورد.

---

## ٣. [[ansible-vault view]]: اقراه من غير ما تفكّه على الديسك

~~~text الناتج
vault_db_password: test-only-not-a-real-password
~~~

---

## ٤. الـ playbook: [[no_log: true]]

~~~yaml
# secrets.yml
- name: App secrets
  hosts: web
  become: true
  tasks:
    - name: Write .env
      ansible.builtin.template:
        src: templates/env.j2
        dest: /etc/myapp.env
        owner: root
        group: root
        mode: "0600"
      no_log: true
~~~

~~~text templates/env.j2
DB_USER=myapp
DB_PASSWORD={{ db_password }}
~~~

[[mode: "0600"]] لأن الملف فيه باسورد: root بس يقراه (لو التطبيق شغال بيوزر تاني، خلّي [[owner]] اليوزر ده). و [[no_log: true]] بيمنع Ansible يطبع أي حاجة من الـ task دي.

### من غير باسورد

~~~text ansible-playbook secrets.yml
PLAY [App secrets] *************************************************************
[ERROR]: Attempting to decrypt but no vault secrets found.
~~~

### بالباسورد

~~~text ansible-playbook secrets.yml --vault-password-file ~/.vault_pass
TASK [Write .env] **************************************************************
changed: [web2]
changed: [web1]

PLAY RECAP *********************************************************************
web1                       : ok=2    changed=1    ...
~~~

~~~text على السيرفر: ls -l /etc/myapp.env
-rw------- 1 root root 56 Oct 27 22:41 /etc/myapp.env
~~~

---

## ٥. ليه [[no_log]] مهم: [[--diff]] بيطبع الملف

غيّرت سطر في الـ template، وشغّلت بـ [[--diff]]. **مع** [[no_log]]:

~~~text الناتج
TASK [Write .env] **************************************************************
changed: [web1]
~~~

ومن غيره:

~~~text الناتج
TASK [Write .env] **************************************************************
--- before: /etc/myapp.env
+++ after: /root/.ansible/tmp/ansible-local-13331j6ss6qa/tmpojuonla5/env.j2
@@ -1,2 +1,2 @@
-DB_USER=myapp
+DB_USER=myapp2
 DB_PASSWORD=test-only-not-a-real-password
~~~

الباسورد اتطبع كامل. التشفير في Git ملوش لازمة لو الترمنال (أو لوج CI) طبعه.

---

## ٦. الأوامر السريعة كمان محتاجة الباسورد

بعد ما عملت [[group_vars/web/vault.yml]]:

~~~text ansible web1 -b -a "ls -l /etc/myapp.env"
[ERROR]: Attempting to decrypt but no vault secrets found.
~~~

لأن Ansible بيقرا group_vars بتاعة web1 حتى في أمر سريع. الحل سطر في [[ansible.cfg]]:

~~~text ansible.cfg
[defaults]
inventory = inventory.ini
private_key_file = ~/.ssh/id_ed25519
vault_password_file = ~/.vault_pass
~~~

وبعدها كل الأوامر شغالة من غير [[--vault-password-file]].

---

## ٧. [[encrypt_string]]: قيمة واحدة بس

~~~text الناتج
api_key: !vault |
          $ANSIBLE_VAULT;1.1;AES256
          37633161383130396630613361393538316566396537656239313934323539376330313133623835
          6237343538303734623062613836353763653630636561630a343762323430353561666331323336
          ...
~~~

تنسخه زي ما هو جوه أي ملف YAML مكشوف. [[!vault |]] بيقول لـ Ansible «القيمة اللي جاية مشفّرة». مفيد لما يبقى عندك secret واحد ومش عايز ملف كامل.

---

## الخلاصة

~~~text
~/.vault_pass (600، برّه الريبو)        باسورد الـ vault
ansible-vault encrypt / edit / view     شفّر / عدّل / اقرا
vars.yml + vault.yml و vault_ قبل الاسم  تعرف المتغير جاي منين
no_log: true                            على أي task فيها secret، وإلا --diff يطبعه
vault_password_file في ansible.cfg      عشان الأوامر السريعة متقعش
~~~`,
        lines: [
          "اعمل ملف باسورد الـ vault بصلاحيات لصاحبه بس ([[umask 077]])، برّه الريبو. (باسورد تجربة.)",
          "شفّر ملف المتغيرات السرية مكانه بـ AES256.",
          "اتأكد إنه اتشفّر: أول سطر [[$ANSIBLE_VAULT;1.1;AES256]].",
          "اقرا المحتوى من غير ما تفكّه على الديسك.",
          "شغّل الـ playbook وهو بيفك التشفير في الذاكرة.",
          "شفّر قيمة واحدة تتحط جوه ملف YAML مكشوف."
        ],
        sol: R`على المعمل: الملف بعد التشفير بدأ بـ [[$ANSIBLE_VAULT;1.1;AES256]]، و [[view]] طبع [[vault_db_password: test-only-not-a-real-password]]. من غير باسورد: [[[ERROR]: Attempting to decrypt but no vault secrets found.]]. بالباسورد: [[changed=1]] لكل سيرفر، و [[/etc/myapp.env]] اتعمل بـ [[-rw-------]] root.

مع [[no_log: true]] و [[--diff]]: سطر [[changed]] بس من غير diff. من غيره: diff فيه [[DB_PASSWORD=test-only-not-a-real-password]] مكشوف.`
      }
    ]
  }
]);
