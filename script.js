// ========== PAGE LOADER ==========
window.addEventListener('load', () => {
  setTimeout(() => {
    document.querySelector('.page-loader').classList.add('done');
    // Trigger hero reveal after loader
    setTimeout(revealHero, 150);
  }, 700);
});

function revealHero() {
  document.querySelectorAll('.hero .hero-line').forEach(line => {
    line.classList.add('revealed');
  });
  // Reveal hero bottom elements
  document.querySelectorAll('.hero-bottom [data-reveal]').forEach(el => {
    el.classList.add('revealed');
  });
}

// ========== CUSTOM CURSOR ==========
const cursor = document.querySelector('.cursor-dot');
let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function updateCursor() {
  cursorX += (mouseX - cursorX) * 0.15;
  cursorY += (mouseY - cursorY) * 0.15;
  cursor.style.left = cursorX + 'px';
  cursor.style.top = cursorY + 'px';
  requestAnimationFrame(updateCursor);
}
updateCursor();

// Cursor hover effect on interactive elements
document.querySelectorAll('a, button, .product-card, .endorsement-card').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
});

// ========== HEADER SCROLL ==========
const header = document.querySelector('.site-header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  header.classList.toggle('scrolled', scrollY > 100);

  // Check if hero is visible
  const heroHeight = document.querySelector('.hero').offsetHeight;
  header.classList.toggle('hero-visible', scrollY < heroHeight - 100);

  lastScroll = scrollY;
});

// Initial state
header.classList.add('hero-visible');

// ========== MOBILE MENU ==========
const hamburger = document.querySelector('.hamburger');
const mobileOverlay = document.querySelector('.mobile-overlay');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  mobileOverlay.classList.toggle('active');
  document.body.style.overflow = mobileOverlay.classList.contains('active') ? 'hidden' : '';
});

document.querySelectorAll('.mobile-nav a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    mobileOverlay.classList.remove('active');
    document.body.style.overflow = '';
  });
});

// ========== SCROLL REVEAL ==========
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Stagger children if multiple siblings
      const siblings = entry.target.parentElement.querySelectorAll('[data-reveal]');
      let delay = 0;
      siblings.forEach(sib => {
        if (sib === entry.target) {
          setTimeout(() => sib.classList.add('revealed'), delay);
        }
      });
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

// Observe all reveal elements except hero ones (handled separately)
document.querySelectorAll('[data-reveal]').forEach(el => {
  if (!el.closest('.hero')) {
    revealObserver.observe(el);
  }
});

// ========== PARALLAX ==========
const parallaxElements = document.querySelectorAll('[data-parallax]');

function updateParallax() {
  const scrollY = window.scrollY;
  const windowHeight = window.innerHeight;

  parallaxElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    const speed = parseFloat(el.dataset.parallax);
    const center = rect.top + rect.height / 2;
    const offset = (center - windowHeight / 2) * speed;
    el.style.transform = `translateY(${offset}px)`;
  });

  requestAnimationFrame(updateParallax);
}
updateParallax();

// ========== COUNT-UP ANIMATION ==========
const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.count);
      const duration = 1500;
      const startTime = performance.now();

      function animateCount(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target);

        if (progress < 1) {
          requestAnimationFrame(animateCount);
        }
      }

      requestAnimationFrame(animateCount);
      countObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-count]').forEach(el => {
  countObserver.observe(el);
});

// ========== SMOOTH ANCHOR SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ========== STAGGERED REVEAL FOR GRIDS ==========
const staggerObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const cards = entry.target.querySelectorAll('[data-reveal]');
      cards.forEach((card, i) => {
        setTimeout(() => card.classList.add('revealed'), i * 120);
      });
      staggerObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.products-grid, .philosophy-grid, .ritual-grid, .cert-grid, .coming-grid').forEach(grid => {
  staggerObserver.observe(grid);
});

// ========== FAQ ACCORDION ==========
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isActive = item.classList.contains('active');

    // Close all other items
    document.querySelectorAll('.faq-item.active').forEach(other => {
      if (other !== item) other.classList.remove('active');
    });

    item.classList.toggle('active', !isActive);
  });
});

// ========== HEADER COLORS ON HERO ==========
const heroEl = document.querySelector('.hero');
function updateHeaderColors() {
  if (!heroEl) return;
  const heroBottom = heroEl.getBoundingClientRect().bottom;
  const isOverHero = heroBottom > 80;

  const links = header.querySelectorAll('.nav-links a, .nav-cart');
  const hamLines = header.querySelectorAll('.ham-line');

  if (isOverHero && !header.classList.contains('scrolled')) {
    links.forEach(l => l.style.color = 'rgba(255,255,255,0.6)');
    hamLines.forEach(l => l.style.background = 'white');
  } else {
    links.forEach(l => l.style.color = '');
    hamLines.forEach(l => l.style.background = '');
  }

  requestAnimationFrame(updateHeaderColors);
}
if (heroEl) updateHeaderColors();

// Floating new-flavor teaser card — pure CSS animation, no JS needed.

// ========== AUTOPLAY VIDEO WATCHDOG ==========
// Browsers pause muted autoplay videos in several situations: when the
// tab loses focus, when the video scrolls out of view for a while,
// when the OS is in low-power mode, etc. Force them to keep playing.
(() => {
  const videos = Array.from(document.querySelectorAll('video[autoplay]'));
  if (!videos.length) return;

  const tryPlay = (v) => {
    if (!v.paused) return;
    const p = v.play();
    if (p && typeof p.catch === 'function') p.catch(() => { /* swallowed: autoplay policy */ });
  };

  const inView = (v) => {
    const r = v.getBoundingClientRect();
    return r.bottom > 0 && r.top < window.innerHeight;
  };

  // Resume any in-view video when tab becomes visible
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) return;
    videos.forEach(v => { if (inView(v)) tryPlay(v); });
  });

  // Re-trigger play whenever a video scrolls into view
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) tryPlay(e.target);
    });
  }, { threshold: 0.1 });
  videos.forEach(v => io.observe(v));

  // Hook the pause event itself: if the video pauses for any reason
  // while it's still in view, immediately try to resume.
  videos.forEach(v => {
    v.addEventListener('pause', () => {
      // Only resume if it wasn't a deliberate end-of-clip + non-loop case
      if (v.ended && !v.loop) return;
      if (inView(v)) requestAnimationFrame(() => tryPlay(v));
    });
  });
})();
