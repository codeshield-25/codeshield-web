import { useState, useEffect } from "react"
import { Layout } from "./Layout"
import { Sidebar } from "./Sidebar"
import Dashboard from "./Dashboard"
import ScanResults from "./ScanResults"
import AIRecommendations from "./AIRecommendations"
import AICodeRewrite from "./AICodeRewrite"
import SecurityVisualizationDashboard from "./SecurityVisualizationDashboard"
import RealTimeCollaboration from "./RealTimeCollaboration"
import SecurityGameification from "./SecurityGameification"
import NaturalLanguageQuery from "./NaturalLanguageQuery"
import PredictiveAnalysis from "./PredictiveAnalysis"
import SecureCodeGeneration from "./SecureCodeGeneration"
import AutomatedPenetrationTesting from "./AutomatedPenetrationTesting"
import SecurityDebtTracker from "./SecurityDebtTracker"
import SettingsPanel from "./SettingsPanel"
import CreateTeam from "./CreateTeam"
import JoinTeam from "./JoinTeam"
import LoginPage from "./LoginPage"
import DonationPage from "./DonationPage"
import { useAuth } from "./AuthContext"
import { db } from "./firebaseConfig"
import { collection, query, where, onSnapshot } from "firebase/firestore"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import openSourceData from "../assets/opensource.json"
import codeSecurityData from "../assets/codesecurity.json"
import configData from "../assets/config.json"

const vulnerabilityTypes = ["OWASP Top 10", "SANS Top 25", "Business Logic", "Emerging Threats"]

interface Team {
  id: string
  name: string
  repository: string
}

export default function SecurityScannerExtension() {
  const { user } = useAuth()
  const [teams, setTeams] = useState<Team[]>([])
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null)
  const [selectedVulnerabilities, setSelectedVulnerabilities] = useState<string[]>([])
  const [scanResults, setScanResults] = useState<any>(null)
  const [isScanning, setIsScanning] = useState(false)
  const [activePage, setActivePage] = useState("dashboard")
  const [showJoinTeamDialog, setShowJoinTeamDialog] = useState(false)
  const [repoUrl, setRepoUrl] = useState<string>("")

  useEffect(() => {
    if (!user) return

    const teamsRef = collection(db, "teams")
    const q = query(teamsRef, where("members", "array-contains", user.uid))

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const teamsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Team[]
      setTeams(teamsData)

      if (teamsData.length > 0 && !selectedTeam) {
        setSelectedTeam(teamsData[0].id)
        setRepoUrl(teamsData[0].repository)
      }
    })

    return () => unsubscribe()
  }, [user, selectedTeam])

  const handleScan = () => {
    setIsScanning(true)
    // Simulating a scan process
    setTimeout(() => {
      setScanResults({
        vulnerabilities: [
          { id: 1, type: "OWASP Top 10", name: "Injection", severity: "High", location: "src/main.js:42" },
          {
            id: 2,
            type: "SANS Top 25",
            name: "Use of Hard-coded Credentials",
            severity: "Medium",
            location: "src/auth/login.js:15",
          },
          {
            id: 3,
            type: "Business Logic",
            name: "Insufficient Access Control",
            severity: "High",
            location: "src/api/users.js:78",
          },
          {
            id: 4,
            type: "Emerging Threats",
            name: "API Key Exposure",
            severity: "Medium",
            location: "src/config/api.js:5",
          },
        ],
      })
      setIsScanning(false)
      setActivePage("results")
    }, 3000)
  }

  const handleTeamChange = (teamId: string) => {
    if (teamId === "create") {
      setActivePage("create-team")
    } else if (teamId === "join") {
      setShowJoinTeamDialog(true)
    } else {
      const selectedTeam = teams.find((team) => team.id === teamId)
      if (selectedTeam) {
        setSelectedTeam(teamId)
        setRepoUrl(selectedTeam.repository)
      }
    }
  }

  const renderActivePage = () => {
    switch (activePage) {
      case "dashboard":
        return (
          <Dashboard
            onScan={handleScan}
            isScanning={isScanning}
            vulnerabilityTypes={vulnerabilityTypes}
            selectedVulnerabilities={selectedVulnerabilities}
            onVulnerabilityChange={setSelectedVulnerabilities}
            initialRepoUrl={repoUrl}
          />
        )
      case "results":
        return (
          <ScanResults openSourceData={openSourceData} codeSecurityData={codeSecurityData} configData={configData} />
        )
      case "ai":
        return <AIRecommendations results={scanResults} vulnerabilities={scanResults?.vulnerabilities ?? []} />
      case "rewrite":
        return <AICodeRewrite vulnerabilities={scanResults?.vulnerabilities ?? []} />
      case "visualization":
        return (
          <SecurityVisualizationDashboard
            openSourceData={openSourceData}
            codeSecurityData={codeSecurityData}
            configData={configData}
          />
        )
      case "collaboration":
        return selectedTeam ? (
          <RealTimeCollaboration
            teamId={selectedTeam}
            teamName={teams.find((team) => team.id === selectedTeam)?.name || "Team"}
          />
        ) : (
          <div>Please select a team to use the collaboration feature.</div>
        )
      case "gamification":
        return <SecurityGameification />
      case "nlq":
        return <NaturalLanguageQuery />
      case "predictive":
        return <PredictiveAnalysis />
      case "secure-gen":
        return <SecureCodeGeneration />
      case "pentest":
        return <AutomatedPenetrationTesting />
      case "debt":
        return <SecurityDebtTracker />
      case "donation":
        return <DonationPage />
      case "settings":
        return <SettingsPanel />
      case "create-team":
        return <CreateTeam onClose={() => setActivePage("dashboard")} />
      default:
        return (
          <Dashboard
            onScan={handleScan}
            isScanning={isScanning}
            vulnerabilityTypes={vulnerabilityTypes}
            selectedVulnerabilities={selectedVulnerabilities}
            onVulnerabilityChange={setSelectedVulnerabilities}
            initialRepoUrl={repoUrl}
          />
        )
    }
  }

  if (!user) {
    return <LoginPage />
  }

  return (
    <Layout
      sidebar={
        <Sidebar
          teams={teams}
          selectedTeam={selectedTeam}
          onTeamChange={handleTeamChange}
          activePage={activePage}
          setActivePage={setActivePage}
        />
      }
      onScan={handleScan}
      isScanning={isScanning}
    >
      {renderActivePage()}
      <Dialog open={showJoinTeamDialog} onOpenChange={setShowJoinTeamDialog}>
        <DialogContent>
          <JoinTeam onClose={() => setShowJoinTeamDialog(false)} />
        </DialogContent>
      </Dialog>
    </Layout>
  )
}

