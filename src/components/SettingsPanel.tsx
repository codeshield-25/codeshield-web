import React from 'react'
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function SettingsPanel() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Settings</h2>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="ai-enabled">Enable AI-powered scanning</Label>
          <Switch id="ai-enabled" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="confidence-threshold">AI Confidence Threshold</Label>
          <Slider
            id="confidence-threshold"
            min={0}
            max={100}
            step={1}
            defaultValue={[75]}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="api-key">OpenAI API Key</Label>
          <Input id="api-key" type="password" placeholder="Enter your OpenAI API key" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="scan-frequency">Automatic Scan Frequency (hours)</Label>
          <Input id="scan-frequency" type="number" min={1} max={24} defaultValue={4} />
        </div>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="notifications">Enable notifications</Label>
          <Switch id="notifications" />
        </div>
      </div>
      
      <Button className="w-full">Save Settings</Button>
    </div>
  )
}

