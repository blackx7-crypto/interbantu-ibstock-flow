
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Package } from "lucide-react";
import Logo from "@/components/Logo";

const NotFound = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="text-center max-w-md">
        <div className="flex flex-col items-center gap-6">
          <Logo size="lg" />
          
          <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
            <Package size={40} />
          </div>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold mt-6 mb-2 text-interbantu-burgundy">Página não encontrada</h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-6">
          A página <span className="font-medium text-foreground break-all">{location.pathname}</span> não existe ou foi removida.
        </p>
        
        <Button asChild className="bg-interbantu-orange hover:bg-interbantu-orange/90 px-6 py-2 h-auto">
          <Link to="/dashboard">Voltar ao Dashboard</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
