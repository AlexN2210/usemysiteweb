import React from 'react';
import { X, Check, AlertCircle, Zap } from 'lucide-react';

const ProblemSolution: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-600 to-pink-600 bg-clip-text text-transparent mb-6">
            Révolutionnons la recherche de professionnels
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Fini les recherches frustrantes et les déceptions. USEMY transforme votre expérience.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Problem side */}
          <div className="space-y-6 animate-fade-in">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 bg-red-100 text-red-800 px-4 py-2 rounded-full mb-4">
                <AlertCircle className="h-5 w-5" />
                <span className="font-semibold">Le problème actuel</span>
              </div>
            </div>

            <div className="space-y-4">
              {[
                'Annuaires obsolètes et peu fiables',
                'Recherche complexe et chronophage',
                'Aucune garantie de qualité',
                'Pas de transparence sur les prix',
                'Contact difficile avec les pros'
              ].map((problem, index) => (
                <div key={index} className="flex items-center space-x-3 p-4 bg-red-50 rounded-xl border border-red-100">
                  <X className="h-5 w-5 text-red-500 flex-shrink-0" />
                  <span className="text-gray-700">{problem}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Solution side */}
          <div className="space-y-6 animate-fade-in delay-300">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full mb-4">
                <Zap className="h-5 w-5" />
                <span className="font-semibold">La solution USEMY</span>
              </div>
            </div>

            <div className="space-y-4">
              {[
                'Professionnels vérifiés et certifiés',
                'Matching intelligent en temps réel',
                'Avis clients authentiques et détaillés',
                'Tarifs transparents et négociables',
                'Communication directe et instantanée'
              ].map((solution, index) => (
                <div key={index} className="flex items-center space-x-3 p-4 bg-green-50 rounded-xl border border-green-100 transform hover:scale-102 transition-transform duration-200">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{solution}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;