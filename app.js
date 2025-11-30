// Márcio Maker Portfolio - Main Application JavaScript
// PWA with routing, animations, and interactive features

// THEME PERSISTENCE
const themeBtn = document.getElementById('themeBtn');
const themeIcon = document.getElementById('themeIcon');
const prefers = localStorage.getItem('theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');

/**
 * Updates the theme icon based on current theme
 * @param {boolean} isLight - Whether light theme is active
 */
function updateThemeIcon(isLight) {
  themeIcon.textContent = isLight ? '☀️' : '🌙';
}

// Initialize theme on page load
if(prefers) {
  document.body.classList.toggle('light', prefers === 'light');
  themeBtn.setAttribute('aria-pressed', String(prefers === 'light'));
  updateThemeIcon(prefers === 'light');
}

// Theme toggle event handler
themeBtn.onclick = () => {
  const isLight = document.body.classList.toggle('light');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
  themeBtn.setAttribute('aria-pressed', String(isLight));
  updateThemeIcon(isLight);
};

// RESPONSIVE NAV
const ham = document.getElementById('hamburger');
const mob = document.getElementById('mobileMenu');
const desktopNav = document.getElementById('desktopNav');

/**
 * Synchronizes navigation based on screen size
 */
function syncNav() {
  if(window.innerWidth >= 920) {
    desktopNav.style.display = 'flex';
    mob.style.display = 'none';
    ham.classList.remove('active');
  } else {
    desktopNav.style.display = 'none';
  }
}

// Window resize handler
window.addEventListener('resize', syncNav);
syncNav();

// Mobile menu toggle
ham.addEventListener('click', () => {
  const open = mob.style.display === 'flex';
  mob.style.display = open ? 'none' : 'flex';
  mob.setAttribute('aria-hidden', String(open));
  ham.classList.toggle('active', !open);
});

// HASH ROUTER (extended)
const routes = [
  'home', 'projetos', 'sobre', 'blog', 'servicos', 'contato', 
  'project-portfolio', 'project-academy', 'project-social', 'project-creator', 'project-ecommerce', 'project-analytics',
  'article-pwa-guide', 'article-gsap-animations', 'article-ai-for-devs', 'article-responsive-design', 'article-pwa-performance', 'article-web-components',
  'service-pwa', 'service-ia', 'service-design', 'service-conteudo',
  // NOVAS ROTAS ART & IA STUDIO
  'ruta-art', 'avatar-ia', 'visagismo', 'colorimetria'
];

/**
 * Routes to the specified hash/page
 * @param {string} hash - The hash to route to
 */
