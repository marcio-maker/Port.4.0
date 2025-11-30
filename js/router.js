// Router for SPA functionality
class Router {
  constructor() {
    this.routes = [
      'home', 'projetos', 'sobre', 'blog', 'servicos', 'contato', 
      'ruta-art', 'avatar-ia', 'visagismo', 'colorimetria',
      'project-portfolio', 'project-academy', 'project-social', 'project-creator',
      'article-pwa-guide'
    ];
    
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.handleInitialRoute();
  }

  setupEventListeners() {
    // Hash change listener
    window.addEventListener('hashchange', () => this.handleRouteChange());
    
    // Link click handlers
    document.addEventListener('click', (e) => {
      const link = e.target.closest('[data-link]');
      if (link) {
        e.preventDefault();
        this.handleLinkClick(link);
      }
    });

    // Card click handlers
    this.setupCardHandlers();
  }

  setupCardHandlers() {
    // Project cards
    document.addEventListener('click', (e) => {
      const card = e.target.closest('.card[data-project]');
      if (card) {
        const projectId = card.getAttribute('data-project');
        this.navigateTo(`#/project-${projectId}`);
      }
    });

    // Service cards
    document.addEventListener('click', (e) => {
      const card = e.target.closest('.card[data-service]');
      if (card) {
        const serviceId = card.getAttribute('data-service');
        this.navigateTo(`#/service-${serviceId}`);
      }
    });

    // Article cards
    document.addEventListener('click', (e) => {
      const card = e.target.closest('.card[data-article]');
      if (card) {
        const articleId = card.getAttribute('data-article');
        this.navigateTo(`#/article-${articleId}`);
      }
    });

    // Carousel items
    document.addEventListener('click', (e) => {
      const item = e.target.closest('.carousel-item[data-project]');
      if (item) {
        const projectId = item.getAttribute('data-project');
        this.navigateTo(`#/project-${projectId}`);
      }
    });

    // Art & IA Studio cards
    document.addEventListener('click', (e) => {
      const item = e.target.closest('[data-route]');
      if (item) {
        const route = item.getAttribute('data-route');
        this.navigateTo(route);
      }
    });
  }

  handleInitialRoute() {
    if (!location.hash || location.hash === '#') {
      this.navigateTo('#/home');
    } else {
      this.handleRouteChange();
    }
  }

  handleRouteChange() {
    const hash = location.hash;
    this.routeTo(hash);
  }

  handleLinkClick(link) {
    const href = link.getAttribute('href');
    this.navigateTo(href);
    
    // Close mobile menu if open
    if (window.innerWidth < 920) {
      window.portfolioApp?.closeMobileMenu();
    }
  }

  navigateTo(route) {
    location.hash = route;
  }

