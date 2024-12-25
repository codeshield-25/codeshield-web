import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Code, RefreshCw } from 'lucide-react'

interface AICodeRewriteProps {
  vulnerabilities: Array<{
    id: number
    type: string
    name: string
    severity: 'Low' | 'Medium' | 'High'
    location: string
  }>
}

export default function AICodeRewrite({ vulnerabilities }: AICodeRewriteProps) {
  const [selectedVulnerability, setSelectedVulnerability] = useState<AICodeRewriteProps['vulnerabilities'][0] | null>(vulnerabilities[0] || null)
  const [originalCode, setOriginalCode] = useState('')
  const [rewrittenCode, setRewrittenCode] = useState('')
  const [isRewriting, setIsRewriting] = useState(false)
  const [activeTab, setActiveTab] = useState('original')

  const handleRewrite = () => {
    setIsRewriting(true)
    // Simulating AI code rewrite process
    setTimeout(() => {
      setRewrittenCode(`
// Rewritten code to fix ${selectedVulnerability?.name || 'vulnerability'}
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
    setActiveTab('rewritten')  // Switch to the rewritten code tab
  }, 2000)
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">AI-Powered Code Rewrite</h2>
      <Card>
        <CardHeader>
          <CardTitle>Select Vulnerability to Rewrite</CardTitle>
          <CardDescription>Choose a detected vulnerability to see AI-suggested code rewrites.</CardDescription>
        </CardHeader>
        <CardContent>
          {vulnerabilities.length > 0 ? (
            <select
              className="w-full p-2 border rounded"
              value={selectedVulnerability?.id}
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
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="original">Original Code</TabsTrigger>
          <TabsTrigger value="rewritten">Rewritten Code</TabsTrigger>
        </TabsList>
        <TabsContent value="original">
          <Textarea
            placeholder="Paste your original code here"
            value={originalCode}
            onChange={(e) => setOriginalCode(e.target.value)}
            rows={10}
            className="w-full p-2 font-mono text-sm"
          />
        </TabsContent>
        <TabsContent value="rewritten">
          <Textarea
            value={rewrittenCode}
            rows={10}
            readOnly
            className="w-full p-2 font-mono text-sm bg-muted"
          />
        </TabsContent>
      </Tabs>
      <div className="flex justify-between">
        <Button onClick={handleRewrite} disabled={isRewriting || !originalCode || !selectedVulnerability}>
          {isRewriting ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Rewriting...
            </>
          ) : (
            <>
              <Code className="mr-2 h-4 w-4" />
              Rewrite Code
            </>
          )}
        </Button>
        {rewrittenCode && (
          <Button variant="outline">
            Apply Rewritten Code
          </Button>
        )}
      </div>
    </div>
  )
}

