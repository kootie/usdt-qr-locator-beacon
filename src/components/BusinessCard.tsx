
import React from 'react';
import { Business } from '@/types/business';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ThumbsUp, 
  ThumbsDown, 
  MapPin, 
  QrCode
} from 'lucide-react';
import { useBusinessContext } from '@/contexts/BusinessContext';

interface BusinessCardProps {
  business: Business;
}

const BusinessCard: React.FC<BusinessCardProps> = ({ business }) => {
  const { voteForBusiness } = useBusinessContext();
  
  const handleVote = (type: 'upvote' | 'downvote') => {
    voteForBusiness({ businessId: business.id, type });
  };

  const calculateScore = () => {
    return business.upvotes - business.downvotes;
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric',
      month: 'short', 
      day: 'numeric'
    }).format(date);
  };

  return (
    <div className="bg-card rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg">
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-bold text-lg">{business.name}</h3>
          <Badge variant="outline" className="bg-tether/10 text-tether-dark">
            USDT accepted
          </Badge>
        </div>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {business.description}
        </p>
        
        <div className="flex items-center text-muted-foreground text-xs mb-4">
          <MapPin className="h-3 w-3 mr-1" />
          <span className="truncate">{business.address}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => handleVote('upvote')}
              >
                <ThumbsUp className="h-4 w-4 text-green-500" />
              </Button>
              <span className="text-sm font-medium ml-1">{business.upvotes}</span>
            </div>
            
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => handleVote('downvote')}
              >
                <ThumbsDown className="h-4 w-4 text-red-500" />
              </Button>
              <span className="text-sm font-medium ml-1">{business.downvotes}</span>
            </div>
            
            <div className="flex items-center">
              <span className={`text-sm font-medium ${
                calculateScore() > 0 ? 'text-green-500' : 
                calculateScore() < 0 ? 'text-red-500' : 'text-gray-500'
              }`}>
                Score: {calculateScore()}
              </span>
            </div>
          </div>
          
          <Link to={`/business/${business.id}`}>
            <Button variant="outline" size="sm" className="gap-1">
              <QrCode className="h-4 w-4" />
              <span>View</span>
            </Button>
          </Link>
        </div>
      </div>
      <div className="bg-muted px-5 py-2 text-xs text-muted-foreground">
        Added on {formatDate(business.createdAt)}
      </div>
    </div>
  );
};

export default BusinessCard;
