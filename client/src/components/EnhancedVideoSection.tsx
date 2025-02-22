"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Shield, Lock, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export const EnhancedVideoSection: React.FC = () => {
  return (
    <div className="w-full py-16 sm:py-24 bg-gray-900/50 relative z-10">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Shield className="w-4 h-4" />
              <span className="text-sm font-medium">Product Demo</span>
            </div>

            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl bg-gradient-to-r from-emerald-400 to-gray-500 bg-clip-text text-transparent">
              Experience Advanced Security in Action
            </h2>

            <p className="text-gray-400 text-lg">
              Watch how CodeShield transforms your security workflow with real-time threat detection, AI-powered
              analysis, and automated response capabilities.
            </p>

            <div className="space-y-4">
              {["Intelligent vulnerability scanning", "Automated security testing", "Real-time threat monitoring"].map(
                (feature) => (
                  <div key={feature} className="flex items-center gap-2 text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ),
              )}
            </div>

            <div className="pt-4">
              <Button variant="outline" className="border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/20">
                Experience Now
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative aspect-video rounded-lg overflow-hidden shadow-lg border border-gray-800/50"
          >
            <iframe
              src="https://www.youtube.com/embed/FJRo0cwV6LY"
              title="CodeShield Demo Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            ></iframe>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

