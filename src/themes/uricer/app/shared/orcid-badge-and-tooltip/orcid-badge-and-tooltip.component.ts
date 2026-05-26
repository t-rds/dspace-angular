import { Component, Input, OnInit } from '@angular/core';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';

import { MetadataValue } from '@/app/core/shared/metadata.models';

/**
 * Component to display an ORCID badge with a tooltip.
 * The tooltip text changes based on whether the ORCID is authenticated.
 */
@Component({
  selector: 'ds-orcid-badge-and-tooltip',
  imports: [
    NgbTooltip,
  ],
  templateUrl: './orcid-badge-and-tooltip.component.html',
  styleUrl: './orcid-badge-and-tooltip.component.scss',
})
export class OrcidBadgeAndTooltipComponent implements OnInit {
  /**
   * The ORCID identifier or URL to be displayed.
   */
  @Input() orcid: MetadataValue;

  /**
   * The person name to be displayed in the tooltip.
   */
  @Input() personName: string;

  /**
   * The tooltip text to be displayed.
   */
  orcidTooltip: string;

  /**
   * Full ORCID URL.
   */
  orcidUrl: string;

  constructor(
    private translateService: TranslateService,
  ) {
  }

  ngOnInit(): void {
    this.orcidUrl = this.buildOrcidUrl();
    this.orcidTooltip = this.translateService.instant('person.orcid-tooltip', { name: this.personName || this.orcid?.value });
  }

  /**
   * Build the full ORCID URL from metadata value.
   */
  private buildOrcidUrl(): string {
    const value = this.orcid?.value?.trim();

    if (!value) {
      return '';
    }

    return value.startsWith('http') ? value : `https://orcid.org/${value.replace(/^\//, '')}`;
  }
}
