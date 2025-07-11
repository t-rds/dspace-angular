import {
  AsyncPipe,
  Location,
  NgClass,
} from '@angular/common';
import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  ActivatedRoute,
  Params,
  Router,
} from '@angular/router';
import {
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { Subscription } from 'rxjs';

import { EPersonListActionConfig } from '../../../access-control/group-registry/group-form/members-list/members-list.component';
import { RequestService } from '../../../core/data/request.service';
import { WorkflowActionDataService } from '../../../core/data/workflow-action-data.service';
import { EPerson } from '../../../core/eperson/models/eperson.model';
import { RouteService } from '../../../core/services/route.service';
import { WorkflowItemDataService } from '../../../core/submission/workflowitem-data.service';
import { ClaimedTaskDataService } from '../../../core/tasks/claimed-task-data.service';
import { SelectReviewerAdvancedWorkflowInfo } from '../../../core/tasks/models/select-reviewer-advanced-workflow-info.model';
import { WorkflowAction } from '../../../core/tasks/models/workflow-action-object.model';
import { ModifyItemOverviewComponent } from '../../../item-page/edit-item-page/modify-item-overview/modify-item-overview.component';
import { hasValue } from '../../../shared/empty.util';
import { NotificationsService } from '../../../shared/notifications/notifications.service';
import { AdvancedWorkflowActionComponent } from '../advanced-workflow-action/advanced-workflow-action.component';
import { ReviewersListComponent } from './reviewers-list/reviewers-list.component';

export const ADVANCED_WORKFLOW_TASK_OPTION_SELECT_REVIEWER = 'submit_select_reviewer';
export const ADVANCED_WORKFLOW_ACTION_SELECT_REVIEWER = 'selectrevieweraction';

/**
 * The page on which Review Managers can assign Reviewers to review an item.
 */
@Component({
  selector: 'ds-advanced-workflow-action-select-reviewer',
  templateUrl: './advanced-workflow-action-select-reviewer.component.html',
  styleUrls: ['./advanced-workflow-action-select-reviewer.component.scss'],
  imports: [
    AsyncPipe,
    ModifyItemOverviewComponent,
    NgClass,
    ReviewersListComponent,
    TranslateModule,
  ],
  standalone: true,
})
export class AdvancedWorkflowActionSelectReviewerComponent extends AdvancedWorkflowActionComponent implements OnInit, OnDestroy {

  multipleReviewers = true;

  selectedReviewers: EPerson[] = [];

  reviewersListActionConfig: EPersonListActionConfig;

  /**
   * When the component is created the value is `undefined`, afterwards it will be set to either the group id or `null`.
   * It needs to be subscribed in the **ngOnInit()** because otherwise some unnecessary request will be made.
   */
  groupId?: string | null;

  subs: Subscription[] = [];

  displayError = false;

  constructor(
    protected route: ActivatedRoute,
    protected workflowItemService: WorkflowItemDataService,
    protected router: Router,
    protected routeService: RouteService,
    protected notificationsService: NotificationsService,
    protected translationService: TranslateService,
    protected workflowActionService: WorkflowActionDataService,
    protected claimedTaskDataService: ClaimedTaskDataService,
    protected requestService: RequestService,
    protected location: Location,
  ) {
    super(route, workflowItemService, router, routeService, notificationsService, translationService, workflowActionService, claimedTaskDataService, requestService, location);
  }

  ngOnDestroy(): void {
    this.subs.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  ngOnInit(): void {
    super.ngOnInit();
    if (this.multipleReviewers) {
      this.reviewersListActionConfig = {
        add: {
          css: 'btn-outline-primary',
          disabled: false,
          icon: 'fas fa-plus',
        },
        remove: {
          css: 'btn-outline-danger',
          disabled: false,
          icon: 'fas fa-minus',
        },
      };
    } else {
      this.reviewersListActionConfig = {
        add: {
          css: 'btn-outline-primary',
          disabled: false,
          icon: 'fas fa-check',
        },
        remove: {
          css: 'btn-primary',
          disabled: true,
          icon: 'fas fa-check',
        },
      };
    }
    this.subs.push(this.workflowAction$.subscribe((workflowAction: WorkflowAction) => {
      if (workflowAction) {
        this.groupId = (workflowAction.advancedInfo as SelectReviewerAdvancedWorkflowInfo[])[0].group;
      } else {
        this.groupId = null;
      }
    }));
  }

  getType(): string {
    return ADVANCED_WORKFLOW_ACTION_SELECT_REVIEWER;
  }

  /**
   * Only performs the action when some reviewers have been selected.
   */
  performAction(): void {
    if (this.selectedReviewers.length > 0) {
      super.performAction();
    } else {
      this.displayError = true;
    }
  }

  /**
   * Returns the task option and the selected {@link EPerson} id(s)
   */
  createBody(): any {
    return {
      [ADVANCED_WORKFLOW_TASK_OPTION_SELECT_REVIEWER]: true,
      eperson: this.selectedReviewers.map((ePerson: EPerson) => ePerson.id),
    };
  }

  /**
   * Hardcoded the previous page url because the {@link ReviewersListComponent} changes the previous route when
   * switching between the different pages
   */
  previousPage(): void {
    let queryParams: Params = this.previousQueryParameters;
    if (!hasValue(queryParams)) {
      queryParams = {
        configuration: 'workflow',
      };
    }
    void this.router.navigate(['/mydspace'], { queryParams: queryParams });
  }

}
