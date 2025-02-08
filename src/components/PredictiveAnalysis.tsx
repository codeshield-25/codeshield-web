import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function PredictiveAnalysis() {
  const predictions = [
    { vulnerability: 'SQL Injection', probability: 75 },
    { vulnerability: 'Cross-Site Scripting (XSS)', probability: 60 },
    { vulnerability: 'Broken Authentication', probability: 45 },
    { vulnerability: 'Insecure Direct Object References', probability: 30 },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Predictive Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {predictions.map((prediction, index) => (
            <div key={index}>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">{prediction.vulnerability}</span>
                <span className="text-sm font-medium">{prediction.probability}%</span>
              </div>
              <Progress value={prediction.probability} className="w-full" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

