
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, User, UserPlus, Filter, ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatCurrency } from '@/utils/mockData';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

// Customer definition
interface Customer {
  id: string;
  name: string;
  phone: string;
  nuit: string;
  email: string;
  address: string;
  credit: number;
  status: 'active' | 'inactive';
  lastVisit: string;
  totalSpent: number;
  avatar?: string;
}

// Mock customers data
const mockCustomers: Customer[] = [
  {
    id: 'c1',
    name: 'Ana Silva',
    phone: '84 123 4567',
    nuit: '123456789',
    email: 'ana.silva@email.com',
    address: 'Av. Julius Nyerere, 785, Maputo',
    credit: 0,
    status: 'active',
    lastVisit: '15/05/2025',
    totalSpent: 12500,
    avatar: 'https://ui-avatars.com/api/?name=Ana+Silva&background=FF90AD&color=fff',
  },
  {
    id: 'c2',
    name: 'João Machava',
    phone: '85 765 4321',
    nuit: '987654321',
    email: 'joao.machava@email.com',
    address: 'Rua da Resistência, 53, Matola',
    credit: 250,
    status: 'active',
    lastVisit: '14/05/2025',
    totalSpent: 8750,
    avatar: 'https://ui-avatars.com/api/?name=João+Machava&background=90A0FF&color=fff',
  },
  {
    id: 'c3',
    name: 'Maria Tembe',
    phone: '84 555 1234',
    nuit: '',
    email: 'maria.tembe@email.com',
    address: 'Av. Eduardo Mondlane, 1223, Maputo',
    credit: 0,
    status: 'active',
    lastVisit: '12/05/2025',
    totalSpent: 15800,
    avatar: 'https://ui-avatars.com/api/?name=Maria+Tembe&background=90FFAD&color=fff',
  },
  {
    id: 'c4',
    name: 'Carlos Matola',
    phone: '85 222 3333',
    nuit: '456789123',
    email: 'carlos.matola@email.com',
    address: 'Av. Angola, 453, Maputo',
    credit: 500,
    status: 'active',
    lastVisit: '10/05/2025',
    totalSpent: 6250,
    avatar: 'https://ui-avatars.com/api/?name=Carlos+Matola&background=FFCA90&color=fff',
  },
  {
    id: 'c5',
    name: 'Fátima Guambe',
    phone: '84 777 8888',
    nuit: '',
    email: 'fatima.guambe@email.com',
    address: 'Rua da Beira, 78, Maputo',
    credit: 0,
    status: 'inactive',
    lastVisit: '25/04/2025',
    totalSpent: 3450,
    avatar: 'https://ui-avatars.com/api/?name=Fátima+Guambe&background=90CAFF&color=fff',
  },
  {
    id: 'c6',
    name: 'Paulo Macamo',
    phone: '85 444 5555',
    nuit: '654321987',
    email: 'paulo.macamo@email.com',
    address: 'Av. 24 de Julho, 1032, Maputo',
    credit: 120,
    status: 'active',
    lastVisit: '13/05/2025',
    totalSpent: 9870,
    avatar: 'https://ui-avatars.com/api/?name=Paulo+Macamo&background=D0FF90&color=fff',
  },
];

