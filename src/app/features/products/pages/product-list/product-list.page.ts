import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  signal
} from '@angular/core';
import { ProductsStore } from '../../products.store';
import { ProductsService } from '../../services/products.service';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Product } from '../../models/product.model';
import { PRODUCTS_ROUTES } from '../../../../core/constants/routes';
import { AddButtonComponent } from '../../../../shared/icons/app-add-button/add-button.component';
import { AppSpinner } from '../../../../shared/ui/app-spinner/app-spinner';
import { AppTitle } from '../../../../shared/ui/app-title/app-title';
import { AppButton } from '../../../../shared/ui/app-button/app-button';

@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: './product-list.page.html',
  styleUrl: './product-list.page.scss',
  imports: [
    CurrencyPipe,
    CommonModule,
    DatePipe,
    AddButtonComponent,
    AppSpinner,
    AppTitle,
    AppButton
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListPage implements OnInit {
  private service = inject(ProductsService);
  readonly store = inject(ProductsStore);
  private router = inject(Router);

  readonly showDeleteModal = false;
  readonly isLoading = this.store.loading;
  readonly createdAt = new Date();

  searchTerm = signal('');
  sortBy = signal<'name' | 'price'>('name');

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.store.setLoading(true);

    this.service.getAll().subscribe({
      next: products => this.store.setProducts(products),
      complete: () => this.store.setLoading(false)
    });
  }

  filteredProducts = computed(() => {
    const products = this.store.products();

    return [...products].sort((a, b) =>
      this.sortBy() === 'price'
        ? a.price - b.price
        : a.name.localeCompare(b.name)
    );
  });

  calculateTotal() {
    return this.filteredProducts().reduce((sum, p) => sum + p.price, 0);
  }

  getStockClass(stock: number) {
    if (stock === 0) return 'out';
    if (stock < 5) return 'low';
    return 'ok';
  }

  confirmDelete() {
    console.log('excluindo produto de id');
  }

  cancelDelete() {
    console.log('cancelando deleção produto de id');
  }

  deleteProduct(id: number) {
    console.log('cancelando deleção produto de id:', id);
  }

  editProduct(product: Product) {
    this.store.setEditMode(true);
    this.store.setProductToEdit(product);
    this.router.navigate([PRODUCTS_ROUTES.newProduct]);
  }

  goToCreate() {
    this.store.setEditMode(false);
    this.router.navigate([PRODUCTS_ROUTES.newProduct]);
  }
}
