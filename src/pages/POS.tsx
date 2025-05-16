import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Minus, ShoppingCart, User, Receipt, Package, X, Trash2 } from 'lucide-react';
import { formatCurrency } from '@/utils/mockData';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';

// Product category definition
interface ProductCategory {
  id: string;
  name: string;
}

// Product definition
interface Product {
  id: string;
  name: string;
  price: number;
  categoryId: string;
  imageUrl?: string;
  stock: number;
}

// Cart item definition
interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  stock: number;
  imageUrl?: string;
}

// Mock categories
const productCategories: ProductCategory[] = [
  { id: 'all', name: 'Todos' },
  { id: 'groceries', name: 'Mercearia' },
  { id: 'beverages', name: 'Bebidas' },
  { id: 'bakery', name: 'Padaria' },
  { id: 'dairy', name: 'Laticínios' },
  { id: 'meat', name: 'Carnes' },
  { id: 'hygiene', name: 'Higiene' },
  { id: 'cleaning', name: 'Limpeza' },
];

// Mock products
const productList: Product[] = [
  {
    id: 'p1',
    name: 'Arroz Pérola 1kg',
    price: 100,
    categoryId: 'groceries',
    stock: 25,
    imageUrl: 'https://ui-avatars.com/api/?name=Arroz&background=F3F4F6&color=4B5563&size=100&font-size=0.33',
  },
  {
    id: 'p2',
    name: 'Óleo de Soja 900ml',
    price: 180,
    categoryId: 'groceries',
    stock: 30,
    imageUrl: 'https://ui-avatars.com/api/?name=Óleo&background=F3F4F6&color=4B5563&size=100&font-size=0.33',
  },
  {
    id: 'p3',
    name: 'Feijão 1kg',
    price: 120,
    categoryId: 'groceries',
    stock: 15,
    imageUrl: 'https://ui-avatars.com/api/?name=Feijão&background=F3F4F6&color=4B5563&size=100&font-size=0.33',
  },
  {
    id: 'p4',
    name: 'Açúcar 1kg',
    price: 90,
    categoryId: 'groceries',
    stock: 18,
    imageUrl: 'https://ui-avatars.com/api/?name=Açúcar&background=F3F4F6&color=4B5563&size=100&font-size=0.33',
  },
  {
    id: 'p5',
    name: 'Refrigerante Cola 2L',
    price: 130,
    categoryId: 'beverages',
    stock: 24,
    imageUrl: 'https://ui-avatars.com/api/?name=Cola&background=F3F4F6&color=4B5563&size=100&font-size=0.33',
  },
  {
    id: 'p6',
    name: 'Água Mineral 5L',
    price: 85,
    categoryId: 'beverages',
    stock: 40,
    imageUrl: 'https://ui-avatars.com/api/?name=Água&background=F3F4F6&color=4B5563&size=100&font-size=0.33',
  },
  {
    id: 'p7',
    name: 'Leite 1L',
    price: 95,
    categoryId: 'dairy',
    stock: 12,
    imageUrl: 'https://ui-avatars.com/api/?name=Leite&background=F3F4F6&color=4B5563&size=100&font-size=0.33',
  },
  {
    id: 'p8',
    name: 'Pão de Forma',
    price: 85,
    categoryId: 'bakery',
    stock: 8,
    imageUrl: 'https://ui-avatars.com/api/?name=Pão&background=F3F4F6&color=4B5563&size=100&font-size=0.33',
  },
  {
    id: 'p9',
    name: 'Sabonete em Barra',
    price: 40,
    categoryId: 'hygiene',
    stock: 45,
    imageUrl: 'https://ui-avatars.com/api/?name=Sabonete&background=F3F4F6&color=4B5563&size=100&font-size=0.33',
  },
  {
    id: 'p10',
    name: 'Detergente 500ml',
    price: 65,
    categoryId: 'cleaning',
    stock: 32,
    imageUrl: 'https://ui-avatars.com/api/?name=Detergente&background=F3F4F6&color=4B5563&size=100&font-size=0.33',
  },
  {
    id: 'p11',
    name: 'Papel Higiênico 4un',
    price: 75,
    categoryId: 'hygiene',
    stock: 28,
    imageUrl: 'https://ui-avatars.com/api/?name=Papel&background=F3F4F6&color=4B5563&size=100&font-size=0.33',
  },
  {
    id: 'p12',
    name: 'Frango Congelado 1kg',
    price: 250,
    categoryId: 'meat',
    stock: 10,
    imageUrl: 'https://ui-avatars.com/api/?name=Frango&background=F3F4F6&color=4B5563&size=100&font-size=0.33',
  },
];

