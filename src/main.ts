interface Product {
  name: string;
  subtitle: string;
  price: string;
  description: string;
  features: string[];
  images: { src: string; alt: string }[];
}

interface RatingMessages {
  [key: number]: { title: string; message: string };
}

const product: Product = {
  name: 'Smartphone Galaxy Pro',
  subtitle: 'Smartphone com câmera profissional',
  price: 'R$ 1.299,99',
  description: `
    Smartphone de última geração com processador octa-core, 128GB de armazenamento, 
    câmera tripla de 64MP, tela Super AMOLED de 6.5 polegadas, bateria de longa 
    duração e carregamento rápido. Ideal para fotografia e uso profissional.
  `,
  features: [
    'Processador octa-core',
    '128GB de armazenamento',
    'Câmera tripla de 64MP',
    'Tela Super AMOLED 6.5"',
    'Bateria de longa duração',
    'Carregamento rápido'
  ],
  images: [
    { src: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400', alt: 'Frontal' },
    { src: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400', alt: 'Câmera' },
    { src: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=400', alt: 'Design' }
  ]
};

const userRatings: number[] = [];
let currentRating = 0;
const ratingMessages: RatingMessages = {
  1: { title: 'Avaliação Recebida', message: 'Que pena que não gostou. Vamos melhorar.' },
  2: { title: 'Avaliação Recebida', message: 'Vamos melhorar nossos produtos.' },
  3: { title: 'Avaliação Recebida', message: 'Produto razoável, continuaremos aprimorando.' },
  4: { title: 'Avaliação Recebida', message: 'Que bom que gostou do produto!' },
  5: { title: 'Avaliação Recebida', message: 'Excelente escolha, ficamos felizes!' }
};

const createProductHTML = (prod: Product) => {
  const container = document.getElementById('product-root');
  if (!container) return;

  container.innerHTML = `
    <div class="product-header text-center">
      <h1><i class="fas fa-mobile-alt me-2"></i>Detalhes do Produto</h1>
      <p class="lead mb-0">Conheça todas as especificações e avalie este produto</p>
    </div>

    <div class="card product-card">
      <div class="card-body p-0">
        <div class="row g-0">
          <div class="col-lg-6">
            <div class="carousel-container m-3">
              <div id="productCarousel" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-indicators">
                  ${prod.images.map((_, idx) => `<button type="button" data-bs-target="#productCarousel"
                    data-bs-slide-to="${idx}" class="${idx === 0 ? 'active' : ''}"></button>`).join('')}
                </div>
                <div class="carousel-inner">
                  ${prod.images.map((img, idx) => `
                  <div class="carousel-item ${idx === 0 ? 'active' : ''}">
                    <img src="${img.src}" class="d-block w-100" alt="${prod.name} - ${img.alt}">
                  </div>
                  `).join('')}
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#productCarousel" data-bs-slide="prev">
                  <span class="carousel-control-prev-icon"></span>
                  <span class="visually-hidden">Anterior</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#productCarousel" data-bs-slide="next">
                  <span class="carousel-control-next-icon"></span>
                  <span class="visually-hidden">Próximo</span>
                </button>
              </div>
            </div>
          </div>

          <div class="col-lg-6">
            <div class="product-info">
              <h2 class="card-title mb-3">
                <i class="fas fa-star text-warning me-2"></i>${prod.name}
              </h2>
              <p class="text-muted mb-4">
                <i class="fas fa-tag me-2"></i>${prod.subtitle}
              </p>

              <div class="price-tag mb-4">
                <i class="fas fa-dollar-sign me-1"></i>${prod.price}
              </div>

              <h4 class="section-title mt-4 mb-3">
                <i class="fas fa-list me-2"></i>Especificações Principais
              </h4>
              <ul class="feature-list">
                ${prod.features.map(f => `<li><i class="fas fa-check-circle"></i> ${f}</li>`).join('')}
              </ul>
            </div>
          </div>
        </div>

        <div class="description-card mx-3 mb-3">
          <h4 class="section-title"><i class="fas fa-info-circle me-2"></i>Descrição Completa</h4>
          <p class="lead">${prod.description}</p>
        </div>

        <div class="star-rating-section mx-3 mb-3">
          <div class="row align-items-center">
            <div class="col-md-8">
              <h4 class="mb-3"><i class="fas fa-star me-2"></i>Avalie este Produto</h4>
              <p class="mb-3">Clique nas estrelas para dar sua avaliação:</p>
              <div class="star-container mb-3">
                ${[1, 2, 3, 4, 5].map(n => `<span class="star" data-value="${n}">&#9733;</span>`).join('')}
              </div>
            </div>
            <div class="col-md-4">
              <div class="rating-stats">
                <h3 id="average-rating">0.0</h3>
                <p class="mb-0">Média das Avaliações</p>
                <small id="total-reviews">(0 avaliações)</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
};

const updateStars = () => {
  document.querySelectorAll<HTMLElement>('.star').forEach((star, idx) => {
    star.classList.toggle('voted', idx < currentRating);
  });
};

const updateStats = () => {
  const averageEl = document.getElementById('average-rating');
  const totalEl = document.getElementById('total-reviews');
  if (!averageEl || !totalEl) return;

  const totalScore = userRatings.reduce((a, b) => a + b, 0);
  const avg = userRatings.length ? (totalScore / userRatings.length).toFixed(1) : '0.0';
  averageEl.textContent = avg;
  totalEl.textContent = `(${userRatings.length} avaliações)`;
};

const showFeedbackModal = (rating: number) => {
  const feedback = ratingMessages[rating] || { title: 'Avaliação Recebida', message: 'Obrigado pela avaliação!' };
  const modalLabel = document.getElementById('feedbackModalLabel');
  const modalBody = document.getElementById('feedbackModalBody');
  const ratingStars = document.getElementById('ratingStars');

  if (!modalLabel || !modalBody || !ratingStars) return;

  modalLabel.textContent = feedback.title;
  modalBody.textContent = feedback.message;
  ratingStars.textContent = '★'.repeat(rating);

  const modalEl = document.getElementById('feedbackModal');
  if (modalEl && (window as any).bootstrap) {
    new (window as any).bootstrap.Modal(modalEl).show();
  }
};

const handleStarClick = (event: Event) => {
  const value = Number((event.currentTarget as HTMLElement).dataset.value);
  if (!value) return;

  currentRating = value;
  userRatings.push(value);
  updateStars();
  updateStats();
  showFeedbackModal(value);
};

const handleStarHover = (event: Event) => {
  const value = Number((event.currentTarget as HTMLElement).dataset.value);
  document.querySelectorAll<HTMLElement>('.star').forEach(star => {
    const starValue = Number(star.dataset.value);
    star.classList.toggle('active', starValue <= value);
  });
};

const handleStarLeave = () => {
  document.querySelectorAll<HTMLElement>('.star').forEach(star => star.classList.remove('active'));
};

const initRatingSystem = () => {
  document.querySelectorAll<HTMLElement>('.star').forEach(star => {
    star.addEventListener('click', handleStarClick);
    star.addEventListener('mouseenter', handleStarHover);
    star.addEventListener('mouseleave', handleStarLeave);
  });
};

document.addEventListener('DOMContentLoaded', () => {
  createProductHTML(product);
  initRatingSystem();
});
