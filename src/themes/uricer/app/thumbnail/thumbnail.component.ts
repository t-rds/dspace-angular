import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

import { ThemedLoadingComponent } from '@/app/shared/loading/themed-loading.component';
import { SafeUrlPipe } from '@/app/shared/utils/safe-url-pipe';
import { ThumbnailComponent as BaseComponent } from '@/app/thumbnail/thumbnail.component';

@Component({
  selector: 'ds-themed-thumbnail',
  styleUrls: [
    '../../../../app/thumbnail/thumbnail.component.scss',
    './thumbnail.component.scss',
  ],
  templateUrl: './thumbnail.component.html',
  imports: [
    NgClass,
    SafeUrlPipe,
    ThemedLoadingComponent,
    TranslatePipe,
  ],
})
export class ThumbnailComponent extends BaseComponent {

  private readonly placeholderIconByKey: Record<string, string> = {
    'thumbnail.entity.person.placeholder': 'fa-solid fa-people-group',
    'thumbnail.entity.org-unit.placeholder': 'fa-solid fa-building',
    'thumbnail.entity.program.placeholder': 'fa-solid fa-graduation-cap',
  };

  get placeholderIconClass(): string | null {
    return this.placeholderIconByKey[this.placeholder] ?? null;
  }
}
