// Where each item of syllabus/de-a1.json is taught (read by tools/de/syllabus.js). One line per item:
//   id | lesson | evidence
// lesson: a short alias (1.3 = unit 1, lesson 3; u4 = unit 4 as a whole, with its projects) or the lesson's cmd;
// «gap» = known hole (evidence = what's missing), «skip» = doesn't apply (evidence = why).
// evidence: a case-insensitive regex that must really be in that lesson, or the item counts as missing.
const units = [
  ['Hallo! Guten Tag!', 'Ich heiße …', 'Das Alphabet', 'Ich komme aus …', 'Die Zahlen 0–100', 'Prüfung: Sprechen Teil 1'],
  ['Wie spät ist es?', 'Am Montag um acht', 'Im Januar, im Sommer', 'Ich stehe um sieben Uhr auf', 'Hast du am Samstag Zeit?', 'Prüfung: Hören Teil 3, Schreiben Teil 2'],
  ['Ich esse gern Fisch', 'Ich möchte einen Kaffee', 'Wo finde ich Reis?', 'Was kostet das?', 'Die Rechnung, bitte!', 'Prüfung: Sprechen Teil 2 und 3, Hören Teil 2'],
  ['Das ist meine Mutter', 'Hast du Geschwister?', 'Sein Bruder, ihre Schwester', 'Wie sieht sie aus?', 'Herzlichen Glückwunsch!', 'Prüfung: Lesen Teil 1, Hören Teil 1'],
  ['Meine Wohnung hat drei Zimmer', 'Das Sofa steht im Wohnzimmer', 'Ist die Wohnung noch frei?', 'Können Sie mir helfen?', 'Hier darf man nicht rauchen', 'Prüfung: Lesen Teil 2 und 3'],
  ['Was sind Sie von Beruf?', 'Ich arbeite von acht bis fünf', 'Rufen Sie bitte an!', 'Ich will Ärztin werden', 'Was hast du gestern gemacht?', 'Prüfung: Schreiben Teil 2, Hören Teil 3, Sprechen Teil 2'],
  ['Mir geht es nicht gut', 'Ich brauche einen Termin', 'Seit wann haben Sie das?', 'Dreimal am Tag nach dem Essen', 'Ruf schnell einen Krankenwagen!', 'Prüfung: Hören Teil 1, Lesen Teil 3, Sprechen Teil 3'],
  ['Wie komme ich zum Bahnhof?', 'Ich fahre mit dem Bus', 'Eine Fahrkarte nach Hamburg, bitte', 'Wohin gehst du? Ins Kino', 'Wie ist das Wetter?', 'Prüfung: Hören Teil 2, Lesen Teil 2, Schreiben Teil 1'],
  ['Ich möchte mich anmelden', 'Ich würde gern ein Konto eröffnen', 'Dieses Paket geht nach Ägypten', 'Gehört das Ihnen?', 'Wie sagt man das auf Deutsch?', 'Prüfung: formeller Brief, Hören Teil 3, Sprechen Teil 2'],
  ['Modelltest 1', 'Modelltest 2', 'Modelltest 3'],
];
const alias = {};
units.forEach((u, i) => { alias['u' + (i + 1)] = 'unit:' + (i + 1); u.forEach((c, j) => { alias[(i + 1) + '.' + (j + 1)] = c; }); });
const lines = String.raw`
# ── exam parts ──
exam:hoeren-1 | 7.6 | Hören Teil 1
exam:hoeren-2 | 8.6 | Hören Teil 2
exam:hoeren-3 | 2.6 | Hören Teil 3
exam:lesen-1 | 4.6 | Lesen Teil 1
exam:lesen-2 | 5.6 | Teil 2
exam:lesen-3 | 5.6 | Teil 3
exam:schreiben-1 | 8.6 | Schreiben Teil 1
exam:schreiben-2 | 2.6 | Schreiben Teil 2
exam:sprechen-1 | 1.6 | Sprechen Teil 1
exam:sprechen-2 | 3.6 | Teil 2
exam:sprechen-3 | 3.6 | Teil 3
exam:bewertung-schreiben | 2.6 | Bewertung|Kriterien
exam:bewertung-sprechen | 1.6 | درج|نقط
exam:bestehen | 10.1 | ٦٠|60
exam:osd-lesen-1 | 10.3 | ÖSD Lesen Aufgabe 1
exam:osd-lesen-2 | 5.6 | ÖSD Lesen Aufgabe 2
exam:osd-lesen-3 | gap | مفيش تمرين بشكل ÖSD Lesen Aufgabe 3
exam:osd-hoeren-1 | gap | مفيش تمرين بشكل ÖSD Hören Aufgabe 1
exam:osd-hoeren-2 | gap | مفيش تمرين بشكل ÖSD Hören Aufgabe 2 (الدرس ٢.٦ مرجعه بس)
exam:osd-hoeren-3 | gap | مفيش تمرين بشكل ÖSD Hören Aufgabe 3
exam:osd-schreiben-1 | 8.6 | ÖSD Schreiben Aufgabe 1
exam:osd-schreiben-2 | 2.6 | ÖSD Schreiben Aufgabe 2
exam:osd-sprechen-1 | 1.6 | ٤ مواضيع من ٦
exam:osd-sprechen-2 | gap | وصف الصورة في ÖSD متذكر في جدول المقارنة بس، من غير تمرين
exam:osd-sprechen-3 | gap | الحوار مع الممتحن في ÖSD متذكر في جدول المقارنة بس
exam:osd-bestehen | gap | قاعدة نجاح ÖSD (أقل حاجة في القراية والسمع) مش مشروحة
exam:osd-plurizentrik | 1.1 | Grüß Gott
exam:telc-sprachbausteine | 10.3 | telc Sprachbausteine
exam:telc-hoeren-a | gap | مفيش تمرين بشكل telc Hören Teil A
exam:telc-hoeren-b | gap | مفيش تمرين بشكل telc Hören Teil B
exam:telc-hoeren-antworten-a | 10.3 | telc Hören und antworten
exam:telc-hoeren-antworten-b | gap | الجزء التاني من «Hören und antworten» مش متمرّن عليه
exam:telc-lesen-a | gap | مفيش تمرين بشكل telc Lesen Teil A
exam:telc-lesen-b | gap | مفيش تمرين بشكل telc Lesen Teil B
exam:telc-lesen-c | 5.6 | telc Lesen Teil C
exam:telc-schreiben-a | 1.6 | telc Schreiben A
exam:telc-schreiben-b | 2.6 | telc Schreiben Teil B
exam:telc-sprechen-a | 1.6 | telc.{0,40}Sprechen Teil A
exam:telc-sprechen-b | 3.6 | telc Sprechen Teil B
exam:telc-sprechen-c | 3.6 | telc Sprechen Teil B و C
exam:telc-bestehen | gap | قاعدة نجاح telc مش مشروحة

# ── grammar ──
grammar:verb-prasens-aller-verben-der-wortliste | 1.2 | Präsens|ich heiße
grammar:verb-perfekt-arbeiten-bleiben-essen-fahren-fragen-glauben-haben-lesen-lernen-machen-schlafen-sehen-passieren-trinken-verstehen | 6.5 | Perfekt
grammar:verb-ausgewahlte-partizipien-geoffnet-geschlossen | 2.2 | geöffnet
grammar:verb-prateritum-von-haben-und-sein-1-und-3-person-hatte-war | 6.5 | hatte
grammar:verb-indikativ | 1.2 | ich heiße
grammar:verb-konjunktiv-ii-als-feste-wendung-ich-mochte-ich-wurde-gern-ich-hatte-gern | 9.2 | würde gern
grammar:verb-imperativ-du-ihr-sie | 6.3 | Imperativ
grammar:verb-modalverben-im-prasens-konnen-wollen-mussen-durfen-sollen-mochten | 6.4 | wollen
grammar:verb-verben-mit-trennbarem-prafix | 2.4 | trennbar
grammar:nomen-genus-der-die-das | 1.1 | der|die|das
grammar:nomen-singular-und-plural-der-nomen-der-wortliste | 4.2 | Plural
grammar:nomen-kasus-nominativ-akkusativ-dativ | 5.2 | Dativ
grammar:nomen-genitiv-bei-eigennamen-karls-freunde | 4.3 | Annas|Karls|Peters
grammar:nomen-genitiv-rezeptiv-die-nummer-des-wagens | 9.1 | \bdes\b
grammar:artikelworter-bestimmter-artikel-der-die-das-die | 1.1 | der|die|das
grammar:artikelworter-demonstrativartikel-dieser-diese-dieses | 9.3 | dieses
grammar:artikelworter-unbestimmter-artikel-ein-eine-ein | 3.2 | einen
grammar:artikelworter-nullartikel-ich-esse-gern-fleisch | 3.1 | Nullartikel
grammar:artikelworter-possessivartikel-mein-dein-sein-ihr-ihr-unser-euer | 4.3 | unser
grammar:artikelworter-negativartikel-kein | 3.3 | kein
grammar:pronomen-indefinitpronomen-man-etwas-nichts-mehr-alles-welch | 5.5 | \bman\b
grammar:pronomen-personalpronomen-im-nominativ | 1.2 | \bich\b
grammar:pronomen-personalpronomen-im-akkusativ-mich-dich-ihn-sie-es | 5.4 | \bihn\b
grammar:pronomen-personalpronomen-im-dativ-bei-danken-gehoren-helfen-es-geht-mir-dir-euch-ihnen | 9.4 | gehört
grammar:pronomen-reflexivpronomen-sich-uns-wir-sehen-uns-morgen | 7.2 | \bsich\b|\buns\b
grammar:pronomen-fragepronomen-wer-was-wen-wem | 9.1 | \bwem\b
grammar:adjektiv-pradikativ-das-haus-ist-modern | 5.1 | ist (groß|klein|hell|modern|teuer)
grammar:adjektiv-adverbial-ich-lese-gern | 3.1 | gern
grammar:adjektiv-komparation-gern-lieber-gut-besser | 3.1 | lieber
grammar:adjektiv-zahlworter-grund-und-ordnungszahlen | 2.3 | erste
grammar:praposition-temporal-an-dativ-am-montag | 2.2 | am Montag
grammar:praposition-temporal-ab-dativ-ab-februar | 2.3 | \bab\b
grammar:praposition-temporal-fur-akkusativ-fur-drei-wochen | 7.4 | für (drei|zwei|eine)
grammar:praposition-temporal-in-dativ-im-sommer | 2.3 | im Sommer
grammar:praposition-temporal-nach-dativ-nach-dem-essen | 7.4 | nach dem Essen
grammar:praposition-temporal-uber-uber-20-minuten | gap | «über» للوقت (über 20 Minuten) مش مشروح
grammar:praposition-temporal-um-um-halb-sieben | 2.1 | um halb
grammar:praposition-temporal-von-bis | 6.2 | von .{1,20} bis
grammar:praposition-temporal-vor-dativ-vor-dem-konzert | 7.4 | vor dem
grammar:praposition-lokal-an-dativ-akkusativ | 5.2 | \ban\b
grammar:praposition-lokal-auf-dativ | 5.2 | auf dem
grammar:praposition-lokal-aus-dativ-aus-italien | 1.4 | aus
grammar:praposition-lokal-bei-dativ-bei-familie-muller | 6.1 | \bbei\b
grammar:praposition-lokal-in-dativ-akkusativ-im-park-in-die-stadt | 8.4 | in die
grammar:praposition-lokal-nach-landernamen-nach-paris | 8.3 | nach Hamburg
grammar:praposition-lokal-von-nach | 8.4 | von .{1,25} nach
grammar:praposition-lokal-unter-dativ-unter-der-nummer | gap | «unter der Nummer» مش موجودة
grammar:praposition-lokal-zu-dativ-zur-schule | 8.1 | zum Bahnhof
grammar:praposition-modal-aus-dativ-aus-plastik | gap | «aus» للخامة (aus Plastik، aus Holz) مش موجودة
grammar:praposition-modal-fur-akkusativ-fur-dich | 4.5 | für (dich|mich|Sie)
grammar:praposition-modal-mit-dativ-mit-dem-auto | 8.2 | mit dem
grammar:praposition-modal-ohne-akkusativ-ohne-hilfe | gap | «ohne» كحرف جر (ohne Milch) مش مشروح
grammar:syntax-verbzweitstellung | 2.2 | Am Montag (gehe|habe|arbeite|ist|bin)
grammar:syntax-verberganzung-nominativ-akkusativ-dativ-danken-gehoren-geben-helfen-lokal-qualitativerganzung | 5.4 | helfen
grammar:syntax-satzklammer-trennbare-verben-modalverb-infinitiv-perfekt | 2.4 | Satzklammer
grammar:syntax-negation-mit-nicht-und-kein | 3.3 | nicht
grammar:syntax-entscheidungsfrage-ja-nein | 1.4 | Kommst du|Sprechen Sie
grammar:syntax-erganzungsfrage-w-fragen | 1.2 | Wie heißen
grammar:syntax-satzverbindungen-und-oder-aber-denn-dann | 9.5 | \bdenn\b
grammar:wortbildung-nomen-auf-er-arbeiter-und-ung-wohnung | gap | تكوين الأسماء بـ -er و -ung مش مشروح كقاعدة
grammar:wortbildung-feminine-formen-auf-in-kollegin | 6.1 | -in
grammar:wortbildung-komposita-reisegruppe-zahnarzt-passfoto | 5.1 | Komposit|كلمتين|كلمة مركبة
grammar:wortbildung-partizip-als-nomen-reisender | gap | Reisende/Reisender مذكورة مرة في امتحان بس
grammar:wortbildung-adjektive-mit-un-los-bar-unbekannt-arbeitslos-erreichbar | gap | un- و -los و -bar مش موجودين
grammar:wortbildung-farbkomposita-hellblau-dunkelblau | gap | hellblau و dunkelblau مش موجودين

# ── word groups ──
group:zahlen-grundzahlen-0-100-hundert-tausend-million-milliarde | 2.3 | tausend
group:zahlen-ordnungszahlen-erste-zweite-dritte-vierte | 2.3 | erste
group:zahlen-bruchzahlen-ein-halb-ein-viertel | 3.4 | Viertel|halb
group:datum-jahreszahlen-neunzehnhundertneunundneunzig-zweitausendvierzehn | 2.3 | neunzehnhundert
group:datum-datum-der-erste-marz-am-zwolften-vierten | 2.3 | am [a-zäöü]+ten
group:uhrzeit-offizielle-uhrzeit-sieben-uhr-funfzehn-dreizehn-uhr-siebzehn | 2.1 | dreizehn Uhr|Uhr fünfzehn
group:uhrzeit-umgangssprachliche-uhrzeit-viertel-vor-zwei-halb-drei-funf-nach-eins | 2.1 | Viertel vor
group:zeitmasse-die-sekunde-die-minute-die-stunde-der-tag-die-woche-das-jahr | 2.1 | Minute
group:wochentage-montag-bis-sonntag-samstag-sonnabend-das-wochenende | 2.2 | Sonnabend
group:tageszeiten-der-morgen-der-vormittag-der-mittag-der-nachmittag-der-abend-die-nacht | 2.2 | Vormittag
group:monate-januar-bis-dezember | 2.3 | Januar
group:jahreszeiten-der-fruhling-das-fruhjahr-der-sommer-der-herbst-der-winter | 2.3 | Herbst
group:wahrungen-euro-cent | 3.4 | Cent
group:masse-und-gewichte-meter-zentimeter-kilometer-quadratmeter | gap | Meter و Zentimeter و Kilometer و Quadratmeter مش متعلّمين
group:masse-und-gewichte-grad-uber-unter-null-prozent | 8.5 | Grad
group:masse-und-gewichte-liter-gramm-pfund-kilo | 3.4 | Liter
group:lander-und-nationalitaten-land-bewohner-nationalitat-deutschland-der-die-deutsche-deutsch | 1.4 | Deutsch
group:lander-und-nationalitaten-angabe-der-eigenen-herkunft-agypten-agypter-agypterin-agyptisch | 1.4 | Ägypten
group:farben-schwarz-weiss-grau-rot-blau-gelb-grun-braun | 4.4 | braun
group:himmelsrichtungen-der-norden-der-suden-der-westen-der-osten | 8.5 | Norden

# ── themes ──
theme:person-name | 1.2 | Ich heiße
theme:person-adresse | 9.1 | Adresse
theme:person-telefon | 1.5 | Telefonnummer
theme:person-geburtsdatum | 9.1 | geboren am|Geburtsdatum
theme:person-geburtsort | 9.1 | Geburtsort
theme:person-alter | 1.5 | Jahre alt
theme:person-geschlecht | gap | Geschlecht (männlich/weiblich) في الاستمارة مش موجودة
theme:person-familienstand-familie | 4.2 | verheiratet
theme:person-personliche-beziehungen | 4.4 | Freund
theme:person-staatsangehorigkeit-nationalitat-herkunft | 1.4 | Ich komme aus
theme:person-aussehen | 4.4 | sieht .{0,20} aus
theme:person-gewohnheiten-tagesablauf | 2.4 | stehe .{0,20} auf
theme:wohnen-wohnung | 5.1 | Wohnung
theme:wohnen-raume | 5.1 | Zimmer
theme:wohnen-einrichtung-mobel | 5.2 | Sofa
theme:wohnen-haushalt-technische-einrichtungen | 5.2 | Kühlschrank|Waschmaschine
theme:wohnen-miete-mietverhaltnis | 5.3 | Miete
theme:wohnen-wohnungswechsel | 5.4 | umziehen|Umzug
theme:umwelt-pflanzen | gap | النباتات مش موضوع درس
theme:umwelt-tiere | gap | الحيوانات مش موضوع درس
theme:umwelt-klima-wetter | 8.5 | Wetter
theme:reisen-verkehr-privater-und-offentlicher-verkehr | 8.2 | Bus
theme:reisen-verkehr-reisen | 8.3 | Fahrkarte
theme:reisen-verkehr-unterkunft | 8.5 | Hotel
theme:reisen-verkehr-gepack | 8.5 | Koffer|Gepäck
theme:essen-trinken-nahrungsmittel | 3.1 | Fisch
theme:essen-trinken-mahlzeiten | 3.1 | Frühstück
theme:essen-trinken-speisen | 3.5 | Suppe|Salat|Schnitzel
theme:essen-trinken-getranke | 3.2 | Kaffee
theme:essen-trinken-lokale-restaurant-cafe | 3.5 | Restaurant|Café
theme:einkaufen-gebrauchsartikel-geschafte | 3.3 | Supermarkt
theme:einkaufen-gebrauchsartikel-preis-bezahlen | 3.4 | kostet
theme:einkaufen-gebrauchsartikel-lebensmittel | 3.3 | Reis
theme:einkaufen-gebrauchsartikel-kleidung | 3.4 | Größe|Jacke|Hose|Schuhe
theme:dienstleistungen-post | 9.3 | Paket
theme:dienstleistungen-telekommunikation | 6.3 | anrufen|Telefon
theme:dienstleistungen-banken | 9.2 | Konto
theme:dienstleistungen-polizei | 9.4 | Polizei
theme:erziehung-ausbildung-lernen-kinderbetreuung | 4.6 | Kindergarten
theme:erziehung-ausbildung-lernen-schule | 6.1 | Schule
theme:erziehung-ausbildung-lernen-sprachen-lernen | 9.5 | Wie sagt man
theme:arbeit-beruf-arbeitsplatz | 6.1 | Beruf
theme:arbeit-beruf-urlaub | 6.2 | Urlaub
theme:freizeit-unterhaltung-interessen | gap | الهوايات متذكرة كموضوع في Sprechen Teil 1 بس، مفيش درس عنها
theme:freizeit-unterhaltung-sport-treiben | 7.5 | Sport
theme:freizeit-unterhaltung-radio-fernsehen | gap | Radio و Fernsehen مش موضوع درس
theme:freizeit-unterhaltung-internet | gap | الإنترنت مذكور بس، مش موضوع درس
theme:freizeit-unterhaltung-lekture-presse | gap | القراية والجرايد مش موضوع درس

# ── speech acts ──
act:informationsaustausch-benennen-definieren-identifizieren | 4.1 | Das ist
act:informationsaustausch-beschreiben | 4.4 | sieht .{0,20} aus
act:informationsaustausch-erklaren | 9.5 | Das heißt|bedeutet
act:informationsaustausch-berichten | 6.5 | gestern
act:informationsaustausch-mitteilung-ankundigung | 2.6 | رسايل صوتية
act:informationsaustausch-nachfrage | 1.3 | Wie bitte
act:informationsaustausch-zweck-und-bestimmung-angeben | gap | «wofür / für …» للغرض مش مشروح
act:informationsaustausch-wissen-unwissen | gap | «Ich weiß (es) nicht» مش متعلّمة
act:bewertung-kommentar-meinung-ansicht | 3.3 | finde
act:bewertung-kommentar-zufriedenheit-unzufriedenheit | gap | «zufrieden» مش موجودة
act:bewertung-kommentar-gefallen-missfallen | gap | «Das gefällt mir» مش متعلّمة (مذكورة في الصحة بس)
act:bewertung-kommentar-interesse-desinteresse | gap | «Das interessiert mich (nicht)» مش متعلّمة
act:bewertung-kommentar-billigung-missbilligung | 2.5 | gute Idee
act:bewertung-kommentar-zustimmung-ablehnung | 2.5 | Ja, gern|Nein, danke|leider nicht
act:bewertung-kommentar-wunsch | 3.2 | möchte
act:bewertung-kommentar-vorlieben | 3.1 | lieber
act:bewertung-kommentar-wichtigkeit | 6.4 | wichtig
act:bewertung-kommentar-verneinen-widerspruch | gap | «doch» والاعتراض (Nein, das stimmt nicht) مش متعلّمين
act:bewertung-kommentar-beschwerde | 7.2 | Beschwerde
act:bewertung-kommentar-rechtfertigung-begrundung | 9.5 | \bdenn\b
act:gefuhlsausdruck-freude-bedauern | 2.5 | Schade
act:gefuhlsausdruck-neigung-abneigung | 3.1 | mag
act:gefuhlsausdruck-gelassenheit-gleichgultigkeit | 5.2 | egal
act:gefuhlsausdruck-mitgefuhl | 7.1 | Gute Besserung
act:gefuhlsausdruck-erstaunen-uberraschung | 9.4 | Wirklich\?
act:gefuhlsausdruck-hoffnung | gap | «Ich hoffe …» مش موجودة
act:gefuhlsausdruck-sorge-befurchtung | gap | التعبير عن القلق مش موجود
act:gefuhlsausdruck-enttauschung | gap | التعبير عن خيبة الأمل مش موجود
act:handlungsregulierung-bitte-aufforderung | 3.2 | bitte
act:handlungsregulierung-bestatigung | gap | «Ja, genau / Richtig / Stimmt» مش متعلّمة
act:handlungsregulierung-hilfe-anbieten-annehmen-und-ablehnen | 5.4 | helfen
act:handlungsregulierung-bestellung-wunsch | 3.2 | hätte gern|nehme
act:handlungsregulierung-rat-empfehlung-warnung | 7.3 | sollen
act:handlungsregulierung-erlaubnis-genehmigung | 5.5 | darf
act:handlungsregulierung-vorschlag | 2.5 | Gehen wir|Wollen wir|Sollen wir
act:handlungsregulierung-versprechung | gap | الوعد مش موجود
act:handlungsregulierung-einladung | 4.5 | einladen|Einladung
act:handlungsregulierung-verabredung | 2.5 | Zeit
act:soziale-konventionen-kontaktaufnahme-ansprechen | 8.1 | Entschuldigung
act:soziale-konventionen-grussen | 1.1 | Guten Tag
act:soziale-konventionen-sich-jemanden-vorstellen | 1.2 | Freut mich
act:soziale-konventionen-uber-das-befinden-sprechen | 1.1 | Wie geht
act:soziale-konventionen-gute-wunsche | 4.5 | Viel (Glück|Spaß)|Schönes Wochenende|Gute Reise
act:soziale-konventionen-gratulation | 4.5 | Glückwunsch
act:soziale-konventionen-eine-anerkennung-aussprechen-ein-kompliment-machen | gap | المجاملة (Das sieht toll aus) مش متعلّمة
act:soziale-konventionen-dank | 1.1 | Danke
act:soziale-konventionen-entschuldigung | 3.5 | Tut mir leid|Entschuldigung
act:soziale-konventionen-verabschiedung | 1.1 | Tschüss

# ── strategies ──
strategy:redeorganisation-eine-ausserung-einleiten | gap | «Also, … / Na ja, …» مش متعلّمة
strategy:redeorganisation-eine-ausserung-abschliessen | gap | ختم الكلام مش متعلّم
strategy:redeorganisation-um-das-wort-bitten | 5.5 | Darf ich
strategy:redeorganisation-zuhoren-signalisieren | gap | «Aha / Ach so / Ja?» مش متعلّمة
strategy:redeorganisation-zum-sprechen-auffordern | 1.2 | Und Sie\?|Und du\?
strategy:redeorganisation-gemeinsames-wissen-andeuten | gap | «Weißt du …» مش موجودة
strategy:redeorganisation-beispiele-geben | gap | «zum Beispiel» مش موجودة
strategy:redeorganisation-das-thema-wechseln | gap | تغيير الموضوع مش متعلّم
strategy:redeorganisation-etwas-hervorheben | gap | التأكيد (sehr / wirklich / besonders) مش مشروح كاستراتيجية
strategy:redeorganisation-vermeidung | gap | تجنّب الموضوع مش متعلّم
strategy:redeorganisation-hoflichkeit | 9.2 | würde gern|Könnten Sie
strategy:redeorganisation-abschwachung | 1.4 | ein bisschen
strategy:verstandnissicherung-verstandnishilfen-anbieten | gap | عرض المساعدة على الفهم مش متعلّم
strategy:verstandnissicherung-um-verstandnishilfen-bitten | 9.5 | langsam
strategy:verstandnissicherung-kompensation | 9.5 | Wie sagt man

# ── notions ──
notion:existenz-besitz-zugehorigkeit-nicht-sein | 3.3 | Es gibt|gibt es
notion:existenz-besitz-zugehorigkeit-anwesend-abwesend-sein | gap | da / nicht da / anwesend مش متعلّمة
notion:existenz-besitz-zugehorigkeit-nicht-verfugbar-sein | 5.3 | noch frei
notion:existenz-besitz-zugehorigkeit-nicht-vorkommen | 3.3 | Es gibt|gibt es
notion:existenz-besitz-zugehorigkeit-inklusion-exklusion | gap | mit / ohne / inklusive للتضمين مش مشروحة
notion:existenz-besitz-zugehorigkeit-besitz-zugehorigkeit-ausdrucken | 9.4 | gehört
notion:raum-ort | 5.2 | im Wohnzimmer
notion:raum-herkunft | 1.4 | Ich komme aus
notion:raum-richtung | 8.1 | links|rechts
notion:raum-distanz | 8.1 | weit|nah
notion:zeit-zeitpunkt | 2.1 | \bum\b
notion:zeit-zeitangaben | 2.2 | heute|morgen
notion:zeit-dauer | 7.3 | seit
notion:zeit-haufigkeit | 7.4 | dreimal|immer|oft
notion:quantitat-zahlen-mengenangaben | 3.4 | Kilo
notion:quantitat-menge | 3.4 | viel|wenig
notion:quantitat-grad | 1.4 | ein bisschen|sehr
notion:quantitat-dimension-massangabe | gap | groß/klein/lang/breit مع المقاسات مش مشروحة
notion:art-und-weise-physisch | 4.4 | groß|klein
notion:art-und-weise-wertung | 3.3 | finde
notion:art-und-weise-vergleich | 3.1 | lieber
notion:logische-verknupfung-grund | 9.5 | \bdenn\b
notion:logische-verknupfung-bedingung | gap | «wenn» للشرط مش مشروحة
notion:logische-verknupfung-aufzahlung-alternative | 3.2 | \boder\b
notion:modales-fahigkeit | 5.4 | können|kann
notion:modales-moglichkeit | 5.6 | kann man
notion:modales-notwendigkeit-verpflichtung | 7.2 | muss

# ── integration curriculum situations (Rahmencurriculum) ──
rc:a-1-1-1 | 1.4 | Ich komme aus
rc:a-1-1-2 | gap | الرفض المؤدب للكلام عن حاجات شخصية مش متعلّم
rc:a-2-1-1 | 1.2 | duzen
rc:a-2-1-2 | gap | «Das ist in meinem Land (nicht) normal» مش موجودة
rc:a-3-1-1 | 6.4 | kann
rc:a-4-1-1 | 9.5 | Wie sagt man
rc:a-4-2-1 | 1.3 | Wie bitte
rc:a-4-2-2 | 1.3 | noch einmal
rc:a-4-2-3 | 9.5 | Was bedeutet|Was heißt
rc:a-4-2-4 | 9.5 | langsam
rc:a-4-2-5 | 9.5 | richtig
rc:a-4-2-6 | gap | السؤال عن الورق بلغة تانية مش موجود
rc:a-4-2-7 | 9.1 | helfen
rc:a-4-2-8 | gap | «Jemand übersetzt für mich» مش موجودة
rc:a-5-2-1 | 1.4 | spreche
rc:b-1-5-1 | gap | «Das gefällt mir (nicht)» مش متعلّمة
rc:b-2-1-1 | gap | «Das interessiert mich (nicht)» مش متعلّمة
rc:b-2-2-1 | gap | الموافقة والاعتراض على رأي مش متعلّمين
rc:b-2-3-1 | 3.1 | mag
rc:c-1-1-1 | gap | «Ich sehe das anders» مش موجودة
rc:c-1-2-1 | gap | «Habe ich das richtig verstanden?» مش موجودة
rc:c-1-4-1 | gap | الاعتراض البسيط مش متعلّم
rc:c-2-4-1 | gap | قبول أو رفض حل مقترح مش متعلّم
rc:d-1-1-1 | 1.1 | Guten Tag
rc:d-1-1-2 | 1.1 | Hallo
rc:d-1-2-1 | 1.2 | Ich heiße
rc:d-1-2-2 | 4.1 | Das ist
rc:d-1-2-3 | 1.2 | Freut mich
rc:d-1-2-4 | 1.2 | Wie heißen Sie
rc:d-1-3-1 | 8.1 | Entschuldigung
rc:d-1-4-1 | gap | عرض الـ Du على حد مش متعلّم (الدرس ١.٢ بيشرح Du و Sie بس)
rc:d-1-4-2 | gap | الرد على عرض الـ Du مش متعلّم
rc:d-1-4-3 | gap | طلب المعاملة المناسبة من موظف مش متعلّم
rc:d-1-5-1 | 1.1 | Auf Wiedersehen
rc:d-1-6-1 | 1.1 | Tschüss
rc:d-1-6-2 | 1.1 | Bis
rc:d-2-1-1 | 1.1 | Wie geht
rc:d-2-1-2 | 1.1 | danke
rc:d-2-5-1 | 2.5 | Zeit
rc:d-2-5-2 | 2.5 | keine Zeit
rc:d-2-6-1 | 2.5 | leider
rc:d-2-7-1 | gap | المجاملة مش متعلّمة
rc:d-2-7-2 | gap | الشكر على المجاملة مش متعلّم
rc:d-2-8-1 | 3.5 | Tut mir leid
rc:d-2-8-2 | 5.4 | Kein Problem|Macht nichts
rc:d-2-11-1 | 4.5 | Glückwunsch
rc:d-2-11-2 | 4.5 | Liebe
rc:d-2-11-3 | 4.5 | Danke
rc:d-2-12-1 | 7.1 | Gute Besserung
rc:d-2-12-2 | 4.5 | gleichfalls|Ebenfalls
rc:e-1-1-1 | 9.5 | richtig
rc:e-1-1-2 | gap | «Korrigieren Sie mich, bitte» مش متعلّمة
rc:e-1-1-3 | gap | طلب مواد تعلّم زيادة مش متعلّم
rc:e-1-1-4 | gap | السؤال عن كورس قريب مش متعلّم
rc:e-2-1-1 | gap | القاموس الشخصي مش مشروح كطريقة (فيه «تمرّن» بس)
rc:e-2-1-2 | gap | تقسيم الكلمات على مواضيع مش مشروح كطريقة
rc:e-2-1-3 | gap | طرق الحفظ مش مشروحة
rc:e-2-1-4 | gap | كتابة الكلمات باليد مش مشروحة كطريقة
rc:e-2-1-5 | gap | استخراج الكلمات من النصوص مش مشروح
rc:e-2-2-1 | gap | التمرين على السمع لوحدك مش مشروح كطريقة
rc:e-2-2-2 | gap | الكلمات الدولية والأرقام كجزر للفهم مش مشروحة
rc:e-2-2-3 | gap | التوقع قبل السمع مش مشروح
rc:e-2-3-1 | gap | الترجمة اللي على الشاشة مش مشروحة
rc:e-2-3-2 | gap | الصورة في التلفزيون مش مشروحة
rc:e-2-3-3 | gap | الفكرة العامة من الفيديو مش مشروحة
rc:e-2-4-1 | 5.6 | Anzeige
rc:e-2-4-2 | gap | تخمين المعنى من الكلمات الدولية وتكوين الكلمة مش مشروح
rc:e-2-4-3 | gap | استخدام شكل النص للفهم مش مشروح
rc:e-2-4-4 | gap | كلمات الربط (er، dort، dann) كطريقة قراية مش مشروحة
rc:e-2-5-1 | gap | حفظ الجمل الجاهزة مش مشروح كطريقة
rc:e-2-5-2 | gap | كروت التعبيرات مش مشروحة
rc:e-2-5-3 | 9.5 | Wie sagt man
rc:e-2-5-4 | 8.1 | إشارة|شاور
rc:e-2-6-1 | gap | النقل باليد مش مشروح
rc:e-2-6-2 | gap | المدقق الإملائي مش مشروح
rc:e-2-7-1 | 1.2 | بالإنجليزي|زي الإنجليزي
rc:e-2-7-2 | gap | رسم القاعدة مش مشروح كطريقة
rc:e-2-7-3 | gap | اكتشاف القاعدة بنفسك مش مشروح
rc:e-2-7-4 | gap | جمل الحفظ (Merkverse) مش موجودة
rc:e-2-7-5 | gap | الحركة واللمس مش موجودين
rc:e-2-7-6 | gap | تمارين للزمايل مش موجودة
rc:1-1-1-1 | gap | المعلومات عن جهة حكومية من النت مش متعلّمة
rc:1-2-2-1 | 9.1 | Formular
rc:1-3-1-1 | 9.1 | Stock
rc:1-3-1-2 | 9.1 | Wo ist
rc:1-3-1-3 | 9.1 | Wie ist Ihr
rc:1-3-2-1 | 9.1 | helfen
rc:1-3-4-1 | gap | التعريف بالنفس في مكتب استشارة مش متعلّم
rc:2-1-1-1 | 6.2 | Urlaub
rc:2-1-2-1 | 6.3 | Imperativ
rc:2-1-2-2 | 6.3 | Mache ich|Alles klar|In Ordnung
rc:2-1-2-3 | 6.2 | Wie bitte
rc:2-1-3-1 | 6.6 | krank
rc:2-1-3-2 | 6.6 | krank
rc:2-1-3-3 | 6.3 | Vorsicht
rc:2-1-3-4 | gap | قراية معلومة مكتوبة عن العِدّة والخامات مش موجودة
rc:2-1-3-5 | 6.3 | Vorsicht|Achtung
rc:2-1-4-1 | gap | تعليمات الأمان في الشغل مش موجودة
rc:2-1-5-1 | 6.2 | Schicht
rc:2-1-5-2 | 2.5 | Zeit
rc:2-2-2-1 | gap | الـ checklist واستمارة المتابعة مش موجودين
rc:2-2-2-2 | 6.2 | Schicht
rc:2-3-1-1 | 6.3 | anrufen|Telefon
rc:3-1-3-1 | 6.4 | gern
rc:3-2-1-1 | gap | البحث عن استشارة الشغل مش موجود
rc:3-4-1-1 | 6.4 | Anzeige
rc:3-4-2-1 | 6.6 | Lebenslauf|E-Mail
rc:5-1-1-1 | gap | طلب ترشيح بنك مش موجود
rc:5-1-1-2 | gap | معلومات البنوك من النت مش موجودة
rc:5-2-1-1 | 9.2 | Geldautomat
rc:5-2-1-2 | 9.2 | PIN
rc:5-2-1-3 | 9.2 | PIN
rc:5-2-2-1 | 9.2 | Kontoauszug
rc:5-2-2-2 | gap | إبلاغ البنك بتغيير العنوان مش موجود
rc:5-2-3-1 | gap | ملا استمارة التحويل مش متعلّم (Überweisung في امتحان تجريبي بس)
rc:5-4-1-1 | gap | طلب ورق معلومات من البنك مش موجود
rc:5-4-2-1 | 9.2 | Konto
rc:6-1-1-1 | gap | السؤال عن الحضانات مش موجود
rc:6-1-1-2 | gap | تطليع عناوين وأرقام من الدليل مش موجود
rc:6-2-2-1 | gap | جوابات المدرسة مش موجودة
rc:6-2-2-2 | 6.6 | Sohn ist krank|Tochter ist krank|Kind ist krank
rc:6-2-3-1 | gap | ورقة غياب الطفل مش موجودة
rc:6-3-1-1 | gap | الكلام عن دراسة الأولاد في البلد مش موجود
rc:6-3-4-1 | gap | مقابلة الاستشارة عن الأولاد مش موجودة
rc:7-1-1-1 | gap | السؤال عن منتج عند المعارف مش موجود
rc:7-1-1-2 | 3.4 | Angebot
rc:7-1-1-3 | gap | تاريخ الصلاحية والمكونات مش موجودين
rc:7-2-1-1 | 3.3 | Wo finde ich
rc:7-2-1-2 | 3.4 | kostet
rc:7-2-1-3 | gap | طلب الخصم مش موجود
rc:7-2-2-1 | gap | الطلب أونلاين مش متعلّم
rc:8-1-1-1 | 7.2 | Hausarzt|Krankenkasse
rc:8-1-1-2 | gap | طلب ترشيح دكتور مش موجود
rc:8-1-1-3 | gap | معلومات العلاج من النت مش موجودة
rc:8-2-2-1 | 7.2 | Versichertenkarte
rc:8-2-2-2 | 7.1 | tut .{0,12}weh
rc:8-2-2-3 | 7.4 | Tablette
rc:8-2-2-4 | 7.1 | Kopf
rc:8-2-4-1 | 7.4 | Packungsbeilage|Beipackzettel
rc:8-2-4-2 | 7.4 | dreimal
rc:8-2-5-1 | 7.2 | Formular
rc:8-2-6-1 | 7.5 | 112
rc:8-3-1-1 | 7.1 | Wie geht
rc:8-3-1-2 | 7.1 | geht
rc:9-1-1-1 | gap | جدول برامج التلفزيون مش موجود
rc:9-1-1-2 | gap | السؤال عن مكان المعلومات مش موجود
rc:9-1-1-3 | 8.4 | Kino
rc:9-2-1-1 | 5.6 | Anzeige
rc:9-3-1-1 | gap | البحث على النت مش متعلّم
rc:9-3-1-2 | gap | تعليمات المواقع مش موجودة
rc:9-3-1-3 | gap | قوايم الموبايل مش موجودة
rc:10-1-1-1 | 8.1 | Wie komme ich
rc:10-1-1-2 | 8.3 | Gleis
rc:10-1-1-3 | 8.3 | Abfahrt|Fahrplan
rc:10-2-1-1 | 8.3 | Gleis
rc:10-2-3-1 | 8.1 | geradeaus
rc:10-2-4-1 | 8.3 | Automat
rc:10-3-1-1 | 8.3 | Ist (hier|der Platz) (noch )?frei
rc:10-3-1-2 | 8.1 | Wie komme ich
rc:11-1-1-1 | 2.2 | Kurs
rc:11-1-1-2 | gap | إعلانات الكورس والامتحانات مش موجودة
rc:11-1-2-1 | 9.5 | Hören Sie|Lesen Sie
rc:11-1-2-2 | 9.5 | Kreuzen Sie|Ergänzen Sie
rc:11-1-3-1 | gap | فهم شرح المدرس مش متعلّم
rc:11-1-3-2 | 9.5 | Was bedeutet
rc:11-1-3-3 | 1.3 | noch einmal
rc:11-1-4-1 | 6.6 | krank
rc:11-1-4-2 | 2.5 | zu spät|komme später|Verspätung
rc:11-2-1-1 | 9.5 | Hausaufgabe
rc:11-2-1-2 | 9.5 | Hausaufgabe
rc:11-2-2-1 | gap | الاتفاق على المذاكرة سوا مش موجود
rc:11-3-1-1 | 1.6 | Prüfer
rc:11-3-1-2 | 1.6 | Prüfer
rc:11-3-1-3 | 3.6 | noch einmal
rc:12-1-1-1 | 5.3 | Wohnung
rc:12-1-1-2 | gap | السكن الرخيص ومساعدة الإيجار مش موجودين
rc:12-3-1-1 | 5.5 | Hausverwaltung|Vermieter|Hausmeister
rc:12-3-1-2 | 5.3 | Nebenkosten
rc:12-3-2-1 | 5.5 | Hausordnung
rc:12-3-2-2 | 5.5 | verboten|nicht
rc:12-3-2-3 | 5.5 | Treppe|putzen
rc:12-3-3-1 | 9.1 | Formular
rc:12-4-1-1 | 5.4 | Nachbar
rc:12-4-2-1 | 5.5 | Nachbar
rc:12-4-3-1 | 5.4 | helfen

# ── CEFR descriptors ──
cefr:12 | 2.6 | Hören
cefr:13 | 2.6 | Hören Teil 3
cefr:29 | 4.6 | Hören Teil 1
cefr:30 | 3.6 | Hören Teil 2
cefr:49 | gap | فهم شرح في جولة مش متمرّن عليه
cefr:64 | 6.3 | Imperativ
cefr:65 | 5.2 | neben|im Wohnzimmer
cefr:66 | 8.6 | Hören Teil 2
cefr:80 | 2.6 | Hören Teil 3
cefr:95 | gap | إعلانات وأخبار التلفزيون مش موجودة
cefr:105 | 4.6 | Lesen Teil 1
cefr:121 | gap | الكارت بوستال مش موجود
cefr:122 | 4.6 | E-Mail
cefr:141 | 5.6 | Teil 3
cefr:142 | 9.1 | Stock
cefr:143 | 8.5 | Frühstück
cefr:144 | 5.6 | Anzeige
cefr:170 | gap | نص معلومات بسيط بصور مش موجود
cefr:171 | gap | نصوص قصيرة عن الرياضة والمزيكا والسفر مش موجودة
cefr:186 | 8.1 | geradeaus
cefr:204 | gap | القصص المصوّرة مش موجودة
cefr:205 | gap | القصص المصوّرة مش موجودة
cefr:223 | gap | استنتاج معنى كلمة جديدة من النص مش متعلّم كمهارة
cefr:224 | 1.2 | بالإنجليزي|زي الإنجليزي
cefr:232 | 4.4 | sieht
cefr:258 | 1.6 | Sprechen Teil 1
cefr:259 | 2.4 | stehe
cefr:272 | 3.4 | Farbe
cefr:314 | gap | كلمة قصيرة متحضّرة (تقديم أو نخب) مش موجودة
cefr:322 | 6.6 | Schreiben
cefr:323 | 2.6 | Schreiben
cefr:346 | 4.3 | Sein Bruder
cefr:347 | 5.2 | Wohnzimmer
cefr:348 | 5.1 | groß|klein
cefr:389 | 8.1 | إشارة|شاور
cefr:411 | 3.6 | Sprechen Teil 3|Teil 3
cefr:420 | 9.5 | langsam
cefr:421 | 6.3 | Imperativ
cefr:449 | 9.5 | langsam
cefr:450 | 4.2 | Geschwister
cefr:451 | 1.2 | Freut mich
cefr:452 | 1.1 | Wie geht
cefr:480 | 3.1 | mag
cefr:520 | 6.3 | Imperativ
cefr:521 | 7.4 | dreimal
cefr:522 | 3.6 | Teil 3
cefr:546 | 3.6 | Teil 3
cefr:547 | 3.2 | möchte
cefr:548 | 3.4 | kostet
cefr:573 | 6.3 | Imperativ
cefr:574 | 1.6 | Sprechen Teil 1
cefr:575 | 4.2 | Geschwister
cefr:576 | 6.5 | letzte|nächste
cefr:577 | 3.4 | kostet
cefr:578 | 3.4 | Farbe
cefr:599 | 9.1 | Wie ist Ihr
cefr:600 | 7.1 | tut .{0,12}weh
cefr:621 | 8.6 | Schreiben Teil 1
cefr:647 | gap | البوستات والرسايل عن الهوايات مش موجودة
cefr:648 | gap | الكارت بوستال مش موجود
cefr:649 | 2.6 | Schreiben Teil 2
cefr:661 | 8.6 | Schreiben Teil 1
cefr:662 | gap | «Bin im Supermarkt, zurück um 5» (رسالة فين وراجع إمتى) مش موجودة
cefr:684 | gap | البوستات أونلاين مش موجودة
cefr:685 | gap | الرد على البوستات مش موجود
cefr:708 | gap | الشرا أونلاين مش متعلّم
cefr:747 | 6.5 | verstehe (das )?nicht|nicht verstanden
cefr:748 | 6.5 | verstehe (das )?nicht|nicht verstanden
cefr:758 | gap | Mediation: نقل معلومة من يافطة لحد تاني مش متمرّن عليه
cefr:771 | gap | Mediation: نقل مواعيد وأماكن بالعربي مش متمرّن عليه
cefr:787 | gap | Mediation: كتابة معلومات سمعها بلغة تانية مش متمرّن عليها
cefr:833 | gap | Mediation مش متمرّن عليها
cefr:850 | gap | Mediation مش متمرّن عليها
cefr:851 | gap | Mediation مش متمرّن عليها
cefr:861 | gap | Mediation مش متمرّن عليها
cefr:870 | gap | Mediation مش متمرّن عليها
cefr:904 | gap | Mediation مش متمرّن عليها
cefr:936 | gap | Mediation مش متمرّن عليها
cefr:955 | gap | Mediation مش متمرّن عليها
cefr:984 | gap | Mediation مش متمرّن عليها
cefr:1001 | gap | Mediation مش متمرّن عليها
cefr:1012 | gap | Mediation مش متمرّن عليها
cefr:1028 | gap | Mediation مش متمرّن عليها
cefr:1103 | 2.1 | halb
cefr:1117 | gap | الكلمات الدولية مش مشروحة كطريقة فهم
cefr:1136 | gap | استخدام كذا لغة مع بعض مش متعلّم
cefr:1149 | 1.2 | Ich heiße
cefr:1150 | 2.2 | Am Montag
cefr:1167 | 3.1 | ~~~words
cefr:1177 | 1.2 | ~~~de
cefr:1193 | 1.3 | نطق
cefr:1201 | 1.3 | نطق
cefr:1202 | 1.3 | نطق
cefr:1210 | 2.4 | Betonung|نبرة|الضغط على
cefr:1220 | 1.3 | ~~~dictate
cefr:1221 | 1.3 | buchstabier
cefr:1222 | 1.3 | علامة الاستفهام|Fragezeichen|النقطة
cefr:1247 | 1.1 | Bitte|Danke
cefr:1309 | 2.4 | dann
cefr:1321 | 1.6 | Sprechen Teil 1
cefr:1332 | 1.6 | Sprechen Teil 1
`;
module.exports = { alias, lines };
