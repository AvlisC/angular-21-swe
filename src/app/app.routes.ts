import { Routes } from '@angular/router';
import { NotFoundComponent } from './shared/ui/app-not-found/not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  {
    path: 'products',
    loadChildren: () =>
      import('./features/products/products.routes').then(m => m.productsRoutes)
  },
  { path: '**', component: NotFoundComponent }
];
