export interface SecurityPattern {
    name: string
    path: string
  }
  
  export interface Language {
    name: string
    patterns: SecurityPattern[]
  }
  
  export interface CodeViewerProps {
    code: string
    language: string
    fileName: string
  }
  