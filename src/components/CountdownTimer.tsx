import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Countdown from 'react-countdown';
import { Heart } from 'lucide-react';

const CountdownTimer: React.FC = () => {
  const [showMessage, setShowMessage] = useState(false);
  const targetDate = new Date('2025-06-04T00:00:00');

  const renderer = ({ days, hours, minutes, seconds }: any) => (
    <div className="grid grid-cols-4 gap-4 text-center">
      <div className="flex flex-col">
        <span className="text-4xl md:text-5xl font-bold text-neon-pink">{days}</span>
        <span className="text-sm text-champagne/60">DAYS</span>
      </div>
      <div className="flex flex-col">
        <span className="text-4xl md:text-5xl font-bold text-neon-pink">{hours}</span>
        <span className="text-sm text-champagne/60">HOURS</span>
      </div>
      <div className="flex flex-col">
        <span className="text-4xl md:text-5xl font-bold text-neon-pink">{minutes}</span>
        <span className="text-sm text-champagne/60">MINUTES</span>
      </div>
      <div className="flex flex-col">
        <span className="text-4xl md:text-5xl font-bold text-neon-pink">{seconds}</span>
        <span className="text-sm text-champagne/60">SECONDS</span>
      </div>
    </div>
  );

  return (
    <section className="min-h-screen relative flex items-center justify-center bg-black py-20">
      <div className="absolute inset-0 bg-gradient-to-b from-midnight-900/50 to-black/90" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl font-handwriting text-neon-pink mb-8"
        >
          June 4: The Night We Write
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          onClick={() => setShowMessage(true)}
          className="bg-midnight-900/30 backdrop-blur-sm p-8 rounded-2xl cursor-pointer hover:bg-midnight-900/40 transition-all"
        >
          <Countdown date={targetDate} renderer={renderer} />
        </motion.div>

        <AnimatePresence>
          {showMessage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-8 text-champagne/90"
            >
              <div className="flex justify-center mb-4">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                  }}
                >
                  <Heart className="text-neon-pink" size={32} />
                </motion.div>
              </div>
              <p className="font-handwriting text-xl">
                One night. No timelines. Just us.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default CountdownTimer;