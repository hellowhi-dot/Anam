import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { galleryItems } from '../data/galleryItems';

const Gallery: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % galleryItems.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? galleryItems.length - 1 : prevIndex - 1
    );
  };

  return (
    <section id="gallery" ref={ref} className="py-16 md:py-24 bg-gradient-to-b from-cream to-white relative">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">12th Just Ended, Now What?</h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            The end of one chapter is just the beginning of another. Explore what comes next in your journey.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Carousel */}
          <div className="overflow-hidden rounded-xl shadow-xl">
            <motion.div 
              className="relative h-[400px] md:h-[500px] w-full"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {galleryItems.map((item, index) => (
                <motion.div
                  key={index}
                  className="absolute inset-0"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ 
                    opacity: currentIndex === index ? 1 : 0,
                    x: currentIndex === index ? 0 : 100,
                    zIndex: currentIndex === index ? 10 : 0
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="relative h-full w-full">
                    <img 
                      src={item.imageUrl} 
                      alt={item.title} 
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent flex flex-col justify-end p-6 md:p-8">
                      <h3 className="font-serif text-2xl md:text-3xl font-bold text-white mb-2">{item.title}</h3>
                      <p className="text-white/90 text-base md:text-lg max-w-md">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Navigation buttons */}
          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/30 backdrop-blur-sm hover:bg-white/50 rounded-full p-2 text-white z-20"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/30 backdrop-blur-sm hover:bg-white/50 rounded-full p-2 text-white z-20"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>

          {/* Indicators */}
          <div className="flex justify-center mt-4 space-x-2">
            {galleryItems.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  currentIndex === index ? 'bg-primary-500' : 'bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;