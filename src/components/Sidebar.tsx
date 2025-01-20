// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Button } from "@/components/ui/button"
// import { LayoutDashboard, Search, Bot, Code, PieChart, Users, Trophy, MessageSquare, TrendingUp, Shield, Target, BarChart2, Settings } from 'lucide-react'

// interface SidebarProps {
//   projectTypes: string[]
//   selectedProjectType: string
//   onProjectTypeChange: (type: string) => void
//   activePage: string
//   setActivePage: (page: string) => void
// }

// export function Sidebar({
//   projectTypes,
//   selectedProjectType,
//   onProjectTypeChange,
//   activePage,
//   setActivePage,
// }: SidebarProps) {
//   const menuItems = [
//     { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
//     { id: 'results', label: 'Scan Results', icon: Search },
//     { id: 'ai', label: 'AI Recommendations', icon: Bot },
//     { id: 'rewrite', label: 'AI Code Rewrite', icon: Code },
//     { id: 'visualization', label: 'Visualization', icon: PieChart },
//     { id: 'collaboration', label: 'Collaboration', icon: Users },
//     { id: 'pentest', label: 'Pen Testing', icon: Target },
//     { id: 'nlq', label: 'Natural Language Query', icon: MessageSquare },
//     { id: 'predictive', label: 'Predictive Analysis', icon: TrendingUp },
//     { id: 'secure-gen', label: 'Secure Code Gen', icon: Shield },
//     { id: 'gamification', label: 'Gamification', icon: Trophy },
//     { id: 'debt', label: 'Security Debt', icon: BarChart2 },
//     { id: 'settings', label: 'Settings', icon: Settings },
//   ]

//   return (
//     <div className="h-full flex flex-col">
//       <div className="p-4 space-y-6 flex-grow overflow-y-auto">
//         <div>
//           <h2 className="text-lg font-semibold mb-2">Project Type</h2>
//           <Select value={selectedProjectType} onValueChange={onProjectTypeChange}>
//             <SelectTrigger className="w-full">
//               <SelectValue placeholder="Select project type" />
//             </SelectTrigger>
//             <SelectContent>
//               {projectTypes.map((type) => (
//                 <SelectItem key={type} value={type}>{type}</SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </div>
//         <div className="space-y-1">
//           {menuItems.map((item) => (
//             <Button
//               key={item.id}
//               variant={activePage === item.id ? "secondary" : "ghost"}
//               className="w-full justify-start"
//               onClick={() => setActivePage(item.id)}
//             >
//               <item.icon className="mr-2 h-4 w-4" />
//               <span className="truncate">{item.label}</span>
//             </Button>
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }

//============================================================================================

// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Button } from "@/components/ui/button"
// import { LayoutDashboard, Search, Bot, Code, PieChart, Users, Trophy, MessageSquare, TrendingUp, Shield, Target, BarChart2, Settings, PlusCircle, LogIn } from 'lucide-react'
// import { useAuth } from './AuthContext'

// interface Team {
//   id: string
//   name: string
// }

// interface SidebarProps {
//   teams: Team[]
//   selectedTeam: string | null
//   onTeamChange: (teamId: string) => void
//   activePage: string
//   setActivePage: (page: string) => void
//   onCreateTeam: () => void
//   onJoinTeam: () => void
// }

// export function Sidebar({
//   teams,
//   selectedTeam,
//   onTeamChange,
//   activePage,
//   setActivePage,
//   onCreateTeam,
//   onJoinTeam,
// }: SidebarProps) {
//   const { user, signIn, signOut } = useAuth()

//   const menuItems = [
//     { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
//     { id: 'results', label: 'Scan Results', icon: Search },
//     { id: 'ai', label: 'AI Recommendations', icon: Bot },
//     { id: 'rewrite', label: 'AI Code Rewrite', icon: Code },
//     { id: 'visualization', label: 'Visualization', icon: PieChart },
//     { id: 'collaboration', label: 'Collaboration', icon: Users },
//     { id: 'gamification', label: 'Gamification', icon: Trophy },
//     { id: 'nlq', label: 'Natural Language Query', icon: MessageSquare },
//     { id: 'predictive', label: 'Predictive Analysis', icon: TrendingUp },
//     { id: 'secure-gen', label: 'Secure Code Gen', icon: Shield },
//     { id: 'pentest', label: 'Pen Testing', icon: Target },
//     { id: 'debt', label: 'Security Debt', icon: BarChart2 },
//     { id: 'settings', label: 'Settings', icon: Settings },
//   ]

