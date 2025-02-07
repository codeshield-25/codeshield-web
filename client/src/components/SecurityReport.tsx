import type React from "react"
import { Document, Page, Text, View, PDFViewer, Font, StyleSheet } from "@react-pdf/renderer"
import type { OpenSourceSecurity, CodeSecurity, ConfigSecurity, TeamStats } from "../../types/security-types"
import { toast } from "@/hooks/use-toast"

// Register fonts
// Font.register({
//   family: "Inter",
//   fonts: [
//     { src: "/fonts/Inter-Regular.woff2", fontWeight: 400 },
//     { src: "/fonts/Inter-Medium.woff2", fontWeight: 500 },
//     { src: "/fonts/Inter-SemiBold.woff2", fontWeight: 600 },
//     { src: "/fonts/Inter-Bold.woff2", fontWeight: 700 },
//   ],
// })

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 40,
    // fontFamily: "Inter",
  },
  section: {
    margin: 10,
    padding: 10,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    color: "#111827",
  },
  subheader: {
    fontSize: 18,
    marginBottom: 15,
    marginTop: 25,
    color: "#374151",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    paddingBottom: 5,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
    color: "#4B5563",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    marginBottom: 15,
  },
  statBox: {
    padding: 15,
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
    width: "30%",
  },
  statTitle: {
    fontSize: 10,
    color: "#6B7280",
    marginBottom: 5,
  },
  statValue: {
    fontSize: 20,
    color: "#111827",
    fontWeight: "bold",
  },
  severityHigh: {
    color: "#DC2626",
  },
  severityMedium: {
    color: "#F59E0B",
  },
  severityLow: {
    color: "#10B981",
  },
  tableContainer: {
    width: "100%",
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    minHeight: 30,
    alignItems: "center",
  },
  tableHeader: {
    backgroundColor: "#F9FAFB",
  },
  tableCell: {
    flex: 1,
    padding: 8,
    fontSize: 10,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    fontSize: 10,
    color: "#9CA3AF",
    textAlign: "center",
  },
})

interface SecurityReportProps {
  openSourceData: OpenSourceSecurity | null
  codeSecurityData: CodeSecurity | null
  configData: ConfigSecurity | null
  teamStats: TeamStats | null
  projectName: string
}

