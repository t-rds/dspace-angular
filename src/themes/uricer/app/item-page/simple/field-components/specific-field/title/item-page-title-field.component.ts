import { Component } from '@angular/core';
import { MetadataValue } from '@dspace/core/shared/metadata.models';
import { TranslateModule } from '@ngx-translate/core';

import { ItemPageTitleFieldComponent as BaseComponent } from '@/app/item-page/simple/field-components/specific-field/title/item-page-title-field.component';
import { MetadataDirective } from '@/app/shared/metadata.directive';

@Component({
  selector: 'ds-themed-item-page-title-field',
  templateUrl: './item-page-title-field.component.html',
  styleUrls: ['./item-page-title-field.component.scss'],
  imports: [
    MetadataDirective,
    TranslateModule,
  ],
})
export class ItemPageTitleFieldComponent extends BaseComponent {

  private readonly titleMetadataByEntityType: Record<string, string[]> = {
    GraduateProgram: ['organization.name', 'organization.legalName', 'organization.alternateName', 'dc.title'],
    OrgUnit: ['organization.acronym', 'organization.name', 'organization.legalName', 'organization.alternateName', 'dc.title'],
    UndergraduateProgram: ['organization.name', 'organization.legalName', 'organization.alternateName', 'dc.title'],
  };

  override ngOnInit(): void {
    super.ngOnInit();

    const titleMetadataFields = this.titleMetadataFields;
    const titleMetadata = titleMetadataFields ? this.item?.firstMetadata(titleMetadataFields) : undefined;
    if (titleMetadata) {
      this.nameMetadata = Object.assign(new MetadataValue(), titleMetadata);
    }
  }

  get entityType(): string | undefined {
    return this.item?.firstMetadataValue('dspace.entity.type');
  }

  get titleMetadataFields(): string[] | undefined {
    return this.entityType ? this.titleMetadataByEntityType[this.entityType] : undefined;
  }
}
