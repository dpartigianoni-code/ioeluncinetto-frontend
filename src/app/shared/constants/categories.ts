import { CategoryRef } from '../../core/models/catalog.model';

/**
 * Tassonomia di categoria: stabile lato dominio, usata sia dal menu di
 * navigazione globale sia come fallback quando il catalogo non ha ancora
 * restituito le facet (es. prima risposta in caricamento). I codici devono
 * coincidere con quelli restituiti da P-SRV in CategoryRef.code.
 */
export const CATEGORIES: CategoryRef[] = [
  { code: 'ABITI', name: 'Abiti' },
  { code: 'TOP', name: 'Top e coprispalle' },
  { code: 'BORSE', name: 'Borse' },
  { code: 'ACCESSORI', name: 'Accessori' },
];
