// src/data/defaultData.js

// Фото по умолчанию
export const defaultPhotos = [
  {
    id: '1',
    title: 'Горная безмятежность',
    description: 'Захват утреннего света в Альпах',
    category: 'nature',
    tags: ['горы', 'рассвет', 'пейзаж'],
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    thumbnailUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    title: 'Свадебная элегантность',
    description: 'Интимный момент молодоженов',
    category: 'wedding',
    tags: ['свадьба', 'любовь', 'романтика'],
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
    thumbnailUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400',
    createdAt: '2024-01-10'
  },
  {
    id: '3',
    title: 'Городской портрет',
    description: 'Стрит-фотография в центре города',
    category: 'portrait',
    tags: ['портрет', 'город', 'улица'],
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800',
    thumbnailUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
    createdAt: '2024-01-05'
  },
  {
    id: '4',
    title: 'Лесные грёзы',
    description: 'Таинственная атмосфера леса',
    category: 'nature',
    tags: ['лес', 'мистика', 'зелень'],
    imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800',
    thumbnailUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400',
    createdAt: '2024-01-01'
  },
  {
    id: '5',
    title: 'Пляжная свадьба',
    description: 'Церемония на закате у океана',
    category: 'wedding',
    tags: ['пляж', 'закат', 'свадьба'],
    imageUrl: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800',
    thumbnailUrl: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400',
    createdAt: '2023-12-28'
  },
  {
    id: '6',
    title: 'Художественный портрет',
    description: 'Креативный студийный свет',
    category: 'portrait',
    tags: ['студия', 'арт', 'портрет'],
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
    thumbnailUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    createdAt: '2023-12-20'
  }
]

// Посты блога по умолчанию
export const defaultBlogPosts = [
  {
    id: '1',
    title: 'Искусство свадебной фотографии',
    slug: 'iskusstvo-svadebnoi-fotografii',
    excerpt: 'Как запечатлеть искренние моменты в самый важный день...',
    content: '<p>Свадебная фотография — это искусство рассказывать истории. У каждой пары своя уникальная история любви, и наша задача — запечатлеть её искренне.</p><p>От волнения перед церемонией до радостных слёз во время тостов — эти моменты важны.</p><h2>Советы для естественных свадебных фото</h2><ul><li>Познакомьтесь с парой заранее</li><li>Используйте естественный свет</li><li>Снимайте искренние моменты, а не только постановочные кадры</li></ul>',
    featuredImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
    published: true,
    views: 234,
    createdAt: '2024-01-15',
    comments: [
      { id: 'c1', authorName: 'Анна', content: 'Прекрасная статья! Очень полезные советы.', createdAt: '2024-01-16' }
    ]
  },
  {
    id: '2',
    title: 'Мастерство работы с естественным светом',
    slug: 'masterstvo-estestvennogo-sveta',
    excerpt: 'Понимание того, как работать с доступным освещением для потрясающих портретов...',
    content: '<p>Естественный свет — самый красивый и лестный источник освещения для фотографии. Вот как им овладеть.</p><p>Золотой час — сразу после восхода или перед закатом — даёт тёплый направленный свет, создающий глубину и объём.</p>',
    featuredImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    published: true,
    views: 156,
    createdAt: '2024-01-10',
    comments: []
  }
]

// Услуги по умолчанию (ЭКСПОРТ defaultServices)
export const defaultServices = [
  {
    id: '1',
    name: 'Свадебная фотография',
    price: 3500,
    description: 'Полное сопровождение свадебного дня с цифровой галереей',
    features: ['10 часов съёмки', '500+ обработанных фото', 'Онлайн-галерея', 'Права на печать', 'Love story сессия'],
    isActive: true
  },
  {
    id: '2',
    name: 'Портретная сессия',
    price: 500,
    description: 'Персональная, семейная или имиджевая съёмка',
    features: ['2 часа съёмки', '50+ обработанных фото', 'Онлайн-галерея', 'Права на печать', 'Выбор локации'],
    isActive: true
  },
  {
    id: '3',
    name: 'Коммерческая съёмка',
    price: 1500,
    description: 'Предметная, интерьерная или корпоративная фотография',
    features: ['4 часа съёмки', '100+ обработанных фото', 'Коммерческая лицензия', 'Быстрая обработка', 'Реквизит включён'],
    isActive: true
  }
]

// Сообщения по умолчанию
export const defaultMessages = []

// Изображение об авторе
export const aboutImage = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400'