//   return (
//     <div className="h-full flex flex-col">
//       <div className="p-4 space-y-6 flex-grow overflow-y-auto">
//         {user ? (
//           <>
//             <div>
//               <h2 className="text-lg font-semibold mb-2">Team</h2>
//               <Select value={selectedTeam || ''} onValueChange={onTeamChange}>
//                 <SelectTrigger className="w-full">
//                   <SelectValue placeholder="Select team" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {teams.map((team) => (
//                     <SelectItem key={team.id} value={team.id}>{team.name}</SelectItem>
//                   ))}
//                   <SelectItem value="create">
//                     <span className="flex items-center">
//                       <PlusCircle className="mr-2 h-4 w-4" />
//                       Create Team
//                     </span>
//                   </SelectItem>
//                   <SelectItem value="join">
//                     <span className="flex items-center">
//                       <LogIn className="mr-2 h-4 w-4" />
//                       Join Team
//                     </span>
//                   </SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//             <div className="space-y-1">
//               {menuItems.map((item) => (
//                 <Button
//                   key={item.id}
//                   variant={activePage === item.id ? "secondary" : "ghost"}
//                   className="w-full justify-start"
//                   onClick={() => setActivePage(item.id)}
//                 >
//                   <item.icon className="mr-2 h-4 w-4" />
//                   <span className="truncate">{item.label}</span>
//                 </Button>
//               ))}
//             </div>
//           </>
//         ) : (
//           <Button onClick={signIn} className="w-full">
//             Sign in with Google
//           </Button>
//         )}
//       </div>
//       {user && (
//         <div className="p-4 border-t">
//           <Button onClick={signOut} variant="outline" className="w-full">
//             Sign Out
//           </Button>
//         </div>
//       )}
//     </div>
//   )
// }

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Search, Bot, Code, PieChart, Users, Trophy, MessageSquare, TrendingUp, Shield, Target, BarChart2, Settings, PlusCircle, LogIn, LogOut } from 'lucide-react'
import { useAuth } from './AuthContext'

interface Team {
  id: string
  name: string
}

interface SidebarProps {
  teams: Team[]
  selectedTeam: string | null
  onTeamChange: (teamId: string) => void
  activePage: string
  setActivePage: (page: string) => void
}

export function Sidebar({
  teams,
  selectedTeam,
  onTeamChange,
  activePage,
  setActivePage,
}: SidebarProps) {
  const { signOut } = useAuth()
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'results', label: 'Scan Results', icon: Search },
    { id: 'ai', label: 'AI Recommendations', icon: Bot },
    { id: 'rewrite', label: 'AI Code Rewrite', icon: Code },
    { id: 'visualization', label: 'Visualization', icon: PieChart },
    { id: 'collaboration', label: 'Collaboration', icon: Users },
    { id: 'gamification', label: 'Gamification', icon: Trophy },
    { id: 'nlq', label: 'Natural Language Query', icon: MessageSquare },
    { id: 'predictive', label: 'Predictive Analysis', icon: TrendingUp },
    { id: 'secure-gen', label: 'Secure Code Gen', icon: Shield },
    { id: 'pentest', label: 'Pen Testing', icon: Target },
    { id: 'debt', label: 'Security Debt', icon: BarChart2 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 space-y-6 flex-grow overflow-y-auto">
        <div>
          <h2 className="text-lg font-semibold mb-2">Team</h2>
          <Select value={selectedTeam || ''} onValueChange={onTeamChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select team" />
            </SelectTrigger>
            <SelectContent>
              {teams.map((team) => (
                <SelectItem key={team.id} value={team.id}>{team.name}</SelectItem>
              ))}
              <SelectItem value="create">
                <span className="flex items-center">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create Team
                </span>
              </SelectItem>
              <SelectItem value="join">
                <span className="flex items-center">
                  <LogIn className="mr-2 h-4 w-4" />
                  Join Team
                </span>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          {menuItems.map((item) => (
            <Button
              key={item.id}
              variant={activePage === item.id ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActivePage(item.id)}
            >
              <item.icon className="mr-2 h-4 w-4" />
              <span className="truncate">{item.label}</span>
            </Button>
          ))}
        </div>
      </div>
      <div className="p-4 border-t flex items-center justify-center">
        <Button
          className="w-full justify-center"
          onClick={signOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span className="truncate">Logout</span>
        </Button>
      </div>
    </div>
  )
}