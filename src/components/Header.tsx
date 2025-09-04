import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { installPWA, isInstalled } = usePWAInstall();

  const handleDownloadClick = async () => {
    await installPWA();
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { href: '#features', label: 'Fonctionnalités' },
    { href: '#demo', label: 'Démo' },
    { href: '#business', label: 'Modèle' },
    { href: '#faq', label: 'FAQ' }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg bg-gradient-to-r from-cyan-500 to-pink-500 p-1">
              <img 
                src="/icons/android-launchericon-192-192.png" 
                alt="Usemy Logo" 
                className="w-full h-full object-contain bg-white rounded-lg"
                onError={(e) => {
                  console.log('Erreur chargement logo:', e);
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
            <span className={`text-2xl font-bold bg-gradient-to-r from-cyan-600 to-pink-600 bg-clip-text text-transparent ${
              isScrolled ? '' : 'text-white'
            }`}>
              USEMY
            </span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`font-medium transition-colors duration-200 hover:text-cyan-600 ${
                  isScrolled ? 'text-gray-700' : 'text-white'
                }`}
              >
                {item.label}
              </a>
            ))}
            <button 
              onClick={handleDownloadClick}
              className="bg-gradient-to-r from-cyan-500 to-pink-500 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              {isInstalled ? 'Déjà installé' : 'Télécharger'}
            </button>
          </nav>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className={`h-6 w-6 ${isScrolled ? 'text-gray-700' : 'text-white'}`} />
            ) : (
              <Menu className={`h-6 w-6 ${isScrolled ? 'text-gray-700' : 'text-white'}`} />
            )}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-4 py-3 space-y-3">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block text-gray-700 font-medium hover:text-cyan-600 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <button 
              onClick={handleDownloadClick}
              className="w-full bg-gradient-to-r from-cyan-500 to-pink-500 text-white py-2 rounded-full font-semibold"
            >
              {isInstalled ? 'Déjà installé' : 'Télécharger'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;