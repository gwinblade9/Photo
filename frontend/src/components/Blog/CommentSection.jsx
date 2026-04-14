import React, { useState } from 'react'
import { useLocalStorage } from '../../hooks/useLocalStorage'

const CommentSection = ({ postId, initialComments = [] }) => {
  const [comments, setComments] = useLocalStorage(`comments_${postId}`, initialComments)
  const [formData, setFormData] = useState({ authorName: '', content: '' })
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.authorName.trim() || !formData.content.trim()) return
    
    setSubmitting(true)
    const newComment = {
      id: Date.now().toString(),
      authorName: formData.authorName,
      content: formData.content,
      createdAt: new Date().toISOString(),
      isApproved: true
    }
    setComments([newComment, ...comments])
    setFormData({ authorName: '', content: '' })
    setSubmitting(false)
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
      <h3 className="text-2xl font-light mb-6">Комментарии ({comments.length})</h3>
      
      <form onSubmit={handleSubmit} className="mb-10 space-y-4">
        <div>
          <input
            type="text"
            placeholder="Your Name *"
            value={formData.authorName}
            onChange={(e) => setFormData({...formData, authorName: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:outline-none bg-white dark:bg-gray-800"
            required
          />
        </div>
        <div>
          <textarea
            placeholder="Your Comment *"
            value={formData.content}
            onChange={(e) => setFormData({...formData, content: e.target.value})}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:outline-none bg-white dark:bg-gray-800"
            required
          />
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50 rounded-lg"
        >
          {submitting ? 'Posting...' : 'Post Comment'}
        </button>
      </form>
      
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="border-b border-gray-200 dark:border-gray-700 pb-5">
            <div className="flex justify-between items-start mb-2">
              <span className="font-medium">{comment.authorName}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {formatDate(comment.createdAt)}
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400">{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CommentSection