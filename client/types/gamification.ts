export interface CTFEvent {
    id: string
    title: string
    startDate: Date
    endDate: Date
    description: string
    points: number
    difficulty?: "Easy" | "Medium" | "Hard"
    status: "Upcoming" | "Active" | "Completed"
  }
  
  export interface VOTD {
    id: string
    title: string
    description: string
    severity: "Low" | "Medium" | "High"
    points: number
    date: Date
    isCompleted: boolean
    readTime: number
  }
  
  export interface Resource {
    id: string
    title: string
    type: "Article" | "Video" | "Tool"
    description: string
    link: string
    category: string
    difficulty: "Beginner" | "Intermediate" | "Advanced"
  }
  
  