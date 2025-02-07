import type { Result, Rule } from "../../types/security-types"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle, AlertTriangle, Info } from "lucide-react"
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import markdownStyles from './css/markdown.module.css';
import GitHubStyleCodeView from './GitHubStyleCodeView';

interface CodeSecurityDetailsProps {
  result: Result
  rule: Rule
}

const getSeverityIcon = (severity: string) => {
  switch (severity.toLowerCase()) {
    case "error":
      return <AlertCircle className="h-5 w-5" />
    case "warning":
      return <AlertTriangle className="h-5 w-5" />
    default:
      return <Info className="h-5 w-5" />
  }
}

const getSeverityColor = (severity: string) => {
  switch (severity.toLowerCase()) {
    case "error":
      return "text-red-500 bg-red-500/10"
    case "warning":
      return "text-yellow-500 bg-yellow-500/10"
    default:
      return "text-blue-500 bg-blue-500/10"
  }
}

export function CodeSecurityDetails({ result, rule }: CodeSecurityDetailsProps) {
  return (
    <div className="h-[calc(100vh-2rem)] space-y-6">
        {/* Header Section */}
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className={`p-2 rounded-lg ${getSeverityColor(result.level)}`}>
              {getSeverityIcon(result.level)}
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold">{rule.shortDescription.text}</h2>
              <div className="flex flex-wrap gap-2 mt-2">
                {rule.properties.cwe && (
                  <Badge variant="outline" className="bg-blue-500/5">
                    {rule.properties.cwe}
                  </Badge>
                )}
                {result.locations[0].physicalLocation.region.startLine && (
                  <Badge variant="outline" className="bg-blue-500/5">
                    Position line: {result.locations[0].physicalLocation.region.startLine}
                  </Badge>
                )}
                {result.properties.priorityScore && (
                  <Badge variant="outline" className="bg-blue-500/5">
                    Priority score: {result.properties.priorityScore}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Key Details Grid */}
          {/* <Card>
            <CardContent className="p-4 grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">Vulnerable Module</h3>
                <p className="text-sm">{vulnerability.moduleName}</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">Introduced Through</h3>
                <p className="text-sm">{vulnerability.from[1] || "N/A"}</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">Fixed In</h3>
                <p className="text-sm">{vulnerability.fixedIn?.join(", ") || "Not fixed"}</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">Exploit Maturity</h3>
                <p className="text-sm">{vulnerability.exploit || "Not Defined"}</p>
              </div>
            </CardContent>
          </Card> */}

          {/* Tabs Section */}
          <Tabs defaultValue="analysis" className="space-y-4">
            <TabsList>
              <TabsTrigger value="analysis">Fix Analysis</TabsTrigger>
              <TabsTrigger value="overview">Issue Overview</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <Card>
                <CardContent className="p-4 space-y-4">
                  <div>
                    <ReactMarkdown 
                      className={`${markdownStyles.markdownContent} text-sm text-muted-foreground whitespace-pre-wrap`}
                      children={rule.help.markdown}
                      remarkPlugins={[remarkGfm]}  // Enable GitHub-flavored markdown features like tables
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analysis">
              <Card>
                <CardContent className="p-4 space-y-4">
                  <div className={`${markdownStyles.markdownContent} text-sm text-muted-foreground whitespace-pre-wrap`}>
                    <div className="space-y-2 mb-4">
                      <h3 className="text-sm font-medium text-muted-foreground">Solution</h3>
                      <p className="text-sm">{result.message.text}</p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-muted-foreground">Example Fix</h3>
                      <GitHubStyleCodeView exampleCommitFixes={rule.properties.exampleCommitFixes} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

          </Tabs>
        </div>
      </div>
  )
}

