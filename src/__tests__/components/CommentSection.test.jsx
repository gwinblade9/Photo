import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CommentSection from '../../components/Blog/CommentSection'

describe('CommentSection', () => {
  const mockComments = [
    { 
      id: '1', 
      authorName: 'Анна', 
      content: 'Отличная статья!', 
      createdAt: '2024-01-15T10:00:00Z' 
    },
    { 
      id: '2', 
      authorName: 'Пётр', 
      content: 'Очень полезно, спасибо!', 
      createdAt: '2024-01-14T15:30:00Z' 
    }
  ]

  it('должен отображать существующие комментарии', () => {
    render(<CommentSection postId="test-post" initialComments={mockComments} />)
    
    expect(screen.getByText('Анна')).toBeInTheDocument()
    expect(screen.getByText('Отличная статья!')).toBeInTheDocument()
    expect(screen.getByText('Пётр')).toBeInTheDocument()
    expect(screen.getByText('Очень полезно, спасибо!')).toBeInTheDocument()
  })

  it('должен показывать правильное количество комментариев', () => {
    render(<CommentSection postId="test-post" initialComments={mockComments} />)
    
    expect(screen.getByText(/Комментарии \(2\)/)).toBeInTheDocument()
  })

  it('должен позволять добавлять новый комментарий', async () => {
    const user = userEvent.setup()
    render(<CommentSection postId="test-post" initialComments={[]} />)
    
    const nameInput = screen.getByPlaceholderText('Your Name *')
    const commentInput = screen.getByPlaceholderText('Your Comment *')
    const submitButton = screen.getByText('Post Comment')
    
    await user.type(nameInput, 'Тестовый пользователь')
    await user.type(commentInput, 'Это тестовый комментарий')
    
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('Тестовый пользователь')).toBeInTheDocument()
      expect(screen.getByText('Это тестовый комментарий')).toBeInTheDocument()
    })
  })

  it('должен показывать форму для комментария', () => {
    render(<CommentSection postId="test-post" initialComments={[]} />)
    
    expect(screen.getByPlaceholderText('Your Name *')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Your Comment *')).toBeInTheDocument()
    expect(screen.getByText('Post Comment')).toBeInTheDocument()
  })
})