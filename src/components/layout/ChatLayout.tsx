'use client'
import { useState } from 'react'
import Sidebar from './Sidebar'
import ChatWindow from '@/components/chat/ChatWindow'
import { useStore } from '@/lib/store'
import { Menu, X } from 'lucide-react'

export default function ChatLayout() {
  const { sidebarOpen, toggleSidebar } = useStore()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="flex h-screen bg-dark-950 overflow-hidden">
      {/* Desktop sidebar */}
      <div className={`hidden sm:flex ${sidebarOpen ? 'w-64' : 'w-0'} flex-shrink-0 transition-all duration-300 overflow-hidden`}>
        <Sidebar onMobileClose={() => setMobileOpen(false)} />
      </div>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="sm:hidden fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative w-72 h-full z-10">
            <Sidebar onMobileClose={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      <main className="flex-1 flex flex-col min-w-0 relative">
        {/* Mobile top bar */}
        <div className="sm:hidden flex items-center gap-3 px-4 py-3 border-b border-dark-700 bg-dark-950">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-lg bg-dark-800 border border-dark-600 text-dark-300"
          >
            <Menu size={18} />
          </button>
          <div className="flex items-center gap-2 flex-1">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-accent to-green-ai flex items-center justify-center text-xs font-bold text-white">
              AI
            </div>
            <span className="text-sm font-medium text-dark-100">Shaxsiy AI</span>
          </div>
        </div>

        {/* Desktop menu toggle */}
        {!sidebarOpen && (
          <button
            onClick={toggleSidebar}
            className="hidden sm:flex absolute top-4 left-4 z-10 p-2 rounded-lg bg-dark-800 border border-dark-600 text-dark-300 hover:text-dark-100 transition-colors"
          >
            <Menu size={16} />
          </button>
        )}

        <ChatWindow />
      </main>
    </div>
  )
}