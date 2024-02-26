import { Component } from '@angular/core';
import {
  FileDownloadLinkComponent as BaseComponent
} from '@app/shared/file-download-link/file-download-link.component';

@Component({
  selector: 'ds-file-download-link',
  templateUrl: '../../../../../app/shared/file-download-link/file-download-link.component.html',
  styleUrls: ['../../../../../app/shared/file-download-link/file-download-link.component.scss'],
})
export class FileDownloadLinkComponent extends BaseComponent {
  isBlank = true;
}
