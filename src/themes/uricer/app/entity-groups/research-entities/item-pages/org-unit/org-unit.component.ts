import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ViewMode } from '@dspace/core/shared/view-mode.model';
import { TranslateModule } from '@ngx-translate/core';

import { GenericItemPageFieldComponent } from '@/app/item-page/simple/field-components/specific-field/generic/generic-item-page-field.component';
import { ItemPageImgFieldComponent } from '@/app/item-page/simple/field-components/specific-field/img/item-page-img-field.component';
import { ThemedItemPageTitleFieldComponent } from '@/app/item-page/simple/field-components/specific-field/title/themed-item-page-field.component';
import { TabbedRelatedEntitiesSearchComponent } from '@/app/item-page/simple/related-entities/tabbed-related-entities-search/tabbed-related-entities-search.component';
import { DsoEditMenuComponent } from '@/app/shared/dso-page/dso-edit-menu/dso-edit-menu.component';
import { MetadataFieldWrapperComponent } from '@/app/shared/metadata-field-wrapper/metadata-field-wrapper.component';
import { listableObjectComponent } from '@/app/shared/object-collection/shared/listable-object/listable-object.decorator';
import { ThemedResultsBackButtonComponent } from '@/app/shared/results-back-button/themed-results-back-button.component';
import { ThemedThumbnailComponent } from '@/app/thumbnail/themed-thumbnail.component';
import { Context } from '@/app/core/shared/context.model';
import { OrgUnitComponent as BaseComponent } from '@/app/entity-groups/research-entities/item-pages/org-unit/org-unit.component';

@listableObjectComponent('OrgUnit', ViewMode.StandalonePage, Context.Any, 'uricer')
@Component({
  selector: 'ds-org-unit',
  styleUrls: ['./org-unit.component.scss'],
  templateUrl: './org-unit.component.html',
  imports: [
    AsyncPipe,
    DsoEditMenuComponent,
    GenericItemPageFieldComponent,
    ItemPageImgFieldComponent,
    MetadataFieldWrapperComponent,
    RouterLink,
    TabbedRelatedEntitiesSearchComponent,
    ThemedItemPageTitleFieldComponent,
    ThemedResultsBackButtonComponent,
    ThemedThumbnailComponent,
    TranslateModule,
  ],
})
/**
 * The component for displaying metadata and relations of an item of the type Organisation Unit
 */
export class OrgUnitComponent extends BaseComponent {
  get homepage(): string | undefined {
    return this.object?.firstMetadataValue('organization.url');
  }
}
