interface Language {
    name: string
    patterns: SecurityPattern[]
  }
  
  interface SecurityPattern {
    name: string
    path: string
  }
  
  const GITHUB_API_URL = "https://api.github.com/repos/harshal-tg/CodeShieldSecureCode/contents"
  const GITHUB_RAW_URL = "https://raw.githubusercontent.com/harshal-tg/CodeShieldSecureCode/main"
  
  export async function fetchRepoStructure(): Promise<Language[]> {
    const response = await fetch(GITHUB_API_URL)
    if (!response.ok) throw new Error("Failed to fetch repository structure")
    const data = await response.json()
  
    const languages: Language[] = []
  
    for (const item of data) {
      if (item.type === "dir") {
        const languageResponse = await fetch(`${GITHUB_API_URL}/${item.name}`)
        const languageData = await languageResponse.json()
  
        const patterns: SecurityPattern[] = languageData
          .filter((file: any) => file.type === "file")
          .map((file: any) => ({
            name: file.name.replace(/\.[^/.]+$/, "").replace(/_/g, " "),
            path: file.path,
          }))
  
        languages.push({
          name: item.name,
          patterns: patterns,
        })
      }
    }
  
    return languages
  }
  
  export async function fetchSecureCode(language: string, patternPath: string): Promise<string> {
    try {
      const url = `${GITHUB_RAW_URL}/${patternPath}`
      console.log("Fetching code from:", url)
      const response = await fetch(url)
      if (!response.ok) {
        console.error("Failed to fetch code:", response.status, response.statusText)
        throw new Error(`Failed to fetch code: ${response.status} ${response.statusText}`)
      }
      return await response.text()
    } catch (error) {
      console.error("Error fetching code:", error)
      throw error
    }
  }
  
  