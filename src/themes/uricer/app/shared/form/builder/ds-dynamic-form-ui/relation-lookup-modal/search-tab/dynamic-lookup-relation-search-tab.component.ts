import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

import { SEARCH_CONFIG_SERVICE } from '@/app/my-dspace-page/my-dspace-configuration.service';
import { PaginationComponentOptions } from '@dspace/core/pagination/pagination-component-options.model';
import { PaginatedSearchOptions } from '@dspace/core/shared/search/models/paginated-search-options.model';
import { DsDynamicLookupRelationSearchTabComponent as BaseComponent } from '@/app/shared/form/builder/ds-dynamic-form-ui/relation-lookup-modal/search-tab/dynamic-lookup-relation-search-tab.component';
import { SearchConfigurationService } from '@/app/shared/search/search-configuration.service';
import { ThemedSearchComponent } from '@/app/shared/search/themed-search.component';
import { VarDirective } from '@/app/shared/utils/var.directive';

@Component({
  selector: 'ds-themed-dynamic-lookup-relation-search-tab',
  styleUrls: ['./dynamic-lookup-relation-search-tab.component.scss'],
  templateUrl: './dynamic-lookup-relation-search-tab.component.html',
  providers: [
    {
      provide: SEARCH_CONFIG_SERVICE,
      useClass: SearchConfigurationService,
    },
  ],
  imports: [
    AsyncPipe,
    NgbDropdownModule,
    ThemedSearchComponent,
    TranslateModule,
    VarDirective,
  ],
})
export class DsDynamicLookupRelationSearchTabComponent extends BaseComponent {
  override resetRoute() {
    const currentValue = this.searchConfigService.paginatedSearchOptions.getValue();
    const pagination = Object.assign(new PaginationComponentOptions(), currentValue.pagination, {
      currentPage: this.initialPagination.page,
      pageSize: this.initialPagination.pageSize,
    });
    const updatedValue = new PaginatedSearchOptions(Object.assign({}, currentValue, {
      pagination,
    }));

    this.searchConfigService.searchOptions.next(updatedValue);
    this.searchConfigService.paginatedSearchOptions.next(updatedValue);
  }
}
