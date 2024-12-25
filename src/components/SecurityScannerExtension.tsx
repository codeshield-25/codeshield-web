"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AlertCircle, Play, Settings, FileText, BarChart2, Users, Trophy, MessageSquare, TrendingUp, Shield, Zap, Activity } from 'lucide-react'
import ScanResults from './ScanResults'
import AIRecommendations from './AIRecommendations'
import SettingsPanel from './SettingsPanel'
import AICodeRewrite from './AICodeRewrite'
import VulnerabilityVisualization from './VulnerabilityVisualization'
import RealTimeCollaboration from './RealTimeCollaboration'
import SecurityGameification from './SecurityGameification'
import NaturalLanguageQuery from './NaturalLanguageQuery'
import PredictiveAnalysis from './PredictiveAnalysis'
import SecureCodeGeneration from './SecureCodeGeneration'
import AutomatedPenetrationTesting from './AutomatedPenetrationTesting'
import SecurityDebtTracker from './SecurityDebtTracker'

const projectTypes = ['.NET', 'Java', 'Eclipse', 'Android Studio', 'iOS']
const vulnerabilityTypes = ['OWASP Top 10', 'SANS Top 25', 'Business Logic', 'Emerging Threats']

export default function SecurityScannerExtension() {
  const [selectedProjectType, setSelectedProjectType] = useState<string>(projectTypes[0])
  const [selectedVulnerabilities, setSelectedVulnerabilities] = useState<string[]>([])
  const [scanResults, setScanResults] = useState<any>(null)
  const [isScanning, setIsScanning] = useState(false)

  const handleScan = () => {
    setIsScanning(true)
    // Simulating a scan process
    setTimeout(() => {
      setScanResults({
        vulnerabilities: [
          { id: 1, type: 'OWASP Top 10', name: 'Injection', severity: 'High', location: 'src/main.js:42' },
          { id: 2, type: 'SANS Top 25', name: 'Use of Hard-coded Credentials', severity: 'Medium', location: 'src/auth/login.js:15' },
          { id: 3, type: 'Business Logic', name: 'Insufficient Access Control', severity: 'High', location: 'src/api/users.js:78' },
          { id: 4, type: 'Emerging Threats', name: 'API Key Exposure', severity: 'Medium', location: 'src/config/api.js:5' },
        ],
      })
      setIsScanning(false)
    }, 3000)
  }

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar */}
      <div className="w-64 border-r p-4 flex flex-col">
        <h2 className="text-lg font-semibold mb-4">Security Scanner</h2>
        <Select value={selectedProjectType} onValueChange={setSelectedProjectType}>
          <SelectTrigger>
            <SelectValue placeholder="Select project type" />
          </SelectTrigger>
          <SelectContent>
            {projectTypes.map((type) => (
              <SelectItem key={type} value={type}>{type}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="mt-4">
          <h3 className="text-sm font-medium mb-2">Vulnerability Types</h3>
          {vulnerabilityTypes.map((type) => (
            <label key={type} className="flex items-center space-x-2 mb-2 text-sm">
              <input
                type="checkbox"
                checked={selectedVulnerabilities.includes(type)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedVulnerabilities([...selectedVulnerabilities, type])
                  } else {
                    setSelectedVulnerabilities(selectedVulnerabilities.filter(t => t !== type))
                  }
                }}
                className="form-checkbox"
              />
              <span>{type}</span>
            </label>
          ))}
        </div>
        <Button onClick={handleScan} disabled={isScanning} className="mt-auto">
          {isScanning ? 'Scanning...' : 'Start Scan'}
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Tabs defaultValue="results" className="flex-1 flex flex-col">
          <div className="border-b px-4">
            <TabsList>
              <TabsTrigger value="results">Scan Results</TabsTrigger>
              <TabsTrigger value="ai">AI Recommendations</TabsTrigger>
              <TabsTrigger value="rewrite">AI Code Rewrite</TabsTrigger>
              <TabsTrigger value="visualization">Visualization</TabsTrigger>
              <TabsTrigger value="collaboration">Collaboration</TabsTrigger>
              <TabsTrigger value="gamification">Gamification</TabsTrigger>
              <TabsTrigger value="nlq">Natural Language Query</TabsTrigger>
              <TabsTrigger value="predictive">Predictive Analysis</TabsTrigger>
              <TabsTrigger value="secure-gen">Secure Code Gen</TabsTrigger>
              <TabsTrigger value="pentest">Pen Testing</TabsTrigger>
              <TabsTrigger value="debt">Security Debt</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
          </div>
          <ScrollArea className="flex-1">
            <TabsContent value="results" className="p-4">
              <ScanResults results={scanResults} />
            </TabsContent>
            <TabsContent value="ai" className="p-4">
              <AIRecommendations results={scanResults} />
            </TabsContent>
            <TabsContent value="rewrite" className="p-4">
              <AICodeRewrite vulnerabilities={scanResults?.vulnerabilities ?? []} />
            </TabsContent>
            <TabsContent value="visualization" className="p-4">
              <VulnerabilityVisualization vulnerabilities={scanResults?.vulnerabilities ?? []} />
            </TabsContent>
            <TabsContent value="collaboration" className="p-4">
              <RealTimeCollaboration />
            </TabsContent>
            <TabsContent value="gamification" className="p-4">
              <SecurityGameification />
            </TabsContent>
            <TabsContent value="nlq" className="p-4">
              <NaturalLanguageQuery />
            </TabsContent>
            <TabsContent value="predictive" className="p-4">
              <PredictiveAnalysis />
            </TabsContent>
            <TabsContent value="secure-gen" className="p-4">
              <SecureCodeGeneration />
            </TabsContent>
            <TabsContent value="pentest" className="p-4">
              <AutomatedPenetrationTesting />
            </TabsContent>
            <TabsContent value="debt" className="p-4">
              <SecurityDebtTracker />
            </TabsContent>
            <TabsContent value="settings" className="p-4">
              <SettingsPanel />
            </TabsContent>
          </ScrollArea>
        </Tabs>

        {/* Action Bar */}
        <div className="border-t p-2 flex justify-between">
          <Button variant="outline" size="sm" onClick={handleScan} disabled={isScanning}>
            <Play className="w-4 h-4 mr-2" />
            {isScanning ? 'Scanning...' : 'Quick Scan'}
          </Button>
          <Button variant="outline" size="sm">
            <FileText className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Configure AI
          </Button>
        </div>
      </div>
    </div>
  )
}

