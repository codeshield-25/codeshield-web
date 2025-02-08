import TeamChat from "./TeamChat"

interface RealTimeCollaborationProps {
  teamId: string
  teamName: string
}

export default function RealTimeCollaboration({ teamId, teamName }: RealTimeCollaborationProps) {
   

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Real-Time Collaboration</h1>
      <TeamChat teamId={teamId} teamName={teamName} />
    </div>
  )
}

