import { DebugElement } from '@angular/core';
import {
  ComponentFixture,
  TestBed,
  waitForAsync,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DSONameService } from '@dspace/core/breadcrumbs/dso-name.service';
import { DSpaceObjectDataService } from '@dspace/core/data/dspace-object-data.service';
import { Item } from '@dspace/core/shared/item.model';
import { UsageReport } from '@dspace/core/statistics/models/usage-report.model';
import { createSuccessfulRemoteDataObject$ } from '@dspace/core/utilities/remote-data.utils';
import { TranslateModule } from '@ngx-translate/core';

import { StatisticsTableComponent } from './statistics-table.component';

describe('StatisticsTableComponent', () => {

  let component: StatisticsTableComponent;
  let de: DebugElement;
  let dsoService: jasmine.SpyObj<DSpaceObjectDataService>;
  let fixture: ComponentFixture<StatisticsTableComponent>;
  let graduateProgram: Item;
  let nameService: jasmine.SpyObj<DSONameService>;

  beforeEach(waitForAsync(() => {
    graduateProgram = Object.assign(new Item(), { id: 'item_2' });
    graduateProgram.setMetadata('dspace.entity.type', null, 'GraduateProgram');
    graduateProgram.setMetadata('organization.name', null, 'Resolved Graduate Program');

    dsoService = jasmine.createSpyObj('dsoService', {
      findById: createSuccessfulRemoteDataObject$(graduateProgram),
    });
    nameService = jasmine.createSpyObj('nameService', {
      getName: 'Resolved Graduate Program',
    });

    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
        StatisticsTableComponent,
      ],
      providers: [
        { provide: DSpaceObjectDataService, useValue: dsoService },
        { provide: DSONameService, useValue: nameService },
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsTableComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    component.report = Object.assign(new UsageReport(), {
      points: [],
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when the storage report is empty', () => {

    it ('should not display a table', () => {
      expect(de.query(By.css('table'))).toBeNull();
    });
  });

  describe('when the storage report has data', () => {

    beforeEach(() => {
      component.report = Object.assign(new UsageReport(), {
        points: [
          {
            id: 'item_1',
            label: 'Item 1',
            values: {
              views: 7,
              downloads: 4,
            },
          },
          {
            id: 'item_2',
            label: '',
            values: {
              views: 8,
              downloads: 8,
            },
          },
        ],
      });
      component.ngOnInit();
      fixture.detectChanges();
    });

    it ('should display a table with the correct data', () => {

      expect(de.query(By.css('table'))).toBeTruthy();

      expect(de.query(By.css('th.views-header')).nativeElement.innerText)
        .toEqual('statistics.table.header.views');
      expect(de.query(By.css('th.downloads-header')).nativeElement.innerText)
        .toEqual('statistics.table.header.downloads');

      expect(de.query(By.css('td.item_1-views-data')).nativeElement.innerText)
        .toEqual('7');
      expect(de.query(By.css('td.item_1-downloads-data')).nativeElement.innerText)
        .toEqual('4');
      expect(de.query(By.css('td.item_2-views-data')).nativeElement.innerText)
        .toEqual('8');
      expect(de.query(By.css('td.item_2-downloads-data')).nativeElement.innerText)
        .toEqual('8');
    });

    it ('should resolve the DSO name when a point label is missing', () => {
      expect(de.query(By.css('tr.item_1-data th[data-test="statistics-label"]')).nativeElement.innerText)
        .toEqual('Item 1');
      expect(de.query(By.css('tr.item_2-data th[data-test="statistics-label"]')).nativeElement.innerText)
        .toEqual('Resolved Graduate Program');
      expect(dsoService.findById).toHaveBeenCalledWith('item_2');
      expect(nameService.getName).toHaveBeenCalledWith(graduateProgram);
    });
  });
});
