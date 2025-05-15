
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, Package, ArrowUpDown, RefreshCw, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatCurrency } from '@/utils/mockData';
import { toast } from 'sonner';

// Product type definition
interface Product {
  id: string;
  code: string;
  name: string;
  category: string;
  price: number;
  cost: number;
  stock: number;
  minStock: number;
  location: string;
  lastUpdated: string;
}

// Mock products data
const mockProducts: Product[] = [
  {
    id: '1',
    code: 'ARR001',
    name: 'Arroz Pérola 1kg',
    category: 'Mercearia',
    price: 100,
    cost: 75,
    stock: 25,
    minStock: 10,
    location: 'A1-03',
    lastUpdated: '12/05/2025',
  },
  {
    id: '2',
    code: 'OLE001',
    name: 'Óleo de Soja 900ml',
    category: 'Mercearia',
    price: 180,
    cost: 150,
    stock: 30,
    minStock: 15,
    location: 'A1-04',
    lastUpdated: '10/05/2025',
  },
  {
    id: '3',
    code: 'FEI001',
    name: 'Feijão 1kg',
    category: 'Mercearia',
    price: 120,
    cost: 95,
    stock: 8,
    minStock: 10,
    location: 'A1-05',
    lastUpdated: '11/05/2025',
  },
  {
    id: '4',
    code: 'ACU001',
    name: 'Açúcar 1kg',
    category: 'Mercearia',
    price: 90,
    cost: 70,
    stock: 18,
    minStock: 15,
    location: 'A1-06',
    lastUpdated: '13/05/2025',
  },
  {
    id: '5',
    code: 'REF001',
    name: 'Refrigerante Cola 2L',
    category: 'Bebidas',
    price: 130,
    cost: 100,
    stock: 24,
    minStock: 12,
    location: 'B2-01',
    lastUpdated: '09/05/2025',
  },
  {
    id: '6',
    code: 'AGU001',
    name: 'Água Mineral 5L',
    category: 'Bebidas',
    price: 85,
    cost: 60,
    stock: 40,
    minStock: 20,
    location: 'B2-02',
    lastUpdated: '08/05/2025',
  },
  {
    id: '7',
    code: 'LEI001',
    name: 'Leite 1L',
    category: 'Laticínios',
    price: 95,
    cost: 75,
    stock: 12,
    minStock: 20,
    location: 'C3-01',
    lastUpdated: '14/05/2025',
  },
  {
    id: '8',
    code: 'PAO001',
    name: 'Pão de Forma',
    category: 'Padaria',
    price: 85,
    cost: 65,
    stock: 8,
    minStock: 10,
    location: 'D4-01',
    lastUpdated: '15/05/2025',
  },
  {
    id: '9',
    code: 'SAB001',
    name: 'Sabonete em Barra',
    category: 'Higiene',
    price: 40,
    cost: 25,
    stock: 5,
    minStock: 25,
    location: 'E5-01',
    lastUpdated: '07/05/2025',
  },
  {
    id: '10',
    code: 'DET001',
    name: 'Detergente 500ml',
    category: 'Limpeza',
    price: 65,
    cost: 45,
    stock: 32,
    minStock: 15,
    location: 'F6-01',
    lastUpdated: '06/05/2025',
  },
];

