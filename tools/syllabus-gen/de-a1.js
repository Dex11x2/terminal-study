// German A1 syllabus. Goethe's exam specification says what is tested; the ÖSD and telc A1 exams, the BAMF
// Rahmencurriculum and the CEFR Companion volume fill in the situations and skills Goethe leaves out.
// Every item names its source and page.
//   node tools/syllabus-gen/de-a1.js    -> syllabus/de-a1.json (the syllabus) and syllabus/de-a1.md (to read and review)
// Needs (in .cache/de/, git-ignored; how to get them: tools/de/README.md):
//   pz.txt       pdftotext -layout of «Goethe-Zertifikat A1: Start Deutsch 1, Prüfungsziele, Testbeschreibung»
//                (Goethe-Institut, A1_SD1_Pruefziele_07, 19.04.2022), https://goethe.de/pro/relaunch/prf/et/Pruefungsziele_Testbeschreibung_A1_SD1.pdf
//   wikt-a1.json made by tools/syllabus-gen/de-wikt.js from the kaikki.org Wiktionary dump (CC BY-SA 4.0)
//   src/rc.txt   pdftotext -layout of the Rahmencurriculum (read by de-rc.js)
//   src/cefr-desc.json  the CEFR descriptor spreadsheet as JSON (tools/de/xlsx-rows.py)
// The ÖSD and telc exam parts are typed in from their model tests here; the words they add are in de-a1-extra.js.
// The Rahmencurriculum and the CEFR are «all rights reserved»: the repo keeps their headings, levels, pages and
// our Arabic summary of each goal (de-a1-ar.js), never their sentences.
// The small inventories (exam parts, speech acts, strategies, notions, themes, grammar, word groups) are typed in
// from the PDF here, with their page; the alphabetical word list (≈650 entries) is read by de-a1-words.js.
// Only names and headwords are kept: Goethe's example sentences stay out of the repo (copyright).
const fs = require('fs');
const { parseWords } = require('./de-a1-words');
const { parseRC, FIELDS } = require('./de-rc');
const { EXTRA } = require('./de-a1-extra');
const AR = require('./de-a1-ar');

const PDF = { t: 'Goethe-Zertifikat A1: Start Deutsch 1, Prüfungsziele, Testbeschreibung (2022)', url: 'https://goethe.de/pro/relaunch/prf/et/Pruefungsziele_Testbeschreibung_A1_SD1.pdf' };
const MODEL = { t: 'Goethe-Zertifikat A1: Übungssatz 01', url: 'https://www.goethe.de/pro/relaunch/prf/materialien/A1_sd1/sd_1_uebungssatz01.pdf' };
const WIKT = { t: 'Wiktionary (kaikki.org extract, CC BY-SA 4.0)', url: 'https://kaikki.org/dictionary/German/' };
const OSD = { t: 'ÖSD Zertifikat A1: Modellsatzbroschüre mit Informationen (5. Auflage 2024)', url: 'https://www.osd.at/wp-content/uploads/2024/09/ZA1-Modellsatzbroschure_WEB.pdf' };
const TELC = { t: 'telc Deutsch A1 für Zuwanderer: Übungstest 1 (5. Auflage 2021)', url: 'https://shop.telc.net/media/catalog/product/file//2/0/20201225_5069-b00-010104_web.pdf' };
const DTZ = { t: 'Deutsch-Test für Zuwanderer A2–B1: Prüfungsziele, Testbeschreibung', url: 'https://www.goethe.de/resources/files/pdf209/dtz_pruefungshandbuch.pdf' };
const RCREF = { t: 'Rahmencurriculum für Integrationskurse Deutsch als Zweitsprache (BAMF, Goethe-Institut, 2017)', url: 'https://www.goethe.de/resources/files/pdf209/rahmencurriculum-integrationskurs_20171.pdf' };
const CEFRREF = { t: 'CEFR Companion volume (Council of Europe 2020): descriptor spreadsheet', url: 'https://rm.coe.int/cefr-descriptors-2020-/16809ed2c7', doc: 'https://rm.coe.int/16809ea0d4' };

