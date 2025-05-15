
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Package } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
            <Package size={48} />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold mb-2 text-interbantu-burgundy">Página não encontrada</h1>
        <p className="text-xl text-muted-foreground mb-6">
          A página <span className="font-medium text-foreground">{location.pathname}</span> não existe ou foi removida.
        </p>
        
        <Button asChild className="bg-interbantu-orange hover:bg-interbantu-orange/90">
          <Link to="/dashboard">Voltar ao Dashboard</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
