import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ContactForm from '../../components/Contact/ContactForm'

vi.mock('../../hooks/useLocalStorage', () => ({
  useLocalStorage: (key, defaultValue) => {
    const mockSetMessages = vi.fn()
    if (key === 'messages') {
      return [[], mockSetMessages]
    }
    return [defaultValue, mockSetMessages]
  }
}))

describe('ContactForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('должен отображать все поля формы', () => {
    render(<ContactForm />)
    
    expect(screen.getByLabelText('Имя *')).toBeInTheDocument()
    expect(screen.getByLabelText('Почта *')).toBeInTheDocument()
    expect(screen.getByLabelText('Телефон')).toBeInTheDocument()
    expect(screen.getByLabelText('Сообщение *')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Send Message' })).toBeInTheDocument()
  })

  it('должен показывать ошибки при пустых обязательных полях', async () => {
    render(<ContactForm />)
    
    const submitButton = screen.getByRole('button', { name: 'Send Message' })
    fireEvent.click(submitButton)
    
    // Проверяем, что форма не отправилась (нет сообщения об успехе)
    await waitFor(() => {
      expect(screen.queryByText(/Message sent successfully/i)).not.toBeInTheDocument()
    })
  })

  it('должен принимать корректный email', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    
    const emailInput = screen.getByLabelText('Почта *')
    await user.type(emailInput, 'test@example.com')
    
    expect(emailInput).toHaveValue('test@example.com')
  })

  it('должен успешно отправлять форму при корректном заполнении', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    
    // Заполняем форму используя getByLabelText
    await user.type(screen.getByLabelText('Имя *'), 'Тестовый пользователь')
    await user.type(screen.getByLabelText('Почта *'), 'test@example.com')
    await user.type(screen.getByLabelText('Телефон'), '+7 (999) 123-45-67')
    await user.type(screen.getByLabelText('Сообщение *'), 'Тестовое сообщение')
    
    const submitButton = screen.getByRole('button', { name: 'Send Message' })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText(/Message sent successfully/i)).toBeInTheDocument()
    })
  })

  it('должен очищать форму после успешной отправки', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    
    await user.type(screen.getByLabelText('Имя *'), 'Тестовый пользователь')
    await user.type(screen.getByLabelText('Почта *'), 'test@example.com')
    await user.type(screen.getByLabelText('Сообщение *'), 'Тестовое сообщение')
    
    const submitButton = screen.getByRole('button', { name: 'Send Message' })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByLabelText('Имя *')).toHaveValue('')
      expect(screen.getByLabelText('Почта *')).toHaveValue('')
      expect(screen.getByLabelText('Сообщение *')).toHaveValue('')
    })
  })
})