// ÖSD Zertifikat A1 (Modellsatzbroschüre, Kapitel 2 «Prüfungsaufgaben», S. 21–25; Bewertung S. 33)
const EXAM_OSD = [
  ['lesen-1', 'Lesen Aufgabe 1', '٥ مواقف و ٦ إعلانات: تختار الإعلان المناسب لكل موقف (واحد زيادة)', 21],
  ['lesen-2', 'Lesen Aufgabe 2', '٣ نصوص قصيرة، وعلى كل واحد سؤالين: Ja ولا Nein', 21],
  ['lesen-3', 'Lesen Aufgabe 3', '٥ نصوص و ٦ صور: توصّل كل نص بصورته', 21],
  ['hoeren-1', 'Hören Aufgabe 1', '٥ نصوص مسموعة و ٦ صور، مرة واحدة: توصّل كل نص بصورته', 22],
  ['hoeren-2', 'Hören Aufgabe 2', 'رسالة مسجّلة (أنسرماشين أو خدمة تليفون) بتتسمع مرتين: تكتب ٥ معلومات ناقصة وإنت بتسمع (أرقام، مواعيد، أسامي متهجّية)', 22],
  ['hoeren-3', 'Hören Aufgabe 3', '٥ مقابلات قصيرة، مرة واحدة: تختار الإجابة الصح', 22],
  ['schreiben-1', 'Schreiben Aufgabe 1', 'تملا استمارة من معلومات جاهزة (١٠ خانات: اختيار وكتابة)', 24],
  ['schreiben-2', 'Schreiben Aufgabe 2', 'ترد على إيميل شخصي فيه ٣ أسئلة، حوالي ٣٠ كلمة', 24],
  ['sprechen-1', 'Sprechen Aufgabe 1', 'تعرّف نفسك: تختار ٤ مواضيع من ٦ وتتكلم عنهم', 24],
  ['sprechen-2', 'Sprechen Aufgabe 2', 'تختار صورة من ٣ (موقف يومي) وتوصفها بمساعدة ٤ أسئلة', 24],
  ['sprechen-3', 'Sprechen Aufgabe 3', 'حوار مع الممتحن (رول بلاي) على نفس الصورة: تبادل الكلام، و Du ولا Sie', 24],
  ['bestehen', 'Bestehen', 'جزئين: المكتوب (قراية وسمع وكتابة) ٧٥ نقطة والنجاح من ٣٨، بحد أدنى ٦ في القراية و ٦ في السمع و ٤ في الإيميل؛ والكلام ٢٥ نقطة والنجاح من ١٢، وقبله ١٠ دقايق تحضير', 33],
  ['plurizentrik', 'Plurizentrik', 'النصوص والأصوات من النمسا وألمانيا وسويسرا: كلمات زي Jänner و Grüß Gott لازم تتعرف', 22],
];
// telc Deutsch A1 für Zuwanderer (Übungstest 1: Testformat S. 5, Mündliche Prüfung S. 25, Punkte S. 27)
const EXAM_TELC = [
  ['sprachbausteine', 'Sprachbausteine', '١٠ أسئلة اختيار على الكلمات والقواعد: تختار الكلمة المناسبة لكل فراغ في نصين', 5],
  ['hoeren-a', 'Hören Teil A', '٤ أسئلة صح ولا غلط: تلقط معلومة محددة', 5],
  ['hoeren-b', 'Hören Teil B', '٥ أسئلة اختيار على التفاصيل، خصوصًا الأرقام والحروف', 5],
  ['hoeren-antworten-a', 'Hören und antworten Teil A', 'تسمع ٣ كلامات قصيرة وتختار الرد المناسب لكل واحد', 5],
  ['hoeren-antworten-b', 'Hören und antworten Teil B', 'نفس الفكرة مع ٤ كلامات', 5],
  ['lesen-a', 'Lesen Teil A', '٣ نصوص توصّلها بعناوينها (الفكرة العامة)', 5],
  ['lesen-b', 'Lesen Teil B', 'نص و ٣ جمل صح ولا غلط (التفاصيل)', 5],
  ['lesen-c', 'Lesen Teil C', '٣ أسئلة اختيار: تلاقي معلومة محددة (إعلانات جرنال)', 5],
  ['schreiben-a', 'Schreiben Teil A', 'تملا استمارة لحد تاني من معلومات نص', 5],
  ['schreiben-b', 'Schreiben Teil B', 'رسالة قصيرة (إيميل) فيها ٣ نقط، حوالي ٣٠ كلمة', 5],
  ['sprechen-a', 'Sprechen Teil A', 'تعرّف نفسك من ورقة كلمات، وتتهجّى، وتقول أرقام (٣ دقايق)', 25],
  ['sprechen-b', 'Sprechen Teil B', 'تسأل وتجاوب عن موضوعين يوميين بالكروت (٤ دقايق)', 25],
  ['sprechen-c', 'Sprechen Teil C', 'تطلب وتقترح وتعرض وتنصح، وترد على ده (٤ دقايق)، ومفيش وقت تحضير', 25],
  ['bestehen', 'Bestehen', 'الامتحان ١٠٠ نقطة والنجاح من ٦٠: كلمات وقواعد ١٥، وسمع ٣١، وقراية ٢٤، وكتابة ١٠، وكلام ٢٠', 27],
];

