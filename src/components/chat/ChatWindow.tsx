'use client'
import { useEffect, useRef, useState } from 'react'
import { useStore } from '@/lib/store'
import { MODES, getModeById } from '@/lib/modes'
import MessageBubble from './MessageBubble'
import ChatInput from './ChatInput'
import { Sparkles } from 'lucide-react'

export default function ChatWindow() {
  const { conversations, activeId, mode, createConversation } = useStore()
  const bottomRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(false)

  const activeConv = conversations.find(c => c.id === activeId)
  const modeConfig = getModeById(mode)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [activeConv?.messages])

  const handleSend = async (text: string) => {
    let convId = activeId
    if (!convId) {
      convId = createConversation(mode)
    }

    const { addMessage, updateLastMessage } = useStore.getState()
    addMessage(convId, { role: 'user', content: text })

    const currentConv = useStore.getState().conversations.find(c => c.id === convId)
    const messages = currentConv?.messages.map(m => ({ role: m.role, content: m.content })) || []

    // Add empty assistant message for streaming
    addMessage(convId, { role: 'assistant', content: '' })
    setIsLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages, mode }),
      })

      const data = await res.json()
      if (!res.ok || data.error) throw new Error(data.error || "API error")
      updateLastMessage(convId!, data.content)
    } catch (err) {
      console.error(err)
      updateLastMessage(convId!, 'Xatolik yuz berdi. Qayta urinib ko\'ring.')
    } finally {
      setIsLoading(false)
    }
  }

  // Welcome screen
  if (!activeConv || activeConv.messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-green-ai flex items-center justify-center mb-6 shadow-lg">
            <Sparkles size={28} className="text-white" />
          </div>
          <h1 className="text-2xl font-semibold text-dark-50 mb-2">
            Salom, {process.env.NEXT_PUBLIC_OWNER_NAME || 'Do\'stim'}! 👋
          </h1>
          <p className="text-dark-400 mb-8 max-w-md">
            Men sizning shaxsiy AI assistantingizman. Hozir <span className="text-accent-light">{modeConfig.label}</span> rejimidaman.
          </p>

          {/* Quick suggestions */}
          <div className="grid grid-cols-2 gap-3 max-w-lg w-full">
            {getQuickPrompts(mode).map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSend(prompt.text)}
                className="p-3 rounded-xl bg-dark-800 border border-dark-600 text-left hover:border-accent/40 hover:bg-dark-700 transition-all group"
              >
                <span className="text-lg mb-1 block">{prompt.icon}</span>
                <span className="text-xs text-dark-300 group-hover:text-dark-100">{prompt.text}</span>
              </button>
            ))}
          </div>
        </div>
        <ChatInput onSend={handleSend} isLoading={isLoading} placeholder={modeConfig.placeholder} />
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
        {activeConv.messages.map((msg, i) => (
          <MessageBubble
            key={msg.id}
            message={msg}
            isLast={i === activeConv.messages.length - 1}
            isLoading={isLoading && i === activeConv.messages.length - 1 && msg.role === 'assistant'}
          />
        ))}
        <div ref={bottomRef} />
      </div>

      <ChatInput onSend={handleSend} isLoading={isLoading} placeholder={modeConfig.placeholder} />
    </div>
  )
}

function getQuickPrompts(mode: string) {
  const prompts: Record<string, { icon: string; text: string }[]> = {
    general: [
      { icon: '💡', text: 'Bugun nima yangilik?' },
      { icon: '🎯', text: 'Menga motivatsiya ber' },
      { icon: '📚', text: 'Biror narsa o\'rgat' },
      { icon: '🌍', text: 'Qiziqarli fakt ayt' },
    ],
    code: [
      { icon: '🐍', text: 'Python bilan REST API yoz' },
      { icon: '⚛️', text: 'React component yoz' },
      { icon: '🔍', text: 'Kodimni tahlil qil' },
      { icon: '🚀', text: 'TypeScript o\'rgat' },
    ],
    fullstack: [
      { icon: '🏗️', text: 'Todo app — frontend + backend' },
      { icon: '🛒', text: 'E-commerce loyiha yoz' },
      { icon: '🔐', text: 'Auth tizimi yoz' },
      { icon: '📊', text: 'Dashboard loyiha yoz' },
    ],
    mobile: [
      { icon: '📱', text: 'React Native app boshlash' },
      { icon: '🔔', text: 'Push notification qo\'sh' },
      { icon: '🗺️', text: 'Map app yoz' },
      { icon: '📸', text: 'Camera app yoz' },
    ],
    analyze: [
      { icon: '🔍', text: 'Kodimni tekshir, xato topgil' },
      { icon: '🔒', text: 'Xavfsizlikni tekshir' },
      { icon: '⚡', text: 'Performance tahlil qil' },
      { icon: '🧹', text: 'Kodni refactor qil' },
    ],
    friend: [
      { icon: '😊', text: 'Bugun kayfiyatim yaxshi emas' },
      { icon: '🎵', text: 'Musiqa tavsiya qil' },
      { icon: '🎮', text: 'O\'yin tavsiya qil' },
      { icon: '💬', text: 'Shunchaki suhbat qilaylik' },
    ],
  }
  return prompts[mode] || prompts.general
}
