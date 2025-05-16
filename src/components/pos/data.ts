
// Product category definition
export interface ProductCategory {
  id: string;
  name: string;
}

// Product definition
export interface Product {
  id: string;
  name: string;
  price: number;
  categoryId: string;
  imageUrl?: string;
  stock: number;
}

// Cart item definition
export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  stock: number;
  imageUrl?: string;
}

// Customer definition
export interface Customer {
  id: string;
  name: string;
  phone: string;
  credit: number;
  avatar: string;
}

// Payment method type
export type PaymentMethod = 'cash' | 'card' | 'mkesh' | 'kesh' | 'transfer';

// Mock categories
export const productCategories: ProductCategory[] = [
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
export const productList: Product[] = [
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
export const customers: Customer[] = [
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
