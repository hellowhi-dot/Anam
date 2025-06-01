import React from 'react';
import { motion } from 'framer-motion';
import { Music, Volume2, VolumeX } from 'lucide-react';

interface HeroProps {
  toggleMusic: () => void;
  isMusicPlaying: boolean;
}

const Hero: React.FC<HeroProps> = ({ toggleMusic, isMusicPlaying }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-hero-pattern bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-900/70 via-secondary-800/70 to-accent-900/70"></div>
      </div>

      {/* Animated clouds and birds */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-[10%] left-[5%] w-40 h-20 bg-white/20 rounded-full blur-xl"
          animate={{ 
            x: [0, 40, 0],
            opacity: [0.5, 0.7, 0.5]
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div 
          className="absolute top-[20%] right-[15%] w-60 h-24 bg-white/30 rounded-full blur-xl"
          animate={{ 
            x: [0, -60, 0],
            opacity: [0.6, 0.8, 0.6]
          }}
          transition={{ 
            duration: 18, 
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        <motion.div 
          className="absolute top-[15%] left-[30%]"
          animate={{ 
            x: [0, window.innerWidth],
            y: [0, -50, 0, -20, 0]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity,
            repeatType: "loop"
          }}
        >
          <div className="text-white text-3xl">✈️</div>
        </motion.div>
        
        <motion.div 
          className="absolute top-[30%] right-[40%]"
          animate={{ 
            x: [-50, -window.innerWidth],
            y: [0, 30, 0, 10, 0]
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity,
            repeatType: "loop"
          }}
        >
          <div className="text-white text-xl">🕊️</div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl mx-auto"
        >
          <motion.h1 
            variants={itemVariants}
            className="font-serif text-3xl md:text-5xl font-bold text-white mb-6 leading-tight"
          >
            To the girl with stars in her eyes and wanderlust in her soul — this journey is yours.
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-white/90 text-lg md:text-xl mb-8 font-light max-w-2xl mx-auto"
          >
            From 12th standard to the world, your adventure is just beginning.
          </motion.p>
          
          <motion.div variants={itemVariants}>
            <a 
              href="#dreammap"
              className="inline-block bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-medium px-8 py-3 rounded-full shadow-lg hover:shadow-xl transform transition hover:-translate-y-1 duration-300"
            >
              Start Exploring
            </a>
          </motion.div>
        </motion.div>
        
        {/* Music toggle */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          onClick={toggleMusic}
          className="absolute bottom-8 right-8 bg-white/10 backdrop-blur-sm p-3 rounded-full hover:bg-white/20 transition"
          title={isMusicPlaying ? "Pause music" : "Play music"}
        >
          {isMusicPlaying ? (
            <Volume2 size={24} className="text-white" />
          ) : (
            <VolumeX size={24} className="text-white" />
          )}
        </motion.button>
      </div>
    </section>
  );
};

export default Hero;