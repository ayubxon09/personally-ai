export type Role = 'user' | 'assistant' | 'system'

export interface Message {
  id: string
  role: Role
  content: string
  timestamp: Date
  model?: string
}

export interface Conversation {
  id: string
  title: string
  messages: Message[]
  createdAt: Date
  updatedAt: Date
  mode: ChatMode
}

export type ChatMode =
  | 'general'      // Oddiy suhbat
  | 'code'         // Kod yozish / tahlil
  | 'fullstack'    // To'liq loyiha yaratish
  | 'mobile'       // Mobil app yaratish
  | 'analyze'      // Kodni tahlil qilish
  | 'friend'       // Do'stona suhbat

export interface ModeConfig {
  id: ChatMode
  label: string
  icon: string
  description: string
  systemPrompt: string
  placeholder: string
}

export interface AppState {
  conversations: Conversation[]
  activeConversationId: string | null
  mode: ChatMode
  isLoading: boolean
  sidebarOpen: boolean
}
