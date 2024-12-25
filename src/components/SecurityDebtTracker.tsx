import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const securityDebtData = [
  { month: 'Jan', debt: 20 },
  { month: 'Feb', debt: 35 },
  { month: 'Mar', debt: 25 },
  { month: 'Apr', debt: 40 },
  { month: 'May', debt: 30 },
  { month: 'Jun', debt: 45 },
]

export default function SecurityDebtTracker() {
  const currentDebt = 45
  const maxAcceptableDebt = 50

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Security Debt Tracker</h2>
      <Card>
        <CardHeader>
          <CardTitle>Current Security Debt</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Current Debt</span>
              <span>{currentDebt} points</span>
            </div>
            <Progress value={(currentDebt / maxAcceptableDebt) * 100} />
            <div className="text-sm text-muted-foreground">
              Max acceptable debt: {maxAcceptableDebt} points
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Security Debt Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={securityDebtData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="debt" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

