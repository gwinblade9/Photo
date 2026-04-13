import React from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { defaultBlogPosts } from '../data/defaultData'
import CommentSection from '../components/Blog/CommentSection'
import BlogPost from '../components/Blog/BlogPost'



const SinglePostPage = () => {
  const { slug } = useParams()
  const [posts] = useLocalStorage('blogPosts', defaultBlogPosts)
  const post = posts.find(p => p.slug === slug && p.published)
  const SinglePostPage = () => {
  return <BlogPost />
}

  if (!post) {
    return <Navigate to="/404" />
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="container-custom py-16">
      <article className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-light mb-4">{post.title}</h1>
        <div className="flex justify-between items-center text-gray-500 dark:text-gray-400 mb-8">
          <span>{formatDate(post.createdAt)}</span>
          <span>{post.views} Просмотры</span>
        </div>
        
        {post.featuredImage && (
          <img 
            src={post.featuredImage} 
            alt={post.title}
            className="w-full rounded-xl shadow-lg mb-8"
          />
        )}
        
        <div 
          className="prose dark:prose-invert max-w-none prose-lg"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        
        <CommentSection postId={post.id} initialComments={post.comments || []} />
      </article>
    </div>
  )
}

export default SinglePostPage