'use client'

import { useState } from 'react'

interface PostResultProps {
  post: string
}

export default function PostResult({ post }: PostResultProps) {
  const [copied, setCopied] = useState(false)
  const characterCount = post.length
  const maxCharacters = 3000

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(post)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="brutal-container">
      <div className="flex items-center justify-between p-4 border-b-3 border-brutal-black">
        <span className="brutal-label mb-0">GENERATED POST</span>
        <div className="flex items-center gap-4">
          <span className={`text-xs font-mono ${characterCount > maxCharacters ? 'text-brutal-red' : 'text-brutal-gray'}`}>
            {characterCount}/{maxCharacters}
          </span>
          <button
            onClick={handleCopy}
            className="px-4 py-2 border-3 border-brutal-black bg-brutal-white text-brutal-black font-mono text-sm font-bold uppercase tracking-wider hover:bg-brutal-black hover:text-brutal-white transition-none"
          >
            {copied ? 'COPIED!' : 'COPY'}
          </button>
        </div>
      </div>
      <div className="p-6">
        <pre className="font-mono text-sm whitespace-pre-wrap leading-relaxed">
          {post}
        </pre>
      </div>
    </div>
  )
}
