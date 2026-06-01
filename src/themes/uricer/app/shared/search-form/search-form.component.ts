import { AsyncPipe } from '@angular/common';
import {
  Component,
  ElementRef,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PaginationComponentOptions } from '@dspace/core/pagination/pagination-component-options.model';
import { PaginatedSearchOptions } from '@dspace/core/shared/search/models/paginated-search-options.model';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

import { SearchFormComponent as BaseComponent } from '@/app/shared/search-form/search-form.component';
import { BrowserOnlyPipe } from '@/app/shared/utils/browser-only.pipe';

@Component({
  selector: 'ds-themed-search-form',
  styleUrls: ['./search-form.component.scss'],
  templateUrl: './search-form.component.html',
  imports: [
    AsyncPipe,
    BrowserOnlyPipe,
    FormsModule,
    NgbTooltip,
    TranslateModule,
  ],
})
export class SearchFormComponent extends BaseComponent {
  private elementRef = inject(ElementRef<HTMLElement>);

  override updateSearch(data: any) {
    if (!this.isRelationshipLookupSearch()) {
      super.updateSearch(data);
      return;
    }

    const currentValue = this.searchConfig.paginatedSearchOptions.getValue();
    const pagination = Object.assign(new PaginationComponentOptions(), currentValue.pagination, {
      currentPage: 1,
    });
    const updatedValue = new PaginatedSearchOptions(Object.assign({}, currentValue, data, {
      pagination,
    }));

    this.searchConfig.searchOptions.next(updatedValue);
    this.searchConfig.paginatedSearchOptions.next(updatedValue);
  }

  private isRelationshipLookupSearch(): boolean {
    return !!this.elementRef.nativeElement.closest('ds-dynamic-lookup-relation-modal');
  }
}
