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

function App() {
  return (
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
    </div>
  );
}

export default App;