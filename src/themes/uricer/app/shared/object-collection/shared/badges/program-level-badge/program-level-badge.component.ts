import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { TypeBadgeComponent as BaseComponent } from '@/app/shared/object-collection/shared/badges/type-badge/type-badge.component';

@Component({
  selector: 'ds-program-level-badge',
  templateUrl: './program-level-badge.component.html',
  styleUrls: ['./program-level-badge.component.scss'],
  imports: [
    TranslateModule,
  ],
})
export class ProgramLevelBadgeComponent extends BaseComponent {

  private readonly graduateProgramFields = [
    'relation.isGraduateProgramOfPublication',
  ];

  private readonly undergraduateProgramFields = [
    'relation.isUndergraduateOfPublication',
  ];

  get isGraduateProgramBadge(): boolean {
    return this.entityType === 'GraduateProgram' || this.object?.hasMetadata(this.graduateProgramFields);
  }

  get isUndergraduateProgramBadge(): boolean {
    return this.entityType === 'UndergraduateProgram' || this.object?.hasMetadata(this.undergraduateProgramFields);
  }

  private get entityType(): string | undefined {
    return this.object?.firstMetadataValue('dspace.entity.type');
  }
}
