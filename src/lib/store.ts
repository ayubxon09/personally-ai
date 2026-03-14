import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { v4 as uuidv4 } from 'uuid'
import { Conversation, Message, ChatMode } from '@/types'

interface Store {
  conversations: Conversation[]
  activeId: string | null
  mode: ChatMode
  sidebarOpen: boolean

  // Actions
  createConversation: (mode?: ChatMode) => string
  setActive: (id: string) => void
  addMessage: (conversationId: string, message: Omit<Message, 'id' | 'timestamp'>) => void
  updateLastMessage: (conversationId: string, content: string) => void
  deleteConversation: (id: string) => void
  clearAll: () => void
  setMode: (mode: ChatMode) => void
  toggleSidebar: () => void
  renameConversation: (id: string, title: string) => void
}

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      conversations: [],
      activeId: null,
      mode: 'general',
      sidebarOpen: true,

      createConversation: (mode) => {
        const id = uuidv4()
        const currentMode = mode || get().mode
        const newConv: Conversation = {
          id,
          title: 'Yangi suhbat',
          messages: [],
          createdAt: new Date(),
          updatedAt: new Date(),
          mode: currentMode,
        }
        set(s => ({
          conversations: [newConv, ...s.conversations],
          activeId: id,
          mode: currentMode,
        }))
        return id
      },

      setActive: (id) => set({ activeId: id }),

      addMessage: (conversationId, msg) => {
        const message: Message = {
          ...msg,
          id: uuidv4(),
          timestamp: new Date(),
        }
        set(s => ({
          conversations: s.conversations.map(c => {
            if (c.id !== conversationId) return c
            const updated = { ...c, messages: [...c.messages, message], updatedAt: new Date() }
            // Auto-title from first user message
            if (c.messages.length === 0 && msg.role === 'user') {
              updated.title = msg.content.slice(0, 40) + (msg.content.length > 40 ? '...' : '')
            }
            return updated
          })
        }))
      },

      updateLastMessage: (conversationId, content) => {
        set(s => ({
          conversations: s.conversations.map(c => {
            if (c.id !== conversationId) return c
            const messages = [...c.messages]
            const last = messages[messages.length - 1]
            if (last && last.role === 'assistant') {
              messages[messages.length - 1] = { ...last, content }
            }
            return { ...c, messages, updatedAt: new Date() }
          })
        }))
      },

      deleteConversation: (id) => {
        const { conversations, activeId } = get()
        const remaining = conversations.filter(c => c.id !== id)
        set({
          conversations: remaining,
          activeId: activeId === id ? (remaining[0]?.id || null) : activeId,
        })
      },

      clearAll: () => set({ conversations: [], activeId: null }),

      setMode: (mode) => set({ mode }),

      toggleSidebar: () => set(s => ({ sidebarOpen: !s.sidebarOpen })),

      renameConversation: (id, title) => {
        set(s => ({
          conversations: s.conversations.map(c =>
            c.id === id ? { ...c, title } : c
          )
        }))
      },
    }),
    {
      name: 'personal-ai-storage',
      partialize: (s) => ({ conversations: s.conversations, mode: s.mode }),
    }
  )
)