// ---------- the exam (Kapitel 4, S. 26–53; the table on S. 9) ----------
const EXAM = [
  ['hoeren-1', 'Hören Teil 1', 'كلام قصير بين اتنين في الحياة اليومية، بيتسمع مرتين، واختيار من ٣', 27],
  ['hoeren-2', 'Hören Teil 2', 'إعلانات في الأماكن العامة (محطة، مطار، سوبرماركت)، بتتسمع مرة واحدة، صح ولا غلط', 28],
  ['hoeren-3', 'Hören Teil 3', 'رسايل على الأنسرماشين، بتتسمع مرتين، واختيار من ٣', 29],
  ['lesen-1', 'Lesen Teil 1', 'نصين قصيرين (ملاحظة، إيميل، رسالة)، صح ولا غلط', 32],
  ['lesen-2', 'Lesen Teil 2', 'إعلانات صغيرة: ١٠ إعلانات و ٥ مواقف، تختار الإعلان المناسب', 33],
  ['lesen-3', 'Lesen Teil 3', 'يافطات ولافتات قصيرة، صح ولا غلط', 34],
  ['schreiben-1', 'Schreiben Teil 1', 'تكمّل ٥ خانات ناقصة في استمارة (تسجيل، طلب…) من معلومات نص', 37],
  ['schreiben-2', 'Schreiben Teil 2', 'رسالة قصيرة (اعتذار، طلب معلومة، دعوة) فيها ٣ نقط مطلوبة، حوالي ٣٠ كلمة', 38],
  ['sprechen-1', 'Sprechen Teil 1', 'تعرّف نفسك، وتتهجّى كلمة، وتقول رقم', 44],
  ['sprechen-2', 'Sprechen Teil 2', 'تسأل وتجاوب عن موضوع من كروت كلمات', 44],
  ['sprechen-3', 'Sprechen Teil 3', 'تطلب حاجة وترد على طلب من كروت صور', 44],
  ['bewertung-schreiben', 'Bewertung Schreiben', 'معايير تصحيح الكتابة: النقط المطلوبة، ومناسبة النص لنوعه (التحية والختام)، وأمثلة إجابات بدرجاتها', 42],
  ['bewertung-sprechen', 'Bewertung Sprechen', 'معايير تصحيح الكلام في الأجزاء التلاتة (٣ و ٦ و ٦ نقط)', 45],
  ['bestehen', 'Bestehen', 'الامتحان ١٠٠ نقطة: سمع وقراية وكتابة وكلام ٢٥ لكل واحد. النجاح من ٦٠ نقطة', 9],
];

