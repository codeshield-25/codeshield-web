import type { CodeSecurityResult } from "../../types/security-types"
interface CodeSecurityDetailsProps {
  result: CodeSecurityResult
}
export function CodeSecurityDetails({ result }: CodeSecurityDetailsProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-semibold">Issue</h3>
        <p className="text-sm text-muted-foreground">{result.message.text}</p>
      </div>
      <div>
        <h3 className="font-semibold">Location</h3>
        <p className="text-sm text-muted-foreground">
          File: {result.locations[0].physicalLocation.artifactLocation.uri}
          <br />
          Lines: {result.locations[0].physicalLocation.region.startLine}-
          {result.locations[0].physicalLocation.region.endLine}
        </p>
      </div>
    </div>
  )
}
