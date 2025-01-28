import React, { useState } from 'react'
import { useAuth } from './AuthContext'
import { db } from './firebaseConfig'
import { collection, query, where, getDocs, updateDoc } from 'firebase/firestore'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

interface JoinTeamProps {
  onClose: () => void
}

export default function JoinTeam({ onClose }: JoinTeamProps) {
  const [teamCode, setTeamCode] = useState('')
  const { user } = useAuth()
  const { toast } = useToast()

  const handleJoinTeam = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    try {
      const teamsRef = collection(db, 'teams')
      const q = query(teamsRef, where('code', '==', teamCode))
      const querySnapshot = await getDocs(q)

      if (querySnapshot.empty) {
        toast({
          title: "Error",
          description: "Invalid team code. Please try again.",
          variant: "destructive",
        })
        return
      }

      const teamDoc = querySnapshot.docs[0]
      const teamData = teamDoc.data()

      if (teamData.members.includes(user.uid)) {
        toast({
          title: "Error",
          description: "You are already a member of this team.",
          variant: "destructive",
        })
        return
      }

      await updateDoc(teamDoc.ref, {
        members: [...teamData.members, user.uid]
      })

      toast({
        title: "Success",
        description: "You have successfully joined the team.",
      })

      onClose()
    } catch (error) {
      console.error('Error joining team:', error)
      toast({
        title: "Error",
        description: "Failed to join team. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Join a Team</h2>
      <form onSubmit={handleJoinTeam} className="space-y-4">
        <div>
          <label htmlFor="teamCode" className="block text-sm font-medium text-gray-700">Team Code</label>
          <Input
            id="teamCode"
            value={teamCode}
            onChange={(e) => setTeamCode(e.target.value)}
            required
          />
        </div>
        <Button type="submit">Join Team</Button>
      </form>
    </div>
  )
}

