import { Injectable, signal } from '@angular/core';
import { Product } from './models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductsStore {
  products = signal<Product[]>([]);
  product = signal<Product>({ name: '', description: '', price: 0 });
  loading = signal(false);
  isEditMode = signal(false);

  setProducts(products: Product[]) {
    this.products.set(products);
  }

  setProductToEdit(product: Product) {
    this.product.set(product);
  }

  setEditMode(isEditMode: boolean) {
    this.isEditMode.set(isEditMode);
  }

  setLoading(value: boolean) {
    this.loading.set(value);
  }
}
