import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { HomeNewsComponent as BaseComponent } from '@/app/home-page/home-news/home-news.component';
import { MarkdownViewerComponent } from '@/app/shared/markdown-viewer/markdown-viewer.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'ds-themed-home-news',
  styleUrls: ['./home-news.component.scss'],
  templateUrl: './home-news.component.html',
  imports: [
    AsyncPipe,
    TranslateModule,
    MarkdownViewerComponent,
  ],
})

/**
 * Component to render the news section on the home page
 */
export class HomeNewsComponent extends BaseComponent {}
