
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import QRCodeDisplay from '@/components/QRCodeDisplay';
import { useBusinessContext } from '@/contexts/BusinessContext';
import { Button } from '@/components/ui/button';
import { 
  ThumbsUp, 
  ThumbsDown, 
  MapPin, 
  Calendar, 
  ArrowLeft
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const BusinessDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { getBusinessById, voteForBusiness } = useBusinessContext();
  const navigate = useNavigate();
  
  const business = getBusinessById(id || '');
  
  if (!business) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Business Not Found</h1>
          <p className="text-muted-foreground mb-6">The business you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate(-1)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </main>
        <Footer />
      </div>
    );
  }
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric',
      month: 'long', 
      day: 'numeric'
    }).format(date);
  };
  
  const calculateScore = () => {
    return business.upvotes - business.downvotes;
  };

  const handleVote = (type: 'upvote' | 'downvote') => {
    voteForBusiness({ businessId: business.id, type });
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-6">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          
          <div className="flex justify-between items-start">
            <h1 className="text-3xl font-bold">{business.name}</h1>
            <Badge variant="outline" className="bg-tether/10 text-tether-dark">
              USDT accepted
            </Badge>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-2">About</h2>
              <p className="text-foreground">{business.description}</p>
              
              <div className="mt-4 flex items-center text-muted-foreground">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{business.address}</span>
              </div>
              
              <div className="mt-2 flex items-center text-muted-foreground">
                <Calendar className="h-4 w-4 mr-2" />
                <span>Listed since {formatDate(business.createdAt)}</span>
              </div>
            </div>
            
            <div className="bg-card rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Community Rating</h2>
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center space-x-6">
                  <div className="flex flex-col items-center">
                    <Button 
                      variant="outline" 
                      className="h-12 w-12 rounded-full mb-1"
                      onClick={() => handleVote('upvote')}
                    >
                      <ThumbsUp className="h-6 w-6 text-green-500" />
                    </Button>
                    <span className="text-sm font-medium">{business.upvotes}</span>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <Button 
                      variant="outline" 
                      className="h-12 w-12 rounded-full mb-1"
                      onClick={() => handleVote('downvote')}
                    >
                      <ThumbsDown className="h-6 w-6 text-red-500" />
                    </Button>
                    <span className="text-sm font-medium">{business.downvotes}</span>
                  </div>
                </div>
                
                <div className="bg-muted p-3 rounded-md text-center">
                  <div className="text-sm text-muted-foreground mb-1">Overall Score</div>
                  <div className={`text-2xl font-bold ${
                    calculateScore() > 0 ? 'text-green-500' : 
                    calculateScore() < 0 ? 'text-red-500' : 'text-gray-500'
                  }`}>
                    {calculateScore()}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <div className="bg-card rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4 text-center">USDT Payment QR</h2>
              <div className="flex justify-center">
                <QRCodeDisplay business={business} size={240} />
              </div>
              <p className="mt-4 text-xs text-center text-muted-foreground">
                Scan this QR code to pay with USDT (TRC-20)
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BusinessDetail;
