import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { SEARCH_CONFIG_SERVICE } from '@/app/my-dspace-page/my-dspace-configuration.service';
import { PaginationComponentOptions } from '@dspace/core/pagination/pagination-component-options.model';
import { PaginatedSearchOptions } from '@dspace/core/shared/search/models/paginated-search-options.model';
import {
  fadeIn,
  fadeInOut,
} from '@/app/shared/animations/fade';
import { ErrorComponent } from '@/app/shared/error/error.component';
import { DsDynamicLookupRelationExternalSourceTabComponent as BaseComponent } from '@/app/shared/form/builder/ds-dynamic-form-ui/relation-lookup-modal/external-source-tab/dynamic-lookup-relation-external-source-tab.component';
import { ThemedLoadingComponent } from '@/app/shared/loading/themed-loading.component';
import { ObjectCollectionComponent } from '@/app/shared/object-collection/object-collection.component';
import { PageSizeSelectorComponent } from '@/app/shared/page-size-selector/page-size-selector.component';
import { SearchConfigurationService } from '@/app/shared/search/search-configuration.service';
import { ThemedSearchFormComponent } from '@/app/shared/search-form/themed-search-form.component';
import { VarDirective } from '@/app/shared/utils/var.directive';

@Component({
  selector: 'ds-themed-dynamic-lookup-relation-external-source-tab',
  styleUrls: ['./dynamic-lookup-relation-external-source-tab.component.scss'],
  templateUrl: './dynamic-lookup-relation-external-source-tab.component.html',
  providers: [
    {
      provide: SEARCH_CONFIG_SERVICE,
      useClass: SearchConfigurationService,
    },
  ],
  animations: [
    fadeIn,
    fadeInOut,
  ],
  imports: [
    AsyncPipe,
    ErrorComponent,
    ObjectCollectionComponent,
    PageSizeSelectorComponent,
    ThemedLoadingComponent,
    ThemedSearchFormComponent,
    TranslateModule,
    VarDirective,
  ],
})
export class DsDynamicLookupRelationExternalSourceTabComponent extends BaseComponent {
  override resetRoute() {
    const currentValue = this.searchConfigService.paginatedSearchOptions.getValue();
    const pagination = Object.assign(new PaginationComponentOptions(), currentValue.pagination, {
      currentPage: 1,
      pageSize: 5,
    });
    const updatedValue = new PaginatedSearchOptions(Object.assign({}, currentValue, {
      pagination,
    }));

    this.searchConfigService.searchOptions.next(updatedValue);
    this.searchConfigService.paginatedSearchOptions.next(updatedValue);
  }
}
