/**
 * Barra de navegación global del Portal del Aprendiz
 */
(function () {
  const BOOKINGS =
    'https://outlook.office.com/book/ReservasEtapaProductivaCSF@sena.edu.co/';

  const LINKS = [
    { href: 'index.html', label: 'Portal', match: ['index.html', '/', ''] },
    { href: 'manual_aprendiz.html', label: 'Manual', match: ['manual_aprendiz.html'] },
    { href: 'calculadora_fechas.html', label: 'Calculadora', match: ['calculadora_fechas.html'] },
    { href: 'recursos_etapa_productiva.html', label: 'Recursos', match: ['recursos_etapa_productiva.html'] },
    { href: BOOKINGS, label: 'Agendar', match: [], cta: true, external: true }
  ];

  function currentFile() {
    const path = (location.pathname || '').replace(/\\/g, '/');
    const parts = path.split('/');
    return (parts[parts.length - 1] || 'index.html').toLowerCase();
  }

  function init() {
    if (document.querySelector('.portal-nav')) return;
    const file = currentFile();
    const nav = document.createElement('nav');
    nav.className = 'portal-nav';
    nav.setAttribute('aria-label', 'Navegación principal');

    const brand = document.createElement('a');
    brand.className = 'portal-nav-brand';
    brand.href = 'index.html';
    brand.innerHTML = '<i class="fas fa-graduation-cap"></i><span>Portal del Aprendiz</span>';

    const links = document.createElement('div');
    links.className = 'portal-nav-links';

    LINKS.forEach(function (item) {
      const a = document.createElement('a');
      a.href = item.href;
      a.textContent = item.label;
      if (item.external) {
        a.target = '_blank';
        a.rel = 'noopener';
      }
      if (item.cta) a.classList.add('cta');
      const active = item.match.some(function (m) {
        if (m === '' || m === '/') return file === '' || file === 'index.html';
        return file === m.toLowerCase();
      });
      if (active) a.classList.add('active');
      links.appendChild(a);
    });

    nav.appendChild(brand);
    nav.appendChild(links);
    document.body.insertBefore(nav, document.body.firstChild);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
