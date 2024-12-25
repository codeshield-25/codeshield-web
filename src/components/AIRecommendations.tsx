import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lightbulb, Code, ExternalLink } from 'lucide-react'

interface AIRecommendationsProps {
  results: any
}

export default function AIRecommendations({ results }: AIRecommendationsProps) {
  if (!results) {
    return <div className="text-center py-8">No scan results available. Start a scan to see AI recommendations.</div>
  }

  const recommendations = [
    {
      id: 1,
      title: 'Fix SQL Injection Vulnerability',
      description: 'Use parameterized queries or prepared statements to prevent SQL injection attacks.',
      code: `
// Instead of:
String query = "SELECT * FROM users WHERE username = '" + username + "'";

// Use:
String query = "SELECT * FROM users WHERE username = ?";
PreparedStatement stmt = connection.prepareStatement(query);
stmt.setString(1, username);
      `,
      resources: [
        { title: 'OWASP SQL Injection Prevention Cheat Sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html' },
      ],
    },
    // Add more recommendations based on the scan results
  ]

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">AI Recommendations</h2>
      <div className="space-y-4">
        {recommendations.map((rec) => (
          <Card key={rec.id}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                <span>{rec.title}</span>
              </CardTitle>
              <CardDescription>{rec.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-md mb-4">
                <pre className="text-sm">
                  <code>{rec.code}</code>
                </pre>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Resources:</h4>
                <ul className="list-disc list-inside">
                  {rec.resources.map((resource, index) => (
                    <li key={index}>
                      <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline flex items-center">
                        {resource.title}
                        <ExternalLink className="w-4 h-4 ml-1" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <Button className="mt-4">
                <Code className="w-4 h-4 mr-2" />
                Apply Fix
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

