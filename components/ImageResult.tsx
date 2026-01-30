'use client'

interface ImageResultProps {
  imageBase64: string
}

export default function ImageResult({ imageBase64 }: ImageResultProps) {
  const handleDownload = () => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    const filename = `linkedin-post-${timestamp}.png`

    const link = document.createElement('a')
    link.href = `data:image/png;base64,${imageBase64}`
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="brutal-container">
      <div className="flex items-center justify-between p-4 border-b-3 border-brutal-black">
        <span className="brutal-label mb-0">GENERATED IMAGE</span>
      </div>
      <div className="p-4">
        <div className="border-3 border-brutal-black">
          <img
            src={`data:image/png;base64,${imageBase64}`}
            alt="Generated LinkedIn post image"
            className="w-full h-auto block"
          />
        </div>
      </div>
      <div className="p-4 pt-0">
        <button
          onClick={handleDownload}
          className="brutal-button"
        >
          DOWNLOAD IMAGE ↓
        </button>
      </div>
    </div>
  )
}
