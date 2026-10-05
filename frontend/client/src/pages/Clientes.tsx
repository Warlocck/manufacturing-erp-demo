/**
 * Página de Clientes
 * Design: Industrial Minimalist
 * - Tabla de solo lectura con columnas: nombre, RUC, clasificación, contacto
 * - Datos desde GET http://localhost:8080/api/clientes
 * - Manejo de estados de carga y error
 */

import { useState, useEffect } from 'react';
import { ClienteDTO } from '@/types';
import Header from '@/components/Header';
import LoadingState from '@/components/LoadingState';
import ErrorState from '@/components/ErrorState';
import { fetchClientes } from '@/services/api';

export default function Clientes() {
  const [clientes, setClientes] = useState<ClienteDTO[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchClientes()
      .then(data => {
        setClientes(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err instanceof Error ? err : new Error('Error desconocido'));
        setLoading(false);
      });
  }, []);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} onRetry={() => window.location.reload()} />;

  return (
    <div className="space-y-6">
      <Header
        title="Clientes"
        description="Listado de clientes registrados en el sistema"
      />

      {/* Tabla de Clientes */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Nombre Informal</th>
                <th>Razón Social</th>
                <th>RUC</th>
                <th>Clasificación</th>
                <th>Departamento</th>
              </tr>
            </thead>
            <tbody>
              {clientes && clientes.length > 0 ? (
                (clientes as ClienteDTO[]).map(cliente => (
                  <tr key={cliente.id}>
                    <td className="font-medium text-primary">
                      {cliente.nombreInformal}
                    </td>
                    <td>{cliente.razonSocial}</td>
                    <td className="font-mono text-sm">{cliente.ruc}</td>
                    <td>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-foreground">
                        {cliente.clasificacion}
                      </span>
                    </td>
                    <td>{cliente.departamento}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-muted-foreground">
                    No hay clientes registrados
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Resumen */}
      {clientes && clientes.length > 0 && (
        <div className="text-xs text-muted-foreground">
          Total de clientes: <span className="font-semibold">{clientes.length}</span>
        </div>
      )}
    </div>
  );
}
