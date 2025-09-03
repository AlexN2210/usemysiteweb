import React from 'react';
import { Heart, MapPin, Gift, Filter, Eye, BarChart, User, MessageCircle } from 'lucide-react';

const Features: React.FC = () => {
  const particularFeatures = [
    {
      icon: Heart,
      title: 'Système de Swipe',
      description: 'Like, Super Like ou Pass - trouvez votre pro idéal en quelques gestes'
    },
    {
      icon: MapPin,
      title: 'Géolocalisation',
      description: 'Découvrez les professionnels près de chez vous en temps réel'
    },
    {
      icon: Gift,
      title: 'Programme Cashback',
      description: 'Gagnez de l\'argent sur chaque prestation réalisée'
    },
    {
      icon: Filter,
      title: 'Filtres Avancés',
      description: 'Spécialité, prix, disponibilité, notes - personnalisez votre recherche'
    }
  ];

  const proFeatures = [
    {
      icon: Eye,
      title: 'Visibilité Locale',
      description: 'Apparaissez dans les recherches de votre zone d\'intervention'
    },
    {
      icon: User,
      title: 'Profil Complet',
      description: 'Showcases vos réalisations, certifications et témoignages'
    },
    {
      icon: MessageCircle,
      title: 'Matching Ciblé',
      description: 'Recevez uniquement les demandes qui vous correspondent'
    },
    {
      icon: BarChart,
      title: 'Analytics Détaillés',
      description: 'Suivez vos performances et optimisez votre visibilité'
    }
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Une expérience sur mesure
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            USEMY adapte ses fonctionnalités aux besoins spécifiques des particuliers et des professionnels
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Features for particuliers */}
          <div className="animate-fade-in">
            <div className="text-center mb-8">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-pink-500 text-white px-6 py-3 rounded-full mb-4">
                <User className="h-5 w-5" />
                <span className="font-semibold">Pour les Particuliers</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Trouvez facilement</h3>
            </div>

            <div className="space-y-6">
              {particularFeatures.map((feature, index) => (
                <div key={index} className="group p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-to-r from-cyan-500 to-pink-500 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h4>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Features for professionals */}
          <div className="animate-fade-in delay-300">
            <div className="text-center mb-8">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-cyan-500 text-white px-6 py-3 rounded-full mb-4">
                <BarChart className="h-5 w-5" />
                <span className="font-semibold">Pour les Professionnels</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Développez votre activité</h3>
            </div>

            <div className="space-y-6">
              {proFeatures.map((feature, index) => (
                <div key={index} className="group p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-to-r from-pink-500 to-cyan-500 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h4>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;