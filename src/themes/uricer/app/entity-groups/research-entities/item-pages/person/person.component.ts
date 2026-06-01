import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Context } from '@dspace/core/shared/context.model';
import { ViewMode } from '@dspace/core/shared/view-mode.model';
import { TranslateModule } from '@ngx-translate/core';

import { PersonComponent as BaseComponent } from '@/app/entity-groups/research-entities/item-pages/person/person.component';
import { GenericItemPageFieldComponent } from '@/app/item-page/simple/field-components/specific-field/generic/generic-item-page-field.component';
import { ThemedItemPageTitleFieldComponent } from '@/app/item-page/simple/field-components/specific-field/title/themed-item-page-field.component';
import { TabbedRelatedEntitiesSearchComponent } from '@/app/item-page/simple/related-entities/tabbed-related-entities-search/tabbed-related-entities-search.component';
import { RelatedItemsComponent } from '@/app/item-page/simple/related-items/related-items-component';
import { DsoEditMenuComponent } from '@/app/shared/dso-page/dso-edit-menu/dso-edit-menu.component';
import { MetadataFieldWrapperComponent } from '@/app/shared/metadata-field-wrapper/metadata-field-wrapper.component';
import { listableObjectComponent } from '@/app/shared/object-collection/shared/listable-object/listable-object.decorator';
import { ThemedResultsBackButtonComponent } from '@/app/shared/results-back-button/themed-results-back-button.component';
import { ThemedThumbnailComponent } from '@/app/thumbnail/themed-thumbnail.component';

import { ItemPageLattesFieldComponent } from '@/uricer/app/item-page/simple/field-components/specific-field/lattes/item-page-lattes-field.component';
import { ItemPageOrcidFieldComponent } from '@/uricer/app/item-page/simple/field-components/specific-field/orcid/item-page-orcid-field.component';

@listableObjectComponent('Person', ViewMode.StandalonePage, Context.Any, 'uricer')
@Component({
  selector: 'ds-person',
  styleUrls: ['../../../../../../../app/entity-groups/research-entities/item-pages/person/person.component.scss'],
  templateUrl: './person.component.html',
  imports: [
    AsyncPipe,
    DsoEditMenuComponent,
    GenericItemPageFieldComponent,
    ItemPageLattesFieldComponent,
    ItemPageOrcidFieldComponent,
    MetadataFieldWrapperComponent,
    RelatedItemsComponent,
    RouterLink,
    TabbedRelatedEntitiesSearchComponent,
    ThemedItemPageTitleFieldComponent,
    ThemedResultsBackButtonComponent,
    ThemedThumbnailComponent,
    TranslateModule,
  ],
})
export class PersonComponent extends BaseComponent {
}
