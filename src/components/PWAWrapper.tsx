import React, { useEffect, useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface PWAWrapperProps {
  children: React.ReactNode;
}

const PWAWrapper: React.FC<PWAWrapperProps> = ({ children }) => {
  const { isStandalone } = usePWAInstall();
  
  // Test direct de détection PWA
  const urlParams = new URLSearchParams(window.location.search);
  const isFromPWA = urlParams.get('pwa') === 'true';
  const isStandaloneMode = window.matchMedia('(display-mode: standalone)').matches;
  const isPWAMode = isStandaloneMode || isFromPWA;
  
  const [isPWA, setIsPWA] = useState(isPWAMode);
  
  console.log('🔍 PWAWrapper initial:', {
    isFromPWA,
    isStandaloneMode,
    isPWAMode,
    url: window.location.href
  });

  useEffect(() => {
    // Détecter si l'app est lancée en mode PWA
    const isStandaloneMode = window.matchMedia('(display-mode: standalone)').matches || 
                            (window.navigator as any).standalone === true;
    
    // Détecter si l'app est lancée depuis un lien PWA
    const urlParams = new URLSearchParams(window.location.search);
    const isFromPWA = urlParams.get('pwa') === 'true';
    
    console.log('🔍 PWA Detection dans useEffect:', {
      isStandaloneMode,
      isFromPWA,
      url: window.location.href,
      search: window.location.search
    });
    
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
      displayMode: window.matchMedia('(display-mode: standalone)').matches,
      url: window.location.href,
      urlParams: window.location.search
    });

    // Test visuel - changer la couleur de fond
    if (isStandaloneMode || isFromPWA) {
      document.body.style.backgroundColor = '#00FFFF';
      console.log('🎉 MODE PWA ACTIVÉ - Fond bleu appliqué !');
    } else {
      document.body.style.backgroundColor = '';
      console.log('❌ Mode navigateur normal');
    }

  }, [isStandalone, window.location.search]);

  console.log('🔄 PWAWrapper render:', { isPWA, isStandalone });

  return (
    <div className={`app-container ${isPWA ? 'pwa-mode' : 'browser-mode'}`}>
      {children}
    </div>
  );
};

export default PWAWrapper;
