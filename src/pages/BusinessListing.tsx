
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BusinessCard from '@/components/BusinessCard';
import { useBusinessContext } from '@/contexts/BusinessContext';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const BusinessListing = () => {
  const { businesses, loading } = useBusinessContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBusinesses, setFilteredBusinesses] = useState(businesses);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredBusinesses(businesses);
    } else {
      const filtered = businesses.filter(
        (business) =>
          business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          business.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          business.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBusinesses(filtered);
    }
  }, [searchTerm, businesses]);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-2">USDT Businesses Directory</h1>
        <p className="text-muted-foreground mb-6">Browse all businesses accepting USDT payments</p>
        
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="search"
            placeholder="Search businesses by name, description, or location..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-tether"></div>
          </div>
        ) : (
          <>
            {filteredBusinesses.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl font-medium mb-2">No businesses found</p>
                <p className="text-muted-foreground">
                  Try adjusting your search or browse without filters
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBusinesses.map((business) => (
                  <BusinessCard key={business.id} business={business} />
                ))}
              </div>
            )}
          </>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default BusinessListing;
