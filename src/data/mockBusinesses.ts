
import { Business } from '../types/business';

export const mockBusinesses: Business[] = [
  {
    id: '1',
    name: 'Crypto Cafe',
    description: 'A cafe that accepts USDT for all your coffee needs.',
    address: '123 Blockchain Street, Crypto City',
    latitude: 40.7128,
    longitude: -74.0060,
    usdtAddress: 'TDJJGAzsgPHLfNQWE62PfuERmZP8nAgiiG',
    upvotes: 25,
    downvotes: 2,
    createdAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2023-01-10T00:00:00.000Z'
  },
  {
    id: '2',
    name: 'Tether Tech Store',
    description: 'Buy the latest tech with USDT.',
    address: '456 DeFi Avenue, Blockchain Valley',
    latitude: 37.7749,
    longitude: -122.4194,
    usdtAddress: 'TLNa9wh9NPXoaKENPpXaDgq5ZsxwjJrNwY',
    upvotes: 15,
    downvotes: 5,
    createdAt: '2023-02-01T00:00:00.000Z',
    updatedAt: '2023-02-15T00:00:00.000Z'
  },
  {
    id: '3',
    name: 'Crypto Convenience',
    description: 'Your local store with USDT payment options.',
    address: '789 Token Road, Altcoin City',
    latitude: 34.0522,
    longitude: -118.2437,
    usdtAddress: 'TPJTKh5LuFYvDyiT6yrYRzxYBJYiBJxPXh',
    upvotes: 40,
    downvotes: 8,
    createdAt: '2023-03-01T00:00:00.000Z',
    updatedAt: '2023-03-20T00:00:00.000Z'
  }
];
