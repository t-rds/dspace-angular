import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DSONameService } from '@dspace/core/breadcrumbs/dso-name.service';
import { Context } from '@dspace/core/shared/context.model';
import { MetadataRepresentationType } from '@dspace/core/shared/metadata-representation/metadata-representation.model';
import {
  hasNoValue,
  hasValue,
} from '@dspace/shared/utils/empty.util';

import { ItemMetadataRepresentationListElementComponent } from '@/app/shared/object-list/metadata-representation-list-element/item/item-metadata-representation-list-element.component';
import {
  METADATA_REPRESENTATION_COMPONENT_DECORATOR_MAP,
} from '@/app/shared/metadata-representation/metadata-representation.decorator';
import { TruncatableComponent } from '@/app/shared/truncatable/truncatable.component';

@Component({
  selector: 'ds-program-item-metadata-list-element',
  templateUrl: './program-item-metadata-list-element.component.html',
  imports: [
    RouterLink,
    TruncatableComponent,
  ],
})
export class ProgramItemMetadataListElementComponent extends ItemMetadataRepresentationListElementComponent {
  constructor(
    public dsoNameService: DSONameService,
  ) {
    super();
  }
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
  if (hasValue(contextMap.get('uricer')) && contextMap.get('uricer') !== ProgramItemMetadataListElementComponent) {
    throw new Error(`There can't be more than one component to render Entity of type "${entityType}" in MetadataRepresentation "${MetadataRepresentationType.Item}" with context "${Context.Any}"`);
  }

  contextMap.set('uricer', ProgramItemMetadataListElementComponent);
}

registerProgramMetadataRepresentation('GraduateProgram');
registerProgramMetadataRepresentation('UndergraduateProgram');