// Mock customers
const customers = [
  { 
    id: 'c1', 
    name: 'Ana Silva', 
    phone: '84 123 4567', 
    credit: 0,
    avatar: 'https://ui-avatars.com/api/?name=Ana+Silva&background=FF90AD&color=fff',
  },
  { 
    id: 'c2', 
    name: 'João Machava', 
    phone: '85 765 4321', 
    credit: 250,
    avatar: 'https://ui-avatars.com/api/?name=João+Machava&background=90A0FF&color=fff',
  },
  { 
    id: 'c3', 
    name: 'Maria Tembe', 
    phone: '84 555 1234', 
    credit: 0,
    avatar: 'https://ui-avatars.com/api/?name=Maria+Tembe&background=90FFAD&color=fff', 
  },
];

// Payment method type
type PaymentMethod = 'cash' | 'card' | 'mkesh' | 'kesh' | 'transfer';

const POS = () => {
  const { user } = useAuth();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(productList);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<typeof customers[0] | null>(null);
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
  const addToCart = (product: Product) => {
    const existingItem = cart.find(item => item.productId === product.id);
    
    if (existingItem) {
      // Check if adding one more would exceed available stock
      if (existingItem.quantity >= product.stock) {
        toast.error(`Estoque insuficiente para ${product.name}`);
        return;
      }
      
      setCart(cart.map(item => 
        item.productId === product.id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      ));
    } else {
      setCart([...cart, {
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        stock: product.stock,
        imageUrl: product.imageUrl
      }]);
    }
    
    toast.success(`${product.name} adicionado ao carrinho`);
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

  // Calculate change amount
  const getChangeAmount = () => {
    const paid = parseFloat(amountPaid || '0');
    return Math.max(0, paid - cartTotal);
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
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2">
                <User size={16} />
                {selectedCustomer ? selectedCustomer.name : 'Selecionar Cliente'}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Selecionar Cliente</DialogTitle>
                <DialogDescription>
                  Escolha um cliente para esta venda
                </DialogDescription>
              </DialogHeader>
              
              <div className="mt-4 space-y-3">
                {customers.map((customer) => (
                  <div 
                    key={customer.id}
                    className={`p-3 rounded-lg flex items-center justify-between cursor-pointer border ${
                      selectedCustomer?.id === customer.id ? 'border-primary bg-accent' : 'border-border hover:bg-secondary/50'
                    }`}
                    onClick={() => {
                      setSelectedCustomer(customer);
                      toast.success(`Cliente ${customer.name} selecionado`);
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={customer.avatar} alt={customer.name} />
                        <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{customer.name}</p>
                        <p className="text-sm text-muted-foreground">{customer.phone}</p>
                      </div>
                    </div>
                    {customer.credit > 0 && (
                      <Badge variant="destructive" className="bg-red-100 text-red-800 hover:bg-red-100">
                        Crédito: {formatCurrency(customer.credit)}
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
              
              <DialogFooter>
                <Button onClick={() => setSelectedCustomer(null)} variant="ghost">
                  Limpar Seleção
                </Button>
                <DialogTrigger asChild>
                  <Button>Confirmar</Button>
                </DialogTrigger>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-full">
        {/* Product selection area - 2/3 of the screen on large displays */}
        <div className="lg:col-span-2 flex flex-col">
          <Card className="flex-1 border-2 dark:border-slate-800">
            <CardHeader className="pb-2">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="relative w-full md:max-w-xs">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input 
                    className="pl-10"
                    placeholder="Pesquisar produtos..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="overflow-x-auto pb-1 w-full md:w-auto flex-1">
                  <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory}>
                    <TabsList className="w-full justify-start overflow-x-auto">
                      {productCategories.map((category) => (
                        <TabsTrigger 
                          key={category.id} 
                          value={category.id}
                          className="whitespace-nowrap"
                        >
                          {category.name}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </Tabs>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="overflow-y-auto max-h-[calc(100vh-280px)] md:max-h-[calc(100vh-250px)]">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-10 text-muted-foreground">
                  Nenhum produto encontrado
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                  {filteredProducts.map((product) => (
                    <Card 
                      key={product.id} 
                      className={`cursor-pointer transition-all hover:-translate-y-1 hover:shadow-md border-2 ${
                        product.stock < 1 ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                      onClick={() => {
                        if (product.stock > 0) {
                          addToCart(product);
                        } else {
                          toast.error(`${product.name} não disponível em estoque`);
                        }
                      }}
                    >
                      <CardContent className="p-3 flex flex-col items-center text-center">
                        <div className="h-16 w-16 mb-2 flex items-center justify-center">
                          {product.imageUrl ? (
                            <img 
                              src={product.imageUrl} 
                              alt={product.name} 
                              className="h-full w-full object-contain"
                            />
                          ) : (
                            <Package className="h-12 w-12 text-muted-foreground" />
                          )}
                        </div>
                        <p className="text-sm font-medium line-clamp-2">{product.name}</p>
                        <div className="flex justify-between items-center w-full mt-2">
                          <Badge variant="outline" className="font-normal">
                            {product.stock} un
                          </Badge>
                          <p className="font-semibold">{formatCurrency(product.price)}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Cart area - 1/3 of the screen on large displays */}
        <div className="flex flex-col">
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
                  onClick={clearCart} 
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
                    <div 
                      key={item.productId} 
                      className="flex items-center justify-between p-2 rounded-md border-2 border-border bg-background"
                    >
                      <div className="flex items-start gap-2">
                        {item.imageUrl ? (
                          <img 
                            src={item.imageUrl} 
                            alt={item.name} 
                            className="h-10 w-10 object-contain rounded-md"
                          />
                        ) : (
                          <div className="h-10 w-10 bg-muted flex items-center justify-center rounded-md">
                            <Package className="h-5 w-5 text-muted-foreground" />
                          </div>
                        )}
                        
                        <div className="flex-1">
                          <p className="text-sm font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">{formatCurrency(item.price)} × {item.quantity}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-6 w-6"
                          onClick={() => updateCartItemQuantity(item.productId, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        
                        <span className="w-8 text-center">{item.quantity}</span>
                        
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-6 w-6"
                          onClick={() => updateCartItemQuantity(item.productId, item.quantity + 1)}
                          disabled={item.quantity >= item.stock}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6 text-muted-foreground hover:text-destructive ml-1"
                          onClick={() => removeFromCart(item.productId)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
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
                
                <Dialog open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      className="w-full mt-2" 
                      size="lg"
                      disabled={cart.length === 0}
                      onClick={() => cart.length > 0 && setPaymentDialogOpen(true)}
                    >
                      Finalizar Venda
                    </Button>
                  </DialogTrigger>
                  
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Finalizar Venda</DialogTitle>
                      <DialogDescription>
                        Selecione o método de pagamento para concluir esta venda
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-4 py-4">
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium">Método de Pagamento</label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          <Button 
                            type="button" 
                            variant={paymentMethod === 'cash' ? 'default' : 'outline'} 
                            className="justify-start"
                            onClick={() => setPaymentMethod('cash')}
                          >
                            Dinheiro
                          </Button>
                          <Button 
                            type="button" 
                            variant={paymentMethod === 'mkesh' ? 'default' : 'outline'} 
                            className="justify-start"
                            onClick={() => setPaymentMethod('mkesh')}
                          >
                            mKesh
                          </Button>
                          <Button 
                            type="button" 
                            variant={paymentMethod === 'kesh' ? 'default' : 'outline'} 
                            className="justify-start"
                            onClick={() => setPaymentMethod('kesh')}
                          >
                            Kesh
                          </Button>
                          <Button 
                            type="button" 
                            variant={paymentMethod === 'card' ? 'default' : 'outline'} 
                            className="justify-start"
                            onClick={() => setPaymentMethod('card')}
                          >
                            POS
                          </Button>
                          <Button 
                            type="button" 
                            variant={paymentMethod === 'transfer' ? 'default' : 'outline'} 
                            className="justify-start"
                            onClick={() => setPaymentMethod('transfer')}
                          >
                            Transferência
                          </Button>
                        </div>
                      </div>
                      
                      {paymentMethod === 'cash' && (
                        <>
                          <div className="space-y-2">
                            <label className="text-sm font-medium" htmlFor="amount-paid">
                              Valor Pago
                            </label>
                            <Input
                              id="amount-paid"
                              type="number"
                              min={0}
                              value={amountPaid}
                              onChange={(e) => setAmountPaid(e.target.value)}
                              placeholder="Valor recebido do cliente"
                            />
                          </div>
                          
                          {parseFloat(amountPaid || '0') >= cartTotal && (
                            <div className="flex justify-between items-center p-2 bg-muted/50 rounded-md">
                              <span>Troco:</span>
                              <span className="font-medium">{formatCurrency(getChangeAmount())}</span>
                            </div>
                          )}
                        </>
                      )}
                      
                      <div className="bg-interbantu-orange/10 p-4 rounded-lg border border-interbantu-orange/20">
                        <div className="flex justify-between items-center font-medium">
                          <span>Total a pagar:</span>
                          <span>{formatCurrency(cartTotal)}</span>
                        </div>
                        
                        {selectedCustomer && (
                          <div className="flex items-center gap-2 mt-2 text-sm">
                            <span>Cliente:</span>
                            <span>{selectedCustomer.name}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <DialogFooter>
                      <Button 
                        variant="ghost"
                        onClick={() => setPaymentDialogOpen(false)}
                      >
                        Cancelar
                      </Button>
                      <Button onClick={processPayment}>
                        Confirmar Pagamento
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default POS;
