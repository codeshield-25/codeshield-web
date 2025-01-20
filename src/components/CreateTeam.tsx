import React, { useState } from 'react'
import { useAuth } from './AuthContext'
import { db } from './firebaseConfig'
import { collection, addDoc } from 'firebase/firestore'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

export default function CreateTeam() {
  const [teamName, setTeamName] = useState('')
  const [repository, setRepository] = useState('')
  const { user } = useAuth()
  const { toast } = useToast()

  const handleCreateTeam = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    try {
      const teamCode = Math.random().toString(36).substring(2, 8).toUpperCase()
      await addDoc(collection(db, 'teams'), {
        name: teamName,
        repository,
        code: teamCode,
        members: [user.uid],
        createdBy: user.uid,
        createdAt: new Date(),
      })

      toast({
        title: "Team created successfully",
        description: `Your team code is: ${teamCode}`,
      })

      setTeamName('')
      setRepository('')
    } catch (error) {
      console.error('Error creating team:', error)
      toast({
        title: "Error",
        description: "Failed to create team. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create a New Team</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleCreateTeam} className="space-y-4">
          <div>
            <label htmlFor="teamName" className="block text-sm font-medium text-gray-700">Team Name</label>
            <Input
              id="teamName"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="repository" className="block text-sm font-medium text-gray-700">Repository URL</label>
            <Input
              id="repository"
              value={repository}
              onChange={(e) => setRepository(e.target.value)}
              required
            />
          </div>
          <Button type="submit">Create Team</Button>
        </form>
      </CardContent>
    </Card>
  )
}

