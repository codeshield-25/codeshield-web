import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function RealTimeCollaboration() {
  const [messages, setMessages] = useState<{ user: string; message: string }[]>([])
  const [newMessage, setNewMessage] = useState('')

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { user: 'You', message: newMessage }])
      setNewMessage('')
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Real-time Collaboration</h2>
      <Card>
        <CardHeader>
          <CardTitle>Team Chat</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="h-64 overflow-y-auto space-y-2">
              {messages.map((msg, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <Avatar>
                    <AvatarFallback>{msg.user[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{msg.user}</p>
                    <p>{msg.message}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex space-x-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button onClick={handleSendMessage}>Send</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

