/**
 * LoadingState - Estado de carga
 * Design: Industrial Minimalist
 */

import { Loader2 } from 'lucide-react';

export default function LoadingState() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
        <p className="text-sm text-muted-foreground">Cargando datos...</p>
      </div>
    </div>
  );
}
