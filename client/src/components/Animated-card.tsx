"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

interface AnimatedCardProps {
  icon: React.ReactNode
  title: string
  content: string
  expandedContent: string
  delay?: number
}

export function AnimatedCard({ icon, title, content, expandedContent, delay = 0 }: AnimatedCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
    >
      <Card
        className="group relative h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10"
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        <CardContent className="flex h-full flex-col items-center p-6 text-center">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="mb-6 rounded-lg bg-gradient-to-br from-purple-100 to-purple-50 p-3 text-purple-600 shadow-lg transition-shadow duration-300 group-hover:shadow-purple-500/20"
          >
            {icon}
          </motion.div>
          <h3 className="mb-3 text-xl font-semibold tracking-tight">{title}</h3>
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={isExpanded ? "expanded" : "collapsed"}
              initial="collapsed"
              animate="expanded"
              exit="collapsed"
              variants={{
                expanded: { height: "auto", opacity: 1 },
                collapsed: { height: 0, opacity: 0 },
              }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-muted-foreground">{isExpanded ? expandedContent : content}</p>
            </motion.div>
          </AnimatePresence>
          <motion.div
            className="mt-auto pt-6"
            animate={{ rotate: isExpanded ? 90 : 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <ArrowRight className="h-5 w-5 text-purple-600" />
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

