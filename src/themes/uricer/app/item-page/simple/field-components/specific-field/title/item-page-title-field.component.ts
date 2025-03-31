import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ItemPageTitleFieldComponent as BaseComponent } from '@app/item-page/simple/field-components/specific-field/title/item-page-title-field.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'ds-themed-item-page-title-field',
  templateUrl: './item-page-title-field.component.html',
  styleUrls: ['./item-page-title-field.component.scss'],
  standalone: true,
  imports: [NgIf, TranslateModule],
})
export class ItemPageTitleFieldComponent extends BaseComponent {
}