// ---------- inventories (Kapitel 5) ----------
const SPRACHHANDLUNGEN = { page: 55, groups: {
  'Informationsaustausch': ['benennen/definieren/identifizieren', 'beschreiben', 'erklären', 'berichten', 'Mitteilung/Ankündigung', 'Nachfrage', 'Zweck und Bestimmung angeben', 'Wissen/Unwissen'],
  'Bewertung, Kommentar': ['Meinung/Ansicht', 'Zufriedenheit/Unzufriedenheit', 'Gefallen/Missfallen', 'Interesse/Desinteresse', 'Billigung/Missbilligung', 'Zustimmung/Ablehnung', 'Wunsch', 'Vorlieben', 'Wichtigkeit', 'verneinen/Widerspruch', 'Beschwerde', 'Rechtfertigung/Begründung'],
  'Gefühlsausdruck': ['Freude/Bedauern', 'Neigung/Abneigung', 'Gelassenheit/Gleichgültigkeit', 'Mitgefühl', 'Erstaunen/Überraschung', 'Hoffnung', 'Sorge/Befürchtung', 'Enttäuschung'],
  'Handlungsregulierung': ['Bitte/Aufforderung', 'Bestätigung', 'Hilfe anbieten/annehmen und ablehnen', 'Bestellung/Wunsch', 'Rat/Empfehlung/Warnung', 'Erlaubnis/Genehmigung', 'Vorschlag', 'Versprechung', 'Einladung', 'Verabredung'],
  'Soziale Konventionen': ['Kontaktaufnahme: ansprechen', 'grüßen', 'sich/jemanden vorstellen', 'über das Befinden sprechen', 'gute Wünsche', 'Gratulation', 'eine Anerkennung aussprechen/ein Kompliment machen', 'Dank', 'Entschuldigung', 'Verabschiedung'],
} };
const STRATEGIEN = { page: 66, groups: {
  'Redeorganisation': ['eine Äußerung einleiten', 'eine Äußerung abschließen', 'um das Wort bitten', 'Zuhören signalisieren', 'zum Sprechen auffordern', 'gemeinsames Wissen andeuten', 'Beispiele geben', 'das Thema wechseln', 'etwas hervorheben', 'Vermeidung', 'Höflichkeit', 'Abschwächung'],
  'Verständnissicherung': ['Verständnishilfen anbieten', 'um Verständnishilfen bitten', 'Kompensation'],
} };
const NOTIONEN = { page: 70, groups: {
  'Existenz, Besitz/Zugehörigkeit': ['(nicht) sein', 'anwesend/abwesend sein', '(nicht) verfügbar sein', '(nicht) vorkommen', 'Inklusion/Exklusion', 'Besitz/Zugehörigkeit ausdrücken'],
  'Raum': ['Ort', 'Herkunft', 'Richtung', 'Distanz'],
  'Zeit': ['Zeitpunkt', 'Zeitangaben', 'Dauer', 'Häufigkeit'],
  'Quantität': ['Zahlen/Mengenangaben', 'Menge', 'Grad', 'Dimension/Maßangabe'],
  'Art und Weise': ['physisch', 'Wertung', 'Vergleich'],
  'Logische Verknüpfung': ['Grund', 'Bedingung', 'Aufzählung/Alternative'],
  'Modales': ['Fähigkeit', 'Möglichkeit', 'Notwendigkeit/Verpflichtung'],
} };
const THEMEN = { page: 76, groups: {
  'Person': ['Name', 'Adresse', 'Telefon', 'Geburtsdatum', 'Geburtsort', 'Alter', 'Geschlecht', 'Familienstand/Familie', 'Persönliche Beziehungen', 'Staatsangehörigkeit/Nationalität/Herkunft', 'Aussehen', 'Gewohnheiten/Tagesablauf'],
  'Wohnen': ['Wohnung', 'Räume', 'Einrichtung/Möbel', 'Haushalt/technische Einrichtungen', 'Miete/Mietverhältnis', 'Wohnungswechsel'],
  'Umwelt': ['Pflanzen', 'Tiere', 'Klima/Wetter'],
  'Reisen/Verkehr': ['privater und öffentlicher Verkehr', 'Reisen', 'Unterkunft', 'Gepäck'],
  'Essen/Trinken': ['Nahrungsmittel', 'Mahlzeiten', 'Speisen', 'Getränke', 'Lokale (Restaurant, Café)'],
  'Einkaufen/Gebrauchsartikel': ['Geschäfte', 'Preis/Bezahlen', 'Lebensmittel', 'Kleidung'],
  'Dienstleistungen': ['Post', 'Telekommunikation', 'Banken', 'Polizei'],
  'Erziehung/Ausbildung/Lernen': ['Kinderbetreuung', 'Schule', 'Sprachen lernen'],
  'Arbeit/Beruf': ['Arbeitsplatz', 'Urlaub'],
  'Freizeit/Unterhaltung': ['Interessen', 'Sport treiben', 'Radio/Fernsehen', 'Internet', 'Lektüre/Presse'],
} };
// Grammatik: Morphologische und syntaktische Strukturen, S. 100–106
const GRAMMATIK = { page: 100, groups: {
  'Verb': ['Präsens aller Verben der Wortliste', 'Perfekt: arbeiten, bleiben, essen, fahren, fragen, glauben, haben, lesen, lernen, machen, schlafen, sehen, passieren, trinken, verstehen', 'ausgewählte Partizipien (geöffnet, geschlossen)', 'Präteritum von haben und sein (1. und 3. Person: hatte, war)', 'Indikativ', 'Konjunktiv II als feste Wendung: ich möchte, ich würde gern, ich hätte gern', 'Imperativ (du, ihr, Sie)', 'Modalverben im Präsens: können, wollen, müssen, dürfen, sollen, möchten', 'Verben mit trennbarem Präfix'],
  'Nomen': ['Genus: der/die/das', 'Singular und Plural der Nomen der Wortliste', 'Kasus: Nominativ, Akkusativ, Dativ', 'Genitiv bei Eigennamen (Karls Freunde)', 'Genitiv rezeptiv (die Nummer des Wagens)'],
  'Artikelwörter': ['bestimmter Artikel der/die/das/die', 'Demonstrativartikel dieser/diese/dieses', 'unbestimmter Artikel ein/eine/ein', 'Nullartikel (Ich esse gern Fleisch.)', 'Possessivartikel mein, dein, sein, ihr, Ihr, unser, euer', 'Negativartikel kein'],
  'Pronomen': ['Indefinitpronomen man, etwas, nichts, mehr, alles, welch-', 'Personalpronomen im Nominativ', 'Personalpronomen im Akkusativ (mich, dich, ihn, sie, es)', 'Personalpronomen im Dativ bei danken, gehören, helfen, es geht (mir, dir, euch, Ihnen)', 'Reflexivpronomen sich/uns (Wir sehen uns morgen.)', 'Fragepronomen wer, was, wen, wem'],
  'Adjektiv': ['prädikativ (Das Haus ist modern.)', 'adverbial (Ich lese gern.)', 'Komparation (gern, lieber; gut, besser)', 'Zahlwörter (Grund- und Ordnungszahlen)'],
  'Präposition temporal': ['an + Dativ (am Montag)', 'ab + Dativ (ab Februar)', 'für + Akkusativ (für drei Wochen)', 'in + Dativ (im Sommer)', 'nach + Dativ (nach dem Essen)', 'über (über 20 Minuten)', 'um (um halb sieben)', 'von … bis', 'vor + Dativ (vor dem Konzert)'],
  'Präposition lokal': ['an + Dativ/Akkusativ', 'auf + Dativ', 'aus + Dativ (aus Italien)', 'bei + Dativ (bei Familie Müller)', 'in + Dativ/Akkusativ (im Park, in die Stadt)', 'nach + Ländernamen (nach Paris)', 'von … nach', 'unter + Dativ (unter der Nummer)', 'zu + Dativ (zur Schule)'],
  'Präposition modal': ['aus + Dativ (aus Plastik)', 'für + Akkusativ (für dich)', 'mit + Dativ (mit dem Auto)', 'ohne + Akkusativ (ohne Hilfe)'],
  'Syntax': ['Verbzweitstellung', 'Verbergänzung: Nominativ, Akkusativ, Dativ (danken, gehören, geben, helfen), Lokal-, Qualitativergänzung', 'Satzklammer (trennbare Verben, Modalverb + Infinitiv, Perfekt)', 'Negation mit nicht und kein', 'Entscheidungsfrage (Ja/Nein)', 'Ergänzungsfrage (W-Fragen)', 'Satzverbindungen: und, oder, aber, denn, dann'],
  'Wortbildung': ['Nomen auf -er (Arbeiter) und -ung (Wohnung)', 'feminine Formen auf -in (Kollegin)', 'Komposita (Reisegruppe, Zahnarzt, Passfoto)', 'Partizip als Nomen (Reisender)', 'Adjektive mit un-, -los, -bar (unbekannt, arbeitslos, erreichbar)', 'Farbkomposita (hellblau, dunkelblau)'],
} };
// Wortgruppenliste, S. 78–80 (13 groups)
const WORTGRUPPEN = { page: 78, groups: {
  'Zahlen': ['Grundzahlen 0–100, hundert, tausend, Million, Milliarde', 'Ordnungszahlen: erste, zweite, dritte, vierte …', 'Bruchzahlen: ein halb, ein Viertel'],
  'Datum': ['Jahreszahlen (neunzehnhundertneunundneunzig, zweitausendvierzehn)', 'Datum: der erste März, am zwölften Vierten'],
  'Uhrzeit': ['offizielle Uhrzeit (sieben Uhr fünfzehn, dreizehn Uhr siebzehn)', 'umgangssprachliche Uhrzeit (Viertel vor zwei, halb drei, fünf nach eins)'],
  'Zeitmaße': ['die Sekunde, die Minute, die Stunde, der Tag, die Woche, das Jahr'],
  'Wochentage': ['Montag bis Sonntag, Samstag/Sonnabend, das Wochenende'],
  'Tageszeiten': ['der Morgen, der Vormittag, der Mittag, der Nachmittag, der Abend, die Nacht'],
  'Monate': ['Januar bis Dezember'],
  'Jahreszeiten': ['der Frühling/das Frühjahr, der Sommer, der Herbst, der Winter'],
  'Währungen': ['Euro, Cent'],
  'Maße und Gewichte': ['Meter, Zentimeter, Kilometer, Quadratmeter', 'Grad über/unter Null, Prozent', 'Liter, Gramm, Pfund, Kilo'],
  'Länder und Nationalitäten': ['Land, Bewohner, Nationalität (Deutschland, der/die Deutsche, deutsch)', 'Angabe der eigenen Herkunft (Ägypten, Ägypter/Ägypterin, ägyptisch)'],
  'Farben': ['schwarz, weiß, grau, rot, blau, gelb, grün, braun'],
  'Himmelsrichtungen': ['der Norden, der Süden, der Westen, der Osten'],
} };

