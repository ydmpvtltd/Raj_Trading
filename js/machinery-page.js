/*
 * Raj Trading – behaviour for the /machinery/ pages.
 * Needs data/harvesters.js and js/machinery-render.js loaded first.
 */
(function () {
  const D = window.RT_HARVESTERS;
  const R = window.RT_RENDER;
  const body = document.body;
  const page = body.dataset.page; // 'product' or 'listing'
  const model = D.models.find(m => m.id === body.dataset.model);
  const root = body.dataset.root || '../';

  // Render any slot that was not pre-rendered by tools/build-machinery.js
  function fill(id, html) {
    const slot = document.getElementById(id);
    if (slot && !slot.innerHTML.trim()) slot.innerHTML = html;
  }
  fill('rt-header', R.header(D, { root, active: 'machinery' }));
  fill('main', page === 'product' && model ? R.productMain(D, model, { root }) : R.listingMain(D, { root }));
  fill('rt-footer', R.footer(D, { root }));
  fill('rt-sticky', R.stickyBar(D, {
    whatsappText: model ? R.fmt(D.ui.whatsapp.price, { model: model.name }) : D.ui.demo.enquiryMessage,
  }));
  fill('rt-dialog', R.demoDialog(D, { selected: model ? model.id : '' }));

  if (window.lucide) lucide.createIcons();

  const year = document.getElementById('current-year');
  if (year) year.textContent = new Date().getFullYear();

  // Mobile menu
  const menuBtn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  function setMenu(open) {
    menu.classList.toggle('hidden', !open);
    menu.classList.toggle('flex', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    const icon = document.getElementById('menu-icon');
    if (icon && window.lucide) {
      icon.outerHTML = `<i data-lucide="${open ? 'x' : 'menu'}" class="w-7 h-7" id="menu-icon" aria-hidden="true"></i>`;
      lucide.createIcons();
    }
  }
  if (menuBtn && menu) {
    menuBtn.addEventListener('click', () => setMenu(menu.classList.contains('hidden')));
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && !menu.classList.contains('hidden')) setMenu(false);
    });
  }

  // Book a Demo dialog: composes a WhatsApp message (no backend yet)
  const dialog = document.getElementById('demo-dialog');
  const form = document.getElementById('demo-form');
  if (dialog && form) {
    document.querySelectorAll('[data-open-demo]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (typeof dialog.showModal === 'function') dialog.showModal();
        else dialog.setAttribute('open', '');
        document.getElementById('demo-name').focus();
      });
    });
    const close = () => (typeof dialog.close === 'function' ? dialog.close() : dialog.removeAttribute('open'));
    dialog.querySelectorAll('[data-close-demo]').forEach(btn => btn.addEventListener('click', close));
    // Click on the backdrop closes the dialog
    dialog.addEventListener('click', e => { if (e.target === dialog) close(); });

    form.addEventListener('submit', e => {
      e.preventDefault();
      const f = form.elements;
      const d = D.ui.demo;
      const chosen = f.model.value;
      const lines = [
        chosen ? R.fmt(d.message, { model: chosen }) : d.enquiryMessage,
        `${d.name}: ${f.name.value.trim()}`,
        `${d.mobile}: ${f.mobile.value.trim()}`,
        `${d.location}: ${f.location.value.trim()}`,
      ];
      if (f.date.value) lines.push(`${d.date}: ${f.date.value}`);
      window.open(R.waUrl(D, lines.join('\n')), '_blank', 'noopener');
      form.reset();
      if (model) f.model.value = model.name;
      close();
    });
  }

  // Listing filters: All / Combine Harvesters / Tractors (also driven by #harvesters / #tractors)
  const filters = document.querySelectorAll('[data-filter]');
  if (filters.length) {
    const groups = document.querySelectorAll('[data-group]');
    function applyFilter(name) {
      if (!['all', 'harvesters', 'tractors'].includes(name)) name = 'all';
      groups.forEach(group => group.classList.toggle('hidden', name !== 'all' && group.dataset.group !== name));
      filters.forEach(btn => btn.setAttribute('aria-pressed', String(btn.dataset.filter === name)));
    }
    filters.forEach(btn => btn.addEventListener('click', () => applyFilter(btn.dataset.filter)));
    const hash = location.hash.slice(1);
    if (hash === 'harvesters' || hash === 'tractors') applyFilter(hash);
    else applyFilter('all'); // #compare and others keep everything visible so the anchor still works
  }
})();