const SecurityReport: React.FC<SecurityReportProps> = ({
  openSourceData,
  codeSecurityData,
  configData,
  teamStats,
  projectName,
}) => {
  // Check if all required data is available
  if (!openSourceData || !codeSecurityData || !configData || !teamStats) {
    toast({
      title: "Missing Data",
      description: "Please perform a security scan first to generate the report.",
      variant: "destructive",
    })
    return null
  }

  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  // Calculate statistics
  const vulnerabilityStats = {
    high: openSourceData.vulnerabilities.filter((v) => v.severity === "high").length,
    medium: openSourceData.vulnerabilities.filter((v) => v.severity === "medium").length,
    low: openSourceData.vulnerabilities.filter((v) => v.severity === "low").length,
  }

  const codeSecurityStats = {
    high: codeSecurityData.runs[0]?.results.filter((r) => r.level === "error").length || 0,
    medium: codeSecurityData.runs[0]?.results.filter((r) => r.level === "warning").length || 0,
    low: codeSecurityData.runs[0]?.results.filter((r) => r.level === "note").length || 0,
  }

  // Get top 5 CWE vulnerabilities
  const cweVulnerabilities = openSourceData.vulnerabilities.reduce(
    (acc, vuln) => {
      if (vuln.identifiers.CWE) {
        vuln.identifiers.CWE.forEach((cwe) => {
          acc[cwe] = (acc[cwe] || 0) + 1
        })
      }
      return acc
    },
    {} as Record<string, number>,
  )

  const topCWEs = Object.entries(cweVulnerabilities)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)

  return (
    <PDFViewer style={{ width: "100%", height: "100vh" }}>
      <Document>
        <Page size="A4" style={styles.page}>
          {/* Header */}
          <View style={styles.section}>
            <Text style={styles.header}>Security Scan Report</Text>
            <Text style={styles.text}>{projectName}</Text>
            <Text style={styles.text}>Generated on {currentDate}</Text>
          </View>

          {/* Executive Summary */}
          <View style={styles.section}>
            <Text style={styles.subheader}>Executive Summary</Text>
            <Text style={styles.text}>
              This report provides a comprehensive security analysis of the {projectName} project, including open source
              vulnerabilities, code security issues, and configuration status.
            </Text>

            <View style={styles.statsContainer}>
              <View style={styles.statBox}>
                <Text style={styles.statTitle}>Total Dependencies</Text>
                <Text style={styles.statValue}>{openSourceData.dependencyCount}</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statTitle}>Total Vulnerabilities</Text>
                <Text style={styles.statValue}>
                  {openSourceData.vulnerabilities.length + codeSecurityData.runs[0]?.results.length}
                </Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statTitle}>Critical Issues</Text>
                <Text style={[styles.statValue, styles.severityHigh]}>
                  {vulnerabilityStats.high + codeSecurityStats.high}
                </Text>
              </View>
            </View>
          </View>

          {/* Vulnerability Summary */}
          <View style={styles.section}>
            <Text style={styles.subheader}>Vulnerability Summary</Text>
            <View style={styles.tableContainer}>
              <View style={[styles.tableRow, styles.tableHeader]}>
                <Text style={styles.tableCell}>Severity</Text>
                <Text style={styles.tableCell}>Open Source</Text>
                <Text style={styles.tableCell}>Code Security</Text>
                <Text style={styles.tableCell}>Total</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, styles.severityHigh]}>High</Text>
                <Text style={styles.tableCell}>{vulnerabilityStats.high}</Text>
                <Text style={styles.tableCell}>{codeSecurityStats.high}</Text>
                <Text style={styles.tableCell}>{vulnerabilityStats.high + codeSecurityStats.high}</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, styles.severityMedium]}>Medium</Text>
                <Text style={styles.tableCell}>{vulnerabilityStats.medium}</Text>
                <Text style={styles.tableCell}>{codeSecurityStats.medium}</Text>
                <Text style={styles.tableCell}>{vulnerabilityStats.medium + codeSecurityStats.medium}</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, styles.severityLow]}>Low</Text>
                <Text style={styles.tableCell}>{vulnerabilityStats.low}</Text>
                <Text style={styles.tableCell}>{codeSecurityStats.low}</Text>
                <Text style={styles.tableCell}>{vulnerabilityStats.low + codeSecurityStats.low}</Text>
              </View>
            </View>
          </View>

          {/* Top Vulnerabilities */}
          <View style={styles.section}>
            <Text style={styles.subheader}>Top CWE Vulnerabilities</Text>
            <View style={styles.tableContainer}>
              <View style={[styles.tableRow, styles.tableHeader]}>
                <Text style={styles.tableCell}>CWE</Text>
                <Text style={styles.tableCell}>Count</Text>
              </View>
              {topCWEs.map(([cwe, count]) => (
                <View style={styles.tableRow} key={cwe}>
                  <Text style={styles.tableCell}>{cwe}</Text>
                  <Text style={styles.tableCell}>{count}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Trend Analysis */}
          <View style={styles.section}>
            <Text style={styles.subheader}>Historical Trend</Text>
            <Text style={styles.text}>Average vulnerability counts over time:</Text>
            <View style={styles.tableContainer}>
              <View style={[styles.tableRow, styles.tableHeader]}>
                <Text style={styles.tableCell}>Severity</Text>
                <Text style={styles.tableCell}>Average Count</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, styles.severityHigh]}>High</Text>
                <Text style={styles.tableCell}>{teamStats.avgHighVulCnt.toFixed(2)}</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, styles.severityMedium]}>Medium</Text>
                <Text style={styles.tableCell}>{teamStats.avgMidVulCnt.toFixed(2)}</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, styles.severityLow]}>Low</Text>
                <Text style={styles.tableCell}>{teamStats.avgLowVulCnt.toFixed(2)}</Text>
              </View>
            </View>
          </View>

          {/* Configuration Status */}
          <View style={styles.section}>
            <Text style={styles.subheader}>Configuration Status</Text>
            <Text style={[styles.text, configData.ok ? styles.severityLow : styles.severityHigh]}>
              {configData.ok
                ? "✓ No configuration issues detected"
                : `⚠ ${configData.error || "Configuration issues detected"}`}
            </Text>
          </View>

          {/* Footer */}
          <Text style={styles.footer}>Generated by CodeShield • {currentDate}</Text>
        </Page>
      </Document>
    </PDFViewer>
  )
}

export default SecurityReport