const Inventory = () => {
  const [view, setView] = useState<'table' | 'grid'>('table');
  const [filter, setFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  // Filter and sort products
  const filteredProducts = mockProducts
    .filter(product => {
      // Filter by category or alert status
      if (filter === 'low') {
        return product.stock < product.minStock;
      }
      if (filter !== 'all' && filter !== 'low') {
        return product.category.toLowerCase() === filter;
      }
      return true;
    })
    .filter(product => {
      // Filter by search query
      if (!searchQuery.trim()) return true;
      const query = searchQuery.toLowerCase().trim();
      return (
        product.name.toLowerCase().includes(query) || 
        product.code.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.location.toLowerCase().includes(query)
      );
    })
    .sort((a, b) => {
      // Sort products
      let compareA: string | number = a[sortBy as keyof Product] as string | number;
      let compareB: string | number = b[sortBy as keyof Product] as string | number;
      
      if (typeof compareA === 'string' && typeof compareB === 'string') {
        compareA = compareA.toLowerCase();
        compareB = compareB.toLowerCase();
      }
      
      if (compareA < compareB) return sortDirection === 'asc' ? -1 : 1;
      if (compareA > compareB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  
  // Get unique categories
  const categories = ['all', 'low', ...new Set(mockProducts.map(p => p.category.toLowerCase()))];
  
  // Handle sort click
  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDirection('asc');
    }
  };
  
  // Handle update stock
  const handleUpdateStock = (productId: string, newStock: number) => {
    // In a real app, this would update the database
    toast.success('Estoque atualizado com sucesso');
  };
  
  // Count low stock products
  const lowStockCount = mockProducts.filter(p => p.stock < p.minStock).length;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">Gestão de Estoque</h1>
        
        <div className="flex flex-wrap gap-2">
          <Button className="gap-2">
            <Plus size={16} />
            Adicionar Produto
          </Button>
          <Button variant="outline" className="gap-2">
            <RefreshCw size={16} />
            Atualizar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="md:col-span-3">
          <CardHeader className="pb-3">
            <CardTitle>Inventário</CardTitle>
            <CardDescription>
              Gerencie o estoque de produtos da sua loja
            </CardDescription>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Pesquisar produtos..." 
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2">
                <Button 
                  variant={view === 'table' ? 'default' : 'outline'} 
                  size="icon"
                  onClick={() => setView('table')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="8" height="8" x="3" y="3" rx="1" /><rect width="8" height="8" x="3" y="13" rx="1" /><rect width="8" height="8" x="13" y="3" rx="1" /><rect width="8" height="8" x="13" y="13" rx="1" /></svg>
                </Button>
                <Button 
                  variant={view === 'grid' ? 'default' : 'outline'} 
                  size="icon"
                  onClick={() => setView('grid')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><line x1="3" x2="21" y1="9" y2="9" /><line x1="9" x2="9" y1="21" y2="9" /></svg>
                </Button>
              </div>
            </div>
            
            <Tabs 
              defaultValue="all" 
              value={filter} 
              onValueChange={setFilter} 
              className="mt-4"
            >
              <TabsList className="w-full justify-start overflow-x-auto">
                {categories.map((category) => (
                  <TabsTrigger 
                    key={category} 
                    value={category}
                    className="capitalize"
                  >
                    {category === 'all' ? 'Todos' : category === 'low' ? (
                      <span className="flex items-center gap-1">
                        Estoque Baixo
                        {lowStockCount > 0 && (
                          <Badge variant="destructive" className="h-5 w-5 text-xs p-0 flex items-center justify-center">
                            {lowStockCount}
                          </Badge>
                        )}
                      </span>
                    ) : category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </CardHeader>
          
          <CardContent>
            {filteredProducts.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Package className="h-12 w-12 mx-auto mb-2" />
                <p>Nenhum produto encontrado</p>
              </div>
            ) : view === 'table' ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead 
                        className="cursor-pointer"
                        onClick={() => handleSort('code')}
                      >
                        <div className="flex items-center gap-1">
                          Código
                          {sortBy === 'code' && (
                            <ArrowUpDown className="h-3 w-3" />
                          )}
                        </div>
                      </TableHead>
                      <TableHead 
                        className="cursor-pointer"
                        onClick={() => handleSort('name')}
                      >
                        <div className="flex items-center gap-1">
                          Produto
                          {sortBy === 'name' && (
                            <ArrowUpDown className="h-3 w-3" />
                          )}
                        </div>
                      </TableHead>
                      <TableHead 
                        className="cursor-pointer"
                        onClick={() => handleSort('category')}
                      >
                        <div className="flex items-center gap-1">
                          Categoria
                          {sortBy === 'category' && (
                            <ArrowUpDown className="h-3 w-3" />
                          )}
                        </div>
                      </TableHead>
                      <TableHead 
                        className="text-right cursor-pointer"
                        onClick={() => handleSort('price')}
                      >
                        <div className="flex items-center gap-1 justify-end">
                          Preço
                          {sortBy === 'price' && (
                            <ArrowUpDown className="h-3 w-3" />
                          )}
                        </div>
                      </TableHead>
                      <TableHead 
                        className="text-right cursor-pointer"
                        onClick={() => handleSort('stock')}
                      >
                        <div className="flex items-center gap-1 justify-end">
                          Estoque
                          {sortBy === 'stock' && (
                            <ArrowUpDown className="h-3 w-3" />
                          )}
                        </div>
                      </TableHead>
                      <TableHead>Localização</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  
                  <TableBody>
                    {filteredProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">{product.code}</TableCell>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell className="text-right">{formatCurrency(product.price)}</TableCell>
                        <TableCell className="text-right">
                          <span className={product.stock < product.minStock ? 'text-destructive font-medium' : ''}>
                            {product.stock} / {product.minStock}
                          </span>
                        </TableCell>
                        <TableCell>{product.location}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              Editar
                            </Button>
                            <Button variant="outline" size="sm">
                              +/-
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filteredProducts.map((product) => (
                  <Card key={product.id}>
                    <CardContent className="p-4">
                      <div className="space-y-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{product.name}</p>
                            <p className="text-sm text-muted-foreground">{product.code}</p>
                          </div>
                          <Badge>{product.category}</Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <p className="text-muted-foreground">Preço</p>
                            <p className="font-medium">{formatCurrency(product.price)}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Custo</p>
                            <p className="font-medium">{formatCurrency(product.cost)}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Estoque</p>
                            <p className={`font-medium ${product.stock < product.minStock ? 'text-destructive' : ''}`}>
                              {product.stock} / {product.minStock}
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Localização</p>
                            <p className="font-medium">{product.location}</p>
                          </div>
                        </div>
                        
                        <div className="flex gap-2 pt-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            Editar
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1">
                            Atualizar
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Resumo</CardTitle>
            <CardDescription>
              Informações sobre o estoque
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-md">
                <h3 className="text-sm font-medium mb-2">Alertas de Estoque</h3>
                <p className="text-lg font-semibold flex items-center gap-1">
                  <span className={lowStockCount > 0 ? 'text-destructive' : ''}>
                    {lowStockCount}
                  </span> 
                  <span className="text-sm font-normal text-muted-foreground">produtos abaixo do mínimo</span>
                </p>
              </div>
              
              <div className="bg-muted/50 p-4 rounded-md">
                <h3 className="text-sm font-medium mb-2">Valor do Estoque</h3>
                <p className="text-lg font-semibold">
                  {formatCurrency(mockProducts.reduce((sum, p) => sum + (p.cost * p.stock), 0))}
                </p>
                <p className="text-sm text-muted-foreground">Custo total de reposição</p>
              </div>
              
              <div className="bg-muted/50 p-4 rounded-md">
                <h3 className="text-sm font-medium mb-2">Produtos</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-lg font-semibold">{mockProducts.length}</p>
                    <p className="text-sm text-muted-foreground">Total</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold">
                      {mockProducts.reduce((sum, p) => sum + p.stock, 0)}
                    </p>
                    <p className="text-sm text-muted-foreground">Unidades</p>
                  </div>
                </div>
              </div>
              
              <Button variant="outline" className="w-full">
                Exportar Dados
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Inventory;
