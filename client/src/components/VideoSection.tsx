import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function VideoSection() {
  return (
    <section id="video-section" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/2 aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/FJRo0cwV6LY"
                  title="What is CodeShield?"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="w-full md:w-1/2 p-6 flex flex-col justify-center">
                <h2 className="text-2xl font-bold mb-4">What is CodeShield?</h2>
                <p className="mb-4">
                  CodeShield is your ultimate companion in secure software development. It provides comprehensive
                  security scanning, AI-powered recommendations, and real-time collaboration features to ensure your
                  code remains protected against potential threats.
                </p>
                <Button>Learn More</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

