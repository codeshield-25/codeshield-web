export interface Vulnerability {
  id: string
  title: string
  exploit: string
  fixedIn: string[]
  severity: string
  cvssScore: number
  CVSSv3: string
  moduleName: string
  version: string
  references: { url: string; title: string }[]
  description: string
  identifiers: { CVE?: string[]; CWE?: string[]; GHSA?: string[] }
  from: string[]
  upgradePath: (string | boolean)[]
}

export interface OpenSourceSecurity {
  vulnerabilities: Vulnerability[]
  dependencyCount: number
  uniqueCount: number
}

export interface Rule {
  id: string;
  shortDescription: { text: string };
  defaultConfiguration: { level: string };
  help: { markdown: string };
  properties: { 
    exampleCommitFixes: Array<{
      commitURL: string;
      lines: Array<{
        line: string;
        lineNumber: number;
        lineChange: string;
      }>;
    }>;
    repoDatasetSize: number;
    cwe: string[]
  };
}

export interface Result {
  ruleId: string
  ruleIndex: number
  level: string
  message: { text: string }
  locations: Array<{
    physicalLocation: {
      artifactLocation: {
        uri: string
      }
      region: {
        startLine: number
      }
    }
  }>
  properties: {
    priorityScore: number
  }
}

export interface CodeSecurity {
  runs: Array<{
    tool: {
      driver: {
        rules: Rule[]
      }
    }
    results: Result[]
  }>
}

export interface ConfigSecurity {
  ok: boolean
  code: number
  error?: string
}

export interface TeamStats {
  avgHighVulCnt: number;
  avgMidVulCnt: number;
  avgLowVulCnt: number;
}

export interface Team {
  id: string;
  name: string;
  repository: string;
  teamStats: TeamStats;
}