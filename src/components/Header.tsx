
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MapPin, Plus, List, QrCode } from 'lucide-react';

const Header: React.FC = () => {
  const location = useLocation();
  
  return (
    <header className="bg-white border-b sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <Link to="/" className="flex items-center">
            <QrCode className="h-8 w-8 text-tether mr-2" />
            <span className="text-xl font-bold">USDT QR Beacon</span>
          </Link>
        </div>
        
        <nav className="flex items-center space-x-1">
          <Link to="/">
            <Button 
              variant={location.pathname === '/' ? 'default' : 'ghost'}
              className="flex items-center"
              size="sm"
            >
              <MapPin className="h-4 w-4 mr-1" />
              <span>Map</span>
            </Button>
          </Link>
          
          <Link to="/businesses">
            <Button 
              variant={location.pathname === '/businesses' ? 'default' : 'ghost'}
              className="flex items-center"
              size="sm"
            >
              <List className="h-4 w-4 mr-1" />
              <span>Businesses</span>
            </Button>
          </Link>
          
          <Link to="/register">
            <Button 
              variant={location.pathname === '/register' ? 'default' : 'secondary'}
              className="flex items-center"
              size="sm"
            >
              <Plus className="h-4 w-4 mr-1" />
              <span>Register Business</span>
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
