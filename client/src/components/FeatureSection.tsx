"use client"

import type React from "react"
import { motion } from "framer-motion"
import { useRef } from "react"
import { FeatureCard } from "./FeatureCard"

interface FeatureSectionProps {
  featureCards: {
    icon: React.ReactNode
    title: string
    content: string
    expandedContent: string
    examples: string[]
  }[]
}

export function FeatureSection({ featureCards }: FeatureSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section className="w-full py-16 sm:py-24 overflow-hidden">
      <div className="container px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={containerRef}
          className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {featureCards.map((card, i) => (
            <motion.div
              key={card.title}
              className="snap-center shrink-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <FeatureCard {...card} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

