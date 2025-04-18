
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BusinessFormData } from '@/types/business';
import { useBusinessContext } from '@/contexts/BusinessContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MapPin } from 'lucide-react';
import { getCurrentLocation } from '@/utils/mapUtils';

const BusinessForm: React.FC = () => {
  const { addBusiness } = useBusinessContext();
  const navigate = useNavigate();
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  const form = useForm<BusinessFormData>({
    defaultValues: {
      name: '',
      description: '',
      address: '',
      latitude: 0,
      longitude: 0,
      usdtAddress: '',
    },
  });

  const handleGetCurrentLocation = async () => {
    try {
      setIsGettingLocation(true);
      const position = await getCurrentLocation();
      form.setValue('latitude', position.coords.latitude);
      form.setValue('longitude', position.coords.longitude);
      setIsGettingLocation(false);
    } catch (error) {
      console.error('Error getting location:', error);
      setIsGettingLocation(false);
    }
  };

  const onSubmit = (data: BusinessFormData) => {
    addBusiness(data);
    navigate('/');
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-card rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Register Your Business</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your business name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Describe your business" 
                    className="resize-none" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your business address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="latitude"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Latitude</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      step="any" 
                      placeholder="Latitude" 
                      {...field} 
                      onChange={(e) => field.onChange(parseFloat(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="longitude"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Longitude</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      step="any" 
                      placeholder="Longitude" 
                      {...field} 
                      onChange={(e) => field.onChange(parseFloat(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <Button
            type="button"
            variant="outline"
            onClick={handleGetCurrentLocation}
            disabled={isGettingLocation}
            className="w-full"
          >
            <MapPin className="mr-2 h-4 w-4" />
            {isGettingLocation ? 'Getting Location...' : 'Use Current Location'}
          </Button>
          
          <FormField
            control={form.control}
            name="usdtAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>USDT Address (TRC-20)</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your USDT wallet address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="submit" className="w-full bg-tether hover:bg-tether-dark">
            Register Business
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default BusinessForm;
