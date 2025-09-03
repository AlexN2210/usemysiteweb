import React, { useState, useEffect } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';

const PWADebug: React.FC = () => {
  const { 
    isInstallable, 
    isInstalled, 
    isIOS, 
    isAndroid, 
    isStandalone, 
    deferredPrompt,
    installPWA 
  } = usePWAInstall();

  const [debugInfo, setDebugInfo] = useState<any>({});

  useEffect(() => {
    const info = {
      userAgent: navigator.userAgent,
      isSecureContext: window.isSecureContext,
      serviceWorker: 'serviceWorker' in navigator,
      beforeInstallPrompt: !!deferredPrompt,
      displayMode: window.matchMedia('(display-mode: standalone)').matches,
      standalone: (window.navigator as any).standalone,
      protocol: window.location.protocol,
      host: window.location.host,
    };
    setDebugInfo(info);
  }, [deferredPrompt]);

  const handleTestInstall = async () => {
    console.log('🔧 Test d\'installation PWA...');
    const result = await installPWA();
    console.log('📱 Résultat:', result);
  };

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed top-4 left-4 bg-black/90 text-white p-4 rounded-lg text-xs max-w-sm z-50">
      <h3 className="font-bold mb-2">🔧 Debug PWA</h3>
      
      <div className="space-y-1">
        <div>📱 Installable: <span className={isInstallable ? 'text-green-400' : 'text-red-400'}>{isInstallable ? 'Oui' : 'Non'}</span></div>
        <div>✅ Installé: <span className={isInstalled ? 'text-green-400' : 'text-red-400'}>{isInstalled ? 'Oui' : 'Non'}</span></div>
        <div>🍎 iOS: <span className={isIOS ? 'text-blue-400' : 'text-gray-400'}>{isIOS ? 'Oui' : 'Non'}</span></div>
        <div>🤖 Android: <span className={isAndroid ? 'text-green-400' : 'text-gray-400'}>{isAndroid ? 'Oui' : 'Non'}</span></div>
        <div>🖥️ Standalone: <span className={isStandalone ? 'text-green-400' : 'text-red-400'}>{isStandalone ? 'Oui' : 'Non'}</span></div>
        <div>🔒 HTTPS: <span className={debugInfo.isSecureContext ? 'text-green-400' : 'text-red-400'}>{debugInfo.isSecureContext ? 'Oui' : 'Non'}</span></div>
        <div>⚙️ Service Worker: <span className={debugInfo.serviceWorker ? 'text-green-400' : 'text-red-400'}>{debugInfo.serviceWorker ? 'Oui' : 'Non'}</span></div>
        <div>📋 Prompt disponible: <span className={debugInfo.beforeInstallPrompt ? 'text-green-400' : 'text-red-400'}>{debugInfo.beforeInstallPrompt ? 'Oui' : 'Non'}</span></div>
      </div>

      <button 
        onClick={handleTestInstall}
        className="mt-2 bg-blue-600 text-white px-2 py-1 rounded text-xs hover:bg-blue-700"
      >
        Tester Installation
      </button>

      <details className="mt-2">
        <summary className="cursor-pointer text-blue-400">Détails techniques</summary>
        <pre className="mt-1 text-xs overflow-auto max-h-32">
          {JSON.stringify(debugInfo, null, 2)}
        </pre>
      </details>
    </div>
  );
};

export default PWADebug;
