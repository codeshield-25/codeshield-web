import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Vulnerability {
  id: number
  type: string
  name: string
  severity: 'Low' | 'Medium' | 'High'
  location: string
}

interface AICodeRewriteProps {
  vulnerabilities: Vulnerability[]
}

export default function AICodeRewrite({ vulnerabilities }: AICodeRewriteProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Code Rewrite</CardTitle>
      </CardHeader>
      <CardContent>
        {vulnerabilities.length > 0 ? (
          <div className="space-y-4">
            {vulnerabilities.map((vuln) => (
              <div key={vuln.id} className="border p-4 rounded-md">
                <h3 className="font-semibold mb-2">{vuln.name} ({vuln.location})</h3>
                <pre className="bg-muted p-2 rounded-md">
                  {`// AI-generated secure code suggestion
// Replace the vulnerable code with this:
function secureFunction() {
  // Implement secure logic here
  console.log("Secure implementation for ${vuln.name}");
}`}
                </pre>
              </div>
            ))}
          </div>
        ) : (
          <p>No vulnerabilities to rewrite. Run a scan to identify issues.</p>
        )}
      </CardContent>
    </Card>
  )
}

