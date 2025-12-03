// components.js - Componentes reutilizáveis para o portfólio

/**
 * Componente de card de projeto
 * @param {Object} project - Dados do projeto
 * @param {string} project.title - Título do projeto
 * @param {string} project.description - Descrição do projeto
 * @param {string} project.image - URL da imagem
 * @param {Array} project.tags - Array de tags
 * @param {string} project.id - ID do projeto (para roteamento)
 * @returns {string} HTML do card
 */
export function createProjectCard(project) {
  const tagsHTML = project.tags.map(tag => 
    `<span class="card-tag">${tag}</span>`
  ).join('');

  return `
    <div class="card" data-project="${project.id}">
      <img class="card-img" src="${project.image}" alt="${project.title}">
      <h4>${project.title}</h4>
      <p class="lead-strong">${project.description}</p>
      <div class="card-tags">
        ${tagsHTML}
      </div>
    </div>
  `;
}

/**
 * Componente de card de serviço
 * @param {Object} service - Dados do serviço
 * @param {string} service.title - Título do serviço
 * @param {string} service.description - Descrição do serviço
 * @param {string} service.image - URL da imagem
 * @param {Array} service.tags - Array de tags
 * @param {string} service.id - ID do serviço
 * @returns {string} HTML do card
 */
export function createServiceCard(service) {
  const tagsHTML = service.tags.map(tag => 
    `<span class="card-tag">${tag}</span>`
  ).join('');

  return `
    <div class="card" data-service="${service.id}">
      <img class="card-img" src="${service.image}" alt="${service.title}">
      <h4>${service.title}</hh4>
      <p class="lead-strong">${service.description}</p>
      <div class="card-tags">
        ${tagsHTML}
      </div>
    </div>
  `;
}

/**
 * Componente de card de artigo
 * @param {Object} article - Dados do artigo
 * @param {string} article.title - Título do artigo
 * @param {string} article.excerpt - Trecho do artigo
 * @param {string} article.image - URL da imagem
 * @param {Array} article.tags - Array de tags
 * @param {string} article.id - ID do artigo
 * @param {string} article.readTime - Tempo de leitura
 * @returns {string} HTML do card
 */
export function createArticleCard(article) {
  const tagsHTML = article.tags.map(tag => 
    `<span class="card-tag">${tag}</span>`
  ).join('');

  return `
    <div class="card" data-article="${article.id}">
      <img class="card-img" src="${article.image}" alt="${article.title}">
      <h4>${article.title}</h4>
      <p class="lead-strong">${article.excerpt}</p>
      <div class="card-tags">
        ${tagsHTML}
      </div>
      <div style="margin-top:10px;font-size:14px;color:var(--muted)">
        ${article.readTime}
      </div>
    </div>
  `;
}

/**
 * Componente de estatística
 * @param {Object} stat - Dados da estatística
 * @param {string|number} stat.value - Valor da estatística
 * @param {string} stat.label - Rótulo da estatística
 * @returns {string} HTML do componente
 */
export function createStatItem(stat) {
  return `
    <div class="stat-item">
      <div class="stat-value">${stat.value}</div>
      <div class="stat-label">${stat.label}</div>
    </div>
  `;
}

/**
 * Componente de depoimento
 * @param {Object} testimonial - Dados do depoimento
 * @param {string} testimonial.content - Conteúdo do depoimento
 * @param {string} testimonial.author - Nome do autor
 * @param {string} testimonial.role - Cargo/função do autor
 * @param {string} testimonial.avatar - URL do avatar
 * @returns {string} HTML do depoimento
 */
export function createTestimonial(testimonial) {
  return `
    <div class="testimonial-item">
      <div class="testimonial-content">
        ${testimonial.content}
      </div>
      <div class="testimonial-author">
        <img class="testimonial-avatar" src="${testimonial.avatar}" alt="${testimonial.author}">
        <div class="testimonial-info">
          <h4>${testimonial.author}</h4>
          <p>${testimonial.role}</p>
        </div>
      </div>
    </div>
  `;
}

/**
 * Componente de item de habilidade
 * @param {Object} skill - Dados da habilidade
 * @param {string} skill.name - Nome da habilidade
 * @param {string} skill.description - Descrição da habilidade
 * @param {number} skill.level - Nível (0-100)
 * @param {string} skill.icon - Ícone (emoji ou código)
 * @returns {string} HTML da habilidade
 */
