import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lightbulb, Code, ExternalLink } from 'lucide-react'
interface Vulnerability {
  id: number
  type: string
  name: string
  severity: 'Low' | 'Medium' | 'High'
  location: string
}

interface AIRecommendationsProps {
  results: any
  vulnerabilities: Vulnerability[]
}

export default function AIRecommendations({ results, vulnerabilities }: AIRecommendationsProps) {

  //From AICodeRewrite.tsx
  const [selectedVulnerability, setSelectedVulnerability] = useState<Vulnerability | null>(
    vulnerabilities.length > 0 ? vulnerabilities[0] : null
  )
  const [originalCode, setOriginalCode] = useState('')
  const [rewrittenCode, setRewrittenCode] = useState('')
  const [isRewriting, setIsRewriting] = useState(false)
  const [activeTab, setActiveTab] = useState('original')

  const handleRewrite = () => {
    if (!selectedVulnerability) return

    setIsRewriting(true)
    // Simulating AI code rewrite process
    setTimeout(() => {
      setRewrittenCode(`
  // Rewritten code to fix ${selectedVulnerability.name}
  function secureFunction(userInput) {
    // Sanitize input
    const sanitizedInput = sanitizeInput(userInput);
    
    // Use parameterized query
    const query = 'SELECT * FROM users WHERE username = ?';
    const result = db.execute(query, [sanitizedInput]);
    
    return result;
  }
  
  function sanitizeInput(input) {
    // Implement input sanitization logic
    return input.replace(/[^\w\s]/gi, '');
  }
        `)
      setIsRewriting(false)
      setActiveTab('rewritten') // Switch to the rewritten code tab
    }, 2000)
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
    <Card>
      <CardHeader>
        <CardTitle>AI Recommendations</CardTitle>
      </CardHeader>
      <CardContent>
        {!results ? (
          <div>
             <Card>
              <CardHeader>
                <CardTitle>Select Vulnerability to Rewrite</CardTitle>
                <CardDescription>Choose a detected vulnerability to see AI-suggested code rewrites.</CardDescription>
              </CardHeader>
              <CardContent>
                {vulnerabilities.length > 0 && (
                  <select
                    className="w-full p-2 border rounded"
                    value={selectedVulnerability?.id || ''}
                    onChange={(e) => {
                      const selected = vulnerabilities.find(v => v.id === parseInt(e.target.value));
                      setSelectedVulnerability(selected || null);
                    }}
                  >
                    {vulnerabilities.map((vuln) => (
                      <option key={vuln.id} value={vuln.id}>
                        {vuln.name} - {vuln.severity} ({vuln.location})
                      </option>
                    ))}
                  </select>
                )}
              </CardContent>
            </Card>
            <div className="text-center py-8">No scan results available. Start a scan to see AI recommendations.</div>
          </div>
        ) : (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Select Vulnerability to show recommendations</CardTitle>
                <CardDescription>Choose a detected vulnerability to see AI-suggested code recommendations.</CardDescription>
              </CardHeader>
              <CardContent>
                {vulnerabilities.length > 0 ? (
                  <select
                    className="w-full p-2 border rounded"
                    value={selectedVulnerability?.id || ''}
                    onChange={(e) => {
                      const selected = vulnerabilities.find(v => v.id === parseInt(e.target.value));
                      setSelectedVulnerability(selected || null);
                    }}
                  >
                    {vulnerabilities.map((vuln) => (
                      <option key={vuln.id} value={vuln.id}>
                        {vuln.name} - {vuln.severity} ({vuln.location})
                      </option>
                    ))}
                  </select>
                ) : (
                  <p>No vulnerabilities detected.</p>
                )}
              </CardContent>
            </Card>
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
        )}
      </CardContent>
    </Card>
  )
}
