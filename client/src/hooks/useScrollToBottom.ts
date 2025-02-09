import { useEffect, useRef, useState } from "react"
export function useScrollToBottom() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [showScrollButton, setShowScrollButton] = useState(false)
  const [isNearBottom, setIsNearBottom] = useState(true)
  const scrollToBottom = (smooth = true) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: smooth ? "smooth" : "auto",
      })
    }
  }
  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current
      const bottom = scrollHeight - scrollTop - clientHeight
      const isNear = bottom < 100
      setIsNearBottom(isNear)
      setShowScrollButton(!isNear)
    }
  }
  useEffect(() => {
    const currentRef = scrollRef.current
    if (currentRef) {
      currentRef.addEventListener("scroll", handleScroll)
      return () => currentRef.removeEventListener("scroll", handleScroll)
    }
  }, [handleScroll]) // Added handleScroll to dependencies
  return {
    scrollRef,
    scrollToBottom,
    handleScroll,
    showScrollButton,
    isNearBottom,
  }
}
