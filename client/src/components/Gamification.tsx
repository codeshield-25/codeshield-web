"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CTFSection } from "@/components/gamification/ctf-section"
import { VOTDSection } from "@/components/gamification/votd-section"
import { ResourcesSection } from "@/components/gamification/resources-section"
import { Flag, ShieldCheck, BookOpen } from "lucide-react"
import { motion } from "framer-motion"

export default function Gamification() {
  return (
    <div className="container mx-auto py-6 px-4 space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold">Gamification</h1>
        <p className="text-muted-foreground">Learn, compete, and earn points through various security challenges</p>
      </motion.div>

      <Tabs defaultValue="ctf" className="space-y-6">
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-4">
          <TabsList className="w-full max-w-[400px] mx-auto">
            <TabsTrigger value="ctf" className="flex-1 flex items-center gap-2">
              <Flag className="h-4 w-4" />
              CTF
            </TabsTrigger>
            <TabsTrigger value="votd" className="flex-1 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" />
              VOTD
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex-1 flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Resources
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="ctf">
          <CTFSection />
        </TabsContent>

        <TabsContent value="votd">
          <VOTDSection />
        </TabsContent>

        <TabsContent value="resources">
          <ResourcesSection />
        </TabsContent>
      </Tabs>
    </div>
  )
}

