import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { FooterComponent as BaseComponent } from '@/app/footer/footer.component';

/*
* Custom footer Component
*/
@Component({
  selector: 'ds-themed-footer',
  styleUrls: ['./footer.component.scss'],
  templateUrl: './footer.component.html',
  standalone: true,
  imports: [
    DatePipe,
    RouterLink,
    TranslateModule,
  ],
})
export class FooterComponent extends BaseComponent {
}
