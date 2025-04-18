import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Map from '@/components/Map';
import BusinessCard from '@/components/BusinessCard';
import { useBusinessContext } from '@/contexts/BusinessContext';

const Index = () => {
  const { businesses, loading } = useBusinessContext();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-6">
        <div className="flex flex-col space-y-6">
          <section>
            <h1 className="text-3xl font-bold mb-2">Find USDT Payment Locations</h1>
            <p className="text-muted-foreground mb-6">Discover businesses accepting USDT cryptocurrency payments around the world</p>
            
            <Map />
          </section>
          
          <section className="mt-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Featured Businesses</h2>
              <a href="/businesses" className="text-tether hover:underline">View all</a>
            </div>
            
            {loading ? (
              <div className="flex justify-center items-center h-48">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-tether"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {businesses.slice(0, 3).map((business) => (
                  <BusinessCard key={business.id} business={business} />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
