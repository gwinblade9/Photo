import React from 'react'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import PricingCards from '../../components/Services/PricingCards'

// Мок useLocalStorage с реальными данными
vi.mock('../../hooks/useLocalStorage', () => ({
  useLocalStorage: (key, defaultValue) => {
    if (key === 'services') {
      const mockServices = [
        {
          id: '1',
          name: 'Свадебная фотография',
          price: 3500,
          description: 'Полное сопровождение свадебного дня с цифровой галереей',
          features: ['10 часов съёмки', '500+ обработанных фото', 'Онлайн-галерея'],
          isActive: true
        },
        {
          id: '2',
          name: 'Портретная сессия',
          price: 500,
          description: 'Персональная, семейная или имиджевая съёмка',
          features: ['2 часа съёмки', '50+ обработанных фото', 'Онлайн-галерея'],
          isActive: true
        },
        {
          id: '3',
          name: 'Коммерческая съёмка',
          price: 1500,
          description: 'Предметная, интерьерная или корпоративная фотография',
          features: ['4 часа съёмки', '100+ обработанных фото', 'Коммерческая лицензия'],
          isActive: true
        }
      ]
      return [mockServices, vi.fn()]
    }
    return [defaultValue, vi.fn()]
  }
}))

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('PricingCards', () => {
  it('должен отображать все активные услуги', () => {
    renderWithRouter(<PricingCards />)
    
    expect(screen.getByText('Свадебная фотография')).toBeInTheDocument()
    expect(screen.getByText('Портретная сессия')).toBeInTheDocument()
    expect(screen.getByText('Коммерческая съёмка')).toBeInTheDocument()
  })

  it('должен отображать правильные цены', () => {
    renderWithRouter(<PricingCards />)
    
    expect(screen.getByText('3 500 ₽')).toBeInTheDocument()
    expect(screen.getByText('500 ₽')).toBeInTheDocument()
    expect(screen.getByText('1 500 ₽')).toBeInTheDocument()
  })

  it('должен отображать описание каждой услуги', () => {
    renderWithRouter(<PricingCards />)
    
    expect(screen.getByText('Полное сопровождение свадебного дня с цифровой галереей')).toBeInTheDocument()
    expect(screen.getByText('Персональная, семейная или имиджевая съёмка')).toBeInTheDocument()
    expect(screen.getByText('Предметная, интерьерная или корпоративная фотография')).toBeInTheDocument()
  })

  it('должен отображать особенности (features) для каждой услуги', () => {
    renderWithRouter(<PricingCards />)
    
    // Уникальные элементы
    expect(screen.getByText('10 часов съёмки')).toBeInTheDocument()
    expect(screen.getByText('500+ обработанных фото')).toBeInTheDocument()
    expect(screen.getByText('2 часа съёмки')).toBeInTheDocument()
    expect(screen.getByText('50+ обработанных фото')).toBeInTheDocument()
    expect(screen.getByText('4 часа съёмки')).toBeInTheDocument()
    expect(screen.getByText('100+ обработанных фото')).toBeInTheDocument()
    expect(screen.getByText('Коммерческая лицензия')).toBeInTheDocument()
    
    // Для повторяющихся элементов используем getAllByText
    const onlineGalleries = screen.getAllByText('Онлайн-галерея')
    expect(onlineGalleries).toHaveLength(2) // В свадебной и портретной
  })

  it('должна быть кнопка "Узнать подробнее" для каждой услуги', () => {
    renderWithRouter(<PricingCards />)
    
    const buttons = screen.getAllByText('Узнать подробнее')
    expect(buttons).toHaveLength(3)
  })
})