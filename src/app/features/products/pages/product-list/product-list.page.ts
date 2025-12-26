import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit
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

  readonly isLoading = this.store.loading;
  readonly createdAt = new Date();

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.store.setLoading(true);
    this.store.load();
    this.store.setLoading(false);
  }

  filteredProducts = computed(() => {
    const products = this.store.products();

    return [...products];
  });

  confirmDelete() {
    console.log('excluindo produto de id');
  }

  cancelDelete() {
    console.log('cancelando deleção produto de id');
  }

  deleteProduct(id: number) {
    this.store.setLoading(true);

    this.service.delete(id).subscribe({
      next: () => this.store.load(),
      complete: () => this.store.setLoading(false)
    });
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
