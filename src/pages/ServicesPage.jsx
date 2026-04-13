import React from 'react'
import PricingCards from '../components/Services/PricingCards'

const ServicesPage = () => {
  return (
    <div className="container-custom py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-light mb-4">Услуги и стоимость</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Выбирайте пакет, который подходит именно вам! Каждый из них можно подстроить под ваши личные пожелания — сделаем так, как нужно именно вам.

        </p>
      </div>
      <PricingCards />
    </div>
  )
}

export default ServicesPage