export interface Vulnerability {
  title: string
  exploit: string
  severity: string
  cvssScore: string
  CVSSv3: string
  moduleName: string
  references: { url: string; title: string }[]
  description: string
  identifiers: { CVE?: string[]; CWE?: string[]; GHSA?: string[] }
  from: string[]
  upgradePath: (string | false)[];
}

export interface OpenSourceSecurity {
  vulnerabilities: Vulnerability[]
  dependencyCount: number
  uniqueCount: number
}

export interface CodeSecurityResult {
  ruleId: string
  level: string
  message: {
    text: string
  }
  locations: Array<{
    physicalLocation: {
      artifactLocation: {
        uri: string
      }
      region: {
        startLine: number
        endLine: number
      }
    }
  }>
}

export interface CodeSecurity {
  runs: Array<{
    results: CodeSecurityResult[]
  }>
}

export interface ConfigSecurity {
  ok: boolean
  code: number
  error?: string
}
