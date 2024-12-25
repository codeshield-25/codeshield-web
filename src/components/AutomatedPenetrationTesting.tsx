import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, CheckCircle } from 'lucide-react'

export default function AutomatedPenetrationTesting() {
  const [isRunning, setIsRunning] = useState(false)
  const [progress, setProgress] = useState(0)
  const [results, setResults] = useState<{ name: string; status: 'passed' | 'failed' }[]>([])

  const runTest = () => {
    setIsRunning(true)
    setProgress(0)
    setResults([])

    const testSteps = [
      { name: 'SQL Injection Test', duration: 1000 },
      { name: 'Cross-Site Scripting (XSS) Test', duration: 1500 },
      { name: 'CSRF Protection Test', duration: 1200 },
      { name: 'Authentication Bypass Test', duration: 1800 },
      { name: 'File Upload Vulnerability Test', duration: 1300 },
    ]

    let currentProgress = 0
    testSteps.forEach((step, index) => {
      setTimeout(() => {
        currentProgress += 20
        setProgress(currentProgress)
        setResults(prev => [
          ...prev,
          { name: step.name, status: Math.random() > 0.3 ? 'passed' : 'failed' }
        ])

        if (index === testSteps.length - 1) {
          setIsRunning(false)
        }
      }, step.duration * index)
    })
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Automated Penetration Testing</h2>
      <Card>
        <CardHeader>
          <CardTitle>Run Automated Tests</CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={runTest} disabled={isRunning}>
            {isRunning ? 'Running Tests...' : 'Start Penetration Tests'}
          </Button>
          {isRunning && (
            <Progress value={progress} className="mt-4" />
          )}
          {results.length > 0 && (
            <div className="mt-4 space-y-2">
              {results.map((result, index) => (
                <div key={index} className="flex items-center space-x-2">
                  {result.status === 'passed' ? (
                    <CheckCircle className="text-green-500" />
                  ) : (
                    <AlertCircle className="text-red-500" />
                  )}
                  <span>{result.name}: {result.status}</span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

