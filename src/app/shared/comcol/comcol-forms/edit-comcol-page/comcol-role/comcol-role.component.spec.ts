import {
  DebugElement,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import {
  ComponentFixture,
  TestBed,
  waitForAsync,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

import { DSONameService } from '../../../../../core/breadcrumbs/dso-name.service';
import { RequestService } from '../../../../../core/data/request.service';
import { GroupDataService } from '../../../../../core/eperson/group-data.service';
import { DSONameServiceMock } from '../../../../mocks/dso-name.service.mock';
import { NotificationsService } from '../../../../notifications/notifications.service';
import {
  createFailedRemoteDataObject$,
  createSuccessfulRemoteDataObject$,
} from '../../../../remote-data.utils';
import { NotificationsServiceStub } from '../../../../testing/notifications-service.stub';
import { ComcolRoleComponent } from './comcol-role.component';

describe('ComcolRoleComponent', () => {

  let fixture: ComponentFixture<ComcolRoleComponent>;
  let comp: ComcolRoleComponent;
  let de: DebugElement;

  let group;
  let statusCode;
  let comcolRole;
  let notificationsService;

  const requestService = {
    hasByHref$: () => of(true),
    setStaleByHrefSubstring: () => of(true),
  };

  const groupService = {
    findByHref: jasmine.createSpy('findByHref'),
    createComcolGroup: jasmine.createSpy('createComcolGroup').and.returnValue(of({})),
    deleteComcolGroup: jasmine.createSpy('deleteComcolGroup').and.returnValue(of({})),
    clearGroupsRequests: jasmine.createSpy('clearGroupsRequests'),
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        NgbModule,
        RouterTestingModule.withRoutes([]),
        TranslateModule.forRoot(),
        NoopAnimationsModule,
      ],
      providers: [
        { provide: DSONameService, useValue: new DSONameServiceMock() },
        { provide: GroupDataService, useValue: groupService },
        { provide: RequestService, useValue: requestService },
        { provide: NotificationsService, useClass: NotificationsServiceStub },
      ], schemas: [
        NO_ERRORS_SCHEMA,
      ],
    }).compileComponents().then(() => {
      groupService.findByHref.and.callFake((link) => {
        if (link === 'test role link') {
          if (statusCode === 204) {
            return createSuccessfulRemoteDataObject$(null);
          } else if (statusCode === 200) {
            return createSuccessfulRemoteDataObject$(group);
          } else {
            return createFailedRemoteDataObject$('error', statusCode);
          }
        }
      });

      fixture = TestBed.createComponent(ComcolRoleComponent);
      comp = fixture.componentInstance;
      de = fixture.debugElement;
      notificationsService = TestBed.inject(NotificationsService);

      comcolRole = {
        name: 'test role name',
        href: 'test role link',
      };
      comp.comcolRole = comcolRole;
      comp.roleName$ = of(comcolRole.name);

      fixture.detectChanges();
    });

  }));

  describe('when there is no group yet', () => {

    beforeEach(() => {
      group = null;
      statusCode = 204;
      comp.comcolRole = comcolRole;
      fixture.detectChanges();
    });

    it('should have a create button but no restrict or delete button', (done) => {
      expect(de.query(By.css('.btn.create')))
        .toBeTruthy();
      expect(de.query(By.css('.btn.restrict')))
        .toBeNull();
      expect(de.query(By.css('.btn.delete')))
        .toBeNull();
      done();
    });

    describe('when the create button is pressed', () => {

      beforeEach(() => {
        de.query(By.css('.btn.create')).nativeElement.click();
      });

      it('should call the groupService create method', (done) => {
        expect(groupService.createComcolGroup).toHaveBeenCalled();
        done();
      });
    });

    describe('when a group cannot be created', () => {
      beforeEach(() => {
        groupService.createComcolGroup.and.returnValue(createFailedRemoteDataObject$());
        de.query(By.css('.btn.create')).nativeElement.click();
      });

      it('should show an error notification', (done) => {
        expect(notificationsService.error).toHaveBeenCalled();
        done();
      });
    });
  });

  describe('when the related group is the Anonymous group', () => {

    beforeEach(() => {
      group = {
        name: 'Anonymous',
      };
      statusCode = 200;
      comp.comcolRole = comcolRole;
      fixture.detectChanges();
    });

    it('should have a restrict button but no create or delete button', (done) => {
      expect(de.query(By.css('.btn.create')))
        .toBeNull();
      expect(de.query(By.css('.btn.restrict')))
        .toBeTruthy();
      expect(de.query(By.css('.btn.delete')))
        .toBeNull();
      done();
    });

    describe('when the restrict button is pressed', () => {

      beforeEach(() => {
        de.query(By.css('.btn.restrict')).nativeElement.click();
      });

      it('should call the groupService create method', (done) => {
        expect(groupService.createComcolGroup).toHaveBeenCalledWith(comp.dso, 'test role name', 'test role link');
        done();
      });
    });
  });

  describe('when the related group is a custom group', () => {

    beforeEach(() => {
      group = {
        name: 'custom group name',
      };
      statusCode = 200;
      comp.comcolRole = comcolRole;
      fixture.detectChanges();
    });

    afterEach(() => {
      const modal = document.querySelector('ds-confirmation-modal');
      if (modal) {
        modal.remove();
      }
    });

    it('should have a delete button but no create or restrict button', (done) => {
      expect(de.query(By.css('.btn.create'))).toBeNull();
      expect(de.query(By.css('.btn.restrict'))).toBeNull();
      expect(de.query(By.css('.btn.delete'))).toBeTruthy();
      done();
    });

    describe('when the delete button is pressed', () => {

      beforeEach(() => {
        de.query(By.css('.btn.delete')).nativeElement.click();
      });

      it('should call the groupService delete method', (done) => {
        (document as any).querySelector('.modal-footer .confirm').click();
        expect(groupService.deleteComcolGroup).toHaveBeenCalled();
        done();
      });
    });

    describe('when a group cannot be deleted', () => {
      beforeEach(() => {
        groupService.deleteComcolGroup.and.returnValue(createFailedRemoteDataObject$());
        de.query(By.css('.btn.delete')).nativeElement.click();
      });

      it('should show an error notification', (done) => {
        (document as any).querySelector('.modal-footer .confirm').click();
        expect(notificationsService.error).toHaveBeenCalled();
        done();
      });
    });

  });
});
