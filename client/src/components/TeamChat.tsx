"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { useFirebaseChat } from "../hooks/useFirebaseChat"
import { useScrollToBottom } from "../hooks/useScrollToBottom"
import { useAuth } from "./AuthContext"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Hash, ChevronDown, Send, Copy, Check } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { Light as SyntaxHighlighter } from "react-syntax-highlighter"
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs"
import language from "react-syntax-highlighter/dist/esm/languages/hljs/1c"

interface TeamChatProps {
  teamId: string
  teamName: string
}

export default function TeamChat({ teamId, teamName }: TeamChatProps) {
  const { messages, sendMessage } = useFirebaseChat(teamId)
  const [newMessage, setNewMessage] = useState("")
  const { user } = useAuth()
  const { scrollRef, scrollToBottom, handleScroll, showScrollButton, isNearBottom } = useScrollToBottom()
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  useEffect(() => {
    if (isNearBottom) {
      scrollToBottom()
    }
  }, [isNearBottom, scrollToBottom])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim()) {
      await sendMessage(newMessage)
      setNewMessage("")
      scrollToBottom()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage(e)
    }
  }

  const copyToClipboard = useCallback((text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedCode(text)
      setTimeout(() => setCopiedCode(null), 2000)
    })
  }, [])

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] w-full max-w-5xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <header className="h-14 flex items-center px-4 border-b bg-white">
        <Hash className="w-5 h-5 text-gray-500 mr-2" />
        <h1 className="font-semibold text-gray-900">{teamName}</h1>
      </header>

      {/* Messages */}
      <div ref={scrollRef} onScroll={handleScroll} className="flex-1 overflow-y-auto bg-gray-50">
        <div className="flex flex-col py-4 px-2 space-y-4">
          {messages.map((msg, index) => {
            const isCurrentUser = msg.userId === user?.uid
            const showAvatar = !index || messages[index - 1].userId !== msg.userId

            return (
              <div
                key={msg.id}
                className={cn(
                  "flex items-start space-x-2",
                  !showAvatar && "mt-1",
                  isCurrentUser && "flex-row-reverse space-x-reverse",
                )}
              >
                {showAvatar && (
                  <Avatar className="w-8 h-8 shrink-0">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${msg.userId}`} />
                    <AvatarFallback>{msg.userName[0].toUpperCase()}</AvatarFallback>
                  </Avatar>
                )}
                <div className={cn("flex flex-col max-w-[70%]", !showAvatar && (isCurrentUser ? "mr-12" : "ml-12"))}>
                  {showAvatar && (
                    <div
                      className={cn(
                        "flex items-baseline space-x-2 mb-1",
                        isCurrentUser && "flex-row-reverse space-x-reverse",
                      )}
                    >
                      <span className="font-medium text-sm text-gray-900">{msg.userName}</span>
                      <span className="text-xs text-gray-500">
                        {msg.timestamp?.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  )}
                  {msg.isCode ? (
                    <div className="rounded-lg overflow-hidden shadow-lg relative">
                      <div className="bg-gray-200 px-3 py-1 text-xs text-gray-700 border-b flex justify-between items-center">
                        <span>{msg.language || "code"}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 px-2"
                          onClick={() => copyToClipboard(msg.text)}
                        >
                          {copiedCode === msg.text ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </Button>
                      </div>
                      <SyntaxHighlighter
                        language={msg.language || "javascript"}
                        style={docco}
                        customStyle={{
                          margin: 0,
                          padding: "1rem",
                          background: "white",
                          fontSize: "0.875rem",
                        }}
                      >
                        {msg.text}
                      </SyntaxHighlighter>
                    </div>
                  ) : (
                    <div
                      className={cn(
                        "pr-0 pl-4 py-2 rounded-2xl text-sm shadow-lg whitespace-pre-wrap",
                        isCurrentUser ? "bg-blue-500 text-white" : "bg-white text-gray-900",
                      )}
                    >
                      {msg.text}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Scroll to bottom button */}
      {showScrollButton && (
        <Button
          onClick={() => scrollToBottom()}
          className=" absolute bottom-40 right-40 rounded-full bg-white shadow-lg hover:bg-gray-50"
          size="icon"
        >
          <ChevronDown className="w-4 h-4 text-black" />
        </Button>
      )}

      {/* Message Input */}
      <div className="px-4 py-4 bg-white border-t">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
          <div className="flex-1">
            <Textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`Message #${teamName}, want to share code, use formate :${"```"}language (line break) your code${"```"}`}
              className="bg-gray-100 border-0 focus-visible:ring-1 focus-visible:ring-gray-200 min-h-[2.5rem] max-h-[10rem]"
              rows={1}
            />
          </div>
          <Button type="submit" size="icon" className="shrink-0" disabled={!newMessage.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}
