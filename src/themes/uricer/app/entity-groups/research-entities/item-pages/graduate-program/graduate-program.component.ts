import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Context } from '@dspace/core/shared/context.model';
import { ViewMode } from '@dspace/core/shared/view-mode.model';
import { TranslateModule } from '@ngx-translate/core';

import { GenericItemPageFieldComponent } from '@/app/item-page/simple/field-components/specific-field/generic/generic-item-page-field.component';
import { ThemedItemPageTitleFieldComponent } from '@/app/item-page/simple/field-components/specific-field/title/themed-item-page-field.component';
import { ItemComponent } from '@/app/item-page/simple/item-types/shared/item.component';
import { TabbedRelatedEntitiesSearchComponent } from '@/app/item-page/simple/related-entities/tabbed-related-entities-search/tabbed-related-entities-search.component';
import { RelatedItemsComponent } from '@/app/item-page/simple/related-items/related-items-component';
import { DsoEditMenuComponent } from '@/app/shared/dso-page/dso-edit-menu/dso-edit-menu.component';
import { listableObjectComponent } from '@/app/shared/object-collection/shared/listable-object/listable-object.decorator';
import { ThemedResultsBackButtonComponent } from '@/app/shared/results-back-button/themed-results-back-button.component';
@listableObjectComponent('GraduateProgram', ViewMode.StandalonePage, Context.Any, 'uricer')
@Component({
  selector: 'ds-graduate-program',
  templateUrl: './graduate-program.component.html',
  imports: [
    AsyncPipe,
    DsoEditMenuComponent,
    GenericItemPageFieldComponent,
    RelatedItemsComponent,
    RouterLink,
    TabbedRelatedEntitiesSearchComponent,
    ThemedItemPageTitleFieldComponent,
    ThemedResultsBackButtonComponent,
    TranslateModule,
  ],
})
export class GraduateProgramComponent extends ItemComponent {
  get capesCode(): string | undefined {
    return this.object?.firstMetadataValue(['organization.identifier.capes', 'dc.publisher.programCode']);
  }

  get capesUrl(): string | undefined {
    return this.capesCode ? `https://sucupira.capes.gov.br/programas?search=${encodeURIComponent(this.capesCode)}` : undefined;
  }

  get programUrl(): string | undefined {
    return this.object?.firstMetadataValue('organization.url');
  }
}
