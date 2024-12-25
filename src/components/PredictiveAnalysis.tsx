import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function PredictiveAnalysis() {
  const predictedVulnerabilities = [
    { name: 'SQL Injection', probability: 75 },
    { name: 'Cross-Site Scripting (XSS)', probability: 60 },
    { name: 'Insecure Direct Object References', probability: 45 },
    { name: 'Security Misconfiguration', probability: 30 },
  ]

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Predictive Vulnerability Analysis</h2>
      <p className="text-muted-foreground">
        Based on your code patterns and development practices, here are the potential vulnerabilities you might encounter:
      </p>
      <div className="space-y-4">
        {predictedVulnerabilities.map((vuln, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{vuln.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <Progress value={vuln.probability} className="flex-grow" />
                <span className="font-semibold">{vuln.probability}%</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

