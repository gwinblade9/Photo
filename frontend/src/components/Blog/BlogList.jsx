import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { defaultBlogPosts } from '../../data/defaultData'

const BlogList = () => {
  const [posts] = useLocalStorage('blogPosts', defaultBlogPosts)
  const publishedPosts = posts.filter(p => p.published)

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (publishedPosts.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
В блоге пока нет публикаций. Заходите снова — скоро что‑нибудь появится!      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {publishedPosts.map((post) => (
        <Link key={post.id} to={`/blog/${post.slug}`} className="group">
          <article className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg card-hover">
            {post.featuredImage && (
              <img 
                src={post.featuredImage} 
                alt={post.title}
                className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-105"
              />
            )}
            <div className="p-6">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{formatDate(post.createdAt)}</p>
              <h2 className="text-xl font-light mb-3 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition">
                {post.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 line-clamp-3">{post.excerpt}</p>
              <div className="mt-4 text-sm font-medium uppercase tracking-wider flex items-center gap-2">
                  Подробнее                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </article>
        </Link>
      ))}
    </div>
  )
}

export default BlogList