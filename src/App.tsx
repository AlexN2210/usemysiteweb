import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ProblemSolution from './components/ProblemSolution';
import Features from './components/Features';
import WhyUsemy from './components/WhyUsemy';
import AppDemo from './components/AppDemo';
import BusinessModel from './components/BusinessModel';
import CTA from './components/CTA';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import PWAInstallPrompt from './components/PWAInstallPrompt';
import PWAWrapper from './components/PWAWrapper';
import PWANotification from './components/PWANotification';

function App() {
  // Redirection vers la vraie app si paramètre redirect
  const urlParams = new URLSearchParams(window.location.search);
  const redirectUrl = urlParams.get('redirect');
  
  if (redirectUrl) {
    console.log('🔄 Redirection vers:', redirectUrl);
    // Redirection dans la même fenêtre pour garder le mode PWA
    window.location.replace(`https://${redirectUrl}`);
    return <div>Redirection vers votre application...</div>;
  }

  return (
    <PWAWrapper>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main>
          <HeroSection />
          <ProblemSolution />
          <Features />
          <WhyUsemy />
          <AppDemo />
          <BusinessModel />
          <CTA />
          <FAQ />
        </main>
        <Footer />
        
        {/* PWA Install Prompt */}
        <PWAInstallPrompt />
        
        {/* PWA Notification */}
        <PWANotification />
        
      </div>
    </PWAWrapper>
  );
}

export default App;