import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  School, 
  GraduationCap, 
  Briefcase, 
  Building, 
  Globe
} from 'lucide-react';
import { timelineItems } from '../data/timelineItems';

const Timeline: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const iconMap = {
    'school': School,
    'graduation-cap': GraduationCap,
    'briefcase': Briefcase,
    'building': Building,
    'globe': Globe
  };

  return (
    <section id="timeline" ref={ref} className="py-16 md:py-24 bg-white relative">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">From Here to CEO</h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Every great journey has its milestones. Here's a glimpse of the path that could unfold.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-200"></div>

          {/* Timeline items */}
          {timelineItems.map((item, index) => {
            const IconComponent = iconMap[item.icon as keyof typeof iconMap];
            const isEven = index % 2 === 0;
            
            return (
              <motion.div 
                key={index}
                className={`relative flex items-center justify-between mb-12 ${
                  isEven ? 'flex-row' : 'flex-row-reverse'
                } md:mb-24`}
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -50 : 50 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                {/* Content */}
                <div className={`w-5/12 ${isEven ? 'text-right pr-8' : 'text-left pl-8'}`}>
                  <h3 className="font-serif text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>

                {/* Icon */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-secondary-100 border-4 border-white flex items-center justify-center z-10">
                  <IconComponent size={20} className="text-secondary-600" />
                </div>

                {/* Empty space for the other side */}
                <div className="w-5/12"></div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Timeline;