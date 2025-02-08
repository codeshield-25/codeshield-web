import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

export default function SettingsPanel() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Label htmlFor="notifications" className="flex flex-col space-y-1">
              <span>Enable Notifications</span>
              <span className="font-normal text-sm text-muted-foreground">Receive alerts for new vulnerabilities</span>
            </Label>
            <Switch id="notifications" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="scan-frequency">Scan Frequency (days)</Label>
            <Slider
              id="scan-frequency"
              defaultValue={[7]}
              max={30}
              step={1}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="ai-assistance" className="flex flex-col space-y-1">
              <span>AI-Assisted Analysis</span>
              <span className="font-normal text-sm text-muted-foreground">Use AI to enhance vulnerability detection</span>
            </Label>
            <Switch id="ai-assistance" />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="auto-update" className="flex flex-col space-y-1">
              <span>Automatic Updates</span>
              <span className="font-normal text-sm text-muted-foreground">Keep security definitions up-to-date</span>
            </Label>
            <Switch id="auto-update" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

