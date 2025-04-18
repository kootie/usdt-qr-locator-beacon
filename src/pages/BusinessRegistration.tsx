
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BusinessForm from '@/components/BusinessForm';

const BusinessRegistration = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-2 text-center">Register Your Business</h1>
        <p className="text-muted-foreground mb-6 text-center">
          Join our global network of businesses accepting USDT payments
        </p>
        
        <BusinessForm />
      </main>
      
      <Footer />
    </div>
  );
};

export default BusinessRegistration;
