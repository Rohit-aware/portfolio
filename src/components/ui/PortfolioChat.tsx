import React, {
  memo,
  useCallback,
  useRef,
  useEffect,
  KeyboardEvent,
  ChangeEvent,
} from 'react'
import { MessageCircle, X, Send, Bot, User } from 'lucide-react'
import { usePortfolioChat } from '@/shared/hooks/usePortfolioChat'
import { QUICK_CHIPS } from '@/services/portfolioChatEngine'
import { cn } from '@/shared/utils/cn'
import type { BotMessage, QuickChip } from '@/services/portfolioChatEngine'

/**
 * PortfolioChat — floating bottom-right chatbot panel.
 *
 * Layout:
 *  ┌─────────────────────────────┐
 *  │ Header (title + close)      │
 *  ├─────────────────────────────┤
 *  │ Messages scroll area        │
 *  │ · bot bubbles (left)        │
 *  │ · user bubbles (right)      │
 *  │ · typing indicator          │
 *  ├─────────────────────────────┤
 *  │ Quick chip strip            │
 *  ├─────────────────────────────┤
 *  │ Input + send button         │
 *  └─────────────────────────────┘
 *
 * Feature-flagged — rendered in App.tsx behind FLAGS.PORTFOLIO_CHAT.
 * No sub-components defined inside this file's component bodies.
 */

/* ── TypingDots — three-dot animation ── */
const TypingDots: React.FC = memo(() => (
  <div className="flex items-center gap-1 px-1 py-0.5" aria-label="Thinking">
    {[0, 1, 2].map(i => (
      <span
        key={i}
        aria-hidden="true"
        className="w-1.5 h-1.5 rounded-full bg-primary/60"
        style={{ animation: `dotBounce 1.4s ease-in-out ${i * 200}ms infinite` }}
      />
    ))}
  </div>
))
TypingDots.displayName = 'TypingDots'

/* ── MessageBubble ── */
interface BubbleProps { readonly msg: BotMessage }

const MessageBubble: React.FC<BubbleProps> = memo(({ msg }) => {
  const isBot = msg.role === 'bot'
  return (
    <div className={cn('flex items-end gap-2', isBot ? 'justify-start' : 'justify-end')}>
      {isBot && (
        <div
          aria-hidden="true"
          className="w-6 h-6 rounded-full bg-primary/15 border border-primary/25 flex items-center justify-center shrink-0 mb-0.5"
        >
          <Bot size={12} className="text-primary" />
        </div>
      )}
      <div
        className={cn(
          'max-w-[82%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed whitespace-pre-line',
          isBot
            ? 'bg-card border border-border text-foreground rounded-bl-sm'
            : 'bg-primary text-white rounded-br-sm',
        )}
      >
        {msg.text}
      </div>
      {!isBot && (
        <div
          aria-hidden="true"
          className="w-6 h-6 rounded-full bg-muted border border-border flex items-center justify-center shrink-0 mb-0.5"
        >
          <User size={12} className="text-muted-foreground" />
        </div>
      )}
    </div>
  )
})
MessageBubble.displayName = 'MessageBubble'

