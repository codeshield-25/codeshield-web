import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Trophy, Shield, Target } from 'lucide-react'

export default function SecurityGameification() {
  const securityScore = 75
  const vulnerabilitiesFixed = 23
  const streakDays = 7

  const badges = [
    { name: 'Vulnerability Hunter', icon: <Target className="w-6 h-6" /> },
    { name: 'Code Guardian', icon: <Shield className="w-6 h-6" /> },
    { name: 'Security Champion', icon: <Trophy className="w-6 h-6" /> },
  ]

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Security Gamification</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Security Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-center mb-2">{securityScore}%</div>
            <Progress value={securityScore} className="w-full" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Vulnerabilities Fixed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-center">{vulnerabilitiesFixed}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Secure Coding Streak</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-center">{streakDays} days</div>
          </CardContent>
        </Card>
      </div>
      
      <h3 className="text-xl font-semibold mt-6 mb-4">Earned Badges</h3>
      <div className="flex space-x-4">
        {badges.map((badge, index) => (
          <Badge key={index} variant="outline" className="p-2 flex items-center space-x-2">
            {badge.icon}
            <span>{badge.name}</span>
          </Badge>
        ))}
      </div>
    </div>
  )
}

