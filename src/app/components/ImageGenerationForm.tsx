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