// ---------- build ----------
const slug = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ß/g, 'ss').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const items = [];
const add = (kind, group, t, page, extra = {}) => items.push({ id: kind + ':' + slug((group ? group + ' ' : '') + t), kind, group, t, ref: { ...PDF, page }, ...extra });

for (const [id, t, ar, page] of EXAM) items.push({ id: 'exam:' + id, kind: 'exam', exam: 'goethe', group: t.split(' ')[0], t, ar, ref: { ...PDF, page }, model: MODEL });
for (const [id, t, ar, page] of EXAM_OSD) items.push({ id: 'exam:osd-' + id, kind: 'exam', exam: 'osd', group: t.split(' ')[0], t, ar, ref: { ...OSD, page } });
for (const [id, t, ar, page] of EXAM_TELC) items.push({ id: 'exam:telc-' + id, kind: 'exam', exam: 'telc', group: t.split(' ')[0], t, ar, ref: { ...TELC, page } });
items.push({ id: 'exam:dtz', kind: 'exam', exam: 'dtz', group: 'DTZ', t: 'Deutsch-Test für Zuwanderer', ref: { ...DTZ, page: 1 },
  skip: 'امتحان A2 و B1، مش A1: بيدخل في منهج A2.' });
for (const [kind, inv] of [['act', SPRACHHANDLUNGEN], ['strategy', STRATEGIEN], ['notion', NOTIONEN], ['theme', THEMEN], ['grammar', GRAMMATIK], ['group', WORTGRUPPEN]])
  for (const [g, list] of Object.entries(inv.groups)) for (const t of list) add(kind, g, t, inv.page);