  routeTo(hash) {
    const routeName = (hash || '#/home').replace('#/', '');
    
    // Hide all pages
    this.routes.forEach(route => {
      const element = document.getElementById(route);
      if (element) {
        element.classList.remove('active');
      }
    });

    // Show current page
    const currentPage = document.getElementById(routeName);
    if (currentPage) {
      currentPage.classList.add('active');
      this.loadPageContent(routeName, currentPage);
    } else {
      // Fallback to home if route not found
      this.navigateTo('#/home');
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  loadPageContent(routeName, pageElement) {
    // If page is already loaded, return
    if (pageElement.hasAttribute('data-loaded')) {
      return;
    }

    // Load content based on route
    switch (routeName) {
      case 'home':
        this.loadHomePage(pageElement);
        break;
      case 'projetos':
        this.loadProjectsPage(pageElement);
        break;
      case 'sobre':
        this.loadAboutPage(pageElement);
        break;
      case 'blog':
        this.loadBlogPage(pageElement);
        break;
      case 'servicos':
        this.loadServicesPage(pageElement);
        break;
      case 'ruta-art':
        this.loadArtStudioPage(pageElement);
        break;
      case 'avatar-ia':
        this.loadAvatarIAPage(pageElement);
        break;
      case 'visagismo':
        this.loadVisagismoPage(pageElement);
        break;
      case 'colorimetria':
        this.loadColorimetriaPage(pageElement);
        break;
      case 'contato':
        this.loadContactPage(pageElement);
        break;
      case 'project-portfolio':
        this.loadProjectDetail(pageElement, 'portfolio');
        break;
      case 'project-academy':
        this.loadProjectDetail(pageElement, 'academy');
        break;
      case 'project-social':
        this.loadProjectDetail(pageElement, 'social');
        break;
      case 'project-creator':
        this.loadProjectDetail(pageElement, 'creator');
        break;
      case 'article-pwa-guide':
        this.loadArticleDetail(pageElement, 'pwa-guide');
        break;
    }

    pageElement.setAttribute('data-loaded', 'true');
  }

  loadHomePage(element) {
    element.innerHTML = `
      <div class="hero card" data-tilt>
        <img class="avatar" src="https://media.licdn.com/dms/image/v2/D4D03AQEyt_pZDkOL4A/profile-displayphoto-scale_400_400/B4DZq11V0OGkAk-/0/1763987251706?e=1766016000&v=beta&t=zAoRpkFJE7hXj9c9QSqw__MzhitysBJRtbup-DmfZIA" alt="Márcio Maker">
        <h2 class="title">Criando produtos que encantam e vendem</h2>
        <p class="lead">PWA, IA, interfaces modernas e experiências de valor.</p>
        <div style="text-align:center;margin-top:16px">
          <a href="#/contato" class="btn" data-link>Entre em Contato</a>
          <a href="#/projetos" class="btn ghost" data-link style="margin-left:8px">Ver Projetos</a>
        </div>
      </div>

      <div class="stats-grid">
        <div class="stat-item">
          <div class="stat-value">50+</div>
          <div class="stat-label">Projetos Entregues</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">8+</div>
          <div class="stat-label">Anos de Experiência</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">95%</div>
          <div class="stat-label">Satisfação do Cliente</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">24/7</div>
          <div class="stat-label">Suporte</div>
        </div>
      </div>

      <h3 style="margin-top:18px">Projetos em Destaque</h3>
      <div class="carousel card" id="carousel">
        <div class="carousel-track" id="track">
          <div class="carousel-item" data-tilt data-project="portfolio">
            <h4>Portfólio 4.0</h4>
            <p class="lead-strong">Site PWA com animações, temas e dashboard.</p>
            <img class="case-media" src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=60" alt="">
          </div>
          <div class="carousel-item" data-tilt data-project="academy">
            <h4>Aha! Academy</h4>
            <p class="lead-strong">Plataforma de cursos offline-first.</p>
            <img class="case-media" src="https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=900&q=60" alt="">
          </div>
          <div class="carousel-item" data-tilt data-project="social">
            <h4>Social PWA</h4>
            <p class="lead-strong">Feed com cache inteligente.</p>
            <img class="case-media" src="https://images.unsplash.com/photo-1505238680356-667803448bb6?auto=format&fit=crop&w=900&q=60" alt="">
          </div>
          <div class="carousel-item" data-tilt data-project="creator">
            <h4>Creator Studio</h4>
            <p class="lead-strong">Ferramentas de criação com IA.</p>
            <img class="case-media" src="https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=900&q=60" alt="">
          </div>
        </div>
        <div class="carousel-controls">
          <button class="btn" id="cprev">◀</button>
          <button class="btn" id="cnext">▶</button>
        </div>
        <div class="carousel-indicators" id="indicators"></div>
      </div>

      <section style="margin-top:18px">
        <h3>Serviços</h3>
        <div class="grid" style="margin-top:12px">
          <div class="card" data-tilt data-service="pwa">
            <h4>PWA Completo</h4>
            <p class="lead-strong">Instalável, offline, rápido.</p>
          </div>
          <div class="card" data-tilt data-service="ia">
            <h4>IA & Automação</h4>
            <p class="lead-strong">Chatbots, prompts e fluxos.</p>
          </div>
          <div class="card" data-tilt data-service="design">
            <h4>Design Premium</h4>
            <p class="lead-strong">UI moderna e conversão.</p>
          </div>
          <div class="card" data-tilt data-service="conteudo">
            <h4>Conteúdo & Cursos</h4>
            <p class="lead-strong">Materiais e aulas.</p>
          </div>
        </div>
      </section>

      <div class="testimonials">
        <h3>O que dizem meus clientes</h3>
        <div class="testimonial-item">
          <div class="testimonial-content">
            O Márcio transformou completamente nossa presença digital. O PWA que ele desenvolveu aumentou nossas conversões em 40% e reduziu a taxa de rejeição drasticamente.
          </div>
          <div class="testimonial-author">
            <img class="testimonial-avatar" src="https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=100&q=60" alt="Maria Silva">
            <div class="testimonial-info">
              <h4>Maria Silva</h4>
              <p>CEO, TechSolutions</p>
            </div>
          </div>
        </div>
        <div class="testimonial-item">
          <div class="testimonial-content">
            Trabalhar com o Márcio foi uma experiência incrível. Sua expertise em IA nos ajudou a automatizar processos que economizam horas de trabalho manual toda semana.
          </div>
          <div class="testimonial-author">
            <img class="testimonial-avatar" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=60" alt="João Santos">
            <div class="testimonial-info">
              <h4>João Santos</h4>
              <p>CTO, InovaTech</p>
            </div>
          </div>
        </div>
      </div>
    `;

    // Reinitialize carousel after loading content
    setTimeout(() => {
      window.portfolioApp?.initCarousel();
    }, 100);
  }

  loadProjectsPage(element) {
    element.innerHTML = `
      <div class="section-header">
        <h2>Meus Projetos</h2>
        <p class="lead">Uma seleção dos trabalhos mais recentes e relevantes que desenvolvi</p>
      </div>

      <div class="grid">
        <div class="card" data-project="portfolio">
          <img class="card-img" src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=60" alt="Portfólio 4.0">
          <h4>Portfólio 4.0</h4>
          <p class="lead-strong">Site PWA com animações, temas e dashboard.</p>
          <div class="card-tags">
            <span class="card-tag">PWA</span>
            <span class="card-tag">GSAP</span>
            <span class="card-tag">Dashboard</span>
          </div>
        </div>
        <div class="card" data-project="academy">
          <img class="card-img" src="https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=900&q=60" alt="Aha! Academy">
          <h4>Aha! Academy</h4>
          <p class="lead-strong">Plataforma de cursos offline-first.</p>
          <div class="card-tags">
            <span class="card-tag">PWA</span>
            <span class="card-tag">Offline</span>
            <span class="card-tag">Education</span>
          </div>
        </div>
        <div class="card" data-project="social">
          <img class="card-img" src="https://images.unsplash.com/photo-1505238680356-667803448bb6?auto=format&fit=crop&w=900&q=60" alt="Social PWA">
          <h4>Social PWA</h4>
          <p class="lead-strong">Feed com cache inteligente.</p>
          <div class="card-tags">
            <span class="card-tag">PWA</span>
            <span class="card-tag">Social</span>
            <span class="card-tag">Cache</span>
          </div>
        </div>
        <div class="card" data-project="creator">
          <img class="card-img" src="https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=900&q=60" alt="Creator Studio">
          <h4>Creator Studio</h4>
          <p class="lead-strong">Ferramentas de criação com IA.</p>
          <div class="card-tags">
            <span class="card-tag">IA</span>
            <span class="card-tag">Tools</span>
            <span class="card-tag">Creator</span>
          </div>
        </div>
      </div>
    `;
  }

  loadAboutPage(element) {
    element.innerHTML = `
      <div class="about-content">
        <div class="section-header">
          <h2>Sobre Mim</h2>
          <p class="lead">Desenvolvedor Full Stack com paixão por criar experiências digitais excepcionais</p>
        </div>
        
        <div class="card" style="padding:20px">
          <div style="display:flex;flex-direction:column;align-items:center;gap:16px;margin-bottom:20px">
            <img class="avatar" src="https://media.licdn.com/dms/image/v2/D4D03AQEyt_pZDkOL4A/profile-displayphoto-scale_400_400/B4DZq11V0OGkAk-/0/1763987251706?e=1766016000&v=beta&t=zAoRpkFJE7hXj9c9QSqw__MzhitysBJRtbup-DmfZIA" alt="Márcio Maker">
            <div style="text-align:center">
              <h3>Márcio Maker</h3>
              <p class="lead">Full Stack Developer & Product Designer</p>
            </div>
          </div>
          
          <p style="margin-bottom:16px">Sou um desenvolvedor full stack com mais de 8 anos de experiência criando produtos digitais que combinam tecnologia avançada com design cuidadoso. Minha missão é transformar ideias em experiências digitais funcionais e belas.</p>
          
          <p style="margin-bottom:16px">Especializado em Progressive Web Apps (PWA), integração de IA e criação de interfaces que convertem visitantes em clientes. Acredito que a tecnologia deve ser acessível, eficiente e, acima de tudo, resolver problemas reais.</p>
          
          <h3 style="margin-top:24px">Habilidades Técnicas</h3>
          <div class="skills-grid">
            <div class="skill-item">
              <div class="skill-icon">⚡</div>
              <h4>PWA</h4>
              <p class="lead">Apps instaláveis e offline</p>
              <div class="skill-bar">
                <div class="skill-progress" style="width:95%"></div>
              </div>
            </div>
            <div class="skill-item">
              <div class="skill-icon">🤖</div>
              <h4>IA & Machine Learning</h4>
              <p class="lead">Integração e automação</p>
              <div class="skill-bar">
                <div class="skill-progress" style="width:85%"></div>
              </div>
            </div>
            <div class="skill-item">
              <div class="skill-icon">🎨</div>
              <h4>UI/UX Design</h4>
              <p class="lead">Design focado em conversão</p>
              <div class="skill-bar">
                <div class="skill-progress" style="width:90%"></div>
              </div>
            </div>
            <div class="skill-item">
              <div class="skill-icon">🚀</div>
              <h4>Performance</h4>
              <p class="lead">Otimização e velocidade</p>
              <div class="skill-bar">
                <div class="skill-progress" style="width:92%"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  loadBlogPage(element) {
    element.innerHTML = `
      <div class="section-header">
        <h2>Blog & Artigos</h2>
        <p class="lead">Compartilhando conhecimento sobre PWA, IA, UX e desenvolvimento web</p>
      </div>
      
      <div class="grid">
        <div class="card" data-article="pwa-guide">
          <img class="card-img" src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=60" alt="Como criar um PWA">
          <h4>Guia Completo: Como criar um PWA do zero</h4>
          <p class="lead-strong">Checklist e exemplos práticos para desenvolver Progressive Web Apps.</p>
          <div class="card-tags">
            <span class="card-tag">PWA</span>
            <span class="card-tag">Tutorial</span>
            <span class="card-tag">Guia</span>
          </div>
          <div style="margin-top:10px;font-size:14px;color:var(--muted)">15 min de leitura</div>
        </div>
      </div>
    `;
  }

  loadServicesPage(element) {
    element.innerHTML = `
      <div class="section-header">
        <h2>Serviços</h2>
        <p class="lead">Soluções completas para suas necessidades digitais</p>
      </div>
      
      <div class="grid">
        <div class="card" data-service="pwa">
          <img class="card-img" src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=60" alt="PWA Completo">
          <h4>PWA Completo</h4>
          <p class="lead-strong">Aplicações web que funcionam como apps nativos.</p>
          <div class="card-tags">
            <span class="card-tag">Instalável</span>
            <span class="card-tag">Offline</span>
            <span class="card-tag">Rápido</span>
          </div>
        </div>
        <div class="card" data-service="ia">
          <img class="card-img" src="https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=900&q=60" alt="IA & Automação">
          <h4>IA & Automação</h4>
          <p class="lead-strong">Chatbots, prompts e fluxos inteligentes.</p>
          <div class="card-tags">
            <span class="card-tag">IA</span>
            <span class="card-tag">Automação</span>
            <span class="card-tag">Chatbots</span>
          </div>
        </div>
      </div>
    `;
  }

  loadArtStudioPage(element) {
    element.innerHTML = `
      <div class="section-header">
        <h2>Art & IA Studio</h2>
        <p class="lead">Onde criatividade, estética e tecnologia se encontram</p>
      </div>

      <div class="grid">
        <div class="card" data-tilt data-route="#/avatar-ia">
          <img class="card-img" src="https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=900&q=60" alt="Avatar IA">
          <h4>Avatar IA</h4>
          <p class="lead-strong">Criação de personagens digitais e identidades visuais.</p>
          <div class="card-tags">
            <span class="card-tag">IA</span>
            <span class="card-tag">Design</span>
            <span class="card-tag">Personagens</span>
          </div>
        </div>

        <div class="card" data-tilt data-route="#/visagismo">
          <img class="card-img" src="https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=900&q=60" alt="Visagismo Digital">
          <h4>Visagismo Digital</h4>
          <p class="lead-strong">Análise estética para transformar experiências e interfaces.</p>
          <div class="card-tags">
            <span class="card-tag">Estética</span>
            <span class="card-tag">Harmonia</span>
            <span class="card-tag">Formas</span>
          </div>
        </div>

        <div class="card" data-tilt data-route="#/colorimetria">
          <img class="card-img" src="https://images.unsplash.com/photo-1505238680356-667803448bb6?auto=format&fit=crop&w=900&q=60" alt="Colorimetria Criativa">
          <h4>Colorimetria Criativa</h4>
          <p class="lead-strong">Paletas inteligentes, contraste, harmonia e psicologia das cores.</p>
          <div class="card-tags">
            <span class="card-tag">Cores</span>
            <span class="card-tag">Paletas</span>
            <span class="card-tag">Harmonia</span>
          </div>
        </div>
      </div>
    `;
  }

  loadAvatarIAPage(element) {
    element.innerHTML = `
      <a href="#/ruta-art" class="back-btn" data-link>← Voltar para Art & IA Studio</a>

      <div class="project-detail">
        <h2>Avatar IA</h2>
        <p class="lead">Meu processo artístico para criar avatares digitais realistas, educativos e expressivos.</p>

        <img class="project-hero" src="https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=1200&q=60" alt="Avatar IA">

        <div class="card" style="padding:20px">
          <h3>Sobre o Processo</h3>
          <p>Crio avatares com foco em comunicação visual, storytelling, estética e impacto emocional. Meu trabalho mistura cor, forma, harmonia facial e realismo.</p>

          <div style="margin-top:20px">
            <a href="#/contato" class="btn" data-link>Quero meu Avatar</a>
          </div>
        </div>
      </div>
    `;
  }

  loadVisagismoPage(element) {
    element.innerHTML = `
      <a href="#/ruta-art" class="back-btn" data-link>← Voltar para Art & IA Studio</a>

      <div class="project-detail">
        <h2>Visagismo Digital</h2>
        <p class="lead">Estudo de formas, proporções, estilos e identidade visual aplicada ao digital.</p>

        <img class="project-hero" src="https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=60" alt="Visagismo Digital">

        <div class="card" style="padding:20px">
          <h3>Visagismo na Era Digital</h3>
          <p>Utilizo técnicas de visagismo para criar interfaces, avatares e layouts com mais harmonia, impacto e propósito. Cada elemento visual precisa conversar com a emoção da pessoa.</p>
        </div>
      </div>
    `;
  }

  loadColorimetriaPage(element) {
    element.innerHTML = `
      <a href="#/ruta-art" class="back-btn" data-link>← Voltar para Art & IA Studio</a>

      <div class="project-detail">
        <h2>Colorimetria Criativa</h2>
        <p class="lead">Cores que criam impacto, emoção e identidade.</p>

        <img class="project-hero" src="https://images.unsplash.com/photo-1505238680356-667803448bb6?auto=format&fit=crop&w=1200&q=60" alt="Colorimetria Criativa">

        <div class="card" style="padding:20px">
          <h3>A Ciência das Cores no Digital</h3>
          <p>A cor transforma tudo. No meu trabalho eu aplico princípios de colorimetria para criar paletas, harmonias, temas claros/escuros e atmosferas visuais com intenção.</p>
        </div>
      </div>
    `;
  }

  loadContactPage(element) {
    element.innerHTML = `
      <div class="section-header">
        <h2>Entre em Contato</h2>
        <p class="lead">Vamos conversar sobre seu projeto? Entre em contato e vamos criar algo incrível juntos!</p>
      </div>
      
      <div class="contact-form card" style="padding:20px">
        <form id="contactForm">
          <div class="form-group">
            <label for="name">Nome *</label>
            <input type="text" id="name" name="name" required>
          </div>
          
          <div class="form-group">
            <label for="email">E-mail *</label>
            <input type="email" id="email" name="email" required>
          </div>
          
          <div class="form-group">
            <label for="subject">Assunto</label>
            <select id="subject" name="subject">
              <option value="">Selecione um assunto</option>
              <option value="orcamento">Orçamento de projeto</option>
              <option value="duvida">Dúvida técnica</option>
              <option value="parceria">Proposta de parceria</option>
              <option value="outro">Outro</option>
            </select>
          </div>
          
          <div class="form-group">
            <label for="message">Mensagem *</label>
            <textarea id="message" name="message" placeholder="Conte-me sobre seu projeto..." required></textarea>
          </div>
          
          <button type="submit" class="btn" style="width:100%">
            <span id="submitText">Enviar Mensagem</span>
            <span id="submitLoading" class="loading" style="display:none"></span>
          </button>
        </form>
      </div>
      
      <div class="grid" style="margin-top:20px">
        <div class="card" style="text-align:center">
          <h4>📧 E-mail</h4>
          <p class="lead-strong">contato@marciomaker.com</p>
        </div>
        <div class="card" style="text-align:center">
          <h4>📱 WhatsApp</h4>
          <p class="lead-strong">(11) 99999-9999</p>
        </div>
        <div class="card" style="text-align:center">
          <h4>📍 Localização</h4>
          <p class="lead-strong">São Paulo, Brasil</p>
        </div>
        <div class="card" style="text-align:center">
          <h4>🕒 Horário</h4>
          <p class="lead-strong">Seg - Sex: 9h - 18h</p>
        </div>
      </div>
    `;

    // Reinitialize contact form after loading
    setTimeout(() => {
      window.portfolioApp?.initContactForm();
    }, 100);
  }

  loadProjectDetail(element, projectId) {
    const projects = {
      portfolio: {
        title: "Portfólio 4.0",
        description: "Site PWA com animações, temas e dashboard.",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=60"
      },
      academy: {
        title: "Aha! Academy",
        description: "Plataforma de cursos offline-first.",
        image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=60"
      }
    };

    const project = projects[projectId];

    element.innerHTML = `
      <a href="#/projetos" class="back-btn" data-link>← Voltar para Projetos</a>
      <div class="project-detail">
        <h2>${project.title}</h2>
        <p class="lead">${project.description}</p>
        
        <img class="project-hero" src="${project.image}" alt="${project.title}">
        
        <div class="card" style="padding:20px">
          <h3>Sobre o Projeto</h3>
          <p>Detalhes completos sobre o projeto ${project.title}...</p>
        </div>
      </div>
    `;
  }

  loadArticleDetail(element, articleId) {
    element.innerHTML = `
      <a href="#/blog" class="back-btn" data-link>← Voltar para Blog</a>
      <div class="article-content">
        <h2>Guia Completo: Como criar um PWA do zero</h2>
        <div class="article-meta">
          <span>Publicado em: 15 de Março, 2024</span>
          <span>•</span>
          <span>15 min de leitura</span>
        </div>
        
        <div class="article-body">
          <p>Conteúdo completo do artigo...</p>
        </div>
      </div>
    `;
  }
}

// Initialize router when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.router = new Router();
});