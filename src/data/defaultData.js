export const defaultPhotos = [
  {
    id: '1',
    title: 'Mountain Serenity',
    description: 'Capturing the peaceful morning light in the Alps',
    category: 'nature',
    tags: ['mountains', 'sunrise', 'landscape'],
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    thumbnailUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    title: 'Wedding Elegance',
    description: 'Intimate moment between newlyweds',
    category: 'wedding',
    tags: ['wedding', 'love', 'romance'],
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
    thumbnailUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400',
    createdAt: '2024-01-10'
  },
  {
    id: '3',
    title: 'Urban Portrait',
    description: 'Street photography in downtown',
    category: 'portrait',
    tags: ['portrait', 'urban', 'street'],
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800',
    thumbnailUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
    createdAt: '2024-01-05'
  },
  {
    id: '4',
    title: 'Forest Dreams',
    description: 'Mystical forest atmosphere',
    category: 'nature',
    tags: ['forest', 'mystical', 'green'],
    imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800',
    thumbnailUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400',
    createdAt: '2024-01-01'
  },
  {
    id: '5',
    title: 'Beach Wedding',
    description: 'Sunset ceremony by the ocean',
    category: 'wedding',
    tags: ['beach', 'sunset', 'wedding'],
    imageUrl: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800',
    thumbnailUrl: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400',
    createdAt: '2023-12-28'
  },
  {
    id: '6',
    title: 'Artistic Portrait',
    description: 'Creative studio lighting',
    category: 'portrait',
    tags: ['studio', 'artistic', 'portrait'],
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
    thumbnailUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    createdAt: '2023-12-20'
  }
]

export const defaultBlogPosts = [
  {
    id: '1',
    title: 'The Art of Wedding Photography',
    slug: 'art-of-wedding-photography',
    excerpt: 'Learn how to capture authentic moments on the biggest day of their lives...',
    content: '<p>Wedding photography is about telling a story. Every couple has a unique love story, and it\'s our job to capture it authentically.</p><p>From the nervous excitement before the ceremony to the joyful tears during the speeches, these moments matter.</p><h2>Tips for natural wedding photos</h2><ul><li>Build rapport with the couple beforehand</li><li>Use natural light whenever possible</li><li>Capture candid moments, not just posed shots</li></ul>',
    featuredImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
    published: true,
    views: 234,
    createdAt: '2024-01-15',
    comments: [
      { id: 'c1', authorName: 'Sarah Johnson', content: 'Beautiful article! Very helpful tips.', createdAt: '2024-01-16' }
    ]
  },
  {
    id: '2',
    title: 'Mastering Natural Light',
    slug: 'mastering-natural-light',
    excerpt: 'Understanding how to work with available light for stunning portraits...',
    content: '<p>Natural light is the most beautiful and flattering light source for photography. Here\'s how to master it.</p><p>The golden hour — just after sunrise or before sunset — provides warm, directional light that creates depth and dimension.</p>',
    featuredImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    published: true,
    views: 156,
    createdAt: '2024-01-10',
    comments: []
  }
]

export const defaultServices = [
  {
    id: '1',
    name: 'Wedding Photography',
    price: 3500,
    description: 'Full-day coverage with digital gallery and print rights',
    features: ['10 hours coverage', '500+ edited photos', 'Online gallery', 'Print rights', 'Engagement session'],
    isActive: true
  },
  {
    id: '2',
    name: 'Portrait Session',
    price: 500,
    description: 'Personal branding, family, or individual portraits',
    features: ['2 hours session', '50+ edited photos', 'Online gallery', 'Print rights', 'Location choice'],
    isActive: true
  },
  {
    id: '3',
    name: 'Commercial',
    price: 1500,
    description: 'Product, real estate, or corporate photography',
    features: ['4 hours coverage', '100+ edited photos', 'Commercial license', 'Fast delivery', 'Props included'],
    isActive: true
  }
]

export const defaultMessages = []