export function createSkillItem(skill) {
  return `
    <div class="skill-item">
      <div class="skill-icon">${skill.icon}</div>
      <h4>${skill.name}</h4>
      <p class="lead">${skill.description}</p>
      <div class="skill-bar">
        <div class="skill-progress" style="width:${skill.level}%"></div>
      </div>
    </div>
  `;
}

/**
 * Componente de item de linha do tempo
 * @param {Object} item - Dados do item da linha do tempo
 * @param {string} item.date - Data
 * @param {string} item.title - Título
 * @param {string} item.description - Descrição
 * @param {string} item.company - Empresa/Organização
 * @returns {string} HTML do item
 */
export function createTimelineItem(item) {
  return `
    <div class="timeline-item">
      <div class="timeline-marker"></div>
      <div class="timeline-content">
        <div class="timeline-date">${item.date}</div>
        <h4>${item.title}</h4>
        <p>${item.description}</p>
        ${item.company ? `<div class="lead-strong">${item.company}</div>` : ''}
      </div>
    </div>
  `;
}

/**
 * Componente de botão
 * @param {Object} options - Opções do botão
 * @param {string} options.text - Texto do botão
 * @param {string} options.href - Link (opcional)
 * @param {string} options.type - Tipo (primary, ghost, etc.)
 * @param {string} options.icon - Ícone (opcional)
 * @param {Function} options.onClick - Função de clique (opcional)
 * @param {boolean} options.fullWidth - Largura total
 * @returns {string} HTML do botão
 */
export function createButton(options) {
  const typeClass = options.type ? ` btn-${options.type}` : '';
  const fullWidthClass = options.fullWidth ? ' style="width:100%"' : '';
  const iconHTML = options.icon ? `<span>${options.icon}</span> ` : '';
  
  if (options.href) {
    return `
      <a href="${options.href}" class="btn${typeClass}"${fullWidthClass}>
        ${iconHTML}${options.text}
      </a>
    `;
  }
  
  return `
    <button class="btn${typeClass}"${fullWidthClass}>
      ${iconHTML}${options.text}
    </button>
  `;
}

/**
 * Componente de formulário de contato
 * @returns {string} HTML do formulário
 */
export function createContactForm() {
  return `
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
  `;
}

/**
 * Componente de cabeçalho de seção
 * @param {Object} options - Opções do cabeçalho
 * @param {string} options.title - Título da seção
 * @param {string} options.subtitle - Subtítulo
 * @param {boolean} options.center - Centralizar texto
 * @returns {string} HTML do cabeçalho
 */
export function createSectionHeader(options) {
  const centerClass = options.center ? ' style="text-align:center"' : '';
  
  return `
    <div class="section-header"${centerClass}>
      <h2>${options.title}</h2>
      ${options.subtitle ? `<p class="lead">${options.subtitle}</p>` : ''}
    </div>
  `;
}

/**
 * Componente de modal
 * @param {Object} options - Opções do modal
 * @param {string} options.id - ID do modal
 * @param {string} options.title - Título do modal
 * @param {string} options.content - Conteúdo HTML
 * @param {boolean} options.showClose - Mostrar botão de fechar
 * @returns {string} HTML do modal
 */
export function createModal(options) {
  return `
    <div class="modal-overlay" id="${options.id}Overlay" style="display:none">
      <div class="modal">
        <div class="modal-header">
          <h3>${options.title}</h3>
          ${options.showClose ? `<button class="modal-close" onclick="closeModal('${options.id}')">×</button>` : ''}
        </div>
        <div class="modal-content">
          ${options.content}
        </div>
      </div>
    </div>
  `;
}

/**
 * Função para abrir modal
 * @param {string} modalId - ID do modal
 */
export function openModal(modalId) {
  const overlay = document.getElementById(`${modalId}Overlay`);
  if (overlay) {
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
}

/**
 * Função para fechar modal
 * @param {string} modalId - ID do modal
 */
export function closeModal(modalId) {
  const overlay = document.getElementById(`${modalId}Overlay`);
  if (overlay) {
    overlay.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
}

/**
 * Componente de notificação (toast)
 * @param {Object} options - Opções da notificação
 * @param {string} options.message - Mensagem
 * @param {string} options.type - Tipo (success, error, warning, info)
 * @param {number} options.duration - Duração em ms
 */
export function showToast(options) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  
  toast.textContent = options.message;
  toast.className = `toast ${options.type || 'success'}`;
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, options.duration || 4000);
}

