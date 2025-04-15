"use client"

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useCallback } from "react";


interface Testimonial {
  id: number;
  name: string;
  company: string;
  quote: string;
  image: string;
  stars: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Jenny Wilson",
    company: "Grower.io",
    quote:
      "We love JobGenix! Our designers were using it for their projects, so we already knew what kind of design they want.",
    image: "/images2/girl.png",
    stars: 5,
  },
  {
    id: 2,
    name: "Devon Lane",
    company: "DLDesign.co",
    quote:
      "We love JobGenix! Our designers were using it for their projects, so we already knew what kind of design they want.",
    image: "/images2/boy (1).png",
    stars: 5,
  },
  {
    id: 3,
    name: "Alex Morgan",
    company: "CreativeHub.com",
    quote: "The platform has transformed how our team collaborates on design projects. Highly recommended!",
    image: "/placeholder.svg",
    stars: 5,
  },
];

export default function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const maxIndex = Math.ceil(testimonials.length / 2) - 1;
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // ✅ useCallback to prevent redefinition
  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const goToPrev = () => setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) goToNext();
    if (touchEndX.current - touchStartX.current > 50) goToPrev();
  };

  useEffect(() => {
    const interval = setInterval(goToNext, 5000);
    goToNext(); // Start immediately
    return () => clearInterval(interval);
  }, [goToNext]);

  const visibleTestimonials = () => {
    return testimonials.slice(currentIndex * 2, currentIndex * 2 + 2);
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto px-4 py-12 text-center ">
      
      <div
        className="overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex transition-transform duration-500 ease-in-out "
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {visibleTestimonials().map((testimonial) => (
            <div key={testimonial.id} className="w-1/2 flex flex-col md:flex-row items-center justify-center gap-6 px-6">
              <div className="w-full h-full rounded-lg overflow-hidden shadow-lg">
                <Image src={testimonial.image} alt={testimonial.name} width={500} height={500} className="w-full h-full object-cover" />
              </div>
              <div className="text-left max-w-lg">
                <div className="flex mb-2">
                  {Array.from({ length: testimonial.stars }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-blue-500 text-blue-500" />
                  ))}
                </div>
                <p className="text-lg font-medium mb-4">{testimonial.quote}</p>
                <p className="font-semibold">{testimonial.name} <span className="text-blue-400"> {testimonial.company}</span></p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={goToPrev}
        className="absolute left-[-1%] top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hidden md:flex"
        aria-label="Previous testimonial"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-0.5 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md flex "
        aria-label="Next testimonial "
      >
        <ChevronRight className="w-6 h-6 " />
      </button>

      <div className="flex justify-center mt-6 gap-2">
        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full  transition-colors ${currentIndex === index ? "bg-blue-500" : "bg-gray-300"}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
