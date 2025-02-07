import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Shield, Target, BarChart2 } from 'lucide-react'
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import GitData from "./GitData"

interface DashboardProps {
  onScan: () => void
  isScanning: boolean
  vulnerabilityTypes: string[]
  selectedVulnerabilities: string[]
  onVulnerabilityChange: (vulnerabilities: string[]) => void
  initialRepoUrl: string;
}

export default function Dashboard({ onScan, isScanning, vulnerabilityTypes, selectedVulnerabilities, onVulnerabilityChange, initialRepoUrl}: DashboardProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Vulnerability Types</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            {vulnerabilityTypes.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  id={type}
                  checked={selectedVulnerabilities.includes(type)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      onVulnerabilityChange([...selectedVulnerabilities, type])
                    } else {
                      onVulnerabilityChange(selectedVulnerabilities.filter(t => t !== type))
                    }
                  }}
                />
                <Label htmlFor={type}>{type}</Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-sm font-medium">Quick Scan</CardTitle>
            <Play className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Button 
              className="w-full" 
              onClick={onScan} 
              disabled={isScanning}
            >
              {isScanning ? 'Scanning...' : 'Start Scan'}
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-sm font-medium">Secure Code Generation</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline">Generate Code</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-sm font-medium">Penetration Testing</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline">Start Test</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-sm font-medium">Security Debt</CardTitle>
            <BarChart2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">400 pts</div>
            <p className="text-xs text-muted-foreground">+21 from last week</p>
          </CardContent>
        </Card>
      </div>
      <div>
        <GitData initialRepoUrl={initialRepoUrl}/>
      </div>
    </div>
  )
}
