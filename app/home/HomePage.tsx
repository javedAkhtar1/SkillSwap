import Navbar from '@/components/shared/Navbar'
import React from 'react'
import Hero from './_components/Hero'
import HowItWorks from './_components/HowItWorks'
import PopularSkills from './_components/PopularSkills'
import WhyUse from './_components/WhyUse'
import Faq from './_components/Faq'

export default function HomePage() {
  return (
    <>
    <Navbar />
    <Hero />
    <HowItWorks />
    <PopularSkills />
    <WhyUse />
    <Faq />
    </>
  )
}
