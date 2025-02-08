import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function SecurityDebtTracker() {
  const data = [
    { name: 'Jan', debt: 400 },
    { name: 'Feb', debt: 300 },
    { name: 'Mar', debt: 550 },
    { name: 'Apr', debt: 450 },
    { name: 'May', debt: 600 },
    { name: 'Jun', debt: 400 },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Security Debt Tracker</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="debt" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Current Security Debt: 400 points</h3>
          <p className="text-sm text-muted-foreground">
            Security debt represents the accumulation of unaddressed vulnerabilities and technical shortcomings in your system's security posture.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

