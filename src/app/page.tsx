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
