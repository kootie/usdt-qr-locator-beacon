
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  ArrowLeft,
  ShoppingCart,
  Check
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Product, Transaction } from '@/types/business';
import { toast } from '@/hooks/use-toast';

const BusinessDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { getBusinessById, voteForBusiness, getProductsByBusinessId, createTransaction } = useBusinessContext();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('info');
  const [processingPayment, setProcessingPayment] = useState<string | null>(null);
  
  const business = getBusinessById(id || '');
  const products = business ? getProductsByBusinessId(business.id) : [];
  
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

  const handleBuyProduct = (product: Product) => {
    setProcessingPayment(product.id);
    
    // Simulate transaction processing
    setTimeout(() => {
      try {
        const transaction = createTransaction(business.id, product.id);
        
        toast({
          title: "Payment Successful!",
          description: `You have successfully purchased ${product.name} for ${product.price} ${product.currency}`,
        });
        
        setProcessingPayment(null);
      } catch (error) {
        toast({
          title: "Payment Failed",
          description: "There was an error processing your payment. Please try again.",
          variant: "destructive",
        });
        setProcessingPayment(null);
      }
    }, 1500);
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
            <div className="flex gap-2">
              <Badge variant="outline" className="bg-tether/10 text-tether-dark">
                USDT accepted
              </Badge>
              <Badge variant="outline" className="bg-emerald-500/10 text-emerald-700">
                USDC accepted
              </Badge>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="info" value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="info">Business Info</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="payment">QR Payment</TabsTrigger>
          </TabsList>
          
          <TabsContent value="info">
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
                  <h2 className="text-xl font-semibold mb-4 text-center">Business Location</h2>
                  <div className="aspect-ratio-16/9 h-48 bg-muted rounded-lg mb-4">
                    {/* Map placeholder */}
                    <div className="h-full w-full flex items-center justify-center text-muted-foreground">
                      <MapPin className="mr-2 h-5 w-5" />
                      View on map
                    </div>
                  </div>
                  <p className="text-center text-muted-foreground">{business.address}</p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="products">
            <div className="mb-4">
              <h2 className="text-2xl font-bold">Products</h2>
              <p className="text-muted-foreground">Explore the products offered by {business.name}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <p className="text-xl font-medium mb-2">No products available</p>
                  <p className="text-muted-foreground">
                    This business hasn't listed any products yet.
                  </p>
                </div>
              ) : (
                products.map((product) => (
                  <Card key={product.id} className="overflow-hidden">
                    {product.imageUrl && (
                      <div className="h-48 w-full overflow-hidden">
                        <img 
                          src={product.imageUrl} 
                          alt={product.name} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle>{product.name}</CardTitle>
                      <div className="flex justify-between items-center">
                        <p className="font-semibold text-lg">
                          {product.price} {product.currency}
                        </p>
                        <Badge variant={product.inStock ? "default" : "outline"}>
                          {product.inStock ? "In Stock" : "Out of Stock"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{product.description}</CardDescription>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="w-full" 
                        onClick={() => handleBuyProduct(product)}
                        disabled={!product.inStock || processingPayment === product.id}
                      >
                        {processingPayment === product.id ? (
                          <>Processing...</>
                        ) : (
                          <>
                            <ShoppingCart className="mr-2 h-4 w-4" />
                            Buy with {product.currency}
                          </>
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="payment">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-card rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4 text-center">USDT Payment QR</h2>
                <div className="flex justify-center">
                  <QRCodeDisplay business={business} size={240} />
                </div>
                <p className="mt-4 text-xs text-center text-muted-foreground">
                  Scan this QR code to pay with USDT (TRC-20)
                </p>
              </div>
              
              <div className="bg-card rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4 text-center">Payment Information</h2>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Business Name:</span>
                    <span className="font-medium">{business.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">USDT Address:</span>
                    <span className="font-medium font-mono text-sm">{business.usdtAddress}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Accepted Currencies:</span>
                    <div className="flex space-x-1">
                      <Badge variant="outline" className="bg-tether/10 text-tether-dark">USDT</Badge>
                      <Badge variant="outline" className="bg-emerald-500/10 text-emerald-700">USDC</Badge>
                    </div>
                  </div>
                  <div className="pt-4">
                    <p className="text-sm text-center text-muted-foreground">
                      To make a direct payment, scan the QR code or send USDT/USDC to the address above.
                      Always confirm the transaction details before proceeding.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default BusinessDetail;
