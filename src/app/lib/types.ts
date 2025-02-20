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