(function () {
  var root = document.documentElement;

  // THEME TOGGLE
  // The initial theme is set inline in <head>; this only handles switching.
  document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try {
        localStorage.setItem('theme', next);
      } catch (e) {}
    });
  });

  // MOBILE MENU
  var toggler = document.querySelector('.navbar-toggler');
  var menu = document.getElementById('navbarNav');
  function setMenu(open) {
    menu.classList.toggle('show', open);
    toggler.setAttribute('aria-expanded', String(open));
  }
  toggler.addEventListener('click', function () {
    setMenu(!menu.classList.contains('show'));
  });
  menu.querySelectorAll('.nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
      setMenu(false);
    });
  });

  // ACTIVE NAV LINK (scrollspy)
  var links = {};
  menu.querySelectorAll('.nav-link[href^="#"]').forEach(function (link) {
    links[link.getAttribute('href').slice(1)] = link;
  });
  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          Object.keys(links).forEach(function (id) {
            links[id].classList.toggle('active', id === entry.target.id);
          });
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    Object.keys(links).forEach(function (id) {
      var section = document.getElementById(id);
      if (section) spy.observe(section);
    });
  }

  // REVEAL ON SCROLL
  var items = document.querySelectorAll('[data-reveal]');
  items.forEach(function (el) {
    var delay = el.getAttribute('data-delay');
    if (delay) el.style.transitionDelay = delay + 'ms';
  });
  if (!('IntersectionObserver' in window)) {
    items.forEach(function (el) {
      el.classList.add('is-visible');
    });
    return;
  }
  var reveal = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          reveal.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '0px 0px -10% 0px' }
  );
  items.forEach(function (el) {
    reveal.observe(el);
  });
})();
