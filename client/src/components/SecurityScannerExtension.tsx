import { useState, useEffect } from "react"
import { Layout } from "./Layout"
import { Sidebar } from "./Sidebar"
import Dashboard from "./Dashboard"
import ScanResults from "./ScanResults"
import AIRecommendations from "./AIRecommendations"
import AICodeRewrite from "./AICodeRewrite"
import SecurityVisualizationDashboard from "./SecurityVisualizationDashboard"
import RealTimeCollaboration from "./TeamChat"
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
import { collection, query, where, onSnapshot, doc, getDoc, updateDoc } from "firebase/firestore"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { toast } from "@/hooks/use-toast"
// import openSourceData from "../assets/opensource.json"
// import codeSecurityData from "../assets/codesecurity.json"
import configData from "../assets/config.json"
import { TeamStats,Team } from "../../types/security-types"

const vulnerabilityTypes = ["OWASP Top 10", "SANS Top 25", "Business Logic", "Emerging Threats"]



export default function SecurityScannerExtension() {
  const { user } = useAuth()
  const [teams, setTeams] = useState<Team[]>([])
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null)
  // const selectedTeamStats = teams.find((team) => team.id === selectedTeam)?.teamStats || {
  //   avgHighVulCnt: 0,
  //   avgMidVulCnt: 0,
  //   avgLowVulCnt: 0
  // }
  // const [selectedTeamStats, setSelectedTeamStats] = useState<TeamStats> 
  const [selectedVulnerabilities, setSelectedVulnerabilities] = useState<string[]>([])
  const [scanResults, setScanResults] = useState<any>(null)
  const [isScanning, setIsScanning] = useState(false)
  const [activePage, setActivePage] = useState("dashboard")
  const [showJoinTeamDialog, setShowJoinTeamDialog] = useState(false)
  const [repoUrl, setRepoUrl] = useState<string>("")
  const [openSourceData, setOpenSourceData] = useState<any>(null)
  const [codeSecurityData, setCodeSecurityData] = useState<any>(null)

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
      setOpenSourceData(null)
      setCodeSecurityData(null) 

      if (teamsData.length > 0 && !selectedTeam) {
        setSelectedTeam(teamsData[0].id)
        // selectedTeamStats(teamsData[0].teamStats)
        setRepoUrl(teamsData[0].repository)
      }
    })

    return () => unsubscribe()
  }, [user, selectedTeam])

  const updateTeamStats = async (teamId: string, newStats: TeamStats) => {
    const teamRef = doc(db, "teams", teamId)
    const teamDoc = await getDoc(teamRef)

    if (teamDoc.exists()) {
      const currentStat = teamDoc.data()?.teamStats ?? null;
      const updatedStats = {
        avgHighVulCnt: currentStat?.avgHighVulCnt && currentStat.avgHighVulCnt !== 0 
          ? (currentStat.avgHighVulCnt + newStats.avgHighVulCnt) / 2 
          : newStats.avgHighVulCnt,
      
        avgMidVulCnt: currentStat?.avgMidVulCnt && currentStat.avgMidVulCnt !== 0 
          ? (currentStat.avgMidVulCnt + newStats.avgMidVulCnt) / 2 
          : newStats.avgMidVulCnt,
      
        avgLowVulCnt: currentStat?.avgLowVulCnt && currentStat.avgLowVulCnt !== 0 
          ? (currentStat.avgLowVulCnt + newStats.avgLowVulCnt) / 2 
          : newStats.avgLowVulCnt
      }

      await updateDoc(teamRef, { teamStats: updatedStats });
    }
  }

  const handleScan = async () => {
    // setIsScanning(true)
    // // Simulating a scan process
    // setTimeout(() => {
    //   setScanResults({
    //     vulnerabilities: [
    //       { id: 1, type: "OWASP Top 10", name: "Injection", severity: "High", location: "src/main.js:42" },
    //       {
    //         id: 2,
    //         type: "SANS Top 25",
    //         name: "Use of Hard-coded Credentials",
    //         severity: "Medium",
    //         location: "src/auth/login.js:15",
    //       },
    //       {
    //         id: 3,
    //         type: "Business Logic",
    //         name: "Insufficient Access Control",
    //         severity: "High",
    //         location: "src/api/users.js:78",
    //       },
    //       {
    //         id: 4,
    //         type: "Emerging Threats",
    //         name: "API Key Exposure",
    //         severity: "Medium",
    //         location: "src/config/api.js:5",
    //       },
    //     ],
    //   })
    //   setIsScanning(false)
    //   setActivePage("results")
    // }, 3000)
    setIsScanning(true)
    try {
      // Open Source Security Scan
      const openSourceResponse = await fetch("http://localhost:3000/scan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ repoUrl, scanType: "open_source" }),
      })
      const openSourceResult = await openSourceResponse.json()
      setOpenSourceData(openSourceResult)

      // Code Security Scan
      const codeSecurityResponse = await fetch("http://localhost:3000/scan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ repoUrl, scanType: "code_security" }),
      })
      const codeSecurityResult = await codeSecurityResponse.json()
      setCodeSecurityData(codeSecurityResult)

      // Set scan results and navigate to results page
      setScanResults({
        vulnerabilities: [...(openSourceResult.vulnerabilities || []), ...(codeSecurityResult.vulnerabilities || [])],
      })

      // Update team stats in Firebase
      if (selectedTeam) {
        const newStats = {
          avgHighVulCnt: openSourceResult.vulnerabilities.filter((v: any) => v.severity === "high").length + codeSecurityResult.runs[0].results.filter((r: any) => r.level === "error").length,
          avgMidVulCnt: openSourceResult.vulnerabilities.filter((v: any) => v.severity === "medium").length + codeSecurityResult.runs[0].results.filter((r: any) => r.level === "warning").length,
          avgLowVulCnt: openSourceResult.vulnerabilities.filter((v: any) => v.severity === "low").length + codeSecurityResult.runs[0].results.filter((r: any) => r.level === "note").length,
        }
        await updateTeamStats(selectedTeam, newStats)
      }

      setActivePage("results")
      toast({
        title: "Scan Completed",
        description: "Vulnerability scan has been completed successfully.",
      })
    } catch (error) {
      console.error("Error during scan:", error)
      toast({
        title: "Scan Failed",
        description: "An error occurred during the scan. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsScanning(false)
    }
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
          <ScanResults openSourceData={openSourceData} codeSecurityData={codeSecurityData} configData={configData} handleScan={handleScan} isScanning={isScanning} />
        )
      case "ai":
        return <AIRecommendations codeSecurityData={codeSecurityData} handleScan={handleScan} isScanning={isScanning} />
      case "rewrite":
        return <AICodeRewrite vulnerabilities={scanResults?.vulnerabilities ?? []} />
      case "visualization":
        return (
          <SecurityVisualizationDashboard
            openSourceData={openSourceData}
            codeSecurityData={codeSecurityData}
            configData={configData}
            teamStats={teams.find((team) => team.id === selectedTeam)?.teamStats || { avgHighVulCnt: 0, avgMidVulCnt: 0, avgLowVulCnt: 0 }}
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
      handleScan={handleScan}
      isScanning={isScanning}
      openSourceData={openSourceData}
      codeSecurityData={codeSecurityData}
      configData={configData}
      teamStats={teams.find((team) => team.id === selectedTeam)?.teamStats || { avgHighVulCnt: 0, avgMidVulCnt: 0, avgLowVulCnt: 0 }}
      projectName="Camp-Ground"
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

