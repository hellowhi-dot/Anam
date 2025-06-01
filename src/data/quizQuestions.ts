import { QuizQuestion, QuizResult } from '../types';

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What's your ideal environment to thrive in?",
    options: [
      { id: "a", text: "Bustling city lights and skyscrapers", value: "new-york" },
      { id: "b", text: "Historic architecture with modern innovation", value: "london" },
      { id: "c", text: "Futuristic designs and luxurious surroundings", value: "dubai" },
      { id: "d", text: "Vibrant culture and diverse experiences", value: "mumbai" }
    ]
  },
  {
    id: 2,
    question: "How do you approach challenges?",
    options: [
      { id: "a", text: "Head-on with confidence and strategic thinking", value: "new-york" },
      { id: "b", text: "With careful analysis and traditional wisdom", value: "london" },
      { id: "c", text: "By finding innovative solutions others haven't considered", value: "dubai" },
      { id: "d", text: "With resilience and adaptability", value: "mumbai" }
    ]
  },
  {
    id: 3,
    question: "What's your dream workspace?",
    options: [
      { id: "a", text: "Corner office in a Manhattan skyscraper", value: "new-york" },
      { id: "b", text: "Elegant office overlooking the Thames", value: "london" },
      { id: "c", text: "Ultra-modern space with cutting-edge technology", value: "dubai" },
      { id: "d", text: "Dynamic environment that blends tradition with innovation", value: "mumbai" }
    ]
  },
  {
    id: 4,
    question: "What drives your ambition?",
    options: [
      { id: "a", text: "Being at the top of your field", value: "new-york" },
      { id: "b", text: "Building something with lasting impact", value: "london" },
      { id: "c", text: "Creating the future before others even imagine it", value: "dubai" },
      { id: "d", text: "Bringing positive change to your community", value: "mumbai" }
    ]
  },
  {
    id: 5,
    question: "How would you describe your leadership style?",
    options: [
      { id: "a", text: "Bold and decisive", value: "new-york" },
      { id: "b", text: "Thoughtful and diplomatic", value: "london" },
      { id: "c", text: "Visionary and transformational", value: "dubai" },
      { id: "d", text: "Adaptable and collaborative", value: "mumbai" }
    ]
  }
];

export const quizResults: QuizResult[] = [
  {
    id: "new-york",
    title: "You're a New York Visionary",
    description: "Bold, ambitious, and unstoppable - you're made for the fast-paced world of global business. Like New York, you never sleep on your dreams.",
    recommendation: "Consider programs that push you to your limits and connect you with global networks.",
    backgroundImage: "https://images.pexels.com/photos/290386/pexels-photo-290386.jpeg"
  },
  {
    id: "london",
    title: "You're a London Learner",
    description: "You blend tradition with innovation, valuing depth and substance. Your thoughtful approach to challenges makes you a natural leader.",
    recommendation: "Look for programs with strong historical foundations but forward-thinking approaches.",
    backgroundImage: "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg"
  },
  {
    id: "dubai",
    title: "You're a Dubai Dream Builder",
    description: "You see possibilities where others see desert. Your innovative thinking and willingness to break boundaries will take you far.",
    recommendation: "Seek environments that reward innovation and aren't afraid to reimagine the future.",
    backgroundImage: "https://images.pexels.com/photos/2044434/pexels-photo-2044434.jpeg"
  },
  {
    id: "mumbai",
    title: "You're a Mumbai Maverick",
    description: "Resilient, adaptable, and deeply connected to your roots. You transform challenges into opportunities with grace.",
    recommendation: "Find programs that will nurture your adaptability while challenging you to think globally.",
    backgroundImage: "https://images.pexels.com/photos/1031659/pexels-photo-1031659.jpeg"
  }
];