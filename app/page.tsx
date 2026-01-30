'use client'

import { useState } from 'react'
import GeneratorForm from '@/components/GeneratorForm'
import LoadingState from '@/components/LoadingState'
import PostResult from '@/components/PostResult'
import ImageResult from '@/components/ImageResult'
import { generateLinkedInPost, GeneratePostResponse } from '@/lib/n8n'

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<GeneratePostResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleGenerate = async (topic: string, targetAudience: string) => {
    setIsLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await generateLinkedInPost(topic, targetAudience)
      if (response.success) {
        setResult(response)
      } else {
        setError('Generation failed. Please try again.')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setResult(null)
    setError(null)
  }

  return (
    <main className="min-h-screen p-8 md:p-16">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <header className="mb-12">
          <h1 className="brutal-title text-5xl md:text-7xl mb-2">
            LINKEDIN POST
          </h1>
          <h2 className="brutal-title text-5xl md:text-7xl text-brutal-gray">
            GENERATOR_
          </h2>
        </header>

        {/* Main Content */}
        {!result ? (
          <div className="space-y-8">
            <GeneratorForm onSubmit={handleGenerate} isLoading={isLoading} />

            {isLoading && <LoadingState />}

            {error && (
              <div className="brutal-container p-6 border-brutal-red">
                <p className="font-mono text-brutal-red text-sm">
                  ERROR: {error}
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-8">
            <PostResult post={result.post} />

            {result.image && <ImageResult imageBase64={result.image} />}

            <button
              onClick={handleReset}
              className="brutal-button bg-brutal-white text-brutal-black hover:bg-brutal-black hover:text-brutal-white"
            >
              ← GENERATE ANOTHER
            </button>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t-3 border-brutal-black">
          <p className="font-mono text-xs text-brutal-gray uppercase tracking-wider">
            Powered by n8n + AI
          </p>
        </footer>
      </div>
    </main>
  )
}
