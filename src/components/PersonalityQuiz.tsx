import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MapPin, ArrowRight } from 'lucide-react';
import { quizQuestions, quizResults } from '../data/quizQuestions';

const PersonalityQuiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [result, setResult] = useState('');
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const handleAnswer = (questionId: number, value: string) => {
    setAnswers({ ...answers, [questionId]: value });
    
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate result
      calculateResult();
    }
  };

  const calculateResult = () => {
    // Count occurrences of each value
    const valueCounts: Record<string, number> = {};
    
    Object.values(answers).forEach(value => {
      valueCounts[value] = (valueCounts[value] || 0) + 1;
    });
    
    // Find the most common value
    let maxCount = 0;
    let mostCommonValue = '';
    
    Object.entries(valueCounts).forEach(([value, count]) => {
      if (count > maxCount) {
        maxCount = count;
        mostCommonValue = value;
      }
    });
    
    setResult(mostCommonValue);
    setShowResults(true);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setResult('');
  };

  const resultData = quizResults.find(r => r.id === result);

  return (
    <section id="quiz" ref={ref} className="py-16 md:py-24 bg-cream relative">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">Where Will Your Dreams Take You?</h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Discover which global destination aligns with your personality and ambitions.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            {!showResults ? (
              <motion.div 
                key="questions"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-white rounded-xl shadow-lg p-8"
              >
                <div className="mb-8">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div 
                      className="bg-primary-500 h-2 rounded-full"
                      initial={{ width: '0%' }}
                      animate={{ width: `${(currentQuestion / quizQuestions.length) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    ></motion.div>
                  </div>
                  <p className="text-right text-sm text-gray-500 mt-2">
                    Question {currentQuestion + 1} of {quizQuestions.length}
                  </p>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentQuestion}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">
                      {quizQuestions[currentQuestion].question}
                    </h3>
                    
                    <div className="space-y-4">
                      {quizQuestions[currentQuestion].options.map((option) => (
                        <motion.button
                          key={option.id}
                          onClick={() => handleAnswer(quizQuestions[currentQuestion].id, option.value)}
                          className="w-full text-left p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span className="font-medium text-gray-800">{option.text}</span>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div 
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="rounded-xl overflow-hidden shadow-lg"
              >
                {resultData && (
                  <div className="relative">
                    <div 
                      className="h-64 bg-cover bg-center"
                      style={{ backgroundImage: `url(${resultData.backgroundImage})` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-b from-primary-900/60 to-secondary-900/60"></div>
                    </div>
                    
                    <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6">
                      <MapPin size={40} className="text-white mb-4" />
                      <h3 className="font-serif text-3xl font-bold text-white mb-2">
                        {resultData.title}
                      </h3>
                    </div>
                    
                    <div className="bg-white p-6 md:p-8">
                      <p className="text-gray-700 mb-4">
                        {resultData.description}
                      </p>
                      <div className="bg-secondary-50 border-l-4 border-secondary-500 p-4 mb-6">
                        <h4 className="font-semibold text-gray-900 mb-1">Recommendation</h4>
                        <p className="text-gray-700">{resultData.recommendation}</p>
                      </div>
                      <div className="text-center">
                        <button
                          onClick={resetQuiz}
                          className="inline-flex items-center px-6 py-2 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition"
                        >
                          Take Quiz Again
                          <ArrowRight size={16} className="ml-2" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default PersonalityQuiz;