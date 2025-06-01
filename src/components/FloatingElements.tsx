import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Send, Star, Feather } from 'lucide-react';

const FloatingElements: React.FC = () => {
  // Create an array of elements with their properties
  const elements = [
    { 
      Icon: Send, 
      color: 'text-primary-400',
      size: 24,
      position: 'top-[15%] left-[10%]',
      animation: 'float-slow'
    },
    { 
      Icon: Star, 
      color: 'text-secondary-300',
      size: 20,
      position: 'top-[30%] right-[15%]',
      animation: 'float'
    },
    { 
      Icon: MapPin, 
      color: 'text-accent-400',
      size: 18,
      position: 'bottom-[25%] left-[20%]',
      animation: 'float-fast'
    },
    { 
      Icon: Feather, 
      color: 'text-primary-300',
      size: 22,
      position: 'bottom-[40%] right-[25%]',
      animation: 'float-slow'
    },
    { 
      Icon: Star, 
      color: 'text-secondary-400',
      size: 16,
      position: 'top-[60%] left-[80%]',
      animation: 'float-fast'
    }
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {elements.map((element, index) => (
        <div 
          key={index} 
          className={`absolute ${element.position}`}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ duration: 1, delay: index * 0.2 }}
            className={`animate-${element.animation}`}
          >
            <element.Icon size={element.size} className={element.color} />
          </motion.div>
        </div>
      ))}
    </div>
  );
};

export default FloatingElements;