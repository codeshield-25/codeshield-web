import { useState } from 'react'
import { Layout } from './Layout'
import { Sidebar } from './Sidebar'
import Dashboard from './Dashboard'
import ScanResults from './ScanResults'
import AIRecommendations from './AIRecommendations'
import AICodeRewrite from './AICodeRewrite'
import VulnerabilityVisualization from './VulnerabilityVisualization'
import RealTimeCollaboration from './RealTimeCollaboration'
import SecurityGameification from './SecurityGameification'
import NaturalLanguageQuery from './NaturalLanguageQuery'
import PredictiveAnalysis from './PredictiveAnalysis'
import SecureCodeGeneration from './SecureCodeGeneration'
import AutomatedPenetrationTesting from './AutomatedPenetrationTesting'
import SecurityDebtTracker from './SecurityDebtTracker'
import SettingsPanel from './SettingsPanel'

const projectTypes = ['.NET', 'Java', 'Eclipse', 'Android Studio', 'iOS']
const vulnerabilityTypes = ['OWASP Top 10', 'SANS Top 25', 'Business Logic', 'Emerging Threats']

export default function SecurityScannerExtension() {
  const [selectedProjectType, setSelectedProjectType] = useState<string>(projectTypes[0])
  const [selectedVulnerabilities, setSelectedVulnerabilities] = useState<string[]>([])
  const [scanResults, setScanResults] = useState<any>(null)
  const [isScanning, setIsScanning] = useState(false)
  const [activePage, setActivePage] = useState('dashboard')

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
      setActivePage('results')
    }, 3000)
  }

  const renderActivePage = () => {
    switch (activePage) {
      case 'dashboard':
        return (
          <Dashboard
            onScan={handleScan}
            isScanning={isScanning}
            vulnerabilityTypes={vulnerabilityTypes}
            selectedVulnerabilities={selectedVulnerabilities}
            onVulnerabilityChange={setSelectedVulnerabilities}
          />
        )
      case 'results':
        return <ScanResults results={scanResults} />
      case 'ai':
        return <AIRecommendations results={scanResults} />
      case 'rewrite':
        return <AICodeRewrite vulnerabilities={scanResults?.vulnerabilities ?? []} />
      case 'visualization':
        return <VulnerabilityVisualization vulnerabilities={scanResults?.vulnerabilities ?? []} />
      case 'collaboration':
        return <RealTimeCollaboration />
      case 'gamification':
        return <SecurityGameification />
      case 'nlq':
        return <NaturalLanguageQuery />
      case 'predictive':
        return <PredictiveAnalysis />
      case 'secure-gen':
        return <SecureCodeGeneration />
      case 'pentest':
        return <AutomatedPenetrationTesting />
      case 'debt':
        return <SecurityDebtTracker />
      case 'settings':
        return <SettingsPanel />
      default:
        return <Dashboard onScan={handleScan} isScanning={isScanning} vulnerabilityTypes={vulnerabilityTypes} selectedVulnerabilities={selectedVulnerabilities} onVulnerabilityChange={setSelectedVulnerabilities} />
    }
  }

  return (
    <Layout
      sidebar={
        <Sidebar
          projectTypes={projectTypes}
          selectedProjectType={selectedProjectType}
          onProjectTypeChange={setSelectedProjectType}
          activePage={activePage}
          setActivePage={setActivePage}
        />
      }
      onScan={handleScan}
      isScanning={isScanning}
    >
      {renderActivePage()}
    </Layout>
  )
}

