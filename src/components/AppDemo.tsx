import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const AppDemo: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState(0);
  
  const screens = [
    {
      title: 'Découverte',
      description: 'Parcourez les profils des professionnels proches de vous',
      content: '🔍'
    },
    {
      title: 'Matching',
      description: 'Swipez pour exprimer votre intérêt',
      content: '💝'
    },
    {
      title: 'Chat',
      description: 'Communiquez directement avec les professionnels',
      content: '💬'
    },
    {
      title: 'Booking',
      description: 'Réservez et planifiez vos interventions',
      content: '📅'
    }
  ];

  const nextScreen = () => {
    setCurrentScreen((prev) => (prev + 1) % screens.length);
  };

  const prevScreen = () => {
    setCurrentScreen((prev) => (prev - 1 + screens.length) % screens.length);
  };

  return (
    <section id="demo" className="py-20 bg-gradient-to-b from-cyan-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-600 to-pink-600 bg-clip-text text-transparent mb-6">
            Découvrez l'application
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Une interface pensée pour simplifier chaque étape de votre recherche
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Phone mockup */}
          <div className="flex-1 flex justify-center animate-fade-in">
            <div className="relative">
              <div className="bg-gray-900 p-4 rounded-[3rem] shadow-2xl">
                <div className="bg-white rounded-[2.5rem] overflow-hidden w-80 h-[680px] relative">
                  <div className="bg-gradient-to-b from-cyan-50 to-pink-50 h-full p-8 flex flex-col items-center justify-center">
                    <div className="text-8xl mb-6 animate-bounce">
                      {screens[currentScreen].content}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">
                      {screens[currentScreen].title}
                    </h3>
                    <p className="text-center text-gray-600 px-4">
                      {screens[currentScreen].description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation arrows */}
              <button
                onClick={prevScreen}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-3 hover:shadow-xl transition-all duration-300"
              >
                <ChevronLeft className="h-6 w-6 text-gray-700" />
              </button>
              
              <button
                onClick={nextScreen}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-3 hover:shadow-xl transition-all duration-300"
              >
                <ChevronRight className="h-6 w-6 text-gray-700" />
              </button>
            </div>
          </div>

          {/* Feature grid */}
          <div className="flex-1 space-y-8 animate-fade-in delay-300">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Fonctionnalités principales</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {screens.map((screen, index) => (
                  <div
                    key={index}
                    className={`p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
                      currentScreen === index
                        ? 'border-cyan-500 bg-white shadow-lg'
                        : 'border-gray-200 bg-white/50 hover:border-pink-300'
                    }`}
                    onClick={() => setCurrentScreen(index)}
                  >
                    <div className="text-3xl mb-3">{screen.content}</div>
                    <h4 className="font-bold text-gray-900 mb-2">{screen.title}</h4>
                    <p className="text-sm text-gray-600">{screen.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-cyan-500 to-pink-500 p-6 rounded-2xl text-white">
              <h4 className="text-xl font-bold mb-2">🎯 Match parfait garanti</h4>
              <p>Notre algorithme intelligent analyse vos préférences pour vous proposer les professionnels les plus adaptés à vos besoins.</p>
            </div>
          </div>
        </div>

        {/* Screen indicator dots */}
        <div className="flex justify-center mt-12 space-x-2">
          {screens.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentScreen(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentScreen === index 
                  ? 'bg-gradient-to-r from-cyan-500 to-pink-500 scale-125' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AppDemo;