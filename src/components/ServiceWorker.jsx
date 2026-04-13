import React, { useEffect } from 'react'

const ServiceWorker = () => {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').then(registration => {
        console.log('ServiceWorker registered: ', registration)
      }).catch(error => {
        console.log('ServiceWorker registration failed: ', error)
      })
    }
  }, [])

  return null
}

export default ServiceWorker