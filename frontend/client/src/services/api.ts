```typescript
/**
 * Servicio de API
 * Proporciona datos mock para desarrollo.
 * En producción, consume el backend REST configurado mediante VITE_API_BASE_URL.
 */

import { ClienteDTO, InventarioDTO } from '@/types';

// Datos mock de clientes
// Todos los datos incluidos en este archivo son ficticios.
const MOCK_CLIENTES: ClienteDTO[] = [
  {
    id: 1,
    nombreInformal: 'INDUSTRIAS ANDINAS',
    razonSocial: 'INDUSTRIAS ANDINAS S.A.C.',
    ruc: '00000000001',
    clasificacion: 'Manufactura',
    departamento: 'Arequipa',
  },
  {
    id: 2,
    nombreInformal: 'MINERA DEL SUR',
    razonSocial: 'MINERA DEL SUR S.A.C.',
    ruc: '00000000002',
    clasificacion: 'Industria',
    departamento: 'Cusco',
  },
  {
    id: 3,
    nombreInformal: 'PROYECTOS ALTIPLANO',
    razonSocial: 'PROYECTOS ALTIPLANO S.A.C.',
    ruc: '00000000003',
    clasificacion: 'Manufactura',
    departamento: 'Puno',
  },
  {
    id: 4,
    nombreInformal: 'OPERACIONES DEL PACÍFICO',
    razonSocial: 'OPERACIONES DEL PACÍFICO S.A.C.',
    ruc: '00000000004',
    clasificacion: 'Industria',
    departamento: 'Moquegua',
  },
];

// Datos mock de inventario
const MOCK_INVENTARIO: InventarioDTO[] = [
  {
    idPieza: 1,
    codigoBase: 'PZ-001-2026',
    nombrePieza: 'Cilindro Hidráulico 50mm',
    cliente: 'INDUSTRIAS ANDINAS',
    tipoPieza: 'Cilindro',
    material: 'Acero Inoxidable 316',
    pesoFinal: 12.5,
    estadoNombre: 'Disponible',
    fechaRegistro: '2026-01-15T10:30:00',
  },
  {
    idPieza: 2,
    codigoBase: 'PZ-002-2026',
    nombrePieza: 'Brida de Conexión 75mm',
    cliente: 'MINERA DEL SUR',
    tipoPieza: 'Brida',
    material: 'Acero al Carbono',
    pesoFinal: 8.3,
    estadoNombre: 'En Proceso',
    fechaRegistro: '2026-01-14T14:20:00',
  },
  {
    idPieza: 3,
    codigoBase: 'PZ-003-2026',
    nombrePieza: 'Válvula de Alivio 40mm',
    cliente: 'PROYECTOS ALTIPLANO',
    tipoPieza: 'Válvula',
    material: 'Bronce',
    pesoFinal: 5.2,
    estadoNombre: 'Disponible',
    fechaRegistro: '2026-01-13T09:15:00',
  },
  {
    idPieza: 4,
    codigoBase: 'PZ-004-2026',
    nombrePieza: 'Eje de Transmisión 60mm',
    cliente: 'OPERACIONES DEL PACÍFICO',
    tipoPieza: 'Eje',
    material: 'Acero Aleado',
    pesoFinal: 15.7,
    estadoNombre: 'En Proceso',
    fechaRegistro: '2026-01-12T11:45:00',
  },
  {
    idPieza: 5,
    codigoBase: 'PZ-005-2026',
    nombrePieza: 'Placa de Base 100x100mm',
    cliente: 'INDUSTRIAS ANDINAS',
    tipoPieza: 'Placa',
    material: 'Acero Inoxidable 304',
    pesoFinal: 22.1,
    estadoNombre: 'Disponible',
    fechaRegistro: '2026-01-11T16:30:00',
  },
  {
    idPieza: 6,
    codigoBase: 'PZ-006-2026',
    nombrePieza: 'Tubo de Acero 50x3mm',
    cliente: 'MINERA DEL SUR',
    tipoPieza: 'Tubo',
    material: 'Acero al Carbono',
    pesoFinal: 18.9,
    estadoNombre: 'Disponible',
    fechaRegistro: '2026-01-10T13:20:00',
  },
  {
    idPieza: 7,
    codigoBase: 'PZ-007-2026',
    nombrePieza: 'Rodamiento 6205',
    cliente: 'PROYECTOS ALTIPLANO',
    tipoPieza: 'Rodamiento',
    material: 'Acero',
    pesoFinal: 0.8,
    estadoNombre: 'En Proceso',
    fechaRegistro: '2026-01-09T10:00:00',
  },
  {
    idPieza: 8,
    codigoBase: 'PZ-008-2026',
    nombrePieza: 'Perno M24x150',
    cliente: 'OPERACIONES DEL PACÍFICO',
    tipoPieza: 'Perno',
    material: 'Acero Galvanizado',
    pesoFinal: 2.4,
    estadoNombre: 'Disponible',
    fechaRegistro: '2026-01-08T15:45:00',
  },
  {
    idPieza: 9,
    codigoBase: 'PZ-009-2026',
    nombrePieza: 'Junta de Goma 80mm',
    cliente: 'INDUSTRIAS ANDINAS',
    tipoPieza: 'Junta',
    material: 'Caucho NBR',
    pesoFinal: 0.3,
    estadoNombre: 'Disponible',
    fechaRegistro: '2026-01-07T12:10:00',
  },
  {
    idPieza: 10,
    codigoBase: 'PZ-010-2026',
    nombrePieza: 'Engranaje Helicoidal M3',
    cliente: 'MINERA DEL SUR',
    tipoPieza: 'Engranaje',
    material: 'Acero Templado',
    pesoFinal: 7.6,
    estadoNombre: 'En Proceso',
    fechaRegistro: '2026-01-06T09:30:00',
  },
];

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080/api';

const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA !== 'false';

/**
 * Obtener lista de clientes
 */
export async function fetchClientes(): Promise<ClienteDTO[]> {
  if (USE_MOCK_DATA) {
    return new Promise(resolve =>
      setTimeout(() => resolve(MOCK_CLIENTES), 500)
    );
  }

  const response = await fetch(`${API_BASE_URL}/clientes`);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Obtener inventario con filtros opcionales
 */
export async function fetchInventario(
  estado?: string,
  cliente?: string,
  query?: string
): Promise<InventarioDTO[]> {
  if (USE_MOCK_DATA) {
    return new Promise(resolve => {
      setTimeout(() => {
        let filtered = [...MOCK_INVENTARIO];

        if (estado) {
          filtered = filtered.filter(
            item => item.estadoNombre === estado
          );
        }

        if (cliente) {
          filtered = filtered.filter(item => item.cliente === cliente);
        }

        if (query) {
          const q = query.toLowerCase();

          filtered = filtered.filter(
            item =>
              item.codigoBase.toLowerCase().includes(q) ||
              item.nombrePieza.toLowerCase().includes(q)
          );
        }

        resolve(filtered);
      }, 500);
    });
  }

  const params = new URLSearchParams();

  if (estado) params.append('estado', estado);
  if (cliente) params.append('cliente', cliente);
  if (query) params.append('query', query);

  const queryString = params.toString();

  const url = queryString
    ? `${API_BASE_URL}/inventario?${queryString}`
    : `${API_BASE_URL}/inventario`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Exportar inventario a PDF
 */
export async function exportInventarioPDF(
  estado?: string,
  cliente?: string,
  query?: string
): Promise<Blob> {
  if (USE_MOCK_DATA) {
    return new Promise(resolve => {
      setTimeout(() => {
        const text = 'Reporte de Inventario - Manufacturing ERP Demo';
        const blob = new Blob([text], { type: 'application/pdf' });

        resolve(blob);
      }, 1000);
    });
  }

  const params = new URLSearchParams();

  if (estado) params.append('estado', estado);
  if (cliente) params.append('cliente', cliente);
  if (query) params.append('query', query);

  const queryString = params.toString();

  const url = queryString
    ? `${API_BASE_URL}/inventario/exportar-pdf?${queryString}`
    : `${API_BASE_URL}/inventario/exportar-pdf`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  return response.blob();
}
```
