import { DOCUMENT } from '@angular/common';
import {
  Inject,
  Injectable,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
  combineLatest,
  Observable,
  of,
} from 'rxjs';
import {
  map,
  mergeMap,
  take,
} from 'rxjs/operators';

import { REQUEST } from '../../../express.tokens';
import {
  hasValue,
  isEmpty,
  isNotEmpty,
} from '../../shared/empty.util';
import { AuthService } from '../auth/auth.service';
import { CookieService } from '../services/cookie.service';
import { RouteService } from '../services/route.service';
import {
  NativeWindowRef,
  NativeWindowService,
} from '../services/window.service';
import {
  LANG_ORIGIN,
  LocaleService,
} from './locale.service';

@Injectable()
export class ServerLocaleService extends LocaleService {

  constructor(
    @Inject(NativeWindowService) protected _window: NativeWindowRef,
    @Inject(REQUEST) protected req: Request,
    protected cookie: CookieService,
    protected translate: TranslateService,
    protected authService: AuthService,
    protected routeService: RouteService,
    @Inject(DOCUMENT) protected document: any,
  ) {
    super(_window, cookie, translate, authService, routeService, document);
  }

  /**
   * Get the languages list of the user in Accept-Language format
   *
   * @returns {Observable<string[]>}
   */
  getLanguageCodeList(): Observable<string[]> {
    const obs$ = combineLatest([
      this.authService.isAuthenticated(),
      this.authService.isAuthenticationLoaded(),
    ]);

    return obs$.pipe(
      take(1),
      mergeMap(([isAuthenticated, isLoaded]) => {
        let epersonLang$: Observable<string[]> = of([]);
        if (isAuthenticated && isLoaded) {
          epersonLang$ = this.authService.getAuthenticatedUserFromStore().pipe(
            take(1),
            map((eperson) => {
              const languages: string[] = [];
              const ePersonLang = eperson.firstMetadataValue(this.EPERSON_LANG_METADATA);
              if (ePersonLang) {
                languages.push(...this.setQuality(
                  [ePersonLang],
                  LANG_ORIGIN.EPERSON,
                  !isEmpty(this.translate.currentLang)));
              }
              return languages;
            }),
          );
        }
        return epersonLang$.pipe(
          map((epersonLang: string[]) => {
            const languages: string[] = [];
            if (this.translate.currentLang) {
              languages.push(...this.setQuality(
                [this.translate.currentLang],
                LANG_ORIGIN.UI,
                false));
            }
            if (isNotEmpty(epersonLang)) {
              languages.push(...epersonLang);
            }
            if (hasValue(this.req.headers['accept-language'])) {
              languages.push(...this.req.headers['accept-language'].split(','),
              );
            }
            return languages;
          }),
        );
      }),
    );
  }

}
