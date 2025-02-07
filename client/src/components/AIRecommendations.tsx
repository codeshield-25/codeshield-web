// import { useState } from 'react'
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Lightbulb, Code, ExternalLink } from 'lucide-react'
// import { CodeSecurity, Result } from '../../types/security-types'

// interface AIRecommendationsProps {
//   issue: CodeSecurity
// }

// export default function AIRecommendations({ issue }: AIRecommendationsProps) {

//   const [selectedVulnerability, setSelectedVulnerability] = useState<Result | null>(
//     issue.runs[0].results.length > 0 ? issue.runs[0].results[0] : null
//   )
//   const [originalCode, setOriginalCode] = useState('')
//   const [rewrittenCode, setRewrittenCode] = useState('')
//   const [isRewriting, setIsRewriting] = useState(false)
//   const [activeTab, setActiveTab] = useState('original')

//   const handleRewrite = () => {
//     if (!selectedVulnerability) return

//     setIsRewriting(true)
//     // Simulating AI code rewrite process
//     setTimeout(() => {
//       setRewrittenCode(`
//   // Rewritten code to fix ${selectedVulnerability.name}
//   function secureFunction(userInput) {
//     // Sanitize input
//     const sanitizedInput = sanitizeInput(userInput);
    
//     // Use parameterized query
//     const query = 'SELECT * FROM users WHERE username = ?';
//     const result = db.execute(query, [sanitizedInput]);
    
//     return result;
//   }
  
//   function sanitizeInput(input) {
//     // Implement input sanitization logic
//     return input.replace(/[^\w\s]/gi, '');
//   }
//         `)
//       setIsRewriting(false)
//       setActiveTab('rewritten') // Switch to the rewritten code tab
//     }, 2000)
//   }




//   const recommendations = [
//     {
//       id: 1,
//       title: 'Fix SQL Injection Vulnerability',
//       description: 'Use parameterized queries or prepared statements to prevent SQL injection attacks.',
//       code: `
// // Instead of:
// String query = "SELECT * FROM users WHERE username = '" + username + "'";

// // Use:
// String query = "SELECT * FROM users WHERE username = ?";
// PreparedStatement stmt = connection.prepareStatement(query);
// stmt.setString(1, username);
//       `,
//       resources: [
//         { title: 'OWASP SQL Injection Prevention Cheat Sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html' },
//       ],
//     },
//     // Add more recommendations based on the scan results
//   ]

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>AI Recommendations</CardTitle>
//       </CardHeader>
//       <CardContent>
//         {!issue ? (
//           <div>
//              <Card>
//               <CardHeader>
//                 <CardTitle>Select an Issue to See Recommendation</CardTitle>
//                 <CardDescription>Choose a detected Issue to see AI-suggested recommendation.</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 {issue.runs[0].results.length > 0 && (
//                   <select
//                     className="w-full p-2 border rounded"
//                     value={selectedVulnerability?.ruleIndex || ''}
//                     onChange={(e) => {
//                       const selected = issue.runs[0].tool.driver.rules[parseInt(e.target.value)];
//                       setSelectedVulnerability(selected);
//                     }}
//                   >
//                     {issue.runs[0].results.map((iss, idx) => (
//                       <option key={idx} value={iss.ruleId}>
//                         {issue.runs[0].tool.driver.rules[iss.ruleIndex].shortDescription.text}
//                       </option>
//                     ))}
//                   </select>
//                 )}
//               </CardContent>
//             </Card>
//             <div className="text-center py-8">No scan results available. Start a scan to see AI recommendations.</div>
//           </div>
//         ) : (
//           <div className="space-y-4">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Select Vulnerability to show recommendations</CardTitle>
//                 <CardDescription>Choose a detected vulnerability to see AI-suggested code recommendations.</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 {issue.runs[0].results.length > 0 ? (
//                   <select
//                     className="w-full p-2 border rounded"
//                     value={selectedVulnerability?.id || ''}
//                     onChange={(e) => {
//                       const selected = vulnerabilities.find(v => v.id === parseInt(e.target.value));
//                       setSelectedVulnerability(selected || null);
//                     }}
//                   >
//                     {vulnerabilities.map((vuln) => (
//                       <option key={vuln.id} value={vuln.id}>
//                         {vuln.name} - {vuln.severity} ({vuln.location})
//                       </option>
//                     ))}
//                   </select>
//                 ) : (
//                   <p>No vulnerabilities detected.</p>
//                 )}
//               </CardContent>
//             </Card>
//             {recommendations.map((rec) => (
//               <Card key={rec.id}>
//                 <CardHeader>
//                   <CardTitle className="flex items-center space-x-2">
//                     <Lightbulb className="w-5 h-5 text-yellow-500" />
//                     <span>{rec.title}</span>
//                   </CardTitle>
//                   <CardDescription>{rec.description}</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="bg-muted p-4 rounded-md mb-4">
//                     <pre className="text-sm">
//                       <code>{rec.code}</code>
//                     </pre>
//                   </div>
//                   <div>
//                     <h4 className="font-semibold mb-2">Resources:</h4>
//                     <ul className="list-disc list-inside">
//                       {rec.resources.map((resource, index) => (
//                         <li key={index}>
//                           <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline flex items-center">
//                             {resource.title}
//                             <ExternalLink className="w-4 h-4 ml-1" />
//                           </a>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                   <Button className="mt-4">
//                     <Code className="w-4 h-4 mr-2" />
//                     Apply Fix
//                   </Button>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         )}
//       </CardContent>
//     </Card>
//   )
// }

