'use client'

import { useState } from 'react'

interface GeneratorFormProps {
  onSubmit: (topic: string, targetAudience: string) => void
  isLoading: boolean
}

export default function GeneratorForm({ onSubmit, isLoading }: GeneratorFormProps) {
  const [topic, setTopic] = useState('')
  const [targetAudience, setTargetAudience] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (topic.trim() && targetAudience.trim()) {
      onSubmit(topic.trim(), targetAudience.trim())
    }
  }

  return (
    <form onSubmit={handleSubmit} className="brutal-container p-8">
      <div className="mb-8">
        <label className="brutal-label" htmlFor="topic">
          TOPIC
        </label>
        <textarea
          id="topic"
          className="brutal-input resize-none"
          rows={3}
          placeholder="What should this post be about?"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <div className="mb-8">
        <label className="brutal-label" htmlFor="audience">
          TARGET AUDIENCE
        </label>
        <input
          type="text"
          id="audience"
          className="brutal-input"
          placeholder="Who is this post for?"
          value={targetAudience}
          onChange={(e) => setTargetAudience(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <button
        type="submit"
        className="brutal-button"
        disabled={isLoading || !topic.trim() || !targetAudience.trim()}
      >
        {isLoading ? 'GENERATING...' : 'GENERATE POST →'}
      </button>
    </form>
  )
}
