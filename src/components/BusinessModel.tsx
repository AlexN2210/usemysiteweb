import React from 'react';
import { Gift, Crown, TrendingUp, Shield } from 'lucide-react';

const BusinessModel: React.FC = () => {
  return (
    <section id="business" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-600 to-pink-600 bg-clip-text text-transparent mb-6">
            Un modèle équitable
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            USEMY propose une approche innovative où chacun y trouve son compte
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* For individuals */}
          <div className="animate-fade-in">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-3xl border border-green-200">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-green-500 p-3 rounded-xl">
                  <Gift className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Particuliers</h3>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-lg font-semibold text-green-800">100% Gratuit</span>
                </div>
                <p className="text-gray-700 ml-5">
                  Téléchargement, utilisation et matching entièrement gratuits
                </p>

                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-lg font-semibold text-green-800">Programme Cashback</span>
                </div>
                <p className="text-gray-700 ml-5">
                  Gagnez de l'argent sur chaque prestation réalisée via l'app
                </p>
              </div>

              <div className="bg-green-100 p-4 rounded-xl">
                <p className="text-green-800 font-medium text-center">
                  💰 Jusqu'à 5% de cashback sur vos prestations !
                </p>
              </div>
            </div>
          </div>

          {/* For professionals */}
          <div className="animate-fade-in delay-300">
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-8 rounded-3xl border border-purple-200">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-purple-500 p-3 rounded-xl">
                  <Crown className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Professionnels</h3>
              </div>

              <div className="space-y-6 mb-8">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-lg font-semibold text-purple-800">Formule Starter</span>
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm">Gratuit</span>
                  </div>
                  <p className="text-gray-700 ml-5 text-sm">Profil de base, 5 matches par mois</p>
                </div>

                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-lg font-semibold text-purple-800">Formule Pro</span>
                    <span className="bg-gradient-to-r from-cyan-500 to-pink-500 text-white px-2 py-1 rounded-full text-sm">29€/mois</span>
                  </div>
                  <p className="text-gray-700 ml-5 text-sm">Matches illimités, analytics, boost de visibilité</p>
                </div>

                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-lg font-semibold text-purple-800">Formule Premium</span>
                    <span className="bg-gradient-to-r from-pink-500 to-cyan-500 text-white px-2 py-1 rounded-full text-sm">59€/mois</span>
                  </div>
                  <p className="text-gray-700 ml-5 text-sm">Tout Pro + Super Likes, priorité, stories</p>
                </div>
              </div>

              <div className="bg-purple-100 p-4 rounded-xl">
                <p className="text-purple-800 font-medium text-center">
                  🚀 14 jours d'essai gratuit pour toutes les formules !
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Value proposition */}
        <div className="mt-16 text-center animate-fade-in delay-600">
          <div className="bg-gradient-to-r from-cyan-500 to-pink-500 p-8 rounded-3xl text-white max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">Un écosystème gagnant-gagnant</h3>
            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div className="flex items-center space-x-4">
                <TrendingUp className="h-8 w-8 flex-shrink-0" />
                <div className="text-left">
                  <h4 className="font-bold">Croissance mutuelle</h4>
                  <p className="text-cyan-100">Plus de clients pour les pros, plus de cashback pour les particuliers</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Shield className="h-8 w-8 flex-shrink-0" />
                <div className="text-left">
                  <h4 className="font-bold">Confiance garantie</h4>
                  <p className="text-cyan-100">Vérification des professionnels et système d'avis fiable</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessModel;