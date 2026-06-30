import { Component } from '@angular/core';

import { Context } from '@/app/core/shared/context.model';
import { Item } from '@/app/core/shared/item.model';
import { ViewMode } from '@/app/core/shared/view-mode.model';
import { AbstractListableElementComponent } from '@/app/shared/object-collection/shared/object-collection-element/abstract-listable-element.component';
import { listableObjectComponent } from '@/app/shared/object-collection/shared/listable-object/listable-object.decorator';

import { OrgUnitSearchResultListElementComponent } from '../search-result-list-elements/org-unit/org-unit-search-result-list-element.component';

@listableObjectComponent('OrgUnit', ViewMode.ListElement, Context.Any, 'uricer')
@Component({
  selector: 'ds-org-unit-list-element',
  templateUrl: './org-unit-list-element.component.html',
  imports: [
    OrgUnitSearchResultListElementComponent,
  ],
})
export class OrgUnitListElementComponent extends AbstractListableElementComponent<Item> {
}
