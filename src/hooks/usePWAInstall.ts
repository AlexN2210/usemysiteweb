import { useState, useEffect } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

interface PWAInstallState {
  isInstallable: boolean;
  isInstalled: boolean;
  isIOS: boolean;
  isAndroid: boolean;
  isStandalone: boolean;
  deferredPrompt: BeforeInstallPromptEvent | null;
}

export const usePWAInstall = () => {
  const [state, setState] = useState<PWAInstallState>({
    isInstallable: false,
    isInstalled: false,
    isIOS: false,
    isAndroid: false,
    isStandalone: false,
    deferredPrompt: null,
  });

  useEffect(() => {
    // Détecter le système d'exploitation
    const userAgent = navigator.userAgent;
    const isIOS = /iPad|iPhone|iPod/.test(userAgent);
    const isAndroid = /Android/.test(userAgent);
    
    // Vérifier si l'app est déjà installée (mode standalone)
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || 
                        (window.navigator as any).standalone === true;

    // Vérifier si l'app est vraiment installée
    // Détecter le paramètre ?pwa=true dans l'URL
    const urlParams = new URLSearchParams(window.location.search);
    const isFromPWA = urlParams.get('pwa') === 'true';
    
    // L'app est installée si elle est en mode standalone OU si elle vient de la PWA
    const isReallyInstalled = isStandalone || isFromPWA;

    console.log('🔍 État PWA initial:', {
      isIOS,
      isAndroid,
      isStandalone,
      isFromPWA,
      isReallyInstalled,
      url: window.location.href,
      userAgent: navigator.userAgent
    });

    setState(prev => ({
      ...prev,
      isIOS,
      isAndroid,
      isStandalone,
      isInstalled: isReallyInstalled,
    }));

    // Écouter l'événement beforeinstallprompt
    const handleBeforeInstallPrompt = (e: Event) => {
      console.log('🎉 beforeinstallprompt déclenché !', e);
      e.preventDefault();
      setState(prev => ({
        ...prev,
        isInstallable: true,
        deferredPrompt: e as BeforeInstallPromptEvent,
      }));
    };

    // Écouter l'événement appinstalled
    const handleAppInstalled = () => {
      setState(prev => ({
        ...prev,
        isInstalled: true,
        isInstallable: false,
        deferredPrompt: null,
      }));
    };

    // Écouter les changements de mode d'affichage
    const handleDisplayModeChange = () => {
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
      setState(prev => ({
        ...prev,
        isStandalone,
        isInstalled: isStandalone,
      }));
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    window.matchMedia('(display-mode: standalone)').addEventListener('change', handleDisplayModeChange);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.matchMedia('(display-mode: standalone)').removeEventListener('change', handleDisplayModeChange);
    };
  }, []);

  const installPWA = async (): Promise<boolean> => {
    console.log('🚀 Tentative d\'installation PWA...', {
      isInstalled: state.isInstalled,
      hasDeferredPrompt: !!state.deferredPrompt,
      isInstallable: state.isInstallable
    });

    if (state.isInstalled) {
      showToast('✅ Usemy est déjà installé sur votre appareil', 'info');
      return false;
    }

    if (state.deferredPrompt) {
      try {
        // Afficher le prompt d'installation natif
        await state.deferredPrompt.prompt();
        const { outcome } = await state.deferredPrompt.userChoice;
        
        if (outcome === 'accepted') {
          showToast('🎉 Usemy installé avec succès !', 'success');
          setState(prev => ({
            ...prev,
            deferredPrompt: null,
            isInstallable: false,
          }));
          return true;
        } else {
          showToast('Installation annulée', 'info');
          return false;
        }
      } catch (error) {
        console.error('Erreur lors de l\'installation:', error);
        showInstallGuide();
        return false;
      }
    } else {
      // Afficher le guide d'installation manuelle
      showInstallGuide();
      return false;
    }
  };

  const showInstallGuide = () => {
    // Pour iOS, on va déclencher un événement personnalisé pour afficher le guide
    if (state.isIOS) {
      const event = new CustomEvent('showIOSInstallGuide');
      window.dispatchEvent(event);
      return;
    }
    
    let message = '';
    
    if (state.isAndroid) {
      message = '📱 Sur Android : Appuyez sur le menu (⋮) dans votre navigateur puis "Installer l\'application"';
    } else {
      message = '💻 Sur ordinateur : Cliquez sur l\'icône d\'installation (⬇️) dans la barre d\'adresse de votre navigateur';
    }
    
    showToast(message, 'info', 8000);
  };

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'info', duration: number = 4000) => {
    // Supprimer les toasts existants
    const existingToasts = document.querySelectorAll('.pwa-toast');
    existingToasts.forEach(toast => toast.remove());

    const toast = document.createElement('div');
    toast.className = `pwa-toast pwa-toast-${type}`;
    toast.textContent = message;
    
    // Styles pour le toast
    const toastStyle = document.createElement('style');
    toastStyle.textContent = `
      .pwa-toast {
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 0, 0, 0.9);
        color: white;
        padding: 15px 25px;
        border-radius: 25px;
        font-size: 14px;
        font-weight: 500;
        z-index: 1001;
        opacity: 0;
        animation: toastSlide 0.3s ease forwards;
        max-width: 90%;
        text-align: center;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
      }
      
      .pwa-toast-success {
        background: linear-gradient(135deg, #4CAF50, #45a049);
      }
      
      .pwa-toast-info {
        background: linear-gradient(135deg, #2196F3, #1976D2);
      }
      
      .pwa-toast-error {
        background: linear-gradient(135deg, #f44336, #d32f2f);
      }
      
      @keyframes toastSlide {
        to {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }
      }
    `;
    
    if (!document.querySelector('.pwa-toast-styles')) {
      toastStyle.className = 'pwa-toast-styles';
      document.head.appendChild(toastStyle);
    }
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.style.animation = 'toastSlide 0.3s ease reverse';
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, duration);
  };

  const clearPWACache = async () => {
    try {
      // Vider le cache du service worker
      if ('caches' in window) {
        const cacheNames = await caches.keys();
        await Promise.all(
          cacheNames.map(cacheName => caches.delete(cacheName))
        );
        console.log('🧹 Cache PWA vidé');
      }

      // Forcer la mise à jour du service worker
      if ('serviceWorker' in navigator) {
        const registration = await navigator.serviceWorker.getRegistration();
        if (registration) {
          // Envoyer un message pour forcer la mise à jour
          registration.waiting?.postMessage({ type: 'SKIP_WAITING' });
          
          // Attendre un peu puis recharger
          setTimeout(() => {
            window.location.reload();
          }, 1000);
          return;
        }
      }

      // Réinitialiser l'état
      setState(prev => ({
        ...prev,
        isInstalled: false,
        isInstallable: false,
        deferredPrompt: null,
      }));

      // Recharger la page
      window.location.reload();
    } catch (error) {
      console.error('Erreur lors du nettoyage du cache:', error);
    }
  };

  const resetPWAState = () => {
    setState(prev => ({
      ...prev,
      isInstalled: false,
      isInstallable: false,
      deferredPrompt: null,
    }));
    console.log('🔄 État PWA réinitialisé');
  };

  const forceUpdate = async () => {
    try {
      if ('serviceWorker' in navigator) {
        const registration = await navigator.serviceWorker.getRegistration();
        if (registration) {
          // Forcer la mise à jour
          await registration.update();
          
          // Si un nouveau service worker est en attente, l'activer
          if (registration.waiting) {
            registration.waiting.postMessage({ type: 'SKIP_WAITING' });
            showToast('🔄 Mise à jour en cours...', 'info', 2000);
            
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          } else {
            showToast('✅ Application à jour !', 'success');
          }
        }
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
      showToast('❌ Erreur lors de la mise à jour', 'error');
    }
  };

  return {
    ...state,
    installPWA,
    showInstallGuide,
    clearPWACache,
    resetPWAState,
    forceUpdate,
  };
};
