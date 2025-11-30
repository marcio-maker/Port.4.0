// Márcio Maker Portfolio - Main Application JavaScript
// PWA with routing, animations, and interactive features

class PortfolioApp {
  constructor() {
    this.init();
  }

  init() {
    this.initTheme();
    this.initNavigation();
    this.initEventListeners();
    this.initComponents();
  }

  // THEME MANAGEMENT
  initTheme() {
    this.themeBtn = document.getElementById('themeBtn');
    this.themeIcon = document.getElementById('themeIcon');
    
    const prefers = localStorage.getItem('theme') || 
      (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');

    this.applyTheme(prefers);
    
    this.themeBtn.addEventListener('click', () => this.toggleTheme());
  }

  applyTheme(theme) {
    const isLight = theme === 'light';
    document.body.classList.toggle('light', isLight);
    this.themeBtn.setAttribute('aria-pressed', String(isLight));
    this.updateThemeIcon(isLight);
  }

  toggleTheme() {
    const isLight = document.body.classList.toggle('light');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    this.themeBtn.setAttribute('aria-pressed', String(isLight));
    this.updateThemeIcon(isLight);
  }

  updateThemeIcon(isLight) {
    this.themeIcon.textContent = isLight ? '☀️' : '🌙';
  }

  // NAVIGATION
  initNavigation() {
    this.ham = document.getElementById('hamburger');
    this.mob = document.getElementById('mobileMenu');
    this.desktopNav = document.getElementById('desktopNav');

    this.syncNavigation();
    window.addEventListener('resize', () => this.debounce(this.syncNavigation.bind(this), 250));

    this.ham.addEventListener('click', () => this.toggleMobileMenu());
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.ham.contains(e.target) && !this.mob.contains(e.target) && window.innerWidth < 920) {
        this.closeMobileMenu();
      }
    });
  }

  syncNavigation() {
    if (window.innerWidth >= 920) {
      this.desktopNav.style.display = 'flex';
      this.closeMobileMenu();
    } else {
      this.desktopNav.style.display = 'none';
    }
  }

  toggleMobileMenu() {
    const isOpen = this.mob.style.display === 'flex';
    if (isOpen) {
      this.closeMobileMenu();
    } else {
      this.openMobileMenu();
    }
  }

  openMobileMenu() {
    this.mob.style.display = 'flex';
    this.mob.setAttribute('aria-hidden', 'false');
    this.ham.classList.add('active');
  }

  closeMobileMenu() {
    this.mob.style.display = 'none';
    this.mob.setAttribute('aria-hidden', 'true');
    this.ham.classList.remove('active');
  }

  // COMPONENTS INITIALIZATION
  initComponents() {
    this.initTilt();
    this.initAnimations();
    this.initCarousel();
    this.initContactForm();
    this.initFAB();
    this.initPWA();
    this.initObservers();
  }

  initTilt() {
    if (typeof VanillaTilt !== 'undefined') {
      VanillaTilt.init(document.querySelectorAll('[data-tilt]'), {
        max: 12,
        speed: 300,
        glare: true,
        'max-glare': 0.15
      });
    }
  }

  initAnimations() {
    if (window.gsap) {
      gsap.from('.hero', { opacity: 0, y: 20, duration: 0.9, ease: 'power2.out' });
      gsap.from('.card', { opacity: 0, y: 14, duration: 0.9, stagger: 0.06, ease: 'power2.out' });
      
      // Subtle floating animation for avatar
      gsap.to('.avatar', { y: -6, repeat: -1, yoyo: true, duration: 3, ease: 'sine.inOut' });
    }
  }

  initCarousel() {
    const track = document.getElementById('track');
    if (!track) return;

    this.carouselIndex = 0;
    this.carouselItems = Array.from(track.children);
    this.indicatorsContainer = document.getElementById('indicators');

    this.initCarouselIndicators();
    this.updateCarousel();

    // Event listeners for carousel controls
    document.getElementById('cprev')?.addEventListener('click', () => this.prevSlide());
    document.getElementById('cnext')?.addEventListener('click', () => this.nextSlide());

    // Auto-advance
    this.startCarouselInterval();
  }

  initCarouselIndicators() {
    if (!this.indicatorsContainer) return;

    this.carouselItems.forEach((_, i) => {
      const indicator = document.createElement('div');
      indicator.className = 'carousel-indicator';
      if (i === 0) indicator.classList.add('active');
      indicator.addEventListener('click', () => {
        this.carouselIndex = i;
        this.updateCarousel();
        this.resetCarouselInterval();
      });
      this.indicatorsContainer.appendChild(indicator);
    });

    this.indicators = Array.from(this.indicatorsContainer.children);
  }

  updateCarousel() {
    const gap = 280;

    this.carouselItems.forEach((item, i) => {
      const pos = i - this.carouselIndex;
      const abs = Math.abs(pos);
      const scale = Math.max(0.78, 1 - abs * 0.12);
      const z = -abs * 120;
      const x = pos * gap;

      item.style.transform = `translateX(${x}px) translateZ(${z}px) scale(${scale})`;
      item.style.opacity = abs > 3 ? 0 : 1;
      item.style.zIndex = this.carouselItems.length - abs;
    });

    // Update indicators
    this.indicators?.forEach((indicator, i) => {
      indicator.classList.toggle('active', i === this.carouselIndex);
    });
  }

  prevSlide() {
    this.carouselIndex = (this.carouselIndex - 1 + this.carouselItems.length) % this.carouselItems.length;
    this.updateCarousel();
    this.resetCarouselInterval();
  }

  nextSlide() {
    this.carouselIndex = (this.carouselIndex + 1) % this.carouselItems.length;
    this.updateCarousel();
    this.resetCarouselInterval();
  }

  startCarouselInterval() {
    this.carouselInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  resetCarouselInterval() {
    clearInterval(this.carouselInterval);
    this.startCarouselInterval();
  }

  // CONTACT FORM
  initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => this.handleFormSubmit(e));
  }

  async handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitText = document.getElementById('submitText');
    const submitLoading = document.getElementById('submitLoading');

    // Show loading state
    submitText.style.display = 'none';
    submitLoading.style.display = 'inline-block';

    // Validation
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (!name || !email || !message) {
      this.showToast('Por favor, preencha todos os campos obrigatórios.', 'error');
      submitText.style.display = 'inline-block';
      submitLoading.style.display = 'none';
      return;
    }

    // Simulate API call
    try {
      await this.submitFormData(new FormData(form));
      this.showToast('Mensagem enviada com sucesso! Entrarei em contato em breve.', 'success');
      form.reset();
    } catch (error) {
      this.showToast('Erro ao enviar mensagem. Tente novamente.', 'error');
    } finally {
      submitText.style.display = 'inline-block';
      submitLoading.style.display = 'none';
    }
  }

  submitFormData(formData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        // In a real application, you would send the data to a server here
        console.log('Form data:', Object.fromEntries(formData));
        resolve();
      }, 1500);
    });
  }

  // FLOATING ACTION BUTTON
  initFAB() {
    const fab = document.getElementById('fab');
    if (!fab) return;

    fab.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', () => {
      fab.style.display = window.scrollY > 300 ? 'flex' : 'none';
    });
  }

  // PWA FUNCTIONALITY
  initPWA() {
    this.deferredPrompt = null;

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
      document.getElementById('installBtn').style.display = 'inline-block';
    });

    document.getElementById('installBtn')?.addEventListener('click', () => this.installPWA());

    // Register Service Worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(() => console.log('Service Worker registered'))
        .catch((error) => console.log('Service Worker registration failed:', error));
    }
  }

  async installPWA() {
    if (!this.deferredPrompt) return;
    
    this.deferredPrompt.prompt();
    const choiceResult = await this.deferredPrompt.userChoice;
    
    if (choiceResult.outcome === 'accepted') {
      console.log('PWA installed');
    }
    
    this.deferredPrompt = null;
    document.getElementById('installBtn').style.display = 'none';
  }

  // OBSERVERS FOR ANIMATIONS
  initObservers() {
    this.initStatsObserver();
    this.initSkillsObserver();
  }

  initStatsObserver() {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const statValue = entry.target.querySelector('.stat-value');
          if (statValue && !entry.target.classList.contains('animated')) {
            this.animateStatValue(statValue);
            entry.target.classList.add('animated');
          }
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-item').forEach(item => {
      statsObserver.observe(item);
    });
  }

  initSkillsObserver() {
    const skillsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const progressBar = entry.target.querySelector('.skill-progress');
          if (progressBar && !entry.target.classList.contains('animated')) {
            this.animateSkillBar(progressBar);
            entry.target.classList.add('animated');
          }
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('.skill-item').forEach(item => {
      skillsObserver.observe(item);
    });
  }

  animateStatValue(element) {
    const value = element.textContent;
    if (value.includes('+')) {
      const num = parseInt(value);
      this.animateValue(element, 0, num, 2000);
    } else if (value.includes('%')) {
      const num = parseInt(value);
      this.animateValue(element, 0, num, 2000);
    }
  }

  animateSkillBar(progressBar) {
    const width = progressBar.style.width;
    progressBar.style.width = '0%';
    setTimeout(() => {
      progressBar.style.width = width;
    }, 300);
  }

  // UTILITY METHODS
  animateValue(element, start, end, duration) {
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

  showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type}`;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  }

  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // EVENT LISTENERS
  initEventListeners() {
    // Print functionality
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        window.print();
      }
    });

    // Keyboard navigation for carousel
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        document.getElementById('cprev')?.click();
      } else if (e.key === 'ArrowRight') {
        document.getElementById('cnext')?.click();
      }
    });
  }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.portfolioApp = new PortfolioApp();
});