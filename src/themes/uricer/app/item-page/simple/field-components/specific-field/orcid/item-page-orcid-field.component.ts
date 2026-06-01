import {
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

import { BrowseService } from '@/app/core/browse/browse.service';
import { BrowseDefinitionDataService } from '@/app/core/browse/browse-definition-data.service';
import { Item } from '@/app/core/shared/item.model';
import { MetadataValue } from '@/app/core/shared/metadata.models';
import { ImageField } from '@/app/item-page/simple/field-components/specific-field/image-field';
import { ItemPageFieldComponent } from '@/app/item-page/simple/field-components/specific-field/item-page-field.component';

@Component({
  selector: 'ds-item-page-orcid-field',
  templateUrl: './item-page-orcid-field.component.html',
  styleUrls: ['./item-page-orcid-field.component.scss'],
  imports: [
    TranslatePipe,
  ],
})
/**
 * This component is used for displaying a ORCID iD URL as a clickable link
 */
export class ItemPageOrcidFieldComponent extends ItemPageFieldComponent implements OnInit {

  /**
   * The item to display metadata for
   */
  @Input() item: Item;

  /**
   * Separator string between multiple values of the metadata fields defined
   * @type {string}
   */
  separator: string;

  /**
   * Fields (schema.element.qualifier) used to render their values.
   * In this component, we want to display values for metadata 'person.identifier.lattes'
   */
  fields: string[] = [
    'person.identifier.orcid',
  ];

  /**
   * Label i18n key for the rendered metadata
   */
  label = 'item.page.orcid-profile';

  /**
   * Lattes URL from metadata
   */
  orcidUrl: string | null;

  /**
   * Whether the item has Lattes metadata
   */
  hasOrcidMetadata: boolean;

  /**
   * Lattes icon configuration
   */
  img: ImageField = {
    URI: 'assets/uricer/images/orcid.logo.icon.svg',
    alt: 'item.page.orcid-icon',
    heightVar: '--ds-orcid-icon-height',
  };

  /**
   * Creates an instance of ItemPageLattesFieldComponent.
   *
   * @param {BrowseDefinitionDataService} browseDefinitionDataService - Service for managing browse definitions
   * @param {BrowseService} browseService - Service for browse functionality
   */
  constructor(
    protected browseDefinitionDataService: BrowseDefinitionDataService,
    protected browseService: BrowseService,
  ) {
    super(browseDefinitionDataService, browseService);
  }

  /**
   * Initializes the component and reads the Lattes URL from metadata.
   *
   * @returns {void}
   */
  ngOnInit(): void {

    const metadata = this.getOrcidMetadata();
    const value = metadata?.value?.trim();

    if (value) {
      this.orcidUrl = value.startsWith('http') ? value : `https://orcid.org/${value.replace(/^\//, '')}`;
    } else {
      this.orcidUrl = null;
    }

    this.hasOrcidMetadata = !!this.orcidUrl;
  }

  /**
   * Retrieves the Lattes metadata value from the item.
   * Extracts the first Lattes URL from the item's metadata fields,
   * ensuring the value is not empty or whitespace only.
   *
   * @private
   * @returns {MetadataValue | null} The Lattes metadata value if found and valid, null otherwise
   */
  private getOrcidMetadata(): MetadataValue | null {
    if (!this.item || !this.hasOrcid()) {
      return null;
    }

    const metadata = this.item.findMetadataSortedByPlace('person.identifier.orcid');
    return metadata.length > 0 && metadata[0].value?.trim() ? metadata[0] : null;
  }

  /**
   * Checks whether the item has Lattes metadata associated with it.
   *
   * @public
   * @returns {boolean} True if the item has 'person.identifier.lattes' metadata, false otherwise
   */
  public hasOrcid(): boolean {
    return this.item?.hasMetadata('person.identifier.orcid') ?? false;
  }
}
