import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { Router } from '@angular/router';
import { PRODUCTS_ROUTES } from '../../../../core/constants/routes';
import { ProductsStore } from '../../products.store';
import { AppButton } from '../../../../shared/ui/app-button/app-button';
import { AppSpinner } from '../../../../shared/ui/app-spinner/app-spinner';
import { AppTitle } from '../../../../shared/ui/app-title/app-title';

@Component({
  selector: 'app-product-form',
  standalone: true,
  templateUrl: './product-form.page.html',
  styleUrl: './product-form.page.scss',
  imports: [ReactiveFormsModule, AppSpinner, AppTitle, AppButton],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductFormPage implements OnInit {
  private service = inject(ProductsService);
  private fb = inject(FormBuilder);
  readonly store = inject(ProductsStore);
  private router = inject(Router);

  readonly isLoading = this.store.loading;
  readonly isEditMode = this.store.isEditMode;

  form = this.fb.nonNullable.group({
    name: '',
    description: '',
    price: 0
  });

  productForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
    description: ['', [Validators.maxLength(500)]],
    price: [0, [Validators.required, Validators.min(0)]]
  });

  descriptionLength = computed(
    () => this.productForm.controls.description.value.length
  );

  ngOnInit() {
    if (this.isEditMode()) {
      const product = this.store.product;
      this.productForm.patchValue(product());
    }
  }

  isFieldInvalid(field: keyof typeof this.productForm.controls) {
    const control = this.productForm.controls[field];
    return control.invalid && control.touched;
  }

  onSubmit() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    console.log(this.productForm.getRawValue());
    this.router.navigate([PRODUCTS_ROUTES.listProducts]);
  }

  submit() {
    if (this.form.invalid) return;

    this.service.create(this.form.getRawValue()).subscribe();
  }

  goBack() {
    this.router.navigate([PRODUCTS_ROUTES.listProducts]);
  }
}
