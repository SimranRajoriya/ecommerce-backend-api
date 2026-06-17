import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Banner: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const banners = [
    {
      id: 1,
      title: 'Summer Collection 2024',
      subtitle: 'Up to 50% OFF',
      color: 'from-blue-500 to-blue-700',
      emoji: '☀️',
    },
    {
      id: 2,
      title: 'Electronics Sale',
      subtitle: 'Latest gadgets at unbeatable prices',
      color: 'from-purple-500 to-purple-700',
      emoji: '📱',
    },
    {
      id: 3,
      title: 'Fashion Fiesta',
      subtitle: 'Trendy styles for everyone',
      color: 'from-pink-500 to-pink-700',
      emoji: '👗',
    },
    {
      id: 4,
      title: 'Home & Kitchen',
      subtitle: 'Make your home beautiful',
      color: 'from-orange-500 to-orange-700',
      emoji: '🏠',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  return (
    <div className="relative w-full h-80 md:h-96 overflow-hidden rounded-lg shadow-lg">
      {/* Slides */}
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute w-full h-full transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className={`w-full h-full bg-gradient-to-r ${banner.color} flex items-center justify-center`}>
            <div className="text-center text-white space-y-4">
              <div className="text-6xl md:text-8xl">{banner.emoji}</div>
              <h1 className="text-4xl md:text-5xl font-bold">{banner.title}</h1>
              <p className="text-xl md:text-2xl opacity-90">{banner.subtitle}</p>
              <button className="mt-6 bg-white text-gray-900 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition">
                Shop Now
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 transition z-10"
      >
        <ChevronLeft className="w-6 h-6 text-gray-900" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 transition z-10"
      >
        <ChevronRight className="w-6 h-6 text-gray-900" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition ${
              index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
