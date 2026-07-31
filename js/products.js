/* Subseazen — Fire & Safety Equipment catalogue
   Data mirrors the Subseazen Fire Equipment Product Catalogue.
   Bands follow extinguisher colour-coding (ABE=white, CO2=black, AFFF/Air=blue, Wet Chem=oatmeal). */
(function () {
  'use strict';

  var ICON = {
    ext: '<svg viewBox="0 0 60 84" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="18" y="4" width="24" height="7" rx="2" fill="#334656"/><path d="M30 11v-6M30 5l9-2" stroke="#334656" stroke-width="2" stroke-linecap="round"/><rect x="14" y="16" width="32" height="60" rx="9" fill="#c9d5de"/><rect x="14" y="16" width="32" height="60" rx="9" fill="url(#g)" fill-opacity=".0"/><rect x="18" y="30" width="24" height="20" rx="2" fill="#fff" stroke="#aab8c2"/><rect x="14" y="22" width="32" height="6" fill="var(--bandc,#e9edf0)"/></svg>',
    reel: '<svg viewBox="0 0 60 84" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="30" cy="42" r="26" fill="#c9d5de"/><circle cx="30" cy="42" r="26" fill="none" stroke="#aab8c2"/><circle cx="30" cy="42" r="16" fill="none" stroke="#8ea0ac" stroke-width="2"/><circle cx="30" cy="42" r="9" fill="none" stroke="#8ea0ac" stroke-width="2"/><circle cx="30" cy="42" r="3" fill="#556676"/><path d="M4 42h8M48 42h8" stroke="#8ea0ac" stroke-width="2"/></svg>',
    blanket: '<svg viewBox="0 0 60 84" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="14" y="12" width="32" height="52" rx="4" fill="#d64420"/><rect x="14" y="12" width="32" height="52" rx="4" fill="none" stroke="#a8331a"/><rect x="20" y="20" width="20" height="4" rx="2" fill="#fff" opacity=".85"/><rect x="20" y="28" width="20" height="3" rx="1.5" fill="#fff" opacity=".55"/><path d="M24 64v8M36 64v8" stroke="#8ea0ac" stroke-width="3" stroke-linecap="round"/></svg>',
    ppe: '<svg viewBox="0 0 60 84" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 12h16l3 8v8h-4v40H23V36h-4v-8l3-8Z" fill="#2b4b8c"/><path d="M22 12h16l3 8v8h-4v40H23V36h-4v-8l3-8Z" fill="none" stroke="#1c3568"/><path d="M30 20v48" stroke="#16294f" stroke-width="1.5"/><rect x="19" y="30" width="22" height="3" fill="#cfd8e4"/><rect x="24" y="56" width="12" height="3" fill="#cfd8e4"/></svg>',
    acc: '<svg viewBox="0 0 60 84" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="16" y="24" width="28" height="36" rx="4" fill="#c9d5de" stroke="#aab8c2"/><path d="M22 30h16M22 38h16M22 46h10" stroke="#8ea0ac" stroke-width="2" stroke-linecap="round"/><rect x="24" y="14" width="12" height="10" rx="2" fill="#7c8c9a"/></svg>'
  };

  var CATS = [
    { id: 'all',       label: 'All equipment' },
    { id: 'portable',  label: 'Portable' },
    { id: 'mobile',    label: 'Mobile / Wheeled' },
    { id: 'automatic', label: 'Automatic' },
    { id: 'blanket',   label: 'Fire Blankets' },
    { id: 'hosereel',  label: 'Hose Reels' },
    { id: 'ppe',       label: 'FR Coveralls' },
    { id: 'accessory', label: 'Accessories' }
  ];

  // band = colour code, icon key
  var P = [
    // Portable — ABE powder
    { c:'43-G1ABE-FF2', n:'ABE Dry Powder 1.0kg', cat:'portable', band:'#ffffff', icon:'ext',
      s:{ 'Fire class':'A · B · C · E', 'Rating':'1A:10B:E', 'Agent':'ABE Dry Powder', 'Approval':'AS/NZS 1841.5' } },
    { c:'43-G1.5ABESVB', n:'ABE Dry Powder 1.5kg', cat:'portable', band:'#ffffff', icon:'ext',
      s:{ 'Fire class':'A · B · C · E', 'Rating':'2A:30B:E', 'Agent':'ABE Dry Powder', 'Approval':'AS/NZS 1841.5' } },
    { c:'43-G2.5ABEVB', n:'ABE Dry Powder 2.5kg', cat:'portable', band:'#ffffff', icon:'ext',
      s:{ 'Fire class':'A · B · C · E', 'Rating':'3A:40B:E', 'Agent':'ABE Dry Powder', 'Approval':'AS/NZS 1841.5' } },
    { c:'43-G4.5ABE', n:'ABE Dry Powder 4.5kg', cat:'portable', band:'#ffffff', icon:'ext',
      s:{ 'Fire class':'A · B · C · E', 'Rating':'4A:60B:E', 'Agent':'ABE Dry Powder', 'Approval':'AS/NZS 1841.5' } },
    { c:'43-G9ABE', n:'ABE Dry Powder 9.0kg', cat:'portable', band:'#ffffff', icon:'ext',
      s:{ 'Fire class':'A · B · C · E', 'Rating':'6A:80B:E', 'Agent':'ABE Dry Powder', 'Approval':'AS/NZS 1841.5' } },
    { c:'43-G4.5ABEHP', n:'ABE Hi-Performance 4.5kg', cat:'portable', band:'#ffffff', icon:'ext',
      s:{ 'Fire class':'A · B · C · E', 'Rating':'4A:60B:E', 'Agent':'ABE Dry Powder', 'Use':'Mine site / service station' } },
    { c:'43-9ABEHP', n:'ABE Hi-Performance 9.0kg', cat:'portable', band:'#ffffff', icon:'ext',
      s:{ 'Fire class':'A · B · C · E', 'Rating':'6A:80B:E', 'Agent':'ABE Dry Powder', 'Use':'High-risk industrial' } },
    // Portable — CO2
    { c:'43-G3.5CO2', n:'Carbon Dioxide 3.5kg', cat:'portable', band:'#111111', icon:'ext',
      s:{ 'Fire class':'E (Electrical)', 'Rating':'5B:E', 'Agent':'CO₂', 'Approval':'AS/NZS 1841.6' } },
    { c:'43-G5.0CO2', n:'Carbon Dioxide 5.0kg', cat:'portable', band:'#111111', icon:'ext',
      s:{ 'Fire class':'E (Electrical)', 'Rating':'10B:E', 'Agent':'CO₂', 'Approval':'AS/NZS 1841.6' } },
    // Portable — AFFF / Air / Wet
    { c:'43-G9LAFFF', n:'AFFF Foam 9.0L', cat:'portable', band:'#1c4fa0', icon:'ext',
      s:{ 'Fire class':'A · B', 'Rating':'3A:30B', 'Agent':'AFFF Concentrate', 'Approval':'AS/NZS 1841.4' } },
    { c:'43-G9LAW', n:'Air / Water 9.0L', cat:'portable', band:'#e11d1d', icon:'ext',
      s:{ 'Fire class':'A', 'Rating':'3A', 'Agent':'Air & Water', 'Approval':'AS/NZS 1841.2' } },
    { c:'43-G7LWC', n:'Wet Chemical 7.0L', cat:'portable', band:'#e6dcc0', icon:'ext',
      s:{ 'Fire class':'A · F (Fat / Oil)', 'Rating':'3A:4F', 'Agent':'Wet Chemical', 'Approval':'AS/NZS 1841.3' } },
    // Mobile / wheeled
    { c:'43-M30ABEM', n:'Mobile ABE Powder 30kg', cat:'mobile', band:'#ffffff', icon:'ext',
      s:{ 'Fire class':'A · B · E', 'Rating':'6A:80B:E', 'Agent':'ABE Dry Powder', 'Trolley':'Galvanised, hard rubber tyres' } },
    { c:'43-M50ABEM', n:'Mobile ABE Powder 50kg', cat:'mobile', band:'#ffffff', icon:'ext',
      s:{ 'Fire class':'A · B · E', 'Rating':'6A:80B:E', 'Agent':'ABE Dry Powder', 'Trolley':'Galvanised, hard rubber tyres' } },
    { c:'43-M90ABEM', n:'Mobile ABE Powder 90kg', cat:'mobile', band:'#ffffff', icon:'ext',
      s:{ 'Fire class':'A · B · E', 'Rating':'6A:80B:E', 'Agent':'ABE Dry Powder', 'Trolley':'Galvanised, hard rubber tyres' } },
    { c:'43-M50BEM', n:'Mobile BE Powder 50kg', cat:'mobile', band:'#111111', icon:'ext',
      s:{ 'Fire class':'B · C · E · F', 'Rating':'6A:80B:E', 'Agent':'BE Dry Powder', 'Use':'Diesel, cooking oils & fats' } },
    { c:'43-M45CO2M', n:'Mobile Carbon Dioxide', cat:'mobile', band:'#111111', icon:'ext',
      s:{ 'Fire class':'E (Electrical)', 'Rating':'10B', 'Agent':'CO₂', 'Use':'Marine vessels' } },
    { c:'43-M90LAFFF', n:'Mobile AFFF Foam 90L', cat:'mobile', band:'#1c4fa0', icon:'ext',
      s:{ 'Fire class':'A · B', 'Rating':'3A:30B', 'Agent':'AFFF Concentrate', 'Trolley':'Galvanised UV-coated' } },
    // Automatic
    { c:'43-M6KGAUTO79', n:'Automatic ABE 6.0kg', cat:'automatic', band:'#ffffff', icon:'ext',
      s:{ 'Fire class':'A · B', 'Activation':'Sprinkler valve @ 79°C', 'Agent':'ABE Dry Powder', 'Use':'Flammable liquid bays' } },
    { c:'43-M9KGAUTO79', n:'Automatic ABE 9.0kg', cat:'automatic', band:'#ffffff', icon:'ext',
      s:{ 'Fire class':'A · B', 'Activation':'Sprinkler valve @ 79°C', 'Agent':'ABE Dry Powder', 'Use':'Dangerous goods areas' } },
    // Blankets
    { c:'43-FS100', n:'Fire Blanket 1.0 × 1.0m', cat:'blanket', band:'#d64420', icon:'blanket',
      s:{ 'Fire class':'F (Cooking oil)', 'Size':'1 × 1 m', 'Material':'Woven fibreglass', 'Approval':'AS/NZS 3504' } },
    { c:'43-FS120', n:'Fire Blanket 1.2 × 1.2m', cat:'blanket', band:'#d64420', icon:'blanket',
      s:{ 'Fire class':'F (Cooking oil)', 'Size':'1.2 × 1.2 m', 'Material':'Woven fibreglass', 'Approval':'AS/NZS 3504' } },
    { c:'43-FS180', n:'Fire Blanket 1.2 × 1.8m', cat:'blanket', band:'#d64420', icon:'blanket',
      s:{ 'Fire class':'F (Cooking oil)', 'Size':'1.2 × 1.8 m', 'Material':'Woven fibreglass', 'Approval':'AS/NZS 3504' } },
    // Hose reels
    { c:'43-HREEL36', n:'Standard Fire Hose Reel', cat:'hosereel', band:'#e11d1d', icon:'reel',
      s:{ 'Hose':'36m × Ø19mm', 'Max pressure':'1350 kPa', 'Nozzle':'Adjustable twist', 'Approval':'AS/NZS 1221' } },
    { c:'43-HREEL', n:'LKS Fire Hose Reel', cat:'hosereel', band:'#e11d1d', icon:'reel',
      s:{ 'Hose':'36m × Ø19mm', 'Max pressure':'1350 kPa', 'Nozzle':'Valve-type', 'Approval':'AS/NZS 1221:1997' } },
    { c:'43-HREEL36SS', n:'Stainless Steel Hose Reel', cat:'hosereel', band:'#94a3b0', icon:'reel',
      s:{ 'Hose':'36m × Ø19mm', 'Max pressure':'1350 kPa', 'Body':'Stainless steel — marine', 'Approval':'AS/NZS 1221' } },
    // FR Coveralls / PPE
    { c:'FR-COT-240', n:'100% Cotton FR Coverall', cat:'ppe', band:'#1c4fa0', icon:'ppe',
      s:{ 'Fabric':'100% Cotton FR · 240 GSM', 'Passes':'A1 · B1 · C1', 'Certification':'EN ISO 11612:2015', 'Sizes':'S – XXXL' } },
    { c:'IFR-ULTRA', n:'IFR Ultrasoft Coverall', cat:'ppe', band:'#d64420', icon:'ppe',
      s:{ 'Fabric':'93% Meta / 5% Para Aramid · 150 GSM', 'Passes':'A1 · B1 · C1 · F1', 'Certification':'EN ISO 11612 · EN 1149', 'Use':'Oil & gas / refinery' } },
    // Accessories
    { c:'43-WVBA', n:'Aluminium Vehicle Bracket', cat:'accessory', band:'#94a3b0', icon:'acc',
      s:{ 'Fits':'4.5kg – 9.0kg', 'Type':'Quick-release', 'Use':'Maritime' } },
    { c:'43-HFB-001', n:'Hose Reel Foam Branch Kit', cat:'accessory', band:'#1c4fa0', icon:'acc',
      s:{ 'Proportioning':'6% foam', 'Compatible':'AFFF low-expansion', 'Type':'Foam branch pipe' } },
    { c:'43-SILS', n:'Extinguisher Location Sign', cat:'accessory', band:'#e11d1d', icon:'acc',
      s:{ 'Mount':'Flat & 90° angle', 'Material':'Plastic', 'Type':'ID & location signage' } },
    { c:'43-WPU', n:'Service Maintenance Punch', cat:'accessory', band:'#7c8c9a', icon:'acc',
      s:{ 'Numbered':'1 – 5', 'Use':'Date-tag servicing', 'Type':'Maintenance tool' } }
  ];

  var grid = document.getElementById('prodgrid');
  var chipbox = document.getElementById('chips');
  var searchInput = document.getElementById('prod-search');
  var countEl = document.getElementById('prod-count');
  if (!grid) return;

  var state = { cat: 'all', q: '' };

  function counts() {
    var m = { all: P.length };
    P.forEach(function (p) { m[p.cat] = (m[p.cat] || 0) + 1; });
    return m;
  }

  function chips() {
    var m = counts();
    chipbox.innerHTML = CATS.map(function (c) {
      var n = m[c.id] || 0;
      return '<button class="chip' + (c.id === state.cat ? ' is-active' : '') + '" data-cat="' + c.id + '">' +
        c.label + '<span class="count">' + n + '</span></button>';
    }).join('');
    chipbox.querySelectorAll('.chip').forEach(function (b) {
      b.addEventListener('click', function () { state.cat = b.dataset.cat; render(); });
    });
  }

  function card(p) {
    var catLabel = (CATS.filter(function (c) { return c.id === p.cat; })[0] || {}).label || p.cat;
    var specs = Object.keys(p.s).map(function (k) {
      return '<li><span>' + k + '</span><span>' + p.s[k] + '</span></li>';
    }).join('');
    return '<article class="prod" data-reveal>' +
      '<div class="prod__vis" style="--bandc:' + p.band + '">' +
        '<div class="prod__band" style="background:' + p.band + ';border:1px solid rgba(0,0,0,.12)"></div>' +
        ICON[p.icon] +
        '<span class="prod__cat">' + catLabel + '</span>' +
      '</div>' +
      '<div class="prod__body">' +
        '<span class="prod__code">' + p.c + '</span>' +
        '<h3>' + p.n + '</h3>' +
        '<ul class="prod__spec">' + specs + '</ul>' +
        '<div class="prod__foot"><a class="prod__link" href="contact.html?interest=' + encodeURIComponent(p.c + ' — ' + p.n) + '">Request quote' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a></div>' +
      '</div>' +
    '</article>';
  }

  function render() {
    var q = state.q.trim().toLowerCase();
    var list = P.filter(function (p) {
      if (state.cat !== 'all' && p.cat !== state.cat) return false;
      if (!q) return true;
      var hay = (p.c + ' ' + p.n + ' ' + Object.values(p.s).join(' ')).toLowerCase();
      return hay.indexOf(q) !== -1;
    });
    grid.innerHTML = list.length
      ? list.map(card).join('')
      : '<p class="noresults">No equipment matches “' + state.q + '”. Try a part code, agent type or fire class.</p>';
    if (countEl) countEl.textContent = list.length + (list.length === 1 ? ' item' : ' items');
    // re-observe reveals
    grid.querySelectorAll('[data-reveal]').forEach(function (el) { el.classList.add('in'); });
    chipbox.querySelectorAll('.chip').forEach(function (b) {
      b.classList.toggle('is-active', b.dataset.cat === state.cat);
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', function () { state.q = searchInput.value; render(); });
  }

  chips();
  render();
})();
