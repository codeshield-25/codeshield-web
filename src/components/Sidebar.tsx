import React, { useState } from "react"
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
  LogIn,
  LogOut,
  UserPlus,
  ChevronLeft,
  ChevronRight,
  GitBranch,
} from "lucide-react"
import { useAuth } from "./AuthContext"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import CreateTeam from "./CreateTeam"
import JoinTeam from "./JoinTeam"
import { motion } from "framer-motion"

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
  const [showCreateTeamDialog, setShowCreateTeamDialog] = useState(false)
  const [showJoinTeamDialog, setShowJoinTeamDialog] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "results", label: "Scan Results", icon: Search },
    { id: "ai", label: "AI Recommendations", icon: Bot },
    { id: "rewrite", label: "AI Code Rewrite", icon: Code },
    { id: "visualization", label: "Visualization", icon: PieChart },
    { id: "collaboration", label: "Collaboration", icon: Users },
    { id: "gamification", label: "Gamification", icon: Trophy },
    { id: "nlq", label: "Natural Language Query", icon: MessageSquare },
    { id: "predictive", label: "Predictive Analysis", icon: TrendingUp },
    { id: "secure-gen", label: "Secure Code Gen", icon: Shield },
    { id: "pentest", label: "Pen Testing", icon: Target },
    { id: "debt", label: "Security Debt", icon: BarChart2 },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  const handleTeamChange = (teamId: string) => {
    onTeamChange(teamId)
    setActivePage("dashboard") // Auto-redirect to dashboard on team change
  }

  const selectedTeamData = teams.find((team) => team.id === selectedTeam)

  return (
    <TooltipProvider>
      <motion.div
        className="h-full flex flex-col bg-background border-r"
        animate={{ width: isCollapsed ? 80 : 280 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <ScrollArea className="flex-grow">
          <div className="px-4 space-y-4 pt-3">
            {!isCollapsed && (
              <div className="space-y-2">
                <div className="flex items-center justify-between px-2">
                  <h2 className="text-lg font-semibold tracking-tight">Teams</h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5 hover:bg-transparent group"
                    onClick={() => setIsCollapsed(!isCollapsed)}
                  >
                    <ChevronLeft className="h-4 w-4 transition-transform group-hover:scale-110 group-hover:text-primary" />
                  </Button>
                </div>
                <Select value={selectedTeam || ""} onValueChange={handleTeamChange}>
                  <SelectTrigger className="w-full focus:ring-0 focus-visible:ring-0">
                    <SelectValue placeholder="Select team">{selectedTeamData && selectedTeamData.name}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {teams.map((team) => (
                      <SelectItem key={team.id} value={team.id}>
                        <div className="flex flex-col gap-1">
                          <span>{team.name}</span>
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
                  </SelectContent>
                </Select>
              </div>
            )}
            {isCollapsed && (
              <div className="flex justify-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5 hover:bg-transparent group"
                  onClick={() => setIsCollapsed(!isCollapsed)}
                >
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:scale-110 group-hover:text-primary" />
                </Button>
              </div>
            )}
            <div className="space-y-1 pt-2">
              {menuItems.map((item) => (
                <Tooltip key={item.id}>
                  <TooltipTrigger asChild>
                    <Button
                      variant={activePage === item.id ? "secondary" : "ghost"}
                      className={`w-full justify-start ${isCollapsed ? "px-2" : ""}`}
                      onClick={() => setActivePage(item.id)}
                    >
                      <item.icon className={`h-5 w-5 ${isCollapsed ? "mx-auto" : "mr-2"}`} />
                      {!isCollapsed && <span className="truncate">{item.label}</span>}
                    </Button>
                  </TooltipTrigger>
                  {isCollapsed && (
                    <TooltipContent side="right" align="start" sideOffset={0}>
                      {item.label}
                    </TooltipContent>
                  )}
                </Tooltip>
              ))}
            </div>
          </div>
        </ScrollArea>
        <div className="p-4 border-t space-y-2">
          {!isCollapsed && (
            <>
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
            </>
          )}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" className="w-full justify-start" onClick={signOut}>
                <LogOut className={`h-5 w-5 ${isCollapsed ? "mx-auto" : "mr-2"}`} />
                {!isCollapsed && <span className="truncate">Logout</span>}
              </Button>
            </TooltipTrigger>
            {isCollapsed && (
              <TooltipContent side="right" align="start" sideOffset={0}>
                Logout
              </TooltipContent>
            )}
          </Tooltip>
        </div>
      </motion.div>
    </TooltipProvider>
  )
}

