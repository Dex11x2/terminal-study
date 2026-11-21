// German A1 syllabus, built from the official Goethe exam specification. Every item names its page.
//   node tools/syllabus-gen/de-a1.js    -> syllabus/de-a1.json (the syllabus) and syllabus/de-a1.md (to read and review)
// Needs (in .cache/de/, git-ignored; how to get them: tools/de/README.md):
//   pz.txt       pdftotext -layout of «Goethe-Zertifikat A1: Start Deutsch 1, Prüfungsziele, Testbeschreibung»
//                (Goethe-Institut, A1_SD1_Pruefziele_07, 19.04.2022), https://goethe.de/pro/relaunch/prf/et/Pruefungsziele_Testbeschreibung_A1_SD1.pdf
//   wikt-a1.json made by tools/syllabus-gen/de-wikt.js from the kaikki.org Wiktionary dump (CC BY-SA 4.0)
// The small inventories (exam parts, speech acts, strategies, notions, themes, grammar, word groups) are typed in
// from the PDF here, with their page; the alphabetical word list (≈650 entries) is read by de-a1-words.js.
// Only names and headwords are kept: Goethe's example sentences stay out of the repo (copyright).
const fs = require('fs');
const { parseWords } = require('./de-a1-words');

const PDF = { t: 'Goethe-Zertifikat A1: Start Deutsch 1, Prüfungsziele, Testbeschreibung (2022)', url: 'https://goethe.de/pro/relaunch/prf/et/Pruefungsziele_Testbeschreibung_A1_SD1.pdf' };
const MODEL = { t: 'Goethe-Zertifikat A1: Übungssatz 01', url: 'https://www.goethe.de/pro/relaunch/prf/materialien/A1_sd1/sd_1_uebungssatz01.pdf' };
const WIKT = { t: 'Wiktionary (kaikki.org extract, CC BY-SA 4.0)', url: 'https://kaikki.org/dictionary/German/' };

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

for (const [id, t, ar, page] of EXAM) items.push({ id: 'exam:' + id, kind: 'exam', group: t.split(' ')[0], t, ar, ref: { ...PDF, page }, model: MODEL });
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

const out = {
  course: 'de-a1',
  title: 'Deutsch A1 (Goethe-Zertifikat A1: Start Deutsch 1)',
  generated: 'tools/syllabus-gen/de-a1.js',
  sources: [PDF, MODEL, WIKT],
  note: 'Goethe defines what is tested. Still to merge before writing (ROADMAP 5.1): the Rahmencurriculum for integration courses, the ÖSD and telc A1 specifications, and the CEFR Companion Volume can-do statements.',
  items,
};
fs.writeFileSync('syllabus/de-a1.json', JSON.stringify(out, null, 1) + '\n');

// ---------- the review page ----------
const KIND = { exam: 'الامتحان', act: 'الأفعال الكلامية (Sprachhandlungen)', strategy: 'الاستراتيجيات', notion: 'المفاهيم العامة (Notionen)', theme: 'المواضيع (Themen)', grammar: 'القواعد', group: 'مجموعات الكلمات', word: 'الكلمات' };
const count = k => items.filter(i => i.kind === k).length;
const wordsMain = items.filter(i => i.kind === 'word' && !i.sub);
let md = `# منهج الألماني A1\n\nاتولّد بـ \`node tools/syllabus-gen/de-a1.js\` من مواصفة امتحان Goethe A1 (نسخة ٢٠٢٢) و Wiktionary. كل بند تحته رقم صفحته في الـ PDF.\n\n`;
md += `| الجزء | عدد البنود |\n|---|---|\n` + Object.keys(KIND).map(k => `| ${KIND[k]} | ${k === 'word' ? `${count(k)} (${wordsMain.length} أساسية و ${count(k) - wordsMain.length} مشتقة)` : count(k)} |`).join('\n') + '\n\n';
const ws = items.filter(i => i.kind === 'word');
md += `**فحص الكلمات على Wiktionary:** ${ws.filter(i => i.wikt).length} من ${ws.length} اتلاقوا، و ${ws.filter(i => i.wikt && i.wikt.ipa).length} ليهم IPA، و ${ws.filter(i => i.wikt && i.wikt.audio).length} ليهم تسجيل بصوت حقيقي على Wikimedia Commons. أداة وجمع كل الأسماء (${ws.filter(i => i.art).length}) متطابقين مع Wiktionary (\`node tools/syllabus-gen/de-wikt.js\`). اللي ملهوش مدخل (عبارات وجذور، بتتراجع بالإيد): ${ws.filter(i => !i.wikt).map(i => i.t).join('، ')}.\n\n`;
md += `**لسه هيتضاف للمنهج قبل الكتابة (ROADMAP ٥.١):** منهج كورسات الاندماج (Rahmencurriculum)، ومواصفات ÖSD و telc لـ A1، وجمل CEFR.\n`;
for (const k of Object.keys(KIND)) {
  md += `\n## ${KIND[k]}\n\n`;
  if (k === 'word') { md += ws.map(i => (i.sub ? '' : '**') + i.t + (i.sub ? '' : '**')).join('، ') + '\n'; continue; }
  if (k === 'exam') { md += items.filter(i => i.kind === k).map(i => `- **${i.t}** (ص ${i.ref.page}): ${i.ar}`).join('\n') + '\n'; continue; }
  const groups = {}; items.filter(i => i.kind === k).forEach(i => (groups[i.group] = groups[i.group] || []).push(i.t));
  md += Object.entries(groups).map(([g, l]) => `- **${g}:** ${l.join('، ')}`).join('\n') + '\n';
}
fs.writeFileSync('syllabus/de-a1.md', md);
console.log(Object.keys(KIND).map(k => k + ' ' + count(k)).join(', '), '| total', items.length);
