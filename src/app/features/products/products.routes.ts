import { Routes } from '@angular/router';
import { ProductListPage } from './pages/product-list/product-list.page';
import { ProductFormPage } from './pages/product-form/product-form.page';

export const productsRoutes: Routes = [
  { path: 'list', component: ProductListPage },
  { path: 'new', component: ProductFormPage },
  { path: '', redirectTo: 'list', pathMatch: 'full' }
];
