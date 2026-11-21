# Dumps every sheet of an .xlsx file as JSON rows, with the standard library only (no openpyxl in the image).
#   docker run --rm -v "$PWD/.cache/de/src:/w" -w /w de-tools python /tools/xlsx-rows.py cefr-desc.xlsx > cefr-desc.json
# Output: {"<sheet name>": [[cell, cell, …], …]}  (empty cells are "")
import json, re, sys, zipfile
import xml.etree.ElementTree as ET

NS = {'m': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main',
      'r': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships'}
REL = '{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id'


def col(ref):
    n = 0
    for ch in re.match(r'[A-Z]+', ref).group(0):
        n = n * 26 + ord(ch) - 64
    return n - 1


z = zipfile.ZipFile(sys.argv[1])
shared = []
if 'xl/sharedStrings.xml' in z.namelist():
    for si in ET.fromstring(z.read('xl/sharedStrings.xml')).findall('m:si', NS):
        shared.append(''.join(t.text or '' for t in si.iter('{%s}t' % NS['m'])))
rels = {r.get('Id'): r.get('Target') for r in ET.fromstring(z.read('xl/_rels/workbook.xml.rels'))}
out = {}
for sh in ET.fromstring(z.read('xl/workbook.xml')).find('m:sheets', NS):
    target = rels[sh.get(REL)].lstrip('/')
    path = target if target.startswith('xl/') else 'xl/' + target
    rows = []
    for row in ET.fromstring(z.read(path)).iter('{%s}row' % NS['m']):
        cells = []
        for c in row.findall('m:c', NS):
            v = c.find('m:v', NS)
            if c.get('t') == 's' and v is not None:
                val = shared[int(v.text)]
            elif c.get('t') == 'inlineStr':
                val = ''.join(t.text or '' for t in c.iter('{%s}t' % NS['m']))
            else:
                val = v.text if v is not None else ''
            i = col(c.get('r'))
            cells += [''] * (i - len(cells))
            cells.append(val.strip())
        rows.append(cells)
    out[sh.get('name')] = rows
json.dump(out, sys.stdout, ensure_ascii=False)
