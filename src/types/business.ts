
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
