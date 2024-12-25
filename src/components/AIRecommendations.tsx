import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface AIRecommendationsProps {
  results: any
}

export default function AIRecommendations({ results }: AIRecommendationsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Recommendations</CardTitle>
      </CardHeader>
      <CardContent>
        {results ? (
          <ul className="list-disc pl-5 space-y-2">
            <li>Update dependencies to patch known vulnerabilities</li>
            <li>Implement input validation for all user inputs</li>
            <li>Use parameterized queries to prevent SQL injection</li>
            <li>Enable HTTPS across the entire application</li>
            <li>Implement proper access controls and user authentication</li>
          </ul>
        ) : (
          <p>Run a scan to get AI-powered recommendations.</p>
        )}
      </CardContent>
    </Card>
  )
}

