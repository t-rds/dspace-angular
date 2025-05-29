import {
  AsyncPipe,
  NgClass,
  NgTemplateOutlet,
} from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { FileDownloadLinkComponent as BaseComponent } from '@/app/shared/file-download-link/file-download-link.component';
import { ThemedAccessStatusBadgeComponent } from '@/app/shared/object-collection/shared/badges/access-status-badge/themed-access-status-badge.component';

@Component({
  selector: 'ds-themed-file-download-link',
  templateUrl: '../../../../../app/shared/file-download-link/file-download-link.component.html',
  styleUrls: ['../../../../../app/shared/file-download-link/file-download-link.component.scss'],
  standalone: true,
  imports: [
    AsyncPipe,
    NgClass,
    NgTemplateOutlet,
    RouterLink,
    ThemedAccessStatusBadgeComponent,
    TranslateModule,
  ],
})
export class FileDownloadLinkComponent extends BaseComponent {
  isBlank = true;
}
