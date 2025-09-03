import React from 'react';
import { Download, Apple, Play } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

const HeroSection: React.FC = () => {
  const { installPWA, isInstalled } = usePWAInstall();

  const handleDownloadClick = async () => {
    await installPWA();
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-cyan-600 via-cyan-500 to-pink-500 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left column - Content */}
          <div className="text-center lg:text-left space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                Trouvez le bon
                <span className="block bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
                  professionnel
                </span>
                en quelques clics
              </h1>
              <p className="text-xl md:text-2xl text-cyan-100 font-medium">
                Comme vous trouvez l'amour sur Tinder !
              </p>
              <p className="text-lg text-cyan-100/90 max-w-lg mx-auto lg:mx-0">
                USEMY révolutionne la mise en relation professionnelle avec un système de matching intelligent et intuitif.
              </p>
            </div>

            {/* Download buttons */}
            <div className="download-buttons flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button 
                onClick={handleDownloadClick}
                className="group bg-white text-gray-900 px-8 py-4 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-3"
              >
                <Apple className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                <div className="text-left">
                  <div className="text-sm text-gray-600">
                    {isInstalled ? 'Déjà installé' : 'Télécharger sur'}
                  </div>
                  <div className="font-bold">App Store</div>
                </div>
              </button>
              
              <button 
                onClick={handleDownloadClick}
                className="group bg-gray-900 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-3"
              >
                <Play className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                <div className="text-left">
                  <div className="text-sm text-gray-300">
                    {isInstalled ? 'Déjà installé' : 'Télécharger sur'}
                  </div>
                  <div className="font-bold">Google Play</div>
                </div>
              </button>
            </div>

            <div className="flex items-center justify-center lg:justify-start space-x-6 text-white/80">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm">Gratuit pour les particuliers</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                <span className="text-sm">Interface web en développement</span>
              </div>
            </div>
          </div>

          {/* Right column - Phone mockup */}
          <div className="flex justify-center lg:justify-end animate-fade-in delay-300">
            <div className="relative">
              {/* Phone frame */}
              <div className="bg-gray-900 p-3 rounded-[2.5rem] shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="bg-white rounded-[2rem] overflow-hidden w-80 h-[640px] relative">
                  {/* Screen content */}
                  <div className="bg-gradient-to-b from-cyan-50 to-pink-50 h-full p-6 flex flex-col">
                    {/* Status bar */}
                    <div className="flex justify-between items-center mb-6">
                      <div className="text-sm font-medium">9:41</div>
                      <div className="flex space-x-1">
                        <div className="w-1 h-1 bg-gray-800 rounded-full"></div>
                        <div className="w-1 h-1 bg-gray-800 rounded-full"></div>
                        <div className="w-1 h-1 bg-gray-800 rounded-full"></div>
                      </div>
                    </div>

                    {/* App interface mockup */}
                    <div className="flex-1 flex flex-col items-center justify-center space-y-4">
                      <div className="w-48 h-64 bg-gradient-to-br from-cyan-200 to-pink-200 rounded-3xl shadow-lg flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-white rounded-full mx-auto mb-3 flex items-center justify-center">
                            <span className="text-2xl">🔧</span>
                          </div>
                          <h3 className="font-bold text-gray-800">Alex Martin</h3>
                          <p className="text-sm text-gray-600">Plombier certifié</p>
                          <div className="flex justify-center mt-2">
                            <div className="flex text-yellow-400">
                              ⭐⭐⭐⭐⭐
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-4">
                        <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white">
                          ❌
                        </div>
                        <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-white">
                          ⭐
                        </div>
                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white">
                          ❤️
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-bold animate-bounce">
                Nouveau !
              </div>
              <div className="absolute -bottom-4 -left-4 bg-green-400 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                Cashback !
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;