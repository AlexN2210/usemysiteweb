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
  
  // Détection Android spécifique
  const isAndroid = /Android/.test(navigator.userAgent);
  const isAndroidStandalone = isAndroid && (window.navigator as any).standalone === true;
  
  // Détection standalone (fonctionne sur Android)
  const isStandaloneDetected = window.matchMedia('(display-mode: standalone)').matches;
  
  const isPWAMode = isStandaloneMode || isFromPWA || isAndroidStandalone || isStandaloneDetected;
  
  const [isPWA, setIsPWA] = useState(isPWAMode);
  
  console.log('🔍 PWAWrapper initial:', {
    isFromPWA,
    isStandaloneMode,
    isAndroid,
    isAndroidStandalone,
    isStandaloneDetected,
    isPWAMode,
    url: window.location.href,
    userAgent: navigator.userAgent
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

  // Appliquer les styles PWA
  if (isPWAMode) {
    document.documentElement.classList.add('pwa-mode');
    document.body.classList.add('pwa-mode');
    console.log('🎉 MODE PWA ACTIVÉ - Styles appliqués !');
    console.log('🔍 Classes appliquées:', document.body.className);
  } else {
    document.documentElement.classList.remove('pwa-mode');
    document.body.classList.remove('pwa-mode');
  }

  return (
    <div className={`app-container ${isPWA ? 'pwa-mode' : 'browser-mode'}`}>
      {isPWAMode && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          background: '#FF0000',
          color: '#FFFFFF',
          padding: '10px',
          textAlign: 'center',
          zIndex: 9999,
          fontSize: '18px',
          fontWeight: 'bold'
        }}>
          🚨 PWA MODE ACTIVÉ - FOND BLEU ! 🚨
        </div>
      )}
      {children}
    </div>
  );
};

export default PWAWrapper;
