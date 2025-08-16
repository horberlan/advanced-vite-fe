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