const wikt = JSON.parse(fs.readFileSync('.cache/de/wikt-a1.json', 'utf8'));
const words = parseWords(fs.readFileSync('.cache/de/pz.txt', 'utf8'));
const seen = new Set();
for (const w of words) {
  const key = w.w.split('/')[0].replace(/\(.*?\)-?/g, '').replace(/-$/, '').trim();
  const ents = wikt[key] || [];
  const e = ents.find(x => w.art ? x.pos === 'noun' : x.pos !== 'name') || ents[0];
  let id = 'word:' + slug((w.art || '') + ' ' + w.w);
  if (seen.has(id)) id += '-' + w.page; seen.add(id);
  const it = { id, kind: 'word', t: w.raw, w: w.w, ref: { ...PDF, page: w.page } };
  if (w.art) it.art = w.art;
  if (w.pl) it.pl = w.pl;
  if (w.plOnly) it.plOnly = true;
  if (w.refl) it.refl = true;
  if (w.sub) it.sub = true;                    // a derived entry («die Abfahrt» under «abfahren»): not counted in the ≈650
  if (e) {
    it.wikt = { pos: e.pos };
    if (e.ipa) it.wikt.ipa = e.ipa;
    if (e.audio && e.audio[0]) it.wikt.audio = e.audio[0];
    if (e.verb && e.verb.aux && e.verb.aux.length) it.wikt.aux = [...new Set(e.verb.aux)];
    if (e.verb && e.verb.pp) it.wikt.pp = e.verb.pp;
  } else it.wikt = null;                       // a phrase («auf sein») or a stem («jed-»): checked by hand
  items.push(it);
}

// ---------- the Rahmencurriculum: every A1 goal, with our Arabic summary ----------
const rcA1 = parseRC(fs.readFileSync('.cache/de/src/rc.txt', 'utf8')).filter(g => g.level === 'A1');
const bySec = {}; for (const g of rcA1) (bySec[g.sec] = bySec[g.sec] || []).push(g);
for (const [sec, gs] of Object.entries(bySec)) {
  const ar = AR.RC[sec];
  if (!ar || ar.length !== gs.length) throw new Error(`Rahmencurriculum ${sec}: ${gs.length} A1 goals in the PDF, ${ar ? ar.length : 0} summaries in de-a1-ar.js`);
  gs.forEach((g, n) => items.push({ id: 'rc:' + slug(sec) + '-' + (n + 1), kind: 'situation', group: FIELDS[g.field], field: g.field, sec, secT: g.secT,
    act: g.act || null, ar: ar[n], lk: !!g.lk, ref: { ...RCREF, page: g.page } }));
}
for (const sec of Object.keys(AR.RC)) if (!bySec[sec]) throw new Error(`de-a1-ar.js has ${sec}, the PDF has no A1 goal there`);

// ---------- the CEFR: every A1 descriptor (sign-language scales left out, see the skip item) ----------
const cefr = JSON.parse(fs.readFileSync('.cache/de/src/cefr-desc.json', 'utf8')).English.slice(1);
const cefrA1 = cefr.filter(r => r[5] === 'A1' && !/^Signing/.test(r[1]) && !/^No descriptors/i.test(r[6]));
for (const r of cefrA1) {
  if (!AR.CEFR[r[0]]) throw new Error('CEFR row ' + r[0] + ' (' + r[4] + ') has no Arabic summary in de-a1-ar.js');
  items.push({ id: 'cefr:' + r[0], kind: 'cefr', group: r[2] || r[1], sub: r[3] || null, t: r[4], ar: AR.CEFR[r[0]], ref: { ...CEFRREF, row: +r[0] } });
}
const extraRows = Object.keys(AR.CEFR).filter(k => !cefrA1.some(r => r[0] === k));
if (extraRows.length) throw new Error('de-a1-ar.js has CEFR rows that are not A1 descriptors: ' + extraRows.join(', '));
items.push({ id: 'cefr:signing', kind: 'cefr', group: 'Signing competences', t: 'Signing competences (14 scales)', ref: { ...CEFRREF },
  skip: 'مقاييس لغة الإشارة: الكورس للغة المنطوقة والمكتوبة.' });

