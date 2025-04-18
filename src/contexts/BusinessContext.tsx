
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Business, BusinessFormData, VoteAction } from '../types/business';
import { mockBusinesses } from '../data/mockBusinesses';
import { useToast } from "@/components/ui/use-toast";

interface BusinessContextType {
  businesses: Business[];
  addBusiness: (business: BusinessFormData) => void;
  voteForBusiness: (vote: VoteAction) => void;
  getBusinessById: (id: string) => Business | undefined;
  loading: boolean;
}

const BusinessContext = createContext<BusinessContextType | undefined>(undefined);

export const useBusinessContext = () => {
  const context = useContext(BusinessContext);
  if (!context) {
    throw new Error('useBusinessContext must be used within a BusinessProvider');
  }
  return context;
};

export const BusinessProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // In a real app, you would fetch from an API
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setBusinesses(mockBusinesses);
      setLoading(false);
    }, 1000);
  }, []);

  const addBusiness = (businessData: BusinessFormData) => {
    const newBusiness: Business = {
      id: `${Date.now()}`, // Generate a simple ID
      ...businessData,
      upvotes: 0,
      downvotes: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setBusinesses((prev) => [newBusiness, ...prev]);
    toast({
      title: "Business Added",
      description: `${businessData.name} has been added successfully.`,
    });
  };

  const voteForBusiness = (vote: VoteAction) => {
    setBusinesses((prev) =>
      prev.map((business) => {
        if (business.id === vote.businessId) {
          return {
            ...business,
            upvotes:
              vote.type === 'upvote' ? business.upvotes + 1 : business.upvotes,
            downvotes:
              vote.type === 'downvote' ? business.downvotes + 1 : business.downvotes,
            updatedAt: new Date().toISOString(),
          };
        }
        return business;
      })
    );
  };

  const getBusinessById = (id: string) => {
    return businesses.find((business) => business.id === id);
  };

  return (
    <BusinessContext.Provider
      value={{
        businesses,
        addBusiness,
        voteForBusiness,
        getBusinessById,
        loading,
      }}
    >
      {children}
    </BusinessContext.Provider>
  );
};
