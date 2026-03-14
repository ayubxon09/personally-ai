'use client'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Message } from '@/types'
import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

interface Props {
  message: Message
  isLast: boolean
  isLoading: boolean
}

export default function MessageBubble({ message, isLast, isLoading }: Props) {
  const isUser = message.role === 'user'
  const isEmpty = message.content === '' && isLoading

  return (
    <div className={`flex gap-3 py-2 animate-fade-in ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-accent to-green-ai flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold text-white">
          AI
        </div>
      )}

      <div className={`max-w-[80%] ${isUser ? 'max-w-[70%]' : 'max-w-[85%]'}`}>
        {isUser ? (
          <div className="bg-accent/20 border border-accent/30 rounded-2xl rounded-tr-sm px-4 py-2.5 text-dark-100 text-sm leading-relaxed">
            {message.content}
          </div>
        ) : (
          <div className={`text-dark-100 text-sm leading-relaxed ${isEmpty ? 'typing-cursor' : ''}`}>
            {isEmpty ? (
              <div className="flex gap-1 items-center py-2">
                <span className="w-1.5 h-1.5 bg-dark-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 bg-dark-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 bg-dark-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            ) : (
              <div className={`prose prose-invert max-w-none ${isLast && isLoading ? 'typing-cursor' : ''}`}>
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    code({ node, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || '')
                      const isInline = !match
                      if (isInline) {
                        return <code className={className} {...props}>{children}</code>
                      }
                      return (
                        <CodeBlock language={match[1]} code={String(children).replace(/\n$/, '')} />
                      )
                    },
                  }}
                >
                  {message.content}
                </ReactMarkdown>
              </div>
            )}
          </div>
        )}
      </div>

      {isUser && (
        <div className="w-7 h-7 rounded-full bg-dark-600 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold text-dark-200">
          S
        </div>
      )}
    </div>
  )
}

function CodeBlock({ language, code }: { language: string; code: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative rounded-xl overflow-hidden border border-dark-600 my-3">
      <div className="flex items-center justify-between px-4 py-2 bg-dark-800 border-b border-dark-600">
        <span className="text-xs text-dark-400 font-mono">{language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-dark-400 hover:text-dark-200 transition-colors"
        >
          {copied ? <Check size={12} className="text-green-ai" /> : <Copy size={12} />}
          {copied ? 'Nusxalandi!' : 'Nusxalash'}
        </button>
      </div>
      <SyntaxHighlighter
        style={vscDarkPlus}
        language={language}
        PreTag="div"
        customStyle={{ margin: 0, background: '#141414', fontSize: '0.8rem', padding: '1rem' }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  )
}