/* ── PortfolioChat ── */
const PortfolioChat: React.FC = memo(() => {
  const {
    messages, isTyping, inputVal, isOpen, unread,
    setInputVal, sendMessage, toggleOpen,
  } = usePortfolioChat()

  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  /* Auto-scroll to latest message */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages.length, isTyping])

  /* Focus input when opened */
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150)
    }
  }, [isOpen])

  const handleSend = useCallback((): void => {
    if (!inputVal.trim()) return
    sendMessage(inputVal)
  }, [inputVal, sendMessage])

  const handleKey = useCallback((e: KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }, [handleSend])

  const handleChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>): void => {
    setInputVal(e.target.value)
  }, [setInputVal])

  const handleChip = useCallback((chip: QuickChip): void => {
    sendMessage(chip.label, chip.intent)
  }, [sendMessage])

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {/* ── Chat Panel ── */}
      <div
        ref={panelRef}
        aria-label="Portfolio chatbot"
        aria-hidden={!isOpen}
        className={cn(
          'flex flex-col rounded-2xl border border-border overflow-hidden',
          'bg-background shadow-2xl',
          'w-[340px] transition-all duration-300 ease-out origin-bottom-right',
          isOpen
            ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 scale-90 translate-y-4 pointer-events-none h-0',
        )}
        style={{ height: isOpen ? 520 : 0 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-primary/15 border border-primary/25 flex items-center justify-center">
                <Bot size={15} className="text-primary" aria-hidden="true" />
              </div>
              <span
                aria-label="Online"
                className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-background"
              />
            </div>
            <div>
              <p className="text-xs font-semibold text-foreground">Ask Rohit's Bot</p>
              <p className="text-[10px] font-mono text-emerald-400">● Online · answers instantly</p>
            </div>
          </div>
          <button
            onClick={toggleOpen}
            aria-label="Close chat"
            className={cn(
              'w-7 h-7 flex items-center justify-center rounded-lg',
              'border border-border text-muted-foreground',
              'hover:text-foreground hover:bg-surface transition-colors',
            )}
          >
            <X size={13} aria-hidden="true" />
          </button>
        </div>

        {/* Messages */}
        <div
          className="flex-1 overflow-y-auto px-3 py-3 space-y-3"
          aria-live="polite"
          aria-label="Conversation"
        >
          {messages.map(msg => (
            <MessageBubble key={msg.id} msg={msg} />
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex items-end gap-2 animate-fade-in">
              <div
                aria-hidden="true"
                className="w-6 h-6 rounded-full bg-primary/15 border border-primary/25 flex items-center justify-center shrink-0"
              >
                <Bot size={12} className="text-primary" />
              </div>
              <div className="bg-card border border-border rounded-2xl rounded-bl-sm px-3.5 py-2.5">
                <TypingDots />
              </div>
            </div>
          )}
          <div ref={bottomRef} aria-hidden="true" className="h-px" />
        </div>

        {/* Quick chips */}
        <div
          className="shrink-0 px-3 py-2 border-t border-border bg-card/40 overflow-x-auto"
          style={{ scrollbarWidth: 'none' }}
        >
          <div className="flex gap-1.5 w-max">
            {QUICK_CHIPS.map(chip => (
              <button
                key={chip.label}
                onClick={() => handleChip(chip)}
                disabled={isTyping}
                className={cn(
                  'shrink-0 px-2.5 py-1 rounded-xl text-[10px] font-mono whitespace-nowrap',
                  'border border-border text-muted-foreground',
                  'hover:border-primary/40 hover:text-foreground hover:bg-surface',
                  'transition-all duration-150',
                  isTyping && 'opacity-40 pointer-events-none',
                )}
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="shrink-0 border-t border-border px-3 py-2.5 bg-card flex items-end gap-2">
          <textarea
            ref={inputRef}
            value={inputVal}
            onChange={handleChange}
            onKeyDown={handleKey}
            rows={1}
            placeholder="Ask me anything…"
            aria-label="Type your message"
            disabled={isTyping}
            className={cn(
              'flex-1 bg-surface rounded-xl px-3 py-2',
              'text-xs font-mono text-foreground placeholder:text-muted-foreground/50',
              'border border-border focus:outline-none focus:ring-1 focus:ring-primary/40',
              'resize-none transition-colors duration-200',
              'min-h-[34px] max-h-[80px]',
              isTyping && 'opacity-50',
            )}
            style={{ resize: 'none' }}
          />
          <button
            onClick={handleSend}
            disabled={isTyping || !inputVal.trim()}
            aria-label="Send message"
            className={cn(
              'shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200',
              inputVal.trim() && !isTyping
                ? 'bg-primary text-white shadow-[0_0_12px_hsl(var(--primary)/0.4)] hover:brightness-110'
                : 'bg-surface text-muted-foreground border border-border',
            )}
          >
            <Send size={13} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* ── FAB trigger button ── */}
      <button
        onClick={toggleOpen}
        aria-label={isOpen ? 'Close chat' : 'Open portfolio chat'}
        aria-expanded={isOpen}
        className={cn(
          'relative w-13 h-13 rounded-full flex items-center justify-center',
          'bg-primary text-white',
          'shadow-[0_4px_24px_hsl(var(--primary)/0.45)]',
          'hover:scale-105 active:scale-95 transition-all duration-200',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        )}
        style={{ width: 52, height: 52 }}
      >
        <MessageCircle
          size={22}
          className={cn('transition-all duration-200', isOpen && 'opacity-0 scale-50 absolute')}
          aria-hidden="true"
        />
        <X
          size={20}
          className={cn('transition-all duration-200 absolute', !isOpen && 'opacity-0 scale-50')}
          aria-hidden="true"
        />

        {/* Unread badge */}
        {unread > 0 && !isOpen && (
          <span
            aria-label={`${unread} unread message`}
            className={cn(
              'absolute -top-1 -right-1 min-w-[18px] h-[18px] rounded-full',
              'bg-red-500 text-white text-[10px] font-bold',
              'flex items-center justify-center px-1',
              'animate-bounce',
            )}
          >
            {unread}
          </span>
        )}
      </button>
    </div>
  )
})
PortfolioChat.displayName = 'PortfolioChat'
export default PortfolioChat
