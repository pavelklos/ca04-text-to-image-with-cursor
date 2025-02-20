I'll help you create a text-to-image generation app using Next.js 14, TypeScript, and the Replicate API. Let's start with the core components and pages.

First, let's create the main page component:

```typescript:src/app/page.tsx
import ImageGenerator from '@/components/ImageGenerator'

export default function Home() {
  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          AI Image Generator
        </h1>
        <ImageGenerator />
      </div>
    </main>
  )
}
```

Now let's create the main ImageGenerator component:

```typescript:src/app/components/ImageGenerator.tsx
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
```

Let's create the types file:

```typescript:src/app/lib/types.ts
export interface GeneratedImage {
  id: string
  url: string
  prompt: string
  timestamp: string
  options: {
    negativePrompt?: string
    numInferenceSteps?: number
    guidanceScale?: number
  }
}

export interface ImageGenerationOptions {
  negativePrompt?: string
  numInferenceSteps?: number
  guidanceScale?: number
}
```

Now let's create the form component:

```typescript:src/app/components/ImageGenerationForm.tsx
'use client'

import { useState } from 'react'
import { ImageGenerationOptions } from '@/lib/types'

interface Props {
  onSubmit: (prompt: string, options: ImageGenerationOptions) => Promise<void>
  isGenerating: boolean
}

export function ImageGenerationForm({ onSubmit, isGenerating }: Props) {
  const [prompt, setPrompt] = useState('')
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [options, setOptions] = useState<ImageGenerationOptions>({
    negativePrompt: '',
    numInferenceSteps: 50,
    guidanceScale: 7.5
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!prompt.trim()) return
    await onSubmit(prompt, options)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">
          Describe your image
        </label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          rows={3}
          placeholder="A serene landscape with mountains..."
          disabled={isGenerating}
        />
      </div>

      <button
        type="button"
        onClick={() => setShowAdvanced(!showAdvanced)}
        className="text-sm text-blue-600 hover:underline"
      >
        {showAdvanced ? 'Hide' : 'Show'} Advanced Options
      </button>

      {showAdvanced && (
        <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
          <div>
            <label className="block text-sm font-medium mb-2">
              Negative Prompt
            </label>
            <input
              type="text"
              value={options.negativePrompt}
              onChange={(e) => setOptions({...options, negativePrompt: e.target.value})}
              className="w-full p-2 border rounded"
              placeholder="What to avoid in the image..."
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Inference Steps
              </label>
              <input
                type="number"
                value={options.numInferenceSteps}
                onChange={(e) => setOptions({...options, numInferenceSteps: Number(e.target.value)})}
                className="w-full p-2 border rounded"
                min={10}
                max={150}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">
                Guidance Scale
              </label>
              <input
                type="number"
                value={options.guidanceScale}
                onChange={(e) => setOptions({...options, guidanceScale: Number(e.target.value)})}
                className="w-full p-2 border rounded"
                min={1}
                max={20}
                step={0.1}
              />
            </div>
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={isGenerating || !prompt.trim()}
        className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {isGenerating ? 'Generating...' : 'Generate Image'}
      </button>
    </form>
  )
}
```

This is the initial setup for the text-to-image generation app. I've created:

1. A main page component
2. The core ImageGenerator component that manages state and API calls
3. A detailed form component with advanced options
4. Type definitions for the app

Would you like me to continue with the ImageDisplay and ImageGallery components next? These components will handle:

- Displaying the generated image with download options
- Showing image metadata
- Creating a gallery of previously generated images with pagination
- Storing images in localStorage

Let me know if you want to proceed with these components or if you'd like to modify anything in the current setup.
