import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SecureCodeGeneration() {
  const [codeType, setCodeType] = useState('')
  const [generatedCode, setGeneratedCode] = useState('')

  const handleGenerate = () => {
    // Simulating code generation
    let code = ''
    switch (codeType) {
      case 'inputValidation':
        code = `function validateInput(input) {
  // Remove any potentially harmful characters
  const sanitizedInput = input.replace(/[<>&'"]/g, '');
  
  // Check if the input is not empty and within a reasonable length
  if (sanitizedInput.length > 0 && sanitizedInput.length <= 100) {
    return sanitizedInput;
  } else {
    throw new Error('Invalid input');
  }
}`
        break
      case 'authentication':
        code = `import bcrypt from 'bcrypt';

async function hashPassword(password) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

async function verifyPassword(password, hash) {
  return await bcrypt.compare(password, hash);
}`
        break
      default:
        code = 'Please select a code type.'
    }
    setGeneratedCode(code)
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Secure Code Generation</h2>
      <Card>
        <CardHeader>
          <CardTitle>Generate Secure Code Snippets</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Select value={codeType} onValueChange={setCodeType}>
              <SelectTrigger>
                <SelectValue placeholder="Select code type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="inputValidation">Input Validation</SelectItem>
                <SelectItem value="authentication">Authentication</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleGenerate}>Generate Secure Code</Button>
            {generatedCode && (
              <Textarea
                value={generatedCode}
                readOnly
                rows={10}
                className="font-mono text-sm"
              />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

