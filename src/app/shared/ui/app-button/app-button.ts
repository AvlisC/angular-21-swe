import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

type BtnTypes =
  | 'empty-btn'
  | 'add-btn'
  | 'action-btn edit'
  | 'action-btn delete'
  | 'back-btn';
type BtnIcons =
  | 'plus'
  | 'edit'
  | 'delete'
  | 'save'
  | 'cancel'
  | 'arrow-right'
  | 'arrow-left';

@Component({
  selector: 'app-button',
  imports: [CommonModule],
  templateUrl: './app-button.html',
  styleUrl: './app-button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppButton {
  @Input() label = '';
  @Input() disabled? = false;
  @Input() icon?: BtnIcons = 'plus';
  @Input() type: BtnTypes = 'empty-btn';
}
