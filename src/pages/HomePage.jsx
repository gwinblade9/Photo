import React from 'react'
import Hero from '../components/Home/Hero'
import FeaturedGrid from '../components/Home/FeaturedGrid'
import BeforeAfterSlider from '../components/Home/BeforeAfterSlider'
import CTASection from '../components/Home/CTASection'

const HomePage = () => {
  return (
    <>
      <Hero />
      <FeaturedGrid />
      <BeforeAfterSlider />
      <CTASection />
    </>
  )
}

export default HomePage