
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Map from '@/components/Map';
import BusinessCard from '@/components/BusinessCard';
import { useBusinessContext } from '@/contexts/BusinessContext';
import { Button } from '@/components/ui/button';
import { calculateDistance, getCurrentLocation } from '@/utils/mapUtils';
import { Business } from '@/types/business';
import { MapPin, Navigation } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const NearMe = () => {
  const { businesses, loading } = useBusinessContext();
  const [nearbyBusinesses, setNearbyBusinesses] = useState<Business[]>([]);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [maxDistance, setMaxDistance] = useState(5); // Default 5km radius
  const { toast } = useToast();

  const locateMe = async () => {
    setIsLocating(true);
    try {
      const position = await getCurrentLocation();
      const userLoc = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      setUserLocation(userLoc);
      
      // Find nearby businesses
      const nearby = businesses.filter(business => {
        const distance = calculateDistance(
          userLoc.lat, 
          userLoc.lng, 
          business.latitude, 
          business.longitude
        );
        return distance <= maxDistance;
      }).sort((a, b) => {
        const distanceA = calculateDistance(
          userLoc.lat, 
          userLoc.lng, 
          a.latitude, 
          a.longitude
        );
        const distanceB = calculateDistance(
          userLoc.lat, 
          userLoc.lng, 
          b.latitude, 
          b.longitude
        );
        return distanceA - distanceB;
      });
      
      setNearbyBusinesses(nearby);
      
      toast({
        title: "Location Found",
        description: nearby.length > 0 
          ? `Found ${nearby.length} businesses within ${maxDistance}km of your location.`
          : `No businesses found within ${maxDistance}km. Try increasing the radius.`,
      });
    } catch (error) {
      toast({
        title: "Location Error",
        description: "Unable to access your location. Please check your browser permissions.",
        variant: "destructive"
      });
      console.error("Error getting location:", error);
    } finally {
      setIsLocating(false);
    }
  };

  // Reset search with new radius
  const changeRadius = (newRadius: number) => {
    setMaxDistance(newRadius);
    if (userLocation) {
      // Re-filter businesses with new radius
      const nearby = businesses.filter(business => {
        const distance = calculateDistance(
          userLocation.lat, 
          userLocation.lng, 
          business.latitude, 
          business.longitude
        );
        return distance <= newRadius;
      }).sort((a, b) => {
        const distanceA = calculateDistance(
          userLocation.lat, 
          userLocation.lng, 
          a.latitude, 
          a.longitude
        );
        const distanceB = calculateDistance(
          userLocation.lat, 
          userLocation.lng, 
          b.latitude, 
          b.longitude
        );
        return distanceA - distanceB;
      });
      
      setNearbyBusinesses(nearby);
      
      toast({
        title: "Radius Updated",
        description: nearby.length > 0 
          ? `Found ${nearby.length} businesses within ${newRadius}km of your location.`
          : `No businesses found within ${newRadius}km. Try increasing the radius.`,
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-2">Crypto Payments Near Me</h1>
        <p className="text-muted-foreground mb-6">Find nearby businesses accepting USDT and USDC payments</p>
        
        <div className="mb-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <Button 
              onClick={locateMe} 
              disabled={isLocating}
              className="bg-tether hover:bg-tether-dark text-white flex items-center gap-2"
            >
              {isLocating ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                  <span>Finding your location...</span>
                </>
              ) : (
                <>
                  <Navigation className="h-4 w-4" />
                  <span>Find Businesses Near Me</span>
                </>
              )}
            </Button>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Radius:</span>
              <div className="flex gap-2">
                {[1, 5, 10, 25, 50].map(radius => (
                  <Button
                    key={radius}
                    variant={maxDistance === radius ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => changeRadius(radius)}
                    className={maxDistance === radius ? 'bg-tether hover:bg-tether-dark' : ''}
                    disabled={isLocating}
                  >
                    {radius} km
                  </Button>
                ))}
              </div>
            </div>
          </div>
          
          {userLocation && (
            <div className="bg-muted/30 p-3 rounded-md flex items-center">
              <MapPin className="h-4 w-4 mr-2 text-tether" />
              <span className="text-sm">
                Your location: {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
              </span>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg overflow-hidden shadow-md h-[500px]">
              <Map userLocation={userLocation} highlightedBusinesses={nearbyBusinesses} />
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-xl font-semibold mb-4">Nearby Businesses</h2>
              
              {isLocating ? (
                <div className="flex justify-center items-center h-48">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-tether"></div>
                </div>
              ) : (
                <>
                  {userLocation ? (
                    nearbyBusinesses.length > 0 ? (
                      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                        {nearbyBusinesses.map(business => {
                          const distance = calculateDistance(
                            userLocation.lat, 
                            userLocation.lng, 
                            business.latitude, 
                            business.longitude
                          );
                          
                          return (
                            <div key={business.id} className="border rounded-md p-3 hover:bg-muted/20 transition-colors">
                              <div className="flex justify-between items-start">
                                <h3 className="font-medium">{business.name}</h3>
                                <span className="text-sm bg-muted px-2 py-0.5 rounded-full">
                                  {distance.toFixed(1)} km
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{business.address}</p>
                              <Button
                                variant="link"
                                size="sm"
                                className="p-0 h-auto text-tether"
                                asChild
                              >
                                <a href={`/business/${business.id}`}>View Details</a>
                              </Button>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <p className="text-lg text-muted-foreground">No businesses found within {maxDistance}km</p>
                        <p className="mt-2">Try increasing your search radius</p>
                      </div>
                    )
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-lg text-muted-foreground">Click "Find Businesses Near Me"</p>
                      <p className="mt-2">to discover crypto-friendly locations around you</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NearMe;
