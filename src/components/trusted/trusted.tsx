'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'

interface Card {
  title: string
  desc: string
  img: string
}

const cards: Card[] = [
  {
    title: "AI Lead Qualification Assistant",
    desc: "Understands what buyers are looking for and helps you focus only on serious customers.",
    img: "https://res.cloudinary.com/djipgt6vc/image/upload/v1775477233/lead-generation-active-robo_mu4ybt.png",
  },
  {
    title: "Smart Property Matching",
    desc: "Quickly shows the best property options based on each buyer’s needs.",
    img: "https://res.cloudinary.com/djipgt6vc/image/upload/v1775479263/property-robo_vtrnqk.png",
  },
  {
    title: "Lead Capture Assistant",
    desc: "Collects new leads automatically from your website, WhatsApp, ads, and property pages.",
    img: "https://res.cloudinary.com/djipgt6vc/image/upload/v1775558338/lead_generation_active_kk7zvz.png",
  },
  {
    title: "Content Creation Assistant",
    desc: "Creates attractive property listings, ads, and marketing content for you in seconds.",
    img: "https://res.cloudinary.com/djipgt6vc/image/upload/v1775477196/AI-Content-creations-robo_radj9b.png",
  },
  {
    title: "Follow-Up Assistant",
    desc: "Reminds and follows up with your leads at the right time so you don’t miss any opportunity.",
    img: "/assets/brockerdashai.png",
  },
  {
    title: "AI Calling Assistant",
    desc: "Automatically calls new leads and collects their requirements for you.",
    img: "/assets/img-5.png",
  },
  {
    title: "Campaign Automation",
    desc: "Sends WhatsApp, email, and SMS campaigns to your leads without manual work.",
    img: "/assets/leadai.png",
  },
  {
    title: "Property Data Assistant",
    desc: "Gathers property details from different sources and keeps your listings updated.",
    img: "/assets/brockerdashai.png",
  },
  {
    title: "Social Media Assistant",
    desc: "Handles your social media posts and helps you grow your online presence.",
    img: "https://res.cloudinary.com/djipgt6vc/image/upload/v1775477177/marketing-automation-robo_rhqsqs.png",
  },
  {
    title: "SEO Content Assistant",
    desc: "Creates content that helps your website rank higher and attract more buyers.",
    img: "/assets/leadai.png",
  },
]

const duplicatedCards = [...cards, ...cards, ...cards, ...cards]

