// src/utils/smoothScroll.js

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

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

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
