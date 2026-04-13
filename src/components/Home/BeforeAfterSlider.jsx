import React, { useState, useRef, useCallback } from 'react'

const BeforeAfterSlider = () => {
  const [sliderPosition, setSliderPosition] = useState(50)
  const containerRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    let x = clientX - rect.left
    x = Math.max(0, Math.min(x, rect.width))
    const percentage = (x / rect.width) * 100
    setSliderPosition(percentage)
  }, [])

  const handleMouseDown = (e) => {
    setIsDragging(true)
    handleMove(e.clientX)
  }

  const handleTouchStart = (e) => {
    setIsDragging(true)
    handleMove(e.touches[0].clientX)
  }

  React.useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) handleMove(e.clientX)
    }
    const handleTouchMove = (e) => {
      if (isDragging) handleMove(e.touches[0].clientX)
    }
    const handleStop = () => setIsDragging(false)

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleStop)
      window.addEventListener('touchmove', handleTouchMove)
      window.addEventListener('touchend', handleStop)
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleStop)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleStop)
    }
  }, [isDragging, handleMove])

  const afterImage = "https://profotovideo.ru/images/2015/september/18-portrait/portraitretouch01.jpg"
  const beforeImage = "https://profotovideo.ru/images/2015/september/18-portrait/portraitretouch05.jpg"

  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-light mb-4">До и После</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
Посмотрите на результат преображения — профессиональная ретушь, которая раскрывает лучшие качества каждого изображения.
          </p>
        </div>

        <div 
          ref={containerRef}
          className="relative max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl select-none"
          style={{ aspectRatio: '4/3' }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          <img 
            src={afterImage}
            alt="After"
            className="absolute top-0 left-0 w-full h-full object-cover"
            draggable={false}
          />
          
          <div 
            className="absolute top-0 left-0 h-full overflow-hidden"
            style={{ width: `${sliderPosition}%` }}
          >
            <img 
              src={beforeImage}
              alt="Before"
              className="absolute top-0 left-0 w-full h-full object-cover"
              draggable={false}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
          
          <div 
            className="absolute top-0 bottom-0 w-1 bg-white shadow-xl z-10"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center cursor-ew-resize hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7l-5 5 5 5M16 7l5 5-5 5" />
              </svg>
            </div>
          </div>
          
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs z-10">
            {Math.round(sliderPosition)}%
          </div>
        </div>
        
        <p className="text-center text-sm text-gray-500 mt-6">
          ← Сдвиньте ползунок в нужную сторону, чтобы сравнить →
        </p>
      </div>
    </section>
  )
}

export default BeforeAfterSlider