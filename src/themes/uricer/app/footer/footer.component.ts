import {
  AsyncPipe,
  DatePipe,
  NgIf,
} from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FooterComponent as BaseComponent } from '@app/footer/footer.component';
import { TranslateModule } from '@ngx-translate/core';

/*
* Custom footer Component
*/
@Component({
  selector: 'ds-themed-footer',
  styleUrls: ['./footer.component.scss'],
  templateUrl: './footer.component.html',
  standalone: true,
  imports: [
    NgIf,
    RouterLink,
    AsyncPipe,
    DatePipe,
    TranslateModule,
  ],
})
export class FooterComponent extends BaseComponent {
}
