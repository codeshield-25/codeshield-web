import type React from "react"
import { useEffect, useState } from "react"
import { Light as SyntaxHighlighter } from "react-syntax-highlighter"
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"
interface AnimatedCodeProps {
  code: string
  language: string
  shouldAnimate: boolean
}
export const AnimatedCode: React.FC<AnimatedCodeProps> = ({ code, language, shouldAnimate }) => {
  const [displayedCode, setDisplayedCode] = useState("")
  const [isCopied, setIsCopied] = useState(false)
  useEffect(() => {
    if (shouldAnimate) {
      let index = 0
      const interval = setInterval(() => {
        if (index < code.length) {
          setDisplayedCode((prev) => prev + code[index])
          index++
        } else {
          clearInterval(interval)
        }
      }, 10) // Adjust the speed of animation here
      return () => clearInterval(interval)
    } else {
      setDisplayedCode(code)
    }
  }, [code, shouldAnimate])
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }
  return (
    <div className="relative">
      <Button onClick={handleCopy} className="absolute top-2 right-2 z-10" size="sm" variant="outline">
        {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </Button>
      <SyntaxHighlighter language={language} style={docco} customStyle={{ margin: 0, padding: "1rem" }}>
        {displayedCode}
      </SyntaxHighlighter>
    </div>
  )
}