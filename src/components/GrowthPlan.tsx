import React from 'react';
import { MapPin, Building, Globe } from 'lucide-react';

const GrowthPlan: React.FC = () => {
  const phases = [
    {
      icon: MapPin,
      phase: 'Phase 1',
      title: 'Lancement Local',
      description: 'Déploiement dans 3 villes pilotes pour tester et optimiser l\'expérience utilisateur',
      timeline: 'Q1 2025',
      color: 'from-green-400 to-green-600'
    },
    {
      icon: Building,
      phase: 'Phase 2',
      title: 'Expansion Régionale',
      description: 'Extension à l\'échelle régionale avec intégration de nouvelles catégories de professionnels',
      timeline: 'Q3 2025',
      color: 'from-cyan-400 to-cyan-600'
    },
    {
      icon: Globe,
      phase: 'Phase 3',
      title: 'Déploiement National',
      description: 'Couverture nationale complète et lancement de fonctionnalités avancées',
      timeline: 'Q1 2026',
      color: 'from-pink-400 to-pink-600'
    }
  ];

  return (
    <section className="py-20 bg-gray-900 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-pink-500 animate-pulse"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Notre feuille de route
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Une croissance maîtrisée pour offrir la meilleure expérience à tous nos utilisateurs
          </p>
        </div>

        <div className="space-y-8">
          {phases.map((phase, index) => (
            <div 
              key={index}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="grid lg:grid-cols-3 gap-8 items-center">
                {/* Timeline indicator */}
                <div className="flex lg:flex-col items-center lg:items-start space-x-4 lg:space-x-0 lg:space-y-4">
                  <div className={`bg-gradient-to-r ${phase.color} p-4 rounded-2xl`}>
                    <phase.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-center lg:text-left">
                    <div className="text-sm text-gray-400 font-semibold uppercase tracking-wide">
                      {phase.phase}
                    </div>
                    <div className="text-lg font-bold text-white">
                      {phase.timeline}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="lg:col-span-2 bg-white/10 backdrop-blur-sm p-8 rounded-3xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                  <h3 className="text-2xl font-bold text-white mb-4">{phase.title}</h3>
                  <p className="text-gray-300 leading-relaxed text-lg">{phase.description}</p>
                </div>
              </div>

              {/* Connector line (except for last item) */}
              {index < phases.length - 1 && (
                <div className="flex justify-center lg:justify-start lg:ml-8 my-6">
                  <div className="w-px h-12 bg-gradient-to-b from-gray-600 to-transparent"></div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Vision statement */}
        <div className="mt-20 text-center animate-fade-in delay-600">
          <div className="bg-gradient-to-r from-cyan-500 to-pink-500 p-8 rounded-3xl text-white max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">Notre vision pour 2026</h3>
            <p className="text-xl text-cyan-100 leading-relaxed">
              Devenir la référence européenne de la mise en relation professionnelle, 
              avec plus d'1 million d'utilisateurs actifs et un écosystème complet de services.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GrowthPlan;