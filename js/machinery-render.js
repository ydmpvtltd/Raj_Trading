/*
 * Raj Trading – machinery page renderer.
 *
 * Pure functions that turn data/harvesters.js into HTML strings. Used in two places:
 *   - tools/build-machinery.js (Node) pre-renders the static pages so search engines
 *     can read every spec without JavaScript.
 *   - js/machinery-page.js (browser) renders a page from the data if it was not
 *     pre-rendered, e.g. for a future translated copy of the data.
 *
 * `root` is the relative path from the page to the site root ('../' for /machinery/).
 */
(function (root) {
  const WA_GREEN = 'bg-[#0F7A3F] hover:bg-[#0A6633]'; // AA contrast with white text

  function esc(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // Fill {placeholders} in a template string
  function fmt(template, vars) {
    return template.replace(/\{(\w+)\}/g, (match, key) => (key in vars ? vars[key] : match));
  }

  function waUrl(D, text) {
    return `https://wa.me/${D.business.whatsapp}?text=${encodeURIComponent(text)}`;
  }

  function telUrl(D) {
    return `tel:${D.business.phones[0].tel}`;
  }

  function modelUrl(model, base) {
    return `${base}${model.id}.html`;
  }

  function specLabel(D, key) {
    return D.specs.find(spec => spec.key === key).label;
  }

  function newTab(D) {
    return `target="_blank" rel="noopener"`;
  }

  function srNewTab(D) {
    return `<span class="sr-only"> ${esc(D.ui.opensInNewTab)}</span>`;
  }

  /* ---------- Shared chrome: header, footer, sticky bar, demo dialog ---------- */

  function header(D, { root = '../', active = 'machinery' } = {}) {
    const n = D.ui.nav;
    const links = [
      { key: 'home', href: `${root}index.html` },
      { key: 'machinery', href: `${root}machinery/index.html` },
      { key: 'service', href: `${root}index.html#service` },
      { key: 'parts', href: `${root}index.html#parts` },
      { key: 'contact', href: `${root}index.html#contact` },
    ];
    const quoteUrl = waUrl(D, D.ui.demo.enquiryMessage);
    const desktop = links.map(link => {
      const isActive = link.key === active;
      return `<a href="${link.href}" class="nav-link ${isActive ? 'text-[#0B5D1E] border-b-2 border-[#0B5D1E] pb-1' : ''} hover:text-[#0B5D1E] transition-colors"${isActive ? ' aria-current="page"' : ''}>${esc(n[link.key])}</a>`;
    }).join('\n        ');
    const mobile = links.map(link => {
      const isActive = link.key === active;
      return `<a href="${link.href}" class="mobile-nav-link text-left py-3.5 px-4 text-base font-semibold border-b border-gray-100 ${isActive ? 'text-[#0B5D1E] bg-[#EAF4EA] rounded' : 'text-[#1F2933]'}"${isActive ? ' aria-current="page"' : ''}>${esc(n[link.key])}</a>`;
    }).join('\n      ');
    const phones = D.business.phones.map(phone =>
      `<a href="tel:${phone.tel}" class="flex items-center gap-2 hover:text-[#F2A900] transition-colors"><i data-lucide="phone" class="w-4 h-4" aria-hidden="true"></i> ${esc(phone.display)}</a>`
    ).join('\n        ');

    return `<header class="sticky top-0 z-40 bg-white shadow-md border-b border-gray-100">
    <!-- Top Bar -->
    <div class="hidden md:flex justify-between items-center px-6 py-2 bg-[#063B12] text-white text-sm">
      <div class="flex items-center gap-6">
        <span class="flex items-center gap-2"><i data-lucide="map-pin" class="w-4 h-4 text-[#F2A900]" aria-hidden="true"></i> ${esc(D.business.location)}</span>
      </div>
      <div class="flex items-center gap-6">
        ${phones}
      </div>
    </div>

    <!-- Main Nav -->
    <div class="px-4 md:px-8 py-3.5 flex justify-between items-center bg-white">
      <a href="${root}index.html" class="flex items-center gap-2.5 md:gap-4 max-w-[72%] md:max-w-full">
        <img src="${root}lovol_logo.png" alt="LOVOL Logo" width="820" height="230" class="h-9 md:h-14 w-auto object-contain shrink-0" />
        <span class="flex flex-col border-l-2 border-gray-200 pl-2.5 md:pl-4">
          <span class="text-base sm:text-lg md:text-3xl font-extrabold text-[#0B5D1E] tracking-tight leading-none mb-1">RAJ TRADING</span>
          <span class="text-[8.5px] sm:text-[10px] md:text-sm text-gray-600 font-semibold leading-tight">${esc(D.business.tagline)}</span>
        </span>
      </a>

      <!-- Desktop Nav -->
      <nav class="hidden lg:flex items-center gap-8 font-semibold text-[#1F2933]" aria-label="Main">
        ${desktop}

        <a href="${quoteUrl}" ${newTab(D)} class="inline-flex items-center justify-center px-6 py-3 font-semibold rounded transition-all duration-300 ease-in-out text-center bg-[#F2A900] text-[#1F2933] hover:bg-yellow-500 shadow-md">
          ${esc(n.requestQuote)}${srNewTab(D)}
        </a>
      </nav>

      <!-- Mobile Toggle -->
      <button id="mobile-menu-btn" type="button" class="lg:hidden text-[#1F2933] p-2.5 touch-manipulation" aria-label="${esc(n.toggleMenu)}" aria-expanded="false" aria-controls="mobile-menu">
        <i data-lucide="menu" class="w-7 h-7" id="menu-icon" aria-hidden="true"></i>
      </button>
    </div>

    <!-- Mobile Menu -->
    <nav id="mobile-menu" class="hidden lg:hidden absolute top-full left-0 w-full bg-white shadow-2xl border-t border-gray-100 flex-col p-5 z-50" aria-label="Mobile">
      ${mobile}

      <div class="flex flex-col gap-3 mt-5">
        <a href="${telUrl(D)}" class="inline-flex items-center justify-center py-3.5 px-6 font-semibold rounded transition-all bg-[#0B5D1E] text-white hover:bg-[#063B12] shadow-md w-full touch-manipulation">
          <i data-lucide="phone" class="w-4 h-4 mr-2" aria-hidden="true"></i> ${esc(n.callNowNumber)}
        </a>
        <a href="${quoteUrl}" ${newTab(D)} class="inline-flex items-center justify-center py-3.5 px-6 font-semibold rounded transition-all ${WA_GREEN} text-white shadow-md w-full touch-manipulation">
          <i data-lucide="message-circle" class="w-4 h-4 mr-2" aria-hidden="true"></i> ${esc(n.whatsappUs)}${srNewTab(D)}
        </a>
      </div>
    </nav>
  </header>`;
  }

  function footer(D, { root = '../' } = {}) {
    const n = D.ui.nav;
    const f = D.ui.footer;
    const links = [
      [n.home, `${root}index.html`],
      [n.machinery, `${root}machinery/index.html`],
      [n.service, `${root}index.html#service`],
      [n.parts, `${root}index.html#parts`],
      [n.contact, `${root}index.html#contact`],
    ].map(([label, href]) =>
      `<li><a href="${href}" class="hover:text-[#F2A900] transition-colors flex items-center gap-2"><i data-lucide="chevron-right" class="w-4 h-4 text-[#4ADE80]" aria-hidden="true"></i> ${esc(label)}</a></li>`
    ).join('\n          ');
    const phones = D.business.phones.map(phone => `<li class="flex items-center gap-3">
            <i data-lucide="phone" class="w-5 h-5 text-[#F2A900] shrink-0" aria-hidden="true"></i>
            <a href="tel:${phone.tel}" class="hover:text-white transition-colors">${esc(phone.display)}</a>
          </li>`).join('\n          ');

    return `<footer class="bg-[#1F2933] text-gray-300 pt-16 pb-24 md:pb-12 border-t-4 border-[#0B5D1E]">
    <div class="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-12 mb-12">
      <div>
        <div class="flex items-center gap-3 mb-4">
          <div class="bg-white px-3 py-1.5 rounded-lg shadow-sm">
            <img src="${root}lovol_logo.png" alt="LOVOL Logo" width="820" height="230" loading="lazy" class="h-8 w-auto object-contain" />
          </div>
          <div class="bg-white px-2.5 py-1.5 rounded-lg shadow-sm flex items-center justify-center">
            <img src="${root}rajlogo.jpeg" alt="Raj Trading Logo" width="640" height="640" loading="lazy" class="h-8 w-8 object-cover rounded" />
          </div>
        </div>
        <p class="text-2xl font-extrabold text-white mb-2 tracking-tight">RAJ TRADING</p>
        <p class="text-sm text-[#F2A900] font-medium mb-6">${esc(D.business.tagline)}</p>
        <p class="text-sm mb-4 leading-relaxed">${esc(f.about)}</p>
      </div>

      <div>
        <h2 class="text-white font-bold mb-6 text-lg">${esc(f.quickLinks)}</h2>
        <ul class="space-y-3 font-medium text-sm sm:text-base">
          ${links}
        </ul>
      </div>

      <div>
        <h2 class="text-white font-bold mb-6 text-lg">${esc(f.contactUs)}</h2>
        <ul class="space-y-4 text-sm font-medium">
          <li class="flex items-start gap-3">
            <i data-lucide="map-pin" class="w-5 h-5 text-[#F2A900] shrink-0 mt-0.5" aria-hidden="true"></i>
            <span>${esc(D.business.location)}</span>
          </li>
          ${phones}
          <li class="flex items-start gap-3">
            <i data-lucide="clock" class="w-5 h-5 text-[#F2A900] shrink-0 mt-0.5" aria-hidden="true"></i>
            <span>${esc(D.business.hours).replace('\n', '<br>')}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="container mx-auto px-4 pt-8 border-t border-gray-700 text-sm text-center font-medium">
      <p>&copy; <span id="current-year">${new Date().getFullYear()}</span> ${esc(D.business.name)}. ${esc(f.rights)}</p>
    </div>
  </footer>`;
  }

  // Mobile sticky bar: Call | WhatsApp | Enquire (Enquire opens the demo/enquiry dialog)
  function stickyBar(D, { whatsappText } = {}) {
    const s = D.ui.stickyBar;
    return `<div class="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 flex shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-40">
    <a href="${telUrl(D)}" class="flex-1 py-3.5 flex flex-col items-center justify-center text-[#1F2933] font-bold text-xs hover:bg-gray-50 border-r border-gray-100 touch-manipulation">
      <i data-lucide="phone" class="w-5 h-5 mb-1 text-[#0B5D1E]" aria-hidden="true"></i> ${esc(s.call)}
    </a>
    <a href="${waUrl(D, whatsappText || D.ui.demo.enquiryMessage)}" ${newTab(D)} class="flex-1 py-3.5 flex flex-col items-center justify-center text-white ${WA_GREEN} font-bold text-xs touch-manipulation">
      <i data-lucide="message-circle" class="w-5 h-5 mb-1" aria-hidden="true"></i> ${esc(s.whatsapp)}${srNewTab(D)}
    </a>
    <button type="button" data-open-demo class="flex-1 py-3.5 flex flex-col items-center justify-center text-[#1F2933] font-bold text-xs hover:bg-gray-50 touch-manipulation">
      <i data-lucide="calendar-check" class="w-5 h-5 mb-1 text-[#0B5D1E]" aria-hidden="true"></i> ${esc(s.enquire)}
    </button>
  </div>`;
  }

  // Book a Demo dialog. Composes a WhatsApp message; there is no backend yet.
  function demoDialog(D, { selected = '' } = {}) {
    const d = D.ui.demo;
    const options = [`<option value="">${esc(d.noModel)}</option>`]
      .concat(D.models.map(model => `<option value="${esc(model.name)}"${model.id === selected ? ' selected' : ''}>LOVOL ${esc(model.name)}</option>`))
      .join('');
    const field = 'w-full p-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0B5D1E] focus:border-transparent outline-none text-base bg-white';
    const label = 'block text-sm font-semibold text-gray-700 mb-1';
    return `<dialog id="demo-dialog" class="rt-dialog w-[calc(100%-2rem)] max-w-lg rounded-2xl p-0 shadow-2xl" aria-labelledby="demo-heading">
    <form id="demo-form" class="p-6 sm:p-8 space-y-4" method="dialog">
      <div class="flex items-start justify-between gap-4">
        <h2 id="demo-heading" class="text-xl sm:text-2xl font-bold text-[#1F2933]">${esc(d.heading)}</h2>
        <button type="button" data-close-demo class="p-2 -m-2 text-gray-600 hover:text-[#1F2933] rounded-lg" aria-label="${esc(d.close)}"><i data-lucide="x" class="w-5 h-5" aria-hidden="true"></i></button>
      </div>
      <p class="text-sm text-gray-600">${esc(d.intro)}</p>
      <div>
        <label for="demo-name" class="${label}">${esc(d.name)} *</label>
        <input id="demo-name" name="name" type="text" required autocomplete="name" class="${field}">
      </div>
      <div>
        <label for="demo-mobile" class="${label}">${esc(d.mobile)} *</label>
        <input id="demo-mobile" name="mobile" type="tel" required autocomplete="tel" inputmode="tel" class="${field}">
      </div>
      <div>
        <label for="demo-location" class="${label}">${esc(d.location)} *</label>
        <input id="demo-location" name="location" type="text" required class="${field}">
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label for="demo-date" class="${label}">${esc(d.date)}</label>
          <input id="demo-date" name="date" type="date" class="${field}">
        </div>
        <div>
          <label for="demo-model" class="${label}">${esc(d.model)}</label>
          <select id="demo-model" name="model" class="${field}">${options}</select>
        </div>
      </div>
      <button type="submit" class="inline-flex items-center justify-center px-6 py-4 font-semibold rounded-xl transition-all ${WA_GREEN} text-white shadow-md w-full text-base touch-manipulation">
        <i data-lucide="message-circle" class="w-5 h-5 mr-2" aria-hidden="true"></i> ${esc(d.submit)}
      </button>
    </form>
  </dialog>`;
  }

  function breadcrumb(D, items) {
    const parts = items.map((item, i) => {
      const last = i === items.length - 1;
      const sep = i ? '<li aria-hidden="true" class="text-gray-400">›</li>' : '';
      const body = last
        ? `<li><span aria-current="page" class="font-semibold text-[#1F2933]">${esc(item.label)}</span></li>`
        : `<li><a href="${item.href}" class="text-[#0B5D1E] hover:underline">${esc(item.label)}</a></li>`;
      return sep + body;
    }).join('');
    return `<nav aria-label="${esc(D.ui.breadcrumb.label)}" class="container mx-auto px-4 pt-6">
      <ol class="flex flex-wrap items-center gap-2 text-sm text-gray-600">${parts}</ol>
    </nav>`;
  }

  /* ---------- Cards and comparison ---------- */

  function modelCard(D, model, { root = '../', base = '', headingLevel = 3 } = {}) {
    const b = D.ui.buttons;
    const specs = D.cardSpecs.map(key => `<div class="bg-gray-50 rounded-xl p-3 text-center">
                <dt class="text-xs text-gray-600 font-medium">${esc(specLabel(D, key))}</dt>
                <dd class="text-sm sm:text-base font-bold text-[#1F2933]">${esc(model.specs[key].value)}</dd>
              </div>`).join('\n              ');
    const h = `h${headingLevel}`;
    return `<article class="model-card bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 overflow-hidden flex flex-col h-full">
            <a href="${modelUrl(model, base)}" class="relative bg-white block" tabindex="-1" aria-hidden="true">
              <!-- Product photo: ${esc(model.image)} (800×800). Replace that file to change the photo. -->
              <img src="${root}${model.image}" alt="" width="800" height="800" loading="lazy" decoding="async" class="w-full h-56 sm:h-64 object-contain" />
              <span class="absolute top-4 right-4 bg-[#F2A900] text-[#1F2933] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">${esc(D.ui.breadcrumb.harvesters)}</span>
            </a>
            <div class="p-6 flex flex-col flex-grow">
              <p class="text-sm font-semibold text-[#0B5D1E] mb-1">${esc(model.type)}</p>
              <${h} class="text-xl sm:text-2xl font-bold text-[#1F2933] mb-4"><a href="${modelUrl(model, base)}" class="hover:text-[#0B5D1E]">LOVOL ${esc(model.name)}</a></${h}>
              <dl class="grid grid-cols-3 gap-2 mb-6">
              ${specs}
              </dl>
              <div class="mt-auto space-y-3">
                <a href="${modelUrl(model, base)}" class="inline-flex items-center justify-center px-6 py-3.5 font-semibold rounded-xl transition-all bg-[#0B5D1E] text-white hover:bg-[#063B12] shadow-md w-full text-sm sm:text-base touch-manipulation">${esc(b.viewDetails)}<span class="sr-only"> – LOVOL ${esc(model.name)}</span></a>
                <a href="${waUrl(D, fmt(D.ui.whatsapp.price, { model: model.name }))}" ${newTab(D)} class="inline-flex items-center justify-center px-6 py-3.5 font-semibold rounded-xl transition-all ${WA_GREEN} text-white shadow-md w-full text-sm sm:text-base touch-manipulation"><i data-lucide="message-circle" class="w-5 h-5 mr-2" aria-hidden="true"></i> ${esc(b.whatsappEnquiry)}<span class="sr-only"> – LOVOL ${esc(model.name)} ${esc(D.ui.opensInNewTab)}</span></a>
              </div>
            </div>
          </article>`;
  }

  // Which models hold the best value for a spec (empty when all are equal)
  function bestIds(D, spec) {
    if (spec.compare !== 'max') return [];
    const nums = D.models.map(model => model.specs[spec.key].num);
    const best = Math.max(...nums);
    if (nums.every(n => n === best)) return [];
    return D.models.filter(model => model.specs[spec.key].num === best).map(model => model.id);
  }

  function comparisonTable(D, { base = '' } = {}) {
    const l = D.ui.listing;
    const head = D.models.map(model =>
      `<th scope="col" class="p-4 text-left align-bottom min-w-[150px]"><a href="${modelUrl(model, base)}" class="text-base sm:text-lg font-bold text-white hover:text-[#F2A900]">LOVOL ${esc(model.name)}</a><span class="block text-xs font-medium text-gray-200 mt-1">${esc(model.type)}</span></th>`
    ).join('\n            ');
    const rows = D.specs.map((spec, i) => {
      const best = bestIds(D, spec);
      const cells = D.models.map(model => {
        const isBest = best.includes(model.id);
        const value = esc(model.specs[spec.key].value);
        return isBest
          ? `<td class="p-4 bg-[#EAF4EA] text-[#0B5D1E] font-bold whitespace-nowrap">${value} <span class="ml-1 inline-block align-middle bg-[#0B5D1E] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">${esc(l.bestLabel)}</span></td>`
          : `<td class="p-4 text-gray-700 whitespace-nowrap">${value}</td>`;
      }).join('');
      return `<tr class="${i % 2 ? 'bg-gray-50' : 'bg-white'} border-t border-gray-100">
            <th scope="row" class="rt-sticky-col p-4 text-left font-semibold text-[#1F2933] whitespace-nowrap ${i % 2 ? 'bg-gray-50' : 'bg-white'}">${esc(spec.label)}</th>${cells}
          </tr>`;
    }).join('\n          ');
    return `<div class="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm bg-white" tabindex="0" role="region" aria-label="${esc(l.compareCaption)}">
        <table class="w-full text-sm sm:text-base border-collapse">
          <caption class="sr-only">${esc(l.compareCaption)}</caption>
          <thead class="bg-[#063B12]">
            <tr>
            <th scope="col" class="rt-sticky-col p-4 text-left text-white font-semibold bg-[#063B12]">${esc(D.ui.specColumn)}</th>
            ${head}
            </tr>
          </thead>
          <tbody>
          ${rows}
          </tbody>
        </table>
      </div>`;
  }

  /* ---------- Product page ---------- */

  function specTable(D, model) {
    const rows = D.specs.map(spec => {
      const s = model.specs[spec.key];
      const todo = s.todo ? `<!-- ${s.todo.replace(/--/g, '–')} -->\n            ` : '';
      return `${todo}<tr class="border-t border-gray-100">
              <th scope="row" class="p-4 text-left font-semibold text-[#1F2933] w-1/2">${esc(spec.label)}</th>
              <td class="p-4 text-gray-700">${esc(s.value)}</td>
            </tr>`;
    }).join('\n            ');
    return `<div class="overflow-hidden rounded-2xl border border-gray-200 shadow-sm bg-white">
          <table class="w-full text-sm sm:text-base">
            <caption class="sr-only">${esc(fmt(D.ui.specsCaption, { model: model.name }))}</caption>
            <thead class="bg-[#063B12] text-white">
              <tr><th scope="col" class="p-4 text-left">${esc(D.ui.specColumn)}</th><th scope="col" class="p-4 text-left">${esc(D.ui.valueColumn)}</th></tr>
            </thead>
            <tbody>
            ${rows}
            </tbody>
          </table>
        </div>`;
  }

  function productMain(D, model, { root = '../' } = {}) {
    const u = D.ui;
    const b = u.buttons;
    const priceUrl = waUrl(D, fmt(u.whatsapp.price, { model: model.name }));
    const btn = 'inline-flex items-center justify-center px-6 py-3.5 font-semibold rounded-xl transition-all text-base touch-manipulation';

    const tiles = D.specs.filter(spec => spec.highlight).map(spec => `<div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6 text-center">
            <div class="w-12 h-12 bg-[#EAF4EA] text-[#0B5D1E] rounded-full flex items-center justify-center mx-auto mb-3"><i data-lucide="${spec.icon}" class="w-6 h-6" aria-hidden="true"></i></div>
            <p class="text-sm text-gray-600 font-medium">${esc(spec.label)}</p>
            <p class="text-xl sm:text-2xl font-extrabold text-[#1F2933]">${esc(model.specs[spec.key].value)}</p>
          </div>`).join('\n          ');

    const features = model.features.map(feature => `<li class="flex gap-3">
              <i data-lucide="check-circle-2" class="w-6 h-6 text-[#0B5D1E] shrink-0 mt-0.5" aria-hidden="true"></i>
              <span class="text-gray-700">${esc(feature)}</span>
            </li>`).join('\n            ');

    const crops = D.crops.map(crop => `<li class="px-4 py-2 bg-[#EAF4EA] text-[#0B5D1E] rounded-full text-sm font-semibold">${esc(crop)}</li>`).join('\n              ');

    const others = D.models.filter(other => other.id !== model.id).map(other => `<a href="${modelUrl(other, '')}" class="group flex items-center gap-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow p-4">
            <img src="${root}${other.image}" alt="" width="800" height="800" loading="lazy" decoding="async" class="w-24 h-24 sm:w-28 sm:h-28 object-contain shrink-0" />
            <span class="min-w-0">
              <span class="block text-xs font-semibold text-[#0B5D1E]">${esc(other.type)}</span>
              <span class="block text-lg font-bold text-[#1F2933] group-hover:text-[#0B5D1E]">LOVOL ${esc(other.name)}</span>
              <span class="block text-sm text-gray-600">${esc(other.specs.enginePower.value)} · ${esc(other.specs.feedingRate.value)} · ${esc(other.specs.grainTank.value)}</span>
            </span>
            <i data-lucide="arrow-right" class="w-5 h-5 text-[#0B5D1E] ml-auto shrink-0" aria-hidden="true"></i>
          </a>`).join('\n          ');

    const faqs = u.faqs.map(faq => `<details class="rt-faq group bg-white rounded-2xl border border-gray-100 shadow-sm">
            <summary class="flex items-center justify-between gap-4 p-5 cursor-pointer font-semibold text-[#1F2933]">
              ${esc(fmt(faq.q, { model: model.name }))}
              <i data-lucide="chevron-down" class="rt-faq-icon w-5 h-5 text-[#0B5D1E] shrink-0 transition-transform" aria-hidden="true"></i>
            </summary>
            <p class="px-5 pb-5 text-gray-700">${esc(fmt(faq.a, { model: model.name }))}</p>
          </details>`).join('\n          ');

    return `${breadcrumb(D, [
      { label: u.breadcrumb.home, href: `${root}index.html` },
      { label: u.breadcrumb.machinery, href: 'index.html' },
      { label: u.breadcrumb.harvesters, href: 'index.html#harvesters' },
      { label: model.name },
    ])}

    <!-- Hero -->
    <section class="container mx-auto px-4 py-8 sm:py-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
      <div class="order-2 lg:order-1">
        <p class="inline-block px-3 py-1 bg-[#EAF4EA] text-[#0B5D1E] rounded-full text-sm font-semibold mb-4">${esc(model.type)}</p>
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1F2933] leading-tight mb-4">LOVOL ${esc(model.name)}</h1>
        <p class="text-base sm:text-lg text-gray-700 mb-5">${esc(model.summary)}</p>
        <p class="inline-flex items-center gap-2 text-sm font-semibold text-[#1F2933] bg-[#FFF6DB] border border-[#F2A900] rounded-full px-4 py-2 mb-6">
          <i data-lucide="badge-check" class="w-5 h-5 text-[#0B5D1E]" aria-hidden="true"></i> ${esc(u.dealerBadge)}
        </p>
        <div class="mb-6">
          <p class="text-2xl font-extrabold text-[#0B5D1E]">${esc(u.priceOnRequest)}</p>
          <p class="text-sm text-gray-600">${esc(u.priceNote)}</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <a href="${priceUrl}" ${newTab(D)} class="${btn} ${WA_GREEN} text-white shadow-md sm:col-span-2"><i data-lucide="message-circle" class="w-5 h-5 mr-2" aria-hidden="true"></i> ${esc(b.bestPrice)}${srNewTab(D)}</a>
          <a href="${telUrl(D)}" class="${btn} bg-[#0B5D1E] text-white hover:bg-[#063B12] shadow-md"><i data-lucide="phone" class="w-5 h-5 mr-2" aria-hidden="true"></i> ${esc(b.callNow)}</a>
          <button type="button" data-open-demo class="${btn} bg-[#F2A900] text-[#1F2933] hover:bg-yellow-500 shadow-md"><i data-lucide="calendar-check" class="w-5 h-5 mr-2" aria-hidden="true"></i> ${esc(b.bookDemo)}</button>
          <a href="${esc(model.brochure)}" ${newTab(D)} class="${btn} border-2 border-[#0B5D1E] text-[#0B5D1E] hover:bg-[#EAF4EA] sm:col-span-2"><i data-lucide="file-down" class="w-5 h-5 mr-2" aria-hidden="true"></i> ${esc(b.brochure)}${srNewTab(D)}</a>
        </div>
      </div>
      <div class="order-1 lg:order-2 bg-gradient-to-br from-[#EAF4EA] to-white rounded-3xl p-4 sm:p-8">
        <!-- Product photo: ${esc(model.image)} (800×800). Replace that file to change the photo. -->
        <img src="${root}${model.image}" alt="${esc(model.imageAlt)}" width="800" height="800" fetchpriority="high" decoding="async" class="w-full h-auto max-h-[480px] object-contain" />
      </div>
    </section>

    <!-- Key highlights -->
    <section class="bg-gray-50 py-12 sm:py-16" aria-labelledby="highlights-heading">
      <div class="container mx-auto px-4">
        <h2 id="highlights-heading" class="text-2xl sm:text-3xl font-extrabold text-[#1F2933] mb-8 text-center">${esc(u.highlightsHeading)}</h2>
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          ${tiles}
        </div>
      </div>
    </section>

    <!-- Features, crops, best for -->
    <section class="container mx-auto px-4 py-12 sm:py-16 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
      <div>
        <h2 class="text-2xl sm:text-3xl font-extrabold text-[#1F2933] mb-6">${esc(u.featuresHeading)}</h2>
        <ul class="space-y-4 text-base sm:text-lg">
            ${features}
        </ul>
      </div>
      <div class="space-y-8">
        <div>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-[#1F2933] mb-6">${esc(u.cropsHeading)}</h2>
          <ul class="flex flex-wrap gap-2">
              ${crops}
          </ul>
        </div>
        <div class="bg-[#063B12] text-white rounded-2xl p-6 sm:p-8">
          <h2 class="flex items-center gap-2 text-xl font-bold text-[#F2A900] mb-3"><i data-lucide="target" class="w-6 h-6" aria-hidden="true"></i> ${esc(u.bestForHeading)}</h2>
          <p class="text-base sm:text-lg text-gray-100">${esc(model.bestFor)}</p>
        </div>
      </div>
    </section>

    <!-- Full specifications -->
    <section class="bg-gray-50 py-12 sm:py-16" aria-labelledby="specs-heading">
      <div class="container mx-auto px-4 max-w-3xl">
        <h2 id="specs-heading" class="text-2xl sm:text-3xl font-extrabold text-[#1F2933] mb-8 text-center">${esc(u.specsHeading)}</h2>
        ${specTable(D, model)}
        <p class="text-center mt-6"><a href="${esc(model.officialPage)}" ${newTab(D)} class="inline-flex items-center gap-2 text-[#0B5D1E] font-semibold hover:underline">${esc(b.officialPage)} <i data-lucide="external-link" class="w-4 h-4" aria-hidden="true"></i>${srNewTab(D)}</a></p>
      </div>
    </section>

    <!-- Compare with other models -->
    <section class="container mx-auto px-4 py-12 sm:py-16" aria-labelledby="compare-heading">
      <div class="flex flex-wrap items-end justify-between gap-4 mb-8">
        <h2 id="compare-heading" class="text-2xl sm:text-3xl font-extrabold text-[#1F2933]">${esc(u.compareHeading)}</h2>
        <a href="index.html#compare" class="text-[#0B5D1E] font-semibold hover:underline">${esc(b.compare)} →</a>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          ${others}
      </div>
    </section>

    <!-- Service & spare parts -->
    <section class="bg-[#063B12] text-white py-12 sm:py-16" aria-labelledby="service-heading">
      <div class="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div class="flex flex-col md:flex-row items-center gap-5">
          <div class="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center shrink-0"><i data-lucide="wrench" class="w-8 h-8 text-[#F2A900]" aria-hidden="true"></i></div>
          <div>
            <h2 id="service-heading" class="text-2xl sm:text-3xl font-extrabold mb-2">${esc(u.serviceHeading)}</h2>
            <p class="text-base sm:text-lg text-gray-200">${esc(u.serviceText)}</p>
          </div>
        </div>
        <div class="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <a href="${root}index.html#service" class="${btn} bg-[#F2A900] text-[#1F2933] hover:bg-yellow-500 shadow-md">${esc(b.servicePage)}</a>
          <a href="${root}index.html#parts" class="${btn} border-2 border-white text-white hover:bg-white hover:text-[#063B12]">${esc(b.partsPage)}</a>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="container mx-auto px-4 py-12 sm:py-16 max-w-3xl" aria-labelledby="faq-heading">
      <h2 id="faq-heading" class="text-2xl sm:text-3xl font-extrabold text-[#1F2933] mb-8 text-center">${esc(u.faqHeading)}</h2>
      <div class="space-y-3">
          ${faqs}
      </div>
    </section>`;
  }

  /* ---------- Listing page ---------- */

  function listingMain(D, { root = '../' } = {}) {
    const l = D.ui.listing;
    const cards = D.models.map(model => modelCard(D, model, { root, base: '', headingLevel: 3 })).join('\n          ');
    const filterBtn = (key, label, pressed) =>
      `<button type="button" data-filter="${key}" aria-pressed="${pressed}" class="rt-filter px-5 py-2.5 rounded-full font-semibold border text-sm sm:text-base touch-manipulation">${esc(label)}</button>`;

    return `${breadcrumb(D, [
      { label: D.ui.breadcrumb.home, href: `${root}index.html` },
      { label: D.ui.breadcrumb.machinery },
    ])}

    <section class="container mx-auto px-4 pt-8 pb-4 text-center">
      <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1F2933] mb-4">${esc(l.heading)}</h1>
      <p class="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">${esc(l.intro)}</p>
      <div class="w-24 h-1 bg-[#F2A900] mx-auto mt-6"></div>
    </section>

    <div class="container mx-auto px-4 py-8">
      <div class="flex flex-wrap gap-3 justify-center" role="group" aria-label="${esc(l.filterLabel)}">
        ${filterBtn('all', l.filters.all, true)}
        ${filterBtn('harvesters', l.filters.harvesters, false)}
        ${filterBtn('tractors', l.filters.tractors, false)}
      </div>
    </div>

    <section id="harvesters" data-group="harvesters" class="container mx-auto px-4 pb-12" aria-labelledby="harvesters-heading">
      <h2 id="harvesters-heading" class="text-2xl sm:text-3xl font-extrabold text-[#1F2933] mb-6">${esc(l.harvestersHeading)}</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          ${cards}
      </div>
    </section>

    <section id="tractors" data-group="tractors" class="container mx-auto px-4 pb-12" aria-labelledby="tractors-heading">
      <h2 id="tractors-heading" class="text-2xl sm:text-3xl font-extrabold text-[#1F2933] mb-6">${esc(l.tractorsHeading)}</h2>
      <div class="bg-white rounded-2xl border-2 border-dashed border-gray-300 p-8 sm:p-10 text-center">
        <div class="w-16 h-16 bg-[#EAF4EA] text-[#0B5D1E] rounded-full flex items-center justify-center mx-auto mb-4"><i data-lucide="tractor" class="w-8 h-8" aria-hidden="true"></i></div>
        <p class="inline-block px-3 py-1 bg-[#F2A900] text-[#1F2933] rounded-full text-xs font-bold uppercase tracking-wider mb-3">${esc(l.comingSoon)}</p>
        <p class="text-gray-700 max-w-md mx-auto mb-6">${esc(l.tractorsText)}</p>
        <a href="${waUrl(D, D.ui.whatsapp.tractor)}" ${newTab(D)} class="inline-flex items-center justify-center px-6 py-3.5 font-semibold rounded-xl transition-all ${WA_GREEN} text-white shadow-md touch-manipulation"><i data-lucide="message-circle" class="w-5 h-5 mr-2" aria-hidden="true"></i> ${esc(D.ui.buttons.whatsappEnquiry)}${srNewTab(D)}</a>
      </div>
    </section>

    <section id="compare" data-group="harvesters" class="bg-gray-50 py-12 sm:py-16" aria-labelledby="compare-heading">
      <div class="container mx-auto px-4">
        <h2 id="compare-heading" class="text-2xl sm:text-3xl font-extrabold text-[#1F2933] mb-2">${esc(l.compareHeading)}</h2>
        <p class="text-gray-600 mb-6">${esc(l.compareIntro)}</p>
        ${comparisonTable(D, { base: '' })}
      </div>
    </section>

    <section class="container mx-auto px-4 py-12 sm:py-16">
      <div class="bg-[#EAF4EA] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div>
          <h2 class="text-xl sm:text-2xl font-bold text-[#1F2933] mb-1">${esc(l.otherEquipmentHeading)}</h2>
          <p class="text-gray-700">${esc(l.otherEquipmentText)}</p>
        </div>
        <a href="${root}index.html#machinery" class="inline-flex items-center justify-center px-6 py-3.5 font-semibold rounded-xl transition-all border-2 border-[#0B5D1E] text-[#0B5D1E] hover:bg-white shrink-0">${esc(l.otherEquipmentLink)} →</a>
      </div>
    </section>`;
  }

  const API = { esc, fmt, waUrl, header, footer, stickyBar, demoDialog, modelCard, comparisonTable, productMain, listingMain, WA_GREEN };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = API;
  } else {
    root.RT_RENDER = API;
  }
})(typeof window !== 'undefined' ? window : globalThis);
