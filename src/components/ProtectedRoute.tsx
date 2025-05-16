
import { ReactNode, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

type UserRole = 'admin' | 'supervisor' | 'seller' | null;

interface ProtectedRouteProps {
  children?: ReactNode;
  requiredRole?: 'admin' | 'supervisor' | 'seller';
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();
  
  // If no children are provided, this is the root route redirect
  if (!children) {
    // If user is not authenticated, redirect to login
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
    
    // Redirect based on role
    if (user?.role === 'admin' || user?.role === 'supervisor') {
      return <Navigate to="/dashboard" />;
    } else {
      // Sellers and others go to POS
      return <Navigate to="/pos" />;
    }
  }
  
  // For protected routes with children
  if (!isAuthenticated) {
    // Redirect to login but save the location they tried to access
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  // Role-based protection
  if (requiredRole) {
    const hasRequiredRole = checkRole(user?.role, requiredRole);
    if (!hasRequiredRole) {
      // If user doesn't have required role, redirect to appropriate default page
      if (user?.role === 'admin' || user?.role === 'supervisor') {
        return <Navigate to="/dashboard" replace />;
      } else {
        return <Navigate to="/pos" replace />;
      }
    }
  }
  
  // User is authenticated and has required role (if specified)
  return <>{children}</>;
};

// Helper function to check if user has required role
function checkRole(userRole: UserRole, requiredRole: string): boolean {
  if (!userRole) return false;
  
  // Admin has access to everything
  if (userRole === 'admin') return true;
  
  // Supervisor has access to supervisor and seller routes
  if (userRole === 'supervisor' && 
      (requiredRole === 'supervisor' || requiredRole === 'seller')) {
    return true;
  }
  
  // Seller only has access to seller routes
  if (userRole === 'seller' && requiredRole === 'seller') {
    return true;
  }
  
  return false;
}

export default ProtectedRoute;
