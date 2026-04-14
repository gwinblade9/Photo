// src/utils/translations.js

export const categoryTranslations = {
  'all': 'Все работы',
  'wedding': 'Свадьбы',
  'portrait': 'Портреты',
  'nature': 'Природа',
  'street': 'Улица',
  'general': 'Общее'
}

export const translateCategory = (category) => {
  return categoryTranslations[category] || category
}

// Для обратного перевода (из русского в английский для фильтрации)
export const reverseCategory = {
  'Все работы': 'all',
  'Свадьбы': 'wedding',
  'Портреты': 'portrait',
  'Природа': 'nature',
  'Улица': 'street',
  'Общее': 'general'
}