// ---------- words the ÖSD and telc model tests add (de-a1-extra.js), article and plural from Wiktionary ----------
for (const x of EXTRA) {
  const ents = wikt[x.w] || [];
  const e = ents.find(z => z.pos === 'noun') || ents.find(z => z.pos !== 'name') || null;
  const it = { id: 'word:extra-' + slug(x.w), kind: 'word', w: x.w, extra: { src: x.src, kind: x.kind, goetheExample: x.ex },
    ref: x.src === 'telc' ? { ...TELC } : { ...OSD } };
  if (e && e.pos === 'noun') { it.art = e.gender[0]; it.plural = (e.plural || [])[0] || null; }
  if (x.w === 'Medizin') { it.plural = null; it.manual = 'الجمع (Medizinen) نادر ومعناه أنواع أدوية: الكارت بيعلّمها من غير جمع'; }
  if (x.w === 'Antwortbogen') { it.art = 'der'; it.plural = 'Antwortbögen'; it.manual = 'مش في Wiktionary: كلمة مركّبة من Antwort و Bogen (der Bogen, die Bögen)'; }
  it.t = (it.art ? it.art + ' ' : '') + x.w + (it.plural ? ', die ' + it.plural : '');
  it.wikt = e ? { pos: e.pos, ipa: e.ipa || undefined, audio: (e.audio || [])[0] || undefined } : null;
  items.push(it);
}

const out = {
  course: 'de-a1',
  title: 'Deutsch A1 (Goethe-Zertifikat A1: Start Deutsch 1)',
  generated: 'tools/syllabus-gen/de-a1.js',
  sources: [PDF, MODEL, OSD, TELC, RCREF, CEFRREF, DTZ, WIKT],
  note: 'Goethe defines what is tested. Merged on 21 Nov 2026: the ÖSD ZA1 and telc «A1 für Zuwanderer» exam parts, the words their model tests add, every A1 goal of the BAMF Rahmencurriculum, and every A1 descriptor of the CEFR Companion volume. telc «Start Deutsch 1» is the same exam as Goethe A1 (made by both), so it adds nothing. Pre-A1 descriptors are not items: each one is an easier step of an A1 descriptor in the same scale.',
  items,
};
fs.writeFileSync('syllabus/de-a1.json', JSON.stringify(out, null, 1) + '\n');

// ---------- the review page ----------
const KIND = { exam: 'الامتحانات', situation: 'المواقف: أهداف A1 في منهج كورسات الاندماج (Rahmencurriculum)', cefr: 'المهارات: جمل A1 في CEFR', act: 'الأفعال الكلامية (Sprachhandlungen)', strategy: 'الاستراتيجيات', notion: 'المفاهيم العامة (Notionen)', theme: 'المواضيع (Themen)', grammar: 'القواعد', group: 'مجموعات الكلمات', word: 'الكلمات' };
const live = items.filter(i => !i.skip);
const count = k => live.filter(i => i.kind === k).length;
const ws = live.filter(i => i.kind === 'word'), goethe = ws.filter(i => !i.extra), wordsMain = goethe.filter(i => !i.sub), extra = ws.filter(i => i.extra);
const EXAMS = { goethe: 'Goethe-Zertifikat A1', osd: 'ÖSD Zertifikat A1', telc: 'telc Deutsch A1 für Zuwanderer' };
let md = `# منهج الألماني A1\n\nاتولّد بـ \`node tools/syllabus-gen/de-a1.js\`. **Goethe بيحدد اللي بيتمتحن** (الامتحان والكلمات والقواعد، نسخة ٢٠٢٢)، والباقي بيكمّل اللي Goethe مبيغطيهوش: امتحانين A1 التانيين (ÖSD و telc)، ومنهج كورسات الاندماج الرسمي في ألمانيا (Rahmencurriculum)، وجمل CEFR. كل بند تحته مرجعه ورقم صفحته.\n\n`;
md += `| الجزء | عدد البنود | المرجع |\n|---|---|---|\n`;
const SRC = { exam: 'Goethe و ÖSD و telc', situation: 'Rahmencurriculum (BAMF)', cefr: 'CEFR Companion volume 2020', word: 'Goethe، والزيادة من ÖSD و telc' };
md += Object.keys(KIND).map(k => `| ${KIND[k]} | ${k === 'word' ? `${count(k)} (${wordsMain.length} أساسية و ${goethe.length - wordsMain.length} مشتقة من Goethe، و ${extra.length} زيادة من ÖSD و telc)` : count(k)} | ${SRC[k] || 'Goethe'} |`).join('\n') + `\n| **المجموع** | **${live.length}** | |\n\n`;
md += `**فحص الكلمات على Wiktionary:** ${ws.filter(i => i.wikt).length} من ${ws.length} اتلاقوا، و ${ws.filter(i => i.wikt && i.wikt.ipa).length} ليهم IPA، و ${ws.filter(i => i.wikt && i.wikt.audio).length} ليهم تسجيل بصوت حقيقي على Wikimedia Commons. أداة وجمع كل أسماء Goethe (${goethe.filter(i => i.art).length}) متطابقين مع Wiktionary (\`node tools/syllabus-gen/de-wikt.js\`)، وأداة وجمع الأسماء الزيادة جايين منه. اللي ملهوش مدخل (بيتراجع بالإيد): ${ws.filter(i => !i.wikt).map(i => i.t).join('، ')}.\n\n`;
md += `**مستبعد بسبب:**\n\n` + items.filter(i => i.skip).map(i => `- **${i.t}**: ${i.skip}`).join('\n') + `\n- **جمل Pre-A1 في CEFR:** مش بنود لوحدها، لأن كل واحدة خطوة أسهل من جملة A1 في نفس المقياس، فبتتغطى معاها.\n- **telc «Start Deutsch 1»:** نفس امتحان Goethe A1 (اتعمل من الجهتين سوا)، فبنوده هي بنود Goethe.\n\n`;
md += `**المطلوب منك قبل أي كتابة:** تراجع القايمة دي. لو فيه موقف أو مهارة مش عايزها في الكورس، أو حاجة ناقصة، قول، وهتتعلّم «مستبعد» بالسبب أو تتضاف.\n`;

