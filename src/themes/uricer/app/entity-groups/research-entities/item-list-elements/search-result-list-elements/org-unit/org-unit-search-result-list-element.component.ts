import {
  AsyncPipe,
  NgClass,
} from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Context } from '@/app/core/shared/context.model';
import { ViewMode } from '@/app/core/shared/view-mode.model';
import { OrgUnitSearchResultListElementComponent as BaseComponent } from '@/app/entity-groups/research-entities/item-list-elements/search-result-list-elements/org-unit/org-unit-search-result-list-element.component';
import { MetadataDirective } from '@/app/shared/metadata.directive';
import { ThemedBadgesComponent } from '@/app/shared/object-collection/shared/badges/themed-badges.component';
import { listableObjectComponent } from '@/app/shared/object-collection/shared/listable-object/listable-object.decorator';
import { TruncatableComponent } from '@/app/shared/truncatable/truncatable.component';
import { TruncatablePartComponent } from '@/app/shared/truncatable/truncatable-part/truncatable-part.component';
import { ThemedThumbnailComponent } from '@/app/thumbnail/themed-thumbnail.component';

@listableObjectComponent('OrgUnitSearchResult', ViewMode.ListElement, Context.Any, 'uricer')
@Component({
  selector: 'ds-org-unit-search-result-list-element',
  templateUrl: './org-unit-search-result-list-element.component.html',
  imports: [
    AsyncPipe,
    MetadataDirective,
    NgClass,
    RouterLink,
    ThemedBadgesComponent,
    ThemedThumbnailComponent,
    TruncatableComponent,
    TruncatablePartComponent,
  ],
})
export class OrgUnitSearchResultListElementComponent extends BaseComponent {
}
