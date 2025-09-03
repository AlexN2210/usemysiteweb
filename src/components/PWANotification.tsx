import React, { useState, useEffect } from 'react';
import { Smartphone, X } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

const PWANotification: React.FC = () => {
  const { isStandalone } = usePWAInstall();
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    // Afficher la notification si l'app est en mode PWA
    if (isStandalone) {
      setShowNotification(true);
      
      // Masquer automatiquement après 5 secondes
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isStandalone]);

  const handleClose = () => {
    setShowNotification(false);
  };

  if (!showNotification || !isStandalone) {
    return null;
  }

  return (
    <div className="pwa-notification">
      <div className="flex items-center gap-3">
        <Smartphone className="w-5 h-5 text-cyan-400" />
        <div>
          <div className="font-semibold">🎉 Bienvenue dans l'app Usemy !</div>
          <div className="text-sm opacity-90">Vous utilisez maintenant l'application native</div>
        </div>
        <button
          onClick={handleClose}
          className="ml-2 text-white/70 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default PWANotification;
