import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Context } from '@dspace/core/shared/context.model';
import { ViewMode } from '@dspace/core/shared/view-mode.model';
import { TranslateModule } from '@ngx-translate/core';

import { GenericItemPageFieldComponent } from '@/app/item-page/simple/field-components/specific-field/generic/generic-item-page-field.component';
import { ThemedItemPageTitleFieldComponent } from '@/app/item-page/simple/field-components/specific-field/title/themed-item-page-field.component';
import { ItemComponent } from '@/app/item-page/simple/item-types/shared/item.component';
import { RelatedItemsComponent } from '@/app/item-page/simple/related-items/related-items-component';
import { DsoEditMenuComponent } from '@/app/shared/dso-page/dso-edit-menu/dso-edit-menu.component';
import { listableObjectComponent } from '@/app/shared/object-collection/shared/listable-object/listable-object.decorator';
import { TabbedRelatedEntitiesSearchComponent } from '@/app/item-page/simple/related-entities/tabbed-related-entities-search/tabbed-related-entities-search.component';
import { ThemedResultsBackButtonComponent } from '@/app/shared/results-back-button/themed-results-back-button.component';

@listableObjectComponent('UndergraduateProgram', ViewMode.StandalonePage, Context.Any, 'uricer')
@Component({
  selector: 'ds-undergraduate-program',
  templateUrl: './undergraduate-program.component.html',
  imports: [
    AsyncPipe,
    DsoEditMenuComponent,
    GenericItemPageFieldComponent,
    RelatedItemsComponent,
    RouterLink,
    ThemedItemPageTitleFieldComponent,
    ThemedResultsBackButtonComponent,
    TabbedRelatedEntitiesSearchComponent,
    TranslateModule,
  ],
})
export class UndergraduateProgramComponent extends ItemComponent {
  get courseCode(): string | undefined {
    return this.object?.firstMetadataValue(['organization.identifier.emec', 'dc.publisher.courseCode']);
  }

  get programUrl(): string | undefined {
    return this.object?.firstMetadataValue('organization.url');
  }
}
