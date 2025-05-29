import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

import { RootModule } from '@/app/root.module';

import { ItemPageTitleFieldComponent } from './app/item-page/simple/field-components/specific-field/title/item-page-title-field.component';
import { LoginPageComponent } from './app/login-page/login-page.component';
import { LogoutPageComponent } from './app/logout-page/logout-page.component';
import { ComcolPageBrowseByComponent } from './app/shared/comcol/comcol-page-browse-by/comcol-page-browse-by.component';
import { FileDownloadLinkComponent } from './app/shared/file-download-link/file-download-link.component';
import { ItemListPreviewComponent } from './app/shared/object-list/my-dspace-result-list-element/item-list-preview/item-list-preview.component';

const DECLARATIONS = [
  ComcolPageBrowseByComponent,
  FileDownloadLinkComponent,
  ItemListPreviewComponent,
  LoginPageComponent,
  LogoutPageComponent,
  ItemPageTitleFieldComponent,
];

@NgModule({
  imports: [
    RootModule,
    CommonModule,
    DragDropModule,
    FormsModule,
    NgbModule,
    RouterModule,
    ScrollToModule,
    StoreModule,
    StoreRouterConnectingModule,
    TranslateModule,
    FormsModule,
    ...DECLARATIONS,
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
  ],
})
/**
 * This module serves as an index for all the components in this theme.
 * It should import all other modules, so the compiler knows where to find any components referenced
 * from a component in this theme
 * It is purposefully not exported, it should never be imported anywhere else, its only purpose is
 * to give lazily loaded components a context in which they can be compiled successfully
 */
class LazyThemeModule {
}
