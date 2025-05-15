
import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { LayoutDashboard, ShoppingCart, Package, Users, FileText, Clock, ChevronDown, LogOut } from 'lucide-react';
import Logo from './Logo';
import { useIsMobile } from '@/hooks/use-mobile';

interface SidebarProps {
  collapsed: boolean;
}

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  collapsed: boolean;
  onClick?: () => void;
  hidden?: boolean;
}

interface NavGroupProps {
  title: string;
  children: React.ReactNode;
  collapsed: boolean;
  defaultOpen?: boolean;
}

const NavItem = ({ to, icon: Icon, label, collapsed, onClick, hidden = false }: NavItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  if (hidden) return null;
  
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
          isActive
            ? 'bg-accent text-accent-foreground font-medium'
            : 'text-sidebar-foreground/80 hover:bg-sidebar-accent/50'
        } ${collapsed ? 'justify-center' : ''}`
      }
    >
      <Icon size={collapsed ? 20 : 18} className={isActive ? 'text-interbantu-orange' : ''} />
      {!collapsed && <span className="truncate text-sm">{label}</span>}
    </NavLink>
  );
};

const NavGroup = ({ title, children, collapsed, defaultOpen = true }: NavGroupProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const location = useLocation();
  const isMobile = useIsMobile();

  // Check if any child is active to auto-expand the group
  useEffect(() => {
    const childrenArray = React.Children.toArray(children);
    const hasActiveChild = childrenArray.some((child: any) => {
      if (child.props?.to) {
        return location.pathname === child.props.to;
      }
      return false;
    });
    
    if (hasActiveChild && !isOpen) {
      setIsOpen(true);
    }
  }, [location.pathname, children, isOpen]);

  if (collapsed) {
    return (
      <div className="mb-2">
        {React.Children.map(children, (child) => child)}
      </div>
    );
  }

  return (
    <div className="mb-3">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-1.5 text-xs font-semibold text-sidebar-foreground/60 uppercase"
      >
        {title}
        <ChevronDown
          size={14}
          className={`transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
        />
      </button>
      {isOpen && <div className="space-y-1 mt-1">{children}</div>}
    </div>
  );
};

const Sidebar = ({ collapsed }: SidebarProps) => {
  const { user, logout } = useAuth();
  const isMobile = useIsMobile();
  
  // Determine which nav items to show based on user role
  const isAdmin = user?.role === 'admin';
  const isSupervisor = user?.role === 'supervisor' || isAdmin;
  const isSeller = user?.role === 'seller' || isSupervisor;

  return (
    <aside
      className={`bg-sidebar transition-all duration-300 border-r border-border h-full flex flex-col ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className={`h-16 flex items-center ${collapsed ? 'justify-center' : 'px-4'} border-b border-border`}>
        {collapsed ? (
          <div className="mx-auto">
            <Logo size="sm" />
          </div>
        ) : (
          <Logo />
        )}
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-2 flex flex-col">
        <NavGroup title="Principal" collapsed={collapsed}>
          <NavItem
            to="/dashboard"
            icon={LayoutDashboard}
            label="Dashboard"
            collapsed={collapsed}
          />
          <NavItem
            to="/pos"
            icon={ShoppingCart}
            label="Ponto de Venda"
            collapsed={collapsed}
            hidden={!isSeller}
          />
          <NavItem
            to="/inventory"
            icon={Package}
            label="Estoque"
            collapsed={collapsed}
          />
          <NavItem
            to="/customers"
            icon={Users}
            label="Clientes"
            collapsed={collapsed}
            hidden={!isSeller}
          />
        </NavGroup>

        <NavGroup title="Relatórios" collapsed={collapsed} defaultOpen={false}>
          <NavItem
            to="/reports"
            icon={FileText}
            label="Relatórios"
            collapsed={collapsed}
            hidden={!isSupervisor}
          />
          <NavItem
            to="/shifts"
            icon={Clock}
            label="Turnos"
            collapsed={collapsed}
            hidden={!isSupervisor}
          />
        </NavGroup>
      </div>

      <div className="p-2 border-t border-border mt-auto">
        <NavItem
          to="/login"
          icon={LogOut}
          label="Sair"
          collapsed={collapsed}
          onClick={logout}
        />
      </div>
    </aside>
  );
};

export default Sidebar;
