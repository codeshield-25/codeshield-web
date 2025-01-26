import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RefreshCcw, AlertCircle } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"

interface RepoStatusProps {
  type: "loading" | "error"
  message?: string
  onRetry?: () => void
}

export function RepoStatus({ type, message, onRetry }: RepoStatusProps) {
  return (
    <Card className="h-[calc(100vh-4rem)]">
      <CardContent className="flex h-full flex-col items-center justify-center gap-4 p-6">
        {type === "loading" ? (
          <>
            <Spinner className="h-10 w-10" />
            <p className="text-sm text-muted-foreground">Loading repository data...</p>
          </>
        ) : (
          <>
            <AlertCircle className="h-10 w-10 text-destructive" />
            <div className="text-center">
              <p className="font-medium text-destructive">{message}</p>
              <p className="mt-1 text-sm text-muted-foreground">Please check your repository settings and try again</p>
            </div>
            {onRetry && (
              <Button variant="outline" onClick={onRetry} className="mt-2">
                <RefreshCcw className="mr-2 h-4 w-4" />
                Retry
              </Button>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}

