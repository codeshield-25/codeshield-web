// import { useState } from 'react'
// import { Button } from "@/components/ui/button"
// import { Play, FileText, Settings, ChevronLeft, ChevronRight } from 'lucide-react'

// interface LayoutProps {
//   children: React.ReactNode
//   sidebar: React.ReactNode
//   onScan: () => void
//   isScanning: boolean
// }

// export function Layout({ children, sidebar, onScan, isScanning }: LayoutProps) {
//   const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

//   return (
//     <div className="flex h-screen bg-background text-foreground">
//       {/* Sidebar */}
//       <div className={`border-r bg-muted transition-all duration-300 ${isSidebarCollapsed ? 'w-16' : 'w-64'}`}>
//         {sidebar}
//         <Button
//           variant="ghost"
//           size="icon"
//           className="absolute bottom-4 right-0 transform translate-x-1/2"
//           onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
//         >
//           {isSidebarCollapsed ? <ChevronRight /> : <ChevronLeft />}
//         </Button>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col">
//         {/* Header */}
//         <header className="h-14 border-b px-4 flex items-center justify-between bg-card">
//           <h1 className="text-lg font-semibold">CodeShield</h1>
//           <div className="flex space-x-2">
//             <Button variant="outline" size="sm" onClick={onScan} disabled={isScanning}>
//               <Play className="w-4 h-4 mr-2" />
//               {isScanning ? 'Scanning...' : 'Quick Scan'}
//             </Button>
//             <Button variant="outline" size="sm">
//               <FileText className="w-4 h-4 mr-2" />
//               Generate Report
//             </Button>
//             <Button variant="outline" size="sm">
//               <Settings className="w-4 h-4 mr-2" />
//               Configure AI
//             </Button>
//           </div>
//         </header>

//         {/* Content Area */}
//         <main className="flex-1 overflow-auto p-4">
//           {children}
//         </main>
//       </div>
//     </div>
//   )
// }

import React from 'react'
import { Button } from "@/components/ui/button"
import { Play, FileText, Settings } from 'lucide-react'

interface LayoutProps {
  children: React.ReactNode
  sidebar: React.ReactNode
  onScan: () => void
  isScanning: boolean
}

export function Layout({ children, sidebar, onScan, isScanning }: LayoutProps) {
  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar */}
      <div className="w-64 border-r bg-muted">
        {sidebar}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-14 border-b px-4 flex items-center justify-between bg-card">
          <h1 className="text-lg font-semibold">CodeShield</h1>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={onScan} disabled={isScanning}>
              <Play className="w-4 h-4 mr-2" />
              {isScanning ? 'Scanning...' : 'Quick Scan'}
            </Button>
            <Button variant="outline" size="sm">
              <FileText className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Configure AI
            </Button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-4">
          {children}
        </main>
      </div>
    </div>
  )
}

