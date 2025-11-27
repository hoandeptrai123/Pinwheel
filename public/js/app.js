const COMPONENT_ATTRIBUTE = 'data-component';

const loadComponents = async () => {
  const placeholders = Array.from(document.querySelectorAll(`[${COMPONENT_ATTRIBUTE}]`));
  const loaders = placeholders.map(async (placeholder) => {
    const name = placeholder.getAttribute(COMPONENT_ATTRIBUTE);
    try {
      const response = await fetch(`./src/components/${name}.html`);
      if (!response.ok) {
        throw new Error(`Không thể load component ${name}`);
      }
      const markup = await response.text();
      placeholder.innerHTML = markup;
      placeholder.removeAttribute(COMPONENT_ATTRIBUTE);
      placeholder.setAttribute('data-component-name', name);
    } catch (error) {
      console.error(error);
      placeholder.innerHTML = `<section class="container py-10 text-center text-red-500">Không thể tải section ${name}</section>`;
    }
  });

  await Promise.all(loaders);
};

const initNavigation = () => {
  const toggle = document.querySelector('[data-nav-toggle]');
  const menu = document.querySelector('[data-nav-menu]');

  if (!toggle || !menu) return;

  const closeMenu = () => menu.classList.add('hidden');

  toggle.addEventListener('click', () => {
    menu.classList.toggle('hidden');
  });

  menu.querySelectorAll('a').forEach((link) =>
    link.addEventListener('click', () => {
      if (window.innerWidth < 1024) {
        closeMenu();
      }
    }),
  );

  document.addEventListener('click', (event) => {
    if (!menu.contains(event.target) && !toggle.contains(event.target) && window.innerWidth < 1024) {
      closeMenu();
    }
  });

  const dropdownBtn = document.querySelector('[data-nav-dropdown]');
  const dropdownMenu = document.querySelector('[data-nav-dropdown-menu]');

  if (dropdownBtn && dropdownMenu) {
    dropdownBtn.addEventListener('click', () => {
      if (window.innerWidth >= 1024) return;
      dropdownMenu.classList.toggle('hidden');
      const expanded = dropdownBtn.getAttribute('aria-expanded') === 'true';
      dropdownBtn.setAttribute('aria-expanded', (!expanded).toString());
    });
  }
};

const initTabs = () => {
  document.querySelectorAll('[data-tabs]').forEach((group) => {
    const buttons = group.querySelectorAll('[data-tab-target]');
    const panels = group.querySelectorAll('[data-tab-panel]');

    const activate = (target) => {
      buttons.forEach((btn) => {
        const isActive = btn.dataset.tabTarget === target;
        btn.classList.toggle('active', isActive);
      });
      panels.forEach((panel) => {
        const isMatch = panel.dataset.tabPanel === target;
        panel.classList.toggle('hidden', !isMatch);
      });
    };

    buttons.forEach((btn, index) => {
      btn.addEventListener('click', () => activate(btn.dataset.tabTarget ?? String(index)));
    });
  });
};

const initVideoPlayer = () => {
  const trigger = document.querySelector('[data-video-trigger]');
  const overlay = document.querySelector('[data-video-overlay]');
  const iframe = overlay?.querySelector('iframe');

  if (!trigger || !overlay || !iframe) return;

  const originalSrc = iframe.dataset.src;

  trigger.addEventListener('click', () => {
    overlay.classList.remove('hidden');
    if (originalSrc) {
      const autoplayUrl = originalSrc.includes('?') ? `${originalSrc}&autoplay=1` : `${originalSrc}?autoplay=1`;
      iframe.src = autoplayUrl;
    }
  });

  overlay.addEventListener('click', () => {
    overlay.classList.add('hidden');
    iframe.src = 'about:blank';
  });
};

const initCarousel = () => {
  const carousel = document.querySelector('[data-carousel]');
  if (!carousel) return;

  const track = carousel.querySelector('[data-carousel-track]');
  const slides = carousel.querySelectorAll('[data-carousel-slide]');
  const dots = carousel.querySelectorAll('[data-carousel-dot]');
  let current = 0;
  let timer;

  const update = (index) => {
    current = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle('bg-primary', dotIndex === current);
      dot.classList.toggle('bg-border', dotIndex !== current);
      dot.classList.toggle('bg-border/60', dotIndex !== current);
    });
  };

  dots.forEach((dot, index) =>
    dot.addEventListener('click', () => {
      update(index);
      resetTimer();
    }),
  );

  const resetTimer = () => {
    if (timer) clearInterval(timer);
    timer = setInterval(() => update(current + 1), 6000);
  };

  update(0);
  resetTimer();
};

const initScrollAnimations = () => {
  const targets = document.querySelectorAll('[data-animate]');
  if (!targets.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-up');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );

  targets.forEach((target) => {
    target.classList.add('opacity-0', 'translate-y-6');
    observer.observe(target);
  });
};

const injectYear = () => {
  const badge = document.querySelector('[data-current-year]');
  if (badge) {
    badge.textContent = new Date().getFullYear().toString();
  }
};

const boot = async () => {
  await loadComponents();
  initNavigation();
  initTabs();
  initVideoPlayer();
  initCarousel();
  initScrollAnimations();
  injectYear();
};

boot();

