import React, { useEffect, useState, useCallback } from "react"
import { useAuth } from "./AuthContext"
import { db } from "./firebaseConfig"
import { collection, query, where, onSnapshot } from "firebase/firestore"
import axios from "axios"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import Toast from "./Toast"
import { AlertCircle, RefreshCw } from "lucide-react"

interface GitDataProps {
  initialRepoUrl: string
}

interface RepoItem {
  name: string
  path: string
  type: "dir" | "file"
  sha: string
  download_url?: string
  children: RepoItem[]
}

const GitData: React.FC<GitDataProps> = ({ initialRepoUrl }) => {
  const [repoUrl, setRepoUrl] = useState(initialRepoUrl)
  const [repoData, setRepoData] = useState<RepoItem[]>([])
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({})
  const [fileContent, setFileContent] = useState<string | null>(null)
  const [currentFilePath, setCurrentFilePath] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [repoLoading, setRepoLoading] = useState(false)
  const [teamId, setTeamId] = useState<string | null>(null)
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null)
  const { user } = useAuth()

  const getOwnerAndRepo = useCallback((url: string) => {
    const match = url.match(/github\.com\/(.+?)\/(.+?)(?:\.git|$)/)
    if (match && match[1] && match[2]) {
      return `${match[1]}/${match[2]}`
    }
    return ""
  }, [])

  const fetchRepo = useCallback(
    async (path = "", repoUrlToUse: string = repoUrl) => {
      setRepoLoading(true)
      setError(null)

      try {
        const apiUrl = `https://api.github.com/repos/${getOwnerAndRepo(repoUrlToUse)}/contents/${path}`
        const response = await axios.get(apiUrl)

        if (response.status === 200) {
          const sortedData = sortContents(response.data)
          setRepoData((prevData) => {
            const newData = [...prevData]
            replaceTree(newData, path, sortedData)
            return newData
          })
          if (path === "") {
            setToast({ message: "Repository content fetched successfully", type: "success" })
          }
        }
      } catch (err) {
        console.error("Error fetching repo:", err)
        setError("Failed to fetch repository contents")
        setToast({ message: "Failed to fetch repository contents", type: "error" })
      } finally {
        setRepoLoading(false)
      }
    },
    [getOwnerAndRepo, repoUrl],
  )

  useEffect(() => {
    if (initialRepoUrl && repoUrl !== initialRepoUrl) {
      setRepoUrl(initialRepoUrl)
      setRepoData([])
      setExpandedFolders({})
      setFileContent(null)
      setCurrentFilePath("")
      fetchRepo("", initialRepoUrl)
    }
  }, [initialRepoUrl, repoUrl, fetchRepo])

  useEffect(() => {
    if (!user) return

    const teamsRef = collection(db, "teams")
    const q = query(teamsRef, where("members", "array-contains", user.uid))

    setLoading(true)
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      if (!querySnapshot.empty) {
        const teamDoc = querySnapshot.docs[0]
        const teamData = teamDoc.data()
        const newRepoUrl = teamData.repository
        const newTeamId = teamDoc.id

        if (newTeamId !== teamId) {
          setTeamId(newTeamId)
          setRepoUrl(newRepoUrl)
          setRepoData([])
          setExpandedFolders({})
          setFileContent(null)
          setCurrentFilePath("")
          fetchRepo("", newRepoUrl)
        }
      } else {
        setError("No team found for the current user")
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [user, fetchRepo, teamId])

  const fetchFileContent = async (fileUrl: string, filePath: string) => {
    try {
      const response = await axios.get(fileUrl)
      if (response.status === 200) {
        setFileContent(response.data)
        setCurrentFilePath(filePath)
      }
    } catch (err) {
      console.error("Error fetching file:", err)
      setError("Failed to fetch file content")
      setToast({ message: "Failed to fetch file content", type: "error" })
    }
  }

  const sortContents = (contents: any[]): RepoItem[] => {
    const folders = contents.filter((item) => item.type === "dir").map((item) => ({ ...item, children: [] }))
    const files = contents.filter((item) => item.type === "file").map((item) => ({ ...item, children: [] }))
    return [...folders, ...files]
  }

  const replaceTree = (tree: RepoItem[], path: string, contents: RepoItem[]) => {
    if (path === "") {
      tree.length = 0
      contents.forEach((item) => tree.push(item))
    } else {
      const segments = path.split("/")
      let currentNode = tree

      for (const segment of segments) {
        const foundNode = currentNode.find((node) => node.name === segment)
        if (foundNode) {
          currentNode = foundNode.children
        }
      }

      currentNode.length = 0
      contents.forEach((item) => currentNode.push(item))
    }
  }

  const toggleFolder = (path: string) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [path]: !prev[path],
    }))
  }

  const renderTree = (tree: RepoItem[], parentPath = "") => {
    return (
      <ul className="pl-4">
        {tree.map((item) => {
          const itemPath = parentPath ? `${parentPath}/${item.name}` : item.name

          if (item.type === "dir") {
            return (
              <li key={item.sha} className="py-1">
                <button
                  onClick={() => {
                    toggleFolder(itemPath)
                    if (!expandedFolders[itemPath]) fetchRepo(itemPath)
                  }}
                  className="flex items-center text-primary hover:underline"
                >
                  <span className="mr-2">📁</span>
                  {item.name}
                </button>
                {expandedFolders[itemPath] && renderTree(item.children, itemPath)}
              </li>
            )
          }

          return (
            <li key={item.sha} className="py-1">
              <button
                onClick={() => item.download_url && fetchFileContent(item.download_url, itemPath)}
                className="flex items-center text-muted-foreground hover:text-primary hover:underline"
              >
                <span className="mr-2">📄</span>
                {item.name}
              </button>
            </li>
          )
        })}
      </ul>
    )
  }

  const renderBreadcrumbs = () => {
    if (!currentFilePath) return null

    const segments = currentFilePath.split("/")
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
        {segments.map((segment, index) => (
          <React.Fragment key={index}>
            {index > 0 && <span>/</span>}
            <span>{segment}</span>
          </React.Fragment>
        ))}
      </div>
    )
  }

  if (loading) {
    return (
      <Card className="h-[calc(100vh-4rem)]">
        <CardContent className="flex h-full flex-col items-center justify-center gap-4 p-6">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
          <p className="text-sm text-muted-foreground">Loading repository data...</p>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="h-[calc(100vh-4rem)]">
        <CardContent className="flex h-full flex-col items-center justify-center p-6">
          <div className="text-destructive mb-4">
            <AlertCircle className="h-12 w-12" />
          </div>
          <h3 className="text-lg font-semibold text-destructive mb-2">{error}</h3>
          <p className="text-sm text-muted-foreground mb-4 text-center">
            Please check your repository link or internet connection and try again
          </p>
          <Button variant="outline" onClick={() => fetchRepo("", repoUrl)}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Retry
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <Card className="h-[calc(100vh-4rem)]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            Repository:{" "}
            <a href={repoUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              {getOwnerAndRepo(repoUrl)}
            </a>
          </CardTitle>
        </CardHeader>
        <CardContent className="h-[calc(100%-5rem)]">
          <div className="flex gap-6 h-full">
            <ScrollArea className="w-1/3 border rounded-lg p-4">
              {repoLoading ? (
                <div className="flex items-center justify-center h-full">
                  <Spinner className="h-6 w-6" />
                </div>
              ) : repoData.length > 0 ? (
                renderTree(repoData)
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">No files to display</div>
              )}
            </ScrollArea>
            <div className="w-2/3 flex flex-col">
              {renderBreadcrumbs()}
              <ScrollArea className="flex-grow border rounded-lg p-4 bg-muted/50">
                {fileContent ? (
                  <pre className="whitespace-pre-wrap">
                    <code>{fileContent}</code>
                  </pre>
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    Select a file to view its contents
                  </div>
                )}
              </ScrollArea>
            </div>
          </div>
        </CardContent>
      </Card>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </>
  )
}

export default GitData

