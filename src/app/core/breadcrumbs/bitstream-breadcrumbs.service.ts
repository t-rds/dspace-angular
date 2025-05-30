import { Injectable } from '@angular/core';
import {
  Observable,
  of,
} from 'rxjs';
import {
  map,
  switchMap,
} from 'rxjs/operators';

import { getDSORoute } from '../../app-routing-paths';
import { BITSTREAM_PAGE_LINKS_TO_FOLLOW } from '../../bitstream-page/bitstream-page.resolver';
import { Breadcrumb } from '../../breadcrumbs/breadcrumb/breadcrumb.model';
import {
  hasValue,
  isNotEmpty,
} from '../../shared/empty.util';
import { LinkService } from '../cache/builders/link.service';
import { BitstreamDataService } from '../data/bitstream-data.service';
import { RemoteData } from '../data/remote-data';
import { Bitstream } from '../shared/bitstream.model';
import { Bundle } from '../shared/bundle.model';
import { ChildHALResource } from '../shared/child-hal-resource.model';
import { DSpaceObject } from '../shared/dspace-object.model';
import { Item } from '../shared/item.model';
import {
  getFirstCompletedRemoteData,
  getRemoteDataPayload,
} from '../shared/operators';
import { DSOBreadcrumbsService } from './dso-breadcrumbs.service';
import { DSONameService } from './dso-name.service';

/**
 * Service to calculate DSpaceObject breadcrumbs for a single part of the route
 */
@Injectable({
  providedIn: 'root',
})
export class BitstreamBreadcrumbsService extends DSOBreadcrumbsService {
  constructor(
    protected bitstreamService: BitstreamDataService,
    protected linkService: LinkService,
    protected dsoNameService: DSONameService,
  ) {
    super(linkService, dsoNameService);
  }

  /**
   * Method to recursively calculate the breadcrumbs
   * This method returns the name and url of the key and all its parent DSOs recursively, top down
   * @param key The key (a DSpaceObject) used to resolve the breadcrumb
   * @param url The url to use as a link for this breadcrumb
   */
  getBreadcrumbs(key: ChildHALResource & DSpaceObject, url: string): Observable<Breadcrumb[]> {
    const label = this.dsoNameService.getName(key);
    const crumb = new Breadcrumb(label, url);

    return this.getOwningItem(key.uuid).pipe(
      switchMap((parentRD: RemoteData<ChildHALResource & DSpaceObject>) => {
        if (isNotEmpty(parentRD) && hasValue(parentRD.payload)) {
          const parent = parentRD.payload;
          return super.getBreadcrumbs(parent, getDSORoute(parent));
        }
        return of([]);

      }),
      map((breadcrumbs: Breadcrumb[]) => [...breadcrumbs, crumb]),
    );
  }

  getOwningItem(uuid: string): Observable<RemoteData<Item>> {
    return this.bitstreamService.findById(uuid, true, true, ...BITSTREAM_PAGE_LINKS_TO_FOLLOW).pipe(
      getFirstCompletedRemoteData(),
      getRemoteDataPayload(),
      switchMap((bitstream: Bitstream) => {
        if (hasValue(bitstream)) {
          return bitstream.bundle.pipe(
            getFirstCompletedRemoteData(),
            getRemoteDataPayload(),
            switchMap((bundle: Bundle) => {
              if (hasValue(bundle)) {
                return bundle.item.pipe(
                  getFirstCompletedRemoteData(),
                );
              } else {
                return of(undefined);
              }
            }),
          );
        } else {
          return of(undefined);
        }
      }),
    );
  }
}