function routeTo(hash) {
  const name = (hash || '#/home').replace('#/', '');
  routes.forEach(r => {
    const el = document.getElementById(r);
    if(el) el.classList.toggle('active', r === name);
  });
  
  // Scroll to top on route change
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Hash change and initial routing
window.addEventListener('hashchange', () => routeTo(location.hash));
if(!location.hash) {
  location.hash = '#/home';
} else {
  routeTo(location.hash);
}

// LINK HANDLING (navigate + close mobile menu)
document.querySelectorAll('[data-link]').forEach(a => {
  a.addEventListener('click', () => {
    if(window.innerWidth < 920) {
      mob.style.display = 'none';
      ham.classList.remove('active');
    }
  });
});

// PROJECT CARDS CLICK HANDLER
document.querySelectorAll('.card[data-project]').forEach(card => {
  card.addEventListener('click', () => {
    const projectId = card.getAttribute('data-project');
    location.hash = `#/project-${projectId}`;
  });
});

// SERVICE CARDS CLICK HANDLER
document.querySelectorAll('.card[data-service]').forEach(card => {
  card.addEventListener('click', () => {
    const serviceId = card.getAttribute('data-service');
    location.hash = `#/service-${serviceId}`;
  });
});

// ARTICLE CARDS CLICK HANDLER
document.querySelectorAll('.card[data-article]').forEach(card => {
  card.addEventListener('click', () => {
    const articleId = card.getAttribute('data-article');
    location.hash = `#/article-${articleId}`;
  });
});

// CAROUSEL ITEMS CLICK HANDLER
document.querySelectorAll('.carousel-item[data-project]').forEach(item => {
  item.addEventListener('click', () => {
    const projectId = item.getAttribute('data-project');
    location.hash = `#/project-${projectId}`;
  });
});

// NOVOS CARDS ART & IA STUDIO CLICK HANDLER
document.querySelectorAll('[data-route]').forEach(item => {
  item.addEventListener('click', () => {
    const to = item.getAttribute('data-route');
    location.hash = to;
  });
});

// VANILLA TILT init
if (typeof VanillaTilt !== 'undefined') {
  VanillaTilt.init(document.querySelectorAll('[data-tilt]'), {
    max: 12,
    speed: 300,
    glare: true,
    'max-glare': 0.15
  });
}

// GSAP ENHANCEMENTS
if(window.gsap) {
  gsap.from('.hero', {opacity: 0, y: 20, duration: 0.9, ease: 'power2.out'});
  gsap.from('.card', {opacity: 0, y: 14, duration: 0.9, stagger: 0.06, ease: 'power2.out'});
  // subtle floating for avatar
  gsap.to('.avatar', {y: -6, repeat: -1, yoyo: true, duration: 3, ease: 'sine.inOut'});
}

// CAROUSEL 3D LOGIC (improved)
const track = document.getElementById('track');
let cIndex = 0;
const items = Array.from(track.children);
const indicatorsContainer = document.getElementById('indicators');

// Create indicators
items.forEach((_, i) => {
  const indicator = document.createElement('div');
  indicator.className = 'carousel-indicator';
  if (i === 0) indicator.classList.add('active');
  indicator.addEventListener('click', () => {
    cIndex = i;
    updateCarousel();
    resetCarouselInterval();
  });
  indicatorsContainer.appendChild(indicator);
});

const indicators = Array.from(indicatorsContainer.children);

/**
 * Updates carousel position and transforms
 */
function updateCarousel() {
  const mid = Math.floor(items.length / 2);
  const gap = 280; // approximate item width including gap
  
  items.forEach((it, i) => {
    const pos = i - cIndex;
    const abs = Math.abs(pos);
    const scale = Math.max(0.78, 1 - abs * 0.12);
    const z = -abs * 120;
    const x = pos * gap;
    
    it.style.transform = `translateX(${x}px) translateZ(${z}px) scale(${scale})`;
    it.style.opacity = abs > 3 ? 0 : 1;
    it.style.zIndex = items.length - abs;
  });
  
  // Update indicators
  indicators.forEach((ind, i) => {
    ind.classList.toggle('active', i === cIndex);
  });
}

// Initialize carousel
updateCarousel();

// Carousel navigation
document.getElementById('cprev').addEventListener('click', () => {
  cIndex = (cIndex - 1 + items.length) % items.length;
  updateCarousel();
  resetCarouselInterval();
});

document.getElementById('cnext').addEventListener('click', () => {
  cIndex = (cIndex + 1) % items.length;
  updateCarousel();
  resetCarouselInterval();
});

// Auto-advance carousel
let carouselInterval = setInterval(() => {
  cIndex = (cIndex + 1) % items.length;
  updateCarousel();
}, 5000);

/**
 * Resets the carousel auto-advance interval
 */
function resetCarouselInterval() {
  clearInterval(carouselInterval);
  carouselInterval = setInterval(() => {
    cIndex = (cIndex + 1) % items.length;
    updateCarousel();
  }, 5000);
}

// ADMIN DEMO NUMBERS (fake dynamic)
setTimeout(() => {
  document.getElementById('visits').textContent = '14.782';
  document.getElementById('convs').textContent = '342';
  document.querySelectorAll('.bar > i').forEach(bar => {
    if (bar.style.width === '70%') bar.style.width = '75%';
    if (bar.style.width === '36%') bar.style.width = '42%';
  });
}, 1200);

// CONTACT FORM HANDLING
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Show loading state
  const submitText = document.getElementById('submitText');
  const submitLoading = document.getElementById('submitLoading');
  submitText.style.display = 'none';
  submitLoading.style.display = 'inline-block';
  
  // Simple form validation
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;
  
  if (!name || !email || !message) {
    showToast('Por favor, preencha todos os campos obrigatórios.', 'error');
    submitText.style.display = 'inline-block';
    submitLoading.style.display = 'none';
    return;
  }
  
  // Simulate API call
  setTimeout(() => {
    // In a real application, you would send this data to a server
    showToast('Mensagem enviada com sucesso! Entrarei em contato em breve.', 'success');
    this.reset();
    submitText.style.display = 'inline-block';
    submitLoading.style.display = 'none';
  }, 1500);
});

