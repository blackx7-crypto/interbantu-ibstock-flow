
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import ProductCard from './ProductCard';

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

interface ProductGridProps {
  products: Product[];
  categories: ProductCategory[];
  activeCategory: string;
  searchQuery: string;
  onCategoryChange: (category: string) => void;
  onSearchChange: (query: string) => void;
  onAddToCart: (id: string, name: string, price: number, stock: number, imageUrl?: string) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  categories,
  activeCategory,
  searchQuery,
  onCategoryChange,
  onSearchChange,
  onAddToCart,
}) => {
  return (
    <Card className="flex-1 border-2 dark:border-slate-800">
      <CardHeader className="pb-2">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="relative w-full md:max-w-xs">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              className="pl-10"
              placeholder="Pesquisar produtos..." 
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
          
          <div className="overflow-x-auto pb-1 w-full md:w-auto flex-1">
            <Tabs defaultValue={activeCategory} value={activeCategory} onValueChange={onCategoryChange}>
              <TabsList className="w-full justify-start overflow-x-auto">
                {categories.map((category) => (
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
        {products.length === 0 ? (
          <div className="text-center py-10 text-muted-foreground">
            Nenhum produto encontrado
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                stock={product.stock}
                imageUrl={product.imageUrl}
                onAddToCart={() => onAddToCart(
                  product.id, 
                  product.name, 
                  product.price, 
                  product.stock, 
                  product.imageUrl
                )}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductGrid;
