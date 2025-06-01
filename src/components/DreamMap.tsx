import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ComposableMap, Geographies, Geography, Marker, Line } from 'react-simple-maps';
import { useInView } from 'react-intersection-observer';
import { MapPin, X } from 'lucide-react';
import { cities } from '../data/cities';

const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

const DreamMap: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const handleCityClick = (cityName: string) => {
    setSelectedCity(selectedCity === cityName ? null : cityName);
  };

  const selectedCityData = cities.find(city => city.name === selectedCity);

  return (
    <section id="dreammap" ref={ref} className="py-16 md:py-24 bg-cream relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">DreamMap</h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Explore the cities that could be part of your journey. Each pin represents a destination with opportunities for growth, learning, and adventure.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative w-full h-[400px] md:h-[500px] bg-soft-blue/30 rounded-xl overflow-hidden"
        >
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              scale: 140,
              center: [0, 20]
            }}
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map(geo => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="#EAEAEC"
                    stroke="#D6D6DA"
                    style={{
                      default: { outline: "none" },
                      hover: { outline: "none", fill: "#F5F5F5" },
                      pressed: { outline: "none" },
                    }}
                  />
                ))
              }
            </Geographies>

            {/* Draw lines between cities */}
            {cities.map((city, i) => {
              if (i === 0) return null; // Skip first city to avoid self-connection
              return (
                <Line
                  key={`line-${city.name}`}
                  from={cities[0].coordinates}
                  to={city.coordinates}
                  stroke={city.name === "Jamshedpur" ? "#ec4899" : "#8b5cf6"}
                  strokeWidth={1}
                  strokeDasharray={city.name === "Jamshedpur" ? "0" : "5,5"}
                  strokeLinecap="round"
                />
              );
            })}

            {/* City markers */}
            {cities.map((city) => (
              <Marker 
                key={city.name} 
                coordinates={city.coordinates}
                onClick={() => handleCityClick(city.name)}
              >
                <motion.g
                  whileHover={{ scale: 1.2 }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 200, 
                    damping: 10,
                    delay: city.name === "Jamshedpur" ? 1 : 0.5
                  }}
                >
                  <circle
                    r={city.name === "Jamshedpur" ? 6 : 4}
                    fill={city.name === "Jamshedpur" ? "#ec4899" : "#8b5cf6"}
                    stroke="#fff"
                    strokeWidth={2}
                  />
                  <text
                    textAnchor="middle"
                    y={city.name === "Jamshedpur" ? -12 : -10}
                    style={{
                      fontFamily: "sans-serif",
                      fontSize: city.name === "Jamshedpur" ? 12 : 10,
                      fontWeight: city.name === "Jamshedpur" ? "bold" : "normal",
                      fill: city.name === "Jamshedpur" ? "#ec4899" : "#8b5cf6",
                    }}
                  >
                    {city.name}
                  </text>
                </motion.g>
              </Marker>
            ))}
          </ComposableMap>

          {/* City info card */}
          {selectedCity && selectedCityData && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-4 right-4 md:bottom-8 md:right-8 bg-white/90 backdrop-blur-sm p-4 md:p-6 rounded-lg shadow-lg max-w-xs"
            >
              <button 
                onClick={() => setSelectedCity(null)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              >
                <X size={16} />
              </button>
              <div className="flex items-start mb-3">
                <MapPin className="text-primary-500 mr-2 flex-shrink-0 mt-1" size={18} />
                <div>
                  <h3 className="font-serif font-semibold text-gray-900">{selectedCityData.name}</h3>
                  <p className="text-sm text-gray-600">{selectedCityData.description}</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm italic">"{selectedCityData.message}"</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default DreamMap;