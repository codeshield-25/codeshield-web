import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, AlertTriangle, Info } from "lucide-react"
import type { CodeSecurityResult } from "../../types/security-types"

interface CodeSecurityItemProps {
  result: CodeSecurityResult
  isSelected: boolean
  onClick: () => void
}

export function CodeSecurityItem({ result, isSelected, onClick }: CodeSecurityItemProps) {
  const getBadgeClass = (severity: string) => {
    switch (severity) {
      case "error":
        return "bg-red-500 text-white hover:bg-red-600"
      case "warning":
        return "bg-yellow-500 text-white hover:bg-yellow-600"
      default:
        return "bg-blue-500 text-white hover:bg-blue-600"
    }
  }

  return (
    <Card className={`mb-2 cursor-pointer hover:bg-accent ${isSelected ? "border-primary" : ""}`} onClick={onClick}>
      <CardContent className="p-4">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h4 className="font-medium truncate">{result.ruleId}</h4>
            <p className="text-sm text-muted-foreground truncate">
              {result.locations[0].physicalLocation.artifactLocation.uri}:
              {result.locations[0].physicalLocation.region.startLine}
            </p>
          </div>
          <Badge variant="outline" className={`capitalize ${getBadgeClass(result.level)} whitespace-nowrap mt-1`}>
            {result.level === "error" ? (
              <AlertCircle className="w-3 h-3 mr-1" />
            ) : result.level === "warning" ? (
              <AlertTriangle className="w-3 h-3 mr-1" />
            ) : (
              <Info className="w-3 h-3 mr-1" />
            )}
            {result.level}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}

