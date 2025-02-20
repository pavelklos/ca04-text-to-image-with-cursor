'use client'

import { useState } from 'react'
import { ImageGenerationForm } from './ImageGenerationForm'
import { ImageDisplay } from './ImageDisplay'
import { ImageGallery } from './ImageGallery'
import { GeneratedImage } from '@/lib/types'

export default function ImageGenerator() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [currentImage, setCurrentImage] = useState<GeneratedImage | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleGenerate = async (prompt: string, options: any) => {
    setIsGenerating(true)
    setError(null)
    
    try {
      const response = await fetch('/api/replicate/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, ...options }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate image')
      }

      const data = await response.json()
      
      setCurrentImage({
        id: Date.now().toString(),
        url: data.output[0],
        prompt,
        timestamp: new Date().toISOString(),
        options
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="space-y-8">
      <ImageGenerationForm 
        onSubmit={handleGenerate}
        isGenerating={isGenerating}
      />
      
      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {currentImage && (
        <ImageDisplay image={currentImage} />
      )}

      <ImageGallery />
    </div>
  )
} 