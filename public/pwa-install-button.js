// Script PWA Install Button pour intégration dans votre site existant
class PWAInstallButton {
  constructor(options = {}) {
    this.deferredPrompt = null;
    this.isInstalled = false;
    this.buttonId = options.buttonId || 'pwa-install-btn';
    this.buttonText = options.buttonText || 'Installer Usemy';
    this.installedText = options.installedText || 'Déjà installé';
    this.buttonClass = options.buttonClass || 'pwa-install-button';
    this.showAfterDelay = options.showAfterDelay || 3000; // 3 secondes
    this.init();
  }

  init() {
    // Vérifier si l'app est déjà installée
    this.checkIfInstalled();
    
    // Écouter les événements PWA
    this.setupEventListeners();
    
    // Créer le bouton d'installation
    this.createInstallButton();
    
    // Afficher le bouton après un délai
    setTimeout(() => {
      this.showInstallButton();
    }, this.showAfterDelay);
  }

  checkIfInstalled() {
    // Vérifier si l'app est en mode standalone
    if (window.matchMedia('(display-mode: standalone)').matches || 
        window.navigator.standalone === true) {
      this.isInstalled = true;
    }
  }

  setupEventListeners() {
    // Écouter l'événement beforeinstallprompt
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
      this.showInstallButton();
    });

    // Écouter l'événement appinstalled
    window.addEventListener('appinstalled', () => {
      this.isInstalled = true;
      this.updateButtonState();
    });
  }

  createInstallButton() {
    // Vérifier si le bouton existe déjà
    if (document.getElementById(this.buttonId)) {
      return;
    }

    const button = document.createElement('button');
    button.id = this.buttonId;
    button.className = this.buttonClass;
    button.innerHTML = `
      <div class="pwa-button-content">
        <svg class="pwa-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="7,10 12,15 17,10"></polyline>
          <line x1="12" y1="15" x2="12" y2="3"></line>
        </svg>
        <span class="pwa-text">${this.buttonText}</span>
      </div>
    `;

    // Ajouter les styles CSS
    this.addStyles();

    // Ajouter le bouton au DOM
    document.body.appendChild(button);

    // Ajouter l'événement de clic
    button.addEventListener('click', () => {
      this.handleInstall();
    });
  }

  addStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .pwa-install-button {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: linear-gradient(135deg, #00FFFF 0%, #ff38b8 100%);
        color: white;
        border: none;
        border-radius: 50px;
        padding: 15px 25px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        box-shadow: 0 8px 32px rgba(0, 255, 255, 0.3);
        transition: all 0.3s ease;
        z-index: 1000;
        opacity: 0;
        transform: translateY(100px);
        animation: slideUp 0.5s ease forwards;
      }

      .pwa-install-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 12px 40px rgba(0, 255, 255, 0.4);
      }

      .pwa-install-button:active {
        transform: translateY(0);
      }

      .pwa-install-button.installed {
        background: #4CAF50;
        box-shadow: 0 8px 32px rgba(76, 175, 80, 0.3);
      }

      .pwa-button-content {
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .pwa-icon {
        width: 20px;
        height: 20px;
      }

      .pwa-text {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }

      @keyframes slideUp {
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @media (max-width: 768px) {
        .pwa-install-button {
          bottom: 15px;
          right: 15px;
          padding: 12px 20px;
          font-size: 14px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  showInstallButton() {
    const button = document.getElementById(this.buttonId);
    if (button && !this.isInstalled) {
      button.style.display = 'block';
    }
  }

  hideInstallButton() {
    const button = document.getElementById(this.buttonId);
    if (button) {
      button.style.display = 'none';
    }
  }

  async handleInstall() {
    if (this.isInstalled) {
      this.showInstalledMessage();
      return;
    }

    if (!this.deferredPrompt) {
      this.showInstallGuide();
      return;
    }

    try {
      // Afficher le prompt d'installation
      this.deferredPrompt.prompt();
      
      // Attendre la réponse de l'utilisateur
      const { outcome } = await this.deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('✅ PWA: Installation acceptée par l\'utilisateur');
        this.showSuccessMessage();
      } else {
        console.log('❌ PWA: Installation refusée par l\'utilisateur');
      }
      
      this.deferredPrompt = null;
    } catch (error) {
      console.error('Erreur lors de l\'installation:', error);
      this.showInstallGuide();
    }
  }

  updateButtonState() {
    const button = document.getElementById(this.buttonId);
    if (button) {
      button.classList.add('installed');
      button.querySelector('.pwa-text').textContent = this.installedText;
    }
  }

  showSuccessMessage() {
    this.showToast('🎉 Usemy installé avec succès !', 'success');
  }

  showInstalledMessage() {
    this.showToast('✅ Usemy est déjà installé sur votre appareil', 'info');
  }

  showInstallGuide() {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isAndroid = /Android/.test(navigator.userAgent);
    
    let message = '';
    
    if (isIOS) {
      message = '📱 Sur iOS : Appuyez sur le bouton Partager puis "Ajouter à l\'écran d\'accueil"';
    } else if (isAndroid) {
      message = '📱 Sur Android : Appuyez sur le menu (⋮) puis "Installer l\'application"';
    } else {
      message = '💻 Sur ordinateur : Cliquez sur l\'icône d\'installation dans la barre d\'adresse';
    }
    
    this.showToast(message, 'info', 8000);
  }

  showToast(message, type = 'info', duration = 4000) {
    const toast = document.createElement('div');
    toast.className = `pwa-toast pwa-toast-${type}`;
    toast.textContent = message;
    
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
      }
      
      .pwa-toast-success {
        background: linear-gradient(135deg, #4CAF50, #45a049);
      }
      
      .pwa-toast-info {
        background: linear-gradient(135deg, #2196F3, #1976D2);
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
        document.body.removeChild(toast);
      }, 300);
    }, duration);
  }
}

// Auto-initialisation si le script est chargé
if (typeof window !== 'undefined') {
  window.PWAInstallButton = PWAInstallButton;
  
  // Auto-initialiser si l'option est activée
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      new PWAInstallButton();
    });
  } else {
    new PWAInstallButton();
  }
}
