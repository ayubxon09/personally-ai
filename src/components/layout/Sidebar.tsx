'use client'
import { useStore } from '@/lib/store'
import { MODES } from '@/lib/modes'
import { ChatMode, Conversation } from '@/types'
import { Trash2, Plus, MessageSquare, ChevronLeft } from 'lucide-react'

export default function Sidebar() {
  const {
    conversations, activeId, mode,
    createConversation, setActive, deleteConversation,
    setMode, toggleSidebar, sidebarOpen,
  } = useStore()

  const handleNew = (m?: ChatMode) => {
    createConversation(m)
  }

  if (!sidebarOpen) return null

  return (
    <aside className="w-64 flex-shrink-0 bg-dark-950 border-r border-dark-700 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-dark-700 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-accent to-green-ai flex items-center justify-center text-xs font-bold text-white">AI</div>
          <span className="font-semibold text-sm text-dark-50">Shaxsiy AI</span>
        </div>
        <button onClick={toggleSidebar} className="text-dark-400 hover:text-dark-200 transition-colors p-1 rounded">
          <ChevronLeft size={16} />
        </button>
      </div>

      {/* Modes */}
      <div className="p-3 border-b border-dark-700">
        <p className="text-xs text-dark-400 uppercase tracking-wider mb-2 px-1">Rejim</p>
        <div className="grid grid-cols-3 gap-1">
          {MODES.map(m => (
            <button
              key={m.id}
              onClick={() => { setMode(m.id); handleNew(m.id) }}
              className={`flex flex-col items-center gap-0.5 p-2 rounded-lg text-xs transition-all ${
                mode === m.id
                  ? 'bg-accent/20 text-accent-light border border-accent/30'
                  : 'text-dark-300 hover:bg-dark-700 hover:text-dark-100'
              }`}
              title={m.description}
            >
              <span className="text-base leading-none">{m.icon}</span>
              <span className="truncate w-full text-center">{m.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* New Chat Button */}
      <div className="p-3">
        <button
          onClick={() => handleNew()}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-accent hover:bg-accent-hover text-white text-sm font-medium transition-colors"
        >
          <Plus size={15} />
          Yangi suhbat
        </button>
      </div>

      {/* Conversations */}
      <div className="flex-1 overflow-y-auto px-2 pb-4">
        {conversations.length === 0 ? (
          <div className="text-center text-dark-500 text-xs py-8 px-4">
            Hali suhbat yo'q.<br />Yuqoridagi tugmani bosing.
          </div>
        ) : (
          <div className="space-y-0.5">
            {conversations.map((conv: Conversation) => (
              <ConvItem
                key={conv.id}
                conv={conv}
                active={conv.id === activeId}
                onSelect={() => setActive(conv.id)}
                onDelete={() => deleteConversation(conv.id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-dark-700 text-xs text-dark-500 text-center">
        {process.env.NEXT_PUBLIC_OWNER_NAME || 'Shaxsiy'} AI · Claude
      </div>
    </aside>
  )
}

function ConvItem({ conv, active, onSelect, onDelete }: {
  conv: Conversation
  active: boolean
  onSelect: () => void
  onDelete: () => void
}) {
  const modeIcon = MODES.find(m => m.id === conv.mode)?.icon || '💬'

  return (
    <div
      className={`group flex items-center gap-2 px-2 py-2 rounded-lg cursor-pointer transition-all ${
        active ? 'bg-dark-700 text-dark-50' : 'text-dark-300 hover:bg-dark-800 hover:text-dark-100'
      }`}
      onClick={onSelect}
    >
      <span className="text-sm flex-shrink-0">{modeIcon}</span>
      <span className="text-xs truncate flex-1">{conv.title}</span>
      <button
        onClick={e => { e.stopPropagation(); onDelete() }}
        className="opacity-0 group-hover:opacity-100 p-0.5 rounded hover:text-red-400 transition-all flex-shrink-0"
      >
        <Trash2 size={12} />
      </button>
    </div>
  )
}
