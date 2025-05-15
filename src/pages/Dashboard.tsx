
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { ArrowUpRight, Package, ShoppingCart, TrendingDown, TrendingUp, User, Users } from 'lucide-react';
import { 
  generateDailySalesData,
  generateInventoryAlerts, 
  generateTopProducts, 
  generateTopSellers, 
  generateRecentTransactions,
  formatCurrency
} from '@/utils/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Dashboard = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const isSupervisor = user?.role === 'supervisor' || isAdmin;
  
  // Generate mock data
  const salesData = generateDailySalesData();
  const inventoryAlerts = generateInventoryAlerts();
  const topProducts = generateTopProducts();
  const topSellers = generateTopSellers();
  const recentTransactions = generateRecentTransactions();

  // Calculated metrics
  const todaySales = salesData[salesData.length - 1].value;
  const yesterdaySales = salesData[salesData.length - 2].value;
  const salesDiff = todaySales - yesterdaySales;
  const salesPercentage = ((salesDiff / yesterdaySales) * 100).toFixed(1);
  const isPositiveChange = salesDiff > 0;
  
  // Count alerts by category
  const alertsByCategory = inventoryAlerts.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <Badge variant="outline" className="bg-accent text-accent-foreground font-normal">
          {new Date().toLocaleDateString('pt-BR', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Today's Sales Card */}
        <Card className="card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Vendas de Hoje
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-2xl font-bold">
                  {formatCurrency(todaySales)}
                </p>
                <p className={`text-sm flex items-center ${isPositiveChange ? 'text-green-600' : 'text-red-600'}`}>
                  {isPositiveChange ? (
                    <TrendingUp className="mr-1 h-4 w-4" />
                  ) : (
                    <TrendingDown className="mr-1 h-4 w-4" />
                  )}
                  {isPositiveChange ? '+' : ''}{salesPercentage}% em relação a ontem
                </p>
              </div>
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <ShoppingCart size={20} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Inventory Alert Card */}
        <Card className="card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Alertas de Estoque
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-2xl font-bold">{inventoryAlerts.length}</p>
                <p className="text-sm text-muted-foreground">
                  {Object.entries(alertsByCategory).map(([category, count], index) => (
                    <span key={category}>
                      {count} em {category}
                      {index < Object.entries(alertsByCategory).length - 1 ? ', ' : ''}
                    </span>
                  ))}
                </p>
              </div>
              <div className="h-10 w-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500">
                <Package size={20} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Customers Card */}
        <Card className="card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Clientes Ativos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-2xl font-bold">{randomInt(80, 120)}</p>
                <p className="text-sm text-green-600 flex items-center">
                  <ArrowUpRight className="mr-1 h-4 w-4" />
                  {randomInt(2, 8)}% este mês
                </p>
              </div>
              <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                <Users size={20} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Daily Transactions Card */}
        <Card className="card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Transações Hoje
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-2xl font-bold">{randomInt(15, 40)}</p>
                <p className="text-sm text-muted-foreground">
                  Média de {randomInt(3, 6)} itens por venda
                </p>
              </div>
              <div className="h-10 w-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-500">
                <ShoppingCart size={20} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Sales Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Vendas dos Últimos 7 Dias</CardTitle>
            <CardDescription>
              Visão geral das vendas diárias
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={salesData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="date" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `${value / 1000}K`}
                />
                <Tooltip 
                  formatter={(value: number) => [formatCurrency(value), 'Vendas']}
                  labelFormatter={(label) => `Data: ${label}`}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#ff5000"
                  activeDot={{ r: 8 }}
                  strokeWidth={3}
                  dot={{ stroke: '#ff5000', strokeWidth: 2, r: 4, fill: 'white' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Inventory Alerts */}
        <Card>
          <CardHeader>
            <CardTitle>Alertas de Estoque</CardTitle>
            <CardDescription>
              Produtos com estoque abaixo do mínimo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {inventoryAlerts.slice(0, 4).map((alert) => (
                <div key={alert.id} className="flex items-center justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="h-10 w-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 shrink-0">
                      <Package size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{alert.product}</p>
                      <p className="text-xs text-muted-foreground">{alert.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{alert.currentStock} unid</p>
                    <p className="text-xs text-muted-foreground">Min: {alert.minStock}</p>
                  </div>
                </div>
              ))}
              
              {inventoryAlerts.length > 4 && (
                <div className="text-center text-sm text-muted-foreground mt-2">
                  + {inventoryAlerts.length - 4} outros alertas
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {isSupervisor && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Top Products */}
          <Card>
            <CardHeader>
              <CardTitle>Produtos Mais Vendidos</CardTitle>
              <CardDescription>
                Top produtos por volume de vendas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product) => (
                  <div key={product.id} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{product.name}</p>
                      <p className="text-xs text-muted-foreground">{product.sales} vendas</p>
                    </div>
                    <p className="font-medium">{formatCurrency(product.revenue)}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Sellers */}
          <Card>
            <CardHeader>
              <CardTitle>Vendedores Destaques</CardTitle>
              <CardDescription>
                Colaboradores com melhor desempenho
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topSellers.map((seller) => (
                  <div key={seller.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={seller.avatar} alt={seller.name} />
                        <AvatarFallback>{seller.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{seller.name}</p>
                        <p className="text-xs text-muted-foreground">{seller.sales} vendas</p>
                      </div>
                    </div>
                    <p className="font-medium">{formatCurrency(seller.revenue)}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Transações Recentes</CardTitle>
          <CardDescription>
            Últimas transações realizadas no sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ref</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Itens</TableHead>
                  <TableHead>Pagamento</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">{transaction.id}</TableCell>
                    <TableCell>{transaction.customer}</TableCell>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>{transaction.items}</TableCell>
                    <TableCell>{transaction.paymentMethod}</TableCell>
                    <TableCell className="text-right">{formatCurrency(transaction.amount)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Helper function for random integers
const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);

export default Dashboard;
