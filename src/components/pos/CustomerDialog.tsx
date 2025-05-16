
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/utils/mockData';

// Customer definition
interface Customer {
  id: string;
  name: string;
  phone: string;
  credit: number;
  avatar: string;
}

interface CustomerDialogProps {
  customers: Customer[];
  selectedCustomer: Customer | null;
  onSelectCustomer: (customer: Customer) => void;
  onClearSelection: () => void;
}

const CustomerDialog: React.FC<CustomerDialogProps> = ({
  customers,
  selectedCustomer,
  onSelectCustomer,
  onClearSelection
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Avatar className="h-5 w-5">
            {selectedCustomer?.avatar ? (
              <AvatarImage src={selectedCustomer.avatar} />
            ) : null}
            <AvatarFallback className="text-xs">
              {selectedCustomer ? selectedCustomer.name.charAt(0) : 'C'}
            </AvatarFallback>
          </Avatar>
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
              onClick={() => onSelectCustomer(customer)}
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
          <Button onClick={onClearSelection} variant="ghost">
            Limpar Seleção
          </Button>
          <DialogTrigger asChild>
            <Button>Confirmar</Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CustomerDialog;
