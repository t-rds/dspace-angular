import { Component } from '@angular/core';

import { ThemedAccessStatusBadgeComponent } from '@/app/shared/object-collection/shared/badges/access-status-badge/themed-access-status-badge.component';
import { BadgesComponent as BaseComponent } from '@/app/shared/object-collection/shared/badges/badges.component';
import { ThemedMyDSpaceStatusBadgeComponent } from '@/app/shared/object-collection/shared/badges/my-dspace-status-badge/themed-my-dspace-status-badge.component';
import { ThemedStatusBadgeComponent } from '@/app/shared/object-collection/shared/badges/status-badge/themed-status-badge.component';
import { ThemedTypeBadgeComponent } from '@/app/shared/object-collection/shared/badges/type-badge/themed-type-badge.component';

import { ProgramBadgeComponent } from './program-badge/program-badge.component';
import { ProgramLevelBadgeComponent } from './program-level-badge/program-level-badge.component';

@Component({
  selector: 'ds-themed-badges',
  templateUrl: './badges.component.html',
  imports: [
    ProgramBadgeComponent,
    ProgramLevelBadgeComponent,
    ThemedAccessStatusBadgeComponent,
    ThemedMyDSpaceStatusBadgeComponent,
    ThemedStatusBadgeComponent,
    ThemedTypeBadgeComponent,
  ],
})
export class BadgesComponent extends BaseComponent {
}
