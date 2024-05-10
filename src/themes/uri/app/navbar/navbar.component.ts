import {
  AsyncPipe,
  NgClass,
  NgComponentOutlet,
  NgFor,
  NgIf,
} from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContextHelpToggleComponent } from '@app/header/context-help-toggle/context-help-toggle.component';
import { NavbarComponent as BaseComponent } from '@app/navbar/navbar.component';
import { ThemedSearchNavbarComponent } from '@app/search-navbar/themed-search-navbar.component';
import { slideMobileNav } from '@app/shared/animations/slide';
import { ThemedAuthNavMenuComponent } from '@app/shared/auth-nav-menu/themed-auth-nav-menu.component';
import { ThemedUserMenuComponent } from '@app/shared/auth-nav-menu/user-menu/themed-user-menu.component';
import { ImpersonateNavbarComponent } from '@app/shared/impersonate-navbar/impersonate-navbar.component';
import { ThemedLangSwitchComponent } from '@app/shared/lang-switch/themed-lang-switch.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

/**
 * Component representing the public navbar
 */
@Component({
  selector: 'ds-themed-navbar',
  styleUrls: ['./navbar.component.scss'],
  templateUrl: './navbar.component.html',
  animations: [slideMobileNav],
  standalone: true,
  imports: [
    NgbDropdownModule,
    ThemedLangSwitchComponent,
    ThemedSearchNavbarComponent,
    NgClass,
    RouterLink,
    NgIf,
    NgFor,
    NgComponentOutlet,
    ContextHelpToggleComponent,
    ThemedAuthNavMenuComponent,
    ImpersonateNavbarComponent,
    AsyncPipe,
    TranslateModule,
    ThemedUserMenuComponent,
  ],
})
export class NavbarComponent extends BaseComponent {
}
