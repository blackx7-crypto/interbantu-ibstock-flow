
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatCurrency } from '@/utils/mockData';
import CartItem from './CartItem';

// Cart item definition
interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  stock: number;
  imageUrl?: string;
}

// Customer definition
interface Customer {
  id: string;
  name: string;
  phone: string;
  credit: number;
  avatar: string;
}

interface CartSectionProps {
  cart: CartItem[];
  cartTotal: number;
  selectedCustomer: Customer | null;
  onUpdateCartItemQuantity: (productId: string, quantity: number) => void;
  onRemoveFromCart: (productId: string) => void;
  onClearCart: () => void;
  onCheckout: () => void;
}

const CartSection: React.FC<CartSectionProps> = ({
  cart,
  cartTotal,
  selectedCustomer,
  onUpdateCartItemQuantity,
  onRemoveFromCart,
  onClearCart,
  onCheckout,
}) => {
  return (
    <Card className="flex-1 flex flex-col border-2 border-interbantu-orange/30 dark:border-interbantu-orange/20">
      <CardHeader className="pb-2 bg-interbantu-orange/10 dark:bg-interbantu-orange/5">
        <CardTitle className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            <span>Carrinho</span>
          </div>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClearCart} 
            disabled={cart.length === 0}
            title="Limpar carrinho"
          >
            <Trash2 className="h-5 w-5" />
          </Button>
        </CardTitle>
        {selectedCustomer && (
          <div className="flex items-center gap-2 text-sm mt-2 p-2 rounded-md bg-background">
            <Avatar className="h-6 w-6">
              <AvatarImage src={selectedCustomer.avatar} alt={selectedCustomer.name} />
              <AvatarFallback>{selectedCustomer.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span>{selectedCustomer.name}</span>
            {selectedCustomer.credit > 0 && (
              <Badge variant="destructive" className="ml-auto text-xs">
                Crédito: {formatCurrency(selectedCustomer.credit)}
              </Badge>
            )}
          </div>
        )}
      </CardHeader>
      
      <CardContent className="overflow-y-auto flex-grow">
        {cart.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-muted-foreground py-8">
            <ShoppingCart className="h-12 w-12 mb-2" />
            <p>Seu carrinho está vazio</p>
            <p className="text-sm">Adicione produtos para iniciar uma venda</p>
          </div>
        ) : (
          <div className="space-y-2">
            {cart.map((item) => (
              <CartItem
                key={item.productId}
                productId={item.productId}
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                stock={item.stock}
                imageUrl={item.imageUrl}
                onUpdateQuantity={onUpdateCartItemQuantity}
                onRemove={onRemoveFromCart}
              />
            ))}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex-col pt-4 border-t">
        <div className="w-full space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>{formatCurrency(cartTotal)}</span>
          </div>
          
          <div className="flex justify-between font-medium">
            <span>Total</span>
            <span className="text-lg text-interbantu-orange">{formatCurrency(cartTotal)}</span>
          </div>
          
          <Button 
            className="w-full mt-2" 
            size="lg"
            disabled={cart.length === 0}
            onClick={onCheckout}
          >
            Finalizar Venda
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CartSection;
