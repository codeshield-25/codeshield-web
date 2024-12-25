import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertCircle, AlertTriangle, AlertOctagon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Vulnerability {
  id: number
  type: string
  name: string
  severity: 'Low' | 'Medium' | 'High'
  location: string
}

interface ScanResultsProps {
  results: { vulnerabilities: Vulnerability[] } | null
}

export default function ScanResults({ results }: ScanResultsProps) {
  if (!results) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Scan Results</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center py-8">No scan results available. Start a scan to see results.</p>
        </CardContent>
      </Card>
    )
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'Low':
        return <AlertCircle className="text-yellow-500" />
      case 'Medium':
        return <AlertTriangle className="text-orange-500" />
      case 'High':
        return <AlertOctagon className="text-red-500" />
      default:
        return null
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Scan Results</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Severity</TableHead>
              <TableHead>Location</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {results.vulnerabilities.map((vuln) => (
              <TableRow key={vuln.id}>
                <TableCell>{vuln.type}</TableCell>
                <TableCell>{vuln.name}</TableCell>
                <TableCell className="flex items-center space-x-2">
                  {getSeverityIcon(vuln.severity)}
                  <span>{vuln.severity}</span>
                </TableCell>
                <TableCell>{vuln.location}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

