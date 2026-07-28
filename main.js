(function () {
  const GA_MEASUREMENT_ID = 'G-0E764T45YL';
  const COOKIE_CONSENT_KEY = 'consentimento_cookies_analytics';

  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
  const heroActionLinks = document.querySelectorAll('.hero-actions a[href^="#"]');
  const btnCopyPix = document.getElementById('btnCopyPix');
  const pixKey = document.getElementById('pixKey');
  const pixFeedback = document.getElementById('pixFeedback');
  const pageSections = Array.from(document.querySelectorAll('main section[id]'));

  let analyticsEnabled = false;
  let gtagReady = false;
  const queuedEvents = [];
  const seenSections = new Set();

  function initGoogleAnalyticsIfNeeded() {
    if (!analyticsEnabled || gtagReady) {
      return;
    }

    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () {
      window.dataLayer.push(arguments);
    };

    const gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_MEASUREMENT_ID;
    document.head.appendChild(gaScript);

    window.gtag('js', new Date());
    window.gtag('config', GA_MEASUREMENT_ID, {
      anonymize_ip: true
    });

    gtagReady = true;

    while (queuedEvents.length > 0) {
      const item = queuedEvents.shift();
      window.gtag('event', item.name, item.params);
    }
  }

  function isAnalyticsAllowed() {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    return consent !== 'recusado';
  }

  function trackEvent(name, params) {
    if (!analyticsEnabled) {
      return;
    }

    if (!gtagReady || typeof window.gtag !== 'function') {
      queuedEvents.push({ name: name, params: params });
      return;
    }

    window.gtag('event', name, params);
  }

  function trackPageView() {
    trackEvent('page_view', {
      page_title: document.title,
      page_location: window.location.href,
      page_path: window.location.pathname + window.location.hash
    });
  }

  function trackSectionView(sectionId) {
    if (seenSections.has(sectionId)) {
      return;
    }

    seenSections.add(sectionId);
    trackEvent('section_view', {
      section_name: sectionId,
      action: 'visualizacao_secao'
    });
  }

  function initializeAnalytics() {
    analyticsEnabled = isAnalyticsAllowed();
    if (!analyticsEnabled) {
      return;
    }

    initGoogleAnalyticsIfNeeded();
    trackPageView();
  }

  function setupSectionObserver() {
    if (!analyticsEnabled || pageSections.length === 0) {
      return;
    }

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && entry.target && entry.target.id) {
            trackSectionView(entry.target.id);
          }
        });
      }, {
        threshold: 0.45
      });

      pageSections.forEach(function (section) {
        observer.observe(section);
      });
      return;
    }

    pageSections.forEach(function (section) {
      if (section.id) {
        trackSectionView(section.id);
      }
    });
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      navMenu.classList.toggle('is-open');

      trackEvent('menu_toggle', {
        action: expanded ? 'fechar_menu_mobile' : 'abrir_menu_mobile'
      });
    });
  }

  navLinks.forEach(function (link) {
    link.addEventListener('click', function (event) {
      const targetId = link.getAttribute('href');
      if (!targetId || !targetId.startsWith('#')) {
        return;
      }

      const target = document.querySelector(targetId);
      if (!target) {
        return;
      }

      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });

      const sectionName = targetId.replace('#', '');
      trackEvent('section_click', {
        section_name: sectionName,
        item_name: (link.textContent || '').trim(),
        action: 'navegacao_menu'
      });

      if (navMenu && navMenu.classList.contains('is-open')) {
        navMenu.classList.remove('is-open');
      }
      if (navToggle) {
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  heroActionLinks.forEach(function (link) {
    link.addEventListener('click', function (event) {
      const targetId = link.getAttribute('href');
      if (!targetId || !targetId.startsWith('#')) {
        return;
      }

      const target = document.querySelector(targetId);
      if (!target) {
        return;
      }

      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });

      trackEvent('section_click', {
        section_name: targetId.replace('#', ''),
        item_name: (link.textContent || '').trim(),
        action: 'navegacao_hero_actions'
      });
    });
  });

  if (btnCopyPix && pixKey && pixFeedback) {
    btnCopyPix.addEventListener('click', async function () {
      const keyText = pixKey.textContent ? pixKey.textContent.trim() : '';

      if (!keyText || keyText.includes('[PREENCHER_')) {
        pixFeedback.textContent = 'Atualize a chave PIX oficial para habilitar a copia.';
        trackEvent('pix_copy_attempt', {
          action: 'chave_pix_placeholder'
        });
        return;
      }

      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(keyText);
        } else {
          const tempInput = document.createElement('input');
          tempInput.value = keyText;
          document.body.appendChild(tempInput);
          tempInput.select();
          document.execCommand('copy');
          document.body.removeChild(tempInput);
        }
        pixFeedback.textContent = 'Chave PIX copiada com sucesso.';
        trackEvent('pix_copy_success', {
          section_name: 'dizimo',
          action: 'copiar_pix'
        });
      } catch (error) {
        pixFeedback.textContent = 'Nao foi possivel copiar automaticamente. Copie manualmente.';
        trackEvent('pix_copy_error', {
          section_name: 'dizimo',
          action: 'erro_copiar_pix'
        });
      }
    });
  }

  document.addEventListener('click', function (event) {
    const target = event.target;
    if (!target) {
      return;
    }

    const clickable = target.closest('a[href], button');
    if (!clickable) {
      return;
    }

    const label = (clickable.textContent || clickable.getAttribute('aria-label') || '').trim();
    if (!label) {
      return;
    }

    const section = clickable.closest('section[id]');
    trackEvent('item_click', {
      section_name: section ? section.id : 'global',
      item_name: label,
      action: 'click_elemento'
    });
  });

  initializeAnalytics();
  setupSectionObserver();
})();
