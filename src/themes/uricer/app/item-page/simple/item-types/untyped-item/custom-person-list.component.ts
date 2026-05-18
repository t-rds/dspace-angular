import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { Item } from '@/app/core/shared/item.model';
import { MetadataFieldWrapperComponent } from '@/app/shared/metadata-field-wrapper/metadata-field-wrapper.component';

@Component({
  selector: 'ds-custom-person-list',
  templateUrl: './custom-person-list.component.html',
  styleUrls: ['./custom-person-list.component.scss'],
  imports: [
    MetadataFieldWrapperComponent,
    RouterLink,
    TranslateModule,
  ],
})
export class CustomPersonListComponent {
  /**
   * O item do DSpace contendo os metadados
   */
  @Input() item: Item;

  /**
   * O label que será exibido (ex: 'item.page.authors')
   */
  @Input() label: string;

  /**
   * Lista de campos de metadados para os nomes das pessoas (ex: ['dc.contributor.author', 'dc.creator'])
   */
  @Input() personMetadataFields: string[] = [];

  /**
   * Lista de campos de metadados correspondentes para os links do Lattes
   */
  @Input() lattesMetadataFields: string[] = [];

  /**
   * Lista de campos de metadados correspondentes para o ORCID
   */
  @Input() orcidMetadataFields: string[] = [];
}
