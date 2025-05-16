
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Package } from 'lucide-react';
import { formatCurrency } from '@/utils/mockData';
import { toast } from 'sonner';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  stock: number;
  imageUrl?: string;
  onAddToCart: (id: string, name: string, price: number, stock: number, imageUrl?: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  stock,
  imageUrl,
  onAddToCart,
}) => {
  const handleClick = () => {
    if (stock > 0) {
      onAddToCart(id, name, price, stock, imageUrl);
    } else {
      toast.error(`${name} não disponível em estoque`);
    }
  };

  return (
    <Card 
      className={`cursor-pointer transition-all hover:-translate-y-1 hover:shadow-md border-2 ${
        stock < 1 ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      onClick={handleClick}
    >
      <CardContent className="p-3 flex flex-col items-center text-center">
        <div className="h-16 w-16 mb-2 flex items-center justify-center">
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt={name} 
              className="h-full w-full object-contain"
            />
          ) : (
            <Package className="h-12 w-12 text-muted-foreground" />
          )}
        </div>
        <p className="text-sm font-medium line-clamp-2">{name}</p>
        <div className="flex justify-between items-center w-full mt-2">
          <Badge variant="outline" className="font-normal">
            {stock} un
          </Badge>
          <p className="font-semibold">{formatCurrency(price)}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
