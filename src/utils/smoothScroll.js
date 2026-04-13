// src/utils/smoothScroll.js

/**
 * Плавная прокрутка к элементу
 * @param {string} elementId - ID элемента (без #)
 * @param {number} offset - Смещение от верхней части (для fixed header)
 */
export const smoothScrollTo = (elementId, offset = 80) => {
  const element = document.getElementById(elementId)
  if (!element) return
  
  const elementPosition = element.getBoundingClientRect().top
  const offsetPosition = elementPosition + window.pageYOffset - offset
  
  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  })
}

/**
 * Плавная прокрутка к верху страницы
 */
export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

/**
 * Плавная прокрутка к секции по селектору
 * @param {string} selector - CSS селектор (например, '#gallery', '.contact-form')
 * @param {number} offset - Смещение
 */
export const smoothScrollToSelector = (selector, offset = 80) => {
  const element = document.querySelector(selector)
  if (!element) return
  
  const elementPosition = element.getBoundingClientRect().top
  const offsetPosition = elementPosition + window.pageYOffset - offset
  
  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  })
}

/**
 * Обработчик для всех ссылок с data-smooth-scroll атрибутом
 */
export const initSmoothScroll = () => {
  const links = document.querySelectorAll('[data-smooth-scroll]')
  
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault()
      const target = link.getAttribute('href') || link.getAttribute('data-target')
      if (target && target !== '#') {
        const targetId = target.startsWith('#') ? target.slice(1) : target
        smoothScrollTo(targetId)
      }
    })
  })
}