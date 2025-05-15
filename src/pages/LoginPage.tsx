
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff } from 'lucide-react';
import Logo from '@/components/Logo';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  // Demo login accounts
  const demoAccounts = [
    { email: 'admin@ibstock.com', label: 'Admin' },
    { email: 'supervisor@ibstock.com', label: 'Supervisor' },
    { email: 'seller@ibstock.com', label: 'Vendedor' },
  ];

  const handleDemoLogin = (email: string) => {
    setEmail(email);
    setPassword('password123');
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-interbantu-light to-white"
      style={{
        backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(255, 200, 124, 0.1) 0%, rgba(252, 251, 247, 0.05) 99.9%)'
      }}
    >
      <Card className="w-full max-w-md glass-card">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <Logo size="lg" />
          </div>
          <CardTitle className="text-2xl font-semibold text-interbantu-burgundy">
            IBSTOCK
          </CardTitle>
          <CardDescription>
            Sistema de Gestão de Mercearias
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu.email@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border border-border pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </Button>
              </div>
            </div>
            <Button 
              type="submit" 
              className="w-full bg-interbantu-orange hover:bg-interbantu-orange/90" 
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <span className="animate-spin mr-2 h-4 w-4 border-t-2 border-b-2 border-white rounded-full"></span>
                  Autenticando...
                </span>
              ) : (
                'Entrar'
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <div className="text-sm text-muted-foreground text-center w-full mb-2">
            Contas de demonstração (senha: password123)
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {demoAccounts.map((account) => (
              <Button 
                key={account.email}
                variant="outline" 
                size="sm"
                onClick={() => handleDemoLogin(account.email)}
              >
                {account.label}
              </Button>
            ))}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
