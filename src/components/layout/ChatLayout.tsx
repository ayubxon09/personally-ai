'use client'
import Sidebar from './Sidebar'
import ChatWindow from '@/components/chat/ChatWindow'
import { useStore } from '@/lib/store'
import { Menu } from 'lucide-react'

export default function ChatLayout() {
  const { sidebarOpen, toggleSidebar } = useStore()

  return (
    <div className="flex h-screen bg-dark-950 overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0 relative">
        {!sidebarOpen && (
          <button
            onClick={toggleSidebar}
            className="absolute top-4 left-4 z-10 p-2 rounded-lg bg-dark-800 border border-dark-600 text-dark-300 hover:text-dark-100 transition-colors"
          >
            <Menu size={16} />
          </button>
        )}
        <ChatWindow />
      </main>
    </div>
  )
}
