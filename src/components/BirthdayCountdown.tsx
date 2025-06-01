import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ReactConfetti from 'react-confetti';
import { Calendar, Gift } from 'lucide-react';

interface BirthdayCountdownProps {
  triggerConfetti: () => void;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const BirthdayCountdown: React.FC<BirthdayCountdownProps> = ({ triggerConfetti }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [showMessage, setShowMessage] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.3
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      let birthday = new Date(now.getFullYear(), 3, 14); // April is month 3 (0-indexed)
      
      // If this year's birthday has passed, use next year's birthday
      if (now > birthday) {
        birthday = new Date(now.getFullYear() + 1, 3, 14);
      }
      
      const difference = birthday.getTime() - now.getTime();
      
      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        };
      } else {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Initial calculation
    setTimeLeft(calculateTimeLeft());

    return () => clearInterval(timer);
  }, []);

  const handleClick = () => {
    setShowMessage(true);
    setShowConfetti(true);
    triggerConfetti();
    
    setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
  };

  return (
    <section ref={ref} className="py-16 md:py-24 bg-gradient-to-b from-white to-soft-pink/30 relative">
      {showConfetti && (
        <ReactConfetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={500}
          gravity={0.1}
        />
      )}
      
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">The Next Chapter</h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Every day brings you closer to new beginnings and special moments.
          </p>
        </motion.div>

        <motion.div 
          className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex flex-col md:flex-row">
            <div className="bg-primary-600 text-white p-6 md:p-8 md:w-1/3 flex flex-col justify-center items-center">
              <Calendar size={40} className="mb-4" />
              <h3 className="text-xl font-semibold mb-2">Birthday Countdown</h3>
              <p className="text-white/80 text-center">Click to celebrate a special day</p>
            </div>
            
            <div className="p-6 md:p-8 md:w-2/3">
              {!showMessage ? (
                <div className="text-center">
                  <div className="mb-6">
                    <div className="flex justify-center space-x-4">
                      <div className="flex flex-col items-center">
                        <span className="text-3xl md:text-4xl font-bold text-primary-600">{timeLeft.days}</span>
                        <span className="text-xs text-gray-500">DAYS</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-3xl md:text-4xl font-bold text-primary-600">{timeLeft.hours}</span>
                        <span className="text-xs text-gray-500">HOURS</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-3xl md:text-4xl font-bold text-primary-600">{timeLeft.minutes}</span>
                        <span className="text-xs text-gray-500">MINUTES</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-3xl md:text-4xl font-bold text-primary-600">{timeLeft.seconds}</span>
                        <span className="text-xs text-gray-500">SECONDS</span>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleClick}
                    className="px-6 py-2 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition flex items-center justify-center mx-auto"
                  >
                    <Gift size={18} className="mr-2" />
                    Celebrate Now
                  </button>
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  <h3 className="text-2xl font-serif font-bold text-primary-600 mb-4">
                    April 14
                  </h3>
                  <p className="text-lg text-gray-700 mb-6">
                    A beautiful day when someone extraordinary was born.
                  </p>
                  <p className="italic text-gray-600">
                    May your next birthday bring you joy, adventures, and dreams come true!
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BirthdayCountdown;