import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
interface GitHubStyleCodeViewProps {
  exampleCommitFixes: Array<{
    commitURL: string
    lines: Array<{
      line: string
      lineNumber: number
      lineChange: string
    }>
  }>
}

export default function GitHubStyleCodeView({ exampleCommitFixes }: GitHubStyleCodeViewProps) {
  const [currentExample, setCurrentExample] = useState(0)
  const totalExamples = exampleCommitFixes.length

  const navigateExample = (direction: "prev" | "next") => {
    if (direction === "prev") {
      setCurrentExample((prev) => (prev > 0 ? prev - 1 : prev))
    } else {
      setCurrentExample((prev) => (prev < totalExamples - 1 ? prev + 1 : prev))
    }
  }

  return (
    <div className="rounded-lg border overflow-hidden">
      {/* Navigation Header */}
      <div className="bg-muted px-4 border-b flex items-center justify-between">
        <a
            href={exampleCommitFixes[currentExample].commitURL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-500 hover:underline"
          >
            View commit on GitHub
        </a>
        <div className="flex items-center space-x-1">
          <Button variant="ghost" size="icon" onClick={() => navigateExample("prev")} disabled={currentExample === 0}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium">
            Example {currentExample + 1}/{totalExamples}
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigateExample("next")}
            disabled={currentExample === totalExamples - 1}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Code Block */}
      <div className="text-sm font-mono overflow-x-auto">
        <table className="w-full border-collapse">
          <tbody>
            {exampleCommitFixes[currentExample].lines.map((line, lineIndex) => (
              <tr
                key={lineIndex}
                className={
                  line.lineChange === "added" ? "bg-green-500/10" : line.lineChange === "removed" ? "bg-red-500/10" : ""
                }
              >
                {/* Line Number */}
                <td className="text-right text-muted-foreground px-2 py-0.5 select-none border-r w-[1%] whitespace-nowrap">
                  {line.lineNumber}
                </td>

                {/* Change Indicator */}
                <td className="px-2 py-0.5 select-none border-r w-[1%] whitespace-nowrap">
                  <span className="text-muted-foreground">
                    {line.lineChange === "added" ? "+" : line.lineChange === "removed" ? "-" : " "}
                  </span>
                </td>

                {/* Code Content */}
                <td className="px-2 py-0.5 w-full" style={{ fontSize: ".82rem" }}>
                  <span
                    className={
                      line.lineChange === "added"
                        ? "text-green-700 dark:text-green-400"
                        : line.lineChange === "removed"
                          ? "text-red-700 dark:text-red-400"
                          : ""
                    }
                  >
                    {line.line}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}