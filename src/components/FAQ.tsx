import React, { useState } from 'react';
import { ChevronDown, Shield, CreditCard, Star } from 'lucide-react';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqData = [
    {
      icon: Shield,
      question: 'Mes données personnelles sont-elles sécurisées ?',
      answer: 'Absolument. USEMY utilise un chiffrement de bout en bout et respecte scrupuleusement le RGPD. Vos données ne sont jamais partagées avec des tiers sans votre consentement explicite.'
    },
    {
      icon: CreditCard,
      question: 'L\'application est-elle vraiment gratuite ?',
      answer: 'Oui, USEMY est 100% gratuit pour les particuliers. Nous gagnons de l\'argent grâce aux abonnements des professionnels et redistribuons une partie sous forme de cashback.'
    },
    {
      icon: Star,
      question: 'Comment garantissez-vous la fiabilité des avis ?',
      answer: 'Tous les avis sont vérifiés. Seuls les utilisateurs ayant réellement utilisé un service peuvent laisser un avis. Nous utilisons également l\'IA pour détecter les faux commentaires.'
    },
    {
      icon: Shield,
      question: 'Comment vérifiez-vous les professionnels ?',
      answer: 'Chaque professionnel doit fournir ses certifications, assurances et références. Notre équipe vérifie manuellement chaque dossier avant validation.'
    },
    {
      icon: CreditCard,
      question: 'Comment fonctionne le programme cashback ?',
      answer: 'Vous recevez entre 2% et 5% du montant de chaque prestation sous forme de crédit utilisable pour vos prochains services ou transférable sur votre compte bancaire.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-600 to-pink-600 bg-clip-text text-transparent mb-6">
            Questions fréquentes
          </h2>
          <p className="text-xl text-gray-600">
            Tout ce que vous devez savoir sur USEMY
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-gradient-to-r from-cyan-500 to-pink-500 p-2 rounded-xl">
                    <item.icon className="h-5 w-5 text-white" />
                  </div>
                  <span className="font-semibold text-gray-900 text-lg">{item.question}</span>
                </div>
                <ChevronDown 
                  className={`h-6 w-6 text-gray-500 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-6 animate-slide-down">
                  <div className="pl-12">
                    <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-cyan-500 to-pink-500 p-8 rounded-3xl text-white">
            <h3 className="text-2xl font-bold mb-4">D'autres questions ?</h3>
            <p className="text-cyan-100 mb-6">
              Notre équipe support est disponible 24/7 pour vous accompagner
            </p>
            <button className="bg-white text-gray-900 px-8 py-3 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              Nous contacter
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;