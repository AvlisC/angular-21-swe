import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

type TitleLevel = number;

@Component({
  selector: 'app-title',
  templateUrl: './app-title.html',
  styleUrl: './app-title.scss',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppTitle {
  @Input({ required: true }) level!: TitleLevel;
  @Input({ required: true }) title!: string;
}
