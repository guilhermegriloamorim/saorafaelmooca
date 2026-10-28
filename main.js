(function () {
  const GA_MEASUREMENT_ID = 'G-0E764T45YL';
  const COOKIE_CONSENT_KEY = 'consentimento_cookies_analytics';
  const COOKIE_CONSENT_ACCEPTED = 'aceito';
  const COOKIE_CONSENT_REJECTED = 'recusado';
  const GA_DISABLE_FLAG = 'ga-disable-' + GA_MEASUREMENT_ID;

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
  const avisosGrid = document.getElementById('avisosGrid');
  const avisosFallback = document.getElementById('avisosFallback');
  const AVISOS_URL = 'avisos.json';
  const AVISOS_LEGENDA_MAX = 220;

  let analyticsEnabled = false;
  let gtagReady = false;
  let sectionObserverStarted = false;
  const queuedEvents = [];
  const seenSections = new Set();

  function readStoredConsent() {
    try {
      return localStorage.getItem(COOKIE_CONSENT_KEY);
    } catch (error) {
      return null;
    }
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

    // Consent Mode v2: somente análise é liberada; sinais de anúncios ficam sempre negados.
    window.gtag('consent', 'default', {
      analytics_storage: 'granted',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied'
    });
    window.gtag('js', new Date());
    // O page_view inicial é enviado automaticamente pelo config.
    window.gtag('config', GA_MEASUREMENT_ID, {
      content_group: 'site',
      allow_google_signals: false,
      allow_ad_personalization_signals: false
    });

    gtagReady = true;

    while (queuedEvents.length > 0) {
      const item = queuedEvents.shift();
      window.gtag('event', item.name, item.params);
    }
  }

  function isAnalyticsAllowed() {
    return readStoredConsent() === COOKIE_CONSENT_ACCEPTED;
  }

  function hasCookieChoice() {
    const consent = readStoredConsent();
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
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, value);
    } catch (error) {
      // Sem armazenamento disponível, a escolha vale apenas para esta visita.
    }
  }

  function deleteAnalyticsCookies() {
    const hostParts = window.location.hostname.split('.');
    const domains = [''];
    for (let i = 0; i < hostParts.length - 1; i += 1) {
      domains.push('; domain=.' + hostParts.slice(i).join('.'));
    }

    document.cookie.split(';').forEach(function (cookie) {
      const name = cookie.split('=')[0].trim();
      if (name === '_ga' || name.indexOf('_ga_') === 0) {
        domains.forEach(function (domain) {
          document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/' + domain;
        });
      }
    });
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

    const payload = params || {};

    if (!gtagReady || typeof window.gtag !== 'function') {
      queuedEvents.push({ name: name, params: payload });
      return;
    }

    window.gtag('event', name, payload);
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

  // Classifica links de contato, rota e redes sociais para virarem eventos-chave no GA4.
  function classifyLink(href) {
    if (!href) {
      return null;
    }

    if (href.indexOf('tel:') === 0) {
      return { event: 'contact_click', method: 'telefone' };
    }
    if (href.indexOf('mailto:') === 0) {
      return { event: 'contact_click', method: 'email' };
    }
    if (href.indexOf('wa.me/') !== -1) {
      return { event: 'contact_click', method: 'whatsapp' };
    }
    if (href.indexOf('google.com/maps') !== -1) {
      return { event: 'directions_click', method: 'google_maps' };
    }
    if (href.indexOf('waze.com') !== -1) {
      return { event: 'directions_click', method: 'waze' };
    }
    if (href.indexOf('facebook.com') !== -1) {
      return { event: 'social_click', method: 'facebook' };
    }
    if (href.indexOf('instagram.com') !== -1) {
      return { event: 'social_click', method: 'instagram' };
    }

    return null;
  }

  function enableAnalytics() {
    if (analyticsEnabled) {
      return;
    }

    analyticsEnabled = true;
    window[GA_DISABLE_FLAG] = false;

    if (gtagReady) {
      // Reativação na mesma visita: o config já foi enviado, basta liberar o consentimento.
      window.gtag('consent', 'update', { analytics_storage: 'granted' });
    } else {
      initGoogleAnalyticsIfNeeded();
    }

    setupSectionObserver();
  }

  function disableAnalytics() {
    analyticsEnabled = false;
    queuedEvents.length = 0;

    if (gtagReady && typeof window.gtag === 'function') {
      window.gtag('consent', 'update', { analytics_storage: 'denied' });
    }

    window[GA_DISABLE_FLAG] = true;
    deleteAnalyticsCookies();
  }

  function setupSectionObserver() {
    if (sectionObserverStarted || !analyticsEnabled || pageSections.length === 0) {
      return;
    }

    sectionObserverStarted = true;

    if ('IntersectionObserver' in window) {
      // Conta a seção quando ela cruza a faixa central da tela. Um limiar por proporção (ex.: 45%)
      // nunca dispara em seções mais altas que a tela, comuns no celular.
      const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && entry.target && entry.target.id) {
            trackSectionView(entry.target.id);
          }
        });
      }, {
        rootMargin: '-45% 0px -45% 0px',
        threshold: 0
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

  function formatAvisoDate(isoDate) {
    const date = isoDate ? new Date(isoDate) : null;
    if (!date || isNaN(date.getTime())) {
      return '';
    }

    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
  }

  function truncateText(text, maxLength) {
    if (text.length <= maxLength) {
      return text;
    }

    const cut = text.slice(0, maxLength);
    const lastSpace = cut.lastIndexOf(' ');
    return (lastSpace > maxLength * 0.6 ? cut.slice(0, lastSpace) : cut).trim() + '…';
  }

  function createAvisoCard(post) {
    const card = document.createElement('article');
    card.className = 'aviso-card';

    const link = document.createElement('a');
    link.className = 'aviso-media';
    link.href = post.link;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.setAttribute('aria-label', 'Abrir publicação no Instagram');

    const img = document.createElement('img');
    img.src = post.imagem;
    img.alt = post.legenda ? truncateText(post.legenda, 120) : 'Publicação da paróquia no Instagram';
    img.loading = 'lazy';
    img.decoding = 'async';
    link.appendChild(img);

    if (post.tipo === 'VIDEO') {
      const badge = document.createElement('span');
      badge.className = 'aviso-badge';
      badge.textContent = 'Vídeo';
      link.appendChild(badge);
    }

    const body = document.createElement('div');
    body.className = 'aviso-body';

    const dateText = formatAvisoDate(post.data);
    if (dateText) {
      const time = document.createElement('time');
      time.className = 'aviso-date';
      time.dateTime = post.data;
      time.textContent = dateText;
      body.appendChild(time);
    }

    if (post.legenda) {
      const caption = document.createElement('p');
      caption.className = 'aviso-caption';
      caption.textContent = truncateText(post.legenda, AVISOS_LEGENDA_MAX);
      body.appendChild(caption);
    }

    const more = document.createElement('a');
    more.className = 'aviso-link';
    more.href = post.link;
    more.target = '_blank';
    more.rel = 'noopener noreferrer';
    more.textContent = 'Ver no Instagram';
    body.appendChild(more);

    card.appendChild(link);
    card.appendChild(body);
    return card;
  }

  function setupAvisos() {
    if (!avisosGrid || typeof window.fetch !== 'function') {
      return;
    }

    window.fetch(AVISOS_URL, { cache: 'no-cache' })
      .then(function (response) {
        return response.ok ? response.json() : null;
      })
      .then(function (data) {
        const posts = data && Array.isArray(data.posts)
          ? data.posts.filter(function (post) { return post && post.link && post.imagem; })
          : [];

        if (posts.length === 0) {
          return;
        }

        posts.forEach(function (post) {
          avisosGrid.appendChild(createAvisoCard(post));
        });

        avisosGrid.hidden = false;
        if (avisosFallback) {
          avisosFallback.hidden = true;
        }
      })
      .catch(function () {
        // Mantém o cartão com links para as redes sociais.
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
    }
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
        pixFeedback.textContent = 'Atualize a chave PIX oficial para habilitar a cópia.';
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
        pixFeedback.textContent = 'Não foi possível copiar automaticamente. Copie manualmente.';
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

    if (clickable.closest('#cookieBanner') || clickable.closest('#policyModal')) {
      return;
    }

    const label = (clickable.getAttribute('aria-label') || clickable.textContent || '').trim();
    const linkType = classifyLink(clickable.getAttribute('href'));

    if (linkType) {
      trackEvent(linkType.event, {
        method: linkType.method,
        section_name: clickable.closest('.whatsapp-float') ? 'botao_flutuante' : resolveSectionNameFromElement(clickable),
        link_text: label
      });
      return;
    }

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

  setupAvisos();
  initializeCookieConsent();
})();
