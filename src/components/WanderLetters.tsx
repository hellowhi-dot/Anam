import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail } from 'lucide-react';
import { wanderLetters } from '../data/wanderLetters';

const WanderLetters: React.FC = () => {
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.3
  });

  useEffect(() => {
    if (!inView) return;
    
    const interval = setInterval(() => {
      setCurrentLetterIndex((prevIndex) => (prevIndex + 1) % wanderLetters.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [inView]);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-soft-blue/30 to-cream relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">WanderLetters</h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Messages to your soul. Small reminders for big dreams.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <motion.div 
            className="bg-white rounded-xl shadow-lg p-8 md:p-10 flex flex-col md:flex-row items-center gap-6 md:gap-10"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-soft-lavender p-4 rounded-full">
              <Mail size={32} className="text-secondary-600" />
            </div>
            
            <div className="flex-1 min-h-[100px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentLetterIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="font-serif text-xl md:text-2xl text-gray-800 italic text-center"
                >
                  "{wanderLetters[currentLetterIndex].message}"
                </motion.p>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WanderLetters;