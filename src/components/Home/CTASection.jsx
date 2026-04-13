import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { scrollToTop } from '../../utils/smoothScroll'

const CTASection = () => {
  const handleContactClick = () => {

    if (window.location.pathname === '/') {
      const contactSection = document.querySelector('.contact-section')
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
      } else {
        window.location.href = '/contact'
      }
    }
  }

  return (
    <section className="py-20 bg-black text-white">
      <div className="container-custom text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-light mb-6"
        >
          Готовы запечатлеть вашу историю?
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-gray-300 mb-8 max-w-2xl mx-auto"
        >
          Давайте создадим что-то прекрасное вместе. Свадьба, портретная съёмка или особое событие — я с радостью воплощу ваше видение.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Link
            to="/contact"
            onClick={handleContactClick}
            className="inline-block px-8 py-3 border-2 border-white hover:bg-white hover:text-black transition-all duration-300 text-sm uppercase tracking-wider"
          >
            Связаться со мной
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default CTASection