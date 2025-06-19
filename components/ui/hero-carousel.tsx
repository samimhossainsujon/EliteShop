'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react';
import { Button } from './button';

interface CarouselSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  cta: string;
}

const slides: CarouselSlide[] = [
  {
    id: '1',
    title: 'Premium Electronics',
    subtitle: 'Latest Tech Collection',
    description: 'Discover cutting-edge gadgets and electronics with unbeatable prices',
    image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg',
    cta: 'Shop Electronics',
  },
  {
    id: '2',
    title: 'Fashion Forward',
    subtitle: 'New Season Arrivals',
    description: 'Trendy styles and timeless classics for every occasion',
    image: 'https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg',
    cta: 'Explore Fashion',
  },
  {
    id: '3',
    title: 'Home Essentials',
    subtitle: 'Transform Your Space',
    description: 'Beautiful furniture and decor to make your house a home',
    image: 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg',
    cta: 'Shop Home',
  },
];

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="relative h-[500px] md:h-[600px] overflow-hidden rounded-lg">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
            index === currentSlide ? 'translate-x-0' : 
            index < currentSlide ? '-translate-x-full' : 'translate-x-full'
          }`}
        >
          <div
            className="w-full h-full bg-cover bg-center relative"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative z-10 h-full flex items-center">
              <div className="container mx-auto px-4">
                <div className="max-w-2xl text-white">
                  <p className="text-emerald-300 font-medium mb-2 text-sm uppercase tracking-wide">
                    {slide.subtitle}
                  </p>
                  <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-xl mb-8 text-gray-200 leading-relaxed">
                    {slide.description}
                  </p>
                  <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                    <ShoppingBag className="mr-2 h-5 w-5" />
                    {slide.cta}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 border-white/30 text-white backdrop-blur-sm hover:bg-white/30"
        onClick={goToPrevious}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 border-white/30 text-white backdrop-blur-sm hover:bg-white/30"
        onClick={goToNext}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}