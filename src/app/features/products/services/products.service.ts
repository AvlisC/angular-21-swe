import { inject, Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { delay, Observable, of } from 'rxjs';
import { PRODUCTS_MOCK } from '../mocks/products.mocks';
import { API_CONFIG } from '../../../core/http/api.config';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private http: HttpClient = inject(HttpClient);
  private apiUrl = `${API_CONFIG.baseUrl}products`;
  private useMock = environment.useMock;

  getAll(): Observable<Product[]> {
    if (this.useMock) {
      return of(PRODUCTS_MOCK).pipe(delay(500));
    }
    return this.http.get<Product[]>(this.apiUrl);
  }

  getById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/product/${id}`);
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  update(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product);
  }

  delete(id: number) {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
