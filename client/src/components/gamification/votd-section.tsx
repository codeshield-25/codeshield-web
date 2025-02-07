"use client"

import { useState, useEffect } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Clock, Award, BookOpen, CheckCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { VOTDCalendar } from "./votd-calendar"
import { votdService } from "../../services/votd-service"
import type { VOTD } from "../../../types/gamification"

export function VOTDSection() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [currentVOTD, setCurrentVOTD] = useState<VOTD | null>(null)
  const [completedDates, setCompletedDates] = useState<Date[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchVOTD = async () => {
      setIsLoading(true)
      try {
        
        const formatedDate = new Date(selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000)
          .toISOString()
          .split("T")[0];
        const votd = await votdService.getVOTDByDate(formatedDate);
        setCurrentVOTD(votd)
      } catch (error) {
        console.error("Error fetching VOTD:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchVOTD()
  }, [selectedDate])

  const handleMarkAsRead = async () => {
    if (!currentVOTD) return

    try {
      await votdService.markVOTDAsRead(currentVOTD.id)
      setCompletedDates((prev) => [...prev, selectedDate])
      // Update current VOTD status
      setCurrentVOTD((prev) => (prev ? { ...prev, isCompleted: true } : null))
    } catch (error) {
      console.error("Error marking VOTD as read:", error)
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card-hover-effect">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardHeader>
                <CardTitle className="text-lg">Streak</CardTitle>
                <p className="text-3xl font-bold text-blue-600">5 days</p>
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
                <CardTitle className="text-lg">Points Today</CardTitle>
                <p className="text-3xl font-bold text-green-600">100</p>
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
                <CardTitle className="text-lg">Total Points</CardTitle>
                <p className="text-3xl font-bold text-purple-600">1,250</p>
              </CardHeader>
            </Card>
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          {currentVOTD && (
            <motion.div
              key={currentVOTD.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="card-hover-effect"
            >
              <Card className="border-2">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertTriangle
                        className={`h-5 w-5 ${
                          currentVOTD.severity === "High"
                            ? "text-red-500"
                            : currentVOTD.severity === "Medium"
                              ? "text-yellow-500"
                              : "text-blue-500"
                        }`}
                      />
                      <CardTitle>{currentVOTD.title}</CardTitle>
                    </div>
                    <Badge
                      variant={currentVOTD.severity === "High" ? "destructive" : "default"}
                      className="animate"
                    >
                      {currentVOTD.severity} Severity
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{currentVOTD.description}</p>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{currentVOTD.readTime} min read</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-yellow-500" />
                        <span>{currentVOTD.points} points</span>
                      </div>
                    </div>
                    {currentVOTD.isCompleted ? (
                      <Badge variant="default" className="flex items-center gap-1">
                        <CheckCircle className="h-3 w-3" />
                        Completed
                      </Badge>
                    ) : null}
                  </div>

                  <div className="flex gap-2">
                    <Button
                      className="flex-1"
                      onClick={() => {
                        /* Open article */
                      }}
                    >
                      <BookOpen className="mr-2 h-4 w-4" />
                      Read Article
                    </Button>
                    {!currentVOTD.isCompleted && (
                      <Button variant="outline" onClick={handleMarkAsRead}>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Mark as Read
                      </Button>
                    )}
                  </div>

                  {currentVOTD.isCompleted ? <Progress value={100} className="h-2" /> : null}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="space-y-4">
        <VOTDCalendar onSelectDate={setSelectedDate} completedDates={completedDates} />

        <Card>
          <CardHeader>
            <CardTitle>Previous VOTDs</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              {/* List of previous VOTDs */}
              {completedDates.map((date) => (
                <Button
                  key={date.toISOString()}
                  variant="ghost"
                  className="w-full justify-start text-left"
                  onClick={() => setSelectedDate(date)}
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>{date.toLocaleDateString()}</span>
                  </div>
                </Button>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

