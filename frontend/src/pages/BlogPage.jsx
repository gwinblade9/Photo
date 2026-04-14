import React from 'react'
import BlogList from '../components/Blog/BlogList'

const BlogPage = () => {
  return (
    <div className="container-custom py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-light mb-4">Дневник</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          За кадром: истории и советы из моей фотопрактики.
        </p>
      </div>
      <BlogList />
    </div>
  )
}

export default BlogPage