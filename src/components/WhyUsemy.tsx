import React from 'react';
import { Sparkles, Target, Zap, Users } from 'lucide-react';

const WhyUsemy: React.FC = () => {
  const uniqueFeatures = [
    {
      icon: Sparkles,
      title: 'Interface Intuitive',
      description: 'Design moderne inspiré des meilleures apps de dating pour une expérience fluide et addictive'
    },
    {
      icon: Target,
      title: 'Géolocalisation Intelligente',
      description: 'Algorithme avancé qui trouve les pros les plus proches et disponibles selon vos critères'
    },
    {
      icon: Zap,
      title: 'Matching Révolutionnaire',
      description: 'Like, Super Like, Pass - un système familier qui facilite les connexions professionnelles'
    },
    {
      icon: Users,
      title: 'Contenu Engageant',
      description: 'Stories, avis détaillés, posts des professionnels - créez une vraie relation de confiance'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-cyan-500 to-pink-500"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Pourquoi USEMY est
            <span className="block bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
              révolutionnaire ?
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Nous avons réinventé la mise en relation professionnelle en nous inspirant des codes du dating moderne
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {uniqueFeatures.map((feature, index) => (
            <div 
              key={index} 
              className="group animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-3xl border border-white/20 hover:bg-white/20 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl">
                <div className="bg-gradient-to-r from-cyan-500 to-pink-500 p-4 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { number: '10K+', label: 'Professionnels' },
            { number: '50K+', label: 'Particuliers' },
            { number: '95%', label: 'Satisfaction' },
            { number: '24/7', label: 'Support' }
          ].map((stat, index) => (
            <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 100 + 800}ms` }}>
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-gray-300 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUsemy;