
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatCurrency } from '@/utils/mockData';

// Payment method type
type PaymentMethod = 'cash' | 'card' | 'mkesh' | 'kesh' | 'transfer';

// Customer definition
interface Customer {
  id: string;
  name: string;
  phone: string;
  credit: number;
  avatar: string;
}

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cartTotal: number;
  selectedCustomer: Customer | null;
  paymentMethod: PaymentMethod;
  amountPaid: string;
  onPaymentMethodChange: (method: PaymentMethod) => void;
  onAmountPaidChange: (amount: string) => void;
  onProcessPayment: () => void;
}

const PaymentDialog: React.FC<PaymentDialogProps> = ({
  open,
  onOpenChange,
  cartTotal,
  selectedCustomer,
  paymentMethod,
  amountPaid,
  onPaymentMethodChange,
  onAmountPaidChange,
  onProcessPayment,
}) => {
  const getChangeAmount = () => {
    const paid = parseFloat(amountPaid || '0');
    return Math.max(0, paid - cartTotal);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
                onClick={() => onPaymentMethodChange('cash')}
              >
                Dinheiro
              </Button>
              <Button 
                type="button" 
                variant={paymentMethod === 'mkesh' ? 'default' : 'outline'} 
                className="justify-start"
                onClick={() => onPaymentMethodChange('mkesh')}
              >
                mKesh
              </Button>
              <Button 
                type="button" 
                variant={paymentMethod === 'kesh' ? 'default' : 'outline'} 
                className="justify-start"
                onClick={() => onPaymentMethodChange('kesh')}
              >
                Kesh
              </Button>
              <Button 
                type="button" 
                variant={paymentMethod === 'card' ? 'default' : 'outline'} 
                className="justify-start"
                onClick={() => onPaymentMethodChange('card')}
              >
                POS
              </Button>
              <Button 
                type="button" 
                variant={paymentMethod === 'transfer' ? 'default' : 'outline'} 
                className="justify-start"
                onClick={() => onPaymentMethodChange('transfer')}
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
                  onChange={(e) => onAmountPaidChange(e.target.value)}
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
            onClick={() => onOpenChange(false)}
          >
            Cancelar
          </Button>
          <Button onClick={onProcessPayment}>
            Confirmar Pagamento
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentDialog;
