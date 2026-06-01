import {
  AsyncPipe,
  NgClass,
} from '@angular/common';
import {
  Component,
  OnInit,
} from '@angular/core';
import { RouterLink } from '@angular/router';

import { Context } from '@/app/core/shared/context.model';
import { MetadataValue } from '@/app/core/shared/metadata.models';
import { ItemSearchResult } from '@/app/core/shared/object-collection/item-search-result.model';
import { ViewMode } from '@/app/core/shared/view-mode.model';
import { MetadataDirective } from '@/app/shared/metadata.directive';
import { MetadataLinkViewComponent } from '@/app/shared/metadata-link-view/metadata-link-view.component';
import { ThemedBadgesComponent } from '@/app/shared/object-collection/shared/badges/themed-badges.component';
import { listableObjectComponent } from '@/app/shared/object-collection/shared/listable-object/listable-object.decorator';
import { ItemSearchResultListElementComponent as BaseComponent } from '@/app/shared/object-list/search-result-list-element/item-search-result/item-types/item/item-search-result-list-element.component';
import { TruncatableComponent } from '@/app/shared/truncatable/truncatable.component';
import { TruncatablePartComponent } from '@/app/shared/truncatable/truncatable-part/truncatable-part.component';
import { ThemedThumbnailComponent } from '@/app/thumbnail/themed-thumbnail.component';

@listableObjectComponent('PublicationSearchResult', ViewMode.ListElement, Context.Any, 'uricer')
@listableObjectComponent('GraduateProgramSearchResult', ViewMode.ListElement, Context.Any, 'uricer')
@listableObjectComponent('UndergraduateProgramSearchResult', ViewMode.ListElement, Context.Any, 'uricer')
@listableObjectComponent(ItemSearchResult, ViewMode.ListElement, Context.Any, 'uricer')
@Component({
  selector: 'ds-item-search-result-list-element',
  templateUrl: './item-search-result-list-element.component.html',
  styleUrls: ['./item-search-result-list-element.component.scss'],
  imports: [
    AsyncPipe,
    MetadataDirective,
    MetadataLinkViewComponent,
    NgClass,
    RouterLink,
    ThemedBadgesComponent,
    ThemedThumbnailComponent,
    TruncatableComponent,
    TruncatablePartComponent,
  ],
})
export class ItemSearchResultListElementComponent extends BaseComponent implements OnInit {

  private readonly titleMetadataByEntityType: Record<string, string[]> = {
    GraduateProgram: ['organization.name', 'organization.legalName', 'organization.alternateName', 'dc.title'],
    UndergraduateProgram: ['organization.name', 'organization.legalName', 'organization.alternateName', 'dc.title'],
  };

  private readonly detailMetadataByEntityType: Record<string, string[]> = {
    GraduateProgram: ['organization.identifier.capes', 'dc.publisher.programCode'],
    UndergraduateProgram: ['organization.identifier.emec', 'dc.publisher.courseCode'],
  };

  private readonly abstractMetadataByEntityType: Record<string, string[]> = {
    GraduateProgram: ['organization.description', 'dc.description.abstract', 'dc.description.resumo'],
    UndergraduateProgram: ['organization.description', 'dc.description.abstract', 'dc.description.resumo'],
  };

  private readonly placeholderByEntityType: Record<string, string> = {
    Person: 'thumbnail.entity.person.placeholder',
    OrgUnit: 'thumbnail.entity.org-unit.placeholder',
    GraduateProgram: 'thumbnail.entity.program.placeholder',
    UndergraduateProgram: 'thumbnail.entity.program.placeholder',
  };

  override ngOnInit(): void {
    super.ngOnInit();
    this.dsoTitle = this.entityMetadata(this.entityMetadataFields(this.titleMetadataByEntityType)) ?? this.dsoTitle;
  }

  get entityType(): string | undefined {
    return this.dso?.firstMetadataValue('dspace.entity.type');
  }

  get hasEntityListMetadata(): boolean {
    return Object.keys(this.titleMetadataByEntityType).includes(this.entityType ?? '');
  }

  get isGraduateProgram(): boolean {
    return this.entityType === 'GraduateProgram';
  }

  get isUndergraduateProgram(): boolean {
    return this.entityType === 'UndergraduateProgram';
  }

  get capesCode(): string | undefined {
    return this.firstMetadataValue(['organization.identifier.capes', 'dc.publisher.programCode']);
  }

  get capesUrl(): string | undefined {
    return this.capesCode ? `https://sucupira.capes.gov.br/programas?search=${encodeURIComponent(this.capesCode)}` : undefined;
  }

  get entityDetailMetadata(): MetadataValue | undefined {
    return this.entityMetadata(this.entityMetadataFields(this.detailMetadataByEntityType));
  }

  get entityAbstractMetadata(): MetadataValue | undefined {
    return this.entityMetadata(this.entityMetadataFields(this.abstractMetadataByEntityType));
  }

  get thumbnailClass(): string {
    return this.entityType && this.placeholderByEntityType[this.entityType]
      ? `search-result-placeholder-thumbnail ${this.entityType}`
      : '';
  }

  get thumbnailPlaceholder(): string {
    return this.entityType
      ? this.placeholderByEntityType[this.entityType] ?? 'thumbnail.default.placeholder'
      : 'thumbnail.default.placeholder';
  }

  private entityMetadata(fields?: string[]): MetadataValue | undefined {
    return fields?.length ? this.firstMetadata(fields) : undefined;
  }

  private entityMetadataFields(fieldsByEntityType: Record<string, string[]>): string[] | undefined {
    return this.entityType ? fieldsByEntityType[this.entityType] : undefined;
  }
}
