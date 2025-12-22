import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-spinner',
  imports: [CommonModule],
  templateUrl: './app-spinner.html',
  styleUrl: './app-spinner.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppSpinner {}
