/**
 * ErrorState - Estado de error
 * Design: Industrial Minimalist
 */

import { AlertCircle } from 'lucide-react';

interface ErrorStateProps {
  error: Error | null;
  onRetry?: () => void;
}

export default function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="flex flex-col items-center gap-3 text-center">
        <AlertCircle className="w-8 h-8 text-destructive" />
        <div>
          <p className="text-sm font-medium text-foreground">
            Error al cargar datos
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {error?.message || 'Ocurrió un error inesperado'}
          </p>
        </div>
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-2 px-4 py-2 text-xs font-medium bg-primary text-primary-foreground rounded hover:opacity-90 transition-opacity"
          >
            Reintentar
          </button>
        )}
      </div>
    </div>
  );
}