export default function Trusted(): React.JSX.Element {
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [isPaused, setIsPaused] = useState<boolean>(false)
  const [isInteracting, setIsInteracting] = useState<boolean>(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const autoScrollInterval = useRef<ReturnType<typeof setInterval> | null>(null)
  const resumeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const checkMobile = (): void => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Mobile: Auto-scroll using interval (works alongside native scroll)
  useEffect(() => {
    if (!isMobile) return

    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    if (!isPaused && !isInteracting) {
      autoScrollInterval.current = setInterval(() => {
        if (scrollContainer) {
          scrollContainer.scrollLeft += 1
          
          const maxScroll = scrollContainer.scrollWidth / 2
          if (scrollContainer.scrollLeft >= maxScroll) {
            scrollContainer.scrollLeft = 0
          }
        }
      }, 16)
    }

    return () => {
      if (autoScrollInterval.current) {
        clearInterval(autoScrollInterval.current)
      }
    }
  }, [isMobile, isPaused, isInteracting])

  const handleTouchStart = useCallback((): void => {
    setIsInteracting(true)
    if (autoScrollInterval.current) {
      clearInterval(autoScrollInterval.current)
      autoScrollInterval.current = null
    }
    if (resumeTimeout.current) {
      clearTimeout(resumeTimeout.current)
    }
  }, [])

  const handleTouchEnd = useCallback((): void => {
    if (resumeTimeout.current) {
      clearTimeout(resumeTimeout.current)
    }
    resumeTimeout.current = setTimeout(() => {
      setIsInteracting(false)
    }, 1500)
  }, [])

  const handleScroll = useCallback((): void => {
    if (isInteracting) return

    setIsInteracting(true)
    if (autoScrollInterval.current) {
      clearInterval(autoScrollInterval.current)
      autoScrollInterval.current = null
    }

    if (resumeTimeout.current) {
      clearTimeout(resumeTimeout.current)
    }
    resumeTimeout.current = setTimeout(() => {
      setIsInteracting(false)
    }, 2000)
  }, [isInteracting])

  const handleMouseEnter = useCallback((): void => setIsPaused(true), [])
  const handleMouseLeave = useCallback((): void => setIsPaused(false), [])

  return (
    <section className="py-12 sm:py-16 lg:py-20 border-y border-[var(--border-light)] bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--color-primary-600)] uppercase tracking-wider mb-3">
           Your AI Team for Real Estate
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-tertiary)] max-w-2xl mx-auto">
           All the tools you need to manage leads, connect with buyers, and grow your real estate business — in one simple platform.
          </p>
        </motion.div>

        {/* Desktop: CSS Auto-scroll Marquee */}
        <div 
          className="hidden md:block relative pt-5 overflow-hidden"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="absolute left-0 top-0 bottom-0 w-20 lg:w-32 bg-gradient-to-r from-[var(--bg-primary)] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 lg:w-32 bg-gradient-to-l from-[var(--bg-primary)] to-transparent z-10 pointer-events-none" />

          <div className={`flex gap-5 lg:gap-6 ${isPaused ? '' : 'animate-marquee'}`}>
            {duplicatedCards.map((card, i) => (
              <motion.div
                key={`desktop-${i}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (i % cards.length) * 0.05 }}
                className="flex-shrink-0 w-[280px] lg:w-[320px] group"
              >
                <div className="bg-[var(--color-secondary-100)] border border-[var(--color-glass-border)] rounded-2xl overflow-hidden hover:border-[var(--color-primary-500)] hover:shadow-lg hover:shadow-[var(--color-primary-500)]/10 transition-all duration-300 hover:-translate-y-1 h-full">
                  <div className="relative w-full p-3">
                    <div className="relative w-full h-[180px] lg:h-[200px] rounded-xl overflow-hidden bg-gradient-to-br from-[var(--color-primary-100)] to-[var(--color-secondary-200)]">
                      <img
                        src={card.img}
                        alt={card.title}
                        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>

                  <div className="px-4 lg:px-5 pb-4 lg:pb-5">
                    <h3 className="text-base lg:text-lg font-semibold text-[var(--color-primary-600)] mb-2 line-clamp-1">
                      {card.title}
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-2">
                      {card.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile: Auto-scroll + Manual scroll (BOTH WORK) */}
        <div className="md:hidden relative">
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[var(--bg-primary)] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[var(--bg-primary)] to-transparent z-10 pointer-events-none" />

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
            }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onScroll={handleScroll}
          >
            {duplicatedCards.map((card, i) => (
              <motion.div
                key={`mobile-${i}`}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.3, delay: (i % cards.length) * 0.03 }}
                className="flex-shrink-0 w-[260px] snap-center"
              >
                <div className="bg-[var(--color-secondary-100)] border border-[var(--color-glass-border)] rounded-2xl overflow-hidden active:scale-[0.98] transition-transform duration-200">
                  <div className="w-full p-3">
                    <div className="w-full h-[160px] rounded-xl overflow-hidden bg-gradient-to-br from-[var(--color-primary-100)] to-[var(--color-secondary-200)]">
                      <img
                        src={card.img}
                        alt={card.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  <div className="px-4 pb-4">
                    <h3 className="text-sm font-semibold text-[var(--color-primary-600)] mb-1.5 truncate">
                      {card.title}
                    </h3>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-3">
                      {card.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center gap-1.5 mt-4">
            {cards.slice(0, 5).map((_, i) => (
              <div 
                key={i} 
                className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary-400)]/30"
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}