const byGroup = (list, key) => { const g = {}; list.forEach(i => (g[key(i)] = g[key(i)] || []).push(i)); return g; };
for (const k of Object.keys(KIND)) {
  const list = live.filter(i => i.kind === k);
  md += `\n## ${KIND[k]}\n\n`;
  if (k === 'exam') {
    for (const [ex, name] of Object.entries(EXAMS)) md += `### ${name}\n\n` + list.filter(i => i.exam === ex).map(i => `- **${i.t}** (ص ${i.ref.page}): ${i.ar}`).join('\n') + '\n\n';
    continue;
  }
  if (k === 'situation') {
    md += `${list.length} هدف A1 من ${parseRC(fs.readFileSync('.cache/de/src/rc.txt', 'utf8')).length} هدف في المنهج كله (A1 و A2 و B1). الأرقام دي متطابقة مع جدول الإحصائيات في آخر الـ PDF (ص ١٦٦–١٧١). مجال «Aus- und Weiterbildung» مفيهوش أهداف A1 (بيبدأ من A2). العلامة 🛈 معناها إن الهدف ليه ملاحظة «Fokus Landeskunde» (معلومة عن الحياة في ألمانيا) في المرجع.\n\n`;
    for (const [g, l] of Object.entries(byGroup(list, i => i.field + ' ' + i.group))) {
      md += `### ${g}\n\n` + l.map(i => `- ${i.ar}${i.lk ? ' 🛈' : ''} _(${i.sec}، ${i.act || '—'}، ص ${i.ref.page})_`).join('\n') + '\n\n';
    }
    continue;
  }
  if (k === 'cefr') {
    md += `${list.length} جملة A1 في ${new Set(list.map(i => i.t)).size} مقياس (رقم كل جملة هو رقمها في ملف الـ Excel الرسمي). المقاييس اللي مفيهاش جملة A1 أصلًا (زي التقارير والمقالات والاجتماعات الرسمية) مش هنا.\n\n`;
    for (const [g, l] of Object.entries(byGroup(list, i => i.group))) {
      md += `### ${g}\n\n`;
      for (const [sc, ll] of Object.entries(byGroup(l, i => i.t))) md += `- **${sc}:** ` + ll.map(i => `${i.ar} _(${i.ref.row})_`).join('؛ ') + '\n';
      md += '\n';
    }
    continue;
  }
  if (k === 'word') {
    md += `### قايمة Goethe\n\n` + goethe.map(i => (i.sub ? '' : '**') + i.t + (i.sub ? '' : '**')).join('، ') + '\n\n';
    md += `### زيادة من ÖSD و telc\n\nنص الامتحانين التجريبيين (ومعاه نصوص السمع) اتحلّل بـ spaCy، والكلمات اللي مش في قايمة Goethe اتفرزت بالإيد (\`tools/syllabus-gen/de-a1-extra.js\` فيه الطريقة). * = Goethe بيستخدمها في أمثلته بس، مش كلمة في القايمة.\n\n`;
    md += `- **لغة الأسئلة** (اللي ميعرفهاش يخسر نقط قبل ما يقرا النص): ` + extra.filter(i => i.extra.kind === 'instruction').map(i => i.t + (i.extra.goetheExample ? '*' : '') + ` _(${{ osd: 'ÖSD', telc: 'telc', both: 'الاتنين' }[i.extra.src]})_`).join('، ') + '\n';
    md += `- **كلمات يومية:** ` + extra.filter(i => i.extra.kind === 'everyday').map(i => i.t + (i.extra.goetheExample ? '*' : '') + ` _(${{ osd: 'ÖSD', telc: 'telc', both: 'الاتنين' }[i.extra.src]})_`).join('، ') + '\n';
    continue;
  }
  md += Object.entries(byGroup(list, i => i.group)).map(([g, l]) => `- **${g}:** ${l.map(i => i.t).join('، ')}`).join('\n') + '\n';
}
fs.writeFileSync('syllabus/de-a1.md', md);
console.log(Object.keys(KIND).map(k => k + ' ' + count(k)).join(', '), '| total', live.length, '| skipped', items.length - live.length);
