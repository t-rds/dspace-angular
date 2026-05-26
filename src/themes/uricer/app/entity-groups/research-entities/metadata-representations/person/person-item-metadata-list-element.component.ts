import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';

import { Context } from '@/app/core/shared/context.model';
import { MetadataRepresentationType } from '@/app/core/shared/metadata-representation/metadata-representation.model';
import { METADATA_REPRESENTATION_COMPONENT_DECORATOR_MAP } from '@/app/shared/metadata-representation/metadata-representation.decorator';
import { ItemMetadataRepresentationListElementComponent } from '@/app/shared/object-list/metadata-representation-list-element/item/item-metadata-representation-list-element.component';
import { TruncatableComponent } from '@/app/shared/truncatable/truncatable.component';

import { LattesBadgeAndTooltipComponent } from '../../../../shared/lattes-badge-and-tooltip/lattes-badge-and-tooltip.component';
import { OrcidBadgeAndTooltipComponent } from '../../../../shared/orcid-badge-and-tooltip/orcid-badge-and-tooltip.component';

@Component({
  selector: 'ds-person-item-metadata-list-element',
  templateUrl: './person-item-metadata-list-element.component.html',
  imports: [
    LattesBadgeAndTooltipComponent,
    NgbTooltip,
    OrcidBadgeAndTooltipComponent,
    RouterLink,
    TruncatableComponent,
  ],
})
/**
 * The URICER component for displaying an item of the type Person as a metadata field.
 */
export class PersonItemMetadataListElementComponent extends ItemMetadataRepresentationListElementComponent {
}

METADATA_REPRESENTATION_COMPONENT_DECORATOR_MAP
  .get('Person')
  .get(MetadataRepresentationType.Item)
  .get(Context.Any)
  .set('uricer', PersonItemMetadataListElementComponent as any);
