import {
  AsyncPipe,
  NgClass,
  NgIf,
  NgTemplateOutlet,
} from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FileDownloadLinkComponent as BaseComponent } from '@app/shared/file-download-link/file-download-link.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'ds-themed-file-download-link',
  templateUrl: '../../../../../app/shared/file-download-link/file-download-link.component.html',
  styleUrls: ['../../../../../app/shared/file-download-link/file-download-link.component.scss'],
  standalone: true,
  imports: [
    RouterLink,
    NgClass,
    NgIf,
    NgTemplateOutlet,
    AsyncPipe,
    TranslateModule,
  ],
})
export class FileDownloadLinkComponent extends BaseComponent {
  isBlank = true;
}
