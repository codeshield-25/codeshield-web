// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { AlertCircle, AlertTriangle, AlertOctagon } from 'lucide-react'
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// interface Vulnerability {
//   id: number
//   type: string
//   name: string
//   severity: 'Low' | 'Medium' | 'High'
//   location: string
// }

// interface ScanResultsProps {
//   results: { vulnerabilities: Vulnerability[] } | null
// }

// export default function ScanResults({ results }: ScanResultsProps) {
//   if (!results) {
//     return (
//       <Card>
//         <CardHeader>
//           <CardTitle>Scan Results</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <p className="text-center py-8">No scan results available. Start a scan to see results.</p>
//         </CardContent>
//       </Card>
//     )
//   }

//   const getSeverityIcon = (severity: string) => {
//     switch (severity) {
//       case 'Low':
//         return <AlertCircle className="text-yellow-500" />
//       case 'Medium':
//         return <AlertTriangle className="text-orange-500" />
//       case 'High':
//         return <AlertOctagon className="text-red-500" />
//       default:
//         return null
//     }
//   }

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Scan Results</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Type</TableHead>
//               <TableHead>Name</TableHead>
//               <TableHead>Severity</TableHead>
//               <TableHead>Location</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {results.vulnerabilities.map((vuln) => (
//               <TableRow key={vuln.id}>
//                 <TableCell>{vuln.type}</TableCell>
//                 <TableCell>{vuln.name}</TableCell>
//                 <TableCell className="flex items-center space-x-2">
//                   {getSeverityIcon(vuln.severity)}
//                   <span>{vuln.severity}</span>
//                 </TableCell>
//                 <TableCell>{vuln.location}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </CardContent>
//     </Card>
//   )
// }

"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AlertCircle, AlertTriangle, CheckCircle2, Shield, FileCode, Cog } from "lucide-react"
import type {
  OpenSourceSecurity,
  CodeSecurity,
  ConfigSecurity,
  Vulnerability,
  CodeSecurityResult,
} from "../../types/security-types"
import { StatCard } from "./stat-card"
import { VulnerabilityItem } from "./vulnerability-item"
import { VulnerabilityDetails } from "./vulnerability-details"
import { CodeSecurityItem } from "./code-security-item"
import { CodeSecurityDetails } from "./code-security-details"

interface SecurityScannerProps {
  openSourceData: OpenSourceSecurity
  codeSecurityData: CodeSecurity
  configData: ConfigSecurity
}

export default function SecurityScanner({ openSourceData, codeSecurityData, configData }: SecurityScannerProps) {
  const [selectedVulnerability, setSelectedVulnerability] = useState<Vulnerability | null>(null)
  const [selectedCodeIssue, setSelectedCodeIssue] = useState<CodeSecurityResult | null>(null)

  // Calculate statistics for open source vulnerabilities
  const openSourceStats = {
    total: openSourceData.vulnerabilities.length,
    high: openSourceData.vulnerabilities.filter((v) => v.severity === "high").length,
    medium: openSourceData.vulnerabilities.filter((v) => v.severity === "medium").length,
    low: openSourceData.vulnerabilities.filter((v) => v.severity === "low").length,
  }

  // Calculate statistics for code security issues
  const codeSecurityStats = {
    total: codeSecurityData.runs[0]?.results.length || 0,
    high: codeSecurityData.runs[0]?.results.filter((r) => r.level === "error").length || 0,
    medium: codeSecurityData.runs[0]?.results.filter((r) => r.level === "warning").length || 0,
    low: codeSecurityData.runs[0]?.results.filter((r) => r.level === "note").length || 0,
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Tabs defaultValue="opensource" className="space-y-4">
        <TabsList>
          <TabsTrigger value="opensource" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Open Source Security
          </TabsTrigger>
          <TabsTrigger value="codesecurity" className="flex items-center gap-2">
            <FileCode className="h-4 w-4" />
            Code Security
          </TabsTrigger>
          <TabsTrigger value="config" className="flex items-center gap-2">
            <Cog className="h-4 w-4" />
            Configuration
          </TabsTrigger>
        </TabsList>

        {/* Open Source Security Tab */}
        <TabsContent value="opensource">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Open Source Vulnerabilities
                <Badge variant="secondary" className="ml-2">
                  {openSourceStats.total} issues
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4 mb-6">
                <StatCard title="Total Dependencies" value={openSourceData.dependencyCount} />
                <StatCard title="High Severity" value={openSourceStats.high} variant="high" />
                <StatCard title="Medium Severity" value={openSourceStats.medium} variant="medium" />
                <StatCard title="Low Severity" value={openSourceStats.low} variant="low" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Vulnerabilities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[400px] pr-4">
                      {openSourceData.vulnerabilities.map((vuln,index) => (
                        <VulnerabilityItem
                          key={index}
                          vulnerability={vuln}
                          isSelected={selectedVulnerability?.id === vuln.id}
                          onClick={() => setSelectedVulnerability(vuln)}
                        />
                      ))}
                    </ScrollArea>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[400px] pr-4">
                      {selectedVulnerability ? (
                        <VulnerabilityDetails vulnerability={selectedVulnerability} />
                      ) : (
                        <p className="text-muted-foreground text-center">Select a vulnerability to view details</p>
                      )}
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Code Security Tab */}
        <TabsContent value="codesecurity">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileCode className="h-5 w-5" />
                Code Security Issues
                <Badge variant="secondary" className="ml-2">
                  {codeSecurityStats.total} issues
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4 mb-6">
                <StatCard title="Total Issues" value={codeSecurityStats.total} />
                <StatCard title="High Severity" value={codeSecurityStats.high} variant="high" />
                <StatCard title="Medium Severity" value={codeSecurityStats.medium} variant="medium" />
                <StatCard title="Low Severity" value={codeSecurityStats.low} variant="low" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Issues</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[400px] w-full">
                      {codeSecurityData.runs[0]?.results.map((result, index) => (
                        <CodeSecurityItem
                          key={index}
                          result={result}
                          isSelected={selectedCodeIssue === result}
                          onClick={() => setSelectedCodeIssue(result)}
                        />
                      ))}
                    </ScrollArea>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[400px] pr-4">
                      {selectedCodeIssue ? (
                        <CodeSecurityDetails result={selectedCodeIssue} />
                      ) : (
                        <p className="text-muted-foreground text-center">Select an issue to view details</p>
                      )}
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Configuration Tab */}
        <TabsContent value="config">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cog className="h-5 w-5" />
                Configuration Issues
              </CardTitle>
            </CardHeader>
            <CardContent>
              {configData.ok ? (
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle2 className="h-5 w-5" />
                  <p>No configuration issues found</p>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-red-600">
                  <AlertCircle className="h-5 w-5" />
                  <p>{configData.error || "Configuration issues detected"}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

