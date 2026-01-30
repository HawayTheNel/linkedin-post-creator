'use client'

export default function LoadingState() {
  return (
    <div className="brutal-container p-8">
      <div className="flex items-center justify-center">
        <span className="font-mono text-lg font-bold tracking-wider uppercase">
          GENERATING<span className="cursor-blink">_</span>
        </span>
      </div>
      <p className="mt-4 text-center text-brutal-gray text-sm">
        This may take up to 60 seconds
      </p>
    </div>
  )
}
