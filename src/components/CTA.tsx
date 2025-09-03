import React from 'react';
import { Apple, Play, ArrowRight, Sparkles } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

const CTA: React.FC = () => {
  const { installPWA, isInstalled } = usePWAInstall();

  const handleDownloadClick = async () => {
    await installPWA();
  };

  return (
    <section className="py-20 bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-20 w-32 h-32 bg-white/10 rounded-full animate-float"></div>
        <div className="absolute bottom-10 right-20 w-24 h-24 bg-yellow-300/20 rounded-full animate-float delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-pink-300/20 rounded-full animate-float delay-500"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8 animate-fade-in">
          {/* Main heading */}
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full">
              <Sparkles className="h-5 w-5" />
              <span className="font-medium">Rejoignez la révolution</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              Parce que trouver le bon professionnel
              <span className="block text-yellow-300">
                ne devrait pas être un casse-tête !
              </span>
            </h2>
            
            <p className="text-xl md:text-2xl text-cyan-100 max-w-4xl mx-auto leading-relaxed">
              Téléchargez USEMY dès maintenant et découvrez une nouvelle façon de connecter avec les meilleurs professionnels de votre région.
            </p>
          </div>

          {/* Download buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in delay-300">
            <button 
              onClick={handleDownloadClick}
              className="group bg-white text-gray-900 px-10 py-5 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-4 min-w-[280px]"
            >
              <Apple className="h-8 w-8 group-hover:scale-110 transition-transform duration-300" />
              <div className="text-left">
                <div className="text-sm text-gray-600">
                  {isInstalled ? 'Déjà installé' : 'Télécharger sur'}
                </div>
                <div className="font-bold text-lg">App Store</div>
              </div>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            
            <button 
              onClick={handleDownloadClick}
              className="group bg-gray-900 text-white px-10 py-5 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-4 min-w-[280px]"
            >
              <Play className="h-8 w-8 group-hover:scale-110 transition-transform duration-300" />
              <div className="text-left">
                <div className="text-sm text-gray-300">
                  {isInstalled ? 'Déjà installé' : 'Télécharger sur'}
                </div>
                <div className="font-bold text-lg">Google Play</div>
              </div>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>

          {/* Additional info */}
          <div className="grid md:grid-cols-3 gap-6 mt-16 animate-fade-in delay-500">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
              <h4 className="text-lg font-bold text-white mb-2">🚀 Lancement imminent</h4>
              <p className="text-cyan-100">Soyez parmi les premiers à découvrir USEMY</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
              <h4 className="text-lg font-bold text-white mb-2">💻 Interface web</h4>
              <p className="text-cyan-100">Version web en développement pour 2025</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
              <h4 className="text-lg font-bold text-white mb-2">🎁 Offre de lancement</h4>
              <p className="text-cyan-100">Cashback doublé les premiers mois</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;