// TOAST NOTIFICATION FUNCTION
/**
 * Shows a toast notification
 * @param {string} message - The message to display
 * @param {string} type - The type of toast (success, error)
 */
function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.className = `toast ${type}`;
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

// FLOATING ACTION BUTTON
const fab = document.getElementById('fab');
fab.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Show/hide FAB based on scroll position
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    fab.style.display = 'flex';
  } else {
    fab.style.display = 'none';
  }
});

// PWA install prompt handling (deferred)
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  document.getElementById('installBtn').style.display = 'inline-block';
});

document.getElementById('installBtn').addEventListener('click', async () => {
  if(!deferredPrompt) return;
  deferredPrompt.prompt();
  const choice = await deferredPrompt.userChoice;
  deferredPrompt = null;
  document.getElementById('installBtn').style.display = 'none';
});

// REGISTER SW (best-effort; sw.js must be provided on server)
if('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(() => console.log('SW registered'))
    .catch(() => console.log('SW failed'));
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (!ham.contains(e.target) && !mob.contains(e.target) && window.innerWidth < 920) {
    mob.style.display = 'none';
    ham.classList.remove('active');
  }
});

// Add animation to stats counter
/**
 * Animates a value counter
 * @param {HTMLElement} element - The element to animate
 * @param {number} start - Starting value
 * @param {number} end - Ending value
 * @param {number} duration - Animation duration in ms
 */
function animateValue(element, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const value = Math.floor(progress * (end - start) + start);
    element.textContent = value + (element.textContent.includes('%') ? '%' : '');
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

// Animate stats when they come into view
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statValue = entry.target.querySelector('.stat-value');
      if (statValue && !entry.target.classList.contains('animated')) {
        const value = statValue.textContent;
        if (value.includes('+')) {
          const num = parseInt(value);
          animateValue(statValue, 0, num, 2000);
        } else if (value.includes('%')) {
          const num = parseInt(value);
          animateValue(statValue, 0, num, 2000);
        }
        entry.target.classList.add('animated');
      }
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item').forEach(item => {
  observer.observe(item);
});

// Add print functionality
document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
    e.preventDefault();
    window.print();
  }
});

// Add keyboard navigation for carousel
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    document.getElementById('cprev').click();
  } else if (e.key === 'ArrowRight') {
    document.getElementById('cnext').click();
  }
});

// Initialize skill bars animation
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const progressBar = entry.target.querySelector('.skill-progress');
      if (progressBar && !entry.target.classList.contains('animated')) {
        const width = progressBar.style.width;
        progressBar.style.width = '0%';
        setTimeout(() => {
          progressBar.style.width = width;
        }, 300);
        entry.target.classList.add('animated');
      }
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.skill-item').forEach(item => {
  skillObserver.observe(item);
});

// Performance optimization: Debounce resize events
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(syncNav, 250);
});

// Export functions for potential module use (if needed)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    routeTo,
    showToast,
    animateValue,
    updateCarousel
  };
}