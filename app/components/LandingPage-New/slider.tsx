"use client";

import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

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
      "We love JobGenix! Our designers were using it for their projects, so we already knew what kind of design they wanted.",
    image: "/images2/girl.png",
    stars: 5,
  },
  {
    id: 2,
    name: "Devon Lane",
    company: "DLDesign.co",
    quote:
      "JobGenix has transformed our design workflow. It's an indispensable tool for our team's creativity and efficiency.",
    image: "/images2/boy (1).png",
    stars: 5,
  },
  {
    id: 3,
    name: "Jane Doe",
    company: "InnovateCo",
    quote:
      "The intuitive interface and powerful features of JobGenix make it a joy to use. Highly recommend for any design professional.",
    image: "/images2/boy (1).png",
    stars: 4,
  },
  {
    id: 4,
    name: "John Smith",
    company: "GlobalDesigns",
    quote:
      "Switching to JobGenix was one of the best decisions we made. It has significantly boosted our productivity and design quality.",
    image: "/images2/boy (1).png",
    stars: 5,
  },
];

export default function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const maxIndex = Math.ceil(testimonials.length / 2) - 1;
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const minSwipeDistance = 50;
    const distance = touchStartX.current - touchEndX.current;

    if (distance > minSwipeDistance) {
      goToNext();
    } else if (distance < -minSwipeDistance) {
      goToPrev();
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  useEffect(() => {
    const interval = setInterval(goToNext, 5000);
    return () => clearInterval(interval);
  }, [goToNext]);

  // const getVisibleTestimonials = useCallback(() => {
  //   const startIndex = currentIndex * 2;

  //   return testimonials.slice(startIndex, startIndex + 2);
  // }, [currentIndex]);

  return (
    <div className="relative w-full max-w-6xl mx-auto px-4 py-12 text-center">
      <div
        className="overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {Array.from({ length: maxIndex + 1 }).map((_, slideIndex) => (
            <div
              key={slideIndex}
              className="min-w-full flex justify-center gap-6 px-6"
            >
              {testimonials
                .slice(slideIndex * 2, slideIndex * 2 + 2)
                .map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="w-1/2 flex flex-col md:flex-row items-center justify-center gap-6"
                  >
                    <div className="w-full h-full rounded-lg overflow-hidden shadow-lg">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={500}
                        height={500}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-left max-w-lg">
                      <div className="flex mb-2">
                        {Array.from({ length: testimonial.stars }).map(
                          (_, i) => (
                            <Star
                              key={i}
                              className="w-5 h-5 fill-blue-500 text-blue-500"
                            />
                          )
                        )}
                      </div>
                      <p className="text-lg font-medium mb-4">
                        {testimonial.quote}
                      </p>
                      <p className="font-semibold">
                        {testimonial.name}{" "}
                        <span className="text-blue-400">
                          {" "}
                          {testimonial.company}
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
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
        className="absolute right-0.5 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md flex"
        aria-label="Next testimonial"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="flex justify-center mt-6 gap-2">
        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors ${currentIndex === index ? "bg-blue-500" : "bg-gray-300"
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
