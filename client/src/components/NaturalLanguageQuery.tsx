"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import axios from "axios"
import { Send, Loader2, ShieldCheck, Copy, Pencil, LinkIcon } from "lucide-react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"
import ReactMarkdown from "react-markdown"
import { toast } from "sonner"

interface Message {
  id: string
  content: string
  isUser: boolean
  thinking?: boolean
}

interface CodeBlock {
  language: string
  code: string
}

export default function NaturalLanguageQueryChat() {
  const [query, setQuery] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [editingCode, setEditingCode] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, messagesEndRef])

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast.success("Code copied to clipboard")
    } catch (err) {
      toast.error("Failed to copy code")
      console.error("Failed to copy text: ", err)
    }
  }

  const handleEdit = (code: string) => {
    setEditingCode(code)
    // You can implement your edit functionality here
    // For example, open a modal or navigate to an editor
    toast.success("Edit functionality will be implemented based on your requirements")
  }

  const parseCodeBlocks = (content: string): (string | CodeBlock)[] => {
    const parts: (string | CodeBlock)[] = []
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g
    let lastIndex = 0
    let match

    while ((match = codeBlockRegex.exec(content)) !== null) {
      // Add text before code block
      if (match.index > lastIndex) {
        parts.push(content.slice(lastIndex, match.index))
      }

      // Add code block
      parts.push({
        language: match[1] || "plaintext",
        code: match[2].trim(),
      })

      lastIndex = match.index + match[0].length
    }

    // Add remaining text after last code block
    if (lastIndex < content.length) {
      parts.push(content.slice(lastIndex))
    }

    return parts
  }

  const handleQuery = async () => {
    if (!query.trim()) return

    const newMessage: Message = { id: Date.now().toString(), content: query, isUser: true }
    setMessages((prev) => [...prev, newMessage])
    setQuery("")
    setIsLoading(true)

    const thinkingMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: "Analyzing your security query...",
      isUser: false,
      thinking: true,
    }
    setMessages((prev) => [...prev, thinkingMessage])

    const url = "http://localhost:3000/query"
    try {
      await new Promise((resolve) => setTimeout(resolve, 200))
      const response = await axios.post(url, query, {
        headers: { "Content-Type": "text/plain" },
      })

      setMessages((prev) => prev.filter((msg) => msg.id !== thinkingMessage.id))

      const aiMessage: Message = {
        id: Date.now().toString(),
        content: response.data,
        isUser: false,
      }
      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      console.error("Error:", error)
      const errorMessage: Message = {
        id: Date.now().toString(),
        content:
          "I apologize, but I encountered an issue while processing your security query. Could you please rephrase or try a different question?",
        isUser: false,
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const renderCodeBlock = (codeBlock: CodeBlock) => {
    return (
      <div className="w-full my-2">
        <div className="relative">
          <div className="absolute top-3 left-4 text-xs text-gray-400 font-mono">{codeBlock.language}</div>
          <div className="absolute top-2 right-2 flex gap-2">
            <button
              onClick={() => handleCopy(codeBlock.code)}
              className="p-1 hover:bg-gray-700 rounded transition-colors"
              title="Copy code"
            >
              <Copy className="w-4 h-4 text-gray-400 hover:text-white" />
            </button>
            <button
              onClick={() => handleEdit(codeBlock.code)}
              className="p-1 hover:bg-gray-700 rounded transition-colors"
              title="Edit code"
            >
              <Pencil className="w-4 h-4 text-gray-400 hover:text-white" />
            </button>
          </div>
          <SyntaxHighlighter
            language={codeBlock.language}
            style={oneDark}
            customStyle={{
              margin: 0,
              borderRadius: "0.5rem",
              padding: "2rem 1rem 1rem 1rem",
              backgroundColor: "#1e1e1e",
            }}
          >
            {codeBlock.code}
          </SyntaxHighlighter>
        </div>
      </div>
    )
  }

  const renderMessageContent = (content: string) => {
    const parts = parseCodeBlocks(content)
    return parts.map((part, index) => {
      if (typeof part === "string") {
        return (
          <ReactMarkdown
            key={index}
            className="prose prose-sm dark:prose-invert max-w-none"
            components={{
              p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
              ul: ({ children }) => <ul className="list-disc pl-4 mb-2">{children}</ul>,
              ol: ({ children }) => <ol className="list-decimal pl-4 mb-2">{children}</ol>,
              li: ({ children }) => <li className="mb-1">{children}</li>,
              a: ({ children, href }) => (
                <a href={href} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
                  {children}
                </a>
              ),
              code: ({ children }) => (
                <code className="bg-gray-200 dark:bg-gray-800 rounded px-1 py-0.5">{children}</code>
              ),
            }}
          >
            {part}
          </ReactMarkdown>
        )
      } else {
        return renderCodeBlock(part)
      }
    })
  }

  return (
    <Card className="w-full max-w-3xl mx-auto h-[600px] flex flex-col bg-white">
      <CardHeader className="border-b">
        <CardTitle className="text-2xl font-bold text-center flex items-center justify-center">
          <ShieldCheck className="mr-2 text-emerald-500" /> Security Query Interface
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow p-6 overflow-hidden flex flex-col">
        <ScrollArea className="flex-grow pr-4 -mr-4">
          <div className="space-y-6">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
                <div className={`group flex gap-3 text-sm ${message.isUser ? "flex-row-reverse" : "flex-row"}`}>
                  {!message.isUser && (
                    <div className="flex flex-col gap-1">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-FQT5qBTHbXs5vWf6ltC86UaEfrXYG1.png"
                          alt="Security AI"
                        />
                        <AvatarFallback>AI</AvatarFallback>
                      </Avatar>
                    </div>
                  )}
                  <div className={`flex flex-col gap-2 ${message.isUser ? "items-end" : "items-start"}`}>
                    <div
                      className={`relative px-4 py-2 rounded-2xl ${
                        message.isUser
                          ? "bg-gray-100 hover:bg-gray-200 transition-colors"
                          : message.thinking
                            ? "bg-gray-100 text-gray-600"
                            : "bg-gray-100 text-black"
                      } ${message.content.includes("```") ? "max-w-[85%] w-[85%]" : "max-w-[85%]"}`}
                    >
                      {message.thinking ? (
                        <div className="flex items-center">
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          {message.content}
                        </div>
                      ) : (
                        renderMessageContent(message.content)
                      )}
                      {message.isUser && (
                        <button className="opacity-0 group-hover:opacity-100 transition-opacity absolute -left-6 top-1/2 -translate-y-1/2">
                          <LinkIcon className="w-4 h-4 text-gray-400" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div ref={messagesEndRef} />
        </ScrollArea>
        <div className="mt-4 relative">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleQuery()
            }}
            className="flex space-x-2"
          >
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask your security question..."
              className="flex-grow bg-white text-black border-gray-300"
            />
            <Button type="submit" disabled={isLoading} className="bg-emerald-500 text-white hover:bg-emerald-600">
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  )
}
