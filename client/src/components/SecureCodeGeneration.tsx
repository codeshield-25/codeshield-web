"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { CodeEditor } from "../components/code-editor"
import { fetchSecureCode, fetchRepoStructure } from "../lib/github"
import type { Language } from "../../types/githubViewTypes"
import { Code, Code2 } from "lucide-react"

export default function SecureCodeGeneration() {
  const [selectedLanguage, setSelectedLanguage] = useState("")
  const [selectedPattern, setSelectedPattern] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [code, setCode] = useState("")
  const [error, setError] = useState("")
  const [languages, setLanguages] = useState<Language[]>([])

  useEffect(() => {
    fetchLanguagesAndPatterns()
  }, [])

  const fetchLanguagesAndPatterns = async () => {
    try {
      setIsLoading(true)
      const repoStructure = await fetchRepoStructure()
      setLanguages(repoStructure)
      setError("")
    } catch (err) {
      console.error("Failed to fetch repository structure:", err)
      setError("Failed to load languages and patterns. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGenerate = async () => {
    if (!selectedLanguage || !selectedPattern) return

    setIsLoading(true)
    setError("")
    setCode("")

    try {
      const language = languages.find((lang) => lang.name === selectedLanguage)
      if (!language) throw new Error("Selected language not found")

      const pattern = language.patterns.find((p) => p.name === selectedPattern)
      if (!pattern) throw new Error("Selected pattern not found")

      console.log("Fetching code for:", pattern.path)
      const secureCode = await fetchSecureCode(selectedLanguage, pattern.path)
      setCode(secureCode)
    } catch (err) {
      console.error("Error generating secure code:", err)
      setError(`Failed to fetch secure code: ${err instanceof Error ? err.message : String(err)}`)
    } finally {
      setIsLoading(false)
    }
  }

  const selectedLanguagePatterns = languages.find((lang) => lang.name === selectedLanguage)?.patterns || []

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <Card className="border-none shadow-lg">
        <CardHeader className="space-y-1 pb-6">
          <div className="flex items-center space-x-2">
            <Code className="mr-2 text-emerald-500"  />
            <CardTitle className="text-3xl font-bold ">
              Secure Code Generation
            </CardTitle>
          </div>
          <CardDescription className="text-lg">
            Generate and customize secure code patterns for your application
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="language" className="text-sm font-medium">
                Programming Language
              </Label>
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger id="language" className="w-full">
                  <SelectValue placeholder="Select Language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.name} value={lang.name}>
                      {lang.name.charAt(0).toUpperCase() + lang.name.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="pattern" className="text-sm font-medium">
                Security Pattern
              </Label>
              <Select value={selectedPattern} onValueChange={setSelectedPattern} disabled={!selectedLanguage}>
                <SelectTrigger id="pattern" className="w-full">
                  <SelectValue placeholder="Select Security Pattern" />
                </SelectTrigger>
                <SelectContent>
                  {selectedLanguagePatterns.map((pattern) => (
                    <SelectItem key={pattern.name} value={pattern.name}>
                      {pattern.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              onClick={() => {
                fetchLanguagesAndPatterns().then(() => handleGenerate())
              }}
              disabled={!selectedLanguage || !selectedPattern || isLoading}
              className="px-8 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all"
              size="lg"
            >
              {isLoading ? (
                "Generating..."
              ) : (
                <span className="flex items-center">
                  <Code2 className="mr-2 h-5 w-5" />
                  Generate Code
                </span>
              )}
            </Button>
          </div>

          {error && (
            <div className="text-red-500 text-sm rounded-lg bg-red-50 dark:bg-red-950/50 p-4 flex items-center">
              <span className="mr-2">⚠️</span>
              {error}
            </div>
          )}

          {code && (
            <CodeEditor code={code} language={selectedLanguage} fileName={`${selectedPattern}.${selectedLanguage}`} />
          )}
        </CardContent>
      </Card>
    </div>
  )
}

