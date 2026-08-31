(function () {
  const GA_MEASUREMENT_ID = 'G-0E764T45YL';
  const COOKIE_CONSENT_KEY = 'consentimento_cookies_analytics';
  const COOKIE_CONSENT_ACCEPTED = 'aceito';
  const COOKIE_CONSENT_REJECTED = 'recusado';
  const ANALYTICS_SESSION_KEY = 'sr_analytics_session_id';
  const ANALYTICS_SESSION_STARTED_AT_KEY = 'sr_analytics_session_started_at';

  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
  const heroActionLinks = document.querySelectorAll('.hero-actions a[href^="#"]');
  const btnCopyPix = document.getElementById('btnCopyPix');
  const pixKey = document.getElementById('pixKey');
  const pixFeedback = document.getElementById('pixFeedback');
  const cookieBanner = document.getElementById('cookieBanner');
  const btnCookieAccept = document.getElementById('btnCookieAccept');
  const btnCookieReject = document.getElementById('btnCookieReject');
  const btnManageCookies = document.getElementById('btnManageCookies');
  const btnOpenPolicyBanner = document.getElementById('btnOpenPolicyBanner');
  const policyModal = document.getElementById('policyModal');
  const btnClosePolicy = document.getElementById('btnClosePolicy');
  const pageSections = Array.from(document.querySelectorAll('main section[id]'));

  let analyticsEnabled = false;
  let gtagReady = false;
  let sectionObserverStarted = false;
  const queuedEvents = [];
  const seenSections = new Set();
  const analyticsSession = getOrCreateAnalyticsSession();

  function createSessionId() {
    if (window.crypto && typeof window.crypto.randomUUID === 'function') {
      return window.crypto.randomUUID();
    }

    return 'sr-' + Date.now() + '-' + Math.random().toString(16).slice(2);
  }

  function getOrCreateAnalyticsSession() {
    const storedId = sessionStorage.getItem(ANALYTICS_SESSION_KEY);
    const storedStartedAt = sessionStorage.getItem(ANALYTICS_SESSION_STARTED_AT_KEY);

    if (storedId && storedStartedAt) {
      return {
        id: storedId,
        startedAt: storedStartedAt
      };
    }

    const createdSession = {
      id: createSessionId(),
      startedAt: new Date().toISOString()
    };

    sessionStorage.setItem(ANALYTICS_SESSION_KEY, createdSession.id);
    sessionStorage.setItem(ANALYTICS_SESSION_STARTED_AT_KEY, createdSession.startedAt);

    return createdSession;
  }

  function getSectionNameFromId(rawId) {
    return (rawId || '').replace('#', '').trim().toLowerCase() || 'global';
  }

  function resolveSectionNameFromElement(element) {
    if (!element) {
      return 'global';
    }

    const parentSection = element.closest('section[data-analytics-section], section[id]');
    if (!parentSection) {
      return 'global';
    }

    return (parentSection.getAttribute('data-analytics-section') || parentSection.id || 'global').trim().toLowerCase();
  }

  function withSessionParams(params) {
    return Object.assign({}, params, {
      session_id: analyticsSession.id,
      session_started_at: analyticsSession.startedAt
    });
  }

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
    return consent === COOKIE_CONSENT_ACCEPTED;
  }

  function hasCookieChoice() {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    return consent === COOKIE_CONSENT_ACCEPTED || consent === COOKIE_CONSENT_REJECTED;
  }

  function showCookieBanner() {
    if (!cookieBanner) {
      return;
    }

    cookieBanner.hidden = false;
  }

  function hideCookieBanner() {
    if (!cookieBanner) {
      return;
    }

    cookieBanner.hidden = true;
  }

  function saveCookieConsent(value) {
    localStorage.setItem(COOKIE_CONSENT_KEY, value);
  }

  function openPolicyModal() {
    if (!policyModal) {
      return;
    }

    policyModal.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closePolicyModal() {
    if (!policyModal) {
      return;
    }

    policyModal.hidden = true;
    document.body.style.overflow = '';
  }

  function trackEvent(name, params) {
    if (!analyticsEnabled) {
      return;
    }

    const payload = withSessionParams(params || {});

    if (!gtagReady || typeof window.gtag !== 'function') {
      queuedEvents.push({ name: name, params: payload });
      return;
    }

    window.gtag('event', name, payload);
  }

  function trackPageView() {
    trackEvent('page_view', {
      page_title: document.title,
      page_location: window.location.href,
      page_path: window.location.pathname + window.location.hash,
      page_section: 'home'
    });
  }

  function trackSectionView(sectionId) {
    const sectionName = getSectionNameFromId(sectionId);
    if (seenSections.has(sectionName)) {
      return;
    }

    seenSections.add(sectionName);
    trackEvent('section_view', {
      section_name: sectionName,
      action: 'visualizacao_secao'
    });
  }

  function trackSectionNavigation(sectionName, itemName, source) {
    trackEvent('section_navigation_click', {
      section_name: sectionName,
      item_name: itemName,
      source: source,
      action: 'navegacao_secao'
    });
  }

  function trackSectionItemClick(element, itemName) {
    trackEvent('section_item_click', {
      section_name: resolveSectionNameFromElement(element),
      item_name: itemName,
      action: 'click_elemento_secao'
    });
  }

  function enableAnalytics() {
    if (analyticsEnabled) {
      return;
    }

    analyticsEnabled = true;
    initGoogleAnalyticsIfNeeded();
    trackPageView();
    setupSectionObserver();
  }

  function disableAnalytics() {
    analyticsEnabled = false;
  }

  function setupSectionObserver() {
    if (sectionObserverStarted || !analyticsEnabled || pageSections.length === 0) {
      return;
    }

    sectionObserverStarted = true;

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

  function initializeCookieConsent() {
    if (isAnalyticsAllowed()) {
      hideCookieBanner();
      enableAnalytics();
      return;
    }

    if (!hasCookieChoice()) {
      showCookieBanner();
      return;
    }

    showCookieBanner();
    disableAnalytics();
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

      const sectionName = getSectionNameFromId(targetId);
      trackSectionNavigation(sectionName, (link.textContent || '').trim(), 'menu_principal');
      event.__srTracked = true;

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

      trackSectionNavigation(
        getSectionNameFromId(targetId),
        (link.textContent || '').trim(),
        'hero_actions'
      );
      event.__srTracked = true;
    });
  });

  if (btnCopyPix && pixKey && pixFeedback) {
    btnCopyPix.addEventListener('click', async function () {
      const keyText = pixKey.textContent ? pixKey.textContent.trim() : '';

      if (!keyText || keyText.includes('[PREENCHER_')) {
        pixFeedback.textContent = 'Atualize a chave PIX oficial para habilitar a copia.';
        trackEvent('pix_copy_attempt', {
          section_name: 'dizimo',
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
    if (event.__srTracked) {
      return;
    }

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

    if (clickable.closest('.nav-menu') || clickable.closest('.hero-actions')) {
      return;
    }

    trackSectionItemClick(clickable, label);
  });

  if (btnCookieAccept) {
    btnCookieAccept.addEventListener('click', function () {
      saveCookieConsent(COOKIE_CONSENT_ACCEPTED);
      hideCookieBanner();
      enableAnalytics();
      trackEvent('cookie_consent_update', {
        consent_status: COOKIE_CONSENT_ACCEPTED,
        action: 'aceite_cookies_analytics'
      });
    });
  }

  if (btnCookieReject) {
    btnCookieReject.addEventListener('click', function () {
      saveCookieConsent(COOKIE_CONSENT_REJECTED);
      hideCookieBanner();
      disableAnalytics();
    });
  }

  if (btnManageCookies) {
    btnManageCookies.addEventListener('click', function () {
      showCookieBanner();
    });
  }

  if (btnOpenPolicyBanner) {
    btnOpenPolicyBanner.addEventListener('click', function () {
      openPolicyModal();
    });
  }

  if (btnClosePolicy) {
    btnClosePolicy.addEventListener('click', function () {
      closePolicyModal();
    });
  }

  if (policyModal) {
    policyModal.addEventListener('click', function (event) {
      const target = event.target;
      if (target && target.getAttribute('data-close-policy') === 'true') {
        closePolicyModal();
      }
    });
  }

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && policyModal && !policyModal.hidden) {
      closePolicyModal();
    }
  });

  initializeCookieConsent();
})();
