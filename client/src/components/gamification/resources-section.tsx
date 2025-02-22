import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Book, Video, PenToolIcon as Tool, ExternalLink } from "lucide-react"
import type { Resource } from "../../../types/gamification"
import { CardStats } from "@/components/gamification/card-stats" // Import CardStats
import { motion, AnimatePresence } from "framer-motion"

const mockResources: Resource[] = [
  {
    id: "1",
    title: "Web Security Fundamentals",
    type: "Article",
    description: "A comprehensive guide to web security basics",
    link: "https://example.com/web-security",
    category: "Web Security",
    difficulty: "Beginner",
  },
  {
    id: "2",
    title: "Penetration Testing Tools",
    type: "Video",
    description: "Learn about essential penetration testing tools",
    link: "https://example.com/pentest-tools",
    category: "Penetration Testing",
    difficulty: "Intermediate",
  },
  // Add more mock resources as needed
]

export function ResourcesSection() {
  const getIcon = (type: Resource["type"]) => {
    switch (type) {
      case "Article":
        return <Book className="h-5 w-5" />
      case "Video":
        return <Video className="h-5 w-5" />
      case "Tool":
        return <Tool className="h-5 w-5" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card-hover-effect">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardHeader>
                <CardTitle className="text-lg dark:text-black">Total Resources</CardTitle>
                <p className="text-3xl font-bold text-blue-600">150+</p>
              </CardHeader>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card-hover-effect"
          >
            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardHeader>
                <CardTitle className="text-lg dark:text-black">Categories</CardTitle>
                <p className="text-3xl font-bold text-green-600">12</p>
              </CardHeader>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card-hover-effect"
          >
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <CardHeader>
                <CardTitle className="text-lg dark:text-black">New This Week</CardTitle>
                <p className="text-3xl font-bold text-purple-600">5</p>
              </CardHeader>
            </Card>
          </motion.div>
        {/* <CardStats title="Total Resources" value="150+" className="bg-blue-50 dark:text-gray-600" />
        <CardStats title="Categories" value="12" className="bg-green-50 dark:text-gray-600" />
        <CardStats title="New This Week" value="5" className="bg-purple-50 dark:text-gray-600" /> */}
      </div>

      <ScrollArea className="h-[600px] rounded-xl border p-2">
        {mockResources.map((resource) => (
          <Card key={resource.id} className="mb-4">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getIcon(resource.type)}
                  <CardTitle>{resource.title}</CardTitle>
                </div>
                <Badge variant="outline">{resource.type}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <p className="text-sm text-muted-foreground">{resource.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <Badge variant="secondary">{resource.category}</Badge>
                    <Badge variant="outline">{resource.difficulty}</Badge>
                  </div>
                  <Button variant="outline" className="gap-2">
                    <ExternalLink className="h-4 w-4" />
                    Open Resource
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </ScrollArea>
    </div>
  )
}

