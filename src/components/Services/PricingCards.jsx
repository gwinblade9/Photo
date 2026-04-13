import React from 'react'
import { Link } from 'react-router-dom'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { defaultServices } from '../../data/defaultData'
import { motion } from 'framer-motion'

const PricingCards = () => {
  const [services] = useLocalStorage('services', defaultServices)
  const activeServices = services.filter(s => s.isActive)

  return (
    <div className="grid md:grid-cols-3 gap-8">
      {activeServices.map((service, index) => (
        <motion.div 
          key={service.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden card-hover"
        >
          <div className="p-8">
            <h3 className="text-2xl font-light mb-2">{service.name}</h3>
            <p className="text-4xl font-bold mb-4">₽{service.price}</p>
            <p className="text-gray-600 dark:text-gray-400 mb-6">{service.description}</p>
            <ul className="space-y-3 mb-8">
              {service.features.map((feature, idx) => (
                <li key={idx} className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            <Link
              to="/contact"
              className="block text-center px-6 py-3 border-2 border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 rounded-lg"
            >
              Получить консультацию
            </Link>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default PricingCards