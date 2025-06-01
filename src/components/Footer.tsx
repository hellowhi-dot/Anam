import React from 'react';
import { motion } from 'framer-motion';
import { Send, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <motion.div 
            className="mb-6 flex items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Send size={24} className="mr-2 text-primary-400" />
            <span className="font-serif text-2xl font-semibold">WanderSoul</span>
          </motion.div>
          
          <motion.p 
            className="max-w-md mb-8 text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            A journey to inspire the one who's meant to fly. From Jamshedpur to the world.
          </motion.p>
          
          <motion.div 
            className="flex justify-center space-x-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <a href="#dreammap" className="text-gray-400 hover:text-primary-400 transition">DreamMap</a>
            <a href="#gallery" className="text-gray-400 hover:text-primary-400 transition">Gallery</a>
            <a href="#quotes" className="text-gray-400 hover:text-primary-400 transition">Quotes</a>
            <a href="#timeline" className="text-gray-400 hover:text-primary-400 transition">Timeline</a>
          </motion.div>
          
          <motion.div 
            className="text-sm text-gray-400 flex items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <span>Made by Itsraj786iul with</span>
            <Heart size={14} className="mx-1 text-primary-400" fill="#f472b6" />
            <span>in {currentYear}</span>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;