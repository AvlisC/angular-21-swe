import { inject, Injectable, signal } from '@angular/core';
import { Product } from './models/product.model';
import { ProductsService } from './services/products.service';

@Injectable({ providedIn: 'root' })
export class ProductsStore {
  private service = inject(ProductsService);

  products = signal<Product[]>([]);
  product = signal<Product>({ name: '', description: '', price: 0 });
  loading = signal(false);
  isEditMode = signal(false);

  load() {
    this.service.getAll().subscribe(products => {
      this.products.set(products);
    });
  }

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
