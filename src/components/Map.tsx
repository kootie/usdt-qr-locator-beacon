
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useBusinessContext } from '@/contexts/BusinessContext';
import { useNavigate } from 'react-router-dom';

interface MapProps {
  mapboxToken?: string;
}

const Map: React.FC<MapProps> = ({ mapboxToken }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [token, setToken] = useState<string>(mapboxToken || '');
  const [tokenInput, setTokenInput] = useState<string>('');
  const { businesses } = useBusinessContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || !mapContainer.current || map.current) return;

    // Initialize map
    mapboxgl.accessToken = token;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [0, 20],
      zoom: 1.5
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl(),
      'top-right'
    );

    // Clean up on unmount
    return () => {
      map.current?.remove();
    };
  }, [token]);

  // Add markers for businesses
  useEffect(() => {
    if (!map.current || businesses.length === 0) return;
    
    // Remove existing markers
    const markers = document.querySelectorAll('.mapboxgl-marker');
    markers.forEach((marker) => marker.remove());

    // Add markers for each business
    businesses.forEach((business) => {
      // Create custom marker element
      const el = document.createElement('div');
      el.className = 'cursor-pointer';
      el.innerHTML = `
        <div class="relative group">
          <div class="w-8 h-8 rounded-full bg-tether flex items-center justify-center text-white shadow-md transform transition-transform group-hover:scale-110">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="animate-pulse-slow">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </div>
          <div class="absolute hidden group-hover:block bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-white p-2 rounded shadow-lg text-xs whitespace-nowrap">
            ${business.name}
          </div>
        </div>
      `;

      // Add marker to map
      const marker = new mapboxgl.Marker(el)
        .setLngLat([business.longitude, business.latitude])
        .addTo(map.current!);

      // Add click event to marker
      el.addEventListener('click', () => {
        navigate(`/business/${business.id}`);
      });
    });
  }, [businesses, navigate, map.current]);

  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setToken(tokenInput);
    // Save to localStorage for persistence
    localStorage.setItem('mapboxToken', tokenInput);
  };

  // Load token from localStorage if available
  useEffect(() => {
    const savedToken = localStorage.getItem('mapboxToken');
    if (savedToken && !token) {
      setToken(savedToken);
      setTokenInput(savedToken);
    }
  }, [token]);

  if (!token) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-lg max-w-md mx-auto mt-10">
        <h2 className="text-2xl font-bold mb-4 text-crypto-navy">Mapbox Token Required</h2>
        <p className="text-gray-600 mb-6">
          To view the map, please enter your Mapbox public token. You can get one for free at{" "}
          <a 
            href="https://mapbox.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-tether underline"
          >
            mapbox.com
          </a>
        </p>
        <form onSubmit={handleTokenSubmit} className="w-full">
          <input
            type="text"
            value={tokenInput}
            onChange={(e) => setTokenInput(e.target.value)}
            placeholder="Enter your Mapbox token"
            className="w-full p-3 border rounded-md mb-4"
            required
          />
          <button 
            type="submit"
            className="w-full bg-tether text-white p-3 rounded-md hover:bg-tether-dark transition-colors"
          >
            Submit
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[70vh] rounded-lg overflow-hidden shadow-lg">
      <div ref={mapContainer} className="absolute inset-0" />
    </div>
  );
};

export default Map;
