// Words the other A1 exams use that Goethe's A1 list does not have as headwords.
// How they were found: the text of the ÖSD ZA1 Modellsatz (2024) and the telc «Deutsch A1 für Zuwanderer»
// Übungstest 1 (2021), with their listening transcripts, went through spaCy (tools/de/lemmas.py); every lemma
// that is not a Goethe A1 headword was listed (412, many of them lemmatiser slips, place names, the exams'
// own technical words, or compounds of A1 words, which all three exams allow). The everyday words and the
// words of the task instructions were picked from that list by hand. Article and plural come from Wiktionary
// (tools/syllabus-gen/de-wikt.js), since the exams publish no list for them.
//   src: where they were seen (osd, telc, both). kind: instruction (the language of the tasks) or everyday.
//   ex: true when the word only shows up inside one of Goethe's example sentences (a reader meets it, it is not a headword).
const EXTRA = [
  // the language of the tasks: a reader who does not know these loses points before reading the text
  ['markieren', 'telc', 'instruction'], ['passend', 'osd', 'instruction'], ['Lücke', 'telc', 'instruction'],
  ['Überschrift', 'telc', 'instruction'], ['Situation', 'both', 'instruction'], ['Kreuz', 'osd', 'instruction'],
  ['Antwortbogen', 'telc', 'instruction', true], ['Blatt', 'osd', 'instruction'], ['Zeile', 'osd', 'instruction'],
  ['Punkt', 'both', 'instruction'], ['wählen', 'telc', 'instruction'], ['beantworten', 'both', 'instruction'],
  ['zweimal', 'telc', 'instruction'], ['Nachricht', 'both', 'instruction'],
  // everyday words
  ['Supermarkt', 'telc', 'everyday', true], ['Fahrt', 'telc', 'everyday', true], ['Büro', 'osd', 'everyday', true],
  ['Käse', 'osd', 'everyday', true], ['Suppe', 'osd', 'everyday'], ['Tablette', 'osd', 'everyday'],
  ['Medizin', 'telc', 'everyday'], ['Temperatur', 'telc', 'everyday'], ['kalt', 'telc', 'everyday', true],
  ['heiß', 'telc', 'everyday'], ['nett', 'telc', 'everyday'], ['freundlich', 'telc', 'everyday'],
  ['täglich', 'osd', 'everyday'], ['kostenlos', 'telc', 'everyday'], ['Besuch', 'osd', 'everyday', true],
  ['Besucher', 'both', 'everyday'], ['Park', 'osd', 'everyday', true], ['Fest', 'both', 'everyday'],
  ['Idee', 'telc', 'everyday'], ['Spiel', 'telc', 'everyday', true], ['gemeinsam', 'osd', 'everyday'],
  ['genau', 'osd', 'everyday'], ['wieder', 'both', 'everyday'], ['doch', 'telc', 'everyday', true],
  ['jemand', 'osd', 'everyday'], ['sonst', 'osd', 'everyday'], ['besonders', 'telc', 'everyday'],
  ['endlich', 'telc', 'everyday'], ['früh', 'telc', 'everyday'], ['Zahl', 'telc', 'everyday'],
  ['Person', 'osd', 'everyday', true], ['Interesse', 'osd', 'everyday'], ['Erdgeschoss', 'osd', 'everyday'],
  ['Ruhetag', 'osd', 'everyday'], ['Wäsche', 'osd', 'everyday'], ['voll', 'telc', 'everyday'],
  ['schauen', 'osd', 'everyday'], ['zeigen', 'telc', 'everyday', true], ['denken', 'osd', 'everyday'],
  ['interessieren', 'telc', 'everyday'], ['verschieden', 'osd', 'everyday'],
].map(([w, src, kind, ex]) => ({ w, src, kind, ex: !!ex }));

module.exports = { EXTRA };
