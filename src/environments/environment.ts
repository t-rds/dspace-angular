// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --configuration production` replaces `environment.ts` with `environment.production.ts`.
// `ng test --configuration test` replaces `environment.ts` with `environment.test.ts`.
// The list of file replacements can be found in `angular.json`.

import { BuildConfig } from '../config/build-config.interface';

export const environment: Partial<BuildConfig> = {
  production: false,

  // Angular SSR (Server Side Rendering) settings
  ssr: {
    enabled: false,
    enablePerformanceProfiler: false,
    inlineCriticalCss: false,
    transferState: true,
    replaceRestUrl: false,
    excludePathPatterns: [
      {
        pattern: '^/communities/[a-f0-9-]{36}/browse(/.*)?$',
        flag: 'i',
      },
      {
        pattern: '^/collections/[a-f0-9-]{36}/browse(/.*)?$',
        flag: 'i',
      },
      { pattern: '^/browse/' },
      { pattern: '^/search' },
      { pattern: '^/community-list$' },
      { pattern: '^/statistics/?' },
      { pattern: '^/admin/' },
      { pattern: '^/processes/?' },
      { pattern: '^/notifications/' },
      { pattern: '^/access-control/' },
      { pattern: '^/health$' },
    ],
    enableSearchComponent: false,
    enableBrowseComponent: false,
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