/**
 * Componente de carrossel
 * @param {Array} items - Itens do carrossel
 * @param {string} items[].title - Título do item
 * @param {string} items[].description - Descrição
 * @param {string} items[].image - URL da imagem
 * @param {string} items[].id - ID do item
 * @returns {string} HTML do carrossel
 */
export function createCarousel(items) {
  const itemsHTML = items.map((item, index) => `
    <div class="carousel-item" data-tilt data-project="${item.id}" ${index === 0 ? 'data-active="true"' : ''}>
      <h4>${item.title}</h4>
      <p class="lead-strong">${item.description}</p>
      <img class="case-media" src="${item.image}" alt="${item.title}">
    </div>
  `).join('');
  
  const indicatorsHTML = items.map((_, index) => `
    <div class="carousel-indicator" data-index="${index}" ${index === 0 ? 'class="active"' : ''}></div>
  `).join('');
  
  return `
    <div class="carousel card" id="carousel">
      <div class="carousel-track" id="track">
        ${itemsHTML}
      </div>
      <div class="carousel-controls">
        <button class="btn prev-btn" id="cprev">◀</button>
        <div class="carousel-indicators" id="indicators">
          ${indicatorsHTML}
        </div>
        <button class="btn next-btn" id="cnext">▶</button>
      </div>
    </div>
  `;
}

/**
 * Componente de grid de informações de contato
 * @returns {string} HTML do grid
 */
export function createContactGrid() {
  return `
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
}

/**
 * Componente de hero section
 * @param {Object} options - Opções do hero
 * @param {string} options.title - Título principal
 * @param {string} options.subtitle - Subtítulo
 * @param {string} options.avatar - URL do avatar
 * @param {string} options.ctaText - Texto do botão CTA
 * @param {string} options.ctaLink - Link do botão CTA
 * @param {string} options.secondaryText - Texto do botão secundário
 * @param {string} options.secondaryLink - Link do botão secundário
 * @returns {string} HTML do hero
 */
export function createHero(options) {
  return `
    <div class="hero card" data-tilt>
      <img class="avatar" src="${options.avatar}" alt="Márcio Maker">
      <h2 class="title">${options.title}</h2>
      <p class="lead">${options.subtitle}</p>
      <div style="text-align:center;margin-top:16px">
        <a href="${options.ctaLink}" class="btn" data-link>${options.ctaText}</a>
        ${options.secondaryText ? `<a href="${options.secondaryLink}" class="btn ghost" data-link style="margin-left:8px">${options.secondaryText}</a>` : ''}
      </div>
    </div>
  `;
}

/**
 * Inicializa todos os componentes após o carregamento da página
 */
export function initComponents() {
  // Inicializa tooltips
  initTooltips();
  
  // Inicializa modais
  initModals();
  
  // Inicializa forms
  initForms();
  
  console.log('✅ Componentes inicializados');
}

/**
 * Inicializa tooltips
 */
function initTooltips() {
  const tooltips = document.querySelectorAll('[data-tooltip]');
  tooltips.forEach(el => {
    el.addEventListener('mouseenter', (e) => {
      const tooltip = document.createElement('div');
      tooltip.className = 'tooltip';
      tooltip.textContent = e.target.dataset.tooltip;
      document.body.appendChild(tooltip);
      
      const rect = e.target.getBoundingClientRect();
      tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`;
      tooltip.style.top = `${rect.top - tooltip.offsetHeight - 5}px`;
      
      e.target._tooltip = tooltip;
    });
    
    el.addEventListener('mouseleave', (e) => {
      if (e.target._tooltip) {
        e.target._tooltip.remove();
        delete e.target._tooltip;
      }
    });
  });
}

/**
 * Inicializa modais
 */
function initModals() {
  // Fechar modal ao clicar fora
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      e.target.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });
  
  // Fechar modal com ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const openModal = document.querySelector('.modal-overlay[style*="display: flex"]');
      if (openModal) {
        openModal.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    }
  });
}

/**
 * Inicializa forms
 */
