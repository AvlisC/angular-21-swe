import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PRODUCTS_ROUTES } from '../../../core/constants/routes';
import { AppButton } from '../app-button/app-button';
import { AppTitle } from '../app-title/app-title';

@Component({
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  imports: [AppButton, AppTitle]
})
export class NotFoundComponent {
  private router = inject(Router);

  goToLists() {
    this.router.navigate([PRODUCTS_ROUTES.listProducts]);
  }
}
