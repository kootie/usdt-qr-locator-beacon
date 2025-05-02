
export interface Business {
  id: string;
  name: string;
  description: string;
  address: string;
  latitude: number;
  longitude: number;
  usdtAddress: string;
  upvotes: number;
  downvotes: number;
  createdAt: string;
  updatedAt: string;
  products?: Product[];
}

export interface BusinessFormData {
  name: string;
  description: string;
  address: string;
  latitude: number;
  longitude: number;
  usdtAddress: string;
}

export interface VoteAction {
  businessId: string;
  type: 'upvote' | 'downvote';
}

export interface Product {
  id: string;
  businessId: string;
  name: string;
  description: string;
  price: number;
  currency: 'USDT' | 'USDC';
  imageUrl?: string;
  inStock: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductFormData {
  name: string;
  description: string;
  price: number;
  currency: 'USDT' | 'USDC';
  imageUrl?: string;
  inStock: boolean;
}

export interface Transaction {
  id: string;
  businessId: string;
  productId: string;
  customerId?: string;
  amount: number;
  currency: 'USDT' | 'USDC';
  status: 'pending' | 'completed' | 'failed';
  txHash?: string;
  createdAt: string;
}
