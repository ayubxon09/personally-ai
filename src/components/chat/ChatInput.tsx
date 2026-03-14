'use client'
import { useState, useRef, useCallback } from 'react'
import { Send, Paperclip, Mic, Square } from 'lucide-react'

interface Props {
  onSend: (text: string) => void
  isLoading: boolean
  placeholder?: string
}

export default function ChatInput({ onSend, isLoading, placeholder }: Props) {
  const [text, setText] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSend = useCallback(() => {
    const trimmed = text.trim()
    if (!trimmed || isLoading) return
    onSend(trimmed)
    setText('')
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }, [text, isLoading, onSend])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
    const el = e.target
    el.style.height = 'auto'
    el.style.height = Math.min(el.scrollHeight, 160) + 'px'
  }

  return (
    <div className="border-t border-dark-700 bg-dark-950 px-4 py-3">
      <div className="flex items-end gap-2 bg-dark-800 border border-dark-600 rounded-2xl px-3 py-2 focus-within:border-accent/50 transition-colors">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder={placeholder || 'Xabar yozing... (Shift+Enter — yangi qator)'}
          rows={1}
          disabled={isLoading}
          className="flex-1 bg-transparent text-dark-100 text-sm placeholder-dark-500 resize-none outline-none leading-relaxed min-h-[24px] max-h-[160px] py-0.5 disabled:opacity-50"
        />
        <div className="flex items-center gap-1 flex-shrink-0 pb-0.5">
          <button
            onClick={handleSend}
            disabled={!text.trim() || isLoading}
            className="w-8 h-8 rounded-xl bg-accent hover:bg-accent-hover disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-all active:scale-95"
          >
            {isLoading
              ? <Square size={13} className="text-white fill-white" />
              : <Send size={13} className="text-white" />
            }
          </button>
        </div>
      </div>
      <p className="text-xs text-dark-600 text-center mt-2">
        Enter — yuborish · Shift+Enter — yangi qator
      </p>
    </div>
  )
}
