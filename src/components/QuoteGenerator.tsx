import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Quote } from 'lucide-react';
import { quotes } from '../data/quotes';

const QuoteGenerator: React.FC = () => {
  const [currentQuote, setCurrentQuote] = useState(quotes[0]);
  const [isTyping, setIsTyping] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);
  
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.3
  });

  useEffect(() => {
    if (inView) {
      // Get a random quote when section comes into view
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setCurrentQuote(quotes[randomIndex]);
      setIsTyping(true);
      setTypedText('');
    }
  }, [inView, refreshKey]);

  useEffect(() => {
    if (!isTyping) return;

    const text = currentQuote.text;
    let currentIndex = 0;
    
    const intervalId = setInterval(() => {
      if (currentIndex <= text.length) {
        setTypedText(text.substring(0, currentIndex));
        currentIndex++;
      } else {
        setIsTyping(false);
        clearInterval(intervalId);
      }
    }, 30);
    
    return () => clearInterval(intervalId);
  }, [currentQuote, isTyping]);

  const getRandomQuote = () => {
    setIsTyping(true);
    setTypedText('');
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setCurrentQuote(quotes[randomIndex]);
    setRefreshKey(prevKey => prevKey + 1);
  };

  const getBgColor = () => {
    switch(currentQuote.category) {
      case 'travel': return 'from-accent-100 to-accent-200';
      case 'self-love': return 'from-primary-100 to-primary-200';
      case 'business': return 'from-secondary-100 to-secondary-200';
      case 'womanhood': return 'from-soft-pink to-primary-100';
      default: return 'from-gray-100 to-gray-200';
    }
  };

  return (
    <section 
      id="quotes" 
      ref={ref} 
      className="py-16 md:py-24 relative overflow-hidden"
    >
      <motion.div 
        className={`absolute inset-0 bg-gradient-to-br ${getBgColor()} z-0`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        key={refreshKey}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">Your Daily Boost</h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            A little inspiration to carry with you on your journey. Refresh for more wisdom.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <motion.div 
            className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-8 md:p-10"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="mb-6 flex justify-center">
              <Quote size={32} className="text-primary-500" />
            </div>
            
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={currentQuote.text}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mb-6 text-center"
              >
                <p className="font-serif text-xl md:text-2xl text-gray-800 italic leading-relaxed min-h-[120px]">
                  {typedText}
                </p>
                <motion.footer
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isTyping ? 0 : 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-4 text-gray-600"
                >
                  <cite className="not-italic font-medium">— {currentQuote.author}</cite>
                </motion.footer>
              </motion.blockquote>
            </AnimatePresence>

            <div className="flex justify-center mt-8">
              <button
                onClick={getRandomQuote}
                disabled={isTyping}
                className={`px-6 py-2 rounded-full ${
                  isTyping
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-primary-500 text-white hover:bg-primary-600 transition'
                }`}
              >
                {isTyping ? 'Loading...' : 'New Quote'}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default QuoteGenerator;