
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';

import { MetadataDirective } from '@/app/shared/metadata.directive';
import { ItemMetadataRepresentationListElementComponent } from '@/app/shared/object-list/metadata-representation-list-element/item/item-metadata-representation-list-element.component';
import { TruncatableComponent } from '@/app/shared/truncatable/truncatable.component';

import { LattesBadgeAndTooltipComponent } from '@/uricer/app/shared/lattes-badge-and-tooltip/lattes-badge-and-tooltip.component';
import { OrcidBadgeAndTooltipComponent } from '@/uricer/app/shared/orcid-badge-and-tooltip/orcid-badge-and-tooltip.component';
import { hasNoValue, hasValue } from '@/app/utils/empty.util';
import { METADATA_REPRESENTATION_COMPONENT_DECORATOR_MAP } from '@/app/shared/metadata-representation/metadata-representation.decorator';
import { MetadataRepresentationType } from '@/app/core/shared/metadata-representation/metadata-representation.model';
import { Context } from '@/app/core/shared/context.model';

@Component({
  selector: 'ds-person-item-metadata-list-element',
  templateUrl: './person-item-metadata-list-element.component.html',
  imports: [
    MetadataDirective,
    NgbTooltip,
    LattesBadgeAndTooltipComponent,
    OrcidBadgeAndTooltipComponent,
    RouterLink,
    TruncatableComponent,
  ],
})
/**
 * The component for displaying an item of the type Person as a metadata field
 */
export class PersonItemMetadataListElementComponent extends ItemMetadataRepresentationListElementComponent {
}

function registerProgramMetadataRepresentation(entityType: string) {
  if (hasNoValue(METADATA_REPRESENTATION_COMPONENT_DECORATOR_MAP.get(entityType))) {
    METADATA_REPRESENTATION_COMPONENT_DECORATOR_MAP.set(entityType, new Map());
  }

  const entityMap = METADATA_REPRESENTATION_COMPONENT_DECORATOR_MAP.get(entityType);
  if (hasNoValue(entityMap.get(MetadataRepresentationType.Item))) {
    entityMap.set(MetadataRepresentationType.Item, new Map());
  }

  const representationMap = entityMap.get(MetadataRepresentationType.Item);
  if (hasNoValue(representationMap.get(Context.Any))) {
    representationMap.set(Context.Any, new Map());
  }

  const contextMap = representationMap.get(Context.Any);
  if (hasValue(contextMap.get('uricer')) && contextMap.get('uricer') !== PersonItemMetadataListElementComponent) {
    throw new Error(`There can't be more than one component to render Entity of type "${entityType}" in MetadataRepresentation "${MetadataRepresentationType.Item}" with context "${Context.Any}"`);
  }

  contextMap.set('uricer', PersonItemMetadataListElementComponent);
}

registerProgramMetadataRepresentation('Person');
