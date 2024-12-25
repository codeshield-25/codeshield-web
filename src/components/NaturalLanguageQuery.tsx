import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function NaturalLanguageQuery() {
  const [query, setQuery] = useState('')
  const [response, setResponse] = useState('')

  const handleQuery = () => {
    // Simulating AI response
    setResponse(`Here's what I found regarding "${query}":
    
1. The query relates to potential security vulnerabilities in your codebase.
2. Based on the context, it might be related to input validation or data sanitization.
3. I recommend reviewing the following files for potential improvements:
   - src/utils/inputValidation.js
   - src/controllers/userInput.js
4. Consider implementing stronger input validation and using parameterized queries to prevent SQL injection attacks.`)
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Natural Language Query</h2>
      <Card>
        <CardHeader>
          <CardTitle>Ask about your code's security</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex space-x-2">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g., How can I improve input validation?"
                className="flex-grow"
              />
              <Button onClick={handleQuery}>Ask AI</Button>
            </div>
            {response && (
              <div className="mt-4 p-4 bg-muted rounded-md">
                <pre className="whitespace-pre-wrap">{response}</pre>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

