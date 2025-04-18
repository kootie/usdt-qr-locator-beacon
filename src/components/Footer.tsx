
import React from 'react';
import { Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-crypto-navy text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-bold mb-2">USDT QR Beacon</h3>
            <p className="text-sm text-gray-300">
              Find businesses accepting USDT payments globally.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
            <a 
              href="#"
              className="text-sm text-gray-300 hover:text-white transition-colors"
            >
              About Us
            </a>
            <a 
              href="#"
              className="text-sm text-gray-300 hover:text-white transition-colors"
            >
              Privacy Policy
            </a>
            <a 
              href="#"
              className="text-sm text-gray-300 hover:text-white transition-colors"
            >
              Terms of Service
            </a>
            <a 
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-sm text-gray-300 hover:text-white transition-colors"
            >
              <Github className="h-4 w-4 mr-1" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
        <div className="mt-6 text-center text-xs text-gray-400">
          <p>© {new Date().getFullYear()} USDT QR Beacon. All rights reserved.</p>
          <p className="mt-1">Not affiliated with Tether or any cryptocurrency company.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
