import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AlertCircle, CheckCircle2, Shield, FileCode, Cog, ScanLine } from "lucide-react"
import type {
  OpenSourceSecurity,
  CodeSecurity,
  ConfigSecurity,
  Result
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
  handleScan: () => void
  isScanning: boolean 
}

export default function SecurityScanner({ openSourceData, codeSecurityData, configData, handleScan, isScanning }: SecurityScannerProps) {
  const [selectedCodeIssue, setSelectedCodeIssue] = useState<Result | null>(null)
  const [selectedVulnerabilityIdx, setSelectedVulnerabilityIdx] = useState<number | null>(null)

  // Check if data is available
  const hasData = openSourceData && codeSecurityData && configData

  if (!hasData) {
    return (
      // <div className="container mx-auto flex justify-center">
      //   <Card className="w-full p-4">
      //     <CardHeader>
      //       <CardTitle className="text-center">No Scan Results</CardTitle>
      //     </CardHeader>
      //     <CardContent className="flex flex-col items-center text-center">
      //       <ScanLine className="h-16 w-16 text-primary mb-4 animate-pulse" />
      //       <p className="text-muted-foreground mb-4">Start a new scan to view security insights for your project.</p>
      //       <Button 
      //         className="px-6" 
      //         onClick={handleScan} 
      //         disabled={isScanning}
      //       >
      //         {isScanning ? 'Scanning...' : 'Start Scan'}
      //       </Button>
      //     </CardContent>
      //   </Card>
      // </div>
      <Card>
      <CardHeader>
        <CardTitle>Scan Results</CardTitle>
        <CardDescription>Select an issue to see detailed Result</CardDescription>
      </CardHeader>
      <CardContent>
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
        </CardContent>
        </Card>
    )
  }

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
    <div className="container mx-auto space-y-6">
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
                    {/* <ScrollArea className="h-[400px] pr-4">
                      {openSourceData.vulnerabilities.map((vuln) => (
                        <VulnerabilityItem
                          key={index}
                          vulnerability={vuln}
                          isSelected={selectedVulnerability?.id === vuln.id}
                          onClick={() => setSelectedVulnerability(vuln)}
                        />
                      ))}
                    </ScrollArea> */}
                    <ScrollArea className="h-[400px] pr-4">
                      {openSourceData.vulnerabilities.map((vuln, idx) => (
                        <VulnerabilityItem
                          key={`${vuln.id}-${idx}`} // Ensure uniqueness
                          vulnerability={vuln}
                          isSelected={selectedVulnerabilityIdx === idx} // Compare with idx
                          onClick={() => setSelectedVulnerabilityIdx(idx)} // Store idx
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
                    {/* <ScrollArea className="h-[400px] pr-4">
                      {selectedVulnerability ? (
                        <VulnerabilityDetails vulnerability={selectedVulnerability} />
                      ) : (
                        <p className="text-muted-foreground text-center">Select a vulnerability to view details</p>
                      )}
                    </ScrollArea> */}
                    <ScrollArea className="h-[400px] pr-4">
                      {selectedVulnerabilityIdx !== null ? (
                        <VulnerabilityDetails vulnerability={openSourceData.vulnerabilities[selectedVulnerabilityIdx]} />
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
                    <ScrollArea className="h-[400px] pr-4">
                      {codeSecurityData.runs[0].results.map((result, index) => (
                        <CodeSecurityItem
                          key={index}
                          result={result}
                          rule={codeSecurityData.runs[0].tool.driver.rules[result.ruleIndex]}
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
                        <CodeSecurityDetails result={selectedCodeIssue} rule={codeSecurityData.runs[0].tool.driver.rules[selectedCodeIssue.ruleIndex]} />
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

