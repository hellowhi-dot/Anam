import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Heart, Star } from 'lucide-react';

const HiddenMessage: React.FC = () => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [hasClicked, setHasClicked] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.3
  });

  const handleStarClick = () => {
    setHasClicked(true);
  };

  const handleReveal = () => {
    setIsRevealed(true);
  };

  return (
    <section ref={ref} className="py-16 md:py-24 bg-soft-lavender/30 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <AnimatePresence>
          {!hasClicked && (
            <motion.div 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 1, scale: 1, rotate: 360 } : { opacity: 0, scale: 0 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ 
                duration: 1,
                type: "spring",
                stiffness: 200,
                damping: 10
              }}
              whileHover={{ scale: 1.2, rotate: 380 }}
              onClick={handleStarClick}
            >
              <Star size={80} className="text-secondary-400 drop-shadow-lg" fill="#a78bfa" />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {hasClicked && !isRevealed && (
            <motion.div 
              className="max-w-2xl mx-auto bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <p className="text-xl font-serif mb-6">
                "This place exists because someone out there believes in you more than you know."
              </p>
              <button
                onClick={handleReveal}
                className="px-6 py-2 bg-secondary-500 text-white rounded-full hover:bg-secondary-600 transition"
              >
                Reveal?
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isRevealed && (
            <motion.div 
              className="max-w-2xl mx-auto bg-gradient-to-r from-primary-100 to-secondary-100 rounded-xl shadow-lg p-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="mb-6 flex justify-center">
                <Heart size={40} className="text-primary-500" fill="#f472b6" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">
                From Someone Who Believes In You
              </h3>
              <p className="text-gray-700 mb-6">
                You are destined for greatness. Your journey from Jamshedpur to the world is just beginning, and though you may not see the path clearly now, know that your dreams are valid and achievable.
              </p>
              <p className="text-gray-700 mb-6">
                From 12th to BBA to MBA - every step is leading you somewhere beautiful. Your determination, your spirit, and your heart will take you places you've only dreamed of.
              </p>
              <p className="italic text-gray-600">
                This message will always be here for you whenever you need a reminder of how special you are.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default HiddenMessage;