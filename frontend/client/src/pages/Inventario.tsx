/**
 * Página de Inventario
 * Design: Industrial Minimalist
 * - Tabla principal con columnas: código, descripción, cliente, estado, peso, unidad, material
 * - Filtros reactivos: estado, cliente, búsqueda textual
 * - Exportación a PDF respetando filtros
 * - Manejo de estados de carga y error
 */

import { useState, useEffect, useCallback } from 'react';
import { InventarioDTO, ClienteDTO } from '@/types';
import Header from '@/components/Header';
import LoadingState from '@/components/LoadingState';
import ErrorState from '@/components/ErrorState';
import { fetchInventario, fetchClientes, exportInventarioPDF } from '@/services/api';
import { Download, Search } from 'lucide-react';

export default function Inventario() {
  const [inventario, setInventario] = useState<InventarioDTO[] | null>(null);
  const [clientes, setClientes] = useState<ClienteDTO[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  const [searchInput, setSearchInput] = useState('');
  const [clienteFilter, setClienteFilter] = useState('');
  const [estadoFilter, setEstadoFilter] = useState('');
  const [exportando, setExportando] = useState(false);

  // Obtener estados únicos del inventario
  const estados = inventario
    ? Array.from(new Set(inventario.map(item => item.estadoNombre))).sort()
    : [];

  // Cargar datos iniciales
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [inventarioData, clientesData] = await Promise.all([
          fetchInventario(),
          fetchClientes(),
        ]);
        setInventario(inventarioData);
        setClientes(clientesData);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Error desconocido'));
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Aplicar filtros
  const handleFiltroChange = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchInventario(estadoFilter, clienteFilter, searchInput);
      setInventario(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Error al filtrar'));
    } finally {
      setLoading(false);
    }
  }, [estadoFilter, clienteFilter, searchInput]);

  // Aplicar filtros cuando cambien (con debounce)
  useEffect(() => {
    const timer = setTimeout(handleFiltroChange, 300);
    return () => clearTimeout(timer);
  }, [estadoFilter, clienteFilter, searchInput, handleFiltroChange]);

  // Exportar a PDF
  const handleExportarPDF = async () => {
    try {
      setExportando(true);
      const blob = await exportInventarioPDF(estadoFilter, clienteFilter, searchInput);
      
      const urlBlob = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = urlBlob;
      link.download = `inventario-${new Date().toISOString().split('T')[0]}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(urlBlob);
    } catch (err) {
      console.error('Error al exportar PDF:', err);
      alert('Error al exportar PDF. Por favor, intente nuevamente.');
    } finally {
      setExportando(false);
    }
  };

  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} onRetry={() => window.location.reload()} />;

  return (
    <div className="space-y-6">
      <Header
        title="Inventario"
        description="Visualización y filtrado de piezas en inventario"
      />

      {/* Filtros */}
      <div className="bg-card rounded-lg border border-border p-6 space-y-4">
        <h3 className="text-sm font-semibold text-foreground">Filtros</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Búsqueda por código o descripción */}
          <div className="flex items-center gap-2 bg-input rounded px-3 py-2">
            <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            <input
              type="text"
              placeholder="Buscar código o descripción..."
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>

          {/* Filtro por estado */}
          <select
            value={estadoFilter}
            onChange={e => setEstadoFilter(e.target.value)}
            className="bg-input rounded px-3 py-2 text-sm outline-none border border-border hover:border-primary focus:border-primary transition-colors"
          >
            <option value="">Todos los estados</option>
            {estados && estados.map(estado => (
              <option key={estado} value={estado}>
                {estado}
              </option>
            ))}
          </select>

          {/* Filtro por cliente */}
          <select
            value={clienteFilter}
            onChange={e => setClienteFilter(e.target.value)}
            className="bg-input rounded px-3 py-2 text-sm outline-none border border-border hover:border-primary focus:border-primary transition-colors"
          >
            <option value="">Todos los clientes</option>
            {clientes && clientes.map(cliente => (
              <option key={cliente.id} value={cliente.nombreInformal}>
                {cliente.nombreInformal}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Botón Exportar */}
      <div className="flex justify-end">
        <button
          onClick={handleExportarPDF}
          disabled={exportando || !inventario || inventario.length === 0}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded font-medium text-sm hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
        >
          <Download className="w-4 h-4" />
          {exportando ? 'Exportando...' : 'Exportar PDF'}
        </button>
      </div>

      {/* Tabla de Inventario */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Código</th>
                <th>Descripción</th>
                <th>Cliente</th>
                <th>Estado</th>
                <th>Peso Final (kg)</th>
                <th>Material</th>
                <th>Tipo Pieza</th>
                <th>Fecha Registro</th>
              </tr>
            </thead>
            <tbody>
              {inventario && inventario.length > 0 ? (
                inventario.map(item => (
                  <tr key={item.idPieza}>
                    <td className="font-mono font-semibold text-primary">
                      {item.codigoBase}
                    </td>
                    <td className="font-medium">{item.nombrePieza}</td>
                    <td>{item.cliente}</td>
                    <td>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        item.estadoNombre === 'Disponible' 
                          ? 'bg-green-100 text-green-800'
                          : item.estadoNombre === 'En Proceso'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {item.estadoNombre}
                      </span>
                    </td>
                    <td className="text-right font-mono">
                      {parseFloat(item.pesoFinal.toString()).toFixed(2)}
                    </td>
                    <td>{item.material}</td>
                    <td>{item.tipoPieza}</td>
                    <td className="text-xs text-muted-foreground">
                      {new Date(item.fechaRegistro).toLocaleDateString('es-PE')}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="text-center py-8 text-muted-foreground">
                    No hay piezas que coincidan con los filtros
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Resumen */}
      {inventario && inventario.length > 0 && (
        <div className="text-xs text-muted-foreground space-y-1">
          <p>
            Total de piezas: <span className="font-semibold">{inventario.length}</span>
          </p>
          <p>
            Peso total: <span className="font-semibold font-mono">
              {inventario.reduce((sum, item) => sum + parseFloat(item.pesoFinal.toString()), 0).toFixed(2)} kg
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
