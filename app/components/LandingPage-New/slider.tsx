"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface Testimonial {
  id: number
  name: string
  company: string
  quote: string
  image: string
  stars: number
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Jenny Wilson",
    company: "Grower.io",
    quote:
      "We love JobGenix! Our designers were using it for their projects, so we already knew what kind of design they want.",
    image: "/images2/girl.png?height=200&width=200",
    stars: 5,
  },
  {
    id: 2,
    name: "Devon Lane",
    company: "DLDesign.co",
    quote:
      "We love JobGenix ! Our designers were using it for their projects, so we already knew what kind of design they want.",
    image: "/images2/boy (1).png?height=100&width=100",
    stars: 5,
  },
  {
    id: 3,
    name: "Alex Morgan",
    company: "CreativeHub.com",
    quote: "The platform has transformed how our team collaborates on design projects. Highly recommended!",
    image: "/placeholder.svg?height=300&width=300",
    stars: 5,
  },
]

export default function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const maxIndex = Math.ceil(testimonials.length / 2) - 1
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  const goToNext = () => {
    if (isAnimating) return

    setIsAnimating(true)
    setCurrentIndex((prevIndex) => (prevIndex >= maxIndex ? 0 : prevIndex + 1))

    setTimeout(() => setIsAnimating(false), 500)
  }

  const goToPrev = () => {
    if (isAnimating) return

    setIsAnimating(true)
    setCurrentIndex((prevIndex) => (prevIndex <= 0 ? maxIndex : prevIndex - 1))

    setTimeout(() => setIsAnimating(false), 500)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      goToNext()
    } else if (touchEndX.current - touchStartX.current > 50) {
      goToPrev()
    }
  }

  // Auto-advance the slider every 5 seconds
  

  const visibleTestimonials = () => {
    const startIndex = currentIndex * 2
    return testimonials.slice(startIndex, startIndex + 2)
  }

  return (
    <div className="relative w-full max-w-6xl mx-auto px-4 py-12">
      <div
        className="overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className={cn("flex transition-transform duration-500 ease-in-out", isAnimating ? "pointer-events-none" : "")}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          <div className="w-full flex flex-col md:flex-row gap-6 md:gap-12 flex-shrink-0 ml-12">
            {visibleTestimonials().map((testimonial) => (
              <div key={testimonial.id} className="flex-1 flex flex-col">
                <div className="rounded-lg overflow-hidden mb-4 w-full max-w-[240px]">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    width={160}
                    height={160}
                    className="w-full h-auto object-cover aspect-square"
                  />
                </div>
                <div className="flex mb-2">
                  {Array.from({ length: testimonial.stars }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-blue-500 text-blue-500" />
                  ))}
                </div>
                <p className="text-lg font-medium mb-4">"{testimonial.quote}"</p>
                <div className="mt-auto">
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-gray-500">{testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={goToPrev}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10 hidden md:flex items-center justify-center"
        aria-label="Previous testimonial"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10 flex items-center justify-center"
        aria-label="Next testimonial"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      <div className="flex justify-center mt-6 gap-2">
        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              "w-2 h-2 rounded-full transition-colors",
              currentIndex === index ? "bg-blue-500" : "bg-gray-300",
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

