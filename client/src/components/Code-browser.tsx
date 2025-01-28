"use client"

import { useState } from "react"
import { ChevronRight, File, Folder, GitBranch } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface FileNode {
  name: string
  type: "file" | "directory"
  path: string
  children?: FileNode[]
  content?: string
}

interface CodeBrowserProps {
  repository: string
  files: FileNode[]
  className?: string
}

export function CodeBrowser({ repository, files, className }: CodeBrowserProps) {
  const [expandedDirs, setExpandedDirs] = useState<Set<string>>(new Set(["/"]))
  const [selectedFile, setSelectedFile] = useState<FileNode | null>(null)

  const toggleDir = (path: string) => {
    const newExpanded = new Set(expandedDirs)
    if (newExpanded.has(path)) {
      newExpanded.delete(path)
    } else {
      newExpanded.add(path)
    }
    setExpandedDirs(newExpanded)
  }

  const FileTree = ({ nodes, level = 0 }: { nodes: FileNode[]; level?: number }) => {
    return (
      <div className="pl-4">
        {nodes.map((node) => (
          <div key={node.path}>
            <Button
              variant="ghost"
              className={cn(
                "h-8 w-full justify-start gap-2 px-2 font-normal",
                selectedFile?.path === node.path && "bg-muted",
              )}
              onClick={() => {
                if (node.type === "directory") {
                  toggleDir(node.path)
                } else {
                  setSelectedFile(node)
                }
              }}
            >
              <ChevronRight
                className={cn(
                  "h-4 w-4 shrink-0 text-muted-foreground/50",
                  node.type === "directory" && expandedDirs.has(node.path) && "rotate-90",
                  node.type === "file" && "invisible",
                )}
              />
              {node.type === "directory" ? (
                <Folder className="h-4 w-4 text-muted-foreground" />
              ) : (
                <File className="h-4 w-4 text-muted-foreground" />
              )}
              <span className="truncate">{node.name}</span>
            </Button>
            {node.type === "directory" && expandedDirs.has(node.path) && node.children && (
              <FileTree nodes={node.children} level={level + 1} />
            )}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className={cn("rounded-lg border bg-background", className)}>
      <div className="flex items-center gap-2 border-b px-4 py-2">
        <GitBranch className="h-4 w-4 text-muted-foreground" />
        <span className="font-medium">{repository}</span>
      </div>
      <div className="grid md:grid-cols-[300px_1fr]">
        <div className="border-r">
          <ScrollArea className="h-[400px]">
            <FileTree nodes={files} />
          </ScrollArea>
        </div>
        <div className="p-4">
          {selectedFile ? (
            <div className="space-y-4">
              <div className="font-medium">{selectedFile.name}</div>
              <pre className="rounded-lg bg-muted p-4">
                <code>{selectedFile.content || "No content available"}</code>
              </pre>
            </div>
          ) : (
            <div className="flex h-[400px] items-center justify-center text-muted-foreground">
              Select a file to view its contents
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

