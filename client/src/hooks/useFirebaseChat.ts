import { useState, useEffect } from "react"
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, limit } from "firebase/firestore"
import { db } from "../components/firebaseConfig"
import { useAuth } from "../components/AuthContext"

export interface Message {
  id: string
  text: string
  userId: string
  userName: string
  timestamp: Date | null
  isCode: boolean
  language?: string
}

export function useFirebaseChat(teamId: string) {
  const [messages, setMessages] = useState<Message[]>([])
  const { user } = useAuth()

  useEffect(() => {
    if (!teamId) return

    const teamMessagesRef = collection(db, "teams", teamId, "messages")
    const q = query(teamMessagesRef, orderBy("timestamp", "desc"), limit(50))

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedMessages = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate() || null,
      })) as Message[]
      setMessages(fetchedMessages.reverse())
    })

    return () => unsubscribe()
  }, [teamId])

  const sendMessage = async (text: string) => {
    if (text.trim() && user) {
      const isCode = text.trim().startsWith("```") && text.trim().endsWith("```")
      let messageText = text.trim()
      let language = undefined

      if (isCode) {
        const firstLineEnd = messageText.indexOf("\n")
        language = messageText.slice(3, firstLineEnd).trim()
        messageText = messageText.slice(firstLineEnd + 1, -3).trim()
      }

      const teamMessagesRef = collection(db, "teams", teamId, "messages")
      const messageData: any = {
        text: messageText,
        userId: user.uid,
        userName: user.displayName,
        timestamp: serverTimestamp(),
        isCode,
      }

      if (isCode && language) {
        messageData.language = language
      }

      await addDoc(teamMessagesRef, messageData)
    }
  }

  return { messages, sendMessage }
}

