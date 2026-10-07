// Minimal check: renders the blueprint's Jinja with nunjucks for the six
// temperature bands plus the unavailable/humidity edges. Fails if a band
// prints the wrong layer advice.
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const nunjucks = require('nunjucks');

const file = path.join(__dirname, 'blueprints/automation/baby_room_climate_report.yaml');
const vars = yaml.load(fs.readFileSync(file, 'utf8')).variables;

nunjucks.installJinjaCompat();

function render(name, { t, h }) {
  return nunjucks
    .renderString(vars[name], { temperature: t, humidity: h })
    .trim();
}

const tempCases = [
  [8, '4 layers'],
  [12, '3 layers'],
  [16, '2 layers: bodysuit + pyjama'],
  [20, '2 light layers'],
  [24, '1 light layer'],
  [30, '1 minimum layer'],
  [null, 'unknown'],
];

const humCases = [
  [25, 'Dry air'],
  [55, 'Humidity fine'],
  [75, 'Humid'],
  [null, 'Humidity sensor unavailable'],
];

let failed = 0;

for (const [t, expect] of tempCases) {
  const reading = render('reading', { t, h: 50 });
  const layers = render('layers', { t, h: 50 });
  const ok = layers.includes(expect) && reading.length > 0;
  if (!ok) failed++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  temp=${String(t).padStart(4)}  "${reading}" / "${layers}"`);
}

for (const [h, expect] of humCases) {
  const note = render('humidity_note', { t: 20, h });
  const value = render('humidity_value', { t: 20, h });
  const ok = note.includes(expect) && value.length > 0;
  if (!ok) failed++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  hum=${String(h).padStart(4)}  "${value}" / "${note}"`);
}

if (failed) {
  console.error(`${failed} case(s) failed`);
  process.exit(1);
}
console.log('all bands render as expected');