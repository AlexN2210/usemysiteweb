import React, { useState, useEffect } from 'react';
import { X, Share, Home, ArrowDown, CheckCircle } from 'lucide-react';

interface IOSInstallOverlayProps {
  isVisible: boolean;
  onClose: () => void;
}

const IOSInstallOverlay: React.FC<IOSInstallOverlayProps> = ({ isVisible, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setCurrentStep(0);
      setIsAnimating(true);
    }
  }, [isVisible]);

  const steps = [
    {
      icon: <Share className="h-12 w-12 text-blue-500" />,
      title: "Appuyez sur le bouton Partager",
      description: "Trouvez l'icône de partage en bas de votre écran Safari",
      illustration: (
        <div className="relative w-64 h-32 bg-gray-100 rounded-2xl mx-auto mb-6 flex items-end justify-center pb-4">
          {/* Barre de navigation Safari simulée */}
          <div className="absolute top-2 left-2 right-2 h-6 bg-gray-200 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
          </div>
          
          {/* Bouton Partager */}
          <div className="bg-blue-500 text-white px-6 py-2 rounded-full flex items-center space-x-2 shadow-lg animate-pulse">
            <Share className="h-4 w-4" />
            <span className="text-sm font-semibold">Partager</span>
          </div>
        </div>
      ),
      highlight: "bottom-4 left-1/2 transform -translate-x-1/2"
    },
    {
      icon: <ArrowDown className="h-12 w-12 text-green-500" />,
      title: "Sélectionnez 'Ajouter à l'écran d'accueil'",
      description: "Faites défiler vers le bas dans le menu de partage",
      illustration: (
        <div className="relative w-64 h-48 bg-gray-100 rounded-2xl mx-auto mb-6 overflow-hidden">
          {/* Menu de partage simulé */}
          <div className="p-4 space-y-3">
            <div className="flex items-center space-x-3 p-2 hover:bg-gray-200 rounded-lg">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 text-sm">📤</span>
              </div>
              <span className="text-sm">Partager</span>
            </div>
            <div className="flex items-center space-x-3 p-2 hover:bg-gray-200 rounded-lg">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-sm">📋</span>
              </div>
              <span className="text-sm">Copier le lien</span>
            </div>
            <div className="flex items-center space-x-3 p-2 bg-green-100 rounded-lg border-2 border-green-300 animate-pulse">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <Home className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm font-semibold text-green-700">Ajouter à l'écran d'accueil</span>
            </div>
            <div className="flex items-center space-x-3 p-2 hover:bg-gray-200 rounded-lg">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-gray-600 text-sm">📧</span>
              </div>
              <span className="text-sm">Envoyer par e-mail</span>
            </div>
          </div>
        </div>
      ),
      highlight: "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
    },
    {
      icon: <CheckCircle className="h-12 w-12 text-purple-500" />,
      title: "Confirmez l'installation",
      description: "Appuyez sur 'Ajouter' pour installer Usemy sur votre écran d'accueil",
      illustration: (
        <div className="relative w-64 h-32 bg-gray-100 rounded-2xl mx-auto mb-6 flex items-center justify-center">
          {/* Dialog de confirmation simulé */}
          <div className="bg-white rounded-xl p-4 shadow-lg border-2 border-green-300">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <p className="text-sm font-semibold text-gray-800">Ajouter à l'écran d'accueil</p>
              <p className="text-xs text-gray-600 mt-1">Usemy sera ajouté à votre écran d'accueil</p>
              <div className="flex space-x-2 mt-3">
                <button className="px-4 py-1 bg-gray-200 text-gray-700 rounded text-xs">Annuler</button>
                <button className="px-4 py-1 bg-green-500 text-white rounded text-xs font-semibold">Ajouter</button>
              </div>
            </div>
          </div>
        </div>
      ),
      highlight: "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
    }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setIsAnimating(false);
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setIsAnimating(true);
      }, 150);
    } else {
      onClose();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setIsAnimating(false);
      setTimeout(() => {
        setCurrentStep(currentStep - 1);
        setIsAnimating(true);
      }, 150);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-hidden shadow-2xl transform transition-all duration-300">
        {/* Header avec progression */}
        <div className="bg-gradient-to-r from-cyan-500 to-pink-500 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
          
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Installer Usemy sur iOS</h2>
            <p className="text-cyan-100 text-sm">
              Suivez ces étapes pour installer l'application
            </p>
          </div>

          {/* Barre de progression */}
          <div className="mt-4">
            <div className="flex justify-between text-xs text-cyan-100 mb-2">
              <span>Étape {currentStep + 1} sur {steps.length}</span>
              <span>{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div 
                className="bg-white h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="p-6">
          <div className={`text-center transition-all duration-300 ${isAnimating ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            {/* Icône de l'étape */}
            <div className="flex justify-center mb-6">
              {steps[currentStep].icon}
            </div>

            {/* Illustration interactive */}
            <div className="relative mb-6">
              {steps[currentStep].illustration}
              
              {/* Indicateur de focus */}
              <div className={`absolute ${steps[currentStep].highlight} w-4 h-4 bg-yellow-400 rounded-full animate-ping`}></div>
            </div>

            {/* Titre et description */}
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              {steps[currentStep].title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {steps[currentStep].description}
            </p>
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className="px-6 py-2 text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed hover:text-gray-700 transition-colors"
            >
              Précédent
            </button>
            
            <button
              onClick={nextStep}
              className="px-8 py-2 bg-gradient-to-r from-cyan-500 to-pink-500 text-white rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              {currentStep === steps.length - 1 ? 'Terminé' : 'Suivant'}
            </button>
          </div>
        </div>

        {/* Conseils en bas */}
        <div className="px-6 py-4 bg-gray-50 border-t">
          <div className="text-sm text-gray-600">
            <p className="font-semibold mb-2 flex items-center">
              <span className="mr-2">💡</span>
              Conseils pour une installation réussie
            </p>
            <ul className="space-y-1 text-xs">
              <li>• Assurez-vous d'être dans Safari (pas Chrome ou Firefox)</li>
              <li>• L'icône Usemy apparaîtra sur votre écran d'accueil</li>
              <li>• Vous pourrez l'utiliser comme une vraie application</li>
              <li>• Pas besoin de passer par l'App Store</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IOSInstallOverlay;
