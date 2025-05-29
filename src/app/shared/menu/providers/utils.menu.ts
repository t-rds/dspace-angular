import { Injectable } from '@angular/core';
import {
  Observable,
  of,
} from 'rxjs';

import { TextMenuItemModel } from '../menu-item/models/text.model';
import { MenuItemType } from '../menu-item-type.model';
import { PartialMenuSection } from '../menu-provider.model';
import { AbstractExpandableMenuProvider } from './helper-providers/expandable-menu-provider';

/**
 * Menu provider to create the "Utils documents" menu section in the public navbar
 */
@Injectable()
export class UtilsMenuProvider extends AbstractExpandableMenuProvider {
  getTopSection(): Observable<PartialMenuSection> {
    return of(
      {
        model: {
          type: MenuItemType.TEXT,
          text: 'menu.section.documents',
        } as TextMenuItemModel,
        icon: 'file',
        visible: true,
      },
    );
  }

  getSubSections(): Observable<PartialMenuSection[]> {
    return of([
      {
        visible: true,
        model: {
          type: MenuItemType.EXTERNAL,
          text: 'menu.section.authorization_term',
          href: '/assets/uricer/uploads/termo_autorizacao.pdf',
        },
        icon: 'diagram-project',
      } as PartialMenuSection,
    ]);
  }
}
