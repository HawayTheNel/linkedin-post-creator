import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { topic, targetAudience } = body

    if (!topic || !targetAudience) {
      return NextResponse.json(
        { error: 'Missing required fields: topic and targetAudience' },
        { status: 400 }
      )
    }

    const response = await fetch('https://thenel.app.n8n.cloud/webhook/linkedin-post-generator', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic, targetAudience })
    })

    if (!response.ok) {
      const errorText = await response.text()
      return NextResponse.json(
        { error: `n8n webhook failed: ${errorText}` },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)

  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
