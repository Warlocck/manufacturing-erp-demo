/**
 * Sidebar - Navegación principal
 * Design: Industrial Minimalist
 * - Sidebar fijo izquierdo (220px)
 * - Línea de acento azul acero en navegación activa
 * - Iconografía técnica clara
 */

import { Users, Package } from 'lucide-react';
import { ViewType } from '@/types';

interface SidebarProps {
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
}

export default function Sidebar({ activeView, onViewChange }: SidebarProps) {
  const navItems = [
    {
      id: 'clientes',
      label: 'Clientes',
      icon: Users,
      view: 'clientes' as ViewType,
    },
    {
      id: 'inventario',
      label: 'Inventario',
      icon: Package,
      view: 'inventario' as ViewType,
    },
  ];

  return (
    <aside className="w-56 bg-sidebar border-r border-sidebar-border flex flex-col h-screen fixed left-0 top-0">
      {/* Header */}
      <div className="px-6 py-8 border-b border-sidebar-border">
        <h1 className="text-lg font-bold text-sidebar-foreground">
          MANUFACTURING ERP
        </h1>
        <p className="text-xs text-sidebar-foreground/60 mt-1">
          ERP Inventario
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-2">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeView === item.view;
          
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.view)}
              className={`sidebar-nav-item w-full text-left ${
                isActive ? 'active' : ''
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-sidebar-border text-xs text-sidebar-foreground/50">
        <p>v1.0.0</p>
      </div>
    </aside>
  );
}
