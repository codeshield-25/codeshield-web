import { useState, useEffect } from "react"
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from "firebase/firestore"
import { db } from "./firebaseConfig"
import { useAuth } from "./AuthContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Message {
  id: string
  text: string
  userId: string
  userName: string
  timestamp: Date
}

interface TeamChatProps {
  teamId: string
  teamName: string
}

export default function TeamChat({ teamId, teamName }: TeamChatProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const { user } = useAuth()

  useEffect(() => {
    if (!teamId) return

    const teamMessagesRef = collection(db, "teams", teamId, "messages")
    const q = query(teamMessagesRef, orderBy("timestamp", "asc"))

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedMessages = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate(),
      })) as Message[]
      setMessages(fetchedMessages)
    })

    return () => unsubscribe()
  }, [teamId])

  const handleSendMessage = async () => {
    if (newMessage.trim() && user) {
      const teamMessagesRef = collection(db, "teams", teamId, "messages")
      await addDoc(teamMessagesRef, {
        text: newMessage,
        userId: user.uid,
        userName: user.displayName,
        timestamp: serverTimestamp(),
      })
      setNewMessage("")
    }
  }

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader>
        <CardTitle>{teamName} Chat</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col">
        <ScrollArea className="flex-grow mb-4">
          {messages.map((msg) => (
            <div key={msg.id} className="mb-2">
              <span className="font-semibold">{msg.userName}: </span>
              {msg.text}
            </div>
          ))}
        </ScrollArea>
        <div className="flex space-x-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <Button onClick={handleSendMessage}>Send</Button>
        </div>
      </CardContent>
    </Card>
  )
}

