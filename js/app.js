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
      // CORREÇÃO: Comentar ou remover as linhas que causam erro
      // gsap.from('.hero', { opacity: 0, y: 20, duration: 0.9, ease: 'power2.out' });
      // gsap.from('.card', { opacity: 0, y: 14, duration: 0.9, stagger: 0.06, ease: 'power2.out' });
      // gsap.to('.avatar', { y: -6, repeat: -1, yoyo: true, duration: 3, ease: 'sine.inOut' });

      // Em vez disso, animar elementos que EXISTEM no seu index.html
      const parallax = document.querySelector('.parallax');
      if (parallax) {
        gsap.from('.parallax', {
          opacity: 0,
          y: 30,
          duration: 1.2,
          delay: 0.5,
          ease: 'power2.out'
        });
      }

      const brand = document.querySelector('.brand');
      if (brand) {
        gsap.from('.brand', {
          opacity: 0,
          y: -20,
          duration: 1,
          delay: 0.3,
          ease: 'power2.out'
        });
      }
    }
  }

  initCarousel() {
    const track = document.getElementById('track');
    if (!track) return;

    this.carouselIndex = 0;
    this.carouselItems = Array.from(track.children);
    this.dotsContainer = document.getElementById('dots');

    // Criar dots
    this.createDots();

    // Inicializar
    this.updateCarousel();

    // Event listeners
    document.getElementById('cprev')?.addEventListener('click', () => this.prevSlide());
    document.getElementById('cnext')?.addEventListener('click', () => this.nextSlide());

    // Auto-advance
    this.startCarouselInterval();

    // Evento de redimensionamento
    window.addEventListener('resize', () => this.updateCarousel());
  }

  // MÉTODOS FALTANTES DO CARROSSEL - ADICIONE ESTES!
  startCarouselInterval() {
    if (this.carouselInterval) {
      clearInterval(this.carouselInterval);
    }

    this.carouselInterval = setInterval(() => {
      this.nextSlide();
    }, 5000); // Muda a cada 5 segundos
  }

  resetCarouselInterval() {
    if (this.carouselInterval) {
      clearInterval(this.carouselInterval);
      this.startCarouselInterval();
    }
  }

  createDots() {
    if (!this.dotsContainer || !this.carouselItems.length) return;

    this.dotsContainer.innerHTML = '';
    const itemsPerView = this.getItemsPerView();
    const totalDots = Math.max(1, this.carouselItems.length - itemsPerView + 1);

    for (let i = 0; i < totalDots; i++) {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot';
      if (i === 0) dot.classList.add('active');
      dot.setAttribute('aria-label', `Ir para slide ${i + 1}`);
      dot.addEventListener('click', () => {
        this.carouselIndex = i;
        this.updateCarousel();
        this.resetCarouselInterval();
      });
      this.dotsContainer.appendChild(dot);
    }

    this.dots = Array.from(this.dotsContainer.children);
  }

  getItemsPerView() {
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 1024) return 2;
    if (window.innerWidth < 1200) return 3;
    return 4;
  }

  updateCarousel() {
    if (!this.carouselItems || this.carouselItems.length === 0) return;

    const itemsPerView = this.getItemsPerView();
    const maxIndex = Math.max(0, this.carouselItems.length - itemsPerView);

    // Limitar índice
    if (this.carouselIndex > maxIndex) {
      this.carouselIndex = maxIndex;
    }

    // Calcular deslocamento
    const itemWidth = this.carouselItems[0].offsetWidth;
    const gap = 20;
    const shift = (itemWidth + gap) * this.carouselIndex;

    // Aplicar transformação
    const track = document.getElementById('track');
    if (track) {
      track.style.transform = `translateX(-${shift}px)`;
    }

    // Atualizar dots
    if (this.dots && this.dots.length > 0) {
      this.dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === this.carouselIndex);
      });
    }

    // Atualizar estado das setas
    this.updateArrows();
  }

  updateArrows() {
    const prevBtn = document.getElementById('cprev');
    const nextBtn = document.getElementById('cnext');
    const itemsPerView = this.getItemsPerView();
    const maxIndex = Math.max(0, this.carouselItems.length - itemsPerView);

    if (prevBtn) {
      prevBtn.classList.toggle('disabled', this.carouselIndex === 0);
    }

    if (nextBtn) {
      nextBtn.classList.toggle('disabled', this.carouselIndex >= maxIndex);
    }
  }

  prevSlide() {
    const itemsPerView = this.getItemsPerView();
    if (this.carouselIndex > 0) {
      this.carouselIndex--;
      this.updateCarousel();
      this.resetCarouselInterval();
    }
  }

  nextSlide() {
    const itemsPerView = this.getItemsPerView();
    const maxIndex = Math.max(0, this.carouselItems.length - itemsPerView);

    if (this.carouselIndex < maxIndex) {
      this.carouselIndex++;
      this.updateCarousel();
      this.resetCarouselInterval();
    }
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

    // Função para atualizar visibilidade
    const updateFABVisibility = () => {
      fab.style.display = window.scrollY > 300 ? 'flex' : 'none';
    };

    window.addEventListener('scroll', updateFABVisibility);

    // ADICIONE ESTA LINHA: Inicializar a visibilidade
    updateFABVisibility();
  }

  // PWA FUNCTIONALITY - CORREÇÃO MÍNIMA
  initPWA() {
  this.deferredPrompt = null;
  this.installDismissed = localStorage.getItem('installDismissed') === 'true';

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    this.deferredPrompt = e;

    if (!this.installDismissed) {
      this.showInstallPrompt();
    }
  });

  // Botão flutuante (principal)