function initForms() {
  // Validação de formulários
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      const requiredFields = form.querySelectorAll('[required]');
      let isValid = true;
      
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.style.borderColor = 'var(--error)';
        } else {
          field.style.borderColor = '';
        }
      });
      
      if (!isValid) {
        e.preventDefault();
        showToast({
          message: 'Por favor, preencha todos os campos obrigatórios.',
          type: 'error'
        });
      }
    });
  });
}

/**
 * Função para criar dados de exemplo
 */
export const sampleData = {
  projects: [
    {
      id: 'portfolio',
      title: 'Portfólio 4.0',
      description: 'Site PWA com animações, temas e dashboard.',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=60',
      tags: ['PWA', 'GSAP', 'Dashboard']
    },
    {
      id: 'academy',
      title: 'Aha! Academy',
      description: 'Plataforma de cursos offline-first.',
      image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=900&q=60',
      tags: ['PWA', 'Offline', 'Education']
    },
    {
      id: 'social',
      title: 'Social PWA',
      description: 'Feed com cache inteligente.',
      image: 'https://images.unsplash.com/photo-1505238680356-667803448bb6?auto=format&fit=crop&w=900&q=60',
      tags: ['PWA', 'Social', 'Cache']
    },
    {
      id: 'creator',
      title: 'Creator Studio',
      description: 'Ferramentas de criação com IA.',
      image: 'https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=900&q=60',
      tags: ['IA', 'Tools', 'Creator']
    }
  ],
  
  services: [
    {
      id: 'pwa',
      title: 'PWA Completo',
      description: 'Aplicações web que funcionam como apps nativos.',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=60',
      tags: ['Instalável', 'Offline', 'Rápido']
    },
    {
      id: 'ia',
      title: 'IA & Automação',
      description: 'Chatbots, prompts e fluxos inteligentes.',
      image: 'https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=900&q=60',
      tags: ['IA', 'Automação', 'Chatbots']
    }
  ],
  
  articles: [
    {
      id: 'pwa-guide',
      title: 'Guia Completo: Como criar um PWA do zero',
      excerpt: 'Checklist e exemplos práticos para desenvolver Progressive Web Apps.',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=60',
      tags: ['PWA', 'Tutorial', 'Guia'],
      readTime: '15 min de leitura'
    }
  ],
  
  stats: [
    { value: '50+', label: 'Projetos Entregues' },
    { value: '8+', label: 'Anos de Experiência' },
    { value: '95%', label: 'Satisfação do Cliente' },
    { value: '24/7', label: 'Suporte' }
  ],
  
  testimonials: [
    {
      content: 'O Márcio transformou completamente nossa presença digital. O PWA que ele desenvolveu aumentou nossas conversões em 40% e reduziu a taxa de rejeição drasticamente.',
      author: 'Maria Silva',
      role: 'CEO, TechSolutions',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=100&q=60'
    },
    {
      content: 'Trabalhar com o Márcio foi uma experiência incrível. Sua expertise em IA nos ajudou a automatizar processos que economizam horas de trabalho manual toda semana.',
      author: 'João Santos',
      role: 'CTO, InovaTech',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=60'
    }
  ],
  
  skills: [
    {
      name: 'PWA',
      description: 'Apps instaláveis e offline',
      level: 95,
      icon: '⚡'
    },
    {
      name: 'IA & Machine Learning',
      description: 'Integração e automação',
      level: 85,
      icon: '🤖'
    },
    {
      name: 'UI/UX Design',
      description: 'Design focado em conversão',
      level: 90,
      icon: '🎨'
    },
    {
      name: 'Performance',
      description: 'Otimização e velocidade',
      level: 92,
      icon: '🚀'
    }
  ]
};

// Exporta funções para uso global
window.components = {
  createProjectCard,
  createServiceCard,
  createArticleCard,
  createStatItem,
  createTestimonial,
  createSkillItem,
  createTimelineItem,
  createButton,
  createContactForm,
  createSectionHeader,
  createModal,
  openModal,
  closeModal,
  showToast,
  createCarousel,
  createContactGrid,
  createHero,
  initComponents,
  sampleData
};

// Inicializa componentes quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  // Inicializa componentes se estiverem em uso
  if (typeof initComponents === 'function') {
    setTimeout(initComponents, 500);
  }
});