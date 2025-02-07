"use client"

import SecurityVisualization from "./Security-visualization"
import type { OpenSourceSecurity, CodeSecurity, ConfigSecurity, TeamStats } from "../../types/security-types"

interface SecurityDashboardProps {
  openSourceData: OpenSourceSecurity
  codeSecurityData: CodeSecurity
  configData: ConfigSecurity
  teamStats: TeamStats
}

export default function SecurityDashboard({ openSourceData, codeSecurityData, configData, teamStats }: SecurityDashboardProps) {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Security Dashboard</h1>
      <SecurityVisualization
        openSourceData={openSourceData}
        codeSecurityData={codeSecurityData}
        configData={configData}
        teamStats={teamStats}
      />
    </div>
  )
}

