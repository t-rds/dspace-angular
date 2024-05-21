import { Component } from '@angular/core';
import { PrivacyComponent as BaseComponent } from '@app/info/privacy/privacy.component';
import { PrivacyContentComponent } from '@app/info/privacy/privacy-content/privacy-content.component';

@Component({
  selector: 'ds-themed-privacy',
  // styleUrls: ['./privacy.component.scss'],
  styleUrls: ['../../../../../app/info/privacy/privacy.component.scss'],
  templateUrl: './privacy.component.html',
  standalone: true,
  imports: [PrivacyContentComponent],
})

/**
 * Component displaying the Privacy Statement
 */
export class PrivacyComponent extends BaseComponent {}
