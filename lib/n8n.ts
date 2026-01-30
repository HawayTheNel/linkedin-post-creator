export interface GeneratePostResponse {
  success: boolean
  post: string
  image: string // base64 encoded
}

export async function generateLinkedInPost(
  topic: string,
  targetAudience: string
): Promise<GeneratePostResponse> {
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ topic, targetAudience })
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.error || `Failed to generate post: ${response.status}`)
  }

  return response.json()
}
