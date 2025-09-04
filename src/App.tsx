import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ProblemSolution from './components/ProblemSolution';
import Features from './components/Features';
import WhyUsemy from './components/WhyUsemy';
import AppDemo from './components/AppDemo';
import BusinessModel from './components/BusinessModel';
import GrowthPlan from './components/GrowthPlan';
import CTA from './components/CTA';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import PWAInstallPrompt from './components/PWAInstallPrompt';
import PWADebug from './components/PWADebug';
import PWAWrapper from './components/PWAWrapper';
import PWANotification from './components/PWANotification';
import PWATestMode from './components/PWATestMode';

function App() {
  // Test direct de détection PWA
  const urlParams = new URLSearchParams(window.location.search);
  const isFromPWA = urlParams.get('pwa') === 'true';
  
  console.log('🔍 App.tsx - Test PWA:', {
    isFromPWA,
    url: window.location.href,
    search: window.location.search
  });

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
          <GrowthPlan />
          <CTA />
          <FAQ />
        </main>
        <Footer />
        
        {/* PWA Install Prompt */}
        <PWAInstallPrompt />
        
        {/* PWA Notification */}
        <PWANotification />
        
        {/* PWA Debug (dev only) */}
        <PWADebug />
        
        {/* PWA Test Mode (dev only) */}
        <PWATestMode />
      </div>
    </PWAWrapper>
  );
}

export default App;