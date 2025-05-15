
import { addDays, format, subDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// Helper function to generate random integer in range
const randomInt = (min: number, max: number) => 
  Math.floor(Math.random() * (max - min + 1) + min);

// Helper to format currency
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-MZ', {
    style: 'currency',
    currency: 'MZN'
  }).format(value);
};

// Generate sales data for the past 7 days
export const generateDailySalesData = () => {
  const today = new Date();
  const data = [];
  
  for (let i = 6; i >= 0; i--) {
    const date = subDays(today, i);
    data.push({
      date: format(date, 'dd/MM', { locale: ptBR }),
      value: randomInt(5000, 25000)
    });
  }
  
  return data;
};

// Generate inventory alerts
export const generateInventoryAlerts = () => {
  const alerts = [
    {
      id: 1,
      product: 'Arroz Pérola 1kg',
      currentStock: 5,
      minStock: 10,
      category: 'Alimentos'
    },
    {
      id: 2,
      product: 'Óleo de Cozinha 1L',
      currentStock: 3,
      minStock: 15,
      category: 'Alimentos'
    },
    {
      id: 3,
      product: 'Leite Fresco 1L',
      currentStock: 6,
      minStock: 20,
      category: 'Laticínios'
    },
    {
      id: 4,
      product: 'Sabonete em Barra',
      currentStock: 8,
      minStock: 25,
      category: 'Higiene'
    },
    {
      id: 5,
      product: 'Pão de Forma',
      currentStock: 4,
      minStock: 12,
      category: 'Padaria'
    }
  ];
  
  return alerts;
};

// Generate top selling products
export const generateTopProducts = () => {
  return [
    {
      id: 1,
      name: 'Arroz Pérola 1kg',
      sales: randomInt(120, 180),
      revenue: randomInt(12000, 18000)
    },
    {
      id: 2,
      name: 'Óleo de Cozinha 1L',
      sales: randomInt(100, 150),
      revenue: randomInt(10000, 15000)
    },
    {
      id: 3,
      name: 'Açúcar 1kg',
      sales: randomInt(90, 130),
      revenue: randomInt(5000, 9000)
    },
    {
      id: 4,
      name: 'Leite em Pó 400g',
      sales: randomInt(70, 120),
      revenue: randomInt(7000, 12000)
    },
    {
      id: 5,
      name: 'Farinha de Milho 1kg',
      sales: randomInt(60, 110),
      revenue: randomInt(3000, 6000)
    }
  ];
};

// Generate top selling sellers
export const generateTopSellers = () => {
  return [
    {
      id: 1,
      name: 'Carlos Machava',
      sales: randomInt(50, 70),
      revenue: randomInt(50000, 70000),
      avatar: 'https://ui-avatars.com/api/?name=Carlos+Machava&background=FF5000&color=fff'
    },
    {
      id: 2,
      name: 'Maria Sitoe',
      sales: randomInt(40, 60),
      revenue: randomInt(40000, 60000),
      avatar: 'https://ui-avatars.com/api/?name=Maria+Sitoe&background=FF7A3D&color=fff'
    },
    {
      id: 3,
      name: 'João Mabjaia',
      sales: randomInt(30, 50),
      revenue: randomInt(30000, 50000),
      avatar: 'https://ui-avatars.com/api/?name=João+Mabjaia&background=FFA57A&color=fff'
    }
  ];
};

// Generate recent transactions
export const generateRecentTransactions = () => {
  const today = new Date();
  const transactions = [];
  
  for (let i = 0; i < 10; i++) {
    const date = subDays(today, randomInt(0, 3));
    const hour = randomInt(8, 20);
    const minute = randomInt(0, 59);
    date.setHours(hour, minute);
    
    transactions.push({
      id: `T${1000 + i}`,
      customer: ['João Mbeki', 'Maria Tembe', 'Carlos Matola', 'Ana Zucula', 'Pedro Macuácua'][randomInt(0, 4)],
      amount: randomInt(500, 5000),
      items: randomInt(1, 10),
      date: format(date, 'dd/MM/yyyy HH:mm', { locale: ptBR }),
      paymentMethod: ['mKesh', 'Kesh', 'POS', 'Transferência', 'Dinheiro'][randomInt(0, 4)]
    });
  }
  
  return transactions;
};
