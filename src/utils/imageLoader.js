// src/utils/imageLoader.js

export const checkImageExists = (url) => {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve(true)
    img.onerror = () => resolve(false)
    img.src = url
  })
}

export const scanLocalImages = async (category) => {
  // Список известных изображений (можно расширять вручную)
  const knownImages = {
    wedding: [
      '/images/gallery/wedding/wedding-1.jpg',
      '/images/gallery/wedding/wedding-2.jpg',
      '/images/gallery/wedding/wedding-3.jpg'
    ],
    portrait: [
      '/images/gallery/portrait/portrait-1.jpg',
      '/images/gallery/portrait/portrait-2.jpg',
      '/images/gallery/portrait/portrait-3.jpg'
    ],
    nature: [
      '/images/gallery/nature/nature-1.jpg',
      '/images/gallery/nature/nature-2.jpg',
      '/images/gallery/nature/nature-3.jpg'
    ]
  }

  const images = knownImages[category] || []
  const existingImages = []
  
  for (const imgPath of images) {
    const exists = await checkImageExists(imgPath)
    if (exists) {
      existingImages.push(imgPath)
    }
  }
  
  return existingImages
}

export const createPhotoFromLocal = (imagePath, category, index) => {
  const fileName = imagePath.split('/').pop()
  const title = fileName.replace(/\.[^/.]+$/, '').replace(/-/g, ' ')
  
  return {
    id: `local_${category}_${index}`,
    title: title.charAt(0).toUpperCase() + title.slice(1),
    description: `Фотография из категории "${category}"`,
    category: category,
    tags: [category],
    imageUrl: imagePath,
    thumbnailUrl: imagePath,
    createdAt: new Date().toISOString()
  }
}
