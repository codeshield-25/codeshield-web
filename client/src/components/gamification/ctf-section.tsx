"use client"

import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trophy, Calendar, Flag, Users, Timer, ArrowRight, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"
import type { CTFEvent } from "../../../types/gamification"

const mockCTFEvents: CTFEvent[] = [
  {
    id: "1",
    title: "Capture The Flag 1",
    description: "This is the first CTF event.",
    startDate: new Date(),
    endDate: new Date(),
    points: 100,
    status: "Active",
  },
  {
    id: "2",
    title: "Capture The Flag 2",
    description: "This is the second CTF event.",
    startDate: new Date(),
    endDate: new Date(),
    points: 200,
    status: "Upcoming",
  },
  {
    id: "3",
    title: "Capture The Flag 3",
    description: "This is the third CTF event.",
    startDate: new Date(),
    endDate: new Date(),
    points: 300,
    status: "Completed",
  },
]

export function CTFSection() {
  const [registeredEvents, setRegisteredEvents] = useState<string[]>([])

  const handleRegister = (eventId: string) => {
    setRegisteredEvents((prev) => [...prev, eventId])
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card-hover-effect">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardHeader>
              <CardTitle className="text-lg">Active Competitions</CardTitle>
              <p className="text-3xl font-bold text-blue-600">2</p>
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
              <CardTitle className="text-lg">Your Total Points</CardTitle>
              <p className="text-3xl font-bold text-green-600">1,250</p>
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
              <CardTitle className="text-lg">Global Rank</CardTitle>
              <p className="text-3xl font-bold text-purple-600">#42</p>
            </CardHeader>
          </Card>
        </motion.div>
      </div>

      <ScrollArea className="h-[600px] rounded-md border">
        {mockCTFEvents.map((event) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card-hover-effect mb-4"
          >
            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-yellow-500" />
                    <CardTitle>{event.title}</CardTitle>
                  </div>
                  <Badge
                    variant={
                      event.status === "Active" ? "default" : event.status === "Upcoming" ? "secondary" : "outline"
                    }
                    className={event.status === "Active" ? "animate-pulse" : ""}
                  >
                    {event.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <p className="text-sm text-muted-foreground">{event.description}</p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {event.startDate.toLocaleDateString()} - {event.endDate.toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Flag className="h-4 w-4 text-yellow-500" />
                      <span>{event.points} points</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-blue-500" />
                      <span>24 participants</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Timer className="h-4 w-4 text-green-500" />
                      <span>2 hours</span>
                    </div>
                  </div>

                  <div className="flex gap-2 justify-end">
                    {registeredEvents.includes(event.id) ? (
                      <>
                        <Badge variant="default" className="flex items-center gap-1">
                          <CheckCircle className="h-3 w-3" />
                          Registered
                        </Badge>
                        {event.status === "Active" && (
                          <Button>
                            Start Challenge
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        )}
                      </>
                    ) : (
                      <Button
                        variant="outline"
                        onClick={() => handleRegister(event.id)}
                        disabled={event.status === "Completed"}
                      >
                        Register Now
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </ScrollArea>
    </div>
  )
}

