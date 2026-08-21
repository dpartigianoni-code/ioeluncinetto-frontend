import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { CatalogSearchResponse, ProductDetail } from '../models/catalog.model';

export interface CatalogSearchQuery {
  q?: string;
  category?: string;
  sort?: string;
  page?: number;
  size?: number;
}

/** Un servizio per modulo server, corrispondenza uno a uno con gli endpoint. */
@Injectable({ providedIn: 'root' })
export class CatalogService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiBaseUrl}/api/v1/catalog`;

  search(query: CatalogSearchQuery): Observable<CatalogSearchResponse> {
    let params = new HttpParams();
    if (query.q) {
      params = params.set('q', query.q);
    }
    if (query.category) {
      params = params.set('category', query.category);
    }
    if (query.sort) {
      params = params.set('sort', query.sort);
    }
    if (query.page) {
      params = params.set('page', query.page);
    }
    if (query.size) {
      params = params.set('size', query.size);
    }
    return this.http.get<CatalogSearchResponse>(`${this.baseUrl}/products`, { params });
  }

  getBySku(sku: string): Observable<ProductDetail> {
    return this.http.get<ProductDetail>(`${this.baseUrl}/products/${encodeURIComponent(sku)}`);
  }
}
