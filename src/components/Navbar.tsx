import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Send } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navbarClasses = `fixed w-full z-50 transition-all duration-300 ${
    isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-2' : 'bg-transparent py-4'
  }`;

  const linkClasses = `font-sans text-sm font-medium transition-all duration-300 ${
    isScrolled ? 'text-gray-800 hover:text-primary-600' : 'text-white hover:text-white/80'
  }`;

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 }
  };

  const menuVariants = {
    closed: { opacity: 0, x: '100%' },
    open: { opacity: 1, x: 0 }
  };

  return (
    <nav className={navbarClasses}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <Send size={24} className={`mr-2 ${isScrolled ? 'text-primary-600' : 'text-white'}`} />
            <span className={`font-serif text-xl font-semibold ${isScrolled ? 'text-gray-800' : 'text-white'}`}>
              WanderSoul-AnamSharif
            </span>
          </motion.div>

          {/* Desktop Menu */}
          <motion.div 
            className="hidden md:flex space-x-8"
            variants={navVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.a href="#dreammap" className={linkClasses} variants={itemVariants}>DreamMap</motion.a>
            <motion.a href="#gallery" className={linkClasses} variants={itemVariants}>Gallery</motion.a>
            <motion.a href="#quotes" className={linkClasses} variants={itemVariants}>Quotes</motion.a>
            <motion.a href="#timeline" className={linkClasses} variants={itemVariants}>Timeline</motion.a>
            <motion.a href="#quiz" className={linkClasses} variants={itemVariants}>Quiz</motion.a>
          </motion.div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu}
              className={`p-2 rounded-full ${isScrolled ? 'text-gray-800' : 'text-white'}`}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div 
        className="md:hidden fixed inset-0 bg-gradient-to-b from-primary-700 to-secondary-800 z-50 pt-20"
        variants={menuVariants}
        initial="closed"
        animate={isMenuOpen ? "open" : "closed"}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col items-center space-y-6 p-8">
          <a href="#dreammap" className="text-white text-xl font-medium" onClick={toggleMenu}>DreamMap</a>
          <a href="#gallery" className="text-white text-xl font-medium" onClick={toggleMenu}>Gallery</a>
          <a href="#quotes" className="text-white text-xl font-medium" onClick={toggleMenu}>Quotes</a>
          <a href="#timeline" className="text-white text-xl font-medium" onClick={toggleMenu}>Timeline</a>
          <a href="#quiz" className="text-white text-xl font-medium" onClick={toggleMenu}>Quiz</a>
          <button onClick={toggleMenu} className="mt-8 px-4 py-2 border border-white text-white rounded-full">
            Close
          </button>
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;