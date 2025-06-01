import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { BookOpen, Wine, Moon, Star } from 'lucide-react';

const DualLife: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section ref={ref} className="min-h-screen bg-gradient-to-b from-gray-900 to-purple-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-gray-900/40 to-gray-900/60"></div>
      
      <div className="container mx-auto px-4 py-16 md:py-24">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center text-3xl md:text-4xl font-bold text-white mb-16"
        >
          CA by Day. Chaos by Heart.
        </motion.h2>

        <div className="flex flex-col md:flex-row gap-8 md:gap-16">
          {/* Day Life */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8"
          >
            <div className="flex items-center mb-6">
              <BookOpen className="text-amber-400 mr-3" size={24} />
              <h3 className="text-xl font-semibold text-white">Dedicated Scholar</h3>
            </div>
            
            <div className="space-y-4">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-white/10 rounded-lg p-4"
              >
                <p className="text-white/90">CA aspirations taking flight</p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="bg-white/10 rounded-lg p-4"
              >
                <p className="text-white/90">Late night study sessions</p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="bg-white/10 rounded-lg p-4"
              >
                <p className="text-white/90">Building dreams, one page at a time</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Night Life */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8"
          >
            <div className="flex items-center mb-6">
              <Wine className="text-pink-400 mr-3" size={24} />
              <h3 className="text-xl font-semibold text-white">Wild Spirit</h3>
            </div>
            
            <div className="space-y-4">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-white/10 rounded-lg p-4"
              >
                <p className="text-white/90">Rooftop conversations under stars</p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="bg-white/10 rounded-lg p-4"
              >
                <p className="text-white/90">Wine-tinted memories in making</p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="bg-white/10 rounded-lg p-4"
              >
                <p className="text-white/90">Dancing between chaos and charm</p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center text-xl text-white/80 italic mt-12"
        >
          She studies numbers but lives like poetry.
        </motion.p>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="absolute top-1/4 left-1/4"
          >
            <Moon className="text-purple-300" size={20} />
          </motion.div>
          
          <motion.div
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="absolute top-1/3 right-1/4"
          >
            <Star className="text-amber-300" size={16} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DualLife;