"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lightbulb, ScanLine } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import GitHubStyleCodeView from "./GitHubStyleCodeView"
import type { CodeSecurity, Result, Rule } from "../../types/security-types"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import markdownStyles from "./css/markdown.module.css"

interface AIRecommendationsProps {
  codeSecurityData: CodeSecurity
  handleScan: () => void
  isScanning: boolean 
}

export default function AIRecommendations({ codeSecurityData, handleScan, isScanning }: AIRecommendationsProps) {
  const [selectedIssue, setSelectedIssue] = useState<Result | null>(null)
  const issues = codeSecurityData?.runs[0]?.results || []
  const rules = codeSecurityData?.runs[0]?.tool?.driver?.rules || []

  const getRule = (ruleIndex: number): Rule => {
    return rules[ruleIndex] || {}
  }

  const uniqueIssues = useMemo(() => {
    const uniqueRuleIndices = new Set<number>()
    return issues.filter((issue: Result) => {
      if (!uniqueRuleIndices.has(issue.ruleIndex)) {
        uniqueRuleIndices.add(issue.ruleIndex)
        return true
      }
      return false
    })
  }, [issues])

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Recommendations</CardTitle>
        <CardDescription>Select an issue to see AI-suggested fixes</CardDescription>
      </CardHeader>
      <CardContent>
        {uniqueIssues.length === 0 ? (
          <div className="flex flex-col items-center text-center py-4">
            <h3 className="text-center font-semibold mb-4">No Scan Results</h3>
            <ScanLine className="h-16 w-16 text-primary mb-4 animate-pulse" />
            <p className="text-muted-foreground mb-4">Start a new scan to view security insights for your project.</p>
            <Button 
              className="px-6" 
              onClick={handleScan} 
              disabled={isScanning}
            >
              {isScanning ? 'Scanning...' : 'Start Scan'}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <Select onValueChange={(value) => setSelectedIssue(issues[Number.parseInt(value)])}>
              <SelectTrigger>
                <SelectValue placeholder="Select an issue" />
              </SelectTrigger>
              <SelectContent>
                {uniqueIssues.map((issue: Result, index: number) => (
                  <SelectItem key={index} value={index.toString()}>
                    {getRule(issue.ruleIndex).shortDescription.text}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {selectedIssue && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Lightbulb className="w-5 h-5 text-yellow-500" />
                    <span>{getRule(selectedIssue.ruleIndex).shortDescription.text}</span>
                  </CardTitle>
                  <CardDescription>{selectedIssue.message.text}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted p-4 rounded-md mb-4">
                    <GitHubStyleCodeView
                      exampleCommitFixes={getRule(selectedIssue.ruleIndex).properties.exampleCommitFixes}
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Help:</h4>
                    <ReactMarkdown
                      className={`${markdownStyles.markdownContent} text-sm text-muted-foreground whitespace-pre-wrap bg-muted p-4 rounded-md mb-4`}
                      children={getRule(selectedIssue.ruleIndex).help.markdown}
                      remarkPlugins={[remarkGfm]}
                    />
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

