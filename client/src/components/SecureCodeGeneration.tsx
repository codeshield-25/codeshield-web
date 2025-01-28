import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

export default function SecureCodeGeneration() {
  const [selectedPattern, setSelectedPattern] = useState('')
  const [generatedCode, setGeneratedCode] = useState('')

  const securityPatterns = [
    'Input Validation',
    'Authentication',
    'Authorization',
    'Session Management',
    'Error Handling',
  ]

  const handleGenerate = () => {
    // Simulating code generation
    setGeneratedCode(`
// Secure ${selectedPattern} Implementation
function secure${selectedPattern.replace(/\s+/g, '')}() {
  // TODO: Implement secure ${selectedPattern.toLowerCase()} logic
  console.log("Implementing secure ${selectedPattern.toLowerCase()}");
}

// Usage example
secure${selectedPattern.replace(/\s+/g, '')}();
    `)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Secure Code Generation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Select onValueChange={setSelectedPattern}>
            <SelectTrigger>
              <SelectValue placeholder="Select a security pattern" />
            </SelectTrigger>
            <SelectContent>
              {securityPatterns.map((pattern) => (
                <SelectItem key={pattern} value={pattern}>{pattern}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={handleGenerate} disabled={!selectedPattern}>Generate Secure Code</Button>
          {generatedCode && (
            <pre className="bg-muted p-4 rounded-md overflow-x-auto">
              <code>{generatedCode}</code>
            </pre>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

