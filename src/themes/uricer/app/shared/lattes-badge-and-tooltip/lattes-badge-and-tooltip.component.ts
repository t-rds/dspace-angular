import { Component, Input, OnInit } from '@angular/core';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';

import { MetadataValue } from '@/app/core/shared/metadata.models';

@Component({
  selector: 'ds-lattes-badge-and-tooltip',
  templateUrl: './lattes-badge-and-tooltip.component.html',
  styleUrl: './lattes-badge-and-tooltip.component.scss',
  imports: [
    NgbTooltip,
  ],
})
/**
 * Component to display a Lattes badge with a tooltip.
 */
export class LattesBadgeAndTooltipComponent implements OnInit {

  /**
   * The Lattes identifier or URL to be displayed.
   */
  @Input() lattes: MetadataValue;

  /**
   * The person name to be displayed in the tooltip.
   */
  @Input() personName: string;

  /**
   * The tooltip text to be displayed.
   */
  lattesTooltip: string;

  /**
   * Full Lattes URL.
   */
  lattesUrl: string;

  constructor(
    private translateService: TranslateService,
  ) {
  }

  ngOnInit(): void {
    this.lattesUrl = this.buildLattesUrl();
    this.lattesTooltip = this.translateService.instant('person.lattes-tooltip', { name: this.personName || this.lattes?.value });
  }

  /**
   * Build the full Lattes URL from metadata value.
   */
  private buildLattesUrl(): string {
    const value = this.lattes?.value?.trim();

    if (!value) {
      return '';
    }

    return value.startsWith('http') ? value : `https://lattes.cnpq.br/${value.replace(/^\//, '')}`;
  }
}
