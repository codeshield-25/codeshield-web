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
import type { OpenSourceSecurity, CodeSecurity, ConfigSecurity } from "../../types/security-types"

interface SecurityVisualizationProps {
  openSourceData: OpenSourceSecurity
  codeSecurityData: CodeSecurity
  configData: ConfigSecurity
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
}: SecurityVisualizationProps) {
  // Prepare data for charts
  const openSourceSeverityData = [
    { name: "High", value: openSourceData.vulnerabilities.filter((v) => v.severity.toLowerCase() === "high").length },
    {
      name: "Medium",
      value: openSourceData.vulnerabilities.filter((v) => v.severity.toLowerCase() === "medium").length,
    },
    { name: "Low", value: openSourceData.vulnerabilities.filter((v) => v.severity.toLowerCase() === "low").length },
  ]

  const codeSeverityData = [
    { name: "High", value: codeSecurityData.runs[0]?.results.filter((r) => r.level === "error").length || 0 },
    { name: "Medium", value: codeSecurityData.runs[0]?.results.filter((r) => r.level === "warning").length || 0 },
    { name: "Low", value: codeSecurityData.runs[0]?.results.filter((r) => r.level === "note").length || 0 },
  ]

  const overallSeverityData = [
    { name: "High", value: openSourceSeverityData[0].value + codeSeverityData[0].value },
    { name: "Medium", value: openSourceSeverityData[1].value + codeSeverityData[1].value },
    { name: "Low", value: openSourceSeverityData[2].value + codeSeverityData[2].value },
  ]

  const vulnerabilityTrendData = [
    { name: "Jan", count: 5 },
    { name: "Feb", count: 8 },
    { name: "Mar", count: 12 },
    { name: "Apr", count: 7 },
    { name: "May", count: 15 },
    { name: "Jun", count: 10 },
  ]

  const vulnerabilityTypeData = openSourceData.vulnerabilities.reduce(
    (acc, vuln) => {
      const type = vuln.identifiers.CWE ? vuln.identifiers.CWE[0] : "Unknown"
      acc[type] = (acc[type] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const vulnerabilityTypeChartData = Object.entries(vulnerabilityTypeData)
    .map(([type, count]) => ({ name: type, value: count }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5) // Top 5 vulnerability types

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="opensource">Open Source</TabsTrigger>
          <TabsTrigger value="codesecurity">Code Security</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
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
        </TabsContent>

        <TabsContent value="opensource">
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
        </TabsContent>

        <TabsContent value="codesecurity">
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
        </TabsContent>
      </Tabs>
    </div>
  )
}

