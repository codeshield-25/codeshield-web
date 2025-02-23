import React from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  LayoutDashboard,
  Search,
  Bot,
  Code,
  PieChart,
  Users,
  Trophy,
  MessageSquare,
  TrendingUp,
  Shield,
  Target,
  BarChart2,
  Settings,
  PlusCircle,
  LogOut,
  UserPlus,
  GitBranch,
  HandCoins,
} from "lucide-react"
import { useAuth } from "./AuthContext"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import CreateTeam from "./CreateTeam"
import JoinTeam from "./JoinTeam"
import { Separator } from "@/components/ui/separator"

interface Team {
  id: string
  name: string
  repository: string
}

interface SidebarProps {
  teams: Team[]
  selectedTeam: string | null
  onTeamChange: (teamId: string) => void
  activePage: string
  setActivePage: (page: string) => void
}

export function Sidebar({ teams, selectedTeam, onTeamChange, activePage, setActivePage }: SidebarProps) {
  const { signOut } = useAuth()
  const [showCreateTeamDialog, setShowCreateTeamDialog] = React.useState(false)
  const [showJoinTeamDialog, setShowJoinTeamDialog] = React.useState(false)

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "results", label: "Scan Results", icon: Search },
    { id: "ai", label: "AI Recommendations", icon: Bot },
    { id: "rewrite", label: "AI Code Rewrite", icon: Code },
    { id: "visualization", label: "Visualization", icon: PieChart },
    { id: "collaboration", label: "Collaboration", icon: Users },
    { id: "secure-gen", label: "Secure Code Gen", icon: Shield },
    { id: "nlq", label: "Natural Language Query", icon: MessageSquare },
    { id: "predictive", label: "Predictive Analysis", icon: TrendingUp },
    { id: "pentest", label: "Pen Testing", icon: Target },
    { id: "gamification", label: "Gamification", icon: Trophy },
    { id: "debt", label: "Security Debt", icon: BarChart2 },
    { id: "donation", label: "Donation", icon: HandCoins },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  const handleTeamChange = (teamId: string) => {
    onTeamChange(teamId)
    setActivePage("dashboard")
  }

  const selectedTeamData = teams.find((team) => team.id === selectedTeam)

  return (
    <TooltipProvider>
      <div className="h-full flex flex-col bg-background">
        <div className="px-4 py-3">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold tracking-tight px-2">Teams</h2>
            <Select value={selectedTeam || ""} onValueChange={handleTeamChange}>
              <SelectTrigger className="w-full focus:ring-0 focus-visible:ring-0">
                <SelectValue placeholder="Select team">{selectedTeamData && selectedTeamData.name}</SelectValue>
              </SelectTrigger>
              <SelectContent className="w-[var(--radix-select-trigger-width)]" align="start">
                <ScrollArea className="h-[170px]">
                  {teams.map((team) => (
                    <SelectItem key={team.id} value={team.id} className="py-2">
                      <div className="flex flex-col gap-1">
                        <span className="font-medium">{team.name}</span>
                        {team.repository && (
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <GitBranch className="h-3 w-3" />
                            {(() => {
                              try {
                                const url = new URL(team.repository)
                                return url.pathname.slice(1)
                              } catch {
                                return team.repository
                              }
                            })()}
                          </span>
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </ScrollArea>
                <Separator className="my-2" />
                <div className="p-2 space-y-2">
                  <Dialog open={showCreateTeamDialog} onOpenChange={setShowCreateTeamDialog}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full justify-start">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Create Team
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Create a New Team</DialogTitle>
                      </DialogHeader>
                      <CreateTeam onClose={() => setShowCreateTeamDialog(false)} />
                    </DialogContent>
                  </Dialog>
                  <Dialog open={showJoinTeamDialog} onOpenChange={setShowJoinTeamDialog}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full justify-start">
                        <UserPlus className="mr-2 h-4 w-4" />
                        Join Team
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Join a Team</DialogTitle>
                      </DialogHeader>
                      <JoinTeam onClose={() => setShowJoinTeamDialog(false)} />
                    </DialogContent>
                  </Dialog>
                </div>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex-1 px-4">
          <nav className="space-y-0.5">
            {menuItems.map((item) => (
              <Tooltip key={item.id}>
                <TooltipTrigger asChild>
                  <Button
                    variant={activePage === item.id ? "secondary" : "ghost"}
                    className="w-full justify-start text-sm"
                    onClick={() => setActivePage(item.id)}
                  >
                    <item.icon className="h-4 w-4 mr-2" />
                    <span className="truncate">{item.label}</span>
                  </Button>
                </TooltipTrigger>
              </Tooltip>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t">
          <Button
            variant="default"
            className="w-full justify-center bg-black text-white hover:bg-gray-800 dark:bg-green-600 dark:hover:bg-green-700"
            onClick={signOut}
          >
            <LogOut className="h-4 w-4 mr-1" />
            <span className="truncate">Logout</span>
          </Button>
        </div>
      </div>
    </TooltipProvider>
  )
}

