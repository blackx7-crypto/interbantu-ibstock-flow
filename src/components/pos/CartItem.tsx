
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Minus, X, Package } from 'lucide-react';
import { formatCurrency } from '@/utils/mockData';

interface CartItemProps {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  stock: number;
  imageUrl?: string;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  productId,
  name,
  price,
  quantity,
  stock,
  imageUrl,
  onUpdateQuantity,
  onRemove,
}) => {
  return (
    <div className="flex items-center justify-between p-2 rounded-md border-2 border-border bg-background">
      <div className="flex items-start gap-2">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={name} 
            className="h-10 w-10 object-contain rounded-md"
          />
        ) : (
          <div className="h-10 w-10 bg-muted flex items-center justify-center rounded-md">
            <Package className="h-5 w-5 text-muted-foreground" />
          </div>
        )}
        
        <div className="flex-1">
          <p className="text-sm font-medium">{name}</p>
          <p className="text-sm text-muted-foreground">{formatCurrency(price)} × {quantity}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-1">
        <Button 
          variant="outline" 
          size="icon" 
          className="h-6 w-6"
          onClick={() => onUpdateQuantity(productId, quantity - 1)}
        >
          <Minus className="h-3 w-3" />
        </Button>
        
        <span className="w-8 text-center">{quantity}</span>
        
        <Button 
          variant="outline" 
          size="icon" 
          className="h-6 w-6"
          onClick={() => onUpdateQuantity(productId, quantity + 1)}
          disabled={quantity >= stock}
        >
          <Plus className="h-3 w-3" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-6 w-6 text-muted-foreground hover:text-destructive ml-1"
          onClick={() => onRemove(productId)}
        >
          <X className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
