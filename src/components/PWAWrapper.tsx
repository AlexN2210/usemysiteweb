import React, { useEffect, useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface PWAWrapperProps {
  children: React.ReactNode;
}

const PWAWrapper: React.FC<PWAWrapperProps> = ({ children }) => {
  const { isStandalone } = usePWAInstall();
  const [isPWA, setIsPWA] = useState(false);

  useEffect(() => {
    // Détecter si l'app est lancée en mode PWA
    const isStandaloneMode = window.matchMedia('(display-mode: standalone)').matches || 
                            (window.navigator as any).standalone === true;
    
    // Détecter si l'app est lancée depuis un lien PWA
    const urlParams = new URLSearchParams(window.location.search);
    const isFromPWA = urlParams.get('source') === 'pwa';
    
    setIsPWA(isStandaloneMode || isFromPWA);

    // Ajouter une classe CSS pour le mode PWA
    if (isStandaloneMode || isFromPWA) {
      document.documentElement.classList.add('pwa-mode');
      document.body.classList.add('pwa-mode');
    } else {
      document.documentElement.classList.remove('pwa-mode');
      document.body.classList.remove('pwa-mode');
    }

    // Logger pour debug
    console.log('🔍 PWA Detection:', {
      isStandaloneMode,
      isFromPWA,
      userAgent: navigator.userAgent,
      displayMode: window.matchMedia('(display-mode: standalone)').matches
    });

  }, [isStandalone]);

  return (
    <div className={`app-container ${isPWA ? 'pwa-mode' : 'browser-mode'}`}>
      {children}
    </div>
  );
};

export default PWAWrapper;
