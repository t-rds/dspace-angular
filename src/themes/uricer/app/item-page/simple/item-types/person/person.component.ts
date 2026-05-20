import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { Context } from '@/app/core/shared/context.model';
import { ViewMode } from '@/app/core/shared/view-mode.model';
import { CollectionsComponent } from '@/app/item-page/field-components/collections/collections.component';
import { ThemedMediaViewerComponent } from '@/app/item-page/media-viewer/themed-media-viewer.component';
import { ItemPageOrcidFieldComponent } from '@/app/item-page/simple/field-components/specific-field/orcid/item-page-orcid-field.component';
import { ThemedItemPageTitleFieldComponent } from '@/app/item-page/simple/field-components/specific-field/title/themed-item-page-field.component';
import { ItemPageUriFieldComponent } from '@/app/item-page/simple/field-components/specific-field/uri/item-page-uri-field.component';
import { PublicationComponent as BaseComponent } from '@/app/item-page/simple/item-types/publication/publication.component';
import { DsoEditMenuComponent } from '@/app/shared/dso-page/dso-edit-menu/dso-edit-menu.component';
import { MetadataFieldWrapperComponent } from '@/app/shared/metadata-field-wrapper/metadata-field-wrapper.component';
import { listableObjectComponent } from '@/app/shared/object-collection/shared/listable-object/listable-object.decorator';
import { ThemedResultsBackButtonComponent } from '@/app/shared/results-back-button/themed-results-back-button.component';
import { ThemedThumbnailComponent } from '@/app/thumbnail/themed-thumbnail.component';

import { ItemPageLattesFieldComponent } from '../../field-components/specific-field/lattes/item-page-lattes-field.component';

@listableObjectComponent('Person', ViewMode.StandalonePage, Context.Any, 'uricer')
@Component({
  selector: 'ds-person',
  styleUrls: ['./person.component.scss'],
  templateUrl: './person.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AsyncPipe,
    CollectionsComponent,
    DsoEditMenuComponent,
    ItemPageLattesFieldComponent,
    ItemPageOrcidFieldComponent,
    ItemPageUriFieldComponent,
    MetadataFieldWrapperComponent,
    RouterLink,
    ThemedItemPageTitleFieldComponent,
    ThemedMediaViewerComponent,
    ThemedResultsBackButtonComponent,
    ThemedThumbnailComponent,
    TranslateModule,
  ],
})
export class PersonComponent extends BaseComponent {
}
