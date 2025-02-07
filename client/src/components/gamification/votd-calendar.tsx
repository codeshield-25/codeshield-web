"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday } from "date-fns"
import { cn } from "@/lib/utils"

interface VOTDCalendarProps {
  onSelectDate: (date: Date) => void
  completedDates: Date[]
}

export function VOTDCalendar({ onSelectDate, completedDates }: VOTDCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [isLoading, setIsLoading] = useState(false)

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd })

  const previousMonth = () => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1))
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold">{format(currentMonth, "MMMM yyyy")}</CardTitle>
        <div className="flex gap-1">
          <Button variant="outline" size="icon" onClick={previousMonth} className="h-8 w-8">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={nextMonth} className="h-8 w-8">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1 text-center text-sm">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="py-2 font-semibold">
              {day}
            </div>
          ))}
          {days.map((day) => {
            const isCompleted = completedDates.some((date) => isSameDay(date, day))
            const isCurrentDay = isToday(day)

            return (
              <Button
                key={day.toString()}
                variant="outline"
                className={cn(
                  "h-12 w-full rounded-lg border calendar-day",
                  isCompleted && "completed",
                  isCurrentDay && "ring-2 ring-primary",
                  !isSameMonth(day, currentMonth) && "opacity-50",
                )}
                onClick={() => {
                  onSelectDate(day)
                }}
              >
                <span className="text-sm">{format(day, "d")}</span>
              </Button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

