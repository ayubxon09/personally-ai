import { NextRequest, NextResponse } from 'next/server'
import { getModeById } from '@/lib/modes'

export async function POST(req: NextRequest) {
  try {
    const { messages, mode = 'general' } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid messages' }, { status: 400 })
    }

    const apiKey = process.env.APIFREELLM_KEY
    if (!apiKey) {
      return NextResponse.json({ error: 'API key sozlanmagan. .env.local faylini tekshiring.' }, { status: 500 })
    }

    const modeConfig = getModeById(mode)

    // Build conversation context
    const history = messages
      .map((m: { role: string; content: string }) =>
        m.role === 'user' ? `Foydalanuvchi: ${m.content}` : `AI: ${m.content}`
      )
      .join('\n')

    const fullMessage = `${modeConfig.systemPrompt}\n\nSuhbat tarixi:\n${history}`

    const response = await fetch('https://apifreellm.com/api/v1/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ message: fullMessage }),
    })

    const data = await response.json()

    // New API returns { success: true, response: "..." }
    if (!data.success) {
      console.error('ApiFreeLLM error:', data)
      return NextResponse.json(
        { error: data.error || 'AI xatolik qaytardi.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ content: data.response })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'AI bilan boglanishda xatolik yuz berdi.' },
      { status: 500 }
    )
  }
}
