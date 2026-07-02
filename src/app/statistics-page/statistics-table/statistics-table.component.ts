import { AsyncPipe } from '@angular/common';
import {
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { DSONameService } from '@dspace/core/breadcrumbs/dso-name.service';
import { DSpaceObjectDataService } from '@dspace/core/data/dspace-object-data.service';
import { DSpaceObject } from '@dspace/core/shared/dspace-object.model';
import {
  getFirstSucceededRemoteData,
  getRemoteDataPayload,
} from '@dspace/core/shared/operators';
import {
  Point,
  UsageReport,
} from '@dspace/core/statistics/models/usage-report.model';
import { TranslateModule } from '@ngx-translate/core';
import {
  Observable,
  of,
} from 'rxjs';
import {
  catchError,
  map,
} from 'rxjs/operators';

/**
 * Component representing a statistics table for a given usage report.
 */
@Component({
  selector: 'ds-statistics-table',
  templateUrl: './statistics-table.component.html',
  styleUrls: ['./statistics-table.component.scss'],
  imports: [
    AsyncPipe,
    TranslateModule,
  ],
})
export class StatisticsTableComponent implements OnInit {

  /**
   * The usage report to display a statistics table for
   */
  @Input()
  report: UsageReport;

  /**
   * Boolean indicating whether the usage report has data
   */
  hasData: boolean;

  /**
   * The table headers
   */
  headers: string[];

  /**
   * The labels to display for each point.
   */
  pointLabels$: { [pointId: string]: Observable<string | undefined> } = {};

  constructor(
    protected dsoService: DSpaceObjectDataService,
    protected nameService: DSONameService,
  ) {

  }

  ngOnInit() {
    this.hasData = this.report.points.length > 0;
    if (this.hasData) {
      this.headers = Object.keys(this.report.points[0].values);
      this.pointLabels$ = this.report.points.reduce((labels, point) => ({
        ...labels,
        [point.id]: this.getPointLabel(point),
      }), {});
    }
  }

  private getPointLabel(point: Point): Observable<string | undefined> {
    if (point.label?.trim()) {
      return of(point.label);
    }

    return this.dsoService.findById(point.id).pipe(
      getFirstSucceededRemoteData(),
      getRemoteDataPayload(),
      map((dso: DSpaceObject) => this.nameService.getName(dso)),
      map((label: string) => label?.trim() || undefined),
      catchError(() => of(undefined)),
    );
  }
}
