import { Component } from '@angular/core';

import { MetadataDirective } from '@/app/shared/metadata.directive';
import { TypeBadgeComponent as BaseComponent } from '@/app/shared/object-collection/shared/badges/type-badge/type-badge.component';

@Component({
  selector: 'ds-program-badge',
  templateUrl: './program-badge.component.html',
  styleUrls: ['./program-badge.component.scss'],
  imports: [
    MetadataDirective,
  ],
})
export class ProgramBadgeComponent extends BaseComponent {

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