const floatingInstallBtn = document.getElementById('installBtn');
if (floatingInstallBtn) {
  floatingInstallBtn.addEventListener('click', () => this.installPWA());
}

  // CORREÇÃO: Use o ID correto do HTML
  const installBtn = document.getElementById('installBtn'); // ID correto
  if (installBtn) {
    installBtn.addEventListener('click', () => this.installPWA());
  }

  // Botão de instalar no HEADER (pequeno) - REMOVA ou ajuste
  const headerInstallBtn = document.getElementById('headerInstallBtn');
  if (headerInstallBtn) {
    headerInstallBtn.addEventListener('click', () => this.installPWA());
  }

  // Botão de fechar prompt
  const closeInstallBtn = document.getElementById('closeInstallBtn');
  if (closeInstallBtn) {
    closeInstallBtn.addEventListener('click', () => this.dismissInstallPrompt());
  }

  // Botão de fechar tooltip
  const closeTooltip = document.getElementById('closeTooltip');
  if (closeTooltip) {
    closeTooltip.addEventListener('click', (e) => {
      e.stopPropagation();
      document.getElementById('installTooltip').classList.remove('show');
    });
  }

  // Mostrar tooltip ao passar mouse
  if (installBtn) {
    installBtn.addEventListener('mouseenter', () => {
      if (!this.installDismissed) {
        document.getElementById('installTooltip').classList.add('show');
      }
    });

    installBtn.addEventListener('mouseleave', () => {
      document.getElementById('installTooltip').classList.remove('show');
    });
  }

    // CORREÇÃO: Service Worker só tenta registrar em ambiente suportado
    if ('serviceWorker' in navigator) {
      // Verifica se estamos em localhost ou HTTPS
      const isLocalhost = window.location.hostname === 'localhost' ||
        window.location.hostname === '127.0.0.1';

      // Apenas registra se for HTTPS ou localhost
      if (window.location.protocol === 'https:' || isLocalhost) {
        navigator.serviceWorker.register('./sw.js')
          .then((registration) => {
            console.log('✅ Service Worker registrado com sucesso:', registration.scope);
          })
          .catch((error) => {
            console.log('❌ Falha no registro do Service Worker:', error);
          });
      } else {
        console.log('ℹ️ Service Worker não suportado em file:// - Execute em um servidor local');
      }
    }
  }

 async installPWA() {
  if (!this.deferredPrompt) return;

  this.deferredPrompt.prompt();
  const choiceResult = await this.deferredPrompt.userChoice;

  if (choiceResult.outcome === 'accepted') {
    console.log('PWA installed');
    this.showToast('App instalado com sucesso! 🎉', 'success');
  }

  this.deferredPrompt = null;
  
  // CORREÇÃO: Usar querySelector mais específico
  const installBtn = document.querySelector('#pwaInstallContainer #installBtn');
  if (installBtn) {
    installBtn.style.display = 'none';
  }
  
  // Esconder também o container inteiro
  const container = document.getElementById('pwaInstallContainer');
  if (container) {
    container.classList.remove('show');
    container.classList.add('hide');
  }
}

  // Métodos adicionais para a classe PortfolioApp:
  showInstallPrompt() {
  const container = document.getElementById('pwaInstallContainer');
  const badge = document.getElementById('installBadge');
  
  if (container && !this.installDismissed) {
    container.style.display = 'flex';
    
    // Mostrar após pequeno delay para animação
    setTimeout(() => {
      container.classList.add('show');
      container.classList.remove('hide');
    }, 100);
    
    if (badge) {
      setTimeout(() => {
        badge.style.display = 'none';
      }, 10000);
    }
  }
}

  dismissInstallPrompt() {
    const container = document.getElementById('pwaInstallContainer');
    if (container) {
      container.classList.remove('show');
      container.classList.add('hide');

      setTimeout(() => {
        container.style.display = 'none';
      }, 300);
    }

    this.installDismissed = true;
    localStorage.setItem('installDismissed', 'true');
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
    if (!toast) return; // Adicionar verificação de segurança

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