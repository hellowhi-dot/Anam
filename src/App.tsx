import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import DreamMap from './components/DreamMap';
import Gallery from './components/Gallery';
import QuoteGenerator from './components/QuoteGenerator';
import BirthdayCountdown from './components/BirthdayCountdown';
import HiddenMessage from './components/HiddenMessage';
import Timeline from './components/Timeline';
import PersonalityQuiz from './components/PersonalityQuiz';
import WanderLetters from './components/WanderLetters';
import Footer from './components/Footer';
import MusicPlayer from './components/MusicPlayer';
import FloatingElements from './components/FloatingElements';

function App() {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const toggleMusic = () => {
    setIsMusicPlaying(!isMusicPlaying);
  };

  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);
  };

  return (
    <div className="relative overflow-hidden">
      <Navbar />
      <MusicPlayer isPlaying={isMusicPlaying} toggleMusic={toggleMusic} />
      <FloatingElements />
      <AnimatePresence mode="wait">
        {showConfetti && <div className="fixed inset-0 z-50 pointer-events-none\" id="confetti-container" />}
      </AnimatePresence>
      
      <main className="relative">
        <Hero toggleMusic={toggleMusic} isMusicPlaying={isMusicPlaying} />
        <DreamMap />
        <Gallery />
        <QuoteGenerator />
        <BirthdayCountdown triggerConfetti={triggerConfetti} />
        <HiddenMessage />
        <Timeline />
        <PersonalityQuiz />
        <WanderLetters />
        <Footer />
      </main>
    </div>
  );
}

export default App;