import React, { useState } from 'react';
import { X, Share, Home, ArrowRight } from 'lucide-react';

interface IOSInstallGuideProps {
  isVisible: boolean;
  onClose: () => void;
}

const IOSInstallGuide: React.FC<IOSInstallGuideProps> = ({ isVisible, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);

  if (!isVisible) return null;

  const steps = [
    {
      icon: <Share className="h-8 w-8 text-blue-500" />,
      title: "Appuyez sur le bouton Partager",
      description: "Trouvez l'icône de partage (📤) en bas de votre écran Safari",
      image: "📤"
    },
    {
      icon: <ArrowRight className="h-8 w-8 text-green-500" />,
      title: "Sélectionnez 'Ajouter à l'écran d'accueil'",
      description: "Faites défiler vers le bas et trouvez cette option dans le menu",
      image: "➕"
    },
    {
      icon: <Home className="h-8 w-8 text-purple-500" />,
      title: "Confirmez l'installation",
      description: "Appuyez sur 'Ajouter' pour installer Usemy sur votre écran d'accueil",
      image: "✅"
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-500 to-pink-500 p-6 text-white">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Installer Usemy sur iOS</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <p className="text-cyan-100 mt-2">
            Suivez ces étapes simples pour installer l'application
          </p>
        </div>

        {/* Progress */}
        <div className="px-6 py-4 bg-gray-50">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Étape {currentStep} sur {steps.length}</span>
            <span>{Math.round((currentStep / steps.length) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div 
              className="bg-gradient-to-r from-cyan-500 to-pink-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">{steps[currentStep - 1].image}</div>
            <div className="flex justify-center mb-4">
              {steps[currentStep - 1].icon}
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {steps[currentStep - 1].title}
            </h3>
            <p className="text-gray-600">
              {steps[currentStep - 1].description}
            </p>
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <button
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className="px-4 py-2 text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Précédent
            </button>
            
            {currentStep < steps.length ? (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-pink-500 text-white rounded-full font-semibold hover:shadow-lg transition-all"
              >
                Suivant
              </button>
            ) : (
              <button
                onClick={onClose}
                className="px-6 py-2 bg-green-500 text-white rounded-full font-semibold hover:bg-green-600 transition-colors"
              >
                Terminé
              </button>
            )}
          </div>
        </div>

        {/* Tips */}
        <div className="px-6 py-4 bg-gray-50 border-t">
          <div className="text-sm text-gray-600">
            <p className="font-semibold mb-2">💡 Conseils :</p>
            <ul className="space-y-1">
              <li>• Assurez-vous d'être dans Safari</li>
              <li>• L'icône apparaîtra sur votre écran d'accueil</li>
              <li>• Vous pourrez l'utiliser comme une vraie app</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IOSInstallGuide;
