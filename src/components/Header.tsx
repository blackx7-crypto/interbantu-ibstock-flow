
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Bell, Menu, Search, Settings, User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import Logo from './Logo';

interface HeaderProps {
  toggleSidebar: () => void;
  sidebarCollapsed: boolean;
}

const Header = ({ toggleSidebar, sidebarCollapsed }: HeaderProps) => {
  const { user, logout } = useAuth();

  const roleLabel = () => {
    switch (user?.role) {
      case 'admin':
        return 'Administrator';
      case 'supervisor':
        return 'Supervisor';
      case 'seller':
        return 'Vendedor';
      default:
        return '';
    }
  };

  return (
    <header className="h-16 bg-white dark:bg-card border-b border-border flex items-center justify-between px-4 sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar} 
          className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-full hover:bg-secondary"
        >
          <Menu size={20} />
        </button>
        
        <div className="hidden md:block">
          <Logo size="sm" />
        </div>
      </div>

      <div className="hidden md:flex max-w-md w-full mx-4 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input 
          placeholder="Pesquisar produtos, clientes..." 
          className="pl-10 bg-secondary border-none" 
        />
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <button className="text-muted-foreground hover:text-foreground p-2 rounded-full hover:bg-secondary relative">
          <Bell size={20} />
          <span className="absolute top-1 right-1 h-2 w-2 bg-interbantu-orange rounded-full"></span>
        </button>
        
        <button className="text-muted-foreground hover:text-foreground p-2 rounded-full hover:bg-secondary">
          <Settings size={20} />
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 focus:outline-none">
            <div className="flex items-center gap-2 rounded-full hover:bg-secondary p-2">
              {user?.avatar ? (
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="h-8 w-8 rounded-full border border-border"
                />
              ) : (
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                  <User size={16} />
                </div>
              )}
              <span className="text-sm font-medium hidden md:block">{user?.name}</span>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span>{user?.name}</span>
                <span className="text-xs text-muted-foreground">{roleLabel()}</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">Perfil</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">Configurações</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" onClick={logout}>
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
