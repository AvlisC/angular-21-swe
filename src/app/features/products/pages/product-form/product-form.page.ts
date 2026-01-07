import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { Router } from '@angular/router';
import { PRODUCTS_ROUTES } from '../../../../core/constants/routes';
import { ProductsStore } from '../../products.store';
import { toSignal } from '@angular/core/rxjs-interop';
import { AppSpinner, AppTitle, AppButton } from '../../../../shared/ui';

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

  productForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
    description: ['', [Validators.maxLength(500)]],
    price: [0, [Validators.required, Validators.min(0)]]
  });

  descriptionLength = toSignal(
    this.productForm.controls.description.valueChanges,
    { initialValue: '' }
  );

  ngOnInit() {
    console.log(this.descriptionLength());
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
  }

  submit() {
    if (this.isEditMode()) {
      this.service
        .update(this.store.product().id!, this.productForm.getRawValue())
        .subscribe({
          next: () => this.store.load(),
          complete: () => this.goBack()
        });
      return;
    }

    this.service.create(this.productForm.getRawValue()).subscribe({
      next: () => this.store.load(),
      complete: () => this.goBack()
    });
  }

  goBack() {
    this.router.navigate([PRODUCTS_ROUTES.listProducts]);
  }
}
