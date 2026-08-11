// Rispecchia i DTO di it.ioeluncinetto.psrv.catalog.dto (backend P-SRV).

export interface CategoryRef {
  code: string;
  name: string;
}

export type AvailabilityStatus = 'DISPONIBILE' | 'ULTIMI_PEZZI' | 'ESAURITO';

export interface ProductSummary {
  sku: string;
  name: string;
  slug: string;
  category: CategoryRef;
  priceCents: number;
  currency: string;
  imageUrl: string;
  yarn: string;
  availability: AvailabilityStatus;
  availableQty: number;
  purchasable: boolean;
}

export interface ProductDetail {
  sku: string;
  name: string;
  slug: string;
  description: string;
  category: CategoryRef;
  priceCents: number;
  currency: string;
  imageUrl: string;
  yarn: string;
  sizes: string;
  workHours: string;
  availableQty: number;
  purchasable: boolean;
}

export interface CategoryFacet {
  code: string;
  name: string;
  count: number;
}

export interface Facets {
  categories: CategoryFacet[];
}

export interface AppliedCriteria {
  q: string | null;
  category: string | null;
  sort: string;
}

export interface CatalogSearchResponse {
  items: ProductSummary[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  facets: Facets;
  appliedCriteria: AppliedCriteria;
  message: string | null;
}

export type SortOption = 'novita' | 'nome' | 'prezzo_asc' | 'prezzo_desc';

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'novita', label: 'Novità' },
  { value: 'nome', label: 'Nome A-Z' },
  { value: 'prezzo_asc', label: 'Prezzo crescente' },
  { value: 'prezzo_desc', label: 'Prezzo decrescente' },
];
