import { useState, useCallback, useRef } from 'react'
import {
  BotIntent,
  classifyIntent,
  generateResponse,
  makeMsg,
  typingDelay,
  type BotMessage,
} from '@/services/portfolioChatEngine'

interface ChatState {
  readonly messages: readonly BotMessage[]
  readonly isTyping: boolean
  readonly inputVal: string
  readonly isOpen: boolean
}

interface UsePortfolioChatReturn {
  readonly messages: readonly BotMessage[]
  readonly isTyping: boolean
  readonly inputVal: string
  readonly isOpen: boolean
  readonly unread: number
  readonly setInputVal: (v: string) => void
  readonly sendMessage: (text: string, explicitIntent?: BotIntent) => void
  readonly toggleOpen: () => void
  readonly openChat: () => void
}

const WELCOME = makeMsg(
  'bot',
  "Hi there! 👋 I'm Rohit's portfolio assistant.\n\nAsk me anything about his skills, projects, or experience — or tap a quick option below.",
  'intro'
)

/**
 * usePortfolioChat — manages the full chatbot conversation state.
 * Pure state machine: send → classify → delay → respond.
 * No leaked timers — clears on unmount.
 */
export const usePortfolioChat = (): UsePortfolioChatReturn => {
  const [state, setState] = useState<ChatState>({
    messages: [WELCOME],
    isTyping: false,
    inputVal: '',
    isOpen: false,
  })
  const [unread, setUnread] = useState(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const sendMessage = useCallback((
    text: string,
    explicitIntent?: BotIntent
  ): void => {
    const trimmed = text.trim()
    if (!trimmed) return

    if (timerRef.current) clearTimeout(timerRef.current)

    const intent = explicitIntent ?? classifyIntent(trimmed)
    const delay = typingDelay(intent)

    const userMsg = makeMsg('user', trimmed, intent)

    setState(prev => ({
      ...prev,
      messages: [...prev.messages, userMsg],
      inputVal: '',
      isTyping: true,
    }))

    timerRef.current = setTimeout(() => {
      const botMsg = makeMsg('bot', generateResponse(intent), intent)

      setState(prev => {
        const nextMessages = [...prev.messages, botMsg]

        if (!prev.isOpen) {
          setUnread(u => u + 1)
        }

        return {
          ...prev,
          messages: nextMessages,
          isTyping: false,
        }
      })
    }, delay)
  }, [])

  const setInputVal = useCallback((v: string): void => {
    setState(prev => ({ ...prev, inputVal: v }))
  }, [])

  const toggleOpen = useCallback((): void => {
    setState(prev => ({ ...prev, isOpen: !prev.isOpen }))
    setUnread(0)
  }, [])

  const openChat = useCallback((): void => {
    setState(prev => ({ ...prev, isOpen: true }))
    setUnread(0)
  }, [])

  return {
    messages: state.messages,
    isTyping: state.isTyping,
    inputVal: state.inputVal,
    isOpen: state.isOpen,
    unread,
    setInputVal,
    sendMessage,
    toggleOpen,
    openChat,
  }
}
