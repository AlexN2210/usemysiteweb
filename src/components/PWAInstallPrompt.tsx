import React, { useState, useEffect } from 'react';
import { Download, X, Smartphone, CheckCircle } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface PWAInstallPromptProps {
  className?: string;
  showDelay?: number; // Délai avant d'afficher le prompt (en ms)
}

const PWAInstallPrompt: React.FC<PWAInstallPromptProps> = ({ 
  className = '', 
  showDelay = 5000 
}) => {
  const { installPWA, isInstalled, isInstallable, showInstallGuide } = usePWAInstall();
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);

  useEffect(() => {
    // Afficher le prompt après un délai si l'app est installable
    const timer = setTimeout(() => {
      if (isInstallable && !isInstalled) {
        setShowPrompt(true);
      }
    }, showDelay);

    return () => clearTimeout(timer);
  }, [isInstallable, isInstalled, showDelay]);

  const handleInstall = async () => {
    setIsInstalling(true);
    try {
      await installPWA();
      setShowPrompt(false);
    } catch (error) {
      console.error('Erreur lors de l\'installation:', error);
    } finally {
      setIsInstalling(false);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
  };

  const handleShowGuide = () => {
    showInstallGuide();
    setShowPrompt(false);
  };

  if (isInstalled || !showPrompt) {
    return null;
  }

  return (
    <div className={`fixed bottom-4 right-4 z-50 ${className}`}>
      <div className="bg-gradient-to-r from-cyan-400 to-pink-500 text-white p-4 rounded-2xl shadow-lg max-w-sm animate-slide-up">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <Smartphone className="w-6 h-6" />
            <div>
              <h3 className="font-bold text-lg">Installer Usemy</h3>
              <p className="text-sm opacity-90">
                Ajoutez l'app à votre écran d'accueil
              </p>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="text-white/70 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={handleInstall}
            disabled={isInstalling}
            className="flex-1 bg-white text-cyan-500 px-4 py-2 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isInstalling ? (
              <>
                <div className="w-4 h-4 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                Installation...
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                Installer
              </>
            )}
          </button>
          
          <button
            onClick={handleShowGuide}
            className="px-4 py-2 text-white/80 hover:text-white transition-colors text-sm"
          >
            Guide
          </button>
        </div>
      </div>
    </div>
  );
};

export default PWAInstallPrompt;
