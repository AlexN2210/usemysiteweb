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
  
  // Debug en développement seulement
  if (process.env.NODE_ENV === 'development') {
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
  }

  useEffect(() => {
    // Détecter si l'app est lancée en mode PWA
    const isStandaloneMode = window.matchMedia('(display-mode: standalone)').matches || 
                            (window.navigator as any).standalone === true;
    
    // Détecter si l'app est lancée depuis un lien PWA
    const urlParams = new URLSearchParams(window.location.search);
    const isFromPWA = urlParams.get('pwa') === 'true';
    
    // Debug en développement seulement
    if (process.env.NODE_ENV === 'development') {
      console.log('🔍 PWA Detection dans useEffect:', {
        isStandaloneMode,
        isFromPWA,
        url: window.location.href,
        search: window.location.search
      });
    }
    
    setIsPWA(isStandaloneMode || isFromPWA);

    // Ajouter une classe CSS pour le mode PWA
    if (isStandaloneMode || isFromPWA) {
      document.documentElement.classList.add('pwa-mode');
      document.body.classList.add('pwa-mode');
    } else {
      document.documentElement.classList.remove('pwa-mode');
      document.body.classList.remove('pwa-mode');
    }

    // Debug en développement seulement
    if (process.env.NODE_ENV === 'development') {
      console.log('🔍 PWA Detection:', {
        isStandaloneMode,
        isFromPWA,
        userAgent: navigator.userAgent,
        displayMode: window.matchMedia('(display-mode: standalone)').matches,
        url: window.location.href,
        urlParams: window.location.search
      });
    }

    // Mode PWA détecté (debug en développement seulement)
    if (process.env.NODE_ENV === 'development') {
      if (isStandaloneMode || isFromPWA) {
        console.log('🎉 MODE PWA ACTIVÉ !');
      } else {
        console.log('❌ Mode navigateur normal');
      }
    }

  }, [isStandalone, window.location.search]);

  // Debug en développement seulement
  if (process.env.NODE_ENV === 'development') {
    console.log('🔄 PWAWrapper render:', { isPWA, isStandalone });
  }

  // Appliquer les styles PWA
  if (isPWAMode) {
    document.documentElement.classList.add('pwa-mode');
    document.body.classList.add('pwa-mode');
    
    // Debug en développement seulement
    if (process.env.NODE_ENV === 'development') {
      console.log('🎉 MODE PWA ACTIVÉ - Styles appliqués !');
      console.log('🔍 Classes appliquées:', document.body.className);
    }
  } else {
    document.documentElement.classList.remove('pwa-mode');
    document.body.classList.remove('pwa-mode');
  }

  return (
    <div className={`app-container ${isPWA ? 'pwa-mode' : 'browser-mode'}`}>
      {children}
    </div>
  );
};

export default PWAWrapper;
