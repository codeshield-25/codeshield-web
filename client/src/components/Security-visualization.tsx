"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Cell,
  Legend,
  Tooltip,
} from "recharts"
import type { OpenSourceSecurity, CodeSecurity, ConfigSecurity, TeamStats } from "../../types/security-types"
import { ScanLine } from "lucide-react"

interface SecurityVisualizationProps {
  openSourceData?: OpenSourceSecurity
  codeSecurityData?: CodeSecurity
  configData?: ConfigSecurity
  teamStats?: TeamStats
}

const COLORS = {
  High: "#ef4444",
  Medium: "#f97316",
  Low: "#eab308",
}

export default function SecurityVisualization({
  openSourceData,
  codeSecurityData,
  configData,
  teamStats,
}: SecurityVisualizationProps) {
  // Prepare data for charts
  const openSourceSeverityData = openSourceData
    ? [
        {
          name: "High",
          value: openSourceData.vulnerabilities.filter((v) => v.severity.toLowerCase() === "high").length,
        },
        {
          name: "Medium",
          value: openSourceData.vulnerabilities.filter((v) => v.severity.toLowerCase() === "medium").length,
        },
        { name: "Low", value: openSourceData.vulnerabilities.filter((v) => v.severity.toLowerCase() === "low").length },
      ]
    : null

  const codeSeverityData = codeSecurityData
    ? [
        { name: "High", value: codeSecurityData.runs[0]?.results.filter((r) => r.level === "error").length || 0 },
        { name: "Medium", value: codeSecurityData.runs[0]?.results.filter((r) => r.level === "warning").length || 0 },
        { name: "Low", value: codeSecurityData.runs[0]?.results.filter((r) => r.level === "note").length || 0 },
      ]
    : null

  const overallSeverityData = teamStats && (teamStats.avgHighVulCnt>0 || teamStats.avgMidVulCnt>0 || teamStats.avgLowVulCnt>0)
    ? [
        { name: "High", value: teamStats.avgHighVulCnt },
        { name: "Medium", value: teamStats.avgMidVulCnt },
        { name: "Low", value: teamStats.avgLowVulCnt },
      ]
    : null

  const vulnerabilityTrendData = [
    { name: "Sep", count: 5 },
    { name: "Oct", count: 8 },
    { name: "Nov", count: 12 },
    { name: "Dec", count: 7 },
    { name: "Jan", count: 13 },
    { name: "Feb", count: 10 },
  ]

  const vulnerabilityTypeData = openSourceData
    ? openSourceData.vulnerabilities.reduce(
        (acc, vuln) => {
          const type = vuln.identifiers.CWE ? vuln.identifiers.CWE[0] : "Unknown"
          acc[type] = (acc[type] || 0) + 1
          return acc
        },
        {} as Record<string, number>,
      )
    : {}

  const vulnerabilityTypeChartData = Object.entries(vulnerabilityTypeData)
    .map(([type, count]) => ({ name: type, value: count }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5) // Top 5 vulnerability types

  const issueTypeData =
    codeSecurityData?.runs[0]?.tool.driver.rules.reduce(
      (acc, rule) => {
        rule.properties.cwe.forEach((cwe) => {
          acc[cwe] = (acc[cwe] || 0) + 1
        })
        return acc
      },
      {} as Record<string, number>,
    ) || {}

  const issueTypeChartData = Object.entries(issueTypeData)
    .map(([cwe, count]) => ({ name: cwe, value: count }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5) // Top 5 CWE vulnerabilities

  const renderPlaceholder = () => (
    <Card className="w-full">
      <CardContent className="flex flex-col items-center text-center py-8">
        <ScanLine className="h-16 w-16 dark:text-primary mb-4 animate-pulse" />
        <p className="text-muted-foreground mb-4">Start a new scan to view security insights for your project.</p>
      </CardContent>
    </Card>
  )

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="opensource">Open Source</TabsTrigger>
          <TabsTrigger value="codesecurity">Code Security</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {!overallSeverityData ? (
            renderPlaceholder()
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Overall Vulnerability Severity</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={overallSeverityData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {overallSeverityData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Vulnerability Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={vulnerabilityTrendData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="count" stroke="#8884d8" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="opensource">
          {!openSourceSeverityData ? (
            renderPlaceholder()
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Open Source Vulnerability Severity</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={openSourceSeverityData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {openSourceSeverityData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top 5 Vulnerability Types</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={vulnerabilityTypeChartData} layout="vertical">
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={150} />
                      <Tooltip />
                      <Bar dataKey="value" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="codesecurity">
          {!codeSeverityData ? (
            renderPlaceholder()
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Code Security Issues Severity</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={codeSeverityData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {codeSeverityData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top 5 Code Issues Type</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={issueTypeChartData} layout="vertical">
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={150} />
                      <Tooltip />
                      <Bar dataKey="value" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