const Customers = () => {
  const [filter, setFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  
  // Filter and sort customers
  const filteredCustomers = mockCustomers
    .filter(customer => {
      // Filter by status
      if (filter === 'active') return customer.status === 'active';
      if (filter === 'inactive') return customer.status === 'inactive';
      if (filter === 'credit') return customer.credit > 0;
      return true;
    })
    .filter(customer => {
      // Filter by search query
      if (!searchQuery.trim()) return true;
      const query = searchQuery.toLowerCase().trim();
      return (
        customer.name.toLowerCase().includes(query) ||
        customer.phone.includes(query) ||
        customer.email.toLowerCase().includes(query)
      );
    })
    .sort((a, b) => {
      // Sort customers
      let compareA: string | number = a[sortBy as keyof Customer] as string | number;
      let compareB: string | number = b[sortBy as keyof Customer] as string | number;
      
      if (typeof compareA === 'string' && typeof compareB === 'string') {
        compareA = compareA.toLowerCase();
        compareB = compareB.toLowerCase();
      }
      
      if (compareA < compareB) return sortDirection === 'asc' ? -1 : 1;
      if (compareA > compareB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  
  // Handle sort click
  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDirection('asc');
    }
  };
  
  // Count customers with credit
  const creditCount = mockCustomers.filter(c => c.credit > 0).length;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">Clientes</h1>
        
        <div className="flex flex-wrap gap-2">
          <Button className="gap-2">
            <UserPlus size={16} />
            Novo Cliente
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Gerenciamento de Clientes</CardTitle>
          <CardDescription>
            Visualize e gerencie os clientes da sua loja
          </CardDescription>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Pesquisar clientes..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant={viewMode === 'table' ? 'default' : 'outline'} 
                size="icon"
                onClick={() => setViewMode('table')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M3 15h18"/><path d="M9 3v18"/><path d="M15 3v18"/></svg>
              </Button>
              <Button 
                variant={viewMode === 'cards' ? 'default' : 'outline'} 
                size="icon"
                onClick={() => setViewMode('cards')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="8" height="8" x="3" y="3" rx="1" /><rect width="8" height="8" x="3" y="13" rx="1" /><rect width="8" height="8" x="13" y="3" rx="1" /><rect width="8" height="8" x="13" y="13" rx="1" /></svg>
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
              <TabsTrigger value="all">Todos</TabsTrigger>
              <TabsTrigger value="active">Ativos</TabsTrigger>
              <TabsTrigger value="inactive">Inativos</TabsTrigger>
              <TabsTrigger value="credit">
                <span className="flex items-center gap-1">
                  Com Crédito
                  {creditCount > 0 && (
                    <Badge variant="destructive" className="h-5 w-5 text-xs p-0 flex items-center justify-center">
                      {creditCount}
                    </Badge>
                  )}
                </span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        
        <CardContent>
          {filteredCustomers.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <User className="h-12 w-12 mx-auto mb-2" />
              <p>Nenhum cliente encontrado</p>
            </div>
          ) : viewMode === 'table' ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead 
                      className="cursor-pointer"
                      onClick={() => handleSort('name')}
                    >
                      <div className="flex items-center gap-1">
                        Nome
                        {sortBy === 'name' && (
                          <ArrowUpDown className="h-3 w-3" />
                        )}
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer"
                      onClick={() => handleSort('phone')}
                    >
                      <div className="flex items-center gap-1">
                        Telefone
                        {sortBy === 'phone' && (
                          <ArrowUpDown className="h-3 w-3" />
                        )}
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hidden md:table-cell"
                      onClick={() => handleSort('email')}
                    >
                      <div className="flex items-center gap-1">
                        Email
                        {sortBy === 'email' && (
                          <ArrowUpDown className="h-3 w-3" />
                        )}
                      </div>
                    </TableHead>
                    <TableHead 
                      className="text-right cursor-pointer"
                      onClick={() => handleSort('credit')}
                    >
                      <div className="flex items-center gap-1 justify-end">
                        Crédito
                        {sortBy === 'credit' && (
                          <ArrowUpDown className="h-3 w-3" />
                        )}
                      </div>
                    </TableHead>
                    <TableHead 
                      className="text-right cursor-pointer hidden md:table-cell"
                      onClick={() => handleSort('totalSpent')}
                    >
                      <div className="flex items-center gap-1 justify-end">
                        Total Gasto
                        {sortBy === 'totalSpent' && (
                          <ArrowUpDown className="h-3 w-3" />
                        )}
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hidden md:table-cell"
                      onClick={() => handleSort('lastVisit')}
                    >
                      <div className="flex items-center gap-1">
                        Última Visita
                        {sortBy === 'lastVisit' && (
                          <ArrowUpDown className="h-3 w-3" />
                        )}
                      </div>
                    </TableHead>
                    <TableHead className="text-right">Status</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                
                <TableBody>
                  {filteredCustomers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={customer.avatar} alt={customer.name} />
                            <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{customer.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{customer.phone}</TableCell>
                      <TableCell className="hidden md:table-cell">{customer.email}</TableCell>
                      <TableCell className="text-right">
                        {customer.credit > 0 ? (
                          <span className="text-destructive font-medium">
                            {formatCurrency(customer.credit)}
                          </span>
                        ) : (
                          '-'
                        )}
                      </TableCell>
                      <TableCell className="text-right hidden md:table-cell">
                        {formatCurrency(customer.totalSpent)}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{customer.lastVisit}</TableCell>
                      <TableCell className="text-right">
                        <Badge variant={customer.status === 'active' ? 'outline' : 'secondary'}>
                          {customer.status === 'active' ? 'Ativo' : 'Inativo'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Ações</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => setSelectedCustomer(customer)}>Ver Detalhes</DropdownMenuItem>
                            <DropdownMenuItem>Editar</DropdownMenuItem>
                            {customer.credit > 0 && (
                              <DropdownMenuItem>Pagar Crédito</DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Histórico de Compras</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {filteredCustomers.map((customer) => (
                <Card key={customer.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={customer.avatar} alt={customer.name} />
                          <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-base">{customer.name}</CardTitle>
                          <p className="text-sm text-muted-foreground">{customer.phone}</p>
                        </div>
                      </div>
                      <Badge variant={customer.status === 'active' ? 'outline' : 'secondary'}>
                        {customer.status === 'active' ? 'Ativo' : 'Inativo'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-muted-foreground">Email</p>
                        <p>{customer.email || '-'}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Última Visita</p>
                        <p>{customer.lastVisit}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Total Gasto</p>
                        <p>{formatCurrency(customer.totalSpent)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Crédito</p>
                        <p className={customer.credit > 0 ? 'text-destructive font-medium' : ''}>
                          {customer.credit > 0 ? formatCurrency(customer.credit) : '-'}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => setSelectedCustomer(customer)}
                    >
                      Ver Detalhes
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      
      <Dialog open={!!selectedCustomer} onOpenChange={(open) => !open && setSelectedCustomer(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Detalhes do Cliente</DialogTitle>
            <DialogDescription>
              Informações detalhadas e histórico de compras
            </DialogDescription>
          </DialogHeader>
          
          {selectedCustomer && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={selectedCustomer.avatar} alt={selectedCustomer.name} />
                  <AvatarFallback>{selectedCustomer.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold">{selectedCustomer.name}</h3>
                  <p className="text-muted-foreground flex items-center gap-1">
                    <Badge variant={selectedCustomer.status === 'active' ? 'outline' : 'secondary'}>
                      {selectedCustomer.status === 'active' ? 'Ativo' : 'Inativo'}
                    </Badge>
                    <span>Cliente desde Janeiro 2025</span>
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Informações de Contato</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Telefone</span>
                        <span className="font-medium">{selectedCustomer.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Email</span>
                        <span className="font-medium">{selectedCustomer.email || '-'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>NUIT</span>
                        <span className="font-medium">{selectedCustomer.nuit || '-'}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Endereço</h4>
                    <p>{selectedCustomer.address}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Estatísticas</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Total Gasto</span>
                        <span className="font-medium">{formatCurrency(selectedCustomer.totalSpent)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Última Visita</span>
                        <span className="font-medium">{selectedCustomer.lastVisit}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Crédito Atual</span>
                        <span className={`font-medium ${selectedCustomer.credit > 0 ? 'text-destructive' : ''}`}>
                          {selectedCustomer.credit > 0 ? formatCurrency(selectedCustomer.credit) : 'Sem crédito'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-muted p-3 rounded-lg">
                    <h4 className="text-sm font-medium mb-2">Preferências</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">Alimentos</Badge>
                      <Badge variant="secondary">Bebidas</Badge>
                      <Badge variant="secondary">Limpeza</Badge>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-muted-foreground">Últimas Compras</h4>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Data</TableHead>
                        <TableHead>Valor</TableHead>
                        <TableHead>Itens</TableHead>
                        <TableHead>Pagamento</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>15/05/2025</TableCell>
                        <TableCell>{formatCurrency(2500)}</TableCell>
                        <TableCell>8</TableCell>
                        <TableCell>Dinheiro</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>10/05/2025</TableCell>
                        <TableCell>{formatCurrency(1750)}</TableCell>
                        <TableCell>5</TableCell>
                        <TableCell>mKesh</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>05/05/2025</TableCell>
                        <TableCell>{formatCurrency(3200)}</TableCell>
                        <TableCell>12</TableCell>
                        <TableCell>POS</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter className="flex gap-2">
            <Button variant="outline">
              Editar Cliente
            </Button>
            <Button variant="outline">
              Ver Histórico Completo
            </Button>
            {selectedCustomer?.credit ? (
              <Button 
                onClick={() => {
                  toast.success('Crédito registrado com sucesso!');
                  setSelectedCustomer(null);
                }}
              >
                Pagar Crédito
              </Button>
            ) : (
              <Button>
                Nova Venda
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Customers;
