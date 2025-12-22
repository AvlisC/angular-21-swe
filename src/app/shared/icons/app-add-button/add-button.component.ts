import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-add-button',
  templateUrl: './add-button.component.html',
  standalone: true
})
export class AddButtonComponent {
  @Input() size = 28;
  @Input() color = 'var(--color-primary';
}
