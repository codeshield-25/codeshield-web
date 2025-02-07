// import type React from "react"
// import { Button } from "@/components/ui/button"
// import { Shield, Play, FileText, Settings } from "lucide-react"

// interface LayoutProps {
//   children: React.ReactNode
//   sidebar: React.ReactNode
//   handleScan: () => void
//   isScanning: boolean
// }

// export function Layout({ children, sidebar, handleScan, isScanning }: LayoutProps) {
//   return (
//     <div className="flex h-screen bg-background text-foreground">
//       {/* Sidebar */}
//       <div className="w-64 h-screen fixed left-0 top-0 bg-background border-r">{sidebar}</div>

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col ml-64">
//         {/* Header */}
//         <header className="h-14 border-b px-4 flex items-center justify-between bg-card">
//           <div className="flex items-center gap-2">
//             <Shield className="h-6 w-6 text-primary" />
//             <h1 className="text-lg font-semibold">CodeShield</h1>
//           </div>
//           <div className="flex space-x-2">
//             <Button variant="outline" size="sm" onClick={handleScan} disabled={isScanning}>
//               <Play className="w-4 h-4 mr-2" />
//               {isScanning ? "Scanning..." : "Quick Scan"}
//             </Button>
//             <Button variant="outline" size="sm">
//               <FileText className="w-4 h-4 mr-2" />
//               Generate Report
//             </Button>
//             <Button variant="outline" size="sm">
//               <Settings className="w-4 h-4 mr-2" />
//               Configure AI
//             </Button>
//           </div>
//         </header>

//         {/* Content Area */}
//         <main className="flex-1 overflow-auto p-8">{children}</main>
//       </div>
//     </div>
//   )
// }

import type React from "react"
import { Button } from "@/components/ui/button"
import { Shield, Play, FileText, Settings } from "lucide-react"
import SecurityReport from "./SecurityReport"
import { useState } from "react"
import { toast } from "@/hooks/use-toast"

interface LayoutProps {
  children: React.ReactNode
  sidebar: React.ReactNode
  handleScan: () => void
  isScanning: boolean
  openSourceData: any | null
  codeSecurityData: any | null
  configData: any | null
  teamStats: any | null
  projectName: string
}

export function Layout({
  children,
  sidebar,
  handleScan,
  isScanning,
  openSourceData,
  codeSecurityData,
  configData,
  teamStats,
  projectName,
}: LayoutProps) {
  const [showReport, setShowReport] = useState(false)

  const handleGenerateReport = () => {
    if (!openSourceData || !codeSecurityData || !configData || !teamStats) {
      toast({
        title: "Missing Data",
        description: "Please perform a security scan first to generate the report.",
        variant: "destructive",
      })
      return
    }
    setShowReport(true)
  }

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar */}
      <div className="w-64 h-screen fixed left-0 top-0 bg-background border-r">{sidebar}</div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-64">
        {/* Header */}
        <header className="h-14 border-b px-4 flex items-center justify-between bg-card">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <h1 className="text-lg font-semibold">CodeShield</h1>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={handleScan} disabled={isScanning}>
              <Play className="w-4 h-4 mr-2" />
              {isScanning ? "Scanning..." : "Quick Scan"}
            </Button>
            <Button variant="outline" size="sm" onClick={handleGenerateReport}>
              <FileText className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Configure AI
            </Button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-8">
          {showReport ? (
            <SecurityReport
              openSourceData={openSourceData}
              codeSecurityData={codeSecurityData}
              configData={configData}
              teamStats={teamStats}
              projectName={projectName}
            />
          ) : (
            children
          )}
        </main>
      </div>
    </div>
  )
}