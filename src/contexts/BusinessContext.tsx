
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Business, BusinessFormData, VoteAction, Product, ProductFormData, Transaction } from '../types/business';
import { mockBusinesses } from '../data/mockBusinesses';
import { useToast } from "@/components/ui/use-toast";

interface BusinessContextType {
  businesses: Business[];
  addBusiness: (business: BusinessFormData) => void;
  voteForBusiness: (vote: VoteAction) => void;
  getBusinessById: (id: string) => Business | undefined;
  addProduct: (businessId: string, product: ProductFormData) => void;
  getProductById: (businessId: string, productId: string) => Product | undefined;
  getProductsByBusinessId: (businessId: string) => Product[];
  createTransaction: (businessId: string, productId: string, customerId?: string) => Transaction;
  getTransactionsByBusinessId: (businessId: string) => Transaction[];
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
  const [transactions, setTransactions] = useState<Transaction[]>([]);
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
      products: [],
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

  const addProduct = (businessId: string, productData: ProductFormData) => {
    const newProduct: Product = {
      id: `${Date.now()}`, // Generate a simple ID
      businessId,
      ...productData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setBusinesses((prev) =>
      prev.map((business) => {
        if (business.id === businessId) {
          return {
            ...business,
            products: [...(business.products || []), newProduct],
            updatedAt: new Date().toISOString(),
          };
        }
        return business;
      })
    );

    toast({
      title: "Product Added",
      description: `${productData.name} has been added to your business.`,
    });

    return newProduct;
  };

  const getProductById = (businessId: string, productId: string) => {
    const business = getBusinessById(businessId);
    return business?.products?.find((product) => product.id === productId);
  };

  const getProductsByBusinessId = (businessId: string) => {
    const business = getBusinessById(businessId);
    return business?.products || [];
  };

  const createTransaction = (businessId: string, productId: string, customerId?: string) => {
    const product = getProductById(businessId, productId);
    
    if (!product) {
      throw new Error("Product not found");
    }

    const newTransaction: Transaction = {
      id: `${Date.now()}`, // Generate a simple ID
      businessId,
      productId,
      customerId,
      amount: product.price,
      currency: product.currency,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    setTransactions((prev) => [...prev, newTransaction]);

    toast({
      title: "Transaction Created",
      description: `Transaction for ${product.name} has been initiated.`,
    });

    return newTransaction;
  };

  const getTransactionsByBusinessId = (businessId: string) => {
    return transactions.filter(transaction => transaction.businessId === businessId);
  };

  return (
    <BusinessContext.Provider
      value={{
        businesses,
        addBusiness,
        voteForBusiness,
        getBusinessById,
        addProduct,
        getProductById,
        getProductsByBusinessId,
        createTransaction,
        getTransactionsByBusinessId,
        loading,
      }}
    >
      {children}
    </BusinessContext.Provider>
  );
};
