export function isCodeMessage(message: string): boolean {
    return message.trim().startsWith("```") && message.trim().endsWith("```")
  }
  
  export function parseCodeMessage(message: string): { language: string; code: string } {
    const firstLineEnd = message.indexOf("\n")
    const language = message.slice(3, firstLineEnd).trim()
    const code = message.slice(firstLineEnd + 1, -3).trim()
    return { language, code }
  }