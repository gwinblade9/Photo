import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import FilterBar from '../../components/Gallery/FilterBar'

describe('FilterBar', () => {
  const mockOnCategoryChange = vi.fn()

  beforeEach(() => {
    mockOnCategoryChange.mockClear()
  })

  it('должен отображать все кнопки категорий', () => {
    render(<FilterBar activeCategory="all" onCategoryChange={mockOnCategoryChange} />)
    
    expect(screen.getByText('Все работы')).toBeInTheDocument()
    expect(screen.getByText('Свадьбы')).toBeInTheDocument()
    expect(screen.getByText('Портреты')).toBeInTheDocument()
    expect(screen.getByText('Природа')).toBeInTheDocument()
  })

  it('должен подсвечивать активную категорию', () => {
    render(<FilterBar activeCategory="wedding" onCategoryChange={mockOnCategoryChange} />)
    
    const weddingButton = screen.getByText('Свадьбы')
    expect(weddingButton).toHaveClass('bg-black')
    
    const natureButton = screen.getByText('Природа')
    expect(natureButton).not.toHaveClass('bg-black')
  })

  it('должен вызывать onCategoryChange при клике на кнопку', () => {
    render(<FilterBar activeCategory="all" onCategoryChange={mockOnCategoryChange} />)
    
    const weddingButton = screen.getByText('Свадьбы')
    fireEvent.click(weddingButton)
    
    expect(mockOnCategoryChange).toHaveBeenCalledWith('wedding')
    expect(mockOnCategoryChange).toHaveBeenCalledTimes(1)
  })

  it('должен корректно обрабатывать клик по каждой категории', () => {
    render(<FilterBar activeCategory="all" onCategoryChange={mockOnCategoryChange} />)
    
    const categories = ['wedding', 'portrait', 'nature']
    const buttons = [screen.getByText('Свадьбы'), screen.getByText('Портреты'), screen.getByText('Природа')]
    
    buttons.forEach((button, index) => {
      fireEvent.click(button)
      expect(mockOnCategoryChange).toHaveBeenCalledWith(categories[index])
    })
    
    expect(mockOnCategoryChange).toHaveBeenCalledTimes(3)
  })
})