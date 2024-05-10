import { Component } from '@angular/core';
import { LoginPageComponent as BaseComponent } from '@app/login-page/login-page.component';
import { ThemedLogInComponent } from '@app/shared/log-in/themed-log-in.component';
import { TranslateModule } from '@ngx-translate/core';

/**
 * This component represents the login page
 */
@Component({
  selector: 'ds-themed-login-page',
  styleUrls: ['./login-page.component.scss'],
  templateUrl: './login-page.component.html',
  standalone: true,
  imports: [
    ThemedLogInComponent,
    TranslateModule,
  ],
})
export class LoginPageComponent extends BaseComponent {
}
