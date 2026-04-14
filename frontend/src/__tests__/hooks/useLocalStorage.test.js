import { renderHook, act } from '@testing-library/react'
import { useLocalStorage } from '../../hooks/useLocalStorage'

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear()
    localStorage.getItem.mockReset()
    localStorage.setItem.mockReset()
  })

  it('должен возвращать начальное значение, если localStorage пуст', () => {
    localStorage.getItem.mockReturnValue(null)
    
    const { result } = renderHook(() => useLocalStorage('test-key', 'начальное значение'))
    
    expect(result.current[0]).toBe('начальное значение')
  })

  it('должен возвращать сохранённое значение из localStorage', () => {
    localStorage.getItem.mockReturnValue(JSON.stringify('сохранённое значение'))
    
    const { result } = renderHook(() => useLocalStorage('test-key', 'начальное значение'))
    
    expect(result.current[0]).toBe('сохранённое значение')
  })

  it('должен обновлять localStorage при изменении значения', () => {
    localStorage.getItem.mockReturnValue(null)
    
    const { result } = renderHook(() => useLocalStorage('test-key', 'начальное значение'))
    
    act(() => {
      result.current[1]('новое значение')
    })
    
    expect(result.current[0]).toBe('новое значение')
    expect(localStorage.setItem).toHaveBeenCalledWith('test-key', JSON.stringify('новое значение'))
  })

  it('должен корректно работать с объектами', () => {
    const initialObject = { name: 'Тест', value: 123 }
    localStorage.getItem.mockReturnValue(null)
    
    const { result } = renderHook(() => useLocalStorage('test-key', initialObject))
    
    expect(result.current[0]).toEqual(initialObject)
    
    const newObject = { name: 'Обновлён', value: 456 }
    act(() => {
      result.current[1](newObject)
    })
    
    expect(result.current[0]).toEqual(newObject)
  })
})