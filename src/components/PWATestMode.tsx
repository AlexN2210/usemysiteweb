import React, { useState } from 'react';
import { Smartphone, Monitor, RotateCcw } from 'lucide-react';

const PWATestMode: React.FC = () => {
  const [isTestMode, setIsTestMode] = useState(false);

  const enableTestMode = () => {
    // Simuler le mode PWA en ajoutant les classes CSS
    document.documentElement.classList.add('pwa-mode');
    document.body.classList.add('pwa-mode');
    setIsTestMode(true);
    
    // Afficher une notification
    const notification = document.createElement('div');
    notification.className = 'pwa-notification';
    notification.innerHTML = `
      <div style="display: flex; align-items: center; gap: 12px;">
        <div style="font-size: 20px;">📱</div>
        <div>
          <div style="font-weight: 600;">🎉 Mode PWA Test activé !</div>
          <div style="font-size: 14px; opacity: 0.9;">Simulation du mode application native</div>
        </div>
      </div>
    `;
    document.body.appendChild(notification);
    
    // Masquer automatiquement après 5 secondes
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 5000);
  };

  const disableTestMode = () => {
    // Désactiver le mode PWA
    document.documentElement.classList.remove('pwa-mode');
    document.body.classList.remove('pwa-mode');
    setIsTestMode(false);
  };

  const resetAll = () => {
    disableTestMode();
    // Recharger la page pour un reset complet
    window.location.reload();
  };

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 bg-black/90 text-white p-4 rounded-lg text-xs max-w-sm z-50">
      <h3 className="font-bold mb-2 flex items-center gap-2">
        <Monitor className="w-4 h-4" />
        Test Mode PWA
      </h3>
      
      <div className="space-y-2">
        <div className="text-xs opacity-75">
          Simuler le mode PWA en localhost
        </div>
        
        <div className="flex flex-col gap-1">
          {!isTestMode ? (
            <button 
              onClick={enableTestMode}
              className="bg-green-600 text-white px-3 py-2 rounded text-xs hover:bg-green-700 flex items-center gap-2"
            >
              <Smartphone className="w-3 h-3" />
              Activer Mode PWA
            </button>
          ) : (
            <button 
              onClick={disableTestMode}
              className="bg-yellow-600 text-white px-3 py-2 rounded text-xs hover:bg-yellow-700 flex items-center gap-2"
            >
              <Monitor className="w-3 h-3" />
              Désactiver Mode PWA
            </button>
          )}
          
          <button 
            onClick={resetAll}
            className="bg-gray-600 text-white px-3 py-2 rounded text-xs hover:bg-gray-700 flex items-center gap-2"
          >
            <RotateCcw className="w-3 h-3" />
            Reset Complet
          </button>
        </div>
        
        <div className="text-xs opacity-50 mt-2">
          Mode actuel: <span className={isTestMode ? 'text-green-400' : 'text-blue-400'}>
            {isTestMode ? 'PWA (Test)' : 'Navigateur'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PWATestMode;
