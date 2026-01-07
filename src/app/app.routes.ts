import { Routes } from '@angular/router';
import { NotFoundComponent } from './shared/ui';

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  {
    path: 'products',
    loadChildren: () =>
      import('./features/products/products.routes').then(m => m.productsRoutes)
  },
  { path: '**', component: NotFoundComponent }
];
