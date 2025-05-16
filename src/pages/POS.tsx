
import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { User } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

// Import mock data and types
import { productCategories, productList, customers } from '@/components/pos/data';
import type { Product, CartItem, Customer, PaymentMethod } from '@/components/pos/data';

// Import components
import ProductGrid from '@/components/pos/ProductGrid';
import CartSection from '@/components/pos/CartSection';
import PaymentDialog from '@/components/pos/PaymentDialog';
import CustomerDialog from '@/components/pos/CustomerDialog';

const POS = () => {
  const { user } = useAuth();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(productList);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cash');
  const [amountPaid, setAmountPaid] = useState<string>('');

  useEffect(() => {
    // Filter products based on category and search query
    let filtered = productList;
    
    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered.filter(product => product.categoryId === activeCategory);
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(query)
      );
    }
    
    setFilteredProducts(filtered);
  }, [activeCategory, searchQuery]);

  // Calculate cart total
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  // Add product to cart
  const addToCart = (id: string, name: string, price: number, stock: number, imageUrl?: string) => {
    const existingItem = cart.find(item => item.productId === id);
    
    if (existingItem) {
      // Check if adding one more would exceed available stock
      if (existingItem.quantity >= stock) {
        toast.error(`Estoque insuficiente para ${name}`);
        return;
      }
      
      setCart(cart.map(item => 
        item.productId === id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      ));
    } else {
      setCart([...cart, {
        productId: id,
        name,
        price,
        quantity: 1,
        stock,
        imageUrl
      }]);
    }
    
    toast.success(`${name} adicionado ao carrinho`);
  };
  
  // Update cart item quantity
  const updateCartItemQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      setCart(cart.filter(item => item.productId !== productId));
      return;
    }
    
    const product = cart.find(item => item.productId === productId);
    
    if (product && newQuantity > product.stock) {
      toast.error(`Estoque insuficiente para ${product.name}`);
      return;
    }
    
    setCart(cart.map(item => 
      item.productId === productId 
        ? { ...item, quantity: newQuantity } 
        : item
    ));
  };
  
  // Remove item from cart
  const removeFromCart = (productId: string) => {
    const itemToRemove = cart.find(item => item.productId === productId);
    setCart(cart.filter(item => item.productId !== productId));
    
    if (itemToRemove) {
      toast.info(`${itemToRemove.name} removido do carrinho`);
    }
  };
  
  // Clear cart
  const clearCart = () => {
    if (cart.length > 0) {
      setCart([]);
      toast.info('Carrinho esvaziado');
    }
  };
  
  // Process payment
  const processPayment = () => {
    if (!cart.length) {
      toast.error('O carrinho está vazio');
      return;
    }
    
    const amount = parseFloat(amountPaid || '0');
    
    if (paymentMethod === 'cash' && amount < cartTotal) {
      toast.error('Valor pago insuficiente');
      return;
    }
    
    // Generate receipt number
    const receiptNumber = `V${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
    
    toast.success(
      <div>
        <p className="font-semibold">Venda finalizada com sucesso!</p>
        <p className="text-xs mt-1">Recibo: {receiptNumber}</p>
      </div>
    );
    
    setPaymentDialogOpen(false);
    setCart([]);
    setSelectedCustomer(null);
    setAmountPaid('');
    setPaymentMethod('cash');
  };

  // Handle customer selection
  const handleSelectCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    toast.success(`Cliente ${customer.name} selecionado`);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <div className="flex items-center">
          <h1 className="text-2xl font-semibold">Ponto de Venda</h1>
          {user && (
            <Badge className="ml-3 bg-interbantu-orange text-white">
              {user.name}
            </Badge>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <CustomerDialog
            customers={customers}
            selectedCustomer={selectedCustomer}
            onSelectCustomer={handleSelectCustomer}
            onClearSelection={() => setSelectedCustomer(null)}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-full">
        {/* Product selection area - 2/3 of the screen on large displays */}
        <div className="lg:col-span-2 flex flex-col">
          <ProductGrid
            products={filteredProducts}
            categories={productCategories}
            activeCategory={activeCategory}
            searchQuery={searchQuery}
            onCategoryChange={setActiveCategory}
            onSearchChange={setSearchQuery}
            onAddToCart={addToCart}
          />
        </div>

        {/* Cart area - 1/3 of the screen on large displays */}
        <div className="flex flex-col">
          <CartSection
            cart={cart}
            cartTotal={cartTotal}
            selectedCustomer={selectedCustomer}
            onUpdateCartItemQuantity={updateCartItemQuantity}
            onRemoveFromCart={removeFromCart}
            onClearCart={clearCart}
            onCheckout={() => cart.length > 0 && setPaymentDialogOpen(true)}
          />
        </div>
      </div>
      
      {/* Payment Dialog */}
      <PaymentDialog
        open={paymentDialogOpen}
        onOpenChange={setPaymentDialogOpen}
        cartTotal={cartTotal}
        selectedCustomer={selectedCustomer}
        paymentMethod={paymentMethod}
        amountPaid={amountPaid}
        onPaymentMethodChange={setPaymentMethod}
        onAmountPaidChange={setAmountPaid}
        onProcessPayment={processPayment}
      />
    </div>
  );
};

export default POS;
