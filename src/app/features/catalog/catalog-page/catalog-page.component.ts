import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CatalogSearchResponse, SORT_OPTIONS, SortOption } from '../../../core/models/catalog.model';
import { CatalogService } from '../../../core/services/catalog.service';
import { ProductCardComponent } from '../product-card/product-card.component';

/** EP01 (consultare catalogo) ed EP02 (cercare prodotti): stessa risorsa, stessa pagina. */
@Component({
  selector: 'app-catalog-page',
  standalone: true,
  imports: [FormsModule, ProductCardComponent],
  templateUrl: './catalog-page.component.html',
  styleUrl: './catalog-page.component.scss',
})
export class CatalogPageComponent implements OnInit {
  private readonly catalogService = inject(CatalogService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly sortOptions = SORT_OPTIONS;
  readonly result = signal<CatalogSearchResponse | null>(null);
  readonly loading = signal(true);
  readonly unavailable = signal(false);

  qInput = '';
  categoryInput = '';
  sortInput: SortOption = 'novita';

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.qInput = params.get('q') ?? '';
      this.categoryInput = params.get('category') ?? '';
      this.sortInput = (params.get('sort') as SortOption) || 'novita';
      const page = Number(params.get('page') ?? '1') || 1;
      this.load(page);
    });
  }

  submitSearch(): void {
    this.navigate({ q: this.qInput.trim() || null, page: null });
  }

  onCategoryChange(): void {
    this.navigate({ category: this.categoryInput || null, page: null });
  }

  onSortChange(): void {
    this.navigate({ sort: this.sortInput, page: null });
  }

  clearQ(): void {
    this.qInput = '';
    this.navigate({ q: null, page: null });
  }

  clearCategory(): void {
    this.categoryInput = '';
    this.navigate({ category: null, page: null });
  }

  clearAll(): void {
    this.qInput = '';
    this.categoryInput = '';
    this.sortInput = 'novita';
    this.navigate({ q: null, category: null, sort: null, page: null });
  }

  goToPage(page: number): void {
    this.navigate({ page });
  }

  pageNumbers(): number[] {
    const totalPages = this.result()?.totalPages ?? 1;
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  private load(page: number): void {
    this.loading.set(true);
    this.unavailable.set(false);
    this.catalogService
      .search({
        q: this.qInput.trim() || undefined,
        category: this.categoryInput || undefined,
        sort: this.sortInput,
        page,
      })
      .subscribe({
        next: (res) => {
          this.result.set(res);
          this.loading.set(false);
        },
        error: (err: HttpErrorResponse) => {
          this.loading.set(false);
          this.result.set(null);
          this.unavailable.set(err.status === 503);
        },
      });
  }

  private navigate(queryParams: Record<string, string | number | null>): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge',
    });
  }
}
