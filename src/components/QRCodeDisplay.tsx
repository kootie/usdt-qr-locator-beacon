
import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Business } from '@/types/business';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface QRCodeDisplayProps {
  business: Business;
  size?: number;
}

const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ business, size = 200 }) => {
  const { toast } = useToast();

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(business.usdtAddress);
    toast({
      title: "Address copied!",
      description: "USDT address has been copied to clipboard",
    });
  };

  const truncateAddress = (address: string) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-6)}`;
  };

  return (
    <div className="flex flex-col items-center p-4 bg-white border rounded-lg shadow-md">
      <div className="mb-4">
        <QRCodeSVG
          value={business.usdtAddress}
          size={size}
          bgColor="#FFFFFF"
          fgColor="#000000"
          level="H"
          includeMargin={false}
        />
      </div>
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="font-mono text-sm truncate max-w-[180px]">
            {truncateAddress(business.usdtAddress)}
          </span>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={handleCopyAddress}
          >
            <Copy className="h-4 w-4" />
            <span className="sr-only">Copy</span>
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">USDT (TRC-20)</p>
      </div>
    </div>
  );
};

export default QRCodeDisplay;
