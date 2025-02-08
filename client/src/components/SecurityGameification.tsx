import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function SecurityGameification() {
  const securityScore = 75
  const badges = [
    { name: 'Vulnerability Hunter', achieved: true },
    { name: 'Code Guardian', achieved: true },
    { name: 'Security Champion', achieved: false },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Security Gamification</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Security Score</h3>
          <Progress value={securityScore} className="w-full" />
          <p className="text-sm text-muted-foreground mt-1">{securityScore}/100</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Badges</h3>
          <ul className="space-y-2">
            {badges.map((badge, index) => (
              <li key={index} className={`flex items-center ${badge.achieved ? 'text-green-600' : 'text-gray-400'}`}>
                {badge.achieved ? '✅' : '❌'} {badge.name}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

