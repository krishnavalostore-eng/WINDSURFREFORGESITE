import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Slide {
  id: number;
  imageUrl: string;
  text: string;
}

const defaultSlides: Slide[] = [
  { id: 1, imageUrl: "https://res.cloudinary.com/dcnqnbvp0/image/upload/q_auto,f_auto/v1772438388/Screenshot_2026-03-02_132646_zqstuf.png", text: "CREATE QUESTS." },
  { id: 2, imageUrl: "https://res.cloudinary.com/dcnqnbvp0/image/upload/q_auto,f_auto/v1772439761/Screenshot_2026-03-02_132706_ruxnuu.png", text: "RANK AUTO ASSIGNED" },
  { id: 3, imageUrl: "https://res.cloudinary.com/dcnqnbvp0/image/upload/q_auto,f_auto/v1772439890/Screenshot_2026-03-02_132742_gpyzfm.png", text: "FAKE COMPLETION DETECTED AND PUNISHED." }
];

export const Carousel = () => {
  const [slides, setSlides] = useState<Slide[]>(defaultSlides);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const res = await fetch('/api/slides');
        const data = await res.json();
        if (data && data.length > 0) {
          setSlides(data);
        }
      } catch (err) {
        console.error('Failed to fetch slides:', err);
      }
    };
    fetchSlides();
  }, []);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 10000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  if (slides.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full max-w-sm md:max-w-md mx-auto mt-16 aspect-[9/16] rounded-2xl overflow-hidden border border-system-neon/30 shadow-xl group">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <img
            src={slide.imageUrl.includes('cloudinary.com') ? slide.imageUrl.replace('/upload/', '/upload/q_auto:best,f_auto,e_sharpen:100,e_improve/') : slide.imageUrl}
            alt="Carousel Slide"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end justify-center pb-12 px-8">
            <p className="text-white text-lg md:text-xl lg:text-2xl font-bold text-center tracking-wide drop-shadow-lg whitespace-normal break-words">
              {slide.text}
            </p>
          </div>
        </div>
      ))}

      {slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-black/50 hover:bg-system-neon/80 text-white rounded-full transition-colors opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-black/50 hover:bg-system-neon/80 text-white rounded-full transition-colors opacity-0 group-hover:opacity-100"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? 'bg-system-neon w-6' : 'bg-white/50 hover:bg-white'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
