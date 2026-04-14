import React from 'react'
import { useParams, Navigate, Link } from 'react-router-dom'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { defaultBlogPosts } from '../../data/defaultData'
import CommentSection from './CommentSection'
import { motion } from 'framer-motion'

const BlogPost = () => {
  const { slug } = useParams()
  const [posts] = useLocalStorage('blogPosts', defaultBlogPosts)
  const post = posts.find(p => p.slug === slug && p.published)

  if (!post) {
    return <Navigate to="/blog" />
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <motion.article 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container-custom py-16 max-w-4xl mx-auto"
    >

      <Link 
        to="/blog" 
        className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white mb-8 transition"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Blog
      </Link>

  
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6 leading-tight">
        {post.title}
      </h1>
      
   
      <div className="flex flex-wrap items-center gap-4 text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700 pb-6 mb-8">
        <span className="flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {formatDate(post.createdAt)}
        </span>
        <span className="flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          {post.views || 0} views
        </span>
        {post.category && (
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l5 5a2 2 0 01.586 1.414V19a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2z" />
            </svg>
            {post.category}
          </span>
        )}
      </div>
      
  
      {post.featuredImage && (
        <div className="mb-10 rounded-xl overflow-hidden shadow-xl">
          <img 
            src={post.featuredImage} 
            alt={post.title}
            className="w-full h-auto object-cover"
          />
        </div>
      )}
      
  
      <div 
        className="prose prose-lg dark:prose-invert max-w-none
          prose-headings:font-light prose-headings:mt-8 prose-headings:mb-4
          prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
          prose-p:text-gray-700 dark:prose-p:text-gray-300
          prose-a:text-blue-600 dark:prose-a:text-blue-400
          prose-img:rounded-xl prose-img:shadow-lg
          prose-ul:list-disc prose-ul:pl-6
          prose-ol:list-decimal prose-ol:pl-6
          prose-li:my-2
          prose-blockquote:border-l-4 prose-blockquote:border-gray-300 prose-blockquote:pl-4 prose-blockquote:italic
          prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
          prose-pre:bg-gray-900 prose-pre:text-white prose-pre:p-4 prose-pre:rounded-xl
        "
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      

      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-10 pt-6 border-t border-gray-200 dark:border-gray-700">
          {post.tags.map((tag, idx) => (
            <span 
              key={idx}
              className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-sm rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
      
  
      <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700">
        <CommentSection postId={post.id} initialComments={post.comments || []} />
      </div>
    </motion.article>
  )
}

export default BlogPost