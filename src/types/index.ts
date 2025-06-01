export interface City {
  name: string;
  coordinates: [number, number];
  description: string;
  message: string;
}

export interface Quote {
  text: string;
  author: string;
  category: 'travel' | 'self-love' | 'business' | 'womanhood';
}

export interface GalleryItem {
  title: string;
  description: string;
  imageUrl: string;
}

export interface TimelineItem {
  title: string;
  description: string;
  icon: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    id: string;
    text: string;
    value: string;
  }[];
}

export interface QuizResult {
  id: string;
  title: string;
  description: string;
  recommendation: string;
  backgroundImage: string;
}

export interface WanderLetter {
  id: number;
  message: string;
}