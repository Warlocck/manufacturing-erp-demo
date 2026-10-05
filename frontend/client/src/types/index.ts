/**
 * Tipos compartidos para Manufacturing ERP Demo
 * Design: Industrial Minimalist
 */

export interface ClienteDTO {
  id: number;
  nombreInformal: string;
  razonSocial: string;
  ruc: string;
  clasificacion: string;
  departamento: string;
}

export interface InventarioDTO {
  idPieza: number;
  codigoBase: string;
  nombrePieza: string;
  cliente: string;
  tipoPieza: string;
  material: string;
  pesoFinal: number;
  estadoNombre: string;
  fechaRegistro: string;
}

export interface FiltrosInventario {
  estado?: string;
  cliente?: string;
  query?: string;
}

export type ViewType = 'clientes' | 'inventario';
