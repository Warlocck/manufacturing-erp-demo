/**
 * App.tsx - Aplicación principal
 * Design: Industrial Minimalist
 * 
 * Layout:
 * - Sidebar fijo izquierdo (220px)
 * - Área principal con contenido
 * - Navegación entre Clientes e Inventario
 */

import { useState } from 'react';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import ErrorBoundary from './components/ErrorBoundary';
import { ThemeProvider } from './contexts/ThemeContext';
import Sidebar from './components/Sidebar';
import Clientes from './pages/Clientes';
import Inventario from './pages/Inventario';
import { ViewType } from './types';

function App() {
  const [activeView, setActiveView] = useState<ViewType>('inventario');

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          
          <div className="flex h-screen bg-background">
            {/* Sidebar */}
            <Sidebar activeView={activeView} onViewChange={setActiveView} />

            {/* Main Content */}
            <main className="flex-1 ml-56 overflow-auto">
              <div className="p-8">
                {activeView === 'clientes' && <Clientes />}
                {activeView === 'inventario' && <Inventario />}
              </div>
            </main>
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
