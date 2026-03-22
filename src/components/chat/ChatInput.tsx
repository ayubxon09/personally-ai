'use client'
import { useState, useRef, useCallback } from 'react'
import { ArrowUp } from 'lucide-react'

interface Props {
  onSend: (text: string) => void
  isLoading: boolean
  placeholder?: string
}

export default function ChatInput({ onSend, isLoading, placeholder }: Props) {
  const [text, setText] = useState('')
  const [focused, setFocused] = useState(false)
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
    el.style.height = Math.min(el.scrollHeight, 180) + 'px'
  }

  const hasText = text.trim().length > 0

  return (
    <div className="px-3 sm:px-6 pb-4 sm:pb-6 pt-2">
      {/* Glow effect wrapper */}
      <div
        style={{
          position: 'relative',
          borderRadius: '24px',
          padding: '1px',
          background: focused
            ? 'linear-gradient(135deg, #7c6ef5, #22c55e, #7c6ef5)'
            : 'linear-gradient(135deg, #2a2a2e, #3a3a3e)',
          boxShadow: focused
            ? '0 0 24px rgba(124,110,245,0.25), 0 0 48px rgba(34,197,94,0.1)'
            : 'none',
          transition: 'all 0.3s ease',
        }}
      >
        <div
          style={{
            borderRadius: '23px',
            background: '#161618',
            padding: '12px 16px 10px',
          }}
        >
          {/* Textarea */}
          <textarea
            ref={textareaRef}
            value={text}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder={placeholder || 'Xabar yozing...'}
            rows={1}
            disabled={isLoading}
            style={{
              width: '100%',
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#f0f0f0',
              fontSize: '15px',
              lineHeight: '1.6',
              resize: 'none',
              minHeight: '26px',
              maxHeight: '180px',
              fontFamily: 'inherit',
              caretColor: '#7c6ef5',
            }}
          />

          {/* Bottom row */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '8px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{
                fontSize: '11px',
                color: '#444',
                display: 'none',
              }}
                className="sm-hint"
              >
                Enter — yuborish
              </span>
            </div>

            {/* Send button */}
            <button
              onClick={handleSend}
              disabled={!hasText || isLoading}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                border: 'none',
                background: hasText && !isLoading
                  ? 'linear-gradient(135deg, #7c6ef5, #5a4fd4)'
                  : '#222',
                color: hasText && !isLoading ? '#fff' : '#444',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: hasText && !isLoading ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s ease',
                boxShadow: hasText && !isLoading
                  ? '0 4px 15px rgba(124,110,245,0.4)'
                  : 'none',
                transform: hasText && !isLoading ? 'scale(1)' : 'scale(0.95)',
                flexShrink: 0,
              }}
            >
              {isLoading ? (
                <div style={{
                  width: '14px', height: '14px',
                  border: '2px solid #444',
                  borderTop: '2px solid #7c6ef5',
                  borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite',
                }} />
              ) : (
                <ArrowUp size={16} />
              )}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (min-width: 640px) { .sm-hint { display: block !important; } }
      `}</style>
    </div>
  )
}