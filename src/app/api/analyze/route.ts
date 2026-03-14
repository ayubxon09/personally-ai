import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { code, language, task } = await req.json()

    const apiKey = process.env.APIFREELLM_KEY
    if (!apiKey) {
      return NextResponse.json({ error: 'API key sozlanmagan.' }, { status: 500 })
    }

    const prompt = `Sen professional kod tahlilchisan. Quyidagi kodni chuqur tahlil qil:

Kod tili: ${language || 'auto-detect'}
Vazifa: ${task || 'Umumiy tahlil'}

Kod:
\`\`\`${language || ''}
${code}
\`\`\`

Quyidagi formatda toliq tahlil ber:
1. Umumiy baholash
2. Xatolar va muammolar
3. Xavfsizlik zaifliklar
4. Performance masalalari
5. Tuzatilgan kod
6. Tavsiyalar`

    const response = await fetch('https://apifreellm.com/api/v1/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ message: prompt }),
    })

    const data = await response.json()

    if (!data.success) {
      return NextResponse.json({ error: data.error || 'Tahlil qilishda xatolik.' }, { status: 500 })
    }

    return NextResponse.json({ result: data.response })
  } catch (error) {
    console.error('Analyze API error:', error)
    return NextResponse.json({ error: 'Tahlil qilishda xatolik.' }, { status: 500 })